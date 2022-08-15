import { render, screen } from '@testing-library/react';
import RemoveDescriptionDuplicate from "./parts/RemoveDescriptionDuplicate";
import HotelRoomBox from "./parts/HotelRoomBox.js";
import HotelRoomDetails from "./HotelRoomDetails.js";
import ListOfRoomTypes from "./parts/ListOfRoomTypes";
import { BrowserRouter as Router } from 'react-router-dom';
import { getHotelRoomBatch } from '../../../utils/backendAPI';





//========================== Remove Duplicates Function Tests ===============================// 

test('Remove duplicates empty', () => {
  const testArray = [];
  expect(RemoveDescriptionDuplicate(testArray)).toEqual([]);
});

test('Remove duplicates 1', () => {
  const testArray = ["Element 1", "Element 1", "Element 2"];
  expect(RemoveDescriptionDuplicate(testArray)).toEqual(["Element 1", "Element 2"]);
});

test('Remove duplicates 2', () => {
  const testArray = ["Element 1", "element 1", "Element 2"];
  expect(RemoveDescriptionDuplicate(testArray)).toEqual(["Element 1", "element 1", "Element 2"]);
});

test('Remove duplicates 3', () => {
  const testArray = ["Element 1", "Element 2"];
  expect(RemoveDescriptionDuplicate(testArray)).toEqual(["Element 1", "Element 2"]);
});

//========================== Remove Duplicates Function Tests ===============================// 








// =================================== Test Setup ===================================== //

  const rooms = [{"key": 1, "roomNormalizedDescription":"Room 1", "price":500, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false, "images":[" ", " "]}, 
                  {"key": 2, "roomNormalizedDescription":"Room 2", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false, "images":[" ", " "]}, 
                  {"key": 3, "roomNormalizedDescription":"Room 2", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true, "images":[" ", " "]},
                  {"key": 4, "roomNormalizedDescription":"Room 3", "price":900, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true, "images":[" ", " "]},
                  {"key": 5, "roomNormalizedDescription":"Room 4", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false, "images":[" ", " "]},
                  {"key": 6, "roomNormalizedDescription":"Room 4", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true, "images":[" ", " "]},
                  {"key": 7, "roomNormalizedDescription":"Room 4", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": false, "images":[" ", " "]}
                ];

  const handleChooseRoom = (room) => {
      let buttonToColor = document.getElementById(room.key + "_CHOOSE");
      buttonToColor.style.background = "rgb(255, 140, 0)";
      buttonToColor.selected = true;
      setChosenRoom(room);
  
  
      console.log("prevChosenRoom : ", prevChosenRoom)
      if (prevChosenRoom === null){
        setPrevChosenRoom(room)
      }
  
      else if(prevChosenRoom !== room)
      {
        console.log("prevChosenRoom : ", prevChosenRoom)
        let prevButtonToUncolor = document.getElementById(prevChosenRoom.key + "_CHOOSE");
        prevButtonToUncolor.selected = false;
        prevButtonToUncolor.style.background = "rgb(180, 180, 180)";
  
        setPrevChosenRoom(room);
      
      }
    };


// =================================== Test Setup ===================================== //



//========================== HotelRoomDetails Show All Test ===============================//
test('HotelRoomDetails : Show All', () => {

  const filterValues = {minPrice: 200, maxPrice: 10000, chosenRoomType: "Choose Room Type"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())

  const HotelRoomBox_Room_1 = screen.getAllByTestId("Room 1_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_1 = screen.getAllByTestId("Room 1_HotelRoomInnerBox");  // Only 1
  const Price_500_Room_1 = screen.getAllByTestId("Room 1_500");  // Only 1
  const Button_Room_1 = screen.getAllByTestId("Room 1_SELECT");  // Only 1
  const Breakfast_Info_Room_1 = screen.getAllByTestId("Room 1_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_1 = screen.getAllByTestId("Room 1_perRoomPerNight");  // Only 1
  const FreeCancellation_False_Room_1 = screen.getAllByTestId("Room 1_free_cancellation_false");  // Only 1

  expect(HotelRoomBox_Room_1.length).toBe(1);
  expect(HotelRoomInnerBox_Room_1.length).toBe(1);
  expect(Price_500_Room_1.length).toBe(1);
  expect(Button_Room_1.length).toBe(1);
  expect(Breakfast_Info_Room_1.length).toBe(1);
  expect(PerRoomPerNight_Room_1.length).toBe(1);
  expect(FreeCancellation_False_Room_1.length).toBe(1);

  const description_room_1 = screen.getByText(/Room 1/);
  expect(description_room_1).toBeInTheDocument();


  const HotelRoomBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomInnerBox");  // 2
  const Price_700_Room_2 = screen.getAllByTestId("Room 2_700");  // Only 1
  const Price_1200_Room_2 = screen.getAllByTestId("Room 2_1200");  // Only 1
  const Button_Room_2 = screen.getAllByTestId("Room 2_SELECT");  // 2
  const Breakfast_Info_Room_2 = screen.getAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  // 2
  const PerRoomPerNight_Room_2 = screen.getAllByTestId("Room 2_perRoomPerNight");  // 2
  const FreeCancellation_False_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_false");  // 1
  const FreeCancellation_True_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_true");  // 1
  
  
  expect(HotelRoomBox_Room_2.length).toBe(1);
  expect(HotelRoomInnerBox_Room_2.length).toBe(2);
  expect(Price_700_Room_2.length).toBe(1);
  expect(Price_1200_Room_2.length).toBe(1);
  expect(Button_Room_2.length).toBe(2);
  expect(Breakfast_Info_Room_2.length).toBe(2);
  expect(PerRoomPerNight_Room_2.length).toBe(2);
  expect(FreeCancellation_False_Room_2.length).toBe(1);
  expect(FreeCancellation_True_Room_2.length).toBe(1);



  const HotelRoomBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomInnerBox");  // Only 1
  const Price_900_Room_3 = screen.getAllByTestId("Room 3_900");  // Only 1
  const Button_Room_3 = screen.getAllByTestId("Room 3_SELECT");  // Only 1
  const Breakfast_Info_Room_3 = screen.getAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_3 = screen.getAllByTestId("Room 3_perRoomPerNight");  // Only 1
  const FreeCancellation_True_Room_3 = screen.getAllByTestId("Room 3_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_3.length).toBe(1);
  expect(HotelRoomInnerBox_Room_3.length).toBe(1);
  expect(Price_900_Room_3.length).toBe(1);
  expect(Button_Room_3.length).toBe(1);
  expect(Breakfast_Info_Room_3.length).toBe(1);
  expect(PerRoomPerNight_Room_3.length).toBe(1);
  expect(FreeCancellation_True_Room_3.length).toBe(1);


  const HotelRoomBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomInnerBox");  // 3
  const Price_700_Room_4 = screen.getAllByTestId("Room 4_700");  // 2
  const Price_1200_Room_4 = screen.getAllByTestId("Room 4_1200");  // Only 1
  const Button_Room_4 = screen.getAllByTestId("Room 4_SELECT");  // 3
  const Breakfast_Info_Room_4 = screen.getAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  // 3
  const PerRoomPerNight_Room_4 = screen.getAllByTestId("Room 4_perRoomPerNight");  // 3
  const FreeCancellation_False_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_false");  // 2
  const FreeCancellation_True_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_4.length).toBe(1);
  expect(HotelRoomInnerBox_Room_4.length).toBe(3);
  expect(Price_700_Room_4.length).toBe(2);
  expect(Price_1200_Room_4.length).toBe(1);
  expect(Button_Room_4.length).toBe(3);
  expect(Breakfast_Info_Room_4.length).toBe(3);
  expect(PerRoomPerNight_Room_4.length).toBe(3);
  expect(FreeCancellation_False_Room_4.length).toBe(2);
  expect(FreeCancellation_True_Room_4.length).toBe(1);


});

//========================== HotelRoomDetails Show All Test ===============================//




//========================== HotelRoomDetails Below Min Price Boundary Test ===============================//
test('HotelRoomDetails : Below Min Price Boundary', () => {

  const filterValues = {minPrice: 100, maxPrice: 300, chosenRoomType: "Choose Room Type"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())

  const description_room_1 = screen.queryAllByText(/Room 1/);
  expect(description_room_1.length).toBe(0);
  const description_room_2 = screen.queryAllByText(/Room 2/);
  expect(description_room_2.length).toBe(0);
  const description_room_3 = screen.queryAllByText(/Room 3/);
  expect(description_room_3.length).toBe(0);
  const description_room_4 = screen.queryAllByText(/Room 4/);
  expect(description_room_4.length).toBe(0);

  const price_500 = screen.queryAllByText(/500/);
  expect(price_500.length).toBe(0);
  const price_700 = screen.queryAllByText(/700/);
  expect(price_700.length).toBe(0);
  const price_900 = screen.queryAllByText(/900/);
  expect(price_900.length).toBe(0);
  const price_1200 = screen.queryAllByText(/1200/);
  expect(price_1200.length).toBe(0);

  const room_only_titles = screen.queryAllByText(/Room Only/);
  expect(room_only_titles.length).toBe(0);
  const breakfast_included_titles = screen.queryAllByText(/Breakfast Included/);
  expect(breakfast_included_titles.length).toBe(0);

  const non_refundable_text = screen.queryAllByText(/Non-refundable/);
  expect(non_refundable_text.length).toBe(0);
  const refundable_text = screen.queryAllByText(/Free cancellation (except for service fee)/);
  expect(refundable_text.length).toBe(0);

  const per_room_per_night_text = screen.queryAllByText(/per room per night/);
  expect(per_room_per_night_text.length).toBe(0);

  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");
  expect(Button_Room_1.length).toBe(0);

  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");        
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);


  const Button_Room_2 = screen.queryAllByTestId("Room 2_SELECT");
  expect(Button_Room_2.length).toBe(0);

  const HotelRoomBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomBox");        
  const HotelRoomInnerBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_2.length).toBe(0);
  expect(HotelRoomInnerBox_Room_2.length).toBe(0);

  const Button_Room_3 = screen.queryAllByTestId("Room 3_SELECT");
  expect(Button_Room_3.length).toBe(0);

  const HotelRoomBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomBox");        
  const HotelRoomInnerBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_3.length).toBe(0);
  expect(HotelRoomInnerBox_Room_3.length).toBe(0);

  const Button_Room_4 = screen.queryAllByTestId("Room 4_SELECT");
  expect(Button_Room_4.length).toBe(0);

  const HotelRoomBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomBox");        
  const HotelRoomInnerBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_4.length).toBe(0);
  expect(HotelRoomInnerBox_Room_4.length).toBe(0);

});

