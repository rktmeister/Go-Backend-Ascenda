// const getDestinationsByFuzzyString = (fuzzyDestinationName)
let exhaust = 20;

export const DB_ADDRESS = "http://localhost:3000/api";

export const getStripePrice = async (hotelId) => {
    await delay();
    return "price_1LMX2uAML4yM4v0zWPOXMEa1";
}

export const getHotelBatch = async (hotelId, destinationId, checkInDate, checkOutDate, numberOfRooms) => {
    // const res = await fetch(formatQueryParameters(
    //     DB_ADDRESS,
    //     "/hotels/destination",
    //     {
    //         "hotelId": hotelId,
    //         "destinationId": destinationId,
    //         "checkInDate": checkInDate,
    //         "checkOutDate": checkOutDate,
    //         "numberOfRooms": numberOfRooms,
    //     }
    // ));


    exhaust -= 1;
    if (exhaust <= 0) return [];
    const res = [];
    for (let i = 0; i < 5; i++) {
        const name = randomStringForTesting(10, "A".charCodeAt(0) - 64);
        res.push({
            id: randomStringForTesting(5, 0),
            name: name,//randomStringForTesting(10, hotelId.charCodeAt(0)),
            number_of_rooms: Math.floor(Math.random() * 10),
            price: Math.random() * 10,
            latitude: 47.6000,
            longitude: 3.5333,
            description: "some description",
        });
    }
    await delay();
    return res;
};

export const getHotelRoomBatch = async (hotelId, checkInDate, checkOutDate, numberOfRooms) => {
    // const res = await fetch(formatQueryParameters(
    //     DB_ADDRESS,
    //     "/room/hotel",
    //     {
    //         "hotelId": hotelId,
    //         "checkInDate": checkInDate,
    //         "checkOutDate": checkOutDate,
    //         "numberOfRooms": numberOfRooms,
    //     }
    // ))
    // return res;
    return await fetch("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
        .then(res => res.json());
}

export const attemptLogin = async (email, passwordHash) => {
    await delay();
    return {
        token: "change this later",
        email: "testemail@gmail.com",
    };
};

export const sendSuccessfulPayment = async (name, phoneNumber, userEmail, specialRequests) => {
    // const res = await fetch(formatQueryParameters(
    //     DB_ADDRESS,
    //     "/booking/logSuccess",
    //     {
    //         "name": name,
    //         "phoneNumber": phoneNumber,
    //         "userEmail": userEmail,
    //         "specialRequests": specialRequests,
    //     }
    // ), {
    //     method: "post",
    // });
    // return res;
    await delay();
    return {
        acknowledged: true,
    };
};

// credit to https://stackoverflow.com/questions/20334486/simulate-a-timed-async-call
export const delay = async (delay = 1000, callback = () => { }) => {

    const delayPromise = ms => new Promise(res => setTimeout(res, ms));
    await delayPromise(delay);

    callback();
}

// credit to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// credit to https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const randomStringForTesting = (length, min) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * (charactersLength - min + 1) + min));
    }
    return result;
};

export const formatQueryParameters = (baseAddress, endpoint, params) => {
    let request = baseAddress + endpoint + "?";
    Object.entries(params).forEach(([queryName, value]) => {
        request += queryName.toString() + "=" + value.toString() + "&";
    });
    request = request.slice(0, -1);
    return request;
};

export const getDestinationsByFuzzyString = async (fuzzyDestinationName, checkInDate, checkOutDate, numberOfRooms) => {
    // const res = await fetch(formatQueryParameters(
    //     DB_ADDRESS,
    //     "/destinations/fuzzyName",
    //     {
    //         "fuzzyName": fuzzyDestinationName,
    //         "checkInDate": checkInDate,
    //         "checkOutDate": checkOutDate,
    //         "numberOfRooms": numberOfRooms,
    //     }
    // ));
    // return res;
    await delay();
    return {
        data: [
            {
                id : 329,
                name : "Singapore",
            },
            {
                id : 52,
                name : "India",
            },
            {
                id : 130,
                name : "Finland",
            },
        ],
    };
}

// const getDestinationsByFuzzyString = (fuzzyDestinationName) => {
//     return [
//         data={[{title: "azerbaijan"}, {title: "singapore"}]}  
        
//     ];
// }