package auth

import (
	"Go-Backend-Ascenda/Backend-API/redisdb"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
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

func GenerateJWT(username string) string {
	fmt.Println("gen")
	claims := &jwt.RegisteredClaims{
		ID:        fmt.Sprint(username),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
	}
	builder := jwt.NewBuilder(jwtSigner)
	token, err := builder.Build(claims)
	if err != nil {
		log.Panic("Error building JWT")
	}
	return token.String()
}

func VerifyJWT(tokenStr string) (string, error) {
	fmt.Println(tokenStr)
	fmt.Println([]byte(tokenStr))
	fmt.Println("verify")
	token, err := jwt.Parse([]byte(tokenStr), jwtVerifier)
	if err != nil {
		log.Fatal("Error parsing JWT")
		return "", err
	}

	if err := jwtVerifier.Verify(token); err != nil {
		log.Fatal("Error verifying token")
		return "", err
	}

	var claims jwt.RegisteredClaims
	if err := json.Unmarshal(token.Claims(), &claims); err != nil {
		log.Fatal("Error unmarshalling JWT claims")
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
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing."})
		return
	}
	headerParts := strings.Split(authHeader, " ")
	if len(headerParts) != 2 {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header format is not valid."})
		return
	}
	if headerParts[0] != "Bearer" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing bearer part."})
		return
	}
	username, err := VerifyJWT(headerParts[1])
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	db, ok := ctx.MustGet("DB").(*redisearch.Client)
	if !ok {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	user, err := (redisdb.GetUser(db, username))
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
