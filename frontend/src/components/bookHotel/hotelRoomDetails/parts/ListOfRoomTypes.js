import { useState } from "react";
import HotelRoomBox from "./HotelRoomBox";

const ListOfRoomTypes = (props) => {
    const handleChooseRoom = (room) => {
        props.handleChooseRoom(room);
    }

    return (
        <div>
            {
                Object.entries(
                    props.rooms.filter((room) => props.filters.every((filterFunc) => filterFunc(room)))
                        .reduce((group, product) => { // just fancy way to group stuff
                            const { roomNormalizedDescription } = product;
                            group[roomNormalizedDescription] = group[roomNormalizedDescription] ?? [];
                            group[roomNormalizedDescription].push(product);
                            return group;
                        }, {})
                ).map(([description, roomList]) => {
                    console.log(roomList)
                    return (
                        <HotelRoomBox
                            roomsSet={roomList}
                            key={description}
                            handleChooseRoom={handleChooseRoom}
                        />
                    );
                })
            }
        </div>
    );

};

export default ListOfRoomTypes;