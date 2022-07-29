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

    // ============================= Setting up each room set of images (type choices) ========================== //

    let eachRoomImagesSet = props.room.images;
    let index = 0;



    // ============================= Setting up each room set of images (type choices) ========================== //

    return (

        <div className="HotelRoomBox">
            <div className="HotelRoomBoxTitle"> <span style={{marginLeft:"10pt", marginTop:"20pt", marginBottom:"20pt" }}> {props.index}. {props.room.roomNormalizedDescription} </span> </div>   {/* LowerCaseChange(props.room.roomNormalizedDescription)}</span>*/}
            <br></br>
            
            <div style={{width: "210px", height:"180px", marginLeft: "10px"}} >
                
            
            {(eachRoomImagesSet != null) ?
                    (<div style={{marginLeft: "10px", width: "210px", height:"180px", overflow:"hidden"}}>
                        <img key = {eachRoomImagesSet[index].url} 
                            src = {eachRoomImagesSet[index].url}
                            alt = ""
                            /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                            style={{width: "80%", height:"80%", position:"relative"}} />

                    </div>)
                    :
                    <img src = {roomImageURL} style = {{ width: "210px", height:"180px"}} />
                    
            }

            </div>
            
            <br></br>
            
            {/*<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>*/}
            <span className="HotelRoomBoxRightPrice">SGD {props.room.price}</span>
            <button style={{
                float:"right", 
                marginRight: "10pt", 
                marginTop: "-110pt", 
                height: "40px", 
                width: "100px",
                background:"transparent",
                border:"solid 1px rgb(255,130,180)",
                color: "rgb(205,80,130)"}} onClick={handleClick}>Choose</button>

            <span className="HotelRoomBoxRightPerRoomPerNight">per room per night</span>
           

            {(props.room.free_cancellation === true) ?
                    (<span className="HotelRoomBoxLeftFreeCancellation">Free cancellation (except for service fee)</span>)
                    :
                    (<span className="HotelRoomBoxLeftNonRefundable">Non-refundable</span>)
            }

            
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    )

}

export default HotelRoomBox
