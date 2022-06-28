// const getDestinationsByFuzzyString = (fuzzyDestinationName)
let exhaust = 4;

export const getHotelBatch = (hotelId, destinationId, before) => {
    exhaust--;
    if (exhaust == 0) return [];
    const res = [];
    for (let i = 0; i < 5; i++) {
        res.push({
            id: randomStringForTesting(5),
            name: randomStringForTesting(10),
        });
    }
    return res;
};

// credit to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// credit to https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const randomStringForTesting = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};