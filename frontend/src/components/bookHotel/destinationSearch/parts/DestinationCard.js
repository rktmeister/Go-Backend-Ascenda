const DestinationCard = (props) => {
    return (
        <button id={`destinationCard${props.value.uid}`} data-testid="destinationCard" onClick={() => props.onClick(props.value)}>{props.value.term}</button>
    );
};

export default DestinationCard;