package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"io/ioutil"
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
	dest  string `json:"name"`
	uid   string `json:"uid"`
	lat   string `json:"lat"`
	lng   string `json:"lng"`
	state string `json:"state"`
}

var Destinations []*Destination

func main() {
	router := gin.Default()
	router.RedirectTrailingSlash = true

	// Reads destination.json and stores it into array
	content, err := ioutil.ReadFile("./destination.json")
	if err != nil {
		log.Fatal("Error opening file: ", err)
	}

	var payload Destination
	err = json.Unmarshal(content, &payload)
	if err != nil {
		log.Fatal("Error unmarshalling: ", err)
	}

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
