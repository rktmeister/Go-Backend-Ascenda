import LowerCaseChange from "./LowerCaseChange.js";
import { useState } from "react";
import './../HotelRoomDetails.css';

<<<<<<< HEAD
    return (
        <div className="HotelRoomBox">
            <br></br>
            <span className="HotelRoomBoxLeft">{props.room.description}</span>
            {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>}
            <span className="HotelRoomBoxRight">{props.room.price}</span>
            <button onClick={() => props.onClick(props.room)}>Choose</button>
=======
function HotelRoomBox(props){

    const [description, setDescription] = useState(props.description);
    const price = props.price;

    return(
    
        <div className = "HotelRoomBox">
>>>>>>> master
            <br></br>
            
            <span className = "HotelRoomBoxLeft">{LowerCaseChange(description)}</span>
            {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>} 
            <span className = "HotelRoomBoxRight">${price}</span>
            <br></br>
            <br></br>
            <br></br>
<<<<<<< HEAD
=======
            <br></br>
        
>>>>>>> master
        </div>
    )
  
}

export default HotelRoomBox
