const HotelRoomBox = (props) => {

    return (
        <div className="HotelRoomBox">
            <br></br>
            <span className="HotelRoomBoxLeft">{props.room.description}</span>
            {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>}
            <span className="HotelRoomBoxRight">{props.room.price}</span>
            <button onClick={() => props.onClick(props.room)}>Choose</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );

};

export default HotelRoomBox;