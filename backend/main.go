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
	Id          string  `json:"id"`
	Price       float32 `json:"price"`
	LowestPrice float32 `json:"lowest_price"`
	SearchRank  float32 `json:"searchRank"`
}

type HotelsPrice struct {
	Prices []Price `json:"hotels"`
}

type Hotel struct {
	Id      string  `json:"id"`
	Name    string  `json:"name"`
	City    string  `json:"city"`
	Image   string  `json:"cloudflare_image_url"`
	Address string  `json:"address"`
	Rating  float32 `json:"rating"`
	Lat     float64 `json:"latitude"`
	Lng     float64 `json:"longitude"`
}

type Categories struct {
	Overall Overall `json:"name"`
}

type Overall struct {
	Name       string  `json:"name"`
	Score      float32 `json:"score"`
	Popularity float32 `json:"popularity"`
}
type Rooms struct {
	Id          string     `json:"id"`
	Name        string     `json:"name"`
	Lat         float64    `json:"latitude"`
	Lng         float64    `json:"longitude"`
	Categories  Categories `json:"categories"`
	Description string     `json:"description"`
	Image       string     `json:"imgix_url"`
}

type ID struct {
	Id string `json:"id"`
}

type Hotel_Price struct {
	Id    string
	Hotel Hotel
	Price float32
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
			var prices HotelsPrice
			destination := c.Query("destination")
			checkin := c.Query("checkin")
			checkout := c.Query("checkout")
			guests := c.Query("guests")

			api_url_price := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&partner_id=1&guests=%s", redisdb.GetDestinationUid(destClient, destination), checkin, checkout, guests)
			api_url_hotel := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&partner_id=1&guests=%s", redisdb.GetDestinationUid(destClient, destination), checkin, checkout, guests)
			fmt.Println(api_url_hotel)
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

			// NOW MERGE
			var hotel_price []Hotel_Price
			for i := 0; i < len(hotels); i++ {
				for j := 0; j < len(prices.Prices); j++ {
					if hotels[i].Id == prices.Prices[j].Id {
						hotel_price = append(hotel_price, Hotel_Price{Id: hotels[i].Id, Hotel: hotels[i], Price: prices.Prices[j].Price})
					}
				}

			}
			c.JSON(http.StatusOK, gin.H{
				"hotel_price": hotel_price,
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

			var rooms Rooms
			req, err := http.NewRequest(http.MethodGet, api_url_room, nil)
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
			err = json.Unmarshal(body, &rooms)
			if err != nil {
				log.Fatal(err)
			}

			c.JSON(http.StatusOK, gin.H{
				"api_url_room":  api_url_room,
				"api_url_price": api_url_price,
				"room":          rooms,
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
