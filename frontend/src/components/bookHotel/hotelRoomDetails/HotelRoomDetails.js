// Example format of usage : <HotelRoomDetails hotel = "Hotel ABC" latitude = "1.2864" longitude = "103.8531" />



import './HotelRoomDetails.css';
import React, { useState, useEffect } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import markerIcon from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet';

function lowerCaseChange(description){
  try{
    let nextWord = false;
    let tempDescription = description.charAt(0);
    for (let i = 1; i < description.length; i++){
      if (description.charAt(i) === " "){
        tempDescription = tempDescription + description.charAt(i);
        nextWord = true;
      }
      else if(nextWord === true){
        tempDescription = tempDescription + description.charAt(i);
        nextWord = false;
      }
      else{
        tempDescription = tempDescription + description.charAt(i).toLowerCase();
      }

    }

    
    return tempDescription;
  }
  catch(exception){
    console.error(exception)
  }
  
}

class HotelRoomBox extends React.Component{

  constructor(props){
    super(props);
    this.state = {description: props.description, price: props.price};
    //this.lowerCaseChange = this.lowerCaseChange.bind(this);
  
  }

  // lowerCaseChange(){
  //   try{
  //     let nextWord = false;
  //     let tempDescription = this.state.description.charAt(0);
  //     for (let i = 1; i < this.state.description.length; i++){
  //       if (this.state.description.charAt(i) === " "){
  //         tempDescription = tempDescription + this.state.description.charAt(i);
  //         nextWord = true;
  //       }
  //       else if(nextWord === true){
  //         tempDescription = tempDescription + this.state.description.charAt(i);
  //         nextWord = false;
  //       }
  //       else{
  //         tempDescription = tempDescription + this.state.description.charAt(i).toLowerCase();
  //       }

  //     }

  //     this.setState({description: tempDescription});
  //     tempDescription = "";
  //   }
  //   catch(exception){
  //     console.error(exception)
  //   }
    
  // }


  // IF NEED TO CALL A METHOD BEFORE THE RENDER() PART. DO NOT CALL THE METHOD INSIDE THE RENDER()
  // Reference: https://stackoverflow.com/questions/51741828/need-to-execute-function-before-render-in-reactjs
  componentDidMount(){  
    //this.lowerCaseChange();
    this.setState({description: lowerCaseChange(this.state.description)});
  }

  render(){
    // border: https://stackoverflow.com/questions/2020496/how-to-set-a-border-for-an-html-div-tag
    
    return(
      
      <div className = "HotelRoomBox">
        <br></br>
        
        <span className = "HotelRoomBoxLeft">{this.state.description}</span>
        {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>} 
        <span className = "HotelRoomBoxRight">${this.state.price}</span>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
      
      </div>
    )
  }

}

// class DoubleSlider extends React.component{
//   constructor(props)
//   {
//     super(props)

//   }
// }

