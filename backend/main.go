package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httptrace"
	"time"

	"Go-Backend-Ascenda/Backend-API/redisdb"

	"github.com/gin-gonic/gin"

	"Go-Backend-Ascenda/Backend-API/auth"
)

var (
	ListenAddr     = "localhost:3000"
	RedisearchDest = "localhost:6379"
)

// FOR LIST OF HOTELS PRICING
type ListOfHotelPrice struct {
	Id          string  `json:"id"`
	Price       float32 `json:"price"`
	LowestPrice float32 `json:"lowest_price"`
	SearchRank  float32 `json:"searchRank"`
}
type HotelsPrice struct {
	Completed bool               `json:"completed"`
	Prices    []ListOfHotelPrice `json:"hotels"`
}
type Hotel_Price struct {
	Id                    string
	HotelBriefDescription HotelBriefDescription
	Price                 float32
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

// *****************************************************************************

type Categories struct {
	Overall Overall `json:"overall"`
}

type Overall struct {
	Name       string  `json:"name"`
	Score      float32 `json:"score"`
	Popularity float32 `json:"popularity"`
}

type HotelBriefDescription struct {
	Id                  string        `json:"id"`
	Name                string        `json:"name"`
	Lat                 float64       `json:"latitude"`
	Lng                 float64       `json:"longitude"`
	Categories          Categories    `json:"categories"`
	Description         string        `json:"description"`
	Image_Details       Image_Details `json:"image_details"`
	Image               string        `json:"cloudflare_image_url"`
	Number_Of_Images    int           `json:"number_of_images"`
	Default_Image_Index int           `json:"default_image_index"`
	Address             string        `json:"address"`
	Rating              float64       `json:"rating"`
}

type Image_Details struct {
	Suffix string `json:"suffix"`
}

type SpecificHotelRoomPrice struct {
	Completed  bool         `json:"completed"`
	RoomPrices []RoomPrices `json:"rooms"`
}

type RoomPrices struct {
	Key                string             `json:"key"`
	RoomNormalDesc     string             `json:"roomNormalizedDescription"`
	Free_Cancel        bool               `json:"free_cancellation"`
	Images             []ImageUrl         `json:"images"`
	Price              float32            `json:"price"`
	RoomAdditionalInfo RoomAdditionalInfo `json:"roomAdditionalInfo"`
}

type RoomAdditionalInfo struct {
	Breakfast_Info string `json:"breakfast_info"`
}

type ImageUrl struct {
	Url string `json:"url"`
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// https://stackoverflow.com/questions/29418478/go-gin-framework-cors
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("CORS")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3001")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			// c.AbortWithStatus(204)
			c.Writer.WriteHeader(http.StatusOK)
			return
		}
		c.Next()
	}
}

// func callGetRequest(url string, hClient *http.Client, variable) {
// 	req, err := http.NewRequest(http.MethodGet, api_url_price, nil)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	res, getErr := hClient.Do(req)
// 	if getErr != nil {
// 		log.Fatal(getErr)
// 	}
// 	if res.Body != nil {
// 		defer res.Body.Close()
// 	}
// 	body, readErr := ioutil.ReadAll(res.Body)
// 	if readErr != nil {
// 		log.Fatal(readErr)
// 	}
// 	err = json.Unmarshal(body, &roomPrices)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// }

