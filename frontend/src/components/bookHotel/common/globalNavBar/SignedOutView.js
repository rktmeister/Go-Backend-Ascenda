import { useNavigate } from "react-router-dom";

const SignedOutView = (props) => {
    const nav = useNavigate();
    const goToCreateAccount = () => {
        nav("/signUp", { replace: true });
    };
    const goToLogin = () => {
        nav("/login", { replace: true });
    };
    return (
        <div>
            <div>
                Hey there!
            </div>
            <button id="createAccountButton" onClick={goToCreateAccount}>Create Account</button>
            <button id="loginButton" onClick={goToLogin}>Login</button>
        </div>
    )
};

export default SignedOutView;