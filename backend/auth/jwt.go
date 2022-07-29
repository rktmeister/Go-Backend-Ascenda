package auth

import (
	"github.com/cristalhq/jwt/v4"
	"log"
)

const jwtSecretKey = "HELLO WORLD"

var (
  jwtSigner   jwt.Signer
  jwtVerifier jwt.Verifier
)
 
func JwtSetup() {
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