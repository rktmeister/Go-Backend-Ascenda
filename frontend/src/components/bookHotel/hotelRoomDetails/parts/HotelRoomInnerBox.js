import LowerCaseChange from "../_parts/LowerCaseChange.js";
import { useState } from "react";
import './../HotelRoomDetails.css';


function HotelRoomInnerBox(props) {

    const handleChooseRoom = () => {
        props.handleChooseRoom(props.room);
    }



    return (

        <div data-testid = {props.description + "_HotelRoomInnerBox"} style={{float:"right", width:700, position:"relative", bottom:227, right:1, border:"1px solid rgb(180, 180, 180)"}}>
            <div> 
                <span data-testid = {props.description + "_roomAdditionalInfo.breakfast_info"} style={{position:"relative", top:"1.5vh", left:"1vw", fontSize:"15pt", fontWeight:900 }}> 
                    {(props.room.roomAdditionalInfo.breakfast_info.includes("breakfast_included")) ?
                        "Breakfast Included" 
                        : 
                        "Room Only"} 
                </span> 
            </div>   {/* LowerCaseChange(props.room.roomNormalizedDescription)}</span>*/}
            <br></br>
            
            
            
            <br></br>
            
            {/*<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>*/}
            <span data-testid = {props.description + "_" + props.room.price} className="HotelRoomBoxRightPrice">SGD {props.room.price}</span>
            <button data-testid = {props.description + "_SELECT"} id = {props.room.key + "_SELECT"} 
            
            style={{
                
                float:"right", 
                left: 95, 
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
                color: "white"}} 
            onClick={handleChooseRoom} 
            selected = {false}
            onMouseOver={(e)=>{
                e.target.style.backgroundColor = "rgb(255, 140, 0)"; 
                console.log(e.target.id)}}
            onMouseLeave = {(e)=>{
                if(e.target.selected === false){
                    e.target.style.backgroundColor = "rgb(180, 180, 180)"; 
                }
                else{
                    e.target.style.backgroundColor = "rgb(255, 140, 0)"; 
                }
                console.log(e.target.id)}}
                >Select</button>

            <span data-testid = {props.description + "_perRoomPerNight"} className="HotelRoomBoxRightPerRoomPerNight">per room per night</span>
        

            {(props.room.free_cancellation === true) ?
                    (<span data-testid = {props.description + "_free_cancellation_" + props.room.free_cancellation} className="HotelRoomBoxLeftFreeCancellation">Free cancellation (except for service fee)</span>)
                    :
                    (<span data-testid = {props.description + "_free_cancellation_" + props.room.free_cancellation} className="HotelRoomBoxLeftNonRefundable">Non-refundable</span>)
            }

            
      
        

        </div>

    )

}

export default HotelRoomInnerBox
