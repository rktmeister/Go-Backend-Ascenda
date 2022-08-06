import { fireEvent, render, screen } from '@testing-library/react';
import DestinationSearch from './DestinationSearch';
import { act } from 'react-dom/test-utils';
import userEvent, { user } from "@testing-library/user-event";
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { BrowserRouter } from 'react-router-dom';

const mockDestination = (uid) => {
    return {
        uid,
        term: uid.toString(),
    };
}

test("destination search displays correctly", async () => {
    expect.assertions(16);
    render(<BrowserRouter><DestinationSearch
        backendPackage={{
            getDestinationsByFuzzyString: async (searchWord) => {
                console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
                return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);
            }
        }}
    /></BrowserRouter>); 
    const input = screen.getByTestId("fuzzyInput");
    // fireEvent.change(input, { target: { value: "1" } });
    input.focus();
    userEvent.keyboard("1");
    const ls = await screen.findAllByTestId("destinationCard");
    console.log("ls is: ", ls);
    console.log(screen.debug())
    expect(ls.length).toBe(15);

    for (let i = 0; i < 15; i++) {
        expect(ls[i].innerHTML).toBe(i.toString());
    }


});


// test('renders learn react link', () => {
//   render(<DestinationSearch />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('Transform Uppercase', () =>{
//   expect(UpperCaseChange("SINGAPORE")).toBe("singapore");

// });

// Arrays
test('India should be in destination' , ()=>{
  const destination = ['Singapore', 'Finland', 'India'];
  expect(destination).toContain('India');
});

// Test if Function Exist
test("DestinationSearch", () => {
  expect(DestinationSearch).toBeDefined();
});





// // Promise
// test('Destination fetched name should be India', () => {
//   expect.assertions(1);  // MUST HAVE
//   return getDestinationsByFuzzyString.fetchRoom()
//   .then( data => {
//     expect(data.name).toEqual('India');
//   });
// });

// // Async Await
// test('Destination fetched name should be India'), async () => {
//   expect.assertions(1);  // MUST HAVE
//   const data = await getDestinationsByFuzzyString.fetchRoom()
  
//   expect(data.name).toEqual('india');

// });
