import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../common/FilterBar";
import FilterShow from "../common/FilterShow";
import "./HotelSearchResults.css";
import HotelCard from "./parts/HotelCard";
import ScrollMenu from "./parts/ScrollMenu";

const HotelSearchResults = (props) => {
    const nav = useNavigate();
    const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    const [reserveHotels, setReserveHotels] = useState([]);
    const [readyHotels, setReadyHotels] = useState([]);

    const makeFilterArray = (filterBarData) => {
        console.log(
            filterBarData,
            typeof filterBarData.minPrice,
            typeof filterBarData.maxPrice,
            (({ price }) => filterBarData.minPrice <= price && price <= filterBarData.maxPrice)(2)
        );
        return [
            ({ price }) => filterBarData.minPrice <= price && price <= filterBarData.maxPrice,
            ({ rating }) => filterBarData.minRating <= rating && rating <= filterBarData.maxRating,
        ];
    };
    const [filter, setFilter] = useState({
        values: gotHandMeDowns.filterData,
        funcs: makeFilterArray(gotHandMeDowns.filterData),
        prev: {
            values: {},
            funcs: {},
        },
    });

    const [chosenHotel, setChosenHotel] = useState(null);

    const loadHotelsFromBackend = async (fbVals) => {
        console.log("3");
        const getResults = await props.backendPackage.getHotelBatch(
            gotHandMeDowns.destination.uid,
            fbVals.checkInDate,
            fbVals.checkOutDate,
            fbVals.numberOfRooms,
            nav
        );
        console.log("GR", getResults);
        return getResults.error ? [] : getResults;
    };

    // change readyHotels if hotels, filter changes
    useEffect(() => {
        const newReadyHotels = hotels.filter(
            (hotel) => filter.funcs.every((filterFunc) => filterFunc(hotel))
        );
        setReadyHotels(newReadyHotels);
    }, [hotels, filter])

    // change displayHotels if readyHotels changes
    useEffect(() => {
        const slicePoint = Math.min(10, readyHotels.length);
        const newDisplayHotels = readyHotels.slice(0, slicePoint);
        setDisplayHotels(newDisplayHotels);
    }, [readyHotels])

    // change reserveHotels if readyHotels changes
    useEffect(() => {
        const slicePoint = Math.min(10, readyHotels.length);
        const newReserveHotels = readyHotels.slice(slicePoint);
        setReserveHotels(newReserveHotels);
    }, [readyHotels])

    // change hotels if filter changes
    useEffect(() => {
        (async () => {
            if (mustCallBackend(filter)) {
                const newHotels = await loadHotelsFromBackend(filter.values);
                setHotels(newHotels);
            }
        })();
    }, [filter])

    // useEffect(() => {
    //     (async () => {
    //         const newHotels = await loadHotelsFromBackend(filter.values);
    //         setHotels(newHotels);
    //     })();
    // }, []);

    const mustCallBackend = ({ values, prev }) => {
        console.log([
            [values.checkInDate, prev.values.checkInDate],
            [values.checkOutDate, prev.values.checkOutDate],
            [values.numberOfRooms, prev.values.numberOfRooms],
        ]);

        console.log([
            [values.checkInDate, prev.values.checkInDate],
            [values.checkOutDate, prev.values.checkOutDate],
            [values.numberOfRooms, prev.values.numberOfRooms],
        ].map(([a, b]) => a !== b));


        return [
            [values.checkInDate, prev.values.checkInDate],
            [values.checkOutDate, prev.values.checkOutDate],
            [values.numberOfRooms, prev.values.numberOfRooms],
        ]
            .map(([a, b]) => a !== b)
            .reduce((a, b) => a || b, false);
    };

    const handleFilterChange = async (formResults) => {
        console.log("FILTER CHANGE", filter);
        const prevFilter = {
            ...filter,
        };
        const newFilter = {
            values: formResults,
            funcs: makeFilterArray(formResults),
            prev: {
                values: prevFilter.values,
                funcs: prevFilter.funcs,
            },
        };
        setFilter(newFilter);
    };

    const displayMore = () => {
        console.log("DM");
        const res = reserveHotels.pop();
        setReserveHotels(reserveHotels);
        return res;
    };

    const haveReserves = () => {
        return reserveHotels.length > 0;
    }

    const finishStage = () => {
        if (chosenHotel === null) {
            alert("Must choose a hotel before proceeding!");
            return;
        }
        const dataToBePassedOn = {
            destination: gotHandMeDowns.destination,
            hotel: chosenHotel,
            filterData: filter.values,
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
            {/* <button onClick={initialLoadRoutine} /> */}
            <button onClick={() => console.log(hotels, displayHotels, reserveHotels, gotHandMeDowns, chosenHotel)} />
            <FilterShow
                currentFilterData={filter.values}
            />
            <button onClick={finishStage}>Next Stage</button>
        </div>
    );
};

export default HotelSearchResults;