import { fireEvent, render, screen } from "@testing-library/react";
import HotelCard from "./HotelCard";
import * as router from 'react-router'

const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

const mockDestination = (uid) => {
    return {
        uid,
        term: uid.toString(),
    };
}
test("hotel card callback passes the correct object", () => {
    expect.assertions(1);
    const someItem = { id: 12, price: 24, number_of_rooms: 36, rating:5, name: "room1" };
    let obj = null;
    render(<HotelCard data-testid="hi" item={someItem} onClick={(x) => { obj = x; }} />);
    fireEvent.click(screen.getByRole("button"));
    expect(obj).toBe(someItem);
});