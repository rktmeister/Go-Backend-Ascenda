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

    // username,
    //     firstName,
    //     lastName,
    //     destination_id,
    //     hotel_id,
    //     supplier_id,
    //     special_requests,
    //     salutation,
    //     email,
    //     phone,
    //     guests,
    //     checkin,
    //     checkout,
    //     price,
    //     nav

    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [hotelId, setHotelId] = useState("");
    const [supplierId, setSupplierId] = useState("vagohoteltri");
    const [specialRequests, setSpecialRequests] = useState("");
    const [salutation, setSalutation] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [price, setPrice] = useState(0);

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
        const fullName = firstName + " " + lastName;
        const res = await props.backendPackage.sendSuccessfulPayment(
            userName,
            firstName,
            lastName,
            gotHandMeDowns.destination.uid,
            gotHandMeDowns.hotel.uid,
            supplierId,
            specialRequests,
            salutation,
            userEmail,
            phoneNumber,
            gotHandMeDowns.filterData.numberOfRooms,
            gotHandMeDowns.filterData.checkInDate,
            gotHandMeDowns.filterData.checkOutDate,
            gotHandMeDowns.room.price,
            nav
        );

        console.log(res);

        console.log(
            userName,
            firstName,
            lastName,
            gotHandMeDowns.destination.uid,
            gotHandMeDowns.hotel.uid,
            supplierId,
            specialRequests,
            salutation,
            userEmail,
            phoneNumber,
            gotHandMeDowns.filterData.numberOfRooms,
            gotHandMeDowns.filterData.checkInDate,
            gotHandMeDowns.filterData.checkOutDate,
            gotHandMeDowns.room.price
        );

        await mockStripeCheckout();
    };

    // this redirect to stripe checkout is purely cosmetic and is NOT MEANT
    // to have any backend integration NOR secure payment confirmation capability.
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


    return (
        <div>
            <form onSubmit={handleCheckout}>
                <div className="form-group">
                    <label htmlFor="salutation">Salutation</label>
                    <input
                        type="text"
                        className="form-control"
                        id="salutation"
                        placeholder="Mr"
                        onChange={(event) => setSalutation(event.target.value)}
                        value={salutation}
                    />
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
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            <button onClick={() => console.log(phoneNumber)}>test</button>
        </div>
    );
};

export default BookingData;