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

  const [hotelCloudflareImageURL, setHotelCloudflareImageURL] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  
  const [hotelScore, setHotelScore] = useState("");
  const [hotelPopularity, setHotelPopularity] = useState("");

  const [suffix, setSuffix] = useState("");
  const [numberOfImages, setNumberOfImages] = useState(0);

  const [defaultImageIndex, setDefaultImageIndex] = useState(1);

  var hotelDescHeadingNContent = [];

  const[hotelPicLeftHandle, setHotelPicLeftHandle] = useState("HotelPicsLeftHandleNoHover");
  const[hotelPicRightHandle, setHotelPicRightHandle] = useState("HotelPicsRightHandleNoHover");

  const [currentIndex, setCurrentIndex] = useState(defaultImageIndex);

  const decreaseCurrentIndex = () => {
      console.log("Decrease " + currentIndex);
      if (currentIndex - 1 < 1){
        setCurrentIndex(numberOfImages);
      }
      else{
        setCurrentIndex(currentIndex - 1);
      }
  }

  const increaseCurrentIndex = () => {
      console.log("Increase " + currentIndex);
      if (currentIndex + 1 > numberOfImages){
        setCurrentIndex(defaultImageIndex);
      }
      else{
        setCurrentIndex(currentIndex + 1);
      }
  }






  
  useEffect(() => {
    (async () => {
      await props.backendPackage.getHotelRoomBatch(
        gotHandMeDowns.hotel.uid,
        gotHandMeDowns.destination.uid,
        gotHandMeDowns.checkInDate,
        gotHandMeDowns.checkOutDate,
        gotHandMeDowns.numberOfRooms
      ).then(
        (result) => {
          console.log("Result is : ", result);
          console.log("Result.rooms is : ", result.rooms);
          setIsLoaded(true);
          setRooms(result);
          setHotelCloudflareImageURL(result.cloudflareImageURL);
          setHotelDescription(result.description);
          console.log(result.description);
          setHotelScore(result.score);
          setHotelPopularity(result.popularity);
          setSuffix(result.suffix);
          setNumberOfImages(result.numberOfImages);
          setDefaultImageIndex(result.defaultImageIndex);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    })();
  }, [gotHandMeDowns.hotel]);
    

    
      // setTimeout( async function() {await fetch(firstReceived, 
      //   {'Access-Control-Allow-Origin' : '*',
      //     'Access-Control-Allow-Credentials' : 'true',
      //     'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With',
      //     'Access-Control-Allow-Methods' : 'POST, OPTIONS, GET, PUT'}).catch( (error) => console.log(error.message));}, 2000);
          

      // setTimeout( async function() {await fetch(firstReceived, 
      //   {'Access-Control-Allow-Origin' : '*',
      //     'Access-Control-Allow-Credentials' : 'true',
      //     'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With',
      //     'Access-Control-Allow-Methods' : 'POST, OPTIONS, GET, PUT'})
      //     .then((finalResult) => {console.log(finalResult.json()); finalResult.json();})
      //     .then( (result) => {
      //       console.log("Final result: ", result);
      //       setIsLoaded(true);
      //       setRooms(result.rooms);
      //     },
          
      //     (err) => {
      //       setIsLoaded(true);
      //       setError(error + " " + err);
      //     })
      //     .catch( (error) => console.log(error.message));}, 2000);


  const handleChooseRoom = (room) => {
    console.log("ROOM CHOSEN:", room);
    setChosenRoom(room);
  };




  if (error) {
    console.log("Error: ", error.message);

    return(<div style={{textAlign: "center"}}><h1>Error 404</h1></div>)
    
  }

  else if(!isLoaded){
    return <div> Loading... </div>
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

    try{
      hotelDescHeadingNContent = hotelDescription.split(/<|>/);
      // hotelDescHeadingNContent.map((text, index) => {
      //   if(text === "br/" || text == "b" || text == "p" || text === "h" || text === "br /" || text === "/b" || text === "/p" || text === " " || text === "b " || text === "p " ){
      //     hotelDescHeadingNContent.splice(index, 1);
      //   }});

      // hotelDescHeadingNContent.map((text, index) => {
      //   if(text == "" || text == " " || text == null){
      //     hotelDescHeadingNContent.splice(index, 1);
      //   }});
    }
    catch(e){
      hotelDescHeadingNContent = ["Description Unavailable"];
    }

    console.log("hotelDescHeadingNContent : ",  hotelDescHeadingNContent);

    {/* Resetting Array to Empty Array : https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */}
    roomDescriptionArray.length = null
          
    {/* CREATING ROOM TYPES OPTIONS */}
    try{
      rooms.filter(
        (room) => (room.price >= minPrice && room.price <= maxPrice))
        .map(
          (room) => {(room.description[room.description.length-1] !== " ") ? 
            roomDescriptionArray.push(room.description) : 
            roomDescriptionArray.push(room.description.slice(0,room.description.length - 1)) 
            })
          }
    catch(e){
      console.log(e);
    }
    

    RemoveDescriptionDuplicate(roomDescriptionArray);

 
    return (

      

      <div className="HotelRoomDetails">
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
        

        

        

        {/* <img src = "https://d2ey9sqrvkqdfs.cloudfront.net/S8UJ/1.jpg" alt = "" />  */}
        {/* {//hotelImage} alt = "" /> */}

        {/* <HotelRoomImages 
          hotelCloudflareImageURL = {hotelCloudflareImageURL} 
          uid = {gotHandMeDowns.hotel.uid} 
          defaultImageIndex = {defaultImageIndex} 
          suffix = {suffix} 
          numberOfImages = {numberOfImages}
        />   */}





        <div style={{margin: "10%"}}>

          
          

          <div style={{width: "400px", height: "200px", marginBottom: "100pt", marginLeft: "100pt"}} >
            
            
            <div style={{width: "400px", height: "300px", overflow:"hidden"}}>
              <img key = {"" + hotelCloudflareImageURL + "/"+ gotHandMeDowns.hotel.uid + "/i" + currentIndex + suffix} 
                  src = {"" + hotelCloudflareImageURL + "/"+ gotHandMeDowns.hotel.uid + "/i" + currentIndex + suffix} 
                  alt = ""
                  /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                  style={{width: "150%", height:"150%", top:"-20%", left:"-20%", position:"relative"}} />

            </div>

            <div className = "HotelPicsNumbering">{currentIndex} / {numberOfImages}</div>
            

            

            <button 
              key = "decreasePicIndx" 
              // style={{
              //   float:"left", 
              //   fontSize : "30pt",  
              //   marginTop: "-200px", 
              //   color: "grey",
              //   position:"relative",
              //   backgroundColor: "transparent",
              //   border:"transparent"
              //   }} 
              className = {hotelPicLeftHandle}
              onClick = {() => {decreaseCurrentIndex()}}
              // Reference: https://stackoverflow.com/questions/29981236/how-do-you-hover-in-reactjs-onmouseleave-not-registered-during-fast-hover-ove
              onMouseOver = {() => {setHotelPicLeftHandle("HotelPicsLeftHandleHover")}}
              onMouseOut = {() => {setHotelPicLeftHandle("HotelPicsLeftHandleNoHover")}}
              >
                ◀{/*&lt;*/}
              </button> 

            <button 
              key = "increasePicIndx" 
              // style={{
              //   float:"right", 
              //   fontSize : "30pt", 
              //   marginTop: "-200px", 
              //   color: "grey",
              //   position:"relative",
              //   backgroundColor: "transparent",
              //   border:"transparent"
              // }} 
              className = {hotelPicRightHandle}
              onClick = {() => {increaseCurrentIndex()}}
              onMouseOver = {() => {setHotelPicRightHandle("HotelPicsRightHandleHover")}}
              onMouseOut = {() => {setHotelPicRightHandle("HotelPicsRightHandleNoHover")}}
              >
                ▶{/*&gt;*/}
              </button>

              

          </div>

          <h1 className = "HotelName">
                {gotHandMeDowns.hotel.term} 
              </h1>
  

          
        </div>
        

        <br></br>

        <div>
          


          <span style = {{float: "left" , marginRight: "500px", marginBottom:"200px", fontSize: "10pt"}}> 
            {hotelDescHeadingNContent.filter((text) => (text !== "" && text !== "br/" && text !== "b" && text !== "p" && text !== "h" && text !== "br /" && text !== "/b" && text !== "/p" && text !== " ")).map( (text, index) => { 
              console.log(text, " ", index)
              if(index % 2 === 0){
                return(
                  <>
                    <br></br>
                    <span style={{float: "left", fontSize:"15pt"}}>{text}</span>
                    <br></br>
                  </>)
              }
              else{
                return(
                  <>
                    <br></br>
                    <span style={{float: "left"}}>{text}</span>
                    <br></br>
                    <br></br>
                  </>)
              }
            })} 
          
          </span>

        </div>

        
        
        <br></br>
        <br></br>
        <br></br>



        

        
        {console.log("Rooms: ", rooms)}
        {ShowRoomsOutput(rooms, minPrice, maxPrice, description)}

        <span style = {{float: "right", marginRight: "50px", marginBottom: "-150px"}}> <MapGenerator latitude = {gotHandMeDowns.hotel.latitude} longitude = {gotHandMeDowns.hotel.longitude}/>  </span>
         
        <button onClick={finishStage}>Next</button>
 

      </div>
    );
  }
}

export default HotelRoomDetails;










