package main

import (
	"fmt"
	"net/http"

	"Go-Backend-Ascenda/Backend-API/redisdb"

	"github.com/gin-gonic/gin"
)

var (
	ListenAddr     = "localhost:3000"
	RedisearchDest = "localhost:6379"
	RedisearchUser = "localhost:6380"
)

type Hotel struct {
	Name  string `json:"name"`
	City  string `json:"city"`
	Price int    `json:"price"`
}

func main() {
	router := gin.Default()
	router.RedirectTrailingSlash = true

	u := redisdb.InitUserRedis()
	c := redisdb.InitDestRedis()
	a := redisdb.InitAutoCompleterRedis()

	fmt.Println("Autocomplete", redisdb.AutoCompleteDestination(a, "Sin"))
	fmt.Println(redisdb.GetDestinationUid(c, "Singapore"))
	output, err := c.Get(redisdb.GetDestinationUid(c, "Singapore"))
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(output.Properties["uid"])

	redisdb.AddNewUser(u, "rktmeister2", "1234")
	redisdb.AddNewUser(u, "rktmeister1", "1234")
	// USE REDISEARCH TO FIND UID AS WELL
	// docs, total, err := c.Search(redisearch.NewQuery("Rome, Italy").SetReturnFields("uid").Limit(0, 5))
	// for i := 0; i < len(docs); i++ {
	// 	fmt.Println(docs[i].Id, docs[i].Properties["uid"], total, err)
	// }

	// // return autcomplete results
	// // a.SuggestOpts first argument will be taken from the GET REQUEST, for now not yet implemented
	// fmt.Println(a.SuggestOpts("Bal", redisearch.SuggestOptions{Num: 5, Fuzzy: false}))
	// fmt.Println(a.Length())

	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{})
		})
		api.GET("/hotels", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "Hello World",
			})
		})
		// api.GET("/destinations", func(c *gin.Context) {
		// 	c.JSON(http.StatusOK, gin.H{
		// 		client.SuggestOpts("destinations", redisearch.SuggestOptions{}),
		// 	})
		// })
	}

	// Handles No Route
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Page not found",
		})
	})

	// POST FUNCTIONS

	// RUN SERVER
	router.Run(":3000")

}
