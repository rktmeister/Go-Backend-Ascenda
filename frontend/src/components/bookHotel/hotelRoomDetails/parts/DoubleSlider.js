const DoubleSlider = (props) => {
    const manipulateMinMaxValues = (e) => {
        if (e.target.valueAsNumber < props.lowerSliderValue + ((props.upperSliderValue - props.lowerSliderValue) / 2)) {
            props.setLowerSliderValue(e.target.valueAsNumber);
        } else {
            props.setUpperSliderValue(e.target.valueAsNumber);
        }
    };

    return (
        <div>
            <input
                type="range"
                className="SliderMax"
                min={props.lowerLimit}
                max={props.upperLimit}
                value={props.upperSliderValue}
                onChange={manipulateMinMaxValues}
                id="myRange"
            />
            <span style={{ position: "relative", left: 140, bottom: -3 }}> ${props.upperSliderValue} </span>
            <input
                type="range"
                className="SliderMin"
                min={props.lowerLimit}
                max={props.upperLimit}
                value={props.lowerSliderValue}
                onChange={manipulateMinMaxValues}
                id="myRange"
            />
            <span style={{ position: "relative", right: 570, bottom: -4 }}> ${props.lowerSliderValue} </span>
        </div>
    )
};

export default DoubleSlider;