//========================== HotelRoomDetails Below Min Price Boundary Test ===============================//




//========================== HotelRoomDetails Above Max Price Boundary Test ===============================//
test('HotelRoomDetails : Above Max Price Boundary', () => {

  const filterValues = {minPrice: 10000, maxPrice: 11000, chosenRoomType: "Choose Room Type"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())

  const description_room_1 = screen.queryAllByText(/Room 1/);
  expect(description_room_1.length).toBe(0);
  const description_room_2 = screen.queryAllByText(/Room 2/);
  expect(description_room_2.length).toBe(0);
  const description_room_3 = screen.queryAllByText(/Room 3/);
  expect(description_room_3.length).toBe(0);
  const description_room_4 = screen.queryAllByText(/Room 4/);
  expect(description_room_4.length).toBe(0);

  const price_500 = screen.queryAllByText(/500/);
  expect(price_500.length).toBe(0);
  const price_700 = screen.queryAllByText(/700/);
  expect(price_700.length).toBe(0);
  const price_900 = screen.queryAllByText(/900/);
  expect(price_900.length).toBe(0);
  const price_1200 = screen.queryAllByText(/1200/);
  expect(price_1200.length).toBe(0);

  const room_only_titles = screen.queryAllByText(/Room Only/);
  expect(room_only_titles.length).toBe(0);
  const breakfast_included_titles = screen.queryAllByText(/Breakfast Included/);
  expect(breakfast_included_titles.length).toBe(0);

  const non_refundable_text = screen.queryAllByText(/Non-refundable/);
  expect(non_refundable_text.length).toBe(0);
  const refundable_text = screen.queryAllByText(/Free cancellation (except for service fee)/);
  expect(refundable_text.length).toBe(0);

  const per_room_per_night_text = screen.queryAllByText(/per room per night/);
  expect(per_room_per_night_text.length).toBe(0);

  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");
  expect(Button_Room_1.length).toBe(0);

  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");        
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);


  const Button_Room_2 = screen.queryAllByTestId("Room 2_SELECT");
  expect(Button_Room_2.length).toBe(0);

  const HotelRoomBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomBox");        
  const HotelRoomInnerBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_2.length).toBe(0);
  expect(HotelRoomInnerBox_Room_2.length).toBe(0);

  const Button_Room_3 = screen.queryAllByTestId("Room 3_SELECT");
  expect(Button_Room_3.length).toBe(0);

  const HotelRoomBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomBox");        
  const HotelRoomInnerBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_3.length).toBe(0);
  expect(HotelRoomInnerBox_Room_3.length).toBe(0);

  const Button_Room_4 = screen.queryAllByTestId("Room 4_SELECT");
  expect(Button_Room_4.length).toBe(0);

  const HotelRoomBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomBox");        
  const HotelRoomInnerBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_4.length).toBe(0);
  expect(HotelRoomInnerBox_Room_4.length).toBe(0);

});

//========================== HotelRoomDetails Above Max Price Boundary Test ===============================//











//========================== HotelRoomDetails Price Filter Test 1 ===============================//
test('HotelRoomDetails : Price Filter Test 1', () => {

  const filterValues = {minPrice: 500, maxPrice: 700, chosenRoomType: "Choose Room Type"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())

  const HotelRoomBox_Room_1 = screen.getAllByTestId("Room 1_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_1 = screen.getAllByTestId("Room 1_HotelRoomInnerBox");  // Only 1
  const Price_500_Room_1 = screen.getAllByTestId("Room 1_500");  // Only 1
  const Button_Room_1 = screen.getAllByTestId("Room 1_SELECT");  // Only 1
  const Breakfast_Info_Room_1 = screen.getAllByTestId("Room 1_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_1 = screen.getAllByTestId("Room 1_perRoomPerNight");  // Only 1
  const FreeCancellation_False_Room_1 = screen.getAllByTestId("Room 1_free_cancellation_false");  // Only 1

  
  expect(HotelRoomBox_Room_1.length).toBe(1);
  expect(HotelRoomInnerBox_Room_1.length).toBe(1);
  expect(Price_500_Room_1.length).toBe(1);
  expect(Button_Room_1.length).toBe(1);
  expect(Breakfast_Info_Room_1.length).toBe(1);
  expect(PerRoomPerNight_Room_1.length).toBe(1);
  expect(FreeCancellation_False_Room_1.length).toBe(1);


  const HotelRoomBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomInnerBox");  // Only 1
  const Price_700_Room_2 = screen.getAllByTestId("Room 2_700");  // Only 1
  const Price_1200_Room_2 = screen.queryAllByTestId("Room 2_1200");  // 0
  const Button_Room_2 = screen.getAllByTestId("Room 2_SELECT");  // Only 1
  const Breakfast_Info_Room_2 = screen.getAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_2 = screen.getAllByTestId("Room 2_perRoomPerNight");  // Only 1
  const FreeCancellation_False_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_false");  // 1
  const FreeCancellation_True_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_true");  // 0
  
  
  expect(HotelRoomBox_Room_2.length).toBe(1);
  expect(HotelRoomInnerBox_Room_2.length).toBe(1);
  expect(Price_700_Room_2.length).toBe(1);
  expect(Price_1200_Room_2.length).toBe(0);
  expect(Button_Room_2.length).toBe(1);
  expect(Breakfast_Info_Room_2.length).toBe(1);
  expect(PerRoomPerNight_Room_2.length).toBe(1);
  expect(FreeCancellation_False_Room_2.length).toBe(1);
  expect(FreeCancellation_True_Room_2.length).toBe(0);


  const HotelRoomBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomInnerBox");  // 2
  const Price_700_Room_4 = screen.getAllByTestId("Room 4_700");  // 2
  const Price_1200_Room_4 = screen.queryAllByTestId("Room 4_1200");  // 0
  const Button_Room_4 = screen.getAllByTestId("Room 4_SELECT");  // 2
  const Breakfast_Info_Room_4 = screen.getAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  // 2
  const PerRoomPerNight_Room_4 = screen.getAllByTestId("Room 4_perRoomPerNight");  // 2
  const FreeCancellation_False_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_false");  // Only 1
  const FreeCancellation_True_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_4.length).toBe(1);
  expect(HotelRoomInnerBox_Room_4.length).toBe(2);
  expect(Price_700_Room_4.length).toBe(2);
  expect(Price_1200_Room_4.length).toBe(0);
  expect(Button_Room_4.length).toBe(2);
  expect(Breakfast_Info_Room_4.length).toBe(2);
  expect(PerRoomPerNight_Room_4.length).toBe(2);
  expect(FreeCancellation_False_Room_4.length).toBe(1);
  expect(FreeCancellation_True_Room_4.length).toBe(1);





  const description_room_3 = screen.queryAllByText(/Room 3/);
  expect(description_room_3.length).toBe(0);
  

  const price_900 = screen.queryAllByText(/900/);
  expect(price_900.length).toBe(0);
  const price_1200 = screen.queryAllByText(/1200/);
  expect(price_1200.length).toBe(0);


  const Button_Room_3 = screen.queryAllByTestId("Room 3_SELECT");
  expect(Button_Room_3.length).toBe(0);

  const HotelRoomBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomBox");        
  const HotelRoomInnerBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_3.length).toBe(0);
  expect(HotelRoomInnerBox_Room_3.length).toBe(0);

});

