import React from "react";
import HotelSearchResults from './HotelSearchResults';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent, { user } from "@testing-library/user-event";
import { keyboard } from '@testing-library/user-event/dist/keyboard';

const mockHotel = (uid) => {
    const res = {
        uid,
        term: uid.toString(),
        number_of_rooms: uid,
        price: uid,
        latitude: uid,
        longitude: uid,
        description: uid.toString(),
    };
    //console.log(res);
    return res;
}

const hotelList = [
    {
        "uid": "1",
        "term": "Hotel1",
        "number_of_rooms": 1,
        "price": 1000,
        "latitude": 1,
        "longitude": 1,
        "description": "Hotel1",
        "rating":1
    },
    {
        "uid": "2",
        "term": "Hotel2",
        "number_of_rooms": 2,
        "price": 2000,
        "latitude": 2,
        "longitude": 2,
        "description": "Hotel2",
        "rating":2
    },
    {
        "uid": "3",
        "term": "Hotel3",
        "number_of_rooms": 3,
        "price": 3000,
        "latitude": 3,
        "longitude": 3,
        "description": "Hotel3",
        "rating":3
    },
    {
        "uid": "3_1",
        "term": "Hotel3_1",
        "number_of_rooms": 3,
        "price": 3000,
        "latitude": 31,
        "longitude": 31,
        "description": "Hotel3_1",
        "rating":3
    }
]



// ========================= HotelSearchResults: Show All Test ============================= //
test("HotelSearchResults: Show All Test", async () => {


    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 10000,
                minRating:0,
                maxRating:10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}


    /></BrowserRouter>);

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })

    ////console.log(screen.debug());

    const Hotel_1 = screen.getAllByTestId("HotelSearchResults_Hotel1");            // Only 1
    const Hotel_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel1_1000_1");  // Only 1
    expect(Hotel_1.length).toBe(1);
    expect(Hotel_1_price_rating.length).toBe(1);


    const Hotel_2 = screen.getAllByTestId("HotelSearchResults_Hotel2");            // Only 1
    const Hotel_2_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel2_2000_2");  // Only 1
    expect(Hotel_2.length).toBe(1);
    expect(Hotel_2_price_rating.length).toBe(1);

    const Hotel_3 = screen.getAllByTestId("HotelSearchResults_Hotel3");            // Only 1
    const Hotel_3_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_3000_3");  // Only 1
    expect(Hotel_3.length).toBe(1);
    expect(Hotel_3_price_rating.length).toBe(1);

    const Hotel_3_1 = screen.getAllByTestId("HotelSearchResults_Hotel3_1");            // Only 1
    const Hotel_3_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_1_3000_3");  // Only 1
    expect(Hotel_3_1.length).toBe(1);
    expect(Hotel_3_1_price_rating.length).toBe(1);

});

// ========================= HotelSearchResults: Show All Test ============================= //







// ========================= HotelSearchResults: Price Filter Tests ============================= //

test("HotelSearchResults: Price Filter Min Boundary Test", async () => {


    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,         
                maxPrice: 100,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");         
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");          
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3"); 
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");        
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); 
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});




test("HotelSearchResults: Price Filter Max Boundary Test", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 4000,         
                maxPrice: 10000,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");         
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");          
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3"); 
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");        
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); 
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});




test("HotelSearchResults: Price Filter Test 1", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 1000,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.getAllByTestId("HotelSearchResults_Hotel1");            // Only 1
    const Hotel_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel1_1000_1");  // Only 1
    expect(Hotel_1.length).toBe(1);
    expect(Hotel_1_price_rating.length).toBe(1);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");         
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3");  
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");          
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3");  
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});




test("HotelSearchResults: Price Filter Test 2", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 2000,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.getAllByTestId("HotelSearchResults_Hotel1");            // Only 1
    const Hotel_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel1_1000_1");  // Only 1
    expect(Hotel_1.length).toBe(1);
    expect(Hotel_1_price_rating.length).toBe(1);


    const Hotel_2 = screen.getAllByTestId("HotelSearchResults_Hotel2");          // Only 1
    const Hotel_2_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel2_2000_2");  // Only 1
    expect(Hotel_2.length).toBe(1);
    expect(Hotel_2_price_rating.length).toBe(1);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3");  
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");          
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3");  
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});




