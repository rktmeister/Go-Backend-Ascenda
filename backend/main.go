package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"Go-Backend-Ascenda/Backend-API/redisdb"

	"github.com/gin-gonic/gin"
)

var (
	ListenAddr     = "localhost:3000"
	RedisearchDest = "localhost:6379"
)

type Search struct {
	Uid      string
	Checkin  string
	Checkout string
	Guests   string
}

type Price struct {
	Id    string  `json:"id"`
	Price float32 `json:"price"`
}
type Hotel struct {
	Id      string  `json:"id"`
	Name    string  `json:"name"`
	City    string  `json:"city"`
	Image   string  `json:"cloudflare_image_url"`
	Address string  `json:"address"`
	Rating  float32 `json:"rating"`
	Lat     string  `json:"lat"`
	Lng     string  `json:"lng"`
}

type ID struct {
	Id string `json:"id"`
}

type Hotel_Price struct {
	Id    ID
	Hotel Hotel
	Price Price
}

func main() {
	router := gin.Default()
	router.RedirectTrailingSlash = true

	hClient := http.Client{
		Timeout: 10 * time.Second,
	}

	userClient := redisdb.InitUserRedis()
	destClient, a := redisdb.InitDestAndAutoCompleterRedis()

	redisdb.AddNewUser(userClient, "rktmeister1", "1234")

	api := router.Group("/api")
	{
		api.GET("/destinations/fuzzyName", func(c *gin.Context) {
			search := c.Query("search")
			fmt.Println(search)
			c.JSON(http.StatusOK, redisdb.AutoCompleteDestination(a, destClient, search))
		})

		api.GET("/hotels/destination", func(c *gin.Context) {
			var hotels []Hotel
			var prices []Price
			destination := c.Query("destination")
			checkin := c.Query("checkin")
			checkout := c.Query("checkout")
			guests := c.Query("guests")

			api_url_price := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&partner_id=1&guests=%s", redisdb.GetDestinationUid(destClient, destination), checkin, checkout, guests)
			api_url_hotel := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&partner_id=1&guests=%s", redisdb.GetDestinationUid(destClient, destination), checkin, checkout, guests)

			// HOTEL FIRST
			req, err := http.NewRequest(http.MethodGet, api_url_hotel, nil)
			if err != nil {
				log.Fatal(err)
			}

			res, getErr := hClient.Do(req)
			if getErr != nil {
				log.Fatal(getErr)
			}
			if res.Body != nil {
				defer res.Body.Close()
			}

			body, readErr := ioutil.ReadAll(res.Body)
			if readErr != nil {
				log.Fatal(readErr)
			}
			err = json.Unmarshal(body, &hotels)
			if err != nil {
				log.Fatal(err)
			}

			// NOW PRICE
			req, err = http.NewRequest(http.MethodGet, api_url_price, nil)
			if err != nil {
				log.Fatal(err)
			}

			res, getErr = hClient.Do(req)
			if getErr != nil {
				log.Fatal(getErr)
			}
			if res.Body != nil {
				defer res.Body.Close()
			}

			body, readErr = ioutil.ReadAll(res.Body)
			if readErr != nil {
				log.Fatal(readErr)
			}
			err = json.Unmarshal(body, &prices)
			if err != nil {
				log.Fatal(err)
			}

			c.JSON(http.StatusOK, gin.H{
				"hotels": hotels,
				"prices": prices,
			})
		})

		api.GET("/room/hotel", func(c *gin.Context) {
			hotelId := c.Query("hotelId")
			destination_uid := c.Query("destination_uid")
			checkin := c.Query("checkin")
			checkout := c.Query("checkout")
			guests := c.Query("guests")
			api_url_room := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/%s", hotelId)
			api_url_price := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/%s/price?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&guests=%s&partner_id=1", hotelId, destination_uid, checkin, checkout, guests)
			c.JSON(http.StatusOK, gin.H{
				"api_url_room":  api_url_room,
				"api_url_price": api_url_price,
			})
		})
	}

	// Handles No Route
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Page not found",
		})
	})

	// RUN SERVER
	router.Run(":3000")

}
