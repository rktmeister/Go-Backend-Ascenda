import './HotelRoomDetails.css';
import React, { useState, useEffect } from "react";

import LowerCaseChange from "./parts/LowerCaseChange.js";
import RemoveDescriptionDuplicate from "./parts/RemoveDescriptionDuplicate.js";
// import DoubleSlider from "./parts/DoubleSlider.js";

import MapGenerator from './parts/MapGenerator';
import HotelRoomBox from './parts/HotelRoomBox';
import { getHotelRoomBatch } from '../../../utils/backendAPI';





async function HotelRoomAPICall(props) {
  return await /*fetch("https://ascendahotels.mocklab.io/api/hotels/kSVF/prices/ean")*/
    /*fetch("https://ascendahotels.mocklab.io/api/hotels/f0fe/prices/ean")*/
    fetch("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
      //fetch("https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=WD0M&checkin=2022-05-18&checkout=2022-05-19&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1")
      .then(res => res.json());
}



function HotelRoomDetails(props) {


  const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

  var minPriceArray = Array(0, 500, 700, 900, 1200);
  var maxPriceArray = Array(500, 700, 900, 1200, 20000);
  let i = 0, j = 0;
  var roomDescriptionArray = Array();



  const [status, setStatus] = useState("Open");
  const [filterSettingForPrice, setFilterSettingForPrice] = useState("Price");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [description, setDescription] = useState("Choose Room Type");




  const [slider, setSlider] = useState({
    max: 10000,
    min: 0,
    value: 0,
    label: ''
  });







  useEffect(() => {
    //getHotelRoomBatch(gotHandMeDowns.hotel.id, gotHandMeDowns.datesOfTravel, gotHandMeDowns.numberOfRooms)
    HotelRoomAPICall()
      .then(
        (result) => {
          setIsLoaded(true);
          setRooms(result.rooms);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [gotHandMeDowns.hotel]);

  //     (error) => {
  //       setIsLoaded(true);
  //       setError(error);
  //     }
  //   )
  // }, [])//gotHandMeDowns.hotel])




  if (error) {
    console.log("Error: ", error.message);

    return (<div style={{ textAlign: "center" }}><h1>Error 404</h1></div>)

  }

  else if (!isLoaded) {
    return <div> Loading... </div>;
  }

  else {

    // const finishStage = () => {
    //   const selfData = {
    //     ...gotHandMeDowns,
    //   };
    //   props.handMeDowns.push(selfData);
    //   props.finishStage(props.handMeDowns);
    // };


    return (
      <div className="HotelRoomDetails">

        <h1 className="Hotelname">
          {gotHandMeDowns.hotel.name}
          {/* {gotHandMeDowns.hotel.name} */}
        </h1>



        <MapGenerator latitude={gotHandMeDowns.hotel.latitude} longitude={gotHandMeDowns.hotel.longitude} />

        <br></br>
        <br></br>




        <p>
          Filters {filterSettingForPrice}
        </p>


        {/* ADD SLIDERS: https://stackoverflow.com/questions/65095361/double-sided-input-slider-in-react */}

        {/* For > sign text display: https://stackoverflow.com/questions/14659240/angle-bracket-without-triggering-html-code */}

        <select value={filterSettingForPrice} onChange={(e) => {
          setFilterSettingForPrice(e.target.value);
          setMinPrice(minPriceArray[parseInt(e.target.value)]);
          setMaxPrice(maxPriceArray[parseInt(e.target.value)]);
          setDescription(description)
        }}>
          <option value="-1">Choose Pricing</option>
          <option value="0">$0 - $500</option>
          <option value="1">$500 - $700</option>
          <option value="2">$700 - $900</option>
          <option value="3">$900 - $1200</option>
          <option value="4">{<span>&gt;</span>} $1200</option>
        </select>











        {/* Resetting Array to Empty Array : https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */}
        {roomDescriptionArray.length = null}

        {/* CREATING ROOM TYPES OPTIONS */}
        {
          rooms.filter((room) => (room.price > minPrice && room.price < maxPrice) || filterSettingForPrice === "-1")
            .map((room) => {
              (
                room.description[room.description.length - 1] !== " ") ?
                roomDescriptionArray.push(room.description) :
                roomDescriptionArray.push(room.description.slice(0, room.description.length - 1)
                )
            }
            )
        }



        {/* FOR REMOVING DUPLICATES IN OPTIONS */}
        {


          roomDescriptionArray.map(() => { RemoveDescriptionDuplicate(roomDescriptionArray) })

        }


        {/* Varying options of dropdown menu: https://www.geeksforgeeks.org/how-to-change-a-selects-options-based-on-another-dropdown-using-react/ */}
        <select value={description} onChange={(e) => { setDescription(e.target.value); }}>
          <option value="Choose Room Type">Choose Room Type</option>
          {roomDescriptionArray.map((room) => <option key={room} value={room}> {LowerCaseChange(room)} </option>)}
        </select>




        {/*https://reactjs.org/docs/faq-ajax.html  search "useEffect"*/}
        {/* Filter Reference: https://www.youtube.com/watch?v=MY6ZZIn93V8   5: 57 */}
        {/*<ul>*/}
        {
          rooms.filter((room) => (((room.price > minPrice && room.price < maxPrice) || filterSettingForPrice === "-1") &&
            ((room.description.charAt(room.description.length - 1) !== " " && room.description === description) ||
              (room.description.charAt(room.description.length - 1) === " " && room.description.slice(0, room.description.length - 1) === description) ||
              description === "Choose Room Type"))
          ).map((room) => (


            <HotelRoomBox key={room.key} description={room.description} price={room.price} />

          ))
        }








        {/*</ul>*/}


        <br></br>

        <button onClick={() => setStatus("Closed")}>Test Closed</button>
        <button onClick={() => setStatus("Open")}>Test Open</button>
        <br></br>
        <br></br>

        {/* Reference: https://www.youtube.com/watch?v=2RyTHpUbn5A 
            Reference: https://stackoverflow.com/questions/62725470/creat-range-slider-in-react-js 
            Size of input interface reference: https://stackoverflow.com/questions/48257032/how-to-expand-the-width-size-of-input-in-semantic-react-ui*/}
        <input
          type="range"

          style={{
            WebkitAppearance: "none",
            background: "blue",
            borderRadius: "5px",
            backgroundImage: "linear-gradient(#D3D3D3, #D3D3D3)",
            backgroundRepeat: "no-repeat",
            backgroundSize: slider.value + "%",
            width: "200pt",
            height: "3pt",
            "thumb": "green"


          }}
          min={slider.min}
          max={slider.max}
          value={slider.value}
          onChange={(e) => setSlider({ value: e.target.valueAsNumber })} className="slider" id="myRange" />

        <br></br>
        {/* <DoubleSlider /> */}

      </div>
    );
  }
}

export default HotelRoomDetails;










