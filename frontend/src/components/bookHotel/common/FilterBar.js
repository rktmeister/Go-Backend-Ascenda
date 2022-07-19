import { useState } from "react";

const FilterBar = (props) => {
    const [numberOfRooms, _setNumberOfRooms] = useState(props.numberOfRooms);
    const [datesOfTravel, _setDatesOfTravel] = useState(props.datesOfTravel);
    const [minPrice, _setMinPrice] = useState(props.minPrice);
    const [maxPrice, _setMaxPrice] = useState(props.maxPrice);
    const [alertMessage, setAlertMessage] = useState("");

    const formDataSetterWrapper = (setter) => (event) => setter(event.target.value);
    const setNumberOfRooms = formDataSetterWrapper(_setNumberOfRooms);
    const setDatesOfTravel = formDataSetterWrapper(_setDatesOfTravel);
    const setMinPrice = formDataSetterWrapper(_setMinPrice);
    const setMaxPrice = formDataSetterWrapper(_setMaxPrice);

    const guardSubmit = (event) => {
        event.preventDefault();

        setAlertMessage("");
        if (numberOfRooms === undefined) {
            setAlertMessage("nor");
            return;
        }
        if (datesOfTravel === undefined) {
            setAlertMessage("dot");
            return;
        }
        if (minPrice === undefined) {
            setAlertMessage("min");
            return;
        }
        if (maxPrice === undefined) {
            setAlertMessage("max");
            return;
        }

        const formResults = {
            numberOfRooms,
            datesOfTravel,
            minPrice,
            maxPrice,
        };
        props.onSubmit(formResults);
        console.log("hi");
        console.log(formResults);

    }

    const testButton = () => {
        console.log(numberOfRooms, minPrice, maxPrice);
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
                        placeholder="Enter email"
                        onChange={setNumberOfRooms}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="datesOfTravel">Dates of Travel</label>
                    <input
                        type="date"
                        className="form-control"
                        id="datesOfTravel"
                        placeholder="Password"
                        onChange={setDatesOfTravel}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="minPrice">Min</label>
                    <input
                        type="number"
                        className="form-control"
                        id="minPrice"
                        placeholder=""
                        onChange={setMinPrice}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maxPrice">Max</label>
                    <input
                        type="number"
                        className="form-control"
                        id="maxPrice"
                        placeholder=""
                        onChange={setMaxPrice}
                    />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <div className="alert alert-primary" role="alert">
                {alertMessage}
            </div>
            <button onClick={testButton}></button>
        </div>
    );
};

export default FilterBar;