import { fireEvent, render, screen } from "@testing-library/react";
import ScrollMenu from "./ScrollMenu";

test("scroll menu displays correctly", async () => {
    expect.assertions(2);
    let extent = 0;
    render(<ScrollMenu
        items={[]}
        itemMapping={() => { }}
        onScroll={(position) => {
            extent = position;
        }}
    />);
    await fireEvent.scroll(screen.getByTestId("hi"), { target: { scrollTop: 623 } });
    expect(extent).not.toBe(123);
    expect(extent).toBe(623);
});

// test("scroll menu displays correctly", () => {
//     expect.assertions(1);
//     render(<ScrollMenu
//         items={Array(100)}
//         itemMapping={() => {
//             return <div style={{ height: 10 }}></div>;
//         }}
//         onScroll={(position) => {
//         }}
//     />);
// });
