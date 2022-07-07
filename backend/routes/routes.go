package routes

import (
	"github.com/gin-gonic/gin"

	"net/http"
)

func PublicRoutes(g *gin.RouterGroup) {
	g.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	g.GET("/hotels", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello World",
		})
	})
}
