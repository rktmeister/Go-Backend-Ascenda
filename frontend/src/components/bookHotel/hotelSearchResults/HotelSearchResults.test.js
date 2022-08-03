// import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
// import React from "react";
// import { act } from 'react-dom/test-utils';
// import * as router from 'react-router';
// import HotelSearchResults from './HotelSearchResults';

// const navigate = jest.fn()

// beforeEach(() => {
//     jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
// })
// const mockHotel = (uid) => {
//     const res = {
//         uid,
//         term: uid.toString(),
//         number_of_rooms: uid,
//         price: uid,
//         latitude: uid,
//         longitude: uid,
//         description: uid.toString(),
//     };
//     //console.log(res);
//     return res;
// }

// // test("uhh", async () => {
// //     let obj = 0;
// //     const belayedRender = () => {
// //         render(<HotelSearchResults
// //             handMeDowns={[{
// //                 filterData: {
// //                     numberOfRooms: 10,
// //                     minPrice: 0,
// //                     maxPrice: 100,
// //                     destination: { id: 1 },
// //                     minRating: 0,
// //                     maxRating:100,
// //                 }

// //             }]}
// //             handMeDownsIndex={0}
// //             backendPackage={{
// //                 getHotelBatch: async (a, b, c, d, e) => {
// //                     await act(async () => obj++);
// //                     return await act(async () => [obj].map(mockHotel));
// //                 }
// //             }}
// //         />);
// //     };
// //     await act(belayedRender);
// //     console.log("obj", obj);
// //     expect(obj).toBe(19);
// // });

// test("filter knows when to call backend", async () => {
//     let obj = 0;
//     expect.assertions(2);
//     const belayedRender = () => {
//         render(<HotelSearchResults
//             handMeDowns={[{
//                 filterData: {
//                     numberOfRooms: 10,
//                     minPrice: 0,
//                     maxPrice: 100,
//                     destination: { id: 1 },
//                     minRating: 0,
//                     maxRating: 100,
//                 },
//                 destination: {
//                     uid: "hello",
//                 }

//             }]}
//             handMeDownsIndex={0}
//             backendPackage={{
//                 getHotelBatch: async (a, b, c, d, e) => {
//                     await act(async () => {
//                         obj++;
//                     });
//                     return await act(async () => [obj].map(mockHotel));
//                 }
//             }}
//         />);
//     };
//     await act(belayedRender);

//     expect(obj).toBe(1);
//     const numberOfRoomsInput = screen.getByTestId("numberOfRoomsInput");
//     numberOfRoomsInput.focus();
//     userEvent.keyboard("2");
//     fireEvent.click(screen.getByText("Submit"));
//     expect(obj).toBe(2);


// });