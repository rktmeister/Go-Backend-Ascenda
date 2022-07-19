import { fireEvent, render, screen } from "@testing-library/react";
import HotelCard from "./HotelCard";

test("hotel card renders correctly", () => {
    expect.assertions(1);
    const someItem = { id: 12, price: 24, number_of_rooms: 36, name: "room1" };
    let obj = null;
    render(<HotelCard data-testid="hi" item={someItem} onClick={(x) => { obj = x; }} />);
    fireEvent.click(screen.getByRole("button"));
    expect(obj).toBe(someItem);
});