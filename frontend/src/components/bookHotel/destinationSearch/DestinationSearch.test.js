import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import DestinationSearch from './DestinationSearch';

import * as router from 'react-router';

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

test("destination search displays correctly", async () => {
    //expect.assertions(16);
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
    expect(ls.length).toBe(5);
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
