package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/RediSearch/redisearch-go/redisearch"

	"github.com/go-redis/redis"

	"github.com/gin-gonic/gin"
)

var (
	ListenAddr = "localhost:3000"
	RedisAddr  = "localhost:6379"
)

type User struct {
	Username string
	Password string
}

type Database struct {
	Client *redis.Client
}

var Users []*User

type Hotel struct {
	Name  string `json:"name"`
	City  string `json:"city"`
	Price int    `json:"price"`
}

type Destination struct {
	Dest string `json:"term"`
	Uid  string `json:"uid"`
}

type Uid struct {
	Uid string `json:"uid"`
}

// func NewDatabase(address string) (*Database, error) {
// 	client := redis.NewClient(&redis.Options{
// 		Addr:     address,
// 		Password: "",
// 		DB:       0,
// 	})
// 	if err := client.Ping().Err(); err != nil {
// 		return nil, err
// 	}
// 	return &Database{
// 		Client: client,
// 	}, nil
// }

func main() {
	router := gin.Default()
	router.RedirectTrailingSlash = true

	// client := redis.NewClient(&redis.Options{
	// 	Addr:     "localhost:6379",
	// 	Password: "",
	// 	DB:       0,
	// })

	// Create schema
	sc := redisearch.NewSchema(redisearch.DefaultOptions)
	sc.AddField(redisearch.NewTextFieldOptions("destination", redisearch.TextFieldOptions{Sortable: true}))
	sc.AddField(redisearch.NewTextFieldOptions("uid", redisearch.TextFieldOptions{Sortable: true}))

	c := redisearch.NewClient("localhost:6379", "redisearch")
	err := c.Drop()
	// Create the index with the given schema
	if err != nil {
		fmt.Println(err)
	}
	c.CreateIndex(sc)

	a := redisearch.NewAutocompleter("localhost:6379", "redisearch")
	// destinationSuggest := redisearch.NewAutocompleter(RedisAddr, "destinations")

	// destinationSuggest.SuggestOpts("ro", redisearch.SuggestOptions{Num: 5, Fuzzy: true})

	content, err := os.Open("./destinations.json")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Successfully read file")
	defer content.Close()
	var destinations []Destination
	// var uids []Uid

	bytevalue, _ := ioutil.ReadAll(content)
	json.Unmarshal(bytevalue, &destinations)
	// json.Unmarshal(bytevalue, &uids)

	for i := 0; i < 150; i++ {
		if destinations[i].Dest == "" || destinations[i].Uid == "" {
			continue
		}
		a.AddTerms(redisearch.Suggestion{Term: destinations[i].Dest, Score: 1})
		doc := redisearch.NewDocument("destination:"+strconv.Itoa(i), 1.0)
		doc.Set("destination", destinations[i].Dest)
		doc.Set("uid", destinations[i].Uid)
		if err := c.Index([]redisearch.Document{doc}...); err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println("Successfully indexed")
	docs, total, err := c.Search(redisearch.NewQuery("Rome, Italy").SetReturnFields("destination").Limit(0, 5))
	for i := 0; i < len(docs); i++ {
		fmt.Println(docs[i].Id, docs[i].Properties["destination"], total, err)
	}

	// return autcomplete results
	fmt.Println(a.SuggestOpts("Bal", redisearch.SuggestOptions{Num: 5, Fuzzy: false}))
	fmt.Println(a.Length())

	// fmt.Println(destinationSuggest.SuggestOpts("Ro", redisearch.SuggestOptions{Num: 5, Fuzzy: true}))

	// ***
	// USELESS FOR NOW

	// pong, err := client.Ping().Result()
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// fmt.Println(pong, "connected to redis")

	// client.Set("destinations", bytevalue, 0)

	// destinationJsondata, _ := json.Marshal(destinations)

	// client.Set("destinations", destinationJsondata, 0).Err()

	// uidJsondata, _ := json.Marshal(uids)

	// client.Set("uids", uidJsondata, 0)

	// val, err := client.Get("destinations").Result()
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// fmt.Println("destinations:", val)

	// err = client.Set("destinations", destinations, 0).Err()
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// val, err := client.Get("destinations").Result()
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// fmt.Println("destinations:", val)

	// ***

	// destinationSuggest := redisearch.NewAutocompleter(RedisAddr, "destinations")
	// fmt.Println("Sucessfully create autocompleter")
	// fmt.Println(destinationSuggest.SuggestOpts("Ro", redisearch.SuggestOptions{Num: 5, Fuzzy: true}))

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
