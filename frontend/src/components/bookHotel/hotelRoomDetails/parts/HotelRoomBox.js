const HotelRoomBox = (props) => {

    return (

        <div className="HotelRoomBox">
            <br></br>

            <span className="HotelRoomBoxLeft">{props.description}</span>
            {<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>}
            <span className="HotelRoomBoxRight">{props.price}</span>
            <br></br>
            <br></br>
            <br></br>
            <br></br>


        </div>
    );

};

export default HotelRoomBox;