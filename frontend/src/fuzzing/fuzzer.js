let IS_ACTIVE = false;

const pickUniqueIndicesAtRandom = (lengthOfArray, numberOfPicks) => {
    return [...Array(lengthOfArray).keys()].sort(() => 0.5 - Math.random()).slice(0, numberOfPicks);
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

const randomCharacter = () => {

}

const activationWrapper = (func) => (original, ...args) => {
    if (IS_ACTIVE) {
        return func(original, ...args);
    } else {
        return original;
    }
};

const selectRandomElement = (arr) => arr[randomInteger(null, 0, arr.length)];
const swapArrayElement = (orig, arr) => selectRandomElement(arr);

const booleanNegate = (orig) => !orig;
const injectZero = (orig) => 0;
const numericalNegative = (orig) => -orig;
const injectNan = (orig) => NaN;
const injectPositiveInfinity = (orig) => Number.POSITIVE_INFINITY;
const injectNegativeInfinity = (orig) => Number.NEGATIVE_INFINITY;
const injectNull = (orig) => null;
const injectUndefined = (orig) => undefined;
const floatify = (orig) => orig + Math.random();
const injectBigNumber = (orig) => Number.MAX_SAFE_INTEGER;
const injectSmallNumber = (orig) => Number.MIN_SAFE_INTEGER;

const injectDangerousNumber = (orig) => {
    const mutators = [
        booleanNegate,
        injectZero,
        numericalNegative,
        injectNan,
        injectPositiveInfinity,
        injectNegativeInfinity,
        injectNull,
        injectUndefined,
        floatify,
        injectBigNumber,
        injectSmallNumber,
    ];
    return selectRandomElement(mutators)(orig);
};

const randomFloat = (orig, lower, upper) => {
    const res = (Math.random() * (upper - lower)) + lower;
    // console.log(res);
    return res;
};

const randomInteger = (orig, lower, upper) => {
    const res = Math.floor(randomFloat(orig, lower, upper));
    // console.log(res);
    return res;
};

const randomNumber = (orig, lower, upper) => {
    if (orig % 1 === 0) {
        return randomInteger(orig, 0, orig * 10);
    } else {
        return randomFloat(orig, 0, orig * 10);
    }
};

const boundarifyObject = (orig) => {
    const res = {};
    for (const property in orig) {
        res[property] = boundarify(orig[property]);
    }
    return res;
}

const boundarify = (orig) => {
    let res;
    switch (typeof orig) {
        case "number":
            res = randomNumber(orig, 0, 10000);
            break;
        case "string":
            res = randomString(orig, 0, orig.length());
            break;
        case "object":
            res = {
                ...boundarifyObject(orig),
                boundarified: {
                    a: randomInteger(orig, 0, 10000000),
                    b: randomFloat(orig, 0, 10000000),
                    c: randomString(orig, 0, 100),
                }
            };
            break;
        default:
            res = null;
    }
    return res;
}

const tryChangeIntegerConditionResult = (orig, lower, upper, condition, limit) => {
    let res = orig;
    const originalConditionResult = condition(orig);
    for (let i = 0; i < limit; i++) {
        res = randomInteger(orig, lower, upper);
        if (condition(res) !== originalConditionResult) {
            return res;
        }
    }
    return res;
};



const mutateString = (orig, numberToMutate, allowedRandomChars) => {
    const indicesToMutate = pickUniqueIndicesAtRandom(orig.length, numberToMutate);

    let res = orig;
    for (let index of indicesToMutate) {
        const randomChar = selectRandomElement(allowedRandomChars);
        res = setCharAt(res, index, randomChar);
    }
    return res;
};



const mutateKeyboardLetters = (orig, numberToMutate) => {
    const allowedRandomChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`{}|:\" <>? []\; ',./";
    return mutateString(orig, numberToMutate, allowedRandomChars);
};

const mutateLetters = (orig, numberToMutate) => {
    const allowedRandomChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return mutateString(orig, numberToMutate, allowedRandomChars);
};

const mutateLettersLowercase = (orig, numberToMutate) => {
    const allowedRandomChars = "abcdefghijklmnopqrstuvwxyz";
    return mutateString(orig, numberToMutate, allowedRandomChars);
};

const mutateLettersUppercase = (orig, numberToMutate) => {
    const allowedRandomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return mutateString(orig, numberToMutate, allowedRandomChars);
};

const mutateDigitsAsString = (orig, numberToMutate) => {
    const allowedRandomChars = "0123456789";
    return mutateString(orig, numberToMutate, allowedRandomChars);
};




const randomString = (orig, lower, upper) => {
    const randomLength = randomInteger(null, lower, upper);
    return mutateKeyboardLetters("a".repeat(randomLength), randomLength);
};

const randomLetters = (orig, lower, upper) => {
    const randomLength = randomInteger(null, lower, upper);
    return mutateLetters("a".repeat(randomLength), randomLength);
};

const randomLettersLowercase = (orig, lower, upper) => {
    const randomLength = randomInteger(null, lower, upper);
    return mutateLettersLowercase("a".repeat(randomLength), randomLength);
};

const randomLettersUppercase = (orig, lower, upper) => {
    const randomLength = randomInteger(null, lower, upper);
    return mutateLettersUppercase("a".repeat(randomLength), randomLength);
};

const randomDigitsAsString = (orig, lower, upper) => {
    const randomLength = randomInteger(null, lower, upper);
    return mutateDigitsAsString("a".repeat(randomLength), randomLength);
};


const randomDate = (orig) => {
    const res = randomDigitsAsString(null, 2, 2) + "-" + randomDigitsAsString(null, 2, 2) + "-" + randomDigitsAsString(null, 4, 4);
    console.log(res);
    return res;
}



const tagify = (orig) => {

}

const insertDangerousHTML = (orig, numberToInsert) => {

}

const insertDangerousHTMLPairs = (orig, numberOfPairsToInsert) => {

}

const changeType = (orig, changer) => {
    return changer(orig);
}

const changeTypeRandomly = (orig) => {
    const changers = [

    ];
    return changers[randomInteger(null, 0, changers.length)](orig);
};

const forceChangeTypeToExemplar = (orig, type) => {
    const exemplars = {
        "number": -3.1415,
        "string": "\n\t('+a",
        "object": {
            "a": {
                "b": 3,
            },
            hello: () => 3456789,
        },
    };
    return exemplars["type"];
};

const forceChangeTypeToRandomExemplar = (orig) => {
    const exemplars = [

    ];
    return exemplars[randomInteger(null, 0, exemplars.length)];
};

const ifActiveFuncs = [
    pickUniqueIndicesAtRandom,
    setCharAt,
    randomCharacter,
    selectRandomElement,
    swapArrayElement,
    booleanNegate,
    injectZero,
    numericalNegative,
    injectNan,
    injectPositiveInfinity,
    injectNegativeInfinity,
    injectNull,
    injectUndefined,
    floatify,
    injectBigNumber,
    injectSmallNumber,
    injectDangerousNumber,
    randomFloat,
    randomInteger,
    randomString,

    randomLetters,
    randomLettersLowercase,
    randomLettersUppercase,
    randomDigitsAsString,
    mutateKeyboardLetters,
    mutateLetters,
    mutateLettersLowercase,
    mutateLettersUppercase,
    mutateDigitsAsString,
    mutateString,
    randomDate,

    randomNumber,
    boundarify,
    tryChangeIntegerConditionResult,
    mutateLetters,
    tagify,
    insertDangerousHTML,
    insertDangerousHTMLPairs,
    changeType,
    changeTypeRandomly,
    forceChangeTypeToExemplar,
    forceChangeTypeToRandomExemplar,
];


const fuzzer = {
    activate: () => {
        IS_ACTIVE = true;
    },
    deactivate: () => {
        IS_ACTIVE = false;
    },
    fuzzNTimes: (description, funcToFuzz, numberOfTimes) => {
        IS_ACTIVE = true;
        const res = {
            description,
            funcToFuzz,
            numberOfTimes,
            outputs: [],
        };
        for (let i = 0; i < numberOfTimes; i++) {
            try {
                res.outputs.push(funcToFuzz());
            } catch (e) {
                res.outputs.push(e);
            }
        }
        IS_ACTIVE = false;
        return res;
    },
    fuzzInputs: (description, funcToFuzz, exampleParams, numberOfTimes) => {
        const res = {
            description,
            funcToFuzz,
            numberOfTimes,
            attempts: [],
            check: (checks) => {
                for (const attempt of res.attempts) {
                    for (const [checkName, func] of checks) {
                        if (!func(attempt.inputs, attempt.output)) {
                            throw new Error(
                                "ERROR IN " + checkName + ": " + attempt.inputs + " OUTPUTS " + attempt.output
                            );
                        }
                    }
                }
            }
        };
        for (let i = 0; i < numberOfTimes; i++) {
            IS_ACTIVE = true;
            const attempt = {
                inputs: exampleParams.map((param) => boundarify(param)),
                output: null,
                errors: null,
            };
            IS_ACTIVE = false;
            try {
                attempt.output = funcToFuzz(...attempt.inputs);
            } catch (e) {
                attempt.errors = e;
            }
            res.attempts.push(attempt);
        }
        return res;
    },
    ifActive: Object.fromEntries(new Map(
        ifActiveFuncs.map(f => [f.name, activationWrapper(f)])
    )),
};

export default fuzzer;