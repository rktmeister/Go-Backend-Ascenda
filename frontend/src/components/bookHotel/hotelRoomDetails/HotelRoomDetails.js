import './HotelRoomDetails.css';
import React, { useState, useEffect } from "react";

import LowerCaseChange from "./parts/LowerCaseChange.js";
import RemoveDescriptionDuplicate from "./parts/RemoveDescriptionDuplicate.js";

import MapGenerator from './parts/MapGenerator';

import ShowRoomsOutput from './parts/ShowRoomsOutput';

import { FaStar } from 'react-icons/fa';

import { getHotelRoomBatch } from './../../../utils/backendAPI.js';
import { useNavigate } from 'react-router-dom';
function HotelRoomDetails(props) {
  const nav = useNavigate();
  const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

  const maxSlider = 2000; // gotHandMeDowns.filterData.maxPrice * 1000);
  const minSlider = 60;


  const [minPrice, setMinPrice] = useState(gotHandMeDowns.filterData.minPrice); //gotHandMeDowns.filterData.minPrice);
  const [maxPrice, setMaxPrice] = useState(gotHandMeDowns.filterData.maxPrice * 10); // gotHandMeDowns.filterData.maxPrice * 10);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chosenRoom, setChosenRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [description, setDescription] = useState("Choose Room Type");
  const [sliderValueMax, setSliderValueMax] = useState(maxSlider);
  const [sliderValueMin, setSliderValueMin] = useState(minSlider);
  const [enlargingImageWordsHovering, setEnlargingImageWordsHovering] = useState("HotelPicsEnlargingWordsNoHover")
  const [enlargedCloseHovering, setEnlargingCloseHovering] = useState("HotelPicsEnlargedCloseNoHover")
  const [enlargedImagesMode, setEnlargedImagesMode] = useState("none");
  const [hotelPicLeftHandle, setHotelPicLeftHandle] = useState("HotelPicsLeftHandleNoHover");
  const [hotelPicRightHandle, setHotelPicRightHandle] = useState("HotelPicsRightHandleNoHover");


  const [currentIndex, setCurrentIndex] = useState(0); // This is for overall hotel imagaes

  const decreaseCurrentIndex = () => {
    console.log("Decrease " + currentIndex);
    setCurrentIndex(Math.max(0, currentIndex - 1));
  }

  const increaseCurrentIndex = () => {
    console.log("Increase " + currentIndex);
    setCurrentIndex(Math.min(gotHandMeDowns.hotel.numberOfImages - 1, currentIndex + 1));
  }

  // if chosen hotel changes, load rooms from it
  useEffect(() => {
    (async () => {
      const res = await props.backendPackage.getHotelRoomBatch(
        gotHandMeDowns.hotel.uid,
        gotHandMeDowns.destination.uid,
        gotHandMeDowns.filterData.checkInDate,
        gotHandMeDowns.filterData.checkOutDate,
        gotHandMeDowns.filterData.numberOfRooms,
        nav
      );
      if (!res.error) {
        setRooms(res);
      }
    })();
  }, [gotHandMeDowns.hotel]);

  const handleChooseRoom = (room) => {
    let buttonToColor = document.getElementById(room.key + "_CHOOSE");
    buttonToColor.style.color = "rgb(255, 140, 0)";
    console.log("ROOM CHOSEN:", room);
    setChosenRoom(room);
  };

  const getCurrentImageURL = () => {
    return `${gotHandMeDowns.hotel.cloudflareImageURL}/${gotHandMeDowns.hotel.uid}/i${currentIndex}${gotHandMeDowns.hotel.suffix}`
  }


  const finishStage = () => {
    const dataToBePassedOn = {
      ...gotHandMeDowns,
      room: chosenRoom,
    };
    props.handMeDowns.push(dataToBePassedOn);
    props.finishStage(props.handMeDowns);
  };

  if (error) {
    console.log("Error: ", error.message);
  }


  else if (isLoaded) {

  }

  return (
    <div className="HotelRoomDetails">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="FilterBox">
        <br></br>
        <div style={{ position: "relative", left: 20, top: 10 }}>
          <input
            type="range"
            className="SliderMax"
            min={minSlider}
            max={maxSlider}
            value={sliderValueMax}
            onMouseOver={(e) => { e.target.valueAsNumber() }}
            onChange={(e) => {
              if (e.target.valueAsNumber < sliderValueMin + ((sliderValueMax - sliderValueMin) / 2)) {
                if (e.target.valueAsNumber <= sliderValueMax) {
                  setSliderValueMin(e.target.valueAsNumber);
                  setMinPrice(parseInt(e.target.value));

                  console.log(minPrice, " ", maxPrice);
                }
              }
              else {
                if (e.target.valueAsNumber >= sliderValueMin) {
                  setSliderValueMax(e.target.valueAsNumber);
                  setMaxPrice(parseInt(e.target.value));
                  console.log(minPrice, " ", maxPrice);
                }
              }
            }}
            id="myRange"
          />
          <span style={{ position: "relative", left: 140, bottom: -3 }}> ${sliderValueMax} </span>
          <input
            type="range"
            className="SliderMin"
            min={minSlider}
            max={maxSlider}
            value={sliderValueMin}
            onChange={(e) => {
              if (e.target.valueAsNumber < sliderValueMin + ((sliderValueMax - sliderValueMin) / 2)) {
                if (e.target.valueAsNumber <= sliderValueMax) {
                  setSliderValueMin(e.target.valueAsNumber);
                  setMinPrice(parseInt(e.target.value));

                  console.log(minPrice, " ", maxPrice);
                }
              }
              else {
                if (e.target.valueAsNumber >= sliderValueMin) {
                  setSliderValueMax(e.target.valueAsNumber);
                  setMaxPrice(parseInt(e.target.value));
                  console.log(minPrice, " ", maxPrice);
                }
              }

            }}
            id="myRange"
          />
          <span style={{ position: "relative", right: 570, bottom: -4 }}> ${sliderValueMin} </span>
        </div>

        <span>
          <select value={description} className="DescriptionDropdown" onChange={(e) => { setDescription(e.target.value); }}>
            <option value="Choose Room Type">Choose Room Type</option>
            {rooms.map((room) => <option key={room.key} value={room}> {room.roomNormalizedDescription} </option>)}
          </select>
        </span>

      </div>

      <br></br>
      <br></br>

      {/* ======================== Top Part (images and Title) ================== */}
      <div className="AllBoxes">
        <div className="HotelPicTitlePartDiv">
          <div style={{
            width: "450px",
            height: "350px",
            left: 110,
            border: "1px solid rgb(180,180,180)",
            zIndex: 0,

            position: "relative"
          }}>


            <div style={{ width: "450px", height: "350px", overflow: "hidden" }}>
              <img key={gotHandMeDowns.hotel.uid}
                src={gotHandMeDowns.hotel.defaultImageURL}
                alt="some hotel lol"
                /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                style={{ background: "rgb(40,40,40)", width: "150%", height: "150%", top: "-20%", left: "-20%", position: "relative", zIndex: 0 }} />
            </div>

            <span className="HotelPicsNumbering">{currentIndex} / {gotHandMeDowns.hotel.numberOfImages}</span>

            <span
              className={enlargingImageWordsHovering}
              onMouseOver={() => { setEnlargingImageWordsHovering("HotelPicsEnlargingWordsHover") }}
              onMouseLeave={() => { setEnlargingImageWordsHovering("HotelPicsEnlargingWordsNoHover") }}
              onClick={() => { console.log(enlargingImageWordsHovering); setEnlargedImagesMode("flex") }}>Click here to enlarge image</span>



            <div style={{ display: "flex", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", position: "relative", top: "-210px" }}>
              <button
                key="decreasePicIndx"
                className={hotelPicLeftHandle}
                onClick={() => { decreaseCurrentIndex() }}
                // Reference: https://stackoverflow.com/questions/29981236/how-do-you-hover-in-reactjs-onmouseleave-not-registered-during-fast-hover-ove
                onMouseOver={() => { setHotelPicLeftHandle("HotelPicsLeftHandleHover") }}
                onMouseOut={() => { setHotelPicLeftHandle("HotelPicsLeftHandleNoHover") }}
              >
                ◀{/*&lt;*/}
              </button>

              <button
                key="increasePicIndx"
                className={hotelPicRightHandle}
                onClick={() => { increaseCurrentIndex() }}
                onMouseOver={() => { setHotelPicRightHandle("HotelPicsRightHandleHover") }}
                onMouseOut={() => { setHotelPicRightHandle("HotelPicsRightHandleNoHover") }}
              >
                ▶{/*&gt;*/}
              </button>
            </div>
            <div style={{ position: "inherit" }}>
              <h1 className="HotelName">
                {gotHandMeDowns.hotel.term}
              </h1>
              <p className="HotelAddress">
                {gotHandMeDowns.hotel.address}
              </p>
              <span className="HotelRatings">
                {[...Array(gotHandMeDowns.hotel.rating)].map(() => {
                  return (

                    <span style={{ color: "#FFAE42", fontSize: "15pt" }}>★</span>

                  )
                })}

                {[...Array(5 - gotHandMeDowns.hotel.rating)].map(() => {
                  return (
                    <span style={{ color: "rgb(180,180,180)", fontSize: "15pt" }}>★</span>
                  )
                })}
              </span>

            </div>

          </div>




        </div>
      </div>

      {/* ======================== Top Part (images and Title) ================== */}


      <br></br>


      {/* =================== HOTEL DESCRIPTION OUTPUT DISPLAY ====================== */}

      <div className="AllBoxes">
        <div style={{ position: "relative", top: 20, left: 20, paddingBottom: 20, fontSize: 25, fontWeight: "bold" }}>Hotel overview</div>

        <div style={{ flexWrap: 'wrap', flex: 1, marginLeft: 20, marginTop: 10, flexDirection: "column" }}>
          <div dangerouslySetInnerHTML={{ __html: gotHandMeDowns.hotel.description }} style={{ whiteSpace: "pre-line", flexShrink: 1, position: "static" }} />
        </div>
      </div>


      {/* =================== HOTEL DESCRIPTION OUTPUT DISPLAY ====================== */}



      {/* ====================== NEXT button========================= */}
      <button style={{
        background: "rgb(255, 140, 0)",
        fontSize: 30,
        color: "white",
        borderRadius: 30,
        fontWeight: 900,
        width: 100,
        height: 70,
        textAlign: "center",
        position: "fixed",
        top: 700,
        left: 1750,
        zIndex: 20,
        border: "transparent"
      }}
        onClick={finishStage}> ▶▶</button>
      {/* ====================== NEXT button========================= */}


      {/* =================== ROOMS OUTPUT DISPLAY ====================== */}
      <div style={{ marginTop: 100 }}>
        <div style={{ border: "0.5px solid rgb(240,240,240)" }}>
          {(error) ?
            (<div className="AllBoxes" /*style={{textAlign: "center", fontSize:"10px"}}*/> <div style={{ textAlign: "center", height: 100 }}>{console.log("Error: ", error.message)}<br></br> <h1>No Rooms Available</h1></div></div>)

            : (!isLoaded) ?
              (<div className="AllBoxes" /*style={{textAlign: "center", fontSize:"10px"}}*/> <div style={{ textAlign: "center", height: 100 }}><br></br> <h1>Fetching Room...</h1></div></div>)

              : (<div>
                {console.log("Rooms: ", rooms)}
                {ShowRoomsOutput(rooms, minPrice, maxPrice, description)}
              </div>)
          }
        </div>
      </div>


      {/* =================== ROOMS OUTPUT DISPLAY ====================== */}




      {/* =================== MAP OUTPUT DISPLAY ====================== */}
      <div className="AllBoxes">
        <div style={{ fontSize: "25px", left: "20pt", top: "20pt", paddingBottom: 20, position: "relative", fontWeight: 900 }}>Hotel Location</div>
        <div className="MapGeneratorDiv"> <MapGenerator latitude={gotHandMeDowns.hotel.latitude} longitude={gotHandMeDowns.hotel.longitude} /></div>
      </div>

      {/* =================== MAP OUTPUT DISPLAY ====================== */}





      {/* ====================== Hotel Room Pic ENLARGE ========================= */}

      <div style={{ zIndex: 0, position: "fixed", display: enlargedImagesMode, justifyContent: "center", alignItems: "center", top: 0, height: window.innerHeight, width: window.innerWidth }}>

        <div style={{
          width: "1000px",
          height: "700px",
          border: "1px solid black",
          position: "relative",
          zIndex: 10
        }}>


          <div style={{ width: "1000px", height: "700px", overflow: "hidden", alignSelf: "center", position: "relative", display: "flex", justifyContent: "space-evenly" }}>
            <img key={getCurrentImageURL()} // may not re-render on index (state) change
              src={getCurrentImageURL()}
              alt="some hotel from another angle lol"
              /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
              style={{ background: "rgb(40,40,40)", width: "100%", height: "100%", alignSelf: "center", position: "relative" }} />

          </div>

          <div className="HotelPicsNumbering">{currentIndex} / {gotHandMeDowns.hotel.numberOfImages}</div>

          <div
            className={enlargedCloseHovering}
            onMouseOver={() => { setEnlargingCloseHovering("HotelPicsEnlargedCloseHover") }}
            onMouseLeave={() => { setEnlargingCloseHovering("HotelPicsEnlargedCloseNoHover") }}
            onClick={() => { setEnlargedImagesMode("none") }}
          >
            X Close
          </div>



          <div style={{ display: "flex", alignSelf: "center", justifyContent: "space-between", position: "relative", top: "-400px" }}>
            <button
              key="decreasePicIndx"
              className={hotelPicLeftHandle}
              onClick={() => { decreaseCurrentIndex() }}
              // Reference: https://stackoverflow.com/questions/29981236/how-do-you-hover-in-reactjs-onmouseleave-not-registered-during-fast-hover-ove
              onMouseOver={() => { setHotelPicLeftHandle("HotelPicsLeftHandleHover") }}
              onMouseOut={() => { setHotelPicLeftHandle("HotelPicsLeftHandleNoHover") }}
            >
              ◀{/*&lt;*/}
            </button>

            <button
              key="increasePicIndx"
              className={hotelPicRightHandle}
              onClick={() => { increaseCurrentIndex() }}
              onMouseOver={() => { setHotelPicRightHandle("HotelPicsRightHandleHover") }}
              onMouseOut={() => { setHotelPicRightHandle("HotelPicsRightHandleNoHover") }}
            >
              ▶{/*&gt;*/}
            </button>
          </div>

        </div>
        <div
          style={{ background: "black", opacity: "90%", width: window.innerWidth, height: window.innerHeight, position: "absolute", zIndex: 1 }}
          onClick={() => { console.log(enlargedImagesMode); setEnlargedImagesMode("none"); console.log(enlargedImagesMode) }}
        ></div>
      </div>



    </div>
  );
}


export default HotelRoomDetails;










