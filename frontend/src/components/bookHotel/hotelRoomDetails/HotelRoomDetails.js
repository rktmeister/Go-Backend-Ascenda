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

  var roomDescriptionArray = Array();



  const [hotelName, setHotelName] = useState("");
  const [hotelID, setHotelID] = useState("");
  const [hotelLatitude, setHotelLatitude] = useState(0);
  const [hotelLongitude, setHotelLongitude] = useState(0);

  const maxSlider = 20000; // gotHandMeDowns.filterData.maxPrice * 1000);
  const minSlider = 60;


  const [minPrice, setMinPrice] = useState(0); //gotHandMeDowns.filterData.minPrice);
  const [maxPrice, setMaxPrice] = useState(20000); // gotHandMeDowns.filterData.maxPrice * 10);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recallInterval, setRecallInterval] = useState(2000);

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


  const [enlargingImageWordsHovering, setEnlargingImageWordsHovering] = useState("HotelPicsEnlargingWordsNoHover")
  const [enlargedCloseHovering, setEnlargingCloseHovering] = useState("HotelPicsEnlargedCloseNoHover")
  const [enlargedImagesMode, setEnlargedImagesMode] = useState("none");

  var hotelDescHeadingNContent = [];

  const [hotelPicLeftHandle, setHotelPicLeftHandle] = useState("HotelPicsLeftHandleNoHover");
  const [hotelPicRightHandle, setHotelPicRightHandle] = useState("HotelPicsRightHandleNoHover");

  const [hotelAddress, setHotelAddress] = useState("");

  const [hotelRating, setHotelRating] = useState(1);


  const [currentIndex, setCurrentIndex] = useState(defaultImageIndex); // This is for overall hotel imagaes

  const decreaseCurrentIndex = () => {
    console.log("Decrease " + currentIndex);
    if (currentIndex - 1 < 1) {
      setCurrentIndex(numberOfImages);
    }
    else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const increaseCurrentIndex = () => {
    console.log("Increase " + currentIndex);
    if (currentIndex + 1 > numberOfImages) {
      setCurrentIndex(defaultImageIndex);
    }
    else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  //const closeEnlargeImageOuterArea







  useEffect(() => {
    

    setTimeout( async () => {
        await props.backendPackage.getHotelRoomBatch(
         gotHandMeDowns.hotel.uid,
         gotHandMeDowns.destination.uid,
         gotHandMeDowns.filterData.checkInDate,
         gotHandMeDowns.filterData.checkOutDate,
         gotHandMeDowns.filterData.numberOfRooms
     ).then()}, 5000);
      
      (async () => {
      
      await props.backendPackage.getHotelRoomBatch(
        gotHandMeDowns.hotel.uid,
        gotHandMeDowns.destination.uid,

        gotHandMeDowns.filterData.checkInDate,
        gotHandMeDowns.filterData.checkOutDate,
        gotHandMeDowns.filterData.numberOfRooms

        nav

      ).then(
        (result) => {
          console.log("Result is : ", result);
          console.log("Result.rooms is : ", result.rooms);
          setIsLoaded(true);
          setRooms(result.rooms);
          setHotelDescription(result.description);
          console.log(result.description);

          // setHotelCloudflareImageURL(result.cloudflareImageURL);
          
          // setHotelScore(result.score);
          // setHotelPopularity(result.popularity);
          // setSuffix(result.suffix);
          // setNumberOfImages(result.numberOfImages);
          // setDefaultImageIndex(result.defaultImageIndex);
          // setHotelAddress(result.address);
          // setHotelRating(result.rating);

        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    })()

    if(hotelDescription == null){
      setHotelDescription(gotHandMeDowns.hotel.description);
    }

    
    console.log("gotHandMeDowns: ", gotHandMeDowns);
    setHotelCloudflareImageURL(gotHandMeDowns.hotel.cloudflareImageURL);
    
    console.log(gotHandMeDowns.hotel.description);
    setHotelScore(gotHandMeDowns.hotel.score);
    setHotelPopularity(gotHandMeDowns.hotel.popularity);
    setSuffix(gotHandMeDowns.hotel.suffix);
    setNumberOfImages(gotHandMeDowns.hotel.numberOfImages);
    setDefaultImageIndex(gotHandMeDowns.hotel.defaultImageIndex);
    setHotelAddress(gotHandMeDowns.hotel.address);
    setHotelRating(Math.floor(gotHandMeDowns.hotel.rating));

    setHotelName(gotHandMeDowns.hotel.term)
    setHotelID(gotHandMeDowns.hotel.uid)
    setHotelLatitude(gotHandMeDowns.hotel.latitude)
    setHotelLongitude(gotHandMeDowns.hotel.longitude) 
    
    

    /*
    // FOR QUICK TEST
    setHotelDescription("abcdefg. sdads asdk asd sadasdsad asdas. asdjpojpsad asdsadsa asasdasdsada asdasa. sadsakd jalskdjl asljdlks alskdjl. ashdlkj aslkdjla aslkdjl aslkdjla asldjlk. asjdlkj asldkjlj aslkdjl jasdlkjaslkjd asldjalskj. asldkjaslk asjldkj aslkdj asljdlasklas. ashfoiewhoh saodihoi woaijd oasjdlksj.");
    setHotelCloudflareImageURL("");
    setHotelScore(0);
    setHotelPopularity(10);
    setSuffix(".jpg");
    setNumberOfImages(33);
    setDefaultImageIndex(1);
    setHotelAddress("Hotel Address #12-34");
    setHotelRating(Math.floor(3));
    setHotelName("Hotel Abc")
    setHotelID("")
    setHotelLatitude(0)
    setHotelLongitude(0)
    setIsLoaded(true);
    setRooms([{"key":"abc", "price": 100, "roomNormalizedDescription": "Single Room", "roomAdditionalInfo":{"breakfast_info":"hotel_detail_room_only"}, "free_cancellation":false},
                        {"key":"qwe", "price": 100, "roomNormalizedDescription": "Single Room", "roomAdditionalInfo":{"breakfast_info":"hotel_detail_breakfast_included"}, "free_cancellation":true},                      
                        {"key":"asf", "price": 100, "roomNormalizedDescription": "Double Room", "roomAdditionalInfo":{"breakfast_info":"hotel_detail_room_only"}, "free_cancellation":false},
                        {"key":"qew", "price": 100, "roomNormalizedDescription": "Double Room", "roomAdditionalInfo":{"breakfast_info":"hotel_detail_breakfast_included"}, "free_cancellation":true},
                      ]);
                      */
    
  }, [gotHandMeDowns.hotel]);



  const handleChooseRoom = (room) => {
    let buttonToColor = document.getElementById(room.key + "_CHOOSE");
    buttonToColor.style.color = "rgb(255, 140, 0)";
    console.log("ROOM CHOSEN:", room);
    setChosenRoom(room);
  };




  // if (error) {
  //   console.log("Error: ", error.message);

  //   return(<div style={{textAlign: "center"}}><h1>Error 404</h1></div>)
    
  // }

  // else if(!isLoaded){
  //   return <div> Loading... </div>
  // }

  // else{


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
  
  
    else if (isLoaded){

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
        console.log("Error: ", e);
        
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
    }








    return (

      <div className="HotelRoomDetails">
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className = "FilterBox">
          {/* <span style={{fontSize: "10px", background:"linear-gradient(white, white, white, cyan)"}}>

            Filters
          </span> */}

          <br></br>

          <div style={{position:"relative", left:20, top: 10}}>
          {/* <span >Max Price: </span> */}
          <input 
            type="range" 
            
            className = "SliderMax"
            min= {minSlider} 
            max={maxSlider} 
            value={sliderValueMax} 
            onMouseOver = {(e) => {e.target.valueAsNumber()}}
            onChange={(e) => {
              if(e.target.valueAsNumber < sliderValueMin + ((sliderValueMax -sliderValueMin)/2) ){
                if (e.target.valueAsNumber <= sliderValueMax){
                  setSliderValueMin(e.target.valueAsNumber); 
                  setMinPrice(parseInt(e.target.value));
  
                  console.log(minPrice, " ", maxPrice);
                }
              }
              else{
                if (e.target.valueAsNumber >= sliderValueMin){
                  setSliderValueMax(e.target.valueAsNumber); 
                  setMaxPrice(parseInt(e.target.value));
                  console.log(minPrice, " ", maxPrice);
                }

              }
            }}
            id="myRange" />

            <span style = {{ position :"relative" ,left:140, bottom:-3}}> ${sliderValueMax} </span>

            {/* <span>Min Price: </span> */}
            <input 
            type="range" 
 
            className = "SliderMin"
            min= {minSlider} 
            max= {maxSlider} 
            value={sliderValueMin} 
            onChange={(e) => {
              // if (e.target.valueAsNumber <= sliderValueMax){
              //   setSliderValueMin(e.target.valueAsNumber); 
              //   setMinPrice(parseInt(e.target.value));

              //   console.log(minPrice, " ", maxPrice);
              // }

              if(e.target.valueAsNumber < sliderValueMin + ((sliderValueMax -sliderValueMin)/2) ){
                if (e.target.valueAsNumber <= sliderValueMax){
                  setSliderValueMin(e.target.valueAsNumber); 
                  setMinPrice(parseInt(e.target.value));
  
                  console.log(minPrice, " ", maxPrice);
                }
              }
              else{
                if (e.target.valueAsNumber >= sliderValueMin){
                  setSliderValueMax(e.target.valueAsNumber); 
                  setMaxPrice(parseInt(e.target.value));
                  console.log(minPrice, " ", maxPrice);
                }
              }

            }}
            id="myRange" />

            <span style = {{ position :"relative", right:570, bottom:-4}}> ${sliderValueMin} </span>
            </div>





          <span>
            <select value={description} className="DescriptionDropdown" onChange={(e) => { setDescription(e.target.value); }}>
              <option value="Choose Room Type">Choose Room Type</option>
              {roomDescriptionArray.map((room) => <option key={room} value={room}> {room} </option>)}  {/*LowerCaseChange(room)} </option>)*/}
            </select>
          </span>

        </div>

        <br></br>
        <br></br>




        {/* ======================== Top Part (images and Title) ================== */}
        <div className="AllBoxes">
          <div className = "HotelPicTitlePartDiv">
              <div style={{
                width: "450px", 
                height: "350px", 
                left:110,
                border:"1px solid rgb(180,180,180)",
                zIndex:0,
               
                position:"relative"}}>
                
                
                <div style={{width: "450px", height: "350px", overflow:"hidden"}}>
                  <img key = {"" + hotelCloudflareImageURL + "/"+ hotelID + "/i" + currentIndex + suffix} 
                      src = {"" + hotelCloudflareImageURL + "/"+ hotelID + "/i" + currentIndex + suffix} 
                      alt = ""
                      /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                      style={{background:"rgb(40,40,40)", width: "150%", height:"150%", top:"-20%", left:"-20%", position:"relative", zIndex:0}} />

                </div>

                <span className = "HotelPicsNumbering">{currentIndex} / {numberOfImages}</span>

                <span 
                  className = {enlargingImageWordsHovering}
                  onMouseOver = {() => {setEnlargingImageWordsHovering("HotelPicsEnlargingWordsHover")}}
                  onMouseLeave = {() => {setEnlargingImageWordsHovering("HotelPicsEnlargingWordsNoHover")}}
                  onClick={() => {console.log(enlargingImageWordsHovering); setEnlargedImagesMode("flex")}}>Click here to enlarge image</span>
                

                
                <div style={{display:"flex", alignSelf:"center", flexDirection:"row", justifyContent:"space-between", position:"relative", top:"-210px"}}>
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


              <div style={{position:"inherit"}}>
                <h1 className = "HotelName">
                      {hotelName} 
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
                      <span style={{color: "rgb(180,180,180)" , fontSize: "15pt"}}>★</span> 
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


        <div className = "AllBoxes">
          <div style={{position:"relative", top:20, left: 20, paddingBottom:20, fontSize:25, fontWeight:"bold"}}>Hotel overview</div>
          
          <div style = {{flexWrap:'wrap', flex:1, marginLeft:20, marginTop:10, flexDirection:"column"}}>
            <div dangerouslySetInnerHTML={{__html: hotelDescription}} style={{whiteSpace:"pre-line", flexShrink:1, position:"static"}}/>
          </div>
       
          {/* {hotelDescHeadingNContent.filter((text) => (text !== "" && text !== "br/" && text !== "b" && text !== "p" && text !== "h" && text !== "br /" && text !== "/b" && text !== "/p" && text !== " "))
            .map( (text, index) => { 
              console.log(text, " ", index)
              if(index % 2 === 0 && ((text.split(" ")).length -1 <= 3)){
                return(
                  <>
                    <br></br>
                    <span style={{position:"relative", left: 20, float: "left", fontSize:"16pt", fontWeight:500, color:"black"}}>{text}</span>
                    <br></br>
                    <br></br>
                  </>)
              }
              else{
                return(
                  <>
                    <span style={{position:"relative", left: 20, float: "left", whiteSpace:"pre-wrap", fontSize: "12pt", color:"rgb(130,130,130)"}}>{text}</span>
                    <br></br>
                  </>)
              }
            })} 
          
        <br></br>
        <br></br>
        <br></br>
        <br></br> */}


        </div>
        

        {/* =================== HOTEL DESCRIPTION OUTPUT DISPLAY ====================== */}



       {/* ====================== NEXT button========================= */}
       <button style={{
          background:"rgb(255, 140, 0)",
          fontSize:30,
          color:"white",
          borderRadius:30,
          fontWeight:900,
          width:100,
          height:70,
          textAlign:"center",
          position: "fixed",
          top:700,
          left:1750,
          zIndex:20,
          border:"transparent"

        }} 
        onClick={finishStage}> ▶▶</button>
        {/* ====================== NEXT button========================= */}


        {/* =================== ROOMS OUTPUT DISPLAY ====================== */}

        <div style={{marginTop: 100}}>
          <div style ={{border:"0.5px solid rgb(240,240,240)"}}>
          { (error) ? 
              (<div className = "AllBoxes" /*style={{textAlign: "center", fontSize:"10px"}}*/> <div style={{textAlign:"center", height: 100}}>{console.log("Error: ", error.message)}<br></br> <h1>No Rooms Available</h1></div></div>)
      
            : (!isLoaded) ?
            (<div className = "AllBoxes" /*style={{textAlign: "center", fontSize:"10px"}}*/> <div style={{textAlign:"center", height: 100}}><br></br> <h1>Fetching Room...</h1></div></div>)
    
            : (<div>
                  {console.log("Rooms: ", rooms)}
                  {ShowRoomsOutput(rooms, minPrice, maxPrice, description)}
              </div>)
          }
          </div>

        </div>
        

        {/* =================== ROOMS OUTPUT DISPLAY ====================== */}




        {/* =================== MAP OUTPUT DISPLAY ====================== */}

        <div className = "AllBoxes">
          <div style={{fontSize:"25px", left:"20pt", top:"20pt", paddingBottom: 20, position:"relative", fontWeight:900 }}>Hotel Location</div>
          {() => {
            setHotelLatitude(gotHandMeDowns.hotel.latitude);
            setHotelLongitude(gotHandMeDowns.hotel.longitude); 
            console.log(hotelLatitude, " ", hotelLongitude);
            }}

            <div className = "MapGeneratorDiv"> <MapGenerator latitude = {hotelLatitude} longitude = {hotelLongitude}/></div>
        </div>


        {/* =================== MAP OUTPUT DISPLAY ====================== */}




        {/* ====================== Hotel Room Pic ENLARGE ========================= */}

        <div style={{zIndex:0, position:"fixed", display:enlargedImagesMode, justifyContent:"center", alignItems:"center", top:0, height:window.innerHeight, width:window.innerWidth}}>
          
          <div style={{
              width: "1000px", 
              height: "700px", 
              border:"1px solid black",
              position:"relative",
              zIndex:10
              }}>
              
              
              <div style={{width: "1000px", height: "700px", overflow:"hidden", alignSelf:"center", position:"relative", display:"flex", justifyContent:"space-evenly"}}>
                <img key = {"" + hotelCloudflareImageURL + "/"+ hotelID + "/i" + currentIndex + suffix} 
                    src = {"" + hotelCloudflareImageURL + "/"+ hotelID + "/i" + currentIndex + suffix} 
                    alt = ""
                    /*Reference: https://stackoverflow.com/questions/34660385/how-to-position-a-react-component-relative-to-its-parent */
                    style={{background:"rgb(40,40,40)", width: "100%", height:"100%", alignSelf:"center", position:"relative"}} />

              </div>

              <div className = "HotelPicsNumbering">{currentIndex} / {numberOfImages}</div>

              <div 
              className = {enlargedCloseHovering}
              onMouseOver = {() => {setEnlargingCloseHovering("HotelPicsEnlargedCloseHover")}}
              onMouseLeave = {()=> {setEnlargingCloseHovering("HotelPicsEnlargedCloseNoHover")}}
              onClick = {() => {setEnlargedImagesMode("none")}}
              >
                X Close  
              </div>
              

              
              <div style={{display:"flex", alignSelf:"center", justifyContent:"space-between", position:"relative", top:"-400px"}}>
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

              </div>
              <div 
                style={{background:"black", opacity:"90%", width:window.innerWidth, height:window.innerHeight, position:"absolute", zIndex:1}}
                onClick = {() => {console.log(enlargedImagesMode);setEnlargedImagesMode("none");console.log(enlargedImagesMode)}}
                ></div>
            </div>
        
 


      </div>
    );
}


export default HotelRoomDetails;










