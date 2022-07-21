import './HotelRoomDetails.css';
import React, { useState, useEffect } from "react";

import LowerCaseChange from "./parts/LowerCaseChange.js";
import RemoveDescriptionDuplicate from "./parts/RemoveDescriptionDuplicate.js";

import MapGenerator from './parts/MapGenerator';
import ShowRoomsOutput from './parts/ShowRoomsOutput';

import { getHotelRoomBatch } from './../../../utils/backendAPI.js';





function HotelRoomDetails(props) {


  const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

  var roomDescriptionArray = Array();

  const maxSlider = 20000;
  const minSlider = 0;

  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [chosenRoom, setChosenRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  const [description, setDescription] = useState("Choose Room Type");

  const [sliderValueMax, setSliderValueMax] = useState(maxSlider);
  const [sliderValueMin, setSliderValueMin] = useState(minSlider);

  
  useEffect(() => {
    (async () => {
      await getHotelRoomBatch(gotHandMeDowns.hotel.uid, gotHandMeDowns.checkInDate, gotHandMeDowns.checkOutDate, gotHandMeDowns.numberOfRooms)
        //HotelRoomAPICall()
        .then(
          (result) => {
            setIsLoaded(true);
            setRooms(result);
          },

          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    })();
  }, [gotHandMeDowns.hotel]);

  const handleChooseRoom = (room) => {
    console.log("ROOM CHOSEN:", room);
    setChosenRoom(room);
  };




  if (error) {
    console.log("Error: ", error.message);

    return(<div style={{textAlign: "center"}}><h1>Error 404</h1></div>)
    
  }

  else if(!isLoaded){
    <div> Loading... </div>
  }

  else{

    const finishStage = () => {
      const dataToBePassedOn = {
        ...gotHandMeDowns,
        room: chosenRoom,
      };
      props.handMeDowns.push(dataToBePassedOn);
      props.finishStage(props.handMeDowns);
    };

    {/* Resetting Array to Empty Array : https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */}
    roomDescriptionArray.length = null
          
    {/* CREATING ROOM TYPES OPTIONS */}
    rooms.filter(
      (room) => (room.price >= minPrice && room.price <= maxPrice))
      .map(
        (room) => {(room.description[room.description.length-1] !== " ") ? 
          roomDescriptionArray.push(room.description) : 
          roomDescriptionArray.push(room.description.slice(0,room.description.length - 1)) 
          })
    

    RemoveDescriptionDuplicate(roomDescriptionArray);


    return (
      <div className="HotelRoomDetails">
 

        <h1 className = "Hotelname">

          {gotHandMeDowns.hotel.term} 
        </h1>

  

        <MapGenerator latitude = {props.latitude} longitude = {props.longitude}/>

        <br></br>
        <br></br>



        <div className = "FilterBox">
          <span style={{fontSize: "10px", background:"linear-gradient(white, white, white, cyan)"}}>
            Filters
          </span>

          <br></br>


          <span>Max Price: </span>
          <input 
            type="range" 
            
            className = "SliderMax"
            min= {minSlider} 
            max={maxSlider} 
            value={sliderValueMax} 
            onChange={(e) => {
              if (e.target.valueAsNumber >= sliderValueMin){
                setSliderValueMax(e.target.valueAsNumber); 
                setMaxPrice(parseInt(e.target.value));
                console.log(minPrice, " ", maxPrice);
              }
            }}
            id="myRange" />

            <span> ${sliderValueMax} </span>

            <br></br>

            <span>Min Price: </span>
            <input 
            type="range" 
 
            className = "SliderMax"
            min= {minSlider} 
            max= {maxSlider} 
            value={sliderValueMin} 
            onChange={(e) => {
              if (e.target.valueAsNumber <= sliderValueMax){
                setSliderValueMin(e.target.valueAsNumber); 
                setMinPrice(parseInt(e.target.value));

                console.log(minPrice, " ", maxPrice);
              }
              
              }}
            id="myRange" />

            <span> ${sliderValueMin} </span>


          
        

           <span>
            <select value={description} className = "DescriptionDropdown" onChange={(e) => {setDescription(e.target.value);}}>
              <option value = "Choose Room Type">Choose Room Type</option>
              {roomDescriptionArray.map((room) => <option key = {room} value={room}> {LowerCaseChange(room)} </option>)}
            </select>
          </span>

        </div>

        <br></br>
        <br></br>

        
        {console.log("Rooms: ", rooms)}
        {ShowRoomsOutput(rooms, minPrice, maxPrice, description)}
         
        <button onClick={finishStage}>Next</button>
 

      </div>
    );
  }
}

export default HotelRoomDetails;










