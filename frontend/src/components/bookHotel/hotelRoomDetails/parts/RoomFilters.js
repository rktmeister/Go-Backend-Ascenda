import { useEffect, useState } from "react";
import DoubleSlider from "./DoubleSlider";

const RoomFilters = (props) => {
    const [minPrice, setMinPrice] = useState(props.prior.minPrice);
    const [maxPrice, setMaxPrice] = useState(props.prior.maxPrice);
    const [chosenRoomType, setChosenRoomType] = useState("Choose Room Type");

    const handleSubmit = () => {
        // TODO: guards
        props.onSubmit({
            minPrice,
            maxPrice,
            chosenRoomType,
        });
    };

    useEffect(() => {
        handleSubmit();
    }, [minPrice, maxPrice, chosenRoomType])

    return (
        <div className="FilterBox">
            <button onClick={() => console.log(props.rooms)}>rooms</button>
            <br></br>
            <DoubleSlider
                lowerLimit={0}
                upperLimit={10000}
                lowerSliderValue={minPrice}
                upperSliderValue={maxPrice}
                setLowerSliderValue={setMinPrice}
                setUpperSliderValue={setMaxPrice}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <span>
                <select value={chosenRoomType} className="DescriptionDropdown" onChange={(e) => { setChosenRoomType(e.target.value); }}>
                    <option value="Choose Room Type">Choose Room Type</option>
                    {props.rooms ? props.rooms.map((room) => {
                        return <option key={room.key} value={room.roomNormalizedDescription}> {room.roomNormalizedDescription} </option>;
                    }) : <option value="Choose Room Type">Loading...</option>}
                </select>
            </span>

        </div>
    )
};

export default RoomFilters;