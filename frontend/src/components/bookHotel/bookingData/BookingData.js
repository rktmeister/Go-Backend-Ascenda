import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

let stripePromise;
(async () => {
    stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
})();

const BookingData = (props) => {
    const nav = useNavigate();
    const loc = useLocation();
    const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [salutation, setSalutation] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        (async () => {
            const res = await props.backendPackage.testIsLoggedIn();
            console.log(res);
            if (res.error) {
                //setIsAuthorized(false);
            } else {
                setUserName(res.username);
            }
        })();
    }, [loc]);

    const makeGuardFunction = (guardArray) => (newValue) => {
        for (let [func, msg] of guardArray) {
            if (!func(newValue)) {
                setAlertMessage(msg);
                return false;
            }
        }
        return true;
    };

    const verifyNamePortion = makeGuardFunction([
        [({ firstName }) => typeof firstName === "string", "Name must be text!"],
        [({ firstName }) => 0 < firstName.length && firstName.length < 50, "Name must be between 0 and 50 characters."],
        [({ lastName }) => typeof lastName === "string", "Name must be text!"],
        [({ lastName }) => 0 < lastName.length && lastName.length < 50, "Name must be between 0 and 50 characters."],
    ]);

    const verifySpecialRequests = makeGuardFunction([
        [({ specialRequests }) => typeof specialRequests === "string", "Request must be text!"],
        [({ specialRequests }) => 0 < specialRequests.length && specialRequests.length < 500, "Requests portion must be between 0 and 500 characters."],
    ]);

    const verifyUserEmail = makeGuardFunction([
        [({ userEmail }) => typeof userEmail === "string", "Email must be text!"],
        [({ userEmail }) => 0 < userEmail.length && userEmail.length < 50, "Email must be between 0 and 50 characters."],
        // [({ userEmail }) => {
        //     return [
        //         userEmail.contains("@"),
        //         // others
        //     ].reduce((a, b) => a && b, true);
        // }, "Invalid email!"],
    ]);

    const verifyPhoneNumber = makeGuardFunction([
        [({ phoneNumber }) => typeof phoneNumber === "string", "Phone number should be text"],
        [({ phoneNumber }) => phoneNumber.length === 8, "Phone number should be 8 digits"],
        [({ phoneNumber }) => {
            for (let i = 0; i < phoneNumber.length; i++) {
                let c = phoneNumber[i];
                console.log(i, ":", c);
                if (!(!isNaN(c) && !isNaN(parseFloat(c)))) {
                    return false;
                }
            }
            return true;
        }, "Phone number can only contain digits!"],
    ]);

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



    const handleCheckout = async (event) => {
        event.preventDefault();
        /**
         * By right, of course, sending the successful payment should happen AFTER
         * the stripe checkout, with confirmation of successful payment through some
         * webhook, but this is just a mock and NO backend integration NOR secure
         * payment confirmation is implemented, as it is not required by the assignment.
         * 
         * The mock Stripe checkout is purely cosmetic and is only meant to show where
         * the payment details / billing address are entered, and redirect to the relevant
         * pages after a transaction.
         */
        setAlertMessage("");

        const checkOutData = {
            userName,
            firstName,
            lastName,
            destinationId: gotHandMeDowns.destination.uid,
            hotelId: gotHandMeDowns.hotel.uid,
            supplierId: "hotel trivago", // mock supplier id
            specialRequests,
            salutation,
            userEmail,
            phoneNumber,
            numberOfRooms: gotHandMeDowns.filterData.numberOfRooms,
            checkInDate: gotHandMeDowns.filterData.checkInDate,
            checkOutDate: gotHandMeDowns.filterData.checkOutDate,
            price: gotHandMeDowns.room.price,
        };

        if (validateCheckout(checkOutData)) {
            const res = await props.backendPackage.sendSuccessfulPayment(checkOutData, nav);
            console.log(res);
            console.log(checkOutData);
            await mockStripeCheckout();
        }
    };

    // this redirect to stripe checkout is purely cosmetic and is NOT MEANT
    // to have any backend integration NOR payment confirmation capability.
    //
    // it is only meant to show where payment details / billing address are entered.
    const mockStripeCheckout = async () => {
        const item = {
            price: await props.backendPackage.getStripePrice(),
            quantity: 2,
        };

        const checkoutOptions = {
            lineItems: [item],
            mode: "payment",
            successUrl: `${window.location.origin}/paymentSuccess`,
            cancelUrl: `${window.location.origin}/`,
            customerEmail: userEmail,
            billingAddressCollection: "required",
        };

        const res = await stripePromise.redirectToCheckout(checkoutOptions);
        console.log(res);
    };

    const salutations = [
        "Mr",
        "Ms",
        "Mrs",
    ];

    const salutationDropdownDefaultString = "Choose a salutation...";


    return (
        <div>
            <form onSubmit={handleCheckout}>
                <div className="form-group">
                    <label htmlFor="salutation">Salutation</label>
                    <select id="salutation" value={salutation} onChange={(e) => { setSalutation(e.target.value); }}>
                        <option value={salutationDropdownDefaultString}>{salutationDropdownDefaultString}</option>
                        {
                            salutations.map((sal) => {
                                return <option id={sal} key={sal} value={sal}> {sal} </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        aria-describedby="emailHelp"
                        placeholder="John"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        aria-describedby="emailHelp"
                        placeholder="Doe"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        value={phoneNumber}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="userEmail"
                        placeholder="" // TODO: set to email from profile
                        onChange={(event) => setUserEmail(event.target.value)}
                        value={userEmail}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="specialRequests">Special Requests</label>
                    <input
                        type="text"
                        className="form-control"
                        id="specialRequests"
                        placeholder=""
                        onChange={(event) => setSpecialRequests(event.target.value)}
                        value={specialRequests}
                    />
                </div>
                <button id="submit" type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <div className="alert alert-primary" role="alert">
                {alertMessage}
            </div>
            <button onClick={() => console.log(phoneNumber)}>test</button>
        </div>
    );
};

export default BookingData;