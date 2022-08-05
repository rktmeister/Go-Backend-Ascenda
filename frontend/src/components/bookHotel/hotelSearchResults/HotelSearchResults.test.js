import { render, screen } from '@testing-library/react';
import React from "react";
import HotelSearchResults from './HotelSearchResults';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

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

test("uhh", async () => {
    let obj = 0;
    const belayedRender = () => {
        render(<BrowserRouter><HotelSearchResults
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
            backendPackage={{
                getHotelBatch: async (a, b, c, d, e) => {
                    await act(async () => obj++);
                    return await act(async () => [obj].map(mockHotel));
                }
            }}
        /></BrowserRouter>);
    };

    await act(belayedRender);
    await console.log(screen.debug())
    console.log("obj", obj);
    expect(obj).toBe(19);
});