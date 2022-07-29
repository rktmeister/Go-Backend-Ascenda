const FilterShow = (props) => {
    return (
        <div>
            FILTERS:
            <div>
                Number of rooms: {props.currentFilterData.numberOfRooms}
            </div>
            <div>
                Dates: {props.currentFilterData.checkInDate} to {props.currentFilterData.checkOutDate}
            </div>
            <div>
                Price: ${props.currentFilterData.minPrice} to ${props.currentFilterData.maxPrice}
            </div>
            CHOICE:
            <div>
                {props.choice}
            </div>
        </div>
    )
};

export default FilterShow;