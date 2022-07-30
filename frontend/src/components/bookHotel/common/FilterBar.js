import { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

const FilterBar = (props) => {
    const [numberOfRooms, setNumberOfRooms] = useState(props.numberOfRooms);
    const [checkInDate, setCheckInDate] = useState(props.checkInDate);
    const [checkOutDate, setCheckOutDate] = useState(props.checkOutDate);
    const [minPrice, setMinPrice] = useState(props.minPrice);
    const [maxPrice, setMaxPrice] = useState(props.maxPrice);
    const [alertMessage, setAlertMessage] = useState("");




    const [minValue, set_minValue] = useState(25);
    const [maxValue, set_maxValue] = useState(75);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
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

    const guardSubmit = (event) => {
        event.preventDefault();

        setAlertMessage("");
        if (!verifyNumberOfRooms(numberOfRooms)) return;
        if (!verifyCheckInAndOutDate({ checkInDate, checkOutDate })) return;
        if (!verifyMinAndMaxPrice({ minPrice, maxPrice })) return;

        const formResults = {
            numberOfRooms,
            checkInDate,
            checkOutDate,
            minPrice,
            maxPrice,
        };
        setAlertMessage("Submission successful!");
        props.onSubmit(formResults);
        console.log("hi");
        console.log(formResults);

    }

    const typeGuard = (setter, tryFunc) => {
        try {
            const transformedValue = tryFunc();
            setter(transformedValue);
        } catch (e) {
            // Do nothing
        }
    }

    useEffect(() => {
        setNumberOfRooms(props.prior.numberOfRooms);
        setCheckInDate(props.prior.checkInDate);
        setCheckOutDate(props.prior.checkOutDate);
        setMinPrice(props.prior.minPrice);
        setMaxPrice(props.prior.maxPrice);
    }, []);

    const testButton = () => {
        console.log(numberOfRooms, minPrice, maxPrice, typeof minPrice);
    };

    return (
        <div>
            <form onSubmit={guardSubmit}>
                <div className="form-group">
                    <label htmlFor="numberOfRooms">Number of Rooms</label>
                    <input
                        type="number"
                        className="form-control"
                        id="numberOfRooms"
                        aria-describedby="emailHelp"
                        placeholder="Number of rooms/guests"
                        onChange={(event) => {
                            if (!isNaN(event.target.value))
                                setNumberOfRooms(parseInt(event.target.value));
                        }}
                        value={numberOfRooms}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkInDate">Check In Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkInDate"
                        placeholder=""
                        onChange={(event) => setCheckInDate(event.target.value)}
                        value={checkInDate}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkOutDate">Check Out Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkOutDate"
                        placeholder=""
                        onChange={(event) => setCheckOutDate(event.target.value)}
                        value={checkOutDate}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="minPrice">Min</label>
                    <input
                        type="number"
                        className="form-control"
                        id="minPrice"
                        placeholder=""
                        onChange={(event) => {
                            if (!isNaN(event.target.value))
                                setMinPrice(parseInt(event.target.value));
                        }}
                        value={minPrice}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maxPrice">Max</label>
                    <input
                        type="number"
                        className="form-control"
                        id="maxPrice"
                        placeholder=""
                        onChange={(event) => {
                            if (!isNaN(event.target.value))
                                setMaxPrice(parseInt(event.target.value));
                        }}
                        value={maxPrice}
                    />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <MultiRangeSlider
                min={0}
                max={100}
                step={1}
                ruler={false}
                label={true}
                preventWheel={false}
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e) => {
                    handleInput(e);
                    console.log(e);
                }}
            />
            <div className="alert alert-primary" role="alert">
                {alertMessage}
            </div>
            <button onClick={testButton}>Test FilterBar</button>
        </div>
    );
};

export default FilterBar;