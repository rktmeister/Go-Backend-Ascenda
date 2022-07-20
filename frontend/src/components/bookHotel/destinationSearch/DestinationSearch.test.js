
import DestinationSearch from './DestinationSearch';


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