test("HotelSearchResults: Price Filter Test 3", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 1001,         // Set to be 1001 intentionally
                maxPrice: 3000,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");       
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.getAllByTestId("HotelSearchResults_Hotel2");          // Only 1
    const Hotel_2_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel2_2000_2");  // Only 1
    expect(Hotel_2.length).toBe(1);
    expect(Hotel_2_price_rating.length).toBe(1);

    const Hotel_3 = screen.getAllByTestId("HotelSearchResults_Hotel3");        // Only 1
    const Hotel_3_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_3000_3");  // Only 1
    expect(Hotel_3.length).toBe(1);
    expect(Hotel_3_price_rating.length).toBe(1);

    const Hotel_3_1 = screen.getAllByTestId("HotelSearchResults_Hotel3_1");          // Only 1
    const Hotel_3_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_1_3000_3");  // Only 1
    expect(Hotel_3_1.length).toBe(1);
    expect(Hotel_3_1_price_rating.length).toBe(1);

});




test("HotelSearchResults: Price Filter Test 4", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 2001,         // Set to be 2001 intentionally
                maxPrice: 4000,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");         
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");          
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.getAllByTestId("HotelSearchResults_Hotel3");        // Only 1
    const Hotel_3_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_3000_3");  // Only 1
    expect(Hotel_3.length).toBe(1);
    expect(Hotel_3_price_rating.length).toBe(1);

    const Hotel_3_1 = screen.getAllByTestId("HotelSearchResults_Hotel3_1");          // Only 1
    const Hotel_3_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_1_3000_3");  // Only 1
    expect(Hotel_3_1.length).toBe(1);
    expect(Hotel_3_1_price_rating.length).toBe(1);

});




// ========================= HotelSearchResults: Price Filter Tests ============================= //





// ========================= HotelSearchResults: Rating Filter Tests ============================= //


test("HotelSearchResults: Rating Filter Min Boundary Test", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,         
                maxPrice: 10000,
                minRating: 0,
                maxRating: 0
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");         
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");          
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3"); 
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");        
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); 
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});




test("HotelSearchResults: Rating Filter Max Boundary Test", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,         
                maxPrice: 10000,
                minRating: 10,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");         
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");          
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3"); 
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");        
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); 
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});



test("HotelSearchResults: Rating Filter Test 1", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 10000,
                minRating: 0,
                maxRating: 1
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })


    //console.log(screen.debug());

    const Hotel_1 = screen.getAllByTestId("HotelSearchResults_Hotel1");         // Only 1
    const Hotel_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel1_1000_1");  // Only 1
    expect(Hotel_1.length).toBe(1);
    expect(Hotel_1_price_rating.length).toBe(1);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");          
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3"); 
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");        
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); 
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});




test("HotelSearchResults: Rating Filter Test 2", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 10000,
                minRating: 0,
                maxRating: 2
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })


    //console.log(screen.debug());

    const Hotel_1 = screen.getAllByTestId("HotelSearchResults_Hotel1");         // Only 1
    const Hotel_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel1_1000_1");  // Only 1
    expect(Hotel_1.length).toBe(1);
    expect(Hotel_1_price_rating.length).toBe(1);


    const Hotel_2 = screen.getAllByTestId("HotelSearchResults_Hotel2");          // Only 1
    const Hotel_2_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel2_2000_2");  // Only 1
    expect(Hotel_2.length).toBe(1);
    expect(Hotel_2_price_rating.length).toBe(1);

    const Hotel_3 = screen.queryAllByTestId("HotelSearchResults_Hotel3");        
    const Hotel_3_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_3000_3"); 
    expect(Hotel_3.length).toBe(0);
    expect(Hotel_3_price_rating.length).toBe(0);

    const Hotel_3_1 = screen.queryAllByTestId("HotelSearchResults_Hotel3_1");        
    const Hotel_3_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); 
    expect(Hotel_3_1.length).toBe(0);
    expect(Hotel_3_1_price_rating.length).toBe(0);

});




