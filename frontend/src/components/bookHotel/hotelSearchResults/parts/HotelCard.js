import { forwardRef, Fragment } from "react";
import HotelCardDescription from "./HotelCardDescription";
import sanitizeHTML from "sanitize-html";
import StarRatingDisplay from "../../common/StarRatingDisplay";

const HotelCard = forwardRef((props, ref) => {
    // const truncateDescription = (description) => {
    //     return description.substring(0, 50)
    // };




    return (
        <div data-testid="hotelCard" ref={ref}>
            {
                props.item ?
                    <div className="card row" style={{ backgroundColor: "dodgerblue", height: props.height }}>
                        <div className="col-6">
                            <img src={props.item.defaultImageURL} className="img-responsive col-12" alt="" />
                        </div>
                        <div className="col-6">
                            <div className="card-header">
                                <span data-testid={"HotelSearchResults_" + props.item.term + "_" + props.item.price + "_" + props.item.rating} >Price: ${props.item.price} Rating: <StarRatingDisplay rating={props.item.rating} /></span>
                            </div>
                            <div className="card-body">
                                <blockquote data-testid={"HotelSearchResults_" + props.item.term} className="blockquote mb-0">
                                    <p className="card-title">{props.item.term}</p>
                                    {/* <button onClick={() => console.log(props)}>hi</button> */}
                                    <footer className="blockquote-footer">
                                        {/* <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(props.item.description) }} /> */}description
                                    </footer>

                                    <button id={`hotelCard${props.item.uid}`} data-testid={"HotelSearchResults_" + props.item.term + "_Button"} onClick={() => props.onClick(props.item)}>CHOOSE</button>


                                </blockquote>
                            </div>
                        </div>
                    </div> :
                    <div>ERROR: HOTEL NOT FOUND</div>
            }
        </div>
    );
});

export default HotelCard;