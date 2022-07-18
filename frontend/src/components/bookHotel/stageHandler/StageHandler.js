import { useState, useEffect, cloneElement } from "react";

const StageHandler = (props) => {
    const [stage, setStage] = useState(0);
    const [activeComponent, setActiveComponent] = useState(props.stages[0]);

    useEffect(() => {
        setActiveComponent(props.stages[stage])
    }, [stage]);

    const handleChangeStage = () => {
        setStage(stage + 1);
    };

    return (
        <div>
            {/* <ActiveComponent finishStage={handleChangeStage} /> */}
            {cloneElement(activeComponent, { finishStage: handleChangeStage })}
        </div>
    );
}

export default StageHandler;