async function HotelRoomAPICall(props){
  return await /*fetch("https://ascendahotels.mocklab.io/api/hotels/kSVF/prices/ean")*/
  /*fetch("https://ascendahotels.mocklab.io/api/hotels/f0fe/prices/ean")*/
  fetch("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
  //fetch("https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=WD0M&checkin=2022-05-18&checkout=2022-05-19&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1")
  .then(res => res.json());
}

function removeDescriptionDuplicate(roomDescriptionArray){
  let i = 0, j = 0;
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

  return roomDescriptionArray;
}


function MapGenerator(props){

  {/* Install Leaflet to use Openstreetmap: https://www.youtube.com/watch?v=i9oX1upSKjI */}
  {/* Openstreetmap Tutorial: https://www.youtube.com/watch?v=290VgjkLong */}
  {/* MUST ADD STYLE ATTRIBUTE TO MapContainer: https://stackoverflow.com/questions/40365440/react-leaflet-map-not-correctly-displayed */}
  {/* Adding Markers: https://stackoverflow.com/questions/71229824/displaying-array-of-data-with-lat-long-as-markers-react-leaflet 
      Making Markers Display: https://stackoverflow.com/questions/60174040/marker-icon-isnt-showing-in-leaflet */}
    

  {/* Centering Map (Tuhame's Answer): https://stackoverflow.com/questions/13034188/how-to-center-align-google-maps-in-a-div-with-a-variable-width */}

  return(
    <MapContainer center={[props.latitude, props.longitude]} zoom = {20} style={{ height: '100vh', width: '100vh', marginLeft: 'auto', marginRight: 'auto' }}>
      <Marker 
        position={[props.latitude, props.longitude]}
        icon={new Icon({iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup>
            {props.hotel}
          </Popup>
      </Marker>
      <TileLayer
        url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap </a>contributors'
      />
    </MapContainer>
  )
}


function HotelRoomDetails(props) {

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
      label: ''
  });

  

  



  useEffect(() => {
    {/*fetch("https://ascendahotels.mocklab.io/api/hotels/kSVF/prices/ean")*/}
    {/*fetch("https://ascendahotels.mocklab.io/api/hotels/f0fe/prices/ean")*/}
    {/*fetch("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
    //fetch("https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=WD0M&checkin=2022-05-18&checkout=2022-05-19&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1")
    .then(res => res.json())*/}
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


    return (
      <div className="HotelRoomDetails">
        {/* <header className="HotelRoomDetails-header">
        </header> */}

        <h1 className = "Hotelname">
          {props.hotel} 
        </h1>

  

        <MapGenerator latitude = {props.latitude} longitude = {props.longitude}/>

        <br></br>
        <br></br>




        <p>
          Filters {filterSettingForPrice}
        </p>


        {/* ADD SLIDERS: https://stackoverflow.com/questions/65095361/double-sided-input-slider-in-react */}

        {/* For > sign text display: https://stackoverflow.com/questions/14659240/angle-bracket-without-triggering-html-code */}
        
        <select value={filterSettingForPrice} onChange={(e) => {setFilterSettingForPrice(e.target.value); setMinPrice(minPriceArray[parseInt(e.target.value)]); setMaxPrice(maxPriceArray[parseInt(e.target.value)]); setDescription(description)}}>
          <option value="-1">Choose Pricing</option>
          <option value="0">$0 - $500</option>
          <option value="1">$500 - $700</option>
          <option value="2">$700 - $900</option>
          <option value="3">$900 - $1200</option>
          <option value="4">{<span>&gt;</span>} $1200</option>
        </select>
        



        

        
       
       

        
        {/* Resetting Array to Empty Array : https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */}
        {roomDescriptionArray.map(() => {roomDescriptionArray.length = 0})}
        
        {/* CREATING ROOM TYPES OPTIONS */}
        {rooms.filter((room) => (room.price > minPrice && room.price < maxPrice) || filterSettingForPrice === "-1").map((room) => {(room.description[room.description.length-1] !== " ") ? roomDescriptionArray.push(room.description) : roomDescriptionArray.push(room.description.slice(0,room.description.length - 1)) })}
        


        {/* FOR REMOVING DUPLICATES IN OPTIONS */}
        {
          
          // roomDescriptionArray.map(()=> {
          //   while (i < roomDescriptionArray.length){
          //     j = i + 1;
          //     while (j < roomDescriptionArray.length){
          //       if(roomDescriptionArray[i] === roomDescriptionArray[j]){
          //         roomDescriptionArray.splice(j, 1);
          //       }
          //       j += 1;
          //     }

          //     i+=1;
          //   }
          //   i = 0;
          //   j = 0;
          // })
          roomDescriptionArray.map(() => {removeDescriptionDuplicate(roomDescriptionArray)})
          
        }
       
       {/* {console.log(roomDescriptionArray)} */}

        
        {/* Varying options of dropdown menu: https://www.geeksforgeeks.org/how-to-change-a-selects-options-based-on-another-dropdown-using-react/ */}
        <select value={description} onChange={(e) => {setDescription(e.target.value);}}>
          <option value = "Choose Room Type">Choose Room Type</option>
          {roomDescriptionArray.map((room) => <option key = {room} value={room}> {lowerCaseChange(room)} </option>)}
        </select>

        
        
        
        {/*https://reactjs.org/docs/faq-ajax.html  search "useEffect"*/}
        {/* Filter Reference: https://www.youtube.com/watch?v=MY6ZZIn93V8   5: 57 */}
        {/*<ul>*/}
          {
            rooms.filter((room) => (((room.price > minPrice && room.price < maxPrice) || filterSettingForPrice === "-1" ) && 
              ((room.description.charAt(room.description.length - 1) !== " " && room.description === description) || 
               (room.description.charAt(room.description.length - 1) === " " && room.description.slice(0, room.description.length - 1) === description) || 
               description === "Choose Room Type" ))
               ).map((room) => (
                
                
                console.log("Room " + room.description), <HotelRoomBox key = {room.key} description = {room.description} price = {room.price} />
                /*<li key = {room.key}> 
                {room.description} 
                {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>} 
                ${room.price}

                </li>*/
                
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
          //style = {{ 'background':"chocolate", width: "200px"}}
          //style= {{'background': `linear-gradient(to right, orange ${(parseInt(slider.value)-slider.min)*100/(slider.max-slider.min)}%, #ccc 0px`}}
          //className = {"SliderMax"}

          style = {{
            WebkitAppearance: "none",
            background: "#D3D3D3",
            borderRadius: "5px",
            backgroundImage: "linear-gradient(blue, blue)",
            backgroundRepeat: "no-repeat",
            backgroundSize: slider.value + "%",
            width: "200pt",
            height:"3pt",
            "thumb": "green"
            
            
          }}
          min={slider.min} 
          max={slider.max} 
          value={slider.value} 
          onChange={(e) => setSlider({value: e.target.valueAsNumber})} className="slider" id="myRange" />


        
 

      </div>
    );
  }
}

export default HotelRoomDetails;
