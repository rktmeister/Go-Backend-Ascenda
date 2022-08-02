package main

import (
	"Go-Backend-Ascenda/Backend-API/redisdb"
	"testing"

	"github.com/RediSearch/redisearch-go/redisearch"
)

func FuzzCheckLogin(f *testing.F) {
	// f.Add()
	f.Fuzz(func(t *testing.T, u *redisearch.Client, a string, b string) {
		result := redisdb.CheckLogin(u, a, b)
		if !result {
			t.Error("Login Details Not Found")
		}
	})
}

func FuzzAutoComplete(f *testing.F) {
	// f.Add()
	f.Fuzz(func(t *testing.T, a *redisearch.Autocompleter, c *redisearch.Client, prefix string) {
		result := redisdb.AutoCompleteDestination(a, c, prefix)
		if len(result) == 0 {
			t.Error("No Autocomplete Destinations Found")
		}
	})
}
