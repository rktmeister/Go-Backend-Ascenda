import { forwardRef } from "react";

const HotelCard = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            {
                props.item ?
                    <div className="card" style={{ backgroundColor: "dodgerblue", height: props.height }}>
                        <div className="card-header">
                            ID: {props.item.uid}, Price: {props.item.price} Rating: {props.item.rating}
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>Name: {props.item.term}</p>
                                <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                                <button onClick={() => props.onClick(props.item)}>CHOOSE</button>
                                <button onClick={() => props.onClick(ref)}>TEST</button>
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