//========================== HotelRoomDetails Price Filter Test 1 ===============================//





//========================== HotelRoomDetails Price Filter Test 2 ===============================//
test('HotelRoomDetails : Price Filter Test 2', () => {

  const filterValues = {minPrice: 700, maxPrice: 900, chosenRoomType: "Choose Room Type"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())




  const HotelRoomBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomInnerBox");  // Only 1
  const Price_700_Room_2 = screen.getAllByTestId("Room 2_700");  // Only 1
  const Price_1200_Room_2 = screen.queryAllByTestId("Room 2_1200");  // 0
  const Button_Room_2 = screen.getAllByTestId("Room 2_SELECT");  // Only 1
  const Breakfast_Info_Room_2 = screen.getAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_2 = screen.getAllByTestId("Room 2_perRoomPerNight");  // Only 1
  const FreeCancellation_False_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_false");  // 1
  const FreeCancellation_True_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_true");  // 0
  
  
  expect(HotelRoomBox_Room_2.length).toBe(1);
  expect(HotelRoomInnerBox_Room_2.length).toBe(1);
  expect(Price_700_Room_2.length).toBe(1);
  expect(Price_1200_Room_2.length).toBe(0);
  expect(Button_Room_2.length).toBe(1);
  expect(Breakfast_Info_Room_2.length).toBe(1);
  expect(PerRoomPerNight_Room_2.length).toBe(1);
  expect(FreeCancellation_False_Room_2.length).toBe(1);
  expect(FreeCancellation_True_Room_2.length).toBe(0);

  const HotelRoomBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomInnerBox");  // Only 1
  const Price_900_Room_3 = screen.getAllByTestId("Room 3_900");  // Only 1
  const Button_Room_3 = screen.getAllByTestId("Room 3_SELECT");  // Only 1
  const Breakfast_Info_Room_3 = screen.getAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_3 = screen.getAllByTestId("Room 3_perRoomPerNight");  // Only 1
  const FreeCancellation_True_Room_3 = screen.getAllByTestId("Room 3_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_3.length).toBe(1);
  expect(HotelRoomInnerBox_Room_3.length).toBe(1);
  expect(Price_900_Room_3.length).toBe(1);
  expect(Button_Room_3.length).toBe(1);
  expect(Breakfast_Info_Room_3.length).toBe(1);
  expect(PerRoomPerNight_Room_3.length).toBe(1);
  expect(FreeCancellation_True_Room_3.length).toBe(1);


  const HotelRoomBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomInnerBox");  // 2
  const Price_700_Room_4 = screen.getAllByTestId("Room 4_700");  // 2
  const Price_1200_Room_4 = screen.queryAllByTestId("Room 4_1200");  // 0
  const Button_Room_4 = screen.getAllByTestId("Room 4_SELECT");  // 2
  const Breakfast_Info_Room_4 = screen.getAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  // 2
  const PerRoomPerNight_Room_4 = screen.getAllByTestId("Room 4_perRoomPerNight");  // 2
  const FreeCancellation_False_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_false");  // Only 1
  const FreeCancellation_True_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_4.length).toBe(1);
  expect(HotelRoomInnerBox_Room_4.length).toBe(2);
  expect(Price_700_Room_4.length).toBe(2);
  expect(Price_1200_Room_4.length).toBe(0);
  expect(Button_Room_4.length).toBe(2);
  expect(Breakfast_Info_Room_4.length).toBe(2);
  expect(PerRoomPerNight_Room_4.length).toBe(2);
  expect(FreeCancellation_False_Room_4.length).toBe(1);
  expect(FreeCancellation_True_Room_4.length).toBe(1);


  const description_room_1 = screen.queryAllByText(/Room 1/);
  expect(description_room_1.length).toBe(0);

  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");
  expect(Button_Room_1.length).toBe(0);
  
  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");        
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);

  const price_500 = screen.queryAllByText(/500/);
  expect(price_500.length).toBe(0);
  const price_1200 = screen.queryAllByText(/1200/);
  expect(price_1200.length).toBe(0);

});

//========================== HotelRoomDetails Price Filter Test 2 ===============================//





//========================== HotelRoomDetails Price Filter Test 3 ===============================//
test('HotelRoomDetails : Price Filter Test 3', () => {

  const filterValues = {minPrice: 700, maxPrice: 1200, chosenRoomType: "Choose Room Type"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())


  const HotelRoomBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomInnerBox");  // 2
  const Price_700_Room_2 = screen.getAllByTestId("Room 2_700");  // Only 1
  const Price_1200_Room_2 = screen.getAllByTestId("Room 2_1200");  // Only 1
  const Button_Room_2 = screen.getAllByTestId("Room 2_SELECT");  // 2
  const Breakfast_Info_Room_2 = screen.getAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  // 2
  const PerRoomPerNight_Room_2 = screen.getAllByTestId("Room 2_perRoomPerNight");  // 2
  const FreeCancellation_False_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_false");  // 1
  const FreeCancellation_True_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_true");  // 1
  
  
  expect(HotelRoomBox_Room_2.length).toBe(1);
  expect(HotelRoomInnerBox_Room_2.length).toBe(2);
  expect(Price_700_Room_2.length).toBe(1);
  expect(Price_1200_Room_2.length).toBe(1);
  expect(Button_Room_2.length).toBe(2);
  expect(Breakfast_Info_Room_2.length).toBe(2);
  expect(PerRoomPerNight_Room_2.length).toBe(2);
  expect(FreeCancellation_False_Room_2.length).toBe(1);
  expect(FreeCancellation_True_Room_2.length).toBe(1);



  const HotelRoomBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomInnerBox");  // Only 1
  const Price_900_Room_3 = screen.getAllByTestId("Room 3_900");  // Only 1
  const Button_Room_3 = screen.getAllByTestId("Room 3_SELECT");  // Only 1
  const Breakfast_Info_Room_3 = screen.getAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_3 = screen.getAllByTestId("Room 3_perRoomPerNight");  // Only 1
  const FreeCancellation_True_Room_3 = screen.getAllByTestId("Room 3_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_3.length).toBe(1);
  expect(HotelRoomInnerBox_Room_3.length).toBe(1);
  expect(Price_900_Room_3.length).toBe(1);
  expect(Button_Room_3.length).toBe(1);
  expect(Breakfast_Info_Room_3.length).toBe(1);
  expect(PerRoomPerNight_Room_3.length).toBe(1);
  expect(FreeCancellation_True_Room_3.length).toBe(1);


  const HotelRoomBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomInnerBox");  // 3
  const Price_700_Room_4 = screen.getAllByTestId("Room 4_700");  // 2
  const Price_1200_Room_4 = screen.getAllByTestId("Room 4_1200");  // Only 1
  const Button_Room_4 = screen.getAllByTestId("Room 4_SELECT");  // 3
  const Breakfast_Info_Room_4 = screen.getAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  // 3
  const PerRoomPerNight_Room_4 = screen.getAllByTestId("Room 4_perRoomPerNight");  // 3
  const FreeCancellation_False_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_false");  // 2
  const FreeCancellation_True_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_4.length).toBe(1);
  expect(HotelRoomInnerBox_Room_4.length).toBe(3);
  expect(Price_700_Room_4.length).toBe(2);
  expect(Price_1200_Room_4.length).toBe(1);
  expect(Button_Room_4.length).toBe(3);
  expect(Breakfast_Info_Room_4.length).toBe(3);
  expect(PerRoomPerNight_Room_4.length).toBe(3);
  expect(FreeCancellation_False_Room_4.length).toBe(2);
  expect(FreeCancellation_True_Room_4.length).toBe(1);

  
  const description_room_1 = screen.queryAllByText(/Room 1/);
  expect(description_room_1.length).toBe(0);
  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");
  expect(Button_Room_1.length).toBe(0);
  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");        
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox"); 
  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);
  const price_500 = screen.queryAllByText(/500/);
  expect(price_500.length).toBe(0);

});

