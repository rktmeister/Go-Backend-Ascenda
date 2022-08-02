package auth

import (
	"Go-Backend-Ascenda/Backend-API/redisdb"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/RediSearch/redisearch-go/redisearch"
	"github.com/cristalhq/jwt/v4"
	"github.com/gin-gonic/gin"
)

const jwtSecretKey = "HELLO WORLD"

var (
	jwtSigner   jwt.Signer
	jwtVerifier jwt.Verifier
)

func JwtSetup() {
	fmt.Println("setup")
	var err error
	key := []byte(jwtSecretKey)

	jwtSigner, err = jwt.NewSignerHS(jwt.HS256, key)
	if err != nil {
		log.Panic("Error creating JWT signer")
	}

	jwtVerifier, err = jwt.NewVerifierHS(jwt.HS256, key)
	if err != nil {
		log.Panic("Error creating JWT verifier")
	}
}

func GenerateJWT(username string, isRefresh bool) string {
	fmt.Println("gen")
	var expiryOffset time.Duration
	if isRefresh {
		expiryOffset = time.Hour * 24 * 7
	} else {
		expiryOffset = time.Minute * 15
	}

	claims := &jwt.RegisteredClaims{
		ID:        fmt.Sprint(username),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(expiryOffset)),
		//ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
	}
	builder := jwt.NewBuilder(jwtSigner)
	token, err := builder.Build(claims)
	if err != nil {
		log.Panic("Error building JWT")
	}
	return token.String()
}

func VerifyJWT(db *redisearch.Client, tokenStr string) (string, error) {
	fmt.Println(tokenStr)
	fmt.Println([]byte(tokenStr))
	fmt.Println("verify")

	if redisdb.CheckLoggedOutToken(db, tokenStr) {
		return "", errors.New("logged out already")
	}

	token, err := jwt.Parse([]byte(tokenStr), jwtVerifier)
	if err != nil {
		log.Println("Error parsing JWT")
		return "", err
	}

	if err := jwtVerifier.Verify(token); err != nil {
		log.Println("Error verifying token")
		return "", err
	}

	var claims jwt.RegisteredClaims
	if err := json.Unmarshal(token.Claims(), &claims); err != nil {
		log.Println("Error unmarshalling JWT claims")
		return "", err
	}
	fmt.Println(claims)

	if notExpired := claims.IsValidAt(time.Now()); !notExpired {
		return "", errors.New("Token expired.")
	}

	//   id, err := strconv.Atoi(claims.ID)
	//   if err != nil {
	//     log.Fatal("Error converting claims ID to number")
	//     return 0, errors.New("ID in token is not valid")
	//   }
	return claims.ID, err
}

func Authorization(ctx *gin.Context) {
	fmt.Println("auth")
	cookie, err := ctx.Cookie("access_jwt")
	fmt.Println(cookie)

	db, ok := ctx.MustGet("DB").(*redisearch.Client)
	if !ok {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	// authHeader := ctx.GetHeader("Authorization")
	// if authHeader == "" {
	// 	ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing."})
	// 	return
	// }
	// headerParts := strings.Split(authHeader, " ")
	// if len(headerParts) != 2 {
	// 	ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header format is not valid."})
	// 	return
	// }
	// if headerParts[0] != "Bearer" {
	// 	ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing bearer part."})
	// 	return
	// }
	username, err := VerifyJWT(db, cookie) //VerifyJWT(headerParts[1])
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	user, err := redisdb.GetUser(db, username)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	ctx.Set("user", user)
	ctx.Next()
}

func AddDatabaseToContext(u *redisearch.Client) gin.HandlerFunc {
	fmt.Println("adddbtocontext")
	return func(c *gin.Context) {
		c.Set("DB", u)
		c.Next()
	}
}
