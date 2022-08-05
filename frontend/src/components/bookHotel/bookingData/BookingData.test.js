import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingData from './BookingData';
import userEvent, { user } from "@testing-library/user-event";
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import * as backend from "../../.././utils/backendAPI";


test('BookingData: Input Boxes', () => {
    let inputsToCheck = {}
    const handleBookingDataInputs = (inputs) => {
        inputsToCheck = inputs;
    }
    

    render(<BrowserRouter><BookingData
        handMeDowns={[{filterData:{
                            checkInDate:"08/09/22",
                            checkOutDate:"10/10/22",
                            numberOfRooms: 10,
                            minPrice: 0,
                            maxPrice: 10000,
                            destination: { id: 1 }},

                        hotel:{
                            "uid":"HotelIdTest", 
                            "cloudflareImageURL":"",
                            "suffix":"",
                            "rating":3,
                            "address":"Hotel Address",
                            "term":"Hotel Name",
                            "latitude":0,
                            "longitude":0
                        },

                        destination:{"uid":"DestIdTest"}
                    }]}
        handMeDownsIndex={0}
        backendPackage={{
            testIsLoggedIn: backend.testIsLoggedIn,
            sendSuccessfulPayment: backend.sendSuccessfulPayment,
            getStripePrice: backend.getStripePrice,
        }}
        test={1} 
        inputs={handleBookingDataInputs}
        /></BrowserRouter>);

        const input_FirstName = screen.getByTestId("First Name");
        const input_LastName = screen.getByTestId("Last Name");
        const input_PhoneNumber = screen.getByTestId("Phone Number");
        const input_Email = screen.getByTestId("Email");
        const input_SpecialRequests = screen.getByTestId("Special Requests");
        const submit_button = screen.getByTestId("BookingData_Submit");


        // fireEvent.change(input, { target: { value: "1" } });
        input_FirstName.focus();
        userEvent.keyboard("User 1");

        input_LastName.focus();
        userEvent.keyboard("Last 1");

        input_PhoneNumber.focus();
        userEvent.keyboard("65478912");

        input_Email.focus();
        userEvent.keyboard("user1@last1.com");

        input_SpecialRequests.focus();
        userEvent.keyboard("Nil");

        userEvent.click(submit_button);

        expect(inputsToCheck.firstName).toBe("User 1");
        expect(inputsToCheck.lastName).toBe("Last 1");
        expect(inputsToCheck.specialRequests).toBe("Nil");
        expect(inputsToCheck.phoneNumber).toBe("65478912");
        expect(inputsToCheck.userEmail).toBe("user1@last1.com");
     

});