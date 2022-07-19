// Example format of usage : <HotelRoomDetails hotel = "Hotel ABC" latitude = "1.2864" longitude = "103.8531" />
import './HotelRoomDetails.css';
import React, { useState, useEffect } from "react";
import MapGenerator from './parts/MapGenerator';
import HotelRoomBox from './parts/HotelRoomBox';

function lowerCaseChange(description) {
  try {
    let nextWord = false;
    let tempDescription = description.charAt(0);
    for (let i = 1; i < description.length; i++) {
      if (description.charAt(i) === " ") {
        tempDescription = tempDescription + description.charAt(i);
        nextWord = true;
      }
      else if (nextWord === true) {
        tempDescription = tempDescription + description.charAt(i);
        nextWord = false;
      }
      else {
        tempDescription = tempDescription + description.charAt(i).toLowerCase();
      }

    }


    return tempDescription;
  }
  catch (exception) {
    console.error(exception)
  }

}

async function HotelRoomAPICall(props) {
  return await /*fetch("https://ascendahotels.mocklab.io/api/hotels/kSVF/prices/ean")*/
    /*fetch("https://ascendahotels.mocklab.io/api/hotels/f0fe/prices/ean")*/
    fetch("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
      //fetch("https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=WD0M&checkin=2022-05-18&checkout=2022-05-19&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1")
      .then(res => res.json());
}

function removeDescriptionDuplicate(roomDescriptionArray) {
  let i = 0, j = 0;
  while (i < roomDescriptionArray.length) {
    j = i + 1;
    while (j < roomDescriptionArray.length) {
      if (roomDescriptionArray[i] === roomDescriptionArray[j]) {
        roomDescriptionArray.splice(j, 1);
      }
      j += 1;
    }



    i += 1;
  }
  i = 0;
  j = 0;

  return roomDescriptionArray;
}


function HotelRoomDetails(props) {
  const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

  // var maxPrice = 0, minPrice = 0;
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
    label: '',
  });

  useEffect(() => {
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



  if (error) {
    console.log("Error: ", error.message)
  }

  const finishStage = () => {
    const selfData = {
      ...gotHandMeDowns,
    };
    props.handMeDowns.push(selfData);
    props.finishStage(props.handMeDowns);
  };

  useEffect(() => {
    removeDescriptionDuplicate(roomDescriptionArray);
  }, [roomDescriptionArray]);

  return (
    <div>
      {
        error ? <div> there's an error </div> :
          !isLoaded ? < div > Loading... </div > :

            <div className="HotelRoomDetails">
              {/* <header className="HotelRoomDetails-header">
          </header> */}

              <h1 className="Hotelname">
                {gotHandMeDowns.hotel.name}
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
                setDescription(description);
              }}>
                <option value="-1">Choose Pricing</option>
                <option value="0">$0 - $500</option>
                <option value="1">$500 - $700</option>
                <option value="2">$700 - $900</option>
                <option value="3">$900 - $1200</option>
                <option value="4">{<span>&gt;</span>} $1200</option>
              </select>

              {/* Resetting Array to Empty Array : https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */}
              {roomDescriptionArray = []}

              {/* CREATING ROOM TYPES OPTIONS */}
              {
                rooms.filter(
                  (room) => ((room.price > minPrice && room.price < maxPrice) || filterSettingForPrice === "-1")
                ).map(
                  (room) =>
                    (room.description[room.description.length - 1] !== " ") ?
                      roomDescriptionArray.push(room.description) :
                      roomDescriptionArray.push(room.description.slice(0, room.description.length - 1))
                )
              }

              {/* Varying options of dropdown menu: https://www.geeksforgeeks.org/how-to-change-a-selects-options-based-on-another-dropdown-using-react/ */}
              <select value={description} onChange={(e) => { setDescription(e.target.value); }}>
                <option value="Choose Room Type">Choose Room Type</option>
                {roomDescriptionArray.map((room) => <option key={room} value={room}> {lowerCaseChange(room)} </option>)}
              </select>

              {/*https://reactjs.org/docs/faq-ajax.html  search "useEffect"*/}
              {/* Filter Reference: https://www.youtube.com/watch?v=MY6ZZIn93V8   5: 57 */}
              {
                rooms.filter((room) => (((room.price > minPrice && room.price < maxPrice) || filterSettingForPrice === "-1") &&
                  ((room.description.charAt(room.description.length - 1) !== " " && room.description === description) ||
                    (room.description.charAt(room.description.length - 1) === " " && room.description.slice(0, room.description.length - 1) === description) ||
                    description === "Choose Room Type"))
                ).map((room) => (
                  <HotelRoomBox key={room.key} description={room.description} price={room.price} />
                ))
              }

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
                //style = {{ 'background':"chocolate", width: "200px"}}
                //style= {{'background': `linear-gradient(to right, orange ${(parseInt(slider.value)-slider.min)*100/(slider.max-slider.min)}%, #ccc 0px`}}
                //className = {"SliderMax"}

                style={{
                  WebkitAppearance: "none",
                  background: "#D3D3D3",
                  borderRadius: "5px",
                  backgroundImage: "linear-gradient(blue, blue)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: slider.value + "%",
                  width: "200pt",
                  height: "3pt",
                  "thumb": "green",
                }}
                min={slider.min}
                max={slider.max}
                value={slider.value}
                onChange={(e) => setSlider({ value: e.target.valueAsNumber })} className="slider" id="myRange" />
              <button onClick={finishStage}>Next Stage</button>
            </div >
      }
    </div>
  );
}

export default HotelRoomDetails;
