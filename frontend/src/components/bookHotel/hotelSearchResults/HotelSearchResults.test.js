import { render, screen } from '@testing-library/react';
import React from "react";
import HotelSearchResults from './HotelSearchResults';
import F from './t';
import { formatQueryParameters, delay } from '../../../utils/backendAPI';

const mockHotel = (id) => {
    const res = {
        id,
        name: id.toString(),
        number_of_rooms: id,
        price: id,
        latitude: id,
        longitude: id,
        description: id.toString(),
    };
    console.log(res);
    return res;
}

test("uhh", async () => {
    render(<HotelSearchResults
        handMeDowns={[{
            numberOfRooms: 3,
            minPrice: 0,
            maxPrice: 100,
            destination: { id: 1 },
        }]}
        handMeDownsIndex={0}
        backendPackage={{
            getHotelBatch: async (a, b, c, d, e) => {
                console.log("______________________________");
                return [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(mockHotel)
            }
        }}
    />);
    //render(<F />);
    await delay(5);
    screen.debug();
});