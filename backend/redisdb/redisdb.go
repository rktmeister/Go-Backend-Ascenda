package redisdb

import (
	"encoding/json"
	"errors"
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
	user_sc.AddField(redisearch.NewTextFieldOptions("username", redisearch.TextFieldOptions{Sortable: true}))
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
	b_schema.AddField((redisearch.NewTextFieldOptions("firstName", redisearch.TextFieldOptions{Sortable: true})))
	b_schema.AddField((redisearch.NewTextFieldOptions("lastName", redisearch.TextFieldOptions{Sortable: true})))
	b_schema.AddField((redisearch.NewTextFieldOptions("salutation", redisearch.TextFieldOptions{Sortable: true})))
	b_schema.AddField((redisearch.NewTextFieldOptions("email", redisearch.TextFieldOptions{Sortable: true})))
	b_schema.AddField((redisearch.NewTextFieldOptions("phone", redisearch.TextFieldOptions{Sortable: true})))
	b_schema.AddField((redisearch.NewTextFieldOptions("special_requests", redisearch.TextFieldOptions{Sortable: true})))
	b_schema.AddField(redisearch.NewTextFieldOptions("destination_id", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("hotel_id", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("checkin", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("checkout", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("numberOfGuests", redisearch.TextFieldOptions{Sortable: true}))
	b_schema.AddField(redisearch.NewTextFieldOptions("price", redisearch.TextFieldOptions{Sortable: true}))
	b.CreateIndex(b_schema)

	return b
}

func AddNewUser(u *redisearch.Client, username string, password string) {
	fmt.Println("Adding new user", username, password)
	if CheckExistingUser(u, username) {
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

func CheckExistingUser(u *redisearch.Client, username string) bool {
	doc, total, _ := u.Search(redisearch.NewQuery(fmt.Sprintf("%s%s%s", `"`, username, `"`)).SetReturnFields("username").Limit(0, 1))
	fmt.Println("Total Users with username:", username, "is", total)
	if len(doc) == 0 {
		return false
	} else {
		return true
	}
}

func GetUser(u *redisearch.Client, username string) (*User, error) {
	doc, _, _ := u.Search(redisearch.NewQuery(fmt.Sprintf("%s%s%s", `"`, username, `"`)).SetReturnFields("username", "password").Limit(0, 1))
	if len(doc) == 0 {
		return nil, errors.New("No such user with username: " + username)
	} else {
		name, ok := doc[0].Properties["username"].(string)
		if !ok {
			return nil, errors.New("name isn't string")
		}
		password, ok := doc[0].Properties["password"].(string)
		if !ok {
			return nil, errors.New("password isn't string")
		}

		return &User{
			Username: name,
			Password: password,
		}, nil
	}
}

func CheckLogin(u *redisearch.Client, username string, password string) bool {
	existingUser := CheckExistingUser(u, username)
	if existingUser {
		doc, _, _ := u.Search(redisearch.NewQuery(username).SetReturnFields("password").Limit(0, 1))
		fmt.Println("User exists! Now checking password")
		if fmt.Sprintf("%v", doc[0].Properties["password"]) == password {
			fmt.Println("Password is correct")
			return true
		}
	}
	return false
}

func AutoCompleteDestination(a *redisearch.Autocompleter, c *redisearch.Client, prefix string) []Destination {
	result, err := a.SuggestOpts(prefix, redisearch.SuggestOptions{Num: 5, Fuzzy: true})
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

func DeleteUserDocument(u *redisearch.Client, username string) bool {
	doc, total, _ := u.Search(redisearch.NewQuery(fmt.Sprintf("%s%s%s", `"`, username, `"`)).SetReturnFields("username").Limit(0, 1))
	fmt.Println("Total Users with username:", username, "is", total)
	if len(doc) == 0 {
		return false
	} else {
		documentId := doc[0].Id
		if err := u.DeleteDocument(documentId); err != nil {
			fmt.Println(err)
			return false
		}
		fmt.Println("User", doc[0].Properties["username"], "deleted")
		return true
	}
}

func InitLoggedOutTokensRedis() *redisearch.Client {
	token_sc := redisearch.NewSchema(redisearch.DefaultOptions)
	token_sc.AddField(redisearch.NewTextFieldOptions("tokenString", redisearch.TextFieldOptions{Sortable: true}))

	t := redisearch.NewClient("localhost:6379", "tokens")
	err := t.Drop()
	if err != nil {
		fmt.Println(err)
	}
	t.CreateIndex(token_sc)
	return t
}

func AddLoggedOutToken(t *redisearch.Client, tokenString string) {
	fmt.Println("Token logged out", tokenString)
	if CheckLoggedOutToken(t, tokenString) {
		fmt.Println("Token already logged out")
	} else {
		doc := redisearch.NewDocument("loggedOutToken:"+tokenString, 1.0)
		doc.Set("tokenString", redisearch.EscapeTextFileString(tokenString))
		if err := t.Index([]redisearch.Document{doc}...); err != nil {
			log.Fatal(err)
		}
		fmt.Println("hi", doc)
	}
}

func CheckLoggedOutToken(t *redisearch.Client, tokenString string) bool {
	doc, total, _ := t.Search(redisearch.NewQuery(fmt.Sprintf("%s%s%s", `"`, redisearch.EscapeTextFileString(tokenString), `"`)).SetReturnFields("tokenString").Limit(0, 1))
	fmt.Println("Total such logged out tokens:", tokenString, ":", total, doc)
	if len(doc) == 0 {
		return false
	} else {
		return true
	}
}

func CreateBooking(b *redisearch.Client, username string, firstName string, lastName string, destination_id string, hotel_id string, supplier_id string, special_requests string, salutation string, email string, phone string, guests string, checkin string, checkout string, price string) {
	doc := redisearch.NewDocument("booking:"+username+"-"+hotel_id+"-"+checkin, 1.0)
	doc.Set("destination_id", destination_id)
	doc.Set("username", username)
	doc.Set("hotel_id", hotel_id)
	doc.Set("special_requests", special_requests)
	doc.Set("salutation", salutation)
	doc.Set("email", email)
	doc.Set("phone", phone)
	doc.Set("firstName", firstName)
	doc.Set("lastName", lastName)
	doc.Set("checkin", checkin)
	doc.Set("checkout", checkout)
	doc.Set("numberOfGuests", guests)
	doc.Set("price", price)
	if err := b.Index([]redisearch.Document{doc}...); err != nil {
		log.Fatal(err)
	}
}
