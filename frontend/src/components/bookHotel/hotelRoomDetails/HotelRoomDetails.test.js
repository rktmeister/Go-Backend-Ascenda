import { render, screen } from '@testing-library/react';
import LowerCaseChange from "./parts/LowerCaseChange";
import RemoveDescriptionDuplicate from "./parts/RemoveDescriptionDuplicate";

// test('renders learn react link', () => {
//   render(<HotelRoomDetails />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Transform lowercase', () =>{
  expect(LowerCaseChange("AbCDEfG")).toBe("Abcdefg");
});

test('Remove duplicates 1', () => {
  const testArray = ["Element 1", "Element 1", "Element 2"];
  expect(RemoveDescriptionDuplicate(testArray)).toEqual(["Element 1", "Element 2"]);
});

test('Remove duplicates 2', () => {
  const testArray = ["Element 1", "element 1", "Element 2"];
  expect(RemoveDescriptionDuplicate(testArray)).toEqual(["Element 1", "element 1", "Element 2"]);
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



