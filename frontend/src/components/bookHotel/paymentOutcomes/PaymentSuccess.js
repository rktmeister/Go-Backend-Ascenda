import { useNavigate } from "react-router-dom";
const PaymentSuccess = (props) => {
    const nav = useNavigate();
    const goToHome = () => {
        nav("/", { replace: true });
    };
    return (
        <div className="container">
            <p class="h1">Payment Successful</p>
            <button onClick={goToHome}>Back to Home</button>
        </div>
    );
};

export default PaymentSuccess;