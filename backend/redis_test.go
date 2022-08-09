package main

import (
	"Go-Backend-Ascenda/Backend-API/redisdb"
	"fmt"
	"testing"
)

func TestCheckLogin(t *testing.T) {
	userClient := redisdb.InitUserRedis()
	redisdb.AddNewUser(userClient, "rktmeister1", "1234")
	if !redisdb.CheckLogin(userClient, "rktmeister1", "1234") {
		fmt.Println("User not found!")
		t.Fail()
	}
}

func TestCheckNoLogin(t *testing.T) {
	userClient := redisdb.InitUserRedis()
	redisdb.AddNewUser(userClient, "rktmeister1", "1234")
	if redisdb.CheckLogin(userClient, "sunrise", "1234") {
		fmt.Println("User not found!")
		t.Fail()
	}
}

func TestAutoComplete(t *testing.T) {
	destClient, autoClient := redisdb.InitDestAndAutoCompleterRedis()
	var want redisdb.Destination
	var check []redisdb.Destination
	want.Dest = "Semarang, Indonesia"
	want.Uid = "d7kn"
	check = redisdb.AutoCompleteDestination(autoClient, destClient, "Semaran")
	if !(check[0].Dest == want.Dest && check[0].Uid == want.Uid) {
		fmt.Println("Auto Complete does not satisfy")
		t.Fail()
	}

}