//========================== HotelRoomDetails Price Filter Test 3 ===============================//





//========================== HotelRoomDetails Room Type Filter Test 1 ===============================//
test('HotelRoomDetails : Room Type Filter Test 1', () => {

  const filterValues = {minPrice: 0, maxPrice: 10000, chosenRoomType: "Room 1"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())

  const HotelRoomBox_Room_1 = screen.getAllByTestId("Room 1_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_1 = screen.getAllByTestId("Room 1_HotelRoomInnerBox");  // Only 1
  const Price_500_Room_1 = screen.getAllByTestId("Room 1_500");  // Only 1
  const Button_Room_1 = screen.getAllByTestId("Room 1_SELECT");  // Only 1
  const Breakfast_Info_Room_1 = screen.getAllByTestId("Room 1_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_1 = screen.getAllByTestId("Room 1_perRoomPerNight");  // Only 1
  const FreeCancellation_False_Room_1 = screen.getAllByTestId("Room 1_free_cancellation_false");  // Only 1

  expect(HotelRoomBox_Room_1.length).toBe(1);
  expect(HotelRoomInnerBox_Room_1.length).toBe(1);
  expect(Price_500_Room_1.length).toBe(1);
  expect(Button_Room_1.length).toBe(1);
  expect(Breakfast_Info_Room_1.length).toBe(1);
  expect(PerRoomPerNight_Room_1.length).toBe(1);
  expect(FreeCancellation_False_Room_1.length).toBe(1);


  const HotelRoomBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomBox");            
  const HotelRoomInnerBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomInnerBox");  
  const Price_700_Room_2 = screen.queryAllByTestId("Room 2_700");  
  const Price_1200_Room_2 = screen.queryAllByTestId("Room 2_1200");  
  const Button_Room_2 = screen.queryAllByTestId("Room 2_SELECT");  
  const Breakfast_Info_Room_2 = screen.queryAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_2 = screen.queryAllByTestId("Room 2_perRoomPerNight");  
  const FreeCancellation_False_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_false");  
  const FreeCancellation_True_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_2.length).toBe(0);
  expect(HotelRoomInnerBox_Room_2.length).toBe(0);
  expect(Price_700_Room_2.length).toBe(0);
  expect(Price_1200_Room_2.length).toBe(0);
  expect(Button_Room_2.length).toBe(0);
  expect(Breakfast_Info_Room_2.length).toBe(0);
  expect(PerRoomPerNight_Room_2.length).toBe(0);
  expect(FreeCancellation_False_Room_2.length).toBe(0);
  expect(FreeCancellation_True_Room_2.length).toBe(0);



  const HotelRoomBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomBox");           
  const HotelRoomInnerBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomInnerBox"); 
  const Price_900_Room_3 = screen.queryAllByTestId("Room 3_900"); 
  const Button_Room_3 = screen.queryAllByTestId("Room 3_SELECT");  
  const Breakfast_Info_Room_3 = screen.queryAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_3 = screen.queryAllByTestId("Room 3_perRoomPerNight");  
  const FreeCancellation_True_Room_3 = screen.queryAllByTestId("Room 3_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_3.length).toBe(0);
  expect(HotelRoomInnerBox_Room_3.length).toBe(0);
  expect(Price_900_Room_3.length).toBe(0);
  expect(Button_Room_3.length).toBe(0);
  expect(Breakfast_Info_Room_3.length).toBe(0);
  expect(PerRoomPerNight_Room_3.length).toBe(0);
  expect(FreeCancellation_True_Room_3.length).toBe(0);


  const HotelRoomBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomBox");            
  const HotelRoomInnerBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomInnerBox");  
  const Price_700_Room_4 = screen.queryAllByTestId("Room 4_700");  
  const Price_1200_Room_4 = screen.queryAllByTestId("Room 4_1200");  
  const Button_Room_4 = screen.queryAllByTestId("Room 4_SELECT");  
  const Breakfast_Info_Room_4 = screen.queryAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_4 = screen.queryAllByTestId("Room 4_perRoomPerNight");  
  const FreeCancellation_False_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_false"); 
  const FreeCancellation_True_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_4.length).toBe(0);
  expect(HotelRoomInnerBox_Room_4.length).toBe(0);
  expect(Price_700_Room_4.length).toBe(0);
  expect(Price_1200_Room_4.length).toBe(0);
  expect(Button_Room_4.length).toBe(0);
  expect(Breakfast_Info_Room_4.length).toBe(0);
  expect(PerRoomPerNight_Room_4.length).toBe(0);
  expect(FreeCancellation_False_Room_4.length).toBe(0);
  expect(FreeCancellation_True_Room_4.length).toBe(0);


});

//========================== HotelRoomDetails Room Type Filter Test 1 ===============================//




//========================== HotelRoomDetails Room Type Filter Test 2 ===============================//
test('HotelRoomDetails : Room Type Filter Test 2', () => {

  const filterValues = {minPrice: 0, maxPrice: 10000, chosenRoomType: "Room 2"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())


  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");            
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox");  
  const Price_500_Room_1 = screen.queryAllByTestId("Room 1_500");  
  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");  
  const Breakfast_Info_Room_1 = screen.queryAllByTestId("Room 1_roomAdditionalInfo.breakfast_info"); 
  const PerRoomPerNight_Room_1 = screen.queryAllByTestId("Room 1_perRoomPerNight");  
  const FreeCancellation_False_Room_1 = screen.queryAllByTestId("Room 1_free_cancellation_false");  

  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);
  expect(Price_500_Room_1.length).toBe(0);
  expect(Button_Room_1.length).toBe(0);
  expect(Breakfast_Info_Room_1.length).toBe(0);
  expect(PerRoomPerNight_Room_1.length).toBe(0);
  expect(FreeCancellation_False_Room_1.length).toBe(0);


  const HotelRoomBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_2 = screen.getAllByTestId("Room 2_HotelRoomInnerBox");  // 2
  const Price_700_Room_2 = screen.getAllByTestId("Room 2_700");  // Only 1
  const Price_1200_Room_2 = screen.getAllByTestId("Room 2_1200");  // Only 1
  const Button_Room_2 = screen.getAllByTestId("Room 2_SELECT");  // 2
  const Breakfast_Info_Room_2 = screen.getAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  // 2
  const PerRoomPerNight_Room_2 = screen.getAllByTestId("Room 2_perRoomPerNight");  // 2
  const FreeCancellation_False_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_false");  // 1
  const FreeCancellation_True_Room_2 = screen.getAllByTestId("Room 2_free_cancellation_true");  // 1
  
  
  expect(HotelRoomBox_Room_2.length).toBe(1);
  expect(HotelRoomInnerBox_Room_2.length).toBe(2);
  expect(Price_700_Room_2.length).toBe(1);
  expect(Price_1200_Room_2.length).toBe(1);
  expect(Button_Room_2.length).toBe(2);
  expect(Breakfast_Info_Room_2.length).toBe(2);
  expect(PerRoomPerNight_Room_2.length).toBe(2);
  expect(FreeCancellation_False_Room_2.length).toBe(1);
  expect(FreeCancellation_True_Room_2.length).toBe(1);



  const HotelRoomBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomBox");           
  const HotelRoomInnerBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomInnerBox"); 
  const Price_900_Room_3 = screen.queryAllByTestId("Room 3_900"); 
  const Button_Room_3 = screen.queryAllByTestId("Room 3_SELECT");  
  const Breakfast_Info_Room_3 = screen.queryAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_3 = screen.queryAllByTestId("Room 3_perRoomPerNight");  
  const FreeCancellation_True_Room_3 = screen.queryAllByTestId("Room 3_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_3.length).toBe(0);
  expect(HotelRoomInnerBox_Room_3.length).toBe(0);
  expect(Price_900_Room_3.length).toBe(0);
  expect(Button_Room_3.length).toBe(0);
  expect(Breakfast_Info_Room_3.length).toBe(0);
  expect(PerRoomPerNight_Room_3.length).toBe(0);
  expect(FreeCancellation_True_Room_3.length).toBe(0);


  const HotelRoomBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomBox");            
  const HotelRoomInnerBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomInnerBox");  
  const Price_700_Room_4 = screen.queryAllByTestId("Room 4_700");  
  const Price_1200_Room_4 = screen.queryAllByTestId("Room 4_1200");  
  const Button_Room_4 = screen.queryAllByTestId("Room 4_SELECT");  
  const Breakfast_Info_Room_4 = screen.queryAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_4 = screen.queryAllByTestId("Room 4_perRoomPerNight");  
  const FreeCancellation_False_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_false"); 
  const FreeCancellation_True_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_4.length).toBe(0);
  expect(HotelRoomInnerBox_Room_4.length).toBe(0);
  expect(Price_700_Room_4.length).toBe(0);
  expect(Price_1200_Room_4.length).toBe(0);
  expect(Button_Room_4.length).toBe(0);
  expect(Breakfast_Info_Room_4.length).toBe(0);
  expect(PerRoomPerNight_Room_4.length).toBe(0);
  expect(FreeCancellation_False_Room_4.length).toBe(0);
  expect(FreeCancellation_True_Room_4.length).toBe(0);
});

