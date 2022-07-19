import { fireEvent, render, screen } from '@testing-library/react';
import StageHandler from './StageHandler';

const StageHandlerTester = (props) => {
    const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];
    const handleClick = () => {
        const dataToBePassedOn = {
            ...gotHandMeDowns,
            [props.k]: props.v,
        };
        props.handMeDowns.push(dataToBePassedOn);
        props.finishStage(props.handMeDowns);
    };
    return (
        <div>
            <button onClick={handleClick} data-testid="next">Next</button>
            <button onClick={() => props.extractHandMeDowns(props.handMeDowns)} data-testid="see">See</button>
        </div>
    );
};

test("StageHandler", () => {
    expect.assertions(1);
    let obj = null;
    const stagesArr = [
        <StageHandlerTester k="a" v={1} />,
        <StageHandlerTester k="b" v={2} />,
        <StageHandlerTester k="c" v={3} />,
        <StageHandlerTester k="d" v={4} />,
        <StageHandlerTester k="e" v={5} extractHandMeDowns={(x) => { obj = x; }} />,
    ];
    render(<StageHandler stages={stagesArr} />);
    for (let i = 0; i < stagesArr.length - 1; i++) {
        fireEvent.click(screen.getByTestId("next"));
    }
    fireEvent.click(screen.getByTestId("see"));
    expect(obj).toStrictEqual([
        {},
        { "a": 1 },
        { "a": 1, "b": 2 },
        { "a": 1, "b": 2, "c": 3 },
        { "a": 1, "b": 2, "c": 3, "d": 4 },
    ]);
});