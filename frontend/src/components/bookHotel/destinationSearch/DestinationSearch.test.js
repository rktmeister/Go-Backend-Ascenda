import { fireEvent, render, screen } from '@testing-library/react';
import DestinationSearch from './DestinationSearch';
import { act } from 'react-dom/test-utils';
import userEvent, { user } from "@testing-library/user-event";
import { keyboard } from '@testing-library/user-event/dist/keyboard';

const mockDestination = (uid) => {
    return {
        uid,
        term: uid.toString(),
    };
}

test("destination search displays correctly", async () => {
    expect.assertions(16);
    render(<DestinationSearch
        backendPackage={{
            getDestinationsByFuzzyString: async (searchWord) => {
                console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
                return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);
            }
        }}
    />);
    const input = screen.getByTestId("fuzzyInput");
    // fireEvent.change(input, { target: { value: "1" } });
    input.focus();
    userEvent.keyboard("1");
    const ls = await screen.findAllByTestId("destinationCard");
    console.log(ls);
    expect(ls.length).toBe(15);

    for (let i = 0; i < 15; i++) {
        expect(ls[i].innerHTML).toBe(i.toString());
    }


});