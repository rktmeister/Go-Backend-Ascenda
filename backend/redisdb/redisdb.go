package redisdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strconv"

	"github.com/RediSearch/redisearch-go/redisearch"
)

var destinations []Destination

type User struct {
	Username string
	Password string
}

type Destination struct {
	Dest string `json:"term"`
	Uid  string `json:"uid"`
}

func InitDestAndAutoCompleterRedis() (*redisearch.Client, *redisearch.Autocompleter) {
	destination_sc := redisearch.NewSchema(redisearch.DefaultOptions)
	destination_sc.AddField(redisearch.NewTextFieldOptions("destination", redisearch.TextFieldOptions{Sortable: true}))
	destination_sc.AddField(redisearch.NewTextFieldOptions("uid", redisearch.TextFieldOptions{Sortable: true}))

	c := redisearch.NewClient("localhost:6379", "destinations")
	a := redisearch.NewAutocompleter("localhost:6379", "autocomplete")
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
		// Autocompleter AddTerms
		a.AddTerms(redisearch.Suggestion{Term: destinations[i].Dest, Score: 1.0})
		// Destination Documents
		doc := redisearch.NewDocument("destinations:"+strconv.Itoa(i), 1.0)
		doc.Set("destination", redisearch.EscapeTextFileString(destinations[i].Dest))
		doc.Set("uid", destinations[i].Uid)
		if err := c.Index([]redisearch.Document{doc}...); err != nil {
			// fmt.Println(destinations[i].Uid, destinations[i].Dest)
			log.Fatal(err)
		}
	}
	return c, a
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

func InitBookingDataRedis() *redisearch.Client {
	b := redisearch.NewClient("localhost:6379", "bookings")
	b_schema := redisearch.NewSchema(redisearch.DefaultOptions)
	b_schema.AddField(redisearch.NewTextFieldOptions("username", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("bookingUid", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("destination", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("checkin", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("checkout", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("time", redisearch.TextFieldOptions{Sortable: true}))
	b.CreateIndex(b_schema)

	return b
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

func AutoCompleteDestination(a *redisearch.Autocompleter, c *redisearch.Client, prefix string) []Destination {
	result, err := a.SuggestOpts(prefix, redisearch.SuggestOptions{Num: 5, Fuzzy: false})
	if err != nil {
		fmt.Println(err)
	}
	var suggestions []Destination
	var temp Destination
	for i := 0; i < len(result); i++ {
		temp.Dest = result[i].Term
		temp.Uid = GetDestinationUid(c, result[i].Term)
		suggestions = append(suggestions, temp)
	}
	return suggestions
}

func GetDestinationUid(c *redisearch.Client, destination string) string {
	// Search for exact destination name and get uid
	doc, total, _ := c.Search(redisearch.NewQuery(fmt.Sprintf("%s%s%s", `"`, redisearch.EscapeTextFileString(destination), `"`)).SetReturnFields("uid").Limit(0, 1))
	fmt.Println("Total Destinations with destination:", destination, "is", total)
	if len(doc) == 0 {
		fmt.Println("Destination not found")
		return "NO_DESTINATION"
	} else {
		output := fmt.Sprintf("%v", doc[0].Properties["uid"])
		return output
	}
}

func CreateBooking(b *redisearch.Client, username string, bookingUid string, dest string, checkin string, checkout string, time string) {
	doc := redisearch.NewDocument("booking:"+username+time, 1.0)
	doc.Set("username", username)
	doc.Set("uid", bookingUid)
	doc.Set("destination", dest)
	doc.Set("checkin", checkin)
	doc.Set("checkout", checkout)
	doc.Set("bookingTime", time)
	if err := b.Index([]redisearch.Document{doc}...); err != nil {
		log.Fatal(err)
	}
}
