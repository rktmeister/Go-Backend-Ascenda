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
        <div className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">
                    Hey there!
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button id="createAccountButton" onClick={goToCreateAccount}>Create Account</button>
                    </li>
                    <li className="nav-item">
                        <button id="loginButton" onClick={goToLogin}>Login</button>
                    </li>
                </ul>


            </div>
        </div>
    )
};

export default SignedOutView;