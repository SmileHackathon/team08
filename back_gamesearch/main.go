package main

import (
	"encoding/json"
	// "fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"regexp"
)

type Game struct {
	Id   int    `json:"appid"`
	Name string `json:"name"`
}

var games []Game

func main() {

	// JSON
	bytes, err := ioutil.ReadFile("data/steam_all_apps.json")
	if err != nil {
		log.Fatal(err)
	}
	if err := json.Unmarshal(bytes, &games); err != nil {
		log.Fatal(err)
	}

	// Gin
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		keyword := c.Query("keyword")
		founds := search(keyword)
		// founds_json, _ := json.Marshal(founds)
		c.JSON(200, founds)
	})

	r.Run() // Run Gin
}

// TODO: +区切りでAND検索をできるようにする
func search(name string) []Game {
	if name == "" {
		return games
	}
	var result []Game
	r := regexp.MustCompile(name)
	for _, game := range games {
		if r.MatchString(game.Name) {
			result = append(result, game)
		}
	}
	return result
}
