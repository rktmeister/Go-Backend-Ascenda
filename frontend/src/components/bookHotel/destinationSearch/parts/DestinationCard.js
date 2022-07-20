const DestinationCard = (props) => {
    return (
        <button onClick={() => props.onClick(props.value)}>{props.value.term}</button>
    );
};

export default DestinationCard;