import { screen, render } from "@testing-library/react";
import fuzzer from "../../../../fuzzing/fuzzer";
import ListOfRoomTypes from "./ListOfRoomTypes";

test("renders properly with fuzzed rooms", () => {
    fuzzer.activate();
    const exemplarRoom = {
        "key": "B29A71D2E1F875E05E48813D56E1F068",
        "roomNormalizedDescription": "Double Single Use Comfort",
        "free_cancellation": false,
        "images": [
            {
                "url": "https://photos.hotelbeds.com/giata/bigger/36/360997/360997a_hb_ro_007.jpg"
            }
        ],
        "price": 364.4,
        "roomAdditionalInfo": {
            "breakfast_info": ""
        }
    };

    render(<ListOfRoomTypes
        rooms={
            Array.from(Array(10).keys()).map((_) => fuzzer.ifActive.boundarify(exemplarRoom))
        }
        filters={[
            (_) => true,
        ]}
    />);
    fuzzer.deactivate();
});

test("renders properly with no rooms prop", async () => {
    render(<ListOfRoomTypes
        filters={[
            (_) => true,
        ]}
    />);
    const noRoomHandler = await screen.findByTestId("noRoomHandler");
    expect(noRoomHandler.innerHTML).toBe("No rooms!");
});

test("does not crash with bad rooms", async () => {
    render(<ListOfRoomTypes
        rooms={[]}
        filters={[
            (_) => true,
        ]}
    />);
});