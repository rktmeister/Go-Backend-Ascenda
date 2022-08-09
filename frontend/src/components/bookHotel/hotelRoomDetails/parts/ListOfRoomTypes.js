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
                        .reduce((group, product) => { // just a fancy way to group rooms by roomNormalizedDescription
                            const { roomNormalizedDescription } = product;
                            group[roomNormalizedDescription] = group[roomNormalizedDescription] ?? [];
                            group[roomNormalizedDescription].push(product);
                            return group;
                        }, {})
                ).map(([description, roomList]) => {
                    console.log(roomList)
                    return (
                        <HotelRoomBox
                            description = {description}
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