test("HotelSearchResults: Rating Filter Test 3", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 10000,
                minRating: 2,
                maxRating: 3
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");     
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.getAllByTestId("HotelSearchResults_Hotel2");          // Only 1
    const Hotel_2_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel2_2000_2");  // Only 1
    expect(Hotel_2.length).toBe(1);
    expect(Hotel_2_price_rating.length).toBe(1);

    const Hotel_3 = screen.getAllByTestId("HotelSearchResults_Hotel3");        // Only 1
    const Hotel_3_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_3000_3"); // Only 1
    expect(Hotel_3.length).toBe(1);
    expect(Hotel_3_price_rating.length).toBe(1);

    const Hotel_3_1 = screen.getAllByTestId("HotelSearchResults_Hotel3_1");        // Only 1
    const Hotel_3_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); // Only 1
    expect(Hotel_3_1.length).toBe(1);
    expect(Hotel_3_1_price_rating.length).toBe(1);

});




test("HotelSearchResults: Rating Filter Test 4", async () => {

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 10000,
                minRating: 3,
                maxRating: 6
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}

    /></BrowserRouter>);
    

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })


    //console.log(screen.debug());

    const Hotel_1 = screen.queryAllByTestId("HotelSearchResults_Hotel1");     
    const Hotel_1_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel1_1000_1");  
    expect(Hotel_1.length).toBe(0);
    expect(Hotel_1_price_rating.length).toBe(0);


    const Hotel_2 = screen.queryAllByTestId("HotelSearchResults_Hotel2");          
    const Hotel_2_price_rating = screen.queryAllByTestId("HotelSearchResults_Hotel2_2000_2");  
    expect(Hotel_2.length).toBe(0);
    expect(Hotel_2_price_rating.length).toBe(0);

    const Hotel_3 = screen.getAllByTestId("HotelSearchResults_Hotel3");        // Only 1
    const Hotel_3_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_3000_3"); // Only 1
    expect(Hotel_3.length).toBe(1);
    expect(Hotel_3_price_rating.length).toBe(1);

    const Hotel_3_1 = screen.getAllByTestId("HotelSearchResults_Hotel3_1");        // Only 1
    const Hotel_3_1_price_rating = screen.getAllByTestId("HotelSearchResults_Hotel3_1_3000_3"); // Only 1
    expect(Hotel_3_1.length).toBe(1);
    expect(Hotel_3_1_price_rating.length).toBe(1);

});


// ========================= HotelSearchResults: Rating Filter Tests ============================= //





// ========================= HotelSearchResults: Selection Tests ============================= //


test("HotelSearchResults: Selection Test 1 (Single Selection)", async () => {

    let selectedInfo = {};
    const getSelected = (selected) =>{
        selectedInfo = selected;
    }

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 10000,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}
        testGetSelected = {getSelected}             // Under handleChoice()

    /></BrowserRouter>);
    
    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })
    
    await act(async ()=>{

        const Hotel1_button = screen.getByTestId("HotelSearchResults_Hotel1_Button");    // In FilterBar.js
        userEvent.click(Hotel1_button);
        
    })

    expect(selectedInfo).toStrictEqual({
                                        "uid": "1",
                                        "term": "Hotel1",
                                        "number_of_rooms": 1,
                                        "price": 1000,
                                        "latitude": 1,
                                        "longitude": 1,
                                        "description": "Hotel1",
                                        "rating":1
                                    })

});



test("HotelSearchResults: Selection Test 2 (Changing of Selection)", async () => {

    let selectedInfo = {};
    const getSelected = (selected) =>{
        selectedInfo = selected;
    }

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 10000,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}
        testGetSelected = {getSelected}             // Under handleChoice()

    /></BrowserRouter>);
    
    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })
    
    await act(async ()=>{

        const Hotel1_button = screen.getByTestId("HotelSearchResults_Hotel1_Button");    // In FilterBar.js
        userEvent.click(Hotel1_button);

        expect(selectedInfo).toStrictEqual({
            "uid": "1",
            "term": "Hotel1",
            "number_of_rooms": 1,
            "price": 1000,
            "latitude": 1,
            "longitude": 1,
            "description": "Hotel1",
            "rating":1
        })

        const Hotel2_button = screen.getByTestId("HotelSearchResults_Hotel2_Button");    // In FilterBar.js
        userEvent.click(Hotel2_button);
        
        expect(selectedInfo).toStrictEqual({
            "uid": "2",
            "term": "Hotel2",
            "number_of_rooms": 2,
            "price": 2000,
            "latitude": 2,
            "longitude": 2,
            "description": "Hotel2",
            "rating":2
        });


        const Hotel3_button = screen.getByTestId("HotelSearchResults_Hotel3_Button");    // In FilterBar.js
        userEvent.click(Hotel3_button);
        
        expect(selectedInfo).toStrictEqual({
            "uid": "3",
            "term": "Hotel3",
            "number_of_rooms": 3,
            "price": 3000,
            "latitude": 3,
            "longitude": 3,
            "description": "Hotel3",
            "rating":3
        });



        const Hotel3_1_button = screen.getByTestId("HotelSearchResults_Hotel3_1_Button");    // In FilterBar.js
        userEvent.click(Hotel3_1_button);
        
        expect(selectedInfo).toStrictEqual({
            "uid": "3_1",
            "term": "Hotel3_1",
            "number_of_rooms": 3,
            "price": 3000,
            "latitude": 31,
            "longitude": 31,
            "description": "Hotel3_1",
            "rating":3
        });



    })

    

});


