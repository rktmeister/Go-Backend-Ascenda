import { useState } from "react";
import './../HotelRoomDetails.css';
import './HotelRoomInnerBox';
import HotelRoomInnerBox from "./HotelRoomInnerBox";

function HotelRoomBox(props) {

    const DEFAULT_ROOM_IMAGE_URL = "https://cdn-s3.kaligo.com/assets/images/hotels_missing_images/hotel-room.jpg";
    let roomImageURL;
    if (props.roomsSet[0].images && props.roomsSet[0].images.url) {
        roomImageURL = props.roomsSet[0].images.url;
    } else {
        roomImageURL = DEFAULT_ROOM_IMAGE_URL;
    }

    // = props.roomsSet[0].images !== undefined ? props.roomsSet[0].images[0].url : DEFAULT_ROOM_IMAGE_URL;

    // ============================= Setting up each room set of images (type choices) ========================== //

    const eachRoomImagesSet = props.roomsSet[0].images;
    const [imageIndex, setImageIndex] = useState(0);

    const wraparoundIncrementImageIndex = () => {
        if (imageIndex + 1 < eachRoomImagesSet.length) {
            setImageIndex(imageIndex + 1);
        } else {
            setImageIndex(0);
        }
    };

    const handleChooseRoom = (room) => {
        props.handleChooseRoom(room);
    }

    // ============================= Setting up each room set of images (type choices) ========================== //

    return (
        <div className="AllBoxes">
            <div className="HotelRoomBox">
                <div className="HotelRoomBoxTitle">
                    <span style={{ left: 30, position: "relative", top: 8, fontSize: 25 }}>
                        {props.roomsSet[0].roomNormalizedDescription /*props.roomsSet.roomNormalizedDescription*/}
                    </span>
                </div>   {/* LowerCaseChange(props.room.roomNormalizedDescription)}</span>*/}
                <br></br>
                <div style={{ width: "210px", height: "180px", marginLeft: "10px" }} >

                    {console.log(eachRoomImagesSet)}

                    {(eachRoomImagesSet !== null && eachRoomImagesSet[0] !== undefined) ?
                        (<div style={{marginLeft: "-5px", width: "450px", height:"350px", overflow:"hidden"}}>
                            <img key={eachRoomImagesSet[imageIndex].url}
                                src={eachRoomImagesSet[imageIndex].url}
                                alt=""

                                /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                                style={{ marginLeft: "20px", width: "80%", height: "80%", position: "relative" }}
                                onClick={wraparoundIncrementImageIndex}
                            />

                        </div>)
                        :
                        <img src={roomImageURL} alt="some room" style={{ marginLeft: "20px", width: "250px", height: "200px" }} />

                    }

                </div>

                <br></br>

                {props.roomsSet.map((room) => {
                    return (<HotelRoomInnerBox key={room.key} room={room} handleChooseRoom={handleChooseRoom} />)
                })}
            </div>
        </div>
    )

}

export default HotelRoomBox
