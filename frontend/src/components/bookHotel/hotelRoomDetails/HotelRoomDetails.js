import './App.css';
import React, { useState, useEffect } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import { Wrapper, Status } from "@googlemaps/react-wrapper";


//import { getAllRooms, createRoom } from './services/HotelRoomsListServices'


var maxPrice = 0, minPrice = 0;
var minPriceArray = Array(0, 500, 700, 900, 1200);
var maxPriceArray = Array(500, 700, 900, 1200, 20000);

var roomDescriptionArray = Array();


function App(props) {

  let i = 0, j = 0;
   
  const [status, setStatus] = useState("Open");
  const [valueSettingForPrice, setValueSettingForPrice] = useState("Price");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [description, setDescription] = useState("Choose Room Type");

  


  // const Map: React.FC<{}> = () => {};
  // const ref = React.useRef(null);
  // const [map, setMap] = React.useState();

  // React.useEffect(() => {
  //   if (ref.current && !map) {
  //     setMap(new window.google.maps.Map(ref.current, {}));
  //   }
  // }, [ref, map]);


  useEffect(() => {
    {/*fetch("https://ascendahotels.mocklab.io/api/hotels/kSVF/prices/ean")*/}
    {/*fetch("https://ascendahotels.mocklab.io/api/hotels/f0fe/prices/ean")*/}
    fetch("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
    //fetch("https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=WD0M&checkin=2022-05-18&checkout=2022-05-19&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setRooms(result.rooms);

      },

      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])

  
  // roomDescriptionArray.forEach((description) => { roomDescriptionArray.forEach((otherDescription) => {if (description === otherDescription){ roomDescriptionArray.remove(otherDescription)}})});

  
  

  if (error) {
    console.log("Error: ", error.message)
  }

  else if(!isLoaded){
    <div> Loading... </div>
  }

  else{

    let locationGoogleMapURL = "https://www.google.com/maps/@" + props.latitude + ","+ props.longitude + ",20z";



    return (
      <div className="App">
        {/* <header className="App-header">
        </header> */}

        <h1>
          {props.hotel} 
        </h1>

        {console.log(locationGoogleMapURL)}

        {/* <iframe src="www.google.com/maps/" width="600" height="450"></iframe>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.621799709583!2d103.84450638469951!3d1.287584079927871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19090f9c176f%3A0x41c12c50babf70d0!2sThe%20Fullerton%20Hotel%20Singapore!5e0!3m2!1sen!2ssg!4v1657073781801!5m2!1sen!2ssg" width="600" height="450" style= {{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        https://www.geeksforgeeks.org/how-to-add-google-map-inside-html-page-without-using-api-key/ */}
        
        

        {/* Install Leaflet to use Openstreetmap: https://www.youtube.com/watch?v=i9oX1upSKjI */}
        {/* Openstreetmap Tutorial: https://www.youtube.com/watch?v=290VgjkLong */}
        {/* MUST ADD STYLE ATTRIBUTE TO MapContainer: https://stackoverflow.com/questions/40365440/react-leaflet-map-not-correctly-displayed */}

        <MapContainer center={[props.latitude, props.longitude]} zoom = {20} style={{ height: '100vh', width: '100vh' }}>
          <TileLayer
            url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap </a>contributors'
          />
        </MapContainer>

        <br></br>
        <br></br>




        <p>
          Filters {valueSettingForPrice}
        </p>
    
        


        
        {/* <select id = "m" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
          <option value="0">$0</option>
          <option value="1">$500</option>
          <option value="2">$700 - $900</option>
          <option value="3">$900 - $1200</option>
        </select> */}

        {/* <select id="m" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="500" id = "1st">$500</option>
          <option value="700">$700</option>
          <option value="900">$900</option>
          <option value="1200">$1200</option>
        </select> */}



        {/* For > sign text display: https://stackoverflow.com/questions/14659240/angle-bracket-without-triggering-html-code */}

        <select value={valueSettingForPrice} onChange={(e) => {setValueSettingForPrice(e.target.value); setMinPrice(minPriceArray[parseInt(e.target.value)]); setMaxPrice(maxPriceArray[parseInt(e.target.value)]); setDescription(description)}}>
          <option value="-1">Choose Pricing</option>
          <option value="0">$0 - $500</option>
          <option value="1">$500 - $700</option>
          <option value="2">$700 - $900</option>
          <option value="3">$900 - $1200</option>
          <option value="4">{<span>&gt;</span>} $1200</option>
        </select>
        



        

        {/*https://reactjs.org/docs/faq-ajax.html  search "useEffect"*/}
       
        {/* <ul>
          {
            rooms.filter(room => room.price > minPriceArray[parseInt(value)] && room.price < maxPriceArray[parseInt(value)] ).map(room => (
            <li key = {room.key}> 
                {room.description} <br></br>$
                {room.price}
            </li>))
          }
        </ul> */}

        
        {/* Resetting Array to Empty Array : https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */}
        {roomDescriptionArray.map(() => {roomDescriptionArray.length = 0})}
        
        {/* CREATING ROOM TYPES OPTIONS */}
        {rooms.filter(room => (room.price > minPrice && room.price < maxPrice) || valueSettingForPrice === "-1").map((room) => {(room.description[room.description.length-1] != " ") ? roomDescriptionArray.push(room.description) : roomDescriptionArray.push(room.description.slice(0,room.description.length - 1)) })}
        


        {/* FOR REMOVING DUPLICATES IN OPTIONS */}
        {
          roomDescriptionArray.map(()=> {
            while (i < roomDescriptionArray.length){
              j = i + 1;
              while (j < roomDescriptionArray.length){
                if(roomDescriptionArray[i] === roomDescriptionArray[j]){
                  roomDescriptionArray.splice(j, 1);
                }
                j += 1;
              }

              i+=1;
            }
            i = 0;
            j = 0;
          })
          
        }

       {/* {console.log(roomDescriptionArray)} */}

        
        {/* Varying options of dropdown menu: https://www.geeksforgeeks.org/how-to-change-a-selects-options-based-on-another-dropdown-using-react/ */}
        <select value={description} onChange={(e) => {setDescription(e.target.value);}}>
          <option value = "Choose Room Type">Choose Room Type</option>
          {roomDescriptionArray.map((room) => <option key = {room} value={room}> {room} </option>)}
        </select>

        
        
        

        {/* Filter Reference: https://www.youtube.com/watch?v=MY6ZZIn93V8   5: 57 */}
        <ul>
          {
            rooms.filter(room => (((room.price > minPrice && room.price < maxPrice) || valueSettingForPrice === "-1" ) && 
              ((room.description[room.description.length - 1] != " " && room.description === description) || 
               (room.description[room.description.length - 1] == " " && room.description.slice(0, room.description.length - 1) === description) || 
               description === "Choose Room Type" )
               || console.log(valueSettingForPrice)
               || console.log(description)
               || console.log(roomDescriptionArray))
               ).map((room) => (
            
            
            <li key = {room.key}> 
                {room.description} <br></br>$
                {room.price}
            </li>
            
            ))
            
            
          }
        </ul>

        

        
        <button onClick={() => setStatus("Closed")}>Test Closed</button>
        <button onClick={() => setStatus("Open")}>Test Open</button>
        <br></br>
        <br></br>

      </div>
    );
  }
}

export default App;
