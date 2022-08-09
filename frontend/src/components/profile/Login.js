import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fuzzer from "../../fuzzing/fuzzer";
import { hashPassword } from "../../utils/backendAPI";

const Login = (props) => {
    const nav = useNavigate();

    const [userName, setUserName] = useState("");
    const [passwordHash, setPasswordHash] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        const res = fuzzer.ifActive.boundarify(
            await props.backendPackage.attemptLogin(userName, hashPassword(passwordHash))
        );

        if (!res) {
            alert("Login failed!");
            return;
        }

        if (res.error) {
            alert(res.error);
        } else {
            nav("/", { replace: true });
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        data-testid="userName"
                        placeholder="Enter username"
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        data-testid="password"
                        placeholder="Password"
                        onChange={(event) => setPasswordHash(event.target.value)}
                    />
                </div>
                <button type="submit" data-testid="submitButton" id="submitButton" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
};

export default Login;