import LowerCaseChange from "./LowerCaseChange.js";
import { useState } from "react";
import './../HotelRoomDetails.css';

function HotelRoomBox(props) {

    const handleClick = () => {
        props.onClick(props.room);
    }

    const [roomImageURL, setRoomImageURL] = useState("https://cdn-s3.kaligo.com/assets/images/hotels_missing_images/hotel-room.jpg");

    if (props.roomImageURL !== undefined){
        setRoomImageURL(props.roomImageURL);
    }

    return (

        <div className="HotelRoomBox">
            <br></br>
            <img src = {roomImageURL} style = {{ marginLeft: "10px", width: "200px", height:"180px"}} />
            <br></br>
            <span className="HotelRoomBoxLeft">{LowerCaseChange(props.room.description)}</span>
            {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>}
            <span className="HotelRoomBoxRight">${props.room.price}</span>
            <button onClick={handleClick}>CHOOSE</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    )

}

export default HotelRoomBox
