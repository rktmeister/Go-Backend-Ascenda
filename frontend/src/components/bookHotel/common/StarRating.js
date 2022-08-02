const StarRating = (props) => {
    return (
        <span className="HotelRatings">
            {[...Array(props.rating)].map(() => {
                return (

                    <span style={{ color: "#FFAE42", fontSize: "15pt" }}>★</span>

                )
            })}

            {[...Array(props.totalPossibleStars - props.rating)].map(() => {
                return (
                    <span style={{ color: "rgb(180,180,180)", fontSize: "15pt" }}>★</span>
                )
            })}
        </span>
    );
};

export default StarRating;