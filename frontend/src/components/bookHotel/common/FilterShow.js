const FilterShow = (props) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex">
                    <p className="text-left">FILTERS:</p>
                </div>
                <div className="column">
                    <div className="row">
                        <div className="col-lg d-flex">
                            <p className="text-left">Number of rooms: {props.currentFilterData.numberOfRooms}</p>
                        </div>
                        <div className="col-lg d-flex">
                            <p className="text-left">Dates: {props.currentFilterData.checkInDate} to {props.currentFilterData.checkOutDate}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg d-flex">
                            <p className="text-left">Price: ${props.currentFilterData.minPrice} to ${props.currentFilterData.maxPrice}</p>
                        </div>
                        <div className="col-lg d-flex">
                            <p className="text-left">CHOICE: {props.choice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FilterShow;