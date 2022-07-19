import { fireEvent, render, screen } from "@testing-library/react";
import ScrollMenu from "./ScrollMenu";

test("scroll menu displays correctly", async () => {
    expect.assertions(1);
    let extent = 0;
    render(<ScrollMenu
        items={Array(100)}
        itemMapping={() => {
            return <div style={{ height: 10 }}></div>;
        }}
        onScroll={(position) => {
            console.log("K")
            extent = position;
        }}
    />);
    await fireEvent.scroll(screen.getByTestId("hi"), { target: { scrollY: 600 } });
    console.log("L", extent);
    expect(extent).toBe(1000);
});