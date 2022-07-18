// const getDestinationsByFuzzyString = (fuzzyDestinationName)
let exhaust = 20;

export const getStripePrice = async (hotelId) => {
    await delay();
    return "price_1LMX2uAML4yM4v0zWPOXMEa1";
}

export const getHotelBatch = async (hotelId, destinationId, before) => {
    exhaust -= 1;
    if (exhaust <= 0) return [];
    const res = [];
    for (let i = 0; i < 5; i++) {
        const name = randomStringForTesting(10, hotelId.charCodeAt(0) - 64);
        res.push({
            id: randomStringForTesting(5, 0),
            name: name,//randomStringForTesting(10, hotelId.charCodeAt(0)),
            number_of_rooms: Math.floor(Math.random() * 10),
            price: Math.random() * 10,
        });
    }
    await delay();
    return res;
};

export const attemptLogin = async (email, passwordHash) => {
    await delay();
    return {
        token: "change this later",
        email: "testemail@gmail.com",
    };
};

export const sendSuccessfulPayment = async (successfulPayment) => {
    await delay();
    return {
        acknowledged: true,
    };
};

// credit to https://stackoverflow.com/questions/20334486/simulate-a-timed-async-call
const delay = async (delay = 1000, callback = () => { }) => {

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
//data={[{title: "azerbaijan"}, {title: "singapore"}]}
export const getDestinationsByFuzzyString = (fuzzyDestinationName) => {
    return { data :[
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
 
 
         }
       ]
    };
}

// const getDestinationsByFuzzyString = (fuzzyDestinationName) => {
//     return [
//         data={[{title: "azerbaijan"}, {title: "singapore"}]}  
        
//     ];
// }