import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../utils/backendAPI";

const CreateAccountPage = (props) => {
    const nav = useNavigate();
    const [userName, setUserName] = useState("");
    const [passwordHash, setPasswordHash] = useState("");

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        const res = await props.backendPackage.attemptCreateAccount(
            userName,
            passwordHash,
            nav
        );
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
                        placeholder="Password"
                        onChange={(event) => setPasswordHash(hashPassword(event.target.value))}
                    />
                </div>
                <button type="submit" id="submitButton" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
};

export default CreateAccountPage;