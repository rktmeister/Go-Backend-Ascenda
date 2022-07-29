// const getDestinationsByFuzzyString = (fuzzyDestinationName)
let exhaust = 20;

const MOCK = false;

export const DB_ADDRESS = "http://localhost:3000/api";

export const getStripePrice = async (hotelId) => {
    await delay();
    return "price_1LMX2uAML4yM4v0zWPOXMEa1";
}

export const getHotelBatch = async (destinationId, checkInDate, checkOutDate, numberOfRooms) => {
    if (MOCK) {
        exhaust -= 1;
        if (exhaust <= 0) return [];
        const res = [];
        for (let i = 0; i < 5; i++) {
            const name = randomStringForTesting(10, "A".charCodeAt(0) - 64);
            res.push({
                uid: randomStringForTesting(5, 0),
                term: name,
                number_of_rooms: Math.floor(Math.random() * 10),
                price: Math.random() * 10,
                latitude: 47.6000,
                longitude: 3.5333,
                description: "some description",
            });
        }
        await delay();
        return res;
    } else {
        const res = await fetch(formatQueryParameters(
            DB_ADDRESS,
            "/hotels/destination",
            {
                //"hotelId": hotelId,
                "destination": destinationId,
                "checkin": checkInDate,
                "checkout": checkOutDate,
                "guests": numberOfRooms,
            }
        )).then((response) => {
            return response.json();
        });

        if (res.hotel_price === null) {
            return {
                error: "No hotels found",
            };
        }

        console.log("GOT HOTELS:", res);
        const transformedResults = res.hotel_price.map(({ HotelBriefDescription, Id, Price }) => {
            const defaultImageURL = `${HotelBriefDescription.cloudflare_image_url}/${Id}/i${HotelBriefDescription.default_image_index}${HotelBriefDescription.image_details.suffix}`;
            return {
                uid: Id,
                latitude: HotelBriefDescription.latitude,
                longitude: HotelBriefDescription.longitude,
                term: HotelBriefDescription.name,
                price: Price,
                address: HotelBriefDescription.address,
                rating: HotelBriefDescription.rating,
                defaultImageURL,
                categories: HotelBriefDescription.categories,
                description: HotelBriefDescription.Description,

                cloudflareImageURL: HotelBriefDescription.cloudflare_image_url,
                suffix: HotelBriefDescription.image_details.suffix,
                numberOfImages: HotelBriefDescription.number_of_images,
                defaultImageIndex: HotelBriefDescription.default_image_index,
                score: HotelBriefDescription.categories.overall.score,
                popularity: HotelBriefDescription.categories.overall.popularity,
            };
        })
        return transformedResults;
    }
};

export const getHotelRoomBatch = async (hotelId, destinationUid, checkInDate, checkOutDate, numberOfRooms) => {
    if (MOCK) {
        // return await fetch("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
        //     .then(res => res.json());
        return [
            {
                price: Math.floor(Math.random() * 20000),
                description: randomStringForTesting(10, "A".charCodeAt(0) - 64),
                uid: randomStringForTesting(5, 0),
            }
        ];
    } else {
        const res = await fetch(formatQueryParameters(
            DB_ADDRESS,
            "/room/hotel",
            {
                "hotelId": hotelId,
                "destination_id": destinationUid,
                "checkin": checkInDate,
                "checkout": checkOutDate,
                "guests": numberOfRooms,
            }
        )).then((response) => {
            return response.json();
        });

        console.log("res is: ", res);

        const res2 = {
            description: res.hotelDesc.description,
            uid: res.hotelDesc.id,
            cloudflareImageURL: res.hotelDesc.cloudflare_image_url,
            suffix: res.hotelDesc.image_details.suffix,
	        numberOfImages : res.hotelDesc.number_of_images,
	        defaultImageIndex : res.hotelDesc.default_image_index,
            score: res.hotelDesc.categories.overall.score,
            popularity: res.hotelDesc.categories.overall.popularity,
            address: res.hotelDesc.address,
            rating: res.hotelDesc.rating,
            rooms: res
        };
        return res2;
        // return res;
    }
}

export const attemptLogin = async (email, passwordHash) => {
    await delay();
    return {
        token: "change this later",
        email: "testemail@gmail.com",
    };
};

export const sendSuccessfulPayment = async (name, phoneNumber, userEmail, specialRequests) => {
    if (MOCK) {
        await delay();
        return {
            acknowledged: true,
        };
    } else {
        const res = await fetch(formatQueryParameters(
            DB_ADDRESS,
            "/booking/logSuccess",
            {
                "name": name,
                "phoneNumber": phoneNumber,
                "userEmail": userEmail,
                "specialRequests": specialRequests,
            }
        ), {
            method: "post",
        });
        return res;
    }
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
        console.log(queryName, value);
        request += queryName.toString() + "=" + value.toString() + "&";
    });
    request = request.slice(0, -1);
    return request;
};

export const getDestinationsByFuzzyString = async (fuzzyDestinationName) => {
    if (MOCK) {
        await delay();
        return [
            {
                uid: 329,
                term: "Singapore",
            },
            {
                uid: 52,
                term: "India",
            },
            {
                uid: 130,
                term: "Finland",
            },
        ];
    } else {
        // const res = await fetch(formatQueryParameters(
        //     DB_ADDRESS,
        //     "/destinations/fuzzyName",
        //     {
        //         "search":fuzzyDestinationName,
        //     }
        // ));
        // const reader = res.body.getReader();

        // console.log(res);
        // return res;

        const res = await fetch(formatQueryParameters(
            DB_ADDRESS,
            "/destinations/fuzzyName",
            {
                "search": fuzzyDestinationName,
            }
        )).then((response) => {
            return response.json();
        });
        return res;
    }
}

// const getDestinationsByFuzzyString = (fuzzyDestinationName) => {
//     return [
//         data={[{title: "azerbaijan"}, {title: "singapore"}]}  
        
//     ];
// }