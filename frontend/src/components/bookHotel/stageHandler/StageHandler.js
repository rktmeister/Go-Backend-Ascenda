import { useState, useEffect, cloneElement } from "react";

const StageHandler = (props) => {
    const [stage, setStage] = useState(0);
    const [activeComponent, setActiveComponent] = useState(props.stages[0]);
    const [sharedData, setSharedData] = useState(null);

    useEffect(() => {
        setActiveComponent(props.stages[stage])
    }, [stage]);

    const handleChangeStage = (dataToBePassedOn) => {
        console.log("PASSED ON:", dataToBePassedOn);
        setSharedData(dataToBePassedOn);
        setStage(stage + 1);
    };

    return (
        <div>
            {/* <ActiveComponent finishStage={handleChangeStage} /> */}
            {cloneElement(activeComponent, { finishStage: handleChangeStage, handMeDowns: sharedData })}
            <button onClick={() => console.log(sharedData)}>testfromshared</button>
        </div>
    );
}

export default StageHandler;