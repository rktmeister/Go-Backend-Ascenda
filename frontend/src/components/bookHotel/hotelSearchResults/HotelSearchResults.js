import React, { useState, useEffect, useRef } from "react";
import "./HotelSearchResults.css";
import HotelCard from "./parts/HotelCard";
import ScrollMenu from "./parts/ScrollMenu";
import FilterBar from "../common/FilterBar";
import FilterShow from "../common/FilterShow";

const HotelSearchResults = (props) => {
    const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    const [reserveHotels, setReserveHotels] = useState([]);
    const [filterBarValues, setFilterBarValues] = useState(gotHandMeDowns.filterData);
    const makeFilterArray = (filterBarData) => {
        console.log(filterBarData, typeof filterBarData.minPrice, typeof filterBarData.maxPrice, (({ price }) => filterBarData.minPrice <= price && price <= filterBarData.maxPrice)(2));
        return [
            //({ number_of_rooms }) => number_of_rooms >= filterBarData.numberOfRooms,
            ({ price }) => filterBarData.minPrice <= price && price <= filterBarData.maxPrice,
        ];
    };
    const [filterArray, setFilterArray] = useState(makeFilterArray(gotHandMeDowns.filterData));
    const [chosenHotel, setChosenHotel] = useState(null);

    // const getFilteredHotels = () => {
    //     return hotels.filter((hotel) => filterArray.every((filterFunc) => filterFunc(hotel)));
    // }

    const loadHotelsFromBackend = async (fbVals = filterBarValues) => {
        console.log("3");
        const getResults = await props.backendPackage.getHotelBatch(
            gotHandMeDowns.destination.uid,
            fbVals.checkInDate,
            fbVals.checkOutDate,
            fbVals.numberOfRooms
        );
        if (getResults.error) {
            setHotels([]);
            return [];
        } else {
            setHotels(getResults);
        }
        return getResults;
    };

    const initializeDisplay = (getResults = hotels) => {
        const slicePoint = Math.min(10, getResults.length);
        console.log("D", getResults.slice(0, slicePoint));
        console.log("R", getResults.slice(slicePoint));
        setDisplayHotels(getResults.slice(0, slicePoint));
        setReserveHotels(getResults.slice(slicePoint));
    };

    const bufferLoad = (buffer, lastHotelId, before) => {

    }

    // const sortHotels;

    // const displayHote

    const initialLoadRoutine = async (formResults = undefined) => {
        console.log("2");
        const getResults = await loadHotelsFromBackend(formResults);
        const filteredResults = getResults.filter((hotel) => filterArray.every((filterFunc) => filterFunc(hotel)));
        initializeDisplay(filteredResults);
    };

    const refilter = (newFilterArray) => {
        const filteredResults = hotels.filter((hotel) => newFilterArray.every((filterFunc) => filterFunc(hotel)));
        initializeDisplay(filteredResults);
    }

    useEffect(() => {
        (async () => {
            await initialLoadRoutine();
        })();
    }, []);

    // useEffect(() => {
    //     setDisplayHotels(getFilteredHotels());
    // }, [hotels, filterArray]);

    const mustCallBackend = (formResults) => {
        console.log([
            [filterBarValues.checkInDate, formResults.checkInDate],
            [filterBarValues.checkOutDate, formResults.checkOutDate],
            [filterBarValues.numberOfRooms, formResults.numberOfRooms],
        ]);

        console.log([
            [filterBarValues.checkInDate, formResults.checkInDate],
            [filterBarValues.checkOutDate, formResults.checkOutDate],
            [filterBarValues.numberOfRooms, formResults.numberOfRooms],
        ].map(([a, b]) => a !== b));


        return [
            [filterBarValues.checkInDate, formResults.checkInDate],
            [filterBarValues.checkOutDate, formResults.checkOutDate],
            [filterBarValues.numberOfRooms, formResults.numberOfRooms],
        ]
            .map(([a, b]) => a !== b)
            .reduce((a, b) => a || b, false);
    };

    const handleFilterChange = async (formResults) => {
        console.log("MUST CALL BACKEND:", mustCallBackend(formResults));
        if (mustCallBackend(formResults)) {
            await console.log("1");
            initialLoadRoutine(formResults);
            //return;
        }
        const newFilterArray = makeFilterArray(formResults);
        setFilterBarValues(formResults);
        setFilterArray(newFilterArray);
        refilter(newFilterArray);
    };

    const displayMore = () => {
        console.log("DM");
        const res = reserveHotels.pop();
        // let res = null;
        // while (res === null && haveReserves()) {
        //     const candidate = reserveHotels.pop();
        //     console.log("POP", candidate, reserveHotels);
        //     //console.log("CANDIDATE:", candidate, typeof candidate.price);
        //     console.log(filterArray.every((filterFunc) => filterFunc(candidate)));
        //     if (filterArray.every((filterFunc) => filterFunc(candidate))) {
        //         //console.log("BINGO");
        //         res = candidate;
        //     }
        // }
        //console.log("END:", res, reserveHotels);
        setReserveHotels(reserveHotels);
        return res;

        // const reserves = reserveHotels.slice();
        // const transfer = []
        // while (transfer.length < 10 || noMore)


        // const transferAmount = Math.min(10, reserveHotels.length);
        // const transfer = reserveHotels.slice(0, transferAmount);
        // const newReserveHotels = reserveHotels.slice(transferAmount);
        // //const newDisplayHotels = transfer.concat(displayHotels);
        // setReserveHotels(newReserveHotels);
        // //setDisplayHotels(newDisplayHotels);
        // return transfer;
    };

    const haveReserves = () => {
        return reserveHotels.length > 0;
    }

    const finishStage = () => {
        const dataToBePassedOn = {
            destination: gotHandMeDowns.destination,
            hotel: chosenHotel,
            filterData: filterBarValues,
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
            <FilterBar
                onSubmit={handleFilterChange}
                prior={gotHandMeDowns.filterData}
            />
            <ScrollMenu
                items={displayHotels}
                itemMapping={(item) => {
                    return (
                        <HotelCard key={item.uid} item={item} height={200} onClick={handleChooseHotel} />
                    );
                }}
                haveMore={haveReserves}
                getMore={displayMore}
                height={500}
            />
            <button onClick={initialLoadRoutine} />
            <button onClick={() => console.log(hotels, displayHotels, reserveHotels, gotHandMeDowns, chosenHotel)} />
            <FilterShow
                currentFilterData={filterBarValues}
            />
            <button onClick={finishStage}>Next Stage</button>
        </div>
    );
};

export default HotelSearchResults;