// ========================= HotelSearchResults: Selection Tests ============================= //




// ========================= HotelSearchResults: Calls of Backend for New Data Tests ============================= //

test("HotelSearchResults: Number of Rooms Submission Calls Backend for New Data", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }


    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
            filterData:{
                checkInDate:"",
                checkOutDate:"",
                numberOfRooms: 10,
                minPrice: 0,
                maxPrice: 100,
                minRating: 0,
                maxRating: 10
            },
            destination: { uid: 1 },
        }]}
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("numberOfRoomsTest");    // In FilterBar.js

        input.focus();

        userEvent.keyboard("2");

        const filterBarSubmitButton = screen.getByTestId("filterBarSubmitButton");
        userEvent.click(filterBarSubmitButton);
        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })


    expect(calledBackend).toBe(true);

});





test("HotelSearchResults: Checkin Date Submission Calls Backend for New Data", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
                filterData:{
                    checkInDate:"",
                    checkOutDate:"",
                    numberOfRooms: 10,
                    minPrice: 0,
                    maxPrice: 100},
                destination: { uid: 1 },
            }]}
        
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("checkInDateTest");        // In FilterBar.js

        input.focus();
        //userEvent.keyboard("03102022");
        fireEvent.mouseDown(input);
        fireEvent.change(input, {target: {value:"2022-10-03"}})

        const filterBarSubmitButton = screen.getByTestId("filterBarSubmitButton");
        userEvent.click(filterBarSubmitButton);
        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })

    expect(calledBackend).toBe(true);

});





test("HotelSearchResults: Checkout Date Submission Calls Backend for New Data", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><HotelSearchResults
        backendPackage={{
            getHotelBatch: () => {
                return hotelList
            }
        }}

        handMeDowns={[{
                filterData:{
                    checkInDate:"",
                    checkOutDate:"",
                    numberOfRooms: 10,
                    minPrice: 0,
                    maxPrice: 100},
                destination: { uid: 1 },
            }]}
        
        handMeDownsIndex={0}

        test = {1}
        testData = {hotelList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);

    await act(async ()=>{

        const input = screen.getByTestId("checkOutDateTest");        // In FilterBar.js

        input.focus();
        fireEvent.mouseDown(input);
        fireEvent.change(input, {target: {value:"2022-10-03"}})

        const filterBarSubmitButton = screen.getByTestId("filterBarSubmitButton");
        userEvent.click(filterBarSubmitButton);
        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })


    expect(calledBackend).toBe(true);

}); 

// ========================= HotelSearchResults: test calls of backend for new data ============================= //











// test("uhh", async () => {
//     let obj = 0;
//     const belayedRender = () => {
//         render(<BrowserRouter><HotelSearchResults
//             handMeDowns={[{
//                 filterData:{
//                     checkInDate:"",
//                     checkOutDate:"",
//                     numberOfRooms: 10,
//                     minPrice: 0,
//                     maxPrice: 100},
//                 destination: { uid: 1 },
//             }]}
//             handMeDownsIndex={0}
//             backendPackage={{
//                 getHotelBatch: async (a, b, c, d, e) => {
//                     await act(async () => obj++);
//                     return await act(async () => [obj].map(mockHotel));
//                 }
//             }}
//         /></BrowserRouter>);
//     };


//     await act(belayedRender);
//     await console.log(screen.debug())
//     console.log("obj", obj);
//     expect(obj).toBe(19);
// });

