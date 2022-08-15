import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../utils/backendAPI";

const CreateAccountPage = (props) => {
    const nav = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const USER_NAME_MAX_LENGTH = 20;
    const PASSWORD_MAX_LENGTH = 20;

    const goToHome = () => {
        nav("/", { replace: true });
    };

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        const res = await props.backendPackage.attemptCreateAccount(
            userName,
            await hashPassword(password),
            nav
        );

        if (!res) {
            alert("Create Account failed!");
            return;
        }

        if (res.success) {
            nav("/", { replace: true });
        } else {
            alert(res.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleCreateAccount}>
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
                <button type="submit" id="submitButton" data-testid="submitButton" className="btn btn-primary" >Submit</button>
            </form>
            <button onClick={goToHome}>Back</button>
        </div>
    );
};

export default CreateAccountPage;