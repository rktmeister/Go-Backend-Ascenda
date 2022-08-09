import './HotelRoomDetails.css';
import React, { useState, useEffect } from "react";

import LowerCaseChange from "./_parts/LowerCaseChange.js";


import MapGenerator from './parts/MapGenerator';


import { useNavigate } from 'react-router-dom';
import DoubleSlider from './parts/DoubleSlider';
import StarRating from '../common/StarRating';
import RoomFilters from './parts/RoomFilters';
import ListOfRoomTypes from './parts/ListOfRoomTypes';
function HotelRoomDetails(props) {
  const nav = useNavigate();
  const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

  console.log("gotHandMeDowns: ", gotHandMeDowns)

  const maxPriceLimit = 10000; // gotHandMeDowns.filterData.maxPrice * 1000);
  const minPriceLimit = 0;


  const [minPrice, setMinPrice] = useState(gotHandMeDowns.filterData.minPrice); //gotHandMeDowns.filterData.minPrice);
  const [maxPrice, setMaxPrice] = useState(gotHandMeDowns.filterData.maxPrice); // gotHandMeDowns.filterData.maxPrice * 10);

  const [error, setError] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const [prevChosenRoom, setPrevChosenRoom] = useState(null);
  const [chosenRoom, setChosenRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [description, setDescription] = useState("Choose Room Type");

  // const [maxPrice, setMaxPrice] = useState(maxPriceLimit);
  // const [minPrice, setMinPrice] = useState(minPriceLimit);

  const [enlargingImageWordsHovering, setEnlargingImageWordsHovering] = useState("HotelPicsEnlargingWordsNoHover")
  const [enlargedCloseHovering, setEnlargingCloseHovering] = useState("HotelPicsEnlargedCloseNoHover")
  const [enlargedImagesMode, setEnlargedImagesMode] = useState("none");
  const [hotelPicLeftHandle, setHotelPicLeftHandle] = useState("HotelPicsLeftHandleNoHover");
  const [hotelPicRightHandle, setHotelPicRightHandle] = useState("HotelPicsRightHandleNoHover");

  const [filters, setFilters] = useState([]);
  const [hideFilters, setHideFilters] = useState("none");

  const [amenitiesRatings, setAmenitiesRatings] = useState({});

  const [currentIndex, setCurrentIndex] = useState(1); // This is for overall hotel imagaes


  const decreaseCurrentIndex = () => {
    console.log("Decrease " + currentIndex);
    if (currentIndex - 1 < 1) {
      setCurrentIndex(gotHandMeDowns.hotel.numberOfImages);
    }
    else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const increaseCurrentIndex = () => {
    console.log("Increase " + currentIndex);
    if (currentIndex + 1 > gotHandMeDowns.hotel.numberOfImages) {
      setCurrentIndex(1);
    }
    else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  // if chosen hotel changes, load rooms from it
  useEffect(() => {

    if (props.test !== undefined) {
      setRooms(props.backendPackage)
      console.log("tested");
    }
    else {
      (async () => {
        console.log("backend called");
        const res = await props.backendPackage.getHotelRoomBatch(
          gotHandMeDowns.hotel.uid,
          gotHandMeDowns.destination.uid,
          gotHandMeDowns.filterData.checkInDate,
          gotHandMeDowns.filterData.checkOutDate,
          gotHandMeDowns.filterData.numberOfRooms,
          nav
        );
        if (!res.error) {
          console.log("no errors here");
          setRooms(res);
        }
      })();
    }

  }, [gotHandMeDowns.hotel]);

  const handleChooseRoom = (room) => {
    let buttonToColor = document.getElementById(room.key + "_SELECT");
    console.log(buttonToColor);
    // console.log(buttonToColor.style.backgroundColor)
    buttonToColor.style.background = "rgb(255, 140, 0)";
    buttonToColor.selected = true;

    console.log("ROOM CHOSEN:", room);
    setChosenRoom(room);


    console.log("prevChosenRoom : ", prevChosenRoom)
    if (prevChosenRoom === null) {
      setPrevChosenRoom(room)
    }

    else if (prevChosenRoom !== room) {
      console.log("prevChosenRoom : ", prevChosenRoom)
      let prevButtonToUncolor = document.getElementById(prevChosenRoom.key + "_SELECT");
      prevButtonToUncolor.selected = false;
      prevButtonToUncolor.style.background = "rgb(180, 180, 180)";

      setPrevChosenRoom(room);

    }
  };

  const getCurrentImageURL = () => {
    return `${gotHandMeDowns.hotel.cloudflareImageURL}/${gotHandMeDowns.hotel.uid}/i${currentIndex}${gotHandMeDowns.hotel.suffix}`
  }

  useEffect(() => {
    if (rooms.length > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }

    if (props.test !== undefined) {
      setIsLoaded(true);
    }
  }, [rooms]);

  const handleFilterChange = (filterValues) => {
    const newFilters = [
      ({ price }) => filterValues.minPrice <= price && price <= filterValues.maxPrice,
      ({ roomNormalizedDescription }) => {
        if (filterValues.chosenRoomType === "Choose Room Type") {
          return true;
        } else {
          return roomNormalizedDescription === filterValues.chosenRoomType;
        }
      },
    ];
    if (prevChosenRoom !== null) {
      let prevButtonToUncolor = document.getElementById(prevChosenRoom.key + "_CHOOSE");
      prevButtonToUncolor.selected = false;
      prevButtonToUncolor.style.background = "rgb(180, 180, 180)";
      setPrevChosenRoom(null);
    }

    setFilters(newFilters);
  };


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

  console.log("gotHandMeDowns:  ", gotHandMeDowns)

  return (
    <div className="HotelRoomDetails">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <RoomFilters
        prior={{
          minPrice: gotHandMeDowns.filterData.minPrice,
          maxPrice: gotHandMeDowns.filterData.maxPrice,
        }}
        onSubmit={handleFilterChange}
        rooms={rooms}
        hidden={hideFilters}
      />

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
                src={getCurrentImageURL()}
                alt="some hotel lol"
                /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                style={{ background: "rgb(40,40,40)", width: "150%", height: "150%", top: "-20%", left: "-20%", position: "relative", zIndex: 0 }} />
            </div>

            <span className="HotelPicsNumbering">{currentIndex} / {gotHandMeDowns.hotel.numberOfImages}</span>

            <span
              className={enlargingImageWordsHovering}
              onMouseOver={() => { setEnlargingImageWordsHovering("HotelPicsEnlargingWordsHover") }}
              onMouseLeave={() => { setEnlargingImageWordsHovering("HotelPicsEnlargingWordsNoHover") }}
              onClick={() => { console.log(enlargingImageWordsHovering); setEnlargedImagesMode("flex"); setHideFilters("hidden"); }}>Click here to enlarge image</span>



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
              <StarRating
                hotelName={gotHandMeDowns.hotel.term}
                totalPossibleStars={5}
                rating={gotHandMeDowns.hotel.rating}
              />
            </div>

          </div>




        </div>
      </div>

      {/* ======================== Top Part (images and Title) ================== */}


      <br></br>


      {/* =================== HOTEL DESCRIPTION OUTPUT DISPLAY ====================== */}

      <div className="AllBoxes">
        <div style={{ position: "relative", top: 20, left: 20, paddingBottom: 20, fontSize: 25, fontWeight: "bold" }}>Hotel overview</div>

        <div style={{ flexWrap: 'wrap', flex: 1, marginLeft: 20, marginRight: 20, marginTop: 10, flexDirection: "column" }}>
          <div dangerouslySetInnerHTML={{ __html: gotHandMeDowns.hotel.description }} style={{ whiteSpace: "pre-line", flexShrink: 1, position: "relative" }} />
        </div>
      </div>


      {/* =================== HOTEL DESCRIPTION OUTPUT DISPLAY ====================== */}

      {/* =================== MAP OUTPUT DISPLAY ======================map */}
      {/* <div className="AllBoxes">
        <div style={{ fontSize: "25px", left: "20pt", top: "20pt", paddingBottom: 20, position: "relative", fontWeight: 900 }}>Hotel Location</div>
        <div className="MapGeneratorDiv"> <MapGenerator latitude={gotHandMeDowns.hotel.latitude} longitude={gotHandMeDowns.hotel.longitude} /></div>
      </div> */}
      <div className="AllBoxes">
        <div style={{ fontSize: "25px", position: "relative", fontWeight: 900 }}>Hotel Location</div>
        <div > <MapGenerator latitude={gotHandMeDowns.hotel.latitude} longitude={gotHandMeDowns.hotel.longitude} /></div>
      </div>
      {/* =================== MAP OUTPUT DISPLAY ====================== */}



      {/* =================== AMENITIES RATINGS OUTPUT DISPLAY ====================== */}
      {/* <div className="AllBoxes">
        {(gotHandMeDowns.hotel.amenities_ratings !== null) ?
          gotHandMeDowns.hotel.amenities_ratings.map((amenitiesWithRatings) => {
            <div>
              <span>{amenitiesWithRatings.name}</span>
              <input type="range" min={0} max={100} value={amenitiesWithRatings.score}></input>
              <br></br>
            </div>
          })
          :
          null
        }
      </div> */}


      {/* =================== AMENITIES RATINGS OUTPUT DISPLAY ====================== */}





      {/* =================== AMENITIES RATINGS OUTPUT DISPLAY ====================== */}
      {/* <div className="AllBoxes">
        {gotHandMeDowns.hotel.amenities_ratings.map( (amenitiesWithRatings) => {
          <div>
            <span>{amenitiesWithRatings.name}</span> 
            <input type="range" value={amenitiesWithRatings.score}></input>
            <br></br>
          </div>
        })}
      </div>

      Amenities_Ratings	Amenities_Ratings	`json:"amenities_ratings"`
      }

      type Amenities_Ratings struct{
        Name	string		`json:"name"`
        Score	float64 	`json:"score"`
      } */}


      {/* =================== AMENITIES RATINGS OUTPUT DISPLAY ====================== */}




      {/* =================== ROOMS OUTPUT DISPLAY ======================roomtypelist */}
      <div style={{ marginTop: 100 }}>
        <div style={{ border: "0.5px solid rgb(240,240,240)" }}>
          {(error) ?
            (<div className="AllBoxes"> <div style={{ textAlign: "center", height: 100 }}>{console.log("Error: ", error.message)}<br></br> <h1>No Rooms Available</h1></div></div>)

            : (!isLoaded) ?
              (<div className="AllBoxes"> <div style={{ textAlign: "center", height: 100 }}><br></br> <h1>Fetching Room...</h1></div></div>)

              : (<div>
                {/* {console.log("Rooms: ", rooms)} */}
                {/* {ShowRoomsOutput(rooms, minPrice, maxPrice, description)} */}
                <ListOfRoomTypes
                  rooms={rooms}
                  filters={filters}
                  handleChooseRoom={handleChooseRoom}
                />
              </div>)
          }
        </div>
      </div>


      {/* =================== ROOMS OUTPUT DISPLAY ====================== */}

      {/* ====================== Hotel Room Pic ENLARGE ========================= */}

      <div style={{ zIndex: 0, position: "fixed", display: enlargedImagesMode, justifyContent: "center", alignItems: "center", top: 0, height: window.innerHeight, width: window.innerWidth }}>

        <div style={{
          width: "1000px",
          height: "700px",
          border: "1px solid black",
          position: "relative",
          zIndex: 20
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
            onClick={() => { setEnlargedImagesMode("none"); setHideFilters("visible") }}
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
          style={{ background: "black", opacity: "90%", width: window.innerWidth, height: window.innerHeight, position: "absolute", zIndex: 19 }}
          onClick={() => { console.log(enlargedImagesMode); setEnlargedImagesMode("none"); setHideFilters("visible"); console.log(enlargedImagesMode) }}
        ></div>
      </div>

      {/* ====================== NEXT button========================= */}
      <button
        id="nextButton"
        // style={{
        //   background: "rgb(255, 140, 0)",
        //   fontSize: 30,
        //   color: "white",
        //   borderRadius: 30,
        //   fontWeight: 900,
        //   width: 100,
        //   height: 70,
        //   textAlign: "center",
        //   //position: "fixed",
        //   //top: 700,
        //   //left: 750, // way out of view on narrow screens lol original 1750
        //   //zIndex: 20,
        //   border: "transparent"
        // }}
        onClick={finishStage}>NEXT STAGE</button>
      {/* // ▶▶ */}
      {/* ====================== NEXT button========================= */}

    </div>
  );
}


export default HotelRoomDetails;










