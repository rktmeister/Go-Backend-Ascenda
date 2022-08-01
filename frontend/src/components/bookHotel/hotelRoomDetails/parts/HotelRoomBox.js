import LowerCaseChange from "./LowerCaseChange.js";
import { useState } from "react";
import './../HotelRoomDetails.css';
import './HotelRoomInnerBox';
import HotelRoomInnerBox from "./HotelRoomInnerBox";

function HotelRoomBox(props) {

    // const handleClick = () => {
    //     props.onClick(props.roomsSet);
    // }

    const [roomImageURL, setRoomImageURL] = useState("https://cdn-s3.kaligo.com/assets/images/hotels_missing_images/hotel-room.jpg");

    if (props.roomImageURL !== undefined){
        setRoomImageURL(props.roomImageURL);
    }

    // ============================= Setting up each room set of images (type choices) ========================== //

    let eachRoomImagesSet = props.roomsSet[0].images;
    let index = 0;



    // ============================= Setting up each room set of images (type choices) ========================== //

    return (
        <div className = "AllBoxes">
            <div className="HotelRoomBox">
                <div className="HotelRoomBoxTitle"> 
                    <span style={{left:30, position:"relative", top:8, fontSize:25 }}> 
                        {props.roomsSet[0].roomNormalizedDescription /*props.roomsSet.roomNormalizedDescription*/} 
                    </span> 
                </div>   {/* LowerCaseChange(props.room.roomNormalizedDescription)}</span>*/}
                <br></br>
                
                <div style={{width: "210px", height:"180px", marginLeft: "10px"}} >

                {console.log(eachRoomImagesSet)}
                
                {(eachRoomImagesSet != null && eachRoomImagesSet[0] !== undefined) ?
                        (<div style={{marginLeft: "20px", width: "250px", height:"200px", overflow:"hidden"}}>
                            <img key = {eachRoomImagesSet[0].url} 
                                src = {eachRoomImagesSet[0].url}
                                alt = ""
                                /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                                style={{marginLeft:"20px", width: "80%", height:"80%", position:"relative"}} 
                                onClick={()=>{(index + 1 < props.room.images.length) ? (index = index+1) : (index = 0); console.log(index)}}
                                />

                        </div>)
                        :
                        <img src = {roomImageURL} style = {{marginLeft:"20px", width: "250px", height:"200px"}} />
                        
                }

                </div>
                
                <br></br>

                {props.roomsSet.map( (room) => {
                                            console.log("room is: ", room); 
                                            return(<HotelRoomInnerBox key={room.key} room = {room} onClick={props.onClick} />)}) }
                
                {/* <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span> */}
                {/*<span className="HotelRoomBoxRightPrice">SGD {props.room.price}</span>
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
                } */}

                
               
            

            </div>
        </div>
    )

}

export default HotelRoomBox
