const DestinationCard = (props) => {
    return (
        <button data-testid="destinationCard" onClick={() => props.onClick(props.value)}>{props.value.term}</button>
    );
};

export default DestinationCard;