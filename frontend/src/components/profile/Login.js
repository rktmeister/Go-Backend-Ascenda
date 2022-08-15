import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fuzzer from "../../fuzzing/fuzzer";
import { hashPassword } from "../../utils/backendAPI";

const Login = (props) => {
    const nav = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const USER_NAME_MAX_LENGTH = 20;
    const PASSWORD_MAX_LENGTH = 20;

    const goToHome = () => {
        nav("/", { replace: true });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const res = fuzzer.ifActive.boundarify(
            await props.backendPackage.attemptLogin(userName, await hashPassword(password))
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
                        onChange={(event) => {
                            if (event.target.value.length <= USER_NAME_MAX_LENGTH) {
                                setUserName(event.target.value);
                            }
                        }}
                        value={userName}
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
                        onChange={(event) => {
                            if (event.target.value.length <= PASSWORD_MAX_LENGTH) {
                                setPassword(event.target.value);
                            }
                        }}
                        value={password}
                    />
                </div>
                <button type="submit" data-testid="submitButton" id="submitButton" className="btn btn-primary" >Submit</button>
            </form>
            <button onClick={goToHome}>Back</button>
        </div>
    );
};

export default Login;