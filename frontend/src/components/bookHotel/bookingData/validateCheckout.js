const makeGuardFunction = (guardArray, alertSetter) => (newValue) => {
        for (let [func, msg] of guardArray) {
            if (!func(newValue)) {
                alertSetter(msg);
                return false;
            }
        }
        return true;
};

const verifyNamePortion = makeGuardFunction([
    [({firstName}) => typeof firstName === "string", "Name must be text!"],
    [({ firstName }) => 0 < firstName.length && firstName.length < 50, "Name must be between 0 and 50 characters."],
    [({ lastName }) => typeof lastName === "string", "Name must be text!"],
    [({ lastName }) => 0 < lastName.length && lastName.length < 50, "Name must be between 0 and 50 characters."],
]);

const verifySpecialRequests = makeGuardFunction([
    [({specialRequests}) => typeof specialRequests === "string", "Request must be text!"],
    [({specialRequests}) => 0 < specialRequests.length && specialRequests.length < 500, "Requests portion must be between 0 and 500 characters."],
]);

const verifyUserEmail = makeGuardFunction([
    [({userEmail}) => typeof userEmail === "string", "Email must be text!"],
    [({userEmail}) => 0 < userEmail.length && userEmail.length < 50, "Email must be between 0 and 50 characters."],
    [({userEmail}) => {
        return [
            userEmail.contains("@"),
            // others
        ].reduce((a, b) => a && b, true);
    }, "Invalid email!"],
]);

const verifyPhoneNumber = makeGuardFunction([
    [({phoneNumber}) => typeof phoneNumber === "string", "Phone number should be text"],
    [({phoneNumber}) => phoneNumber.length === 8, "Phone number should be 8 digits"],
    [({phoneNumber}) => {
        for (let i = 0; i < phoneNumber.length; i++) {
            let c = phoneNumber[i];
            if (!isNaN(c) && !isNaN(parseFloat(c))) {
                return false;
            }
        }
        return true;
    }, "Phone number can only contain digits!"],
]);
    
// const verifyNumberOfRooms = makeGuardFunction([
//     [({numberOfRooms}) => typeof numberOfRooms === "number", "Number of rooms must be number!"],
//     [({numberOfRooms}) => numberOfRooms > 0, "Number of rooms cannot be zero or less!"],
// ]);

// const verifyCheckInAndOutDate = makeGuardFunction([
//     [({ checkInDate }) => typeof checkInDate === "string", "Check in date must be date!"],
//     [({ checkInDate }) => !isNaN(new Date(checkInDate)), "Check in date must be date!"],
//     [({ checkOutDate }) => typeof checkOutDate === "string", "Check out date must be date!"],
//     [({ checkOutDate }) => !isNaN(new Date(checkOutDate)), "Check in date must be date!"],
//     [({ checkInDate, checkOutDate }) => new Date(checkInDate) < new Date(checkOutDate), "Check in date must be before check out date"],
// ]);

// const verifyMinAndMaxPrice = makeGuardFunction([
//     [({ minPrice }) => typeof minPrice === "number", "Min price must be number!"],
//     [({ minPrice }) => minPrice >= 0, "Min price cannot be below zero!"],
//     [({ maxPrice }) => typeof maxPrice === "number", "Max price must be number!"],
//     [({ minPrice, maxPrice }) => minPrice <= maxPrice, "Min price must be equal to or lower than max price"]
// ]);

// const verifyMinAndMaxRating = makeGuardFunction([
//     [({ minRating }) => typeof minRating === "number", "Min rating must be number!"],
//     [({ minRating }) => minRating >= 0, "Min rating cannot be below zero!"],
//     [({ maxRating }) => typeof maxRating === "number", "Max rating must be number!"],
//     [({ minRating, maxRating }) => minRating <= maxRating, "Min rating must be equal to or lower than max price"]
// ]);

const validateCheckout = (checkOutData) => {
    const checks = [
        verifyNamePortion,
        verifySpecialRequests,
        verifyUserEmail,
        verifyPhoneNumber,
    ];

    for (let check of checks) {
        if (!check(checkOutData)) {
            return false;
        }
    }
    return true;
};