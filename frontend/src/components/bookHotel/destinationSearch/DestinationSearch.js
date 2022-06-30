import React, { useState, useEffect, useRef } from "react";
import "./DestinationSearch.css";
import HotelCard from "./parts/HotelCard";
import ScrollMenu from "./parts/ScrollMenu";
import { getHotelBatch } from "../../../utils/backendAPI";
import FilterBar from "./parts/FilterBar";

const DestinationSearch = (props) => {
    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    const [filterArray, setFilterArray] = useState(props.filterArray);
    const [noMoreResults, setNoMoreResults] = useState(false);

    const cardHeightInEms = 10;

    const [scrollPosition, setScrollPosition] = useState(0);
    const [minScrollPosition, setMinScrollPosition] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(8);
    const handleScroll = (position) => {
        // credit for emInPixels: https://stackoverflow.com/questions/23174067/jquery-scrolltop-with-em
        const emInPixels = Number(getComputedStyle(document.body, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]);
        const cardPos = Math.floor(position / (cardHeightInEms * emInPixels));
        setScrollPosition(cardPos);
        //console.log("Scroll position: ", cardPos);
    };



    const [topRemainingToLoad, setTopRemainingToLoad] = useState(0);
    const [bottomRemainingToLoad, setBottomRemainingToLoad] = useState(0);
    const [loadingWait, setLoadingWait] = useState(false);
    useEffect(() => {
        console.log(minScrollPosition, scrollPosition, maxScrollPosition);
        if (minScrollPosition > scrollPosition) {
            setMinScrollPosition(scrollPosition - Math.floor(displayHotels.length / 10));
            setTopRemainingToLoad(topRemainingToLoad + 1);
        }

        if (maxScrollPosition < scrollPosition) {
            setMaxScrollPosition(
                Math.min(
                    ((displayHotels.length / 10) * bottomDecayConstant(maxScrollPosition)),
                    displayHotels.length - 5
                )
            );
            setBottomRemainingToLoad(bottomRemainingToLoad + 1);
        }
        console.log("MAX:", maxScrollPosition);
    }, [scrollPosition]);

    const bottomDecayConstant = (maxScrollPosition) => {
        const res = -(1 / (0.1 * (maxScrollPosition + 1.042))) + 9.6;
        console.log("DECAY: ", res);
        return res;
    };

    useEffect(() => {
        const firstHotel = hotels[0];
        if (topRemainingToLoad > 0) {
            if (noMoreResults) {
                setTopRemainingToLoad(0);
                return;
            }
            const getResults = getHotelBatchAndSetNoMoreResults(firstHotel.id, 2, 2);
            setTopRemainingToLoad(Math.max(topRemainingToLoad - getResults.length, 0));
        }
    }, [topRemainingToLoad]);

    useEffect(() => {
        console.log("BOTTOM: ", bottomRemainingToLoad);
        const lastHotel = hotels[hotels.length - 1];
        if (bottomRemainingToLoad > 0) {
            if (noMoreResults) {
                setBottomRemainingToLoad(0);
                return;
            }
            const getResults = getHotelBatchAndSetNoMoreResults(lastHotel.id, 2, 2);
            console.log("X", bottomRemainingToLoad, getResults.length, bottomRemainingToLoad - getResults.length, displayHotels.length);
            setBottomRemainingToLoad(Math.max(bottomRemainingToLoad - getResults.length, 0));
        }
    }, [bottomRemainingToLoad]);

    const getFilteredHotels = () => hotels.filter((hotel) => filterArray.every((filterFunc) => filterFunc(hotel)));

    const addHotels = (newHotels) => {
        // console.log("ENTER ADDHOTELS");
        newHotels.sort((hotel1, hotel2) => hotel1.name.localeCompare(hotel2.name));
        // console.log("NEWHOTELS: ", [...newHotels]);
        // console.log("HOTELS: ", [...hotels]);

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
        // console.log([...mergedHotels]);

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

        // console.log(uniqueHotels);
        setHotels(uniqueHotels);
        // console.log("EXIT ADDHOTELS");
    };

    const getHotelBatchAndSetNoMoreResults = (hotelId, destinationId, before) => {
        const getResults = getHotelBatch("A", 2, 2);
        if (getResults.length == 0) {
            setNoMoreResults(true);
            console.log("_________________EXHAUSTED_______________");
        } else {
            setNoMoreResults(false);
            addHotels(getResults);
        }
        return getResults;
    };

    const bufferLoad = (buffer, lastHotelId, before) => {

    }

    const initialLoadRoutine = () => {
        if (displayHotels.length < 10 && !noMoreResults) {
            getHotelBatchAndSetNoMoreResults(2, 2, 2);
        }
    };

    useEffect(initialLoadRoutine, [displayHotels]);

    useEffect(() => {
        setDisplayHotels(getFilteredHotels());
    }, [hotels]);

    const handleFilterChange = (formResults) => {
        const newFilterArray = [
            ({ number_of_rooms }) => number_of_rooms >= formResults.numberOfRooms,
            ({ price }) => formResults.minPrice <= price && price <= formResults.maxPrice,
        ];
        setFilterArray(newFilterArray);
    };

    return (
        <div>
            <FilterBar onSubmit={handleFilterChange} />
            <ScrollMenu
                items={displayHotels}
                itemMapping={({ id, name }) => {
                    return (
                        <HotelCard key={id} id={id} name={name} height={`${cardHeightInEms}rem`} />
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