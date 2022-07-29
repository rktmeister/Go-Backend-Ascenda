import './HotelRoomDetails.css';
import React, { useState, useEffect } from "react";

import LowerCaseChange from "./parts/LowerCaseChange.js";
import RemoveDescriptionDuplicate from "./parts/RemoveDescriptionDuplicate.js";

import MapGenerator from './parts/MapGenerator';

import ShowRoomsOutput from './parts/ShowRoomsOutput';

import { FaStar } from 'react-icons/fa';

import { getHotelRoomBatch } from './../../../utils/backendAPI.js';






function HotelRoomDetails(props) {


  const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

  var roomDescriptionArray = Array();

  const maxSlider = 20000; // gotHandMeDowns.filterData.maxPrice * 1000);
  const minSlider = 60;

  
  const [minPrice, setMinPrice] = useState(0); //gotHandMeDowns.filterData.minPrice);
  const [maxPrice, setMaxPrice] = useState(20000); // gotHandMeDowns.filterData.maxPrice * 10);

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

  const [hotelPicLeftHandle, setHotelPicLeftHandle] = useState("HotelPicsLeftHandleNoHover");
  const [hotelPicRightHandle, setHotelPicRightHandle] = useState("HotelPicsRightHandleNoHover");

  const [hotelAddress, setHotelAddress] = useState("");

  const [hotelRating, setHotelRating] = useState(1);


  const [currentIndex, setCurrentIndex] = useState(defaultImageIndex); // This is for overall hotel imagaes

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
          setRooms(result.rooms);
          setHotelCloudflareImageURL(result.cloudflareImageURL);
          setHotelDescription(result.description);
          console.log(result.description);
          setHotelScore(result.score);
          setHotelPopularity(result.popularity);
          setSuffix(result.suffix);
          setNumberOfImages(result.numberOfImages);
          setDefaultImageIndex(result.defaultImageIndex);
          setHotelAddress(result.address);
          setHotelRating(result.rating);

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

   // ======================== Setting up hotel description ========================== //
    try{
      hotelDescHeadingNContent = hotelDescription.split(/<|>/);
      if (hotelDescHeadingNContent.length === 1){
        
        let i = 0, fullstop_infront_index = 0, statement_start = 0;
        let temp_HotelDescHeadingNCont = [];

        while (i < hotelDescHeadingNContent[0].length){
          let numOfSpaces = 0;

          while(hotelDescHeadingNContent[0].charAt(i) !== "." && i < hotelDescHeadingNContent[0].length){
            if (hotelDescHeadingNContent[0].charAt(i) === " "){
              numOfSpaces = numOfSpaces + 1;
            }
            
            i = i + 1;
          }

          if (numOfSpaces <= 3){  // If number of spaces less than or equal to 3, usually the sentence is a title.

            
            

            if(statement_start !== 0){  // Only after next title reached, then push the first few statements that are not titles
              temp_HotelDescHeadingNCont.push(hotelDescHeadingNContent[0].substring(statement_start, fullstop_infront_index - 1));
             
            }
            
            statement_start = i + 1;
            
            // Pushing of title here to prevent 2nd title from being pushed before the first few statements that are not titles.
            temp_HotelDescHeadingNCont.push(hotelDescHeadingNContent[0].substring(fullstop_infront_index, i));   // Title starts from fullstop and reaches fullstop.
            
            
          }

          fullstop_infront_index = i + 1;  // The first character after the latest fullstop
          i = i + 1; // To move to next character after fullstop.
          

          // hotelDescHeadingNContent.splice(0, 1, hotelDescHeadingNContent[0].substring(0, i));

          console.log(temp_HotelDescHeadingNCont);
          
        }

        temp_HotelDescHeadingNCont.push(hotelDescHeadingNContent[0].substring(statement_start, fullstop_infront_index - 1)); // Final few statements
        hotelDescHeadingNContent = [].concat(temp_HotelDescHeadingNCont);
        console.log(hotelDescHeadingNContent);
      }
     
    }
    catch(e){
      hotelDescHeadingNContent = ["Description Unavailable"];
    }

    console.log("hotelDescHeadingNContent : ",  hotelDescHeadingNContent);


    // ======================== Setting up hotel description ========================== //




    // ============================= Setting up room description (type choices) ========================== //

    {/* Resetting Array to Empty Array : https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */}
    roomDescriptionArray.length = null
          
    {/* CREATING ROOM TYPES OPTIONS */}
    try{
      rooms.filter(
        (room) => (room.price >= minPrice && room.price <= maxPrice))
        .map(
          (room) => {(room.roomNormalizedDescription[room.roomNormalizedDescription.length-1] !== " ") ? 
            roomDescriptionArray.push(room.roomNormalizedDescription) : 
            roomDescriptionArray.push(room.roomNormalizedDescription.slice(0,room.roomNormalizedDescription.length - 1)) 
            })
          }
    catch(e){
      console.log(e);
    }
    

    RemoveDescriptionDuplicate(roomDescriptionArray);

    // ============================= Setting up room description (type choices) ========================== //

    


    


 
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
              {roomDescriptionArray.map((room) => <option key = {room} value={room}> {room} </option>)}  {/*LowerCaseChange(room)} </option>)*/}
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





        <div className = "HotelPicTitlePartDiv">

          
          

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


          <p className = "HotelAddress">
                {hotelAddress} 
          </p>

          <span className = "HotelRatings">
            {/* Reference: https://www.youtube.com/watch?v=eDw46GYAIDQ */}
            {/* {[ ... Array(hotelRating)].map(star => {
              return(
                <label>
                  <FaStar size = {100} color = "yellow" />
                </label>
              )
            })} */}
          
            {[ ... Array(hotelRating)].map(() => {
              return(
       
                <span style={{color: "#FFAE42", fontSize: "15pt"}}>★</span> 
 
              )
            })}

            {[ ... Array(5-hotelRating)].map(() => {
              return(
                <span style={{color: "black" , fontSize: "15pt"}}>★</span> 
              )
            })}

          </span>
  

          
        </div>
        

        <br></br>


        {/* =================== HOTEL DESCRIPTION OUTPUT DISPLAY ====================== */}

        <div>
          
          <span style = {{float: "left", fontSize: "10pt"}}> 
            {hotelDescHeadingNContent.filter((text) => (text !== "" && text !== "br/" && text !== "b" && text !== "p" && text !== "h" && text !== "br /" && text !== "/b" && text !== "/p" && text !== " "))
              .map( (text, index) => { 
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

        {/* =================== HOTEL DESCRIPTION OUTPUT DISPLAY ====================== */}

       


        {/* =================== ROOMS OUTPUT DISPLAY ====================== */}
        
        <div style = {{ marginnTop:"200pt"}}>
          {console.log("Rooms: ", rooms)}
          {ShowRoomsOutput(rooms, minPrice, maxPrice, description)}
        </div>

        {/* =================== ROOMS OUTPUT DISPLAY ====================== */}




        {/* =================== MAP OUTPUT DISPLAY ====================== */}
        
        <div className = "MapGeneratorDiv"> <MapGenerator latitude = {gotHandMeDowns.hotel.latitude} longitude = {gotHandMeDowns.hotel.longitude}/>  </div>

        {/* =================== MAP OUTPUT DISPLAY ====================== */}



         
        <button onClick={finishStage}>Next</button>
        
 

      </div>
    );
  }
}

export default HotelRoomDetails;










