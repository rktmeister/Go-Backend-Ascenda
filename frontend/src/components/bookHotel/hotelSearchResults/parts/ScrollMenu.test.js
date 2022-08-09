import { fireEvent, getAllByRole, getAllByText, render, screen } from "@testing-library/react";
import ScrollMenu from "./ScrollMenu";
import HotelCard from "./HotelCard";

const mockHotel = (uid) => {
    const res = {
        uid,
        term: uid.toString(),
        number_of_rooms: uid,
        price: uid,
        rating: uid,
        latitude: uid,
        longitude: uid,
        description: uid.toString(),
    };
    //console.log(res);
    return res;
}

test("scroll menu loads items initially", async () => {
    let idx = 100;
    let itemList = [1, 2, 3, 4, 5].map(mockHotel);
    render(<ScrollMenu
        items={itemList}
        itemMapping={(item) => {
            return (
                <HotelCard key={item.uid} item={item} height={200} onClick={() => item.uid} />
            );
        }}
        getMore={() => {
            idx++;
            return mockHotel(idx);
        }}
    />);
    expect(screen.getAllByTestId("hotelCard").length).toBe(5);

});

// test("scroll menu can get more hotels", async () => {
//     await new Promise(res => setTimeout(() => {
//         let idx = 100;
//         let itemList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(mockHotel);
//         render(<ScrollMenu
//             items={itemList}
//             itemMapping={(item) => {
//                 return (
//                     <HotelCard key={item.uid} item={item} height={200} onClick={() => item.uid} />
//                 );
//             }}
//             getMore={() => {
//                 idx++;
//                 return mockHotel(idx);
//             }}
//             haveMore={() => true}
//         />);
//         for (let i = 0; i < 2; i++) {
//             fireEvent.click(screen.getByTestId("loadButton"));
//         }
//         expect(screen.getAllByTestId("hotelCard").length).toBe(5);
//         expect(idx).toBe(100);
//         res();
//     }, 10000))

// });

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
