package redisdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strconv"

	"github.com/RediSearch/redisearch-go/redisearch"
	"github.com/nitishm/go-rejson/v4"
)

var destinations []Destination

// var client *redis.Client
// var hotel_api string

type User struct {
	Username string
	Password string
}

type Destination struct {
	Dest string `json:"term"`
	Uid  string `json:"uid"`
}

func InitDestRedis() *redisearch.Client {
	destination_sc := redisearch.NewSchema(redisearch.DefaultOptions)
	destination_sc.AddField(redisearch.NewTextFieldOptions("destination", redisearch.TextFieldOptions{Sortable: true}))
	destination_sc.AddField(redisearch.NewTextFieldOptions("uid", redisearch.TextFieldOptions{Sortable: true}))

	c := redisearch.NewClient("localhost:6379", "destinations")
	err := c.Drop()

	// Create the index with the given schema
	if err != nil {
		fmt.Println(err)
	}
	c.CreateIndex(destination_sc)

	content, err := os.Open("./destinations.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
	}

	defer content.Close()

	bytevalue, _ := ioutil.ReadAll(content)
	json.Unmarshal(bytevalue, &destinations)

	// Change to len(destinations) on final version
	for i := 0; i < len(destinations); i++ {
		if destinations[i].Dest == "" || destinations[i].Uid == "" {
			continue
		}
		doc := redisearch.NewDocument("destinations:"+strconv.Itoa(i), 1.0)
		doc.Set("destination", destinations[i].Dest)
		doc.Set("uid", destinations[i].Uid)
		if err := c.Index([]redisearch.Document{doc}...); err != nil {
			fmt.Println(destinations[i].Uid, destinations[i].Dest)
			log.Fatal(err)
		}
	}
	return c
}

func InitUserRedis() *redisearch.Client {
	user_sc := redisearch.NewSchema(redisearch.DefaultOptions)
	user_sc.AddField(redisearch.NewTagFieldOptions("username", redisearch.TagFieldOptions{Sortable: true}))
	user_sc.AddField(redisearch.NewTextFieldOptions("password", redisearch.TextFieldOptions{Sortable: true}))

	u := redisearch.NewClient("localhost:6379", "users")
	err := u.Drop()
	if err != nil {
		fmt.Println(err)
	}
	u.CreateIndex(user_sc)
	return u
}

func JsonSet(rh *rejson.Handler) {

}

func InitAutoCompleterRedis() *redisearch.Autocompleter {
	a := redisearch.NewAutocompleter("localhost:6379", "autocomplete")
	// CHANGE TO len(destinations) on final version
	for i := 0; i < len(destinations); i++ {
		if destinations[i].Dest == "" || destinations[i].Uid == "" {
			continue
		}
		a.AddTerms(redisearch.Suggestion{Term: destinations[i].Dest, Score: 1.0})
	}
	return a
}

func AddNewUser(u *redisearch.Client, username string, password string) {
	if checkExistingUser(u, username) {
		fmt.Println("User already exists")
	} else {
		doc := redisearch.NewDocument("user:"+username, 1.0)
		doc.Set("username", username)
		doc.Set("password", password)
		if err := u.Index([]redisearch.Document{doc}...); err != nil {
			log.Fatal(err)
		}
	}
}

func checkExistingUser(u *redisearch.Client, username string) bool {
	doc, total, err := u.Search(redisearch.NewQuery(username).SetReturnFields("username").Limit(0, 1))
	fmt.Println("Total Users with username:", username, "is", total, "Error:", err)
	if len(doc) == 0 {
		return false
	} else {
		return true
	}
}

func AutoCompleteDestination(a *redisearch.Autocompleter, prefix string) []string {
	result, err := a.SuggestOpts(prefix, redisearch.SuggestOptions{Num: 5, Fuzzy: false})
	if err != nil {
		fmt.Println(err)
	}
	var suggestions []string
	for i := 0; i < len(result); i++ {
		suggestions = append(suggestions, result[i].Term)
	}
	return suggestions
}

func GetDestinationUid(c *redisearch.Client, destination string) string {
	doc, total, err := c.Search(redisearch.NewQuery(destination).SetReturnFields("destination").Limit(0, 1))
	fmt.Println(total, err)
	if len(doc) == 0 {
		fmt.Println("No destination data")
		return "NO_DESTINATION"
	} else {
		fmt.Println(doc[0].Properties["destination"])
		return doc[0].Id
	}
}

func GetHotelData(uid string) {
	hotel_api := "https://hotelapi.loyalty.dev/api/hotels/" + uid
	fmt.Println(hotel_api)

}
