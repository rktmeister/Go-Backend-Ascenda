import Cookies from "js-cookie";
import sha256 from "crypto-js/sha256";

// const getDestinationsByFuzzyString = (fuzzyDestinationName)
let exhaust = 20;

const MOCK = false;

export const DB_ADDRESS = "http://localhost:3000/api";

export const getStripePrice = async (hotelId) => {
    await delay();
    return "price_1LMX2uAML4yM4v0zWPOXMEa1";
}

export const logOut = async (nav) => {
    const res = await handleRefreshTokenExpire(() => {
        const res = fetch(formatQueryParameters(
            DB_ADDRESS,
            "/logout",
            {}
        ), {
            method: "POST",
            credentials: "include"
        });
        return res;
    }, nav);
    return res;
}

export const getHotelBatch = async (destinationId, checkInDate, checkOutDate, numberOfRooms, nav) => {
    const res1 = await handleRefreshTokenExpire(() => {
        const res = fetch(formatQueryParameters(
            DB_ADDRESS,
            "/hotels/destination",
            {
                //"hotelId": hotelId,
                "destination": destinationId,
                "checkin": checkInDate,
                "checkout": checkOutDate,
                "guests": numberOfRooms,
            }
        ), {
            credentials: "include"
        });
        return res;
    }, nav);
    console.log("HIIIIIIIII", res1);

    if (res1.hotel_price === null) {
        return {
            error: "No hotels found",
        };
    }

    console.log("GOT HOTELS:", res1);
    const transformedResults = res1.hotel_price.map(({ HotelBriefDescription, Id, Price }) => {
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
            description: HotelBriefDescription.description,
            amenities_ratings: HotelBriefDescription.amenities_ratings,
            cloudflareImageURL: HotelBriefDescription.cloudflare_image_url,
            suffix: HotelBriefDescription.image_details.suffix,
            numberOfImages: HotelBriefDescription.number_of_images,
            defaultImageIndex: HotelBriefDescription.default_image_index,
            score: HotelBriefDescription.categories.overall.score,
            popularity: HotelBriefDescription.categories.overall.popularity,
        };
    })
    return transformedResults;
};

export const getHotelRoomBatch = async (hotelId, destinationUid, checkInDate, checkOutDate, numberOfRooms, nav) => {
    const res = await handleRefreshTokenExpire(() => {
        const res = fetch(formatQueryParameters(
            DB_ADDRESS,
            "/room/hotel",
            {
                "hotelId": hotelId,
                "destination_id": destinationUid,
                "checkin": checkInDate,
                "checkout": checkOutDate,
                "guests": numberOfRooms,
            }
        ), {
            credentials: "include"
        });
        return res;
    }, nav);

    console.log("res is: ", res);

    // const res2 = {
    //     description: res.hotelDesc.description,
    //     uid: res.hotelDesc.id,
    //     cloudflareImageURL: res.hotelDesc.cloudflare_image_url,
    //     suffix: res.hotelDesc.image_details.suffix,
    //     numberOfImages: res.hotelDesc.number_of_images,
    //     defaultImageIndex: res.hotelDesc.default_image_index,
    //     score: res.hotelDesc.categories.overall.score,
    //     popularity: res.hotelDesc.categories.overall.popularity,
    //     address: res.hotelDesc.address,
    //     rating: res.hotelDesc.rating,
    //     rooms: res.roomPrice.rooms
    // };
    // return res2;
    return res.roomPrice.rooms;
}

