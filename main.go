package main

import (
	"encoding/json"
	"fmt"
	// "github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
)

type Game struct {
	Id   int    `json:"appid"`
	Name string `json:name`
}

var games[]Game

func main() {

	// Gin
	// r := gin.Default()
	// r.GET("/", func(c *gin.Context) {
	// 	keyword := c.Query("keyword")
	// 	c.JSON(200, gin.H{
	// 		"message": keyword,
	// 	})
	// })

	// JSON
	bytes, err := ioutil.ReadFile("data/steam_all_apps.json")
	if err != nil {
		log.Fatal(err)
	}
	if err := json.Unmarshal(bytes, &games); err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("JSON Loaded")
	}

	// r.Run() // Run Gin
}
