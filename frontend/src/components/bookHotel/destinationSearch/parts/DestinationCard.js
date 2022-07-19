const DestinationCard = (props) => {
    return (
        <button onClick={() => props.onClick(props.value.name)}>{props.value.name}</button>
    );
};

export default DestinationCard;