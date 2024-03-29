import { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

const FilterBar = (props) => {
    const [numberOfRooms, setNumberOfRooms] = useState(props.prior.numberOfRooms);
    const [checkInDate, setCheckInDate] = useState(props.prior.checkInDate);
    const [checkOutDate, setCheckOutDate] = useState(props.prior.checkOutDate);
    const [minPrice, setMinPrice] = useState(props.prior.minPrice);
    const [maxPrice, setMaxPrice] = useState(props.prior.maxPrice);
    const [minRating, setMinRating] = useState(props.prior.minRating);
    const [maxRating, setMaxRating] = useState(props.prior.maxRating);
    const [alertMessage, setAlertMessage] = useState("");

    const handlePriceInput = (e) => {
        setMinPrice(e.minValue);
        setMaxPrice(e.maxValue);
    };
    const handleRatingInput = (e) => {
        setMinRating(e.minValue);
        setMaxRating(e.maxValue);
    };




    const makeGuardFunction = (guardArray) => (newValue) => {
        for (let [func, msg] of guardArray) {
            if (!func(newValue)) {
                setAlertMessage(msg);
                return false;
            }
        }
        return true;
    };

    const verifyNumberOfRooms = makeGuardFunction([
        [(numberOfRooms) => typeof numberOfRooms === "number", "Number of rooms must be number!"],
        [(numberOfRooms) => numberOfRooms > 0, "Number of rooms cannot be zero or less!"],
    ]);

    const verifyCheckInAndOutDate = makeGuardFunction([
        [({ checkInDate }) => typeof checkInDate === "string", "Check in date must be date!"],
        [({ checkInDate }) => !isNaN(new Date(checkInDate)), "Check in date must be date!"],
        [({ checkOutDate }) => typeof checkOutDate === "string", "Check out date must be date!"],
        [({ checkOutDate }) => !isNaN(new Date(checkOutDate)), "Check in date must be date!"],
        [({ checkInDate, checkOutDate }) => new Date(checkInDate) < new Date(checkOutDate), "Check in date must be before check out date"],
    ]);

    const verifyMinAndMaxPrice = makeGuardFunction([
        [({ minPrice }) => typeof minPrice === "number", "Min price must be number!"],
        [({ minPrice }) => minPrice >= 0, "Min price cannot be below zero!"],
        [({ maxPrice }) => typeof maxPrice === "number", "Max price must be number!"],
        [({ minPrice, maxPrice }) => minPrice <= maxPrice, "Min price must be equal to or lower than max price"]
    ]);

    const verifyMinAndMaxRating = makeGuardFunction([
        [({ minRating }) => typeof minRating === "number", "Min rating must be number!"],
        [({ minRating }) => minRating >= 0, "Min rating cannot be below zero!"],
        [({ maxRating }) => typeof maxRating === "number", "Max rating must be number!"],
        [({ minRating, maxRating }) => minRating <= maxRating, "Min rating must be equal to or lower than max price"]
    ]);

    const guardSubmit = (event) => {
        event.preventDefault();

        setAlertMessage("");
        if (!verifyNumberOfRooms(numberOfRooms)) return;
        if (!verifyCheckInAndOutDate({ checkInDate, checkOutDate })) return;
        if (!verifyMinAndMaxPrice({ minPrice, maxPrice })) return;
        if (!verifyMinAndMaxRating({ minRating, maxRating })) return;

        const formResults = {
            numberOfRooms,
            checkInDate,
            checkOutDate,
            minPrice,
            maxPrice,
            minRating,
            maxRating,
        };
        setAlertMessage("Submission successful!");
        props.onSubmit(formResults);
        console.log("hi");
        console.log(formResults);

    }

    // const typeGuard = (setter, tryFunc) => {
    //     try {
    //         const transformedValue = tryFunc();
    //         setter(transformedValue);
    //     } catch (e) {
    //         // Do nothing
    //     }
    // }

    useEffect(() => {
        setNumberOfRooms(props.prior.numberOfRooms);
        setCheckInDate(props.prior.checkInDate);
        setCheckOutDate(props.prior.checkOutDate);
        setMinPrice(props.prior.minPrice);
        setMaxPrice(props.prior.maxPrice);
    }, []);

    return (
        <div className="card mb-3">
            <form onSubmit={guardSubmit} className="card-body">
                <div className="input-group mb-3">
                    <label htmlFor="numberOfRooms" className="input-group-text">Number of Rooms</label>
                    <input
                        data-testid="numberOfRoomsInput"
                        type="number"
                        className="form-control"
                        id="numberOfRooms"
                        placeholder="Number of rooms/guests"
                        onChange={(event) => {
                            if (!isNaN(event.target.value))
                                setNumberOfRooms(parseInt(event.target.value));

                            if (props.test) {
                                props.testBoolForBackend(true);  // For Unit Test => Change of number of rooms lead to call of backend.
                            }
                        }}
                        value={numberOfRooms}
                    />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="checkInDate" className="input-group-text">Check In Date</label>
                    <input
                        data-testid="checkInDateInput"
                        type="date"
                        className="form-control"
                        id="checkInDate"
                        placeholder=""
                        onChange={(event) => {
                            setCheckInDate(event.target.value);
                            if (props.test) {
                                props.testBoolForBackend(true);  // For Unit Test => Change of number of rooms lead to call of backend.
                            }
                        }}
                        value={checkInDate}
                    />
                    <label htmlFor="checkOutDate" className="input-group-text">Check Out Date</label>
                    <input
                        data-testid="checkOutDateInput"
                        type="date"
                        className="form-control"
                        id="checkOutDate"
                        placeholder=""
                        onChange={(event) => {
                            setCheckOutDate(event.target.value);
                            if (props.test) {
                                props.testBoolForBackend(true);  // For Unit Test => Change of number of rooms lead to call of backend.
                            }
                        }}
                        value={checkOutDate}
                    />
                </div>
                <div id="priceSlider" className="mb-3">
                    Price
                    <MultiRangeSlider
                        data-testid="priceSlider"
                        min={0}
                        max={10000}
                        step={100}
                        ruler={false}
                        label={true}
                        preventWheel={false}
                        minValue={minPrice}
                        maxValue={maxPrice}
                        onInput={(e) => {
                            handlePriceInput(e);
                            console.log(e);
                        }}
                    />
                </div>
                <div id="ratingSlider" className="mb-3">
                    Rating
                    <MultiRangeSlider
                        min={0}
                        max={5}
                        step={1}
                        ruler={false}
                        label={true}
                        preventWheel={false}
                        minValue={minRating}
                        maxValue={maxRating}
                        onInput={(e) => {
                            handleRatingInput(e);
                            console.log(e);
                        }}
                    />
                </div>
                <button id="submitFilter" type="submit" className="btn btn-secondary btn-lg col-12 mb-3" data-testid="filterBarSubmitButton" >Submit</button>
                <div className="alert mb-3" role="alert">
                    {alertMessage}
                </div>
            </form>

            {/* <button onClick={testButton}>Test FilterBar</button> */}
        </div>
    );
};

export default FilterBar;