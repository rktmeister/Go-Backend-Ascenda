import { render, screen } from '@testing-library/react';
import RemoveDescriptionDuplicate from "./parts/RemoveDescriptionDuplicate";
import HotelRoomBox from "./parts/HotelRoomBox.js";
import HotelRoomDetails from "./HotelRoomDetails.js";
import ListOfRoomTypes from "./parts/ListOfRoomTypes";


// test('renders learn react link', () => {
//   render(<HotelRoomDetails />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });






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







//========================== HotelRoomBox Component Tests ===============================// 

test('HotelRoomBox Text Presence', () => {
  render(<HotelRoomBox description = "test_description" price = "1234" />);
  const description_test = screen.getByText(/Test_description/);
  const price_test = screen.getByText(/\$1234/);
  expect(description_test).toBeInTheDocument();
  expect(price_test).toBeInTheDocument();
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

  
  

  render(ListOfRoomTypes(rooms, 400, 600, "-1", "Choose Room Type" ));
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

  
  

  render(ListOfRoomTypes(rooms, 900, 1200, "-1", "Choose Room Type" ));
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

  
  

  render(ListOfRoomTypes(rooms, 0, 400, "-1", "Choose Room Type" ));

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

  
  

  render(ListOfRoomTypes(rooms, 1300, 2000, "-1", "Choose Room Type" ));

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






//========================== Filtering Description Tests ===============================//
test('HotelRoomDetails Filter Description 0 : Show All', () => {

  const rooms = [{"key": 1, "roomNormalizedDescription":"Room 1", "price":500, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false}, 
                  {"key": 2, "roomNormalizedDescription":"Room 2", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false}, 
                  {"key": 3, "roomNormalizedDescription":"Room 2", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true},
                  {"key": 4, "roomNormalizedDescription":"Room 3", "price":900, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false},
                  {"key": 5, "roomNormalizedDescription":"Room 4", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false},
                  {"key": 6, "roomNormalizedDescription":"Room 4", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true},

                ];

  
  

  render(ListOfRoomTypes(rooms, 0, 2000, "-1", "Choose Room Type" ));
  const description_room_1 = screen.getByText(/Room 1/);
  const price_room_1 = screen.getByText(/\$500/);
  
  const description_room_2 = screen.queryByText(/Room 2/);
  const price_room_2 = screen.queryByText(/\$700/);

  expect(description_room_1).toBeInTheDocument();
  expect(description_room_2).toBeNull();

  expect(price_room_1).toBeInTheDocument();
  expect(price_room_2).toBeNull();

});

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








//========================== HotellRoomDetails Display Tests ===============================//
test('HotelRoomDetails Itself: Show All', () => {

  const roomsInput = {"rooms": [{"key": 1, "roomNormalizedDescription":"Room 1", "price":500, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false}, 
                  {"key": 2, "roomNormalizedDescription":"Room 2", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false}, 
                  {"key": 3, "roomNormalizedDescription":"Room 2", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true},
                  {"key": 4, "roomNormalizedDescription":"Room 3", "price":900, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false},
                  {"key": 5, "roomNormalizedDescription":"Room 4", "price":1200, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_room_only"}, "free_cancellation": false},
                  {"key": 6, "roomNormalizedDescription":"Room 4", "price":700, "roomAdditionalInfo": {"breakfast_info": "hotel_detail_breakfast_included"}, "free_cancellation": true},

                ]};

  
  

  render(<HotelRoomDetails
    handMeDowns={[{
      numberOfRooms: 10,
      minPrice: 0,
      maxPrice: 100,
      destination: { id: 1 },
  }]}
    backendPackage= {roomsInput}/>);

  const description_room_1 = screen.getByText(/Room 1/);
  const price_room_1 = screen.getByText(/SGD 500/);
  
  const description_room_2 = screen.getByText(/Room 2/);
  const price_room_2_a = screen.getByText(/SGD 700/);
  const price_room_2_b = screen.getByText(/SGD 1200/);

  const description_room_3 = screen.getByText(/Room 3/);
  const price_room_3 = screen.getByText(/SGD 900/);

  const description_room_4 = screen.getByText(/Room 4/);
  const price_room_4_a = screen.getByText(/SGD 700/);
  const price_room_4_b = screen.quergetByTextyByText(/SGD 1200/);

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



