import { useEffect, useState } from "react";
import DoubleSlider from "./DoubleSlider";
import RemoveDescriptionDuplicate from "./RemoveDescriptionDuplicate.js";

const RoomFilters = (props) => {
    const [minPrice, setMinPrice] = useState(props.prior.minPrice);
    const [maxPrice, setMaxPrice] = useState(props.prior.maxPrice);
    const [chosenRoomType, setChosenRoomType] = useState("Choose Room Type");
    var roomDescriptionArray = Array();

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
    
    roomDescriptionArray.length = null;
    try{
        props.rooms.map((room) => {roomDescriptionArray.push(room.roomNormalizedDescription)})
        RemoveDescriptionDuplicate(roomDescriptionArray);
    }
    catch(e){
        console.log(e);
    }

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
                    {props.rooms ? roomDescriptionArray.map((roomDescription) => {
                        return <option key={roomDescription} value={roomDescription}> {roomDescription} </option>;
                    }) : <option value="Choose Room Type">Loading...</option>}
                </select>
            </span>

        </div>
    )
};

export default RoomFilters;