package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/go-redis/redis"

	"github.com/gin-gonic/gin"
)

type User struct {
	Username string
	Password string
}

var Users []*User

type Hotel struct {
	Name  string `json:"name"`
	City  string `json:"city"`
	Price int    `json:"price"`
}

type Destination struct {
	Dest string `json:"term"`
}

type myJson struct {
	Array []string
}

type Uid struct {
	Uid string `json:"uid"`
}

func main() {
	router := gin.Default()
	router.RedirectTrailingSlash = true

	content, err := os.Open("./destinations.json")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Successfully read file")
	defer content.Close()
	var destinations []Destination
	var uids []Uid

	bytevalue, _ := ioutil.ReadAll(content)
	json.Unmarshal(bytevalue, &destinations)
	json.Unmarshal(bytevalue, &uids)

	fmt.Println(destinations)

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:5000",
		Password: "",
		DB:       0,
	})

	pong, err := client.Ping().Result()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(pong, "connected to redis")

	destinationJsondata, _ := json.Marshal(destinations)

	client.Set("destinations", destinationJsondata, 0).Err()

	uidJsondata, _ := json.Marshal(uids)

	client.Set("uids", uidJsondata, 0)

	val, err := client.Get("destinations").Result()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("destinations:", val)

	// err = client.Set("destinations", destinations, 0).Err()
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// val, err := client.Get("destinations").Result()
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// fmt.Println("destinations:", val)

	// GET FUNCTIONS
	// r.GET("/hotels", getHotels)
	// r.GET("/destinations", getDestinations)

	// Handles No Route
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{})
	})

	// POST FUNCTIONS

	// RUN SERVER
	router.Run(":3000")

}
