package tests

import (
	"Go-Backend-Ascenda/Backend-API/redisdb"
	"testing"
)

func TestCheckExistingLogin(t *testing.T) {
	userClient := redisdb.InitUserRedis()
	redisdb.AddNewUser(userClient, "sunrise", "1234")
	if !redisdb.CheckLogin(userClient, "sunrise", "1234") {
		t.Fail()
	}
}

func TestCheckUnexistingLogin(t *testing.T) {
	userClient := redisdb.InitUserRedis()
	redisdb.AddNewUser(userClient, "sunrise", "1234")
	if redisdb.CheckExistingUser(userClient, "rktmeister") {
		t.Fail()
	}
}
