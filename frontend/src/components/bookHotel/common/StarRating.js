const StarRating = (props) => {
    let i = 0;
    return (
        <span className="HotelRatings">
            {[...Array(props.rating)].map(() => {
                i += 1;
                return (

                    <span key= {props.hotelName + i} style={{ color: "#FFAE42", fontSize: "15pt" }}>★</span>

                )
            })}

            {[...Array(props.totalPossibleStars - props.rating)].map(() => {
                i += 1;
                return (
                    <span key= {props.hotelName + i}  style={{ color: "rgb(180,180,180)", fontSize: "15pt" }}>★</span>
                )
            })}
        </span>
    );
};

export default StarRating;