const DestinationCard = (props) => {
    return (
        <button id={`destinationCard${props.value.uid}`} data-testid={"destinationCard_"+props.value.term} onClick={() => props.onClick(props.value)}>{props.value.term}</button>
    );
};

export default DestinationCard;