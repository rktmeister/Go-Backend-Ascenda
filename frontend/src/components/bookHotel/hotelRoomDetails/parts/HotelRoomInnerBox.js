import LowerCaseChange from "../_parts/LowerCaseChange.js";
import { useState } from "react";
import './../HotelRoomDetails.css';


function HotelRoomInnerBox(props) {

    const handleChooseRoom = () => {
        props.handleChooseRoom(props.room);
    }



    return (

        <div style={{float:"right", width:700, height:140, position:"relative", bottom:227, right:1, border:"1px solid rgb(180, 180, 180)"}}>
            <div> 
                <span style={{position:"relative", top:"1.5vh", left:"1vw", fontSize:"15pt", fontWeight:900 }}> 
                    {(props.room.roomAdditionalInfo.breakfast_info.includes("breakfast_included")) ?
                        "Breakfast Included" 
                        : 
                        "Room Only"} 
                </span> 
            </div>   {/* LowerCaseChange(props.room.roomNormalizedDescription)}</span>*/}
            <br></br>
            
            
            
            <br></br>
            
            {/*<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>*/}
            <span className="HotelRoomBoxRightPrice">SGD {props.room.price}</span>
            <button id = {props.room.key + "_CHOOSE"} 
            
            style={{
                
                float:"right", 
                left: 70, 
                bottom: 50, 
                height: "40px", 
                width: "100px",
                //background:"rgb(255, 140, 0)",
                background:"rgb(180, 180, 180)",
                //border:"solid 1px rgb(255,130,180)",
                border:"solid 1px rgb(200,200,200)",
                position:"relative",
                fontWeight:900,
                borderRadius:20,
                color: "white"}} onClick={handleChooseRoom}>Choose</button>

            <span className="HotelRoomBoxRightPerRoomPerNight">per room per night</span>
        

            {(props.room.free_cancellation === true) ?
                    (<span className="HotelRoomBoxLeftFreeCancellation">Free cancellation (except for service fee)</span>)
                    :
                    (<span className="HotelRoomBoxLeftNonRefundable">Non-refundable</span>)
            }

            
      
        

        </div>

    )

}

export default HotelRoomInnerBox
