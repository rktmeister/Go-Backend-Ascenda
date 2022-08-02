import { MdStarRate } from "react-icons/md";

const StarRatingDisplay = (props) => {
    return (
        <div>
            {
                [...Array(props.rating)].map((_, i) => <MdStarRate />)
            }
        </div>
    )
};

export default StarRatingDisplay;