export const attemptCreateAccount = async (username, passwordHash) => {
    const res = fetch(formatQueryParameters(
        DB_ADDRESS,
        "/register",
        {}
    ), {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            username,
            password: passwordHash,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).catch((error) => {
        switch (parseInt(error.message)) {
            case 401:
                return {
                    error: "Create account failed",
                };
            default:
                console.log(error);
                return;
        }
    });
    return res;
};

export const attemptLogin = async (username, passwordHash) => {
    const res = fetch(formatQueryParameters(
        DB_ADDRESS,
        "/login",
        {}
    ), {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            username,
            password: passwordHash,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).catch((error) => {
        switch (parseInt(error.message)) {
            case 401:
                return {
                    error: "Login failed",
                };
            default:
                console.log(error);
                return;
        }
    });
    return res;
};

export const sendSuccessfulPayment = async (
    checkOutData, nav
) => {
    return handleRefreshTokenExpire(() => {
        const formData = new FormData();
        const formKeyVals = {
            "username": checkOutData.username,
            "firstName": checkOutData.firstName,
            "lastName": checkOutData.lastName,
            "destination_id": checkOutData.destinationId,
            "hotel_id": checkOutData.hotelId,
            "supplier_id": checkOutData.supplierId,
            "special_requests": checkOutData.specialRequests,
            "salutation": checkOutData.salutation,
            "email": checkOutData.userEmail,
            "phone": checkOutData.phoneNumber,
            "guests": checkOutData.numberOfRooms,
            "checkin": checkOutData.checkInDate,
            "checkout": checkOutData.checkOutDate,
            "price": checkOutData.price,
        };

        Object.entries(formKeyVals).forEach(([key, val]) => {
            formData.append(key, val);
        });
        const res = fetch(formatQueryParameters(
            DB_ADDRESS,
            "/room/hotel/book",
            {}
        ), {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        return res;
    }, nav);
};

// credit to https://stackoverflow.com/questions/20334486/simulate-a-timed-async-call
export const delay = async (delay = 1000, callback = () => { }) => {

    const delayPromise = ms => new Promise(res => setTimeout(res, ms));
    await delayPromise(delay);

    callback();
}

export const deleteAccount = async (userName, passwordHash, nav) => {
    const res = await handleRefreshTokenExpire(() => {
        const res = fetch(formatQueryParameters(
            DB_ADDRESS,
            "/deleteAccount",
            {}
        ), {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
                username: userName,
                password: passwordHash,
            }),
        });
        return res;
    }, nav);
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

export const handleRefreshTokenExpire = async (func, nav) => {
    const firstAttempt = await fetchErrorAdapter(func);
    console.log(firstAttempt);
    if (firstAttempt !== null && firstAttempt.accessTokenExpired) {
        await fetch(formatQueryParameters(DB_ADDRESS, "/refresh", {}), {
            method: "POST",
            credentials: "include",
        }).then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error(response.status);
            }
            return;
        }).catch((error) => {
            switch (parseInt(error.message)) {
                case 401:
                    nav("/login", { replace: true });
                    return;
                default:
                    console.log(error);
                    return;
            }
        });
        const secondAttempt = await fetchErrorAdapter(func);
        console.log(secondAttempt);
        console.log("RETURN SECOND TRY");
        return secondAttempt;
    } else {
        console.log("RETURN FIRST TRY");
        return firstAttempt;
    }
};

export const hashPassword = async (password) => {
    console.log(sha256(password).toString());
    console.log(sha256(password).toString());
    console.log(sha256(password).toString());
    return sha256(password).toString(); // TODO: implement hash function
};

export const testAccessToken = (nav) => {
    return handleRefreshTokenExpire(() => {
        const res = fetch(formatQueryParameters(DB_ADDRESS, "/testAccessToken", {}), {
            credentials: "include",
        });
        return res;
    }, nav);
};

export const testIsLoggedIn = async () => {
    const res = await fetch(formatQueryParameters(DB_ADDRESS, "/refresh", {}), {
        method: "POST",
        credentials: "include",
    }).then((response) => {
        console.log(response);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).catch((error) => {
        switch (parseInt(error.message)) {
            case 401:
                return {
                    error: "Not logged in",
                };
            default:
                console.log(error);
                return;
        }
    });
    return res;
}

export const fetchErrorAdapter = async (fetcher) => {
    const res = await fetcher().then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).catch((error) => {
        switch (parseInt(error.message)) {
            case 401:
                return {
                    accessTokenExpired: true
                };
            default:
                console.log(error);
                break;
        }
    });
    return res;
};

export const getDestinationsByFuzzyString = async (fuzzyDestinationName, nav) => {
    return handleRefreshTokenExpire(() => {
        const res = fetch(formatQueryParameters(
            DB_ADDRESS,
            "/destinations/fuzzyName",
            {
                "search": fuzzyDestinationName,
            }
        ), {
            credentials: "include",
        });
        return res;
    }, nav);
};