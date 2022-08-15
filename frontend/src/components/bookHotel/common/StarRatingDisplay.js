import { MdStarRate } from "react-icons/md";

const StarRatingDisplay = (props) => {
    return (
            <span>
                {
                    [...Array(Math.floor(props.rating))].map((_, i) => <MdStarRate />)
                }
                {
                    props.rating !== Math.floor(props.rating) ? "half" : ""
                }
            </span>
    )
};

export default StarRatingDisplay;