import { loadStripe } from "@stripe/stripe-js";
import { getStripePrice, sendSuccessfulPayment } from "../../../utils/backendAPI";
import { useState, useEffect } from "react";

console.log("hihi", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

let stripePromise;
(async () => {
    stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
})();

const BookingData = (props) => {
    const gotHandMeDowns = props.handMeDowns[props.handMeDownsIndex];

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");


    useEffect(() => {
        const maybeUser = localStorage.getItem("user");
        if (maybeUser) {
            setUserEmail(JSON.parse(maybeUser).email);
        }
    }, []);

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
        await sendSuccessfulPayment(
            fullName,
            phoneNumber,
            userEmail,
            specialRequests
        );

        await mockStripeCheckout();
    };

    // this redirect to stripe checkout is purely cosmetic and is NOT MEANT
    // to have any backend integration NOR secure payment confirmation capability.
    //
    // it is only meant to show where payment details / billing address are entered.
    const mockStripeCheckout = async () => {
        const item = {
            price: await getStripePrice(),
            quantity: 2,
        };

        const checkoutOptions = {
            lineItems: [item],
            mode: "payment",
            successUrl: `${window.location.origin}/paymentSuccess`,
            cancelUrl: `${window.location.origin}/paymentCancel`,
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
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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