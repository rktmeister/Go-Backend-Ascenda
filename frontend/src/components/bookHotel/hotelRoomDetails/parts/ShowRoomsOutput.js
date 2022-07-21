import HotelRoomBox from './HotelRoomBox';
import handleChooseRoom from './../HotelRoomDetails.js'

function ShowRoomsOutput(rooms, minPrice, maxPrice, description){

    

    console.log(rooms);

    
    
    return ([]
            .concat(rooms)
            .filter((room) => (((room.price >= minPrice && room.price <= maxPrice) ) && 
              ((room.description.charAt(room.description.length - 1) !== " " && room.description === description) || 
               (room.description.charAt(room.description.length - 1) === " " && room.description.slice(0, room.description.length - 1) === description) || 
               description === "Choose Room Type" ))
               )
            .sort((room1, room2) => 
                parseInt(room1.price) > parseInt(room2.price) ?  1 
                : parseInt(room1.price) < parseInt(room2.price) ? -1 
                : room1.description > room2.description ? 1
                : -1)
            .map((room) => (
                
                <HotelRoomBox room={room} key={room.uid} onClick={handleChooseRoom} />
                
                
                )));
}

export default ShowRoomsOutput;