//========================== HotelRoomDetails Room Type Filter Test 2 ===============================//




//========================== HotelRoomDetails Room Type Filter Test 3 ===============================//
test('HotelRoomDetails : Room Type Filter Test 3', () => {

  const filterValues = {minPrice: 0, maxPrice: 10000, chosenRoomType: "Room 3"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())


  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");            
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox");  
  const Price_500_Room_1 = screen.queryAllByTestId("Room 1_500");  
  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");  
  const Breakfast_Info_Room_1 = screen.queryAllByTestId("Room 1_roomAdditionalInfo.breakfast_info"); 
  const PerRoomPerNight_Room_1 = screen.queryAllByTestId("Room 1_perRoomPerNight");  
  const FreeCancellation_False_Room_1 = screen.queryAllByTestId("Room 1_free_cancellation_false");  

  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);
  expect(Price_500_Room_1.length).toBe(0);
  expect(Button_Room_1.length).toBe(0);
  expect(Breakfast_Info_Room_1.length).toBe(0);
  expect(PerRoomPerNight_Room_1.length).toBe(0);
  expect(FreeCancellation_False_Room_1.length).toBe(0);


  const HotelRoomBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomBox");            
  const HotelRoomInnerBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomInnerBox");  
  const Price_700_Room_2 = screen.queryAllByTestId("Room 2_700");  
  const Price_1200_Room_2 = screen.queryAllByTestId("Room 2_1200");  
  const Button_Room_2 = screen.queryAllByTestId("Room 2_SELECT");  
  const Breakfast_Info_Room_2 = screen.queryAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_2 = screen.queryAllByTestId("Room 2_perRoomPerNight");  
  const FreeCancellation_False_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_false");  
  const FreeCancellation_True_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_2.length).toBe(0);
  expect(HotelRoomInnerBox_Room_2.length).toBe(0);
  expect(Price_700_Room_2.length).toBe(0);
  expect(Price_1200_Room_2.length).toBe(0);
  expect(Button_Room_2.length).toBe(0);
  expect(Breakfast_Info_Room_2.length).toBe(0);
  expect(PerRoomPerNight_Room_2.length).toBe(0);
  expect(FreeCancellation_False_Room_2.length).toBe(0);
  expect(FreeCancellation_True_Room_2.length).toBe(0);



  const HotelRoomBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_3 = screen.getAllByTestId("Room 3_HotelRoomInnerBox");  // Only 1
  const Price_900_Room_3 = screen.getAllByTestId("Room 3_900");  // Only 1
  const Button_Room_3 = screen.getAllByTestId("Room 3_SELECT");  // Only 1
  const Breakfast_Info_Room_3 = screen.getAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  // Only 1
  const PerRoomPerNight_Room_3 = screen.getAllByTestId("Room 3_perRoomPerNight");  // Only 1
  const FreeCancellation_True_Room_3 = screen.getAllByTestId("Room 3_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_3.length).toBe(1);
  expect(HotelRoomInnerBox_Room_3.length).toBe(1);
  expect(Price_900_Room_3.length).toBe(1);
  expect(Button_Room_3.length).toBe(1);
  expect(Breakfast_Info_Room_3.length).toBe(1);
  expect(PerRoomPerNight_Room_3.length).toBe(1);
  expect(FreeCancellation_True_Room_3.length).toBe(1);


  const HotelRoomBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomBox");            
  const HotelRoomInnerBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomInnerBox");  
  const Price_700_Room_4 = screen.queryAllByTestId("Room 4_700");  
  const Price_1200_Room_4 = screen.queryAllByTestId("Room 4_1200");  
  const Button_Room_4 = screen.queryAllByTestId("Room 4_SELECT");  
  const Breakfast_Info_Room_4 = screen.queryAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_4 = screen.queryAllByTestId("Room 4_perRoomPerNight");  
  const FreeCancellation_False_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_false"); 
  const FreeCancellation_True_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_4.length).toBe(0);
  expect(HotelRoomInnerBox_Room_4.length).toBe(0);
  expect(Price_700_Room_4.length).toBe(0);
  expect(Price_1200_Room_4.length).toBe(0);
  expect(Button_Room_4.length).toBe(0);
  expect(Breakfast_Info_Room_4.length).toBe(0);
  expect(PerRoomPerNight_Room_4.length).toBe(0);
  expect(FreeCancellation_False_Room_4.length).toBe(0);
  expect(FreeCancellation_True_Room_4.length).toBe(0);

  

});

//========================== HotelRoomDetails Room Type Filter Test 3 ===============================//




