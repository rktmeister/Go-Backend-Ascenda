import LowerCaseChange from "./LowerCaseChange.js";
import { useState } from "react";
import './../HotelRoomDetails.css';

function HotelRoomBox(props) {

    const [description, setDescription] = useState(props.description);
    const price = props.price;

    return (

        <div className="HotelRoomBox">
            <br></br>

            <span className="HotelRoomBoxLeft">{LowerCaseChange(description)}</span>
            {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>}
            <span className="HotelRoomBoxRight">${price}</span>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    )

}

export default HotelRoomBox