func main() {
	router := gin.Default()
	router.RedirectTrailingSlash = true
	router.Use(CORSMiddleware())

	t := http.DefaultTransport.(*http.Transport).Clone()
	t.MaxIdleConns = 100
	t.MaxConnsPerHost = 100
	t.MaxIdleConnsPerHost = 100

	hClient := http.Client{
		Timeout:   20 * time.Second,
		Transport: t,
	}
	clientTrace := &httptrace.ClientTrace{
		GotConn: func(info httptrace.GotConnInfo) {
			log.Printf("Connection reused: %t", info.Reused)
		},
	}
	traceCtx := httptrace.WithClientTrace(context.Background(), clientTrace)

	userClient := redisdb.InitUserRedis()
	loggedOutTokensClient := redisdb.InitLoggedOutTokensRedis()
	destClient, a := redisdb.InitDestAndAutoCompleterRedis()
	bookingClient := redisdb.InitBookingDataRedis()

	router.Use(func(c *gin.Context) {
		fmt.Println("HO")
		c.Set("key", "foo")
	})
	router.Use(auth.AddDatabasesToContext(userClient, loggedOutTokensClient))

	auth.JwtSetup()

	redisdb.AddNewUser(userClient, "rktmeister1", "1234")
	redisdb.CheckLogin(userClient, "rktmeister1", "1234")
	redisdb.DeleteUserDocument(userClient, "rktmeister1")

	redisdb.AddNewUser(userClient, "sunrise", "1234")
	redisdb.CheckLogin(userClient, "sunrise", "1234")

	redisdb.AddNewUser(userClient, "hoyo", "1234")
	redisdb.CheckLogin(userClient, "hoyo", "1234")

	redisdb.AddLoggedOutToken(loggedOutTokensClient, "qwoidh1d1821h0dh128hd12bdvb120bd0v12b0vd12bd")
	redisdb.CheckLoggedOutToken(loggedOutTokensClient, "qwoidh1d1821h0dh128hd12bdvb120bd0v12b0vd12bd")

	redisdb.CreateBooking(bookingClient, "rktmeister1", "dylan", "raharja", "WD0M", "diH7", "kaligo", "NO_REQ", "Mr.", "dylan.raharja@gmail.com", "65656565", "1", "2022-08-29", "2022-08-31", "300.59")

	api := router.Group("/api")
	{
		//// FOR DEBUGGING PURPOSES (WITHOUT HAVING TO LOG IN)
		// api.GET("/hotels/destination", func(c *gin.Context) {
		// 	var hotels []HotelBriefDescription
		// 	var prices HotelsPrice
		// 	destination := c.Query("destination")
		// 	checkin := c.Query("checkin")
		// 	checkout := c.Query("checkout")
		// 	guests := c.Query("guests")

		// 	api_url_price := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&partner_id=1&guests=%s", redisdb.GetDestinationUid(destClient, destination), checkin, checkout, guests)
		// 	api_url_hotel := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&partner_id=1&guests=%s", redisdb.GetDestinationUid(destClient, destination), checkin, checkout, guests)
		// 	fmt.Println(api_url_hotel)
		// 	// HOTEL FIRST
		// 	req, err := http.NewRequest(http.MethodGet, api_url_hotel, nil)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	res, getErr := hClient.Do(req)
		// 	if getErr != nil {
		// 		log.Fatal(getErr)
		// 	}
		// 	if res.Body != nil {
		// 		defer res.Body.Close()
		// 	}

		// 	body, readErr := ioutil.ReadAll(res.Body)
		// 	if readErr != nil {
		// 		log.Fatal(readErr)
		// 	}
		// 	err = json.Unmarshal(body, &hotels)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	// NOW PRICE
		// 	req, err = http.NewRequestWithContext(traceCtx, http.MethodGet, api_url_price, nil)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	res, getErr = hClient.Do(req)
		// 	if getErr != nil {
		// 		log.Fatal(getErr)
		// 	}
		// 	if _, err := io.Copy(ioutil.Discard, res.Body); err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	res.Body.Close()

		// 	time.Sleep(1500 * time.Millisecond)

		// 	req, err = http.NewRequestWithContext(traceCtx, http.MethodGet, api_url_price, nil)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	res, getErr = hClient.Do(req)
		// 	if getErr != nil {
		// 		log.Fatal(getErr)
		// 	}

		// 	defer res.Body.Close()

		// 	body, readErr = ioutil.ReadAll(res.Body)
		// 	if readErr != nil {
		// 		log.Fatal(readErr)
		// 	}
		// 	err = json.Unmarshal(body, &prices)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	// NOW MERGE
		// 	var hotel_price []Hotel_Price
		// 	for i := 0; i < len(hotels); i++ {
		// 		for j := 0; j < len(prices.Prices); j++ {
		// 			if hotels[i].Id == prices.Prices[j].Id {
		// 				hotel_price = append(hotel_price, Hotel_Price{Id: hotels[i].Id, HotelBriefDescription: hotels[i], Price: prices.Prices[j].Price})
		// 			}
		// 		}

		// 	}
		// 	c.JSON(http.StatusOK, gin.H{
		// 		"hotel_price": hotel_price,
		// 	})
		// })

		// api.GET("/room/hotel", func(c *gin.Context) {
		// 	hotelId := c.Query("hotelId")

		// 	destination_id := c.Query("destination_id")

		// 	checkin := c.Query("checkin")
		// 	checkout := c.Query("checkout")
		// 	guests := c.Query("guests")
		// 	api_url_room := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/%s", hotelId)

		// 	api_url_price := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/%s/price?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&guests=%s&partner_id=1", hotelId, destination_id, checkin, checkout, guests)

		// 	var hotelBriefDescription HotelBriefDescription
		// 	req, err := http.NewRequest(http.MethodGet, api_url_room, nil)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}
		// 	res, getErr := hClient.Do(req)
		// 	if getErr != nil {
		// 		log.Fatal(getErr)
		// 	}
		// 	if res.Body != nil {
		// 		defer res.Body.Close()
		// 	}
		// 	body, readErr := ioutil.ReadAll(res.Body)
		// 	if readErr != nil {
		// 		log.Fatal(readErr)
		// 	}
		// 	err = json.Unmarshal(body, &hotelBriefDescription)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	// localhost:3000/api/room/hotel?hotelId=diH7&destination_id=WD0M&checkin=2022-08-26&checkout=2022-08-29&lang=en_US&currency=SGD&partner_id=1&guests=2
		// 	var roomPrices SpecificHotelRoomPrice
		// 	// fmt.Println(api_url_price)

		// 	req, err = http.NewRequestWithContext(traceCtx, http.MethodGet, api_url_price, nil)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}
		// 	// fmt.Println(req)
		// 	res, getErr = hClient.Do(req)
		// 	if getErr != nil {
		// 		log.Fatal(getErr)
		// 	}
		// 	if _, err := io.Copy(ioutil.Discard, res.Body); err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	res.Body.Close()

		// 	time.Sleep(1000 * time.Millisecond)

		// 	req, err = http.NewRequest(http.MethodGet, api_url_price, nil)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}
		// 	res, getErr = hClient.Do(req)
		// 	if getErr != nil {
		// 		log.Fatal(getErr)
		// 	}
		// 	if res.Body != nil {
		// 		defer res.Body.Close()
		// 	}
		// 	body, readErr = ioutil.ReadAll(res.Body)
		// 	if readErr != nil {
		// 		log.Fatal(readErr)
		// 	}
		// 	err = json.Unmarshal(body, &roomPrices)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}

		// 	c.JSON(http.StatusOK, gin.H{
		// 		"roomPrice": roomPrices,
		// 		"hotelDesc": hotelBriefDescription,
		// 	})
		// })
		//////////////////////////////////////////////////////////////////////////////////////////////

		api.POST("/login", func(c *gin.Context) {
			var user User
			c.BindJSON(&user)
			fmt.Println(user)
			if redisdb.CheckLogin(userClient, user.Username, user.Password) {
				c.SetCookie("refresh_jwt", auth.GenerateJWT(user.Username, true), 60*60*24*7, "/", "", false, true) // 60*60*24*7 for 7 days
				c.SetCookie("access_jwt", auth.GenerateJWT(user.Username, false), 60*15, "/", "", false, true)      // 60*15 for 15 min
				c.JSON(200, gin.H{
					"message": "login success",
					"success": true,
					//"jwt":     auth.GenerateJWT(user.Username),
				})
			} else {
				c.JSON(401, gin.H{
					"message": "login failed",
					"success": false,
				})
			}
		})

		api.POST("/register", func(c *gin.Context) {
			var user User
			c.BindJSON(&user)
			if !redisdb.CheckExistingUser(userClient, user.Username) {
				c.SetCookie("refresh_jwt", auth.GenerateJWT(user.Username, true), 60*60*24*7, "/", "", false, true) // 60*60*24*7 for 7 days
				c.SetCookie("access_jwt", auth.GenerateJWT(user.Username, false), 60*15, "/", "", false, true)      // 60*15 for 15 min
				redisdb.AddNewUser(userClient, user.Username, user.Password)
				c.JSON(200, gin.H{
					"message": "register success",
					"success": true,
				})
			} else {
				c.JSON(401, gin.H{
					"message": "register failed",
					"success": false,
				})
			}
		})

		api.POST("/refresh", func(c *gin.Context) {
			cookie, err := c.Cookie("refresh_jwt")
			if err != nil {
				fmt.Println(err)
				c.JSON(401, gin.H{
					"message": "refresh failed",
					"success": false,
				})
			}
			username, err := auth.VerifyJWT(loggedOutTokensClient, cookie)
			if err != nil {
				fmt.Println(err)
				c.JSON(401, gin.H{
					"message": "refresh failed",
					"success": false,
				})
			}
			user, err := redisdb.GetUser(userClient, username)
			if err == nil {
				c.SetCookie("access_jwt", auth.GenerateJWT(user.Username, false), 60*15, "/", "", false, true) // 60*15 for 15 min
				c.JSON(200, gin.H{
					"message":  "refresh success",
					"username": username,
					"success":  true,
				})
			} else {
				fmt.Println(err)
				c.JSON(401, gin.H{
					"message": "refresh failed",
					"success": false,
				})
			}
		})

		api.OPTIONS("/deleteAccount", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "delete success",
				"success": true,
			})
		})
	}

	authorized := api.Group("/")
	authorized.Use(auth.Authorization)
	{
		authorized.GET("/testAccessToken", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "ok",
				"success": true,
			})
		})

		authorized.POST("/logout", func(c *gin.Context) {
			refreshCookie, err := c.Cookie("refresh_jwt")
			if err != nil {
				fmt.Println(err)
				c.JSON(401, gin.H{
					"message": "logout failed",
					"success": false,
				})
			}
			accessCookie, err := c.Cookie("access_jwt")
			if err != nil {
				fmt.Println(err)
				c.JSON(401, gin.H{
					"message": "logout failed",
					"success": false,
				})
			}
			redisdb.AddLoggedOutToken(loggedOutTokensClient, refreshCookie)
			redisdb.AddLoggedOutToken(loggedOutTokensClient, accessCookie)
			c.JSON(200, gin.H{
				"message": "logout success",
				"success": true,
			})
		})

		authorized.DELETE("/deleteAccount", func(c *gin.Context) {
			var user User
			c.BindJSON(&user)
			fmt.Println(user)
			fmt.Println(user.Username)
			fmt.Println(user.Password)
			if redisdb.CheckLogin(userClient, user.Username, user.Password) {
				fmt.Println("YAY")
				if redisdb.DeleteUserDocument(userClient, user.Username) {
					c.JSON(200, gin.H{
						"message": "delete success",
						"success": true,
					})
				} else {
					fmt.Println("A")
					c.JSON(401, gin.H{
						"message": "delete failed for unknown reasons",
						"success": false,
					})
				}
			} else {
				fmt.Println("B")
				c.JSON(401, gin.H{
					"message": "delete failed because user not found",
					"success": false,
				})
			}
		})

		authorized.GET("/destinations/fuzzyName", func(c *gin.Context) {
			search := c.Query("search")
			// fmt.Println(search)
			c.JSON(http.StatusOK, redisdb.AutoCompleteDestination(a, destClient, search))
		})

		// "localhost:3000/api/hotels/destination?destination=Singapore, Singapore&checkin=2022-08-29&checkout=2022-08-31&guests=2"

		authorized.GET("/hotels/destination", func(c *gin.Context) {
			var hotels []HotelBriefDescription
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
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}

			res, getErr := hClient.Do(req)
			if getErr != nil {
				// log.Fatal(getErr)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}
			if res.Body != nil {
				defer res.Body.Close()
			}

			body, readErr := ioutil.ReadAll(res.Body)
			if readErr != nil {
				// log.Fatal(readErr)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}
			err = json.Unmarshal(body, &hotels)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}

			// NOW PRICE
			req, err = http.NewRequestWithContext(traceCtx, http.MethodGet, api_url_price, nil)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}

			res, getErr = hClient.Do(req)
			if getErr != nil {
				// log.Fatal(getErr)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}
			if _, err := io.Copy(ioutil.Discard, res.Body); err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}

			res.Body.Close()

			time.Sleep(1500 * time.Millisecond)

			req, err = http.NewRequestWithContext(traceCtx, http.MethodGet, api_url_price, nil)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}

			res, getErr = hClient.Do(req)
			if getErr != nil {
				// log.Fatal(getErr)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}

			defer res.Body.Close()

			body, readErr = ioutil.ReadAll(res.Body)
			if readErr != nil {
				// log.Fatal(readErr)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}
			err = json.Unmarshal(body, &prices)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel failed",
					"success": false,
				})
				return
			}

			// NOW MERGE
			var hotel_price []Hotel_Price
			for i := 0; i < len(hotels); i++ {
				for j := 0; j < len(prices.Prices); j++ {
					if hotels[i].Id == prices.Prices[j].Id {
						hotel_price = append(hotel_price, Hotel_Price{Id: hotels[i].Id, HotelBriefDescription: hotels[i], Price: prices.Prices[j].Price})
					}
				}

			}
			c.JSON(http.StatusOK, gin.H{
				"hotel_price": hotel_price,
			})
		})

		authorized.GET("/room/hotel", func(c *gin.Context) {
			hotelId := c.Query("hotelId")

			destination_id := c.Query("destination_id")

			checkin := c.Query("checkin")
			checkout := c.Query("checkout")
			guests := c.Query("guests")
			api_url_room := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/%s", hotelId)

			api_url_price := fmt.Sprintf("https://hotelapi.loyalty.dev/api/hotels/%s/price?destination_id=%s&checkin=%s&checkout=%s&lang=en_US&currency=SGD&guests=%s&partner_id=1", hotelId, destination_id, checkin, checkout, guests)

			var hotelBriefDescription HotelBriefDescription
			req, err := http.NewRequest(http.MethodGet, api_url_room, nil)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			res, getErr := hClient.Do(req)
			if getErr != nil {
				// log.Fatal(getErr)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			if res.Body != nil {
				defer res.Body.Close()
			}
			body, readErr := ioutil.ReadAll(res.Body)
			if readErr != nil {
				// log.Fatal(readErr)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			err = json.Unmarshal(body, &hotelBriefDescription)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}

			// localhost:3000/api/room/hotel?hotelId=diH7&destination_id=WD0M&checkin=2022-08-26&checkout=2022-08-29&lang=en_US&currency=SGD&partner_id=1&guests=2
			var roomPrices SpecificHotelRoomPrice
			// fmt.Println(api_url_price)
			req, err = http.NewRequestWithContext(traceCtx, http.MethodGet, api_url_price, nil)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			res, getErr = hClient.Do(req)
			if getErr != nil {
				// log.Fatal(getErr)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			if _, err := io.Copy(ioutil.Discard, res.Body); err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			res.Body.Close()
			time.Sleep(1000 * time.Millisecond)
			req, err = http.NewRequest(http.MethodGet, api_url_price, nil)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			res, getErr = hClient.Do(req)
			if getErr != nil {
				// log.Fatal(getErr)
			}
			if res.Body != nil {
				defer res.Body.Close()
			}
			body, readErr = ioutil.ReadAll(res.Body)
			if readErr != nil {
				// log.Fatal(readErr)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}
			err = json.Unmarshal(body, &roomPrices)
			if err != nil {
				// log.Fatal(err)
				c.JSON(401, gin.H{
					"message": "get hotel rooms failed",
					"success": false,
				})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"roomPrice": roomPrices,
				"hotelDesc": hotelBriefDescription,
			})
		})

		authorized.POST("/room/hotel/book", func(c *gin.Context) {
			if err := redisdb.CreateBooking(bookingClient, c.PostForm("username"), c.PostForm("firstName"), c.PostForm("lastName"), c.PostForm("destination_id"), c.PostForm("hotel_id"), c.PostForm("supplier_id"), c.PostForm("special_requests"), c.PostForm("salutation"),
				c.PostForm("email"), c.PostForm("phone"), c.PostForm("guests"), c.PostForm("checkin"), c.PostForm("checkout"), c.PostForm("price")); err != nil {
				c.JSON(http.StatusOK, gin.H{
					"message": "ok",
					"success": true,
				})
			} else {
				c.JSON(401, gin.H{
					"message": "booking failed",
					"success": false,
				})
			}

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