//========================== HotelRoomDetails Room Type Filter Test 4 ===============================//
test('HotelRoomDetails : Room Type Filter Test 4', () => {

  const filterValues = {minPrice: 0, maxPrice: 10000, chosenRoomType: "Room 4"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug())


  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");            
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox");  
  const Price_500_Room_1 = screen.queryAllByTestId("Room 1_500");  
  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");  
  const Breakfast_Info_Room_1 = screen.queryAllByTestId("Room 1_roomAdditionalInfo.breakfast_info"); 
  const PerRoomPerNight_Room_1 = screen.queryAllByTestId("Room 1_perRoomPerNight");  
  const FreeCancellation_False_Room_1 = screen.queryAllByTestId("Room 1_free_cancellation_false");  

  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);
  expect(Price_500_Room_1.length).toBe(0);
  expect(Button_Room_1.length).toBe(0);
  expect(Breakfast_Info_Room_1.length).toBe(0);
  expect(PerRoomPerNight_Room_1.length).toBe(0);
  expect(FreeCancellation_False_Room_1.length).toBe(0);


  const HotelRoomBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomBox");            
  const HotelRoomInnerBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomInnerBox");  
  const Price_700_Room_2 = screen.queryAllByTestId("Room 2_700");  
  const Price_1200_Room_2 = screen.queryAllByTestId("Room 2_1200");  
  const Button_Room_2 = screen.queryAllByTestId("Room 2_SELECT");  
  const Breakfast_Info_Room_2 = screen.queryAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_2 = screen.queryAllByTestId("Room 2_perRoomPerNight");  
  const FreeCancellation_False_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_false");  
  const FreeCancellation_True_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_2.length).toBe(0);
  expect(HotelRoomInnerBox_Room_2.length).toBe(0);
  expect(Price_700_Room_2.length).toBe(0);
  expect(Price_1200_Room_2.length).toBe(0);
  expect(Button_Room_2.length).toBe(0);
  expect(Breakfast_Info_Room_2.length).toBe(0);
  expect(PerRoomPerNight_Room_2.length).toBe(0);
  expect(FreeCancellation_False_Room_2.length).toBe(0);
  expect(FreeCancellation_True_Room_2.length).toBe(0);



  const HotelRoomBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomBox");           
  const HotelRoomInnerBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomInnerBox"); 
  const Price_900_Room_3 = screen.queryAllByTestId("Room 3_900"); 
  const Button_Room_3 = screen.queryAllByTestId("Room 3_SELECT");  
  const Breakfast_Info_Room_3 = screen.queryAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_3 = screen.queryAllByTestId("Room 3_perRoomPerNight");  
  const FreeCancellation_True_Room_3 = screen.queryAllByTestId("Room 3_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_3.length).toBe(0);
  expect(HotelRoomInnerBox_Room_3.length).toBe(0);
  expect(Price_900_Room_3.length).toBe(0);
  expect(Button_Room_3.length).toBe(0);
  expect(Breakfast_Info_Room_3.length).toBe(0);
  expect(PerRoomPerNight_Room_3.length).toBe(0);
  expect(FreeCancellation_True_Room_3.length).toBe(0);


  const HotelRoomBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomBox");            // Only 1
  const HotelRoomInnerBox_Room_4 = screen.getAllByTestId("Room 4_HotelRoomInnerBox");  // 3
  const Price_700_Room_4 = screen.getAllByTestId("Room 4_700");  // 2
  const Price_1200_Room_4 = screen.getAllByTestId("Room 4_1200");  // Only 1
  const Button_Room_4 = screen.getAllByTestId("Room 4_SELECT");  // 3
  const Breakfast_Info_Room_4 = screen.getAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  // 3
  const PerRoomPerNight_Room_4 = screen.getAllByTestId("Room 4_perRoomPerNight");  // 3
  const FreeCancellation_False_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_false");  // 2
  const FreeCancellation_True_Room_4 = screen.getAllByTestId("Room 4_free_cancellation_true");  // Only 1
  
  
  expect(HotelRoomBox_Room_4.length).toBe(1);
  expect(HotelRoomInnerBox_Room_4.length).toBe(3);
  expect(Price_700_Room_4.length).toBe(2);
  expect(Price_1200_Room_4.length).toBe(1);
  expect(Button_Room_4.length).toBe(3);
  expect(Breakfast_Info_Room_4.length).toBe(3);
  expect(PerRoomPerNight_Room_4.length).toBe(3);
  expect(FreeCancellation_False_Room_4.length).toBe(2);
  expect(FreeCancellation_True_Room_4.length).toBe(1);

  

});

//========================== HotelRoomDetails Room Type Filter Test 4 ===============================//




