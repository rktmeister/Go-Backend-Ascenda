import HotelRoomBox from './HotelRoomBox';
import handleChooseRoom from './../HotelRoomDetails.js'

function ShowRoomsOutput(rooms, minPrice, maxPrice, description){

    var index = 0;

    console.log(rooms);

 
    return ([]
            .concat(rooms)
            .filter((room) => (((room.price >= minPrice && room.price <= maxPrice) ) && 
              ((room.roomNormalizedDescription.charAt(room.roomNormalizedDescription.length - 1) !== " " && room.roomNormalizedDescription === description) || 
               (room.roomNormalizedDescription.charAt(room.roomNormalizedDescription.length - 1) === " " && room.roomNormalizedDescription.slice(0, room.roomNormalizedDescription.length - 1) === description) || 
               description === "Choose Room Type" ))
               )
            .sort((room1, room2) => 
                parseInt(room1.price) > parseInt(room2.price) ?  1 
                : parseInt(room1.price) < parseInt(room2.price) ? -1 
                : room1.roomNormalizedDescription > room2.roomNormalizedDescription ? 1
                : -1)
            .map((room) => {
                index = index+1;
                //<>
                    //<script></script>
                console.log("index: ", index);
                return (<> <HotelRoomBox room={room} key={room.key} index = {index} onClick={handleChooseRoom} /> <br></br> </>);
                //</>
                
                
            }));
}

export default ShowRoomsOutput;
