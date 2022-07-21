import React, { useState, useEffect, useRef } from "react";
import "./HotelSearchResults.css";
import HotelCard from "./parts/HotelCard";
import ScrollMenu from "./parts/ScrollMenu";
import FilterBar from "../common/FilterBar";

const HotelSearchResults = (props) => {
    const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    const [filterBarValues, setFilterBarValues] = useState({
        checkInDate: gotHandMeDowns.checkInDate,
        checkOutDate: gotHandMeDowns.checkOutDate,
        minPrice: gotHandMeDowns.minPrice,
        maxPrice: gotHandMeDowns.maxPrice,
        numberOfRooms: gotHandMeDowns.numberOfRooms,
    });
    const makeFilterArray = (filterBarData) => {
        //console.log("MFA:", gotHandMeDowns, props.handMeDowns, props.handMeDownsIndex);
        return [
            ({ number_of_rooms }) => number_of_rooms >= filterBarData.numberOfRooms,
            ({ price }) => filterBarData.minPrice <= price && price <= filterBarData.maxPrice,
        ];
    };
    const [filterArray, setFilterArray] = useState(makeFilterArray(gotHandMeDowns));
    const [noMoreResults, setNoMoreResults] = useState(false);
    const [chosenHotel, setChosenHotel] = useState(null);

    const cardHeightInEms = 10;


    const [scrollPosition, setScrollPosition] = useState(0);
    const [minScrollPosition, setMinScrollPosition] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(2);
    const handleScroll = (position) => {
        // credit for emInPixels: https://stackoverflow.com/questions/23174067/jquery-scrolltop-with-em
        const emInPixels = Number(getComputedStyle(document.body, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]);
        const cardPos = Math.floor(position / (cardHeightInEms * emInPixels));
        setScrollPosition(cardPos);
        //console.log("Scroll position: ", cardPos);
    };



    const [topRemainingToLoad, setTopRemainingToLoad] = useState(0);
    const [bottomRemainingToLoad, setBottomRemainingToLoad] = useState(0);
    // const [loadingWait, setLoadingWait] = useState(false);
    useEffect(() => {
        //console.log(minScrollPosition, scrollPosition, maxScrollPosition);
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
        //console.log("MAX:", maxScrollPosition);
    }, [scrollPosition, displayHotels]);

    const bottomDecayConstant = (maxScrollPosition) => {
        const res = -(1 / (0.1 * (maxScrollPosition + 1.042))) + 9.6;
        //console.log("DECAY: ", res);
        return res;
    };

    useEffect(() => {
        (async () => {
            const firstHotel = hotels[0];
            if (topRemainingToLoad > 0) {
                if (noMoreResults) {
                    setTopRemainingToLoad(0);
                    return;
                }
                const getResults = await getHotelBatchAndSetNoMoreResults(firstHotel.uid, 2, 2);
                setTopRemainingToLoad(Math.max(topRemainingToLoad - getResults.length, 0));
            }
        })();
    }, [topRemainingToLoad]);

    useEffect(() => {
        (async () => {
            //console.log("BOTTOM: ", bottomRemainingToLoad);
            const lastHotel = hotels[hotels.length - 1];
            if (bottomRemainingToLoad > 0) {
                if (noMoreResults) {
                    setBottomRemainingToLoad(0);
                    return;
                }
                const getResults = await getHotelBatchAndSetNoMoreResults(lastHotel.uid, 2, 2);
                //console.log("X", bottomRemainingToLoad, getResults, getResults.length, bottomRemainingToLoad - getResults.length, displayHotels.length);
                setBottomRemainingToLoad(Math.max(bottomRemainingToLoad - getResults.length, 0));
            }
        })();
    }, [bottomRemainingToLoad]);

    const getFilteredHotels = () => {
        //console.log("HOTELS:", hotels);
        return hotels.filter((hotel) => filterArray.every((filterFunc) => filterFunc(hotel)));
    }

    const addHotels = (newHotels) => {
        console.log("NEWHOTELS:", newHotels);
        newHotels.sort((hotel1, hotel2) => hotel1.term.localeCompare(hotel2.term));

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
            const compareResult = newHotel.term.localeCompare(hotel.term);
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
            if (hotel.uid !== lastUniqueHotelId) {
                uniqueHotels.push(hotel);
                lastUniqueHotelId = hotel.uid;
            }
        }

        //console.log(uniqueHotels);
        setHotels(uniqueHotels);
        // console.log("EXIT ADDHOTELS");
    };

    const getHotelBatchAndSetNoMoreResults = async (hotelId, destinationId, before) => {
        //console.log("LONG", displayHotels, displayHotels.length, gotHandMeDowns.destination);
        const getResults = await props.backendPackage.getHotelBatch(
            //displayHotels.length > 0 ? displayHotels[displayHotels.length - 1].uid : 0,
            gotHandMeDowns.destination.uid,
            filterBarValues.checkInDate,
            filterBarValues.checkOutDate,
            filterBarValues.numberOfRooms
        );
        //console.log("UH", getResults);
        if (getResults.length === 0) {
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

    const initialLoadRoutine = async () => {
        if (displayHotels.length < 10 && !noMoreResults) {
            await getHotelBatchAndSetNoMoreResults(2, 2, 2);
        }
    };

    useEffect(() => {
        (async () => {
            await initialLoadRoutine();
        })();
    }, [displayHotels]);

    useEffect(() => {
        //console.log("FILTERED", getFilteredHotels(), filterArray);
        setDisplayHotels(getFilteredHotels());
    }, [hotels, filterArray]);

    const handleFilterChange = (formResults) => {
        const newFilterArray = makeFilterArray(formResults);
        setFilterBarValues(formResults);
        setFilterArray(newFilterArray);
    };

    const finishStage = () => {
        const dataToBePassedOn = {
            destination: gotHandMeDowns.destination,
            hotel: chosenHotel,
            ...filterBarValues,
        };
        props.handMeDowns.push(dataToBePassedOn);
        props.finishStage(props.handMeDowns);
    };

    const handleChooseHotel = (item) => {
        console.log(item);
        setChosenHotel(item);
    };

    return (
        <div>
            <FilterBar onSubmit={handleFilterChange} />
            <ScrollMenu
                items={displayHotels}
                itemMapping={(item) => {
                    return (
                        <HotelCard key={item.uid} item={item} height={`${cardHeightInEms}rem`} onClick={handleChooseHotel} />
                    );
                }}
                onScroll={handleScroll}
            />
            <button onClick={initialLoadRoutine} />
            <button onClick={() => console.log(displayHotels, gotHandMeDowns, chosenHotel)} />
            <button onClick={finishStage}>Next Stage</button>
        </div>
    );
};

export default HotelSearchResults;