//========================== HotelRoomDetails Invalid Room Type Filter Test ===============================//
test('HotelRoomDetails : Invalid Room Type Filter Test', () => {

  const filterValues = {minPrice: 0, maxPrice: 10000, chosenRoomType: "Invalid Type nothing to be shown"}

  const newFilters = [
    ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
    ({ roomNormalizedDescription }) => {
      if (filterValues.chosenRoomType === "Choose Room Type") {
        return true;
      } else {
        return roomNormalizedDescription === filterValues.chosenRoomType;
      }
    },
  ];

  render(<ListOfRoomTypes rooms = {rooms} filters = {newFilters} handleChooseRoom = {handleChooseRoom}/>);

  //console.log(screen.debug());


  const HotelRoomBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomBox");            
  const HotelRoomInnerBox_Room_1 = screen.queryAllByTestId("Room 1_HotelRoomInnerBox");  
  const Price_500_Room_1 = screen.queryAllByTestId("Room 1_500");  
  const Button_Room_1 = screen.queryAllByTestId("Room 1_SELECT");  
  const Breakfast_Info_Room_1 = screen.queryAllByTestId("Room 1_roomAdditionalInfo.breakfast_info"); 
  const PerRoomPerNight_Room_1 = screen.queryAllByTestId("Room 1_perRoomPerNight");  
  const FreeCancellation_False_Room_1 = screen.queryAllByTestId("Room 1_free_cancellation_false");  

  expect(HotelRoomBox_Room_1.length).toBe(0);
  expect(HotelRoomInnerBox_Room_1.length).toBe(0);
  expect(Price_500_Room_1.length).toBe(0);
  expect(Button_Room_1.length).toBe(0);
  expect(Breakfast_Info_Room_1.length).toBe(0);
  expect(PerRoomPerNight_Room_1.length).toBe(0);
  expect(FreeCancellation_False_Room_1.length).toBe(0);


  const HotelRoomBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomBox");            
  const HotelRoomInnerBox_Room_2 = screen.queryAllByTestId("Room 2_HotelRoomInnerBox");  
  const Price_700_Room_2 = screen.queryAllByTestId("Room 2_700");  
  const Price_1200_Room_2 = screen.queryAllByTestId("Room 2_1200");  
  const Button_Room_2 = screen.queryAllByTestId("Room 2_SELECT");  
  const Breakfast_Info_Room_2 = screen.queryAllByTestId("Room 2_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_2 = screen.queryAllByTestId("Room 2_perRoomPerNight");  
  const FreeCancellation_False_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_false");  
  const FreeCancellation_True_Room_2 = screen.queryAllByTestId("Room 2_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_2.length).toBe(0);
  expect(HotelRoomInnerBox_Room_2.length).toBe(0);
  expect(Price_700_Room_2.length).toBe(0);
  expect(Price_1200_Room_2.length).toBe(0);
  expect(Button_Room_2.length).toBe(0);
  expect(Breakfast_Info_Room_2.length).toBe(0);
  expect(PerRoomPerNight_Room_2.length).toBe(0);
  expect(FreeCancellation_False_Room_2.length).toBe(0);
  expect(FreeCancellation_True_Room_2.length).toBe(0);



  const HotelRoomBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomBox");           
  const HotelRoomInnerBox_Room_3 = screen.queryAllByTestId("Room 3_HotelRoomInnerBox"); 
  const Price_900_Room_3 = screen.queryAllByTestId("Room 3_900"); 
  const Button_Room_3 = screen.queryAllByTestId("Room 3_SELECT");  
  const Breakfast_Info_Room_3 = screen.queryAllByTestId("Room 3_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_3 = screen.queryAllByTestId("Room 3_perRoomPerNight");  
  const FreeCancellation_True_Room_3 = screen.queryAllByTestId("Room 3_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_3.length).toBe(0);
  expect(HotelRoomInnerBox_Room_3.length).toBe(0);
  expect(Price_900_Room_3.length).toBe(0);
  expect(Button_Room_3.length).toBe(0);
  expect(Breakfast_Info_Room_3.length).toBe(0);
  expect(PerRoomPerNight_Room_3.length).toBe(0);
  expect(FreeCancellation_True_Room_3.length).toBe(0);


  const HotelRoomBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomBox");            
  const HotelRoomInnerBox_Room_4 = screen.queryAllByTestId("Room 4_HotelRoomInnerBox");  
  const Price_700_Room_4 = screen.queryAllByTestId("Room 4_700");  
  const Price_1200_Room_4 = screen.queryAllByTestId("Room 4_1200");  
  const Button_Room_4 = screen.queryAllByTestId("Room 4_SELECT");  
  const Breakfast_Info_Room_4 = screen.queryAllByTestId("Room 4_roomAdditionalInfo.breakfast_info");  
  const PerRoomPerNight_Room_4 = screen.queryAllByTestId("Room 4_perRoomPerNight");  
  const FreeCancellation_False_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_false"); 
  const FreeCancellation_True_Room_4 = screen.queryAllByTestId("Room 4_free_cancellation_true");  
  
  
  expect(HotelRoomBox_Room_4.length).toBe(0);
  expect(HotelRoomInnerBox_Room_4.length).toBe(0);
  expect(Price_700_Room_4.length).toBe(0);
  expect(Price_1200_Room_4.length).toBe(0);
  expect(Button_Room_4.length).toBe(0);
  expect(Breakfast_Info_Room_4.length).toBe(0);
  expect(PerRoomPerNight_Room_4.length).toBe(0);
  expect(FreeCancellation_False_Room_4.length).toBe(0);
  expect(FreeCancellation_True_Room_4.length).toBe(0);
  

});

//========================== HotelRoomDetails Invalid Room Type Filter Test ===============================//


























/*
// ================================= Previous Tests ==================================== //

//========================== HotelRoomBox Component Tests ===============================// 

test('HotelRoomBox Text Presence', () => {
  render(<HotelRoomBox roomsSet = {[{"key":"1", "price":200, "roomNormalizedDescription": "Room 1", "free_cancellation":true, "images":""}, 
                                    {"key":"2", "price":400, "roomNormalizedDescription": "Room 2", "free_cancellation":false, "images":""}]}/>);
  const room1_desc = screen.getByText(/Room 1/);
  const room1_price = screen.getByText(/SGD 200/);
  const room1_freeCancellation = screen.getByText(/Free cancellation (except for service fee)/)

  const room2_desc = screen.getByText(/Room 2/);
  const room2_price = screen.getByText(/SGD 400/);
  const room2_freeCancellation = screen.getByText(/Non-refundable/)

  expect(room1_desc).toBeInTheDocument();
  expect(room1_price).toBeInTheDocument();
  expect(room1_freeCancellation).toBeInTheDocument();
  expect(room2_desc).toBeInTheDocument();
  expect(room2_price).toBeInTheDocument();
  expect(room2_freeCancellation).toBeInTheDocument();
})

//========================== HotelRoomBox Component Tests ===============================// 







//========================== Filtering Price Tests ===============================//

test('HotelRoomDetails Filter Price 0 : Show All', () => {

  const rooms = [{key: 1, description:"room 1", price:"500"}, 
                    {key: 2, description:"room 2", price:"700"}, 
                    {key: 3, description:"room 3", price:"900"},
                    {key: 4, description:"room 4", price:"1200"}];

  
  

  render(ListOfRoomTypes(rooms, 0, 2000, "-1", "Choose Room Type" ));

  const description_room_1 = screen.getByText(/Room 1/);
  const price_room_1 = screen.getByText(/\$500/);

  const description_room_2 = screen.getByText(/Room 2/);
  const price_room_2 = screen.getByText(/\$700/);

  const description_room_3 = screen.getByText(/Room 3/);
  const price_room_3 = screen.getByText(/\$900/);

  const description_room_4 = screen.getByText(/Room 4/);
  const price_room_4 = screen.getByText(/\$1200/);
  
  

  expect(description_room_1).toBeInTheDocument();
  expect(description_room_2).toBeInTheDocument();
  expect(description_room_3).toBeInTheDocument();
  expect(description_room_4).toBeInTheDocument();

  expect(price_room_1).toBeInTheDocument();
  expect(price_room_2).toBeInTheDocument();
  expect(price_room_3).toBeInTheDocument();
  expect(price_room_4).toBeInTheDocument();

});



test('HotelRoomDetails Filter Price 1', () => {

  const rooms = [{key: 1, description:"room 1", price:"500"}, 
                    {key: 2, description:"room 2", price:"700"}, 
                    {key: 3, description:"room 3", price:"900"},
                    {key: 4, description:"room 4", price:"1200"}];

  
  

  render(<ListOfRoomTypes rooms = {rooms}/>);
  const description_room_1 = screen.getByText(/Room 1/);
  const price_room_1 = screen.getByText(/\$500/);
  
  const description_room_2 = screen.queryByText(/Room 2/);
  const price_room_2 = screen.queryByText(/\$700/);

  expect(description_room_1).toBeInTheDocument();
  expect(description_room_2).toBeNull();

  expect(price_room_1).toBeInTheDocument();
  expect(price_room_2).toBeNull();

});

test('HotelRoomDetails Filter Price 2', () => {

  const rooms = [{key: 1, description:"room 1", price:"500"}, 
                    {key: 2, description:"room 2", price:"700"}, 
                    {key: 3, description:"room 3", price:"900"},
                    {key: 4, description:"room 4", price:"1200"}];

  
  

  render(<ListOfRoomTypes rooms = {rooms}/>);
  const description_room_3 = screen.getByText(/Room 3/);
  const price_room_3 = screen.getByText(/\$900/);

  const description_room_4 = screen.getByText(/Room 4/);
  const price_room_4 = screen.getByText(/\$1200/);
  
  const description_room_2 = screen.queryByText(/Room 2/);
  const price_room_2 = screen.queryByText(/\$700/);

  expect(description_room_3).toBeInTheDocument();
  expect(description_room_4).toBeInTheDocument();
  expect(description_room_2).toBeNull();

  expect(price_room_3).toBeInTheDocument();
  expect(price_room_4).toBeInTheDocument();
  expect(price_room_2).toBeNull();

});

test('HotelRoomDetails Filter Price 3 : Below Lowest Price', () => {

  const rooms = [{key: 1, description:"room 1", price:"500"}, 
                    {key: 2, description:"room 2", price:"700"}, 
                    {key: 3, description:"room 3", price:"900"},
                    {key: 4, description:"room 4", price:"1200"}];

  
  

  render(<ListOfRoomTypes rooms = {rooms}/>);

  const description_room_1 = screen.queryByText(/Room 1/);
  const price_room_1 = screen.queryByText(/\$500/);

  const description_room_2 = screen.queryByText(/Room 2/);
  const price_room_2 = screen.queryByText(/\$700/);

  const description_room_3 = screen.queryByText(/Room 3/);
  const price_room_3 = screen.queryByText(/\$900/);

  const description_room_4 = screen.queryByText(/Room 4/);
  const price_room_4 = screen.queryByText(/\$1200/);
  
  

  expect(description_room_1).toBeNull();
  expect(description_room_2).toBeNull();
  expect(description_room_3).toBeNull();
  expect(description_room_4).toBeNull();

  expect(price_room_1).toBeNull();
  expect(price_room_2).toBeNull();
  expect(price_room_3).toBeNull();
  expect(price_room_4).toBeNull();

});


test('HotelRoomDetails Filter Price 4 : Above Highest Price', () => {

  const rooms = [{key: 1, description:"room 1", price:"500"}, 
                    {key: 2, description:"room 2", price:"700"}, 
                    {key: 3, description:"room 3", price:"900"},
                    {key: 4, description:"room 4", price:"1200"}];

  
  

  render(<ListOfRoomTypes rooms = {rooms}/>);

  const description_room_1 = screen.queryByText(/Room 1/);
  const price_room_1 = screen.queryByText(/\$500/);

  const description_room_2 = screen.queryByText(/Room 2/);
  const price_room_2 = screen.queryByText(/\$700/);

  const description_room_3 = screen.queryByText(/Room 3/);
  const price_room_3 = screen.queryByText(/\$900/);

  const description_room_4 = screen.queryByText(/Room 4/);
  const price_room_4 = screen.queryByText(/\$1200/);
  
  

  expect(description_room_1).toBeNull();
  expect(description_room_2).toBeNull();
  expect(description_room_3).toBeNull();
  expect(description_room_4).toBeNull();

  expect(price_room_1).toBeNull();
  expect(price_room_2).toBeNull();
  expect(price_room_3).toBeNull();
  expect(price_room_4).toBeNull();

});
//========================== Filtering Price Tests ===============================//


*/




/*
// test('HotelRoomDetails Filter Description 1', () => {

//   const rooms = [{key: 1, description:"room 1", price:"500"}, 
//                   {key: 2, description:"room 2", price:"700"}, 
//                   {key: 3, description:"room 2", price:"1200"},
//                   {key: 4, description:"room 3", price:"900"},
//                   {key: 5, description:"room 4", price:"1200"},
//                   {key: 6, description:"room 4", price:"700"},

//                 ];

  
  

//   render(ListOfRoomTypes(rooms, 0, 1200, "-1", "a"));

//   const description_room_1 = screen.queryByText(/Room 1/);
//   const price_room_1 = screen.queryByText(/500/);


//   const description_room_3 = screen.queryByText(/Room 3/);
//   const price_room_3 = screen.queryByText(/900/);

//   const description_room_4 = screen.queryByText(/Room 4/);
//   const price_room_4_1 = screen.queryByText(/700/);
//   const price_room_4_2 = screen.queryByText(/1200/);
  
  
  
//   const description_room_2 = screen.queryAllByText(/Room 2/);
//   const price_room_2_1 = screen.getByText(/700/);
//   const price_room_2_2 = screen.getByText(/1200/);


  

//   expect(description_room_1).toBeNull();
//   expect(description_room_3).toBeNull();
//   expect(description_room_4).toBeNull();
//   expect(description_room_2).toHaveLength(2);

//   expect(price_room_1).toBeNull();
//   expect(price_room_3).toBeNull();
//   expect(price_room_4_1).toBeNull();
//   expect(price_room_4_2).toBeNull();
//   expect(price_room_2_1).toBeInTheDocument();
//   expect(price_room_2_2).toBeInTheDocument();

// });
//========================== Filtering Description Tests ===============================//


*/





// ====================================================================================================

/*

//========================== HotellRoomDetails Display Tests ===============================//
test('HotelRoomDetails Itself: Show All', () => {

  const roomsInput = [{"key": 1, "roomNormalizedDescription":"Room 1", "price":500, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false, "images":["1", "2"]}, 
                  {"key": 2, "roomNormalizedDescription":"Room 2", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false}, 
                  {"key": 3, "roomNormalizedDescription":"Room 2", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true},
                  {"key": 4, "roomNormalizedDescription":"Room 3", "price":900, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false},
                  {"key": 5, "roomNormalizedDescription":"Room 4", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false},
                  {"key": 6, "roomNormalizedDescription":"Room 4", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true},

                ];

  

  
  

  render(<BrowserRouter><HotelRoomDetails
    handMeDowns={[{filterData:{
      checkInDate:"",
      checkOutDate:"",
      numberOfRooms: 10,
      minPrice: 0,
      maxPrice: 10000,
      destination: { id: 1 }},

      hotel:{
        "uid":"kUds", 
        "cloudflareImageURL":"",
        "suffix":"",
        "rating":3,
        "address":"Hotel Address",
        "term":"Hotel Name",
        "latitude":0,
        "longitude":0
      },

      destination:{"uid":"ksad"}
    }]}
    handMeDownsIndex={0}
    backendPackage= {roomsInput}
    test={1} /></BrowserRouter>);

  const description_room_1 = screen.getByText(/Room 1/);
  const price_room_1 = screen.getByText(/SGD 500/);
  
  const description_room_2 = screen.getByText(/Room 2/);
  const price_room_2_a = screen.getByText(/SGD 700/);
  const price_room_2_b = screen.getByText(/SGD 1200/);

  const description_room_3 = screen.getByText(/Room 3/);
  const price_room_3 = screen.getByText(/SGD 900/);

  const description_room_4 = screen.getByText(/Room 4/);
  const price_room_4_a = screen.getByText(/SGD 700/);
  const price_room_4_b = screen.getByText(/SGD 1200/);

  expect(description_room_1).toBeInTheDocument();
  expect(description_room_2).toBeInTheDocument();
  expect(description_room_3).toBeInTheDocument();
  expect(description_room_4).toBeInTheDocument();

  expect(price_room_1).toBeInTheDocument();
  expect(price_room_2_a).toBeInTheDocument();
  expect(price_room_2_b).toBeInTheDocument();
  expect(price_room_3).toBeInTheDocument();
  expect(price_room_4_a).toBeInTheDocument();
  expect(price_room_4_b).toBeInTheDocument();


});
*/





// ================================= Previous Tests ==================================== //

















// /// JUST TRYING OUT
// // reference: https://www.youtube.com/watch?v=7r4xVDI2vho

// beforeEach(() => initDatabase());
// afterEach(() => closeDatabase());

// beforeAll(() => initDatabase());
// afterAll(() => closeDatabase());

// const initDatabase = () => console.log('Database Initialized...');
// const closeDatabase = () => console.log('Database Closed...');


// const axios = require('axios');

// const functions = {
//   add: (num1, num2) => num1 + num2,
//   isNull: () => null,
//   checkValue: x => x,
//   checkUser: () => {
//     const user = {firstName: 'Brad'}
//     user['lastName'] = 'Traversy';
//     return user;
//   },
//   fetchRoom: () => 
//   axios
//     .get('"https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean"')
//     .then(res => res.data)
//     .catch(err => 'error')
// };

// //toBe
// test('Adds 2 + 2 to equal 4', () =>{
//   expect(functions.add(2, 2)).toBe(4);
// });

// test('Adds 2 + 2 to NOT equal 5', () =>{
//   expect(functions.add(2,2)).not.toBe(5);
// });


// //toBeNull
// test('Should be null', () => {
//   expect(functions.isNull()).toBeNull();
// });

// //toBeFalsy
// test('Should be falsy', () => {
//   expect(functions.checkValue(null)).toBeFalsy();
// });

// // toBeTruthy is to check if true


// //toEqual
// test('User should be Brad Traversy object', () => {
//   expect(functions.checkUser()).toEqual({
//     firstName: 'Brad',
//     lastName: 'Traversy'
//   });
// });

// // Less than and greater than
// test('Should be under 1600', () =>{
//   const load1 = 800;
//   const load2 = 700;
//   expect(load1 + load2).toBeLessThan(1600);
//   expect(load1 + load2).toBeLessThanOrEqual(1600);
// });

// // Regex
// test('There is no I in team', () => {
//   expect('team').not.toMatch(/I/);
//   expect('teamI').not.toMatch(/I/);
//   expect('teami').not.toMatch(/I/i);  
// })

// // Arrays
// test('Admin should be in usernames' , ()=>{
//   const usernames = ['john', 'karen', 'admin'];
//   expect(usernames).toContain('admin');
// });

// // // Promise
// // test('User fetched name should be Leanne Graham', () => {
// //   expect.assertions(1);  // MUST HAVE
// //   return functions.fetchRoom()
// //   .then( data => {
// //     expect(data.name).toEqual('Leanne Graham');
// //   });
// // });

// // Async Await
// test('User fetched name should be Leanne Graham', async () => {
//   expect.assertions(1);  // MUST HAVE
//   const data = await functions.fetchRoom()
  
//   expect(data.name).toEqual('Leanne Graham');

// });


// // Test if Function Exist
// test('Function exist', () => {
//   expect(noSuchFunc_JustTrying).toBeDefined();
// });

// test('Function exist', () => {
//   expect(typeof noSuchFunc_JustTrying).toEqual('function');
// });

// const reverseStringFunc = { reverseString : (str) => 
//   str.split('').reverse().join('')};


// test('Reverse string', () => {
//   expect(reverseStringFunc.reverseString('hello').toEqual('olleh'))
// });



