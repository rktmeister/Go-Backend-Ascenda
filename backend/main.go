package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type hotel struct {
	Name  string `json:"name"`
	City  string `json:"city"`
	Price int    `json:"price"`
}

type destination struct {
	Name string `json:"name"`
}

var hotels = []hotel{
	{"Hotel A", "New York", 100},
	{"Hotel B", "Los Angeles", 200},
	{"Hotel C", "Chicago", 300},
	{"Hotel D", "Las Vegas", 400},
}

var destinations = []destination{
	{"New York"},
	{"Los Angeles"},
	{"Chicago"},
	{"Las Vegas"},
}

func getDestinations(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"destinations": destinations,
	})
}

func getHotels(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hotels": hotels,
	})
}

func main() {
	r := gin.Default()

	// GET FUNCTIONS
	r.GET("/hotels", getHotels)
	r.GET("/destinations", getDestinations)

	// POST FUNCTIONS

	// RUN SERVER
	r.Run(":3000")

}
