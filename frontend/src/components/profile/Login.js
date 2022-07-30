import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { attemptLogin } from "../../utils/backendAPI";
import AuthWrapper from "../authentication/AuthWrapper";

const Login = (props) => {
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [passwordHash, setPasswordHash] = useState("");

    const hashPassword = (password) => {
        return password; // TODO: implement hash function
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const jwt = await attemptLogin(email, hashPassword(passwordHash));
        if (jwt.error) {
            alert("Login unsuccessful");
        } else {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            nav("/", { replace: true });
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"//"email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(event) => setPasswordHash(event.target.value)}
                    />
                </div>
                <button type="submit" id="submitButton" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
};

export default Login;