package main

import "github.com/gin-gonic/gin"

func main() {

	// Gin
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		keyword := c.Query("keyword")
		c.JSON(200, gin.H{
			"message": keyword,
		})
	})

	r.Run() // Run Gin
}
