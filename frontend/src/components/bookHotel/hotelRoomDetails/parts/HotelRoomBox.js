import LowerCaseChange from "./LowerCaseChange.js";
import { useState } from "react";
import './../HotelRoomDetails.css';

function HotelRoomBox(props) {

    const handleClick = () => {
        props.onClick(props.room);
    }

    return (

        <div className="HotelRoomBox">
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
