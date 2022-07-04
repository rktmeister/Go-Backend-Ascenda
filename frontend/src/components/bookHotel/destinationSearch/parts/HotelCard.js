const HotelCard = (props) => {
    return (
        <div className="card" style={{ backgroundColor: "dodgerblue", height: props.height }}>
            <div className="card-header">
                ID: {props.id}
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <p>Name: {props.name}</p>
                    <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
            </div>
        </div>
    );
};

export default HotelCard;