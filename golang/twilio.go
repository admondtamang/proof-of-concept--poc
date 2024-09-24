package main

import (
	"encoding/json"
	"fmt"

	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
)

// temp-number.com use this site for testing phone number
// from phone number is provided by twillio 
func main() {
	accountSid := "*******************"
	authToken := "*******************"
	fromPhone := "+18338060981"


	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	params := &twilioApi.CreateMessageParams{}
	params.SetTo("+12085689507")
	params.SetFrom(fromPhone)
	params.SetBody("Hello from Go!")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println("Error sending SMS message: " + err.Error())
	} else {
		response, _ := json.Marshal(*resp)
		fmt.Println("Response: " + string(response))
	}
}
