import { useEffect, useState } from "react";
import DoubleSlider from "./DoubleSlider";

const RoomFilters = (props) => {
    const defaultString = "Choose Room Type"
    const [minPrice, setMinPrice] = useState(props.prior.minPrice);
    const [maxPrice, setMaxPrice] = useState(props.prior.maxPrice);
    const [chosenRoomType, setChosenRoomType] = useState(defaultString);

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
                <select id="roomTypeDropdown" value={chosenRoomType} className="DescriptionDropdown" onChange={(e) => { setChosenRoomType(e.target.value); }}>
                    <option value={defaultString}>Choose Room Type</option>
                    {props.rooms ? [...new Map(props.rooms.map(room =>[room.roomNormalizedDescription, room])).values()]
                        .map((room) => {
                            return <option id={room.roomNormalizedDescription} key={room.key} value={room.roomNormalizedDescription}> {room.roomNormalizedDescription} </option>;
                        }) : <option id={defaultString} value={defaultString}>Loading...</option>}
                </select>
            </span>

        </div>
    )
};

export default RoomFilters;