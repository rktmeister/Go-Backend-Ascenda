import { forwardRef, Fragment } from "react";
import HotelCardDescription from "./HotelCardDescription";
import sanitizeHTML from "sanitize-html";
import StarRatingDisplay from "../../common/StarRatingDisplay";

const HotelCard = forwardRef((props, ref) => {
    // const truncateDescription = (description) => {
    //     return description.substring(0, 50)
    // };




    return (
        <div id={`hotelCard${props.item.uid}`} data-testid="hotelCard" ref={ref}>
            {
                props.item ?
                    <div className="card" style={{ backgroundColor: "dodgerblue", height: props.height }}>
                        <div className="card-header">
                            <span>ID: {props.item.uid}, Price: ${props.item.price} Rating: <StarRatingDisplay rating={props.item.rating} /></span>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>Name: {props.item.term}</p>
                                {/* <button onClick={() => console.log(props)}>hi</button> */}
                                <footer className="blockquote-footer">
                                    {/* <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(props.item.description) }} /> */}description
                                </footer>
                                <button onClick={() => props.onClick(props.item)}>CHOOSE</button>
                                <img src={props.item.defaultImageURL} width={props.height / 10} alt="" />
                            </blockquote>
                        </div>
                    </div> :
                    <div>ERROR: HOTEL NOT FOUND</div>
            }
        </div>
    );
});

export default HotelCard;