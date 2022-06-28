import React, { useState, useEffect, useRef } from "react";
import "./DestinationSearch.css";
import HotelCard from "./parts/HotelCard";
import ScrollMenu from "./parts/ScrollMenu";
import { getHotelBatch } from "../../../utils/backendAPI";

const DestinationSearch = (props) => {
    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    const [filterArray, setFilterArray] = useState(props.filterArray);
    const [noMoreResults, setNoMoreResults] = useState(false);


    const cardHeightInEms = 10;

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = (position) => {
        // credit for emInPixels: https://stackoverflow.com/questions/23174067/jquery-scrolltop-with-em
        const emInPixels = Number(getComputedStyle(document.body, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]);
        const cardPos = Math.floor(position / (cardHeightInEms * emInPixels));
        setScrollPosition(cardPos);
        //console.log("Scroll position: ", cardPos);
    };

    const getFilteredHotels = () => hotels.filter((hotel) => filterArray.every((filterFunc) => filterFunc(hotel)));

    const addHotels = (newHotels) => {
        console.log("ENTER ADDHOTELS");
        newHotels.sort((hotel1, hotel2) => hotel1.name.localeCompare(hotel2.name));
        console.log("NEWHOTELS: ", [...newHotels]);
        console.log("HOTELS: ", [...hotels]);

        // mergesort-style merge for linear efficiency
        let mergedHotels = [];
        let newHotelsPtr = 0;
        let hotelsPtr = 0;
        for (let i = 0; i < newHotels.length + hotels.length; i++) {
            if (newHotelsPtr >= newHotels.length) {
                mergedHotels = mergedHotels.concat(hotels.slice(hotelsPtr));
                break;
            }
            if (hotelsPtr >= hotels.length) {
                mergedHotels = mergedHotels.concat(newHotels.slice(newHotelsPtr));
                break;
            }

            const newHotel = newHotels[newHotelsPtr];
            const hotel = hotels[hotelsPtr];
            const compareResult = newHotel.name.localeCompare(hotel.name);
            if (compareResult <= 0) { // we'll remove duplicates in the next step
                mergedHotels.push(newHotel);
                newHotelsPtr++;
            } else {
                mergedHotels.push(hotel);
                hotelsPtr++;
            }
        }
        console.log([...mergedHotels]);

        // remove duplicates by id. we do not assume hotels
        // are the same if they have the same name, only if
        // they have the same id
        let uniqueHotels = [];
        let lastUniqueHotelId = { id: { no_hotel_should_have: "this object as an id" } };
        for (let hotel of mergedHotels) {
            if (hotel.id !== lastUniqueHotelId) {
                uniqueHotels.push(hotel);
                lastUniqueHotelId = hotel.id;
            }
        }

        console.log(uniqueHotels);
        setHotels(uniqueHotels);
        console.log("EXIT ADDHOTELS");
    };

    const initialLoadRoutine = () => {
        if (displayHotels.length < 10 && !noMoreResults) {
            const getResults = getHotelBatch(2, 2, 2);
            if (getResults.length == 0) {
                setNoMoreResults(true);
                console.log("exhausted");
            } else {
                addHotels(getResults);
            }
        }
    };




    useEffect(initialLoadRoutine, [displayHotels]);

    const testButtonClick = () => {
        setHotels([...hotels, { id: 2, name: "newName" }]);
    }

    useEffect(() => {
        setDisplayHotels(getFilteredHotels());
    }, [hotels]);

    return (
        <div>
            <ScrollMenu
                items={displayHotels}
                itemMapping={({ id, name }) => {
                    return (
                        <HotelCard id={id} name={name} height={`${cardHeightInEms}rem`} />
                    );
                }}
                onScroll={handleScroll}
            />
            <button onClick={initialLoadRoutine} />
            <button onClick={() => console.log(displayHotels)} />
        </div>
    );
};

export default DestinationSearch;