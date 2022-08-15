import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../../../utils/backendAPI";

const SignedInView = (props) => {
    const nav = useNavigate();
    const logOut = async () => {
        const res = await props.backendPackage.logOut(
            nav
        );
        if (res.success) {
            nav("/", { replace: true });
        } else {
            alert(res.message);
        }
    };
    const deleteAccount = async () => {
        const password = await prompt("Enter password:");
        // console.log("PA", password);
        if (password === null || password === "") {
            return; // user cancelled prompt
        }

        const passwordHash = await hashPassword(password);
        const res = await props.backendPackage.deleteAccount(
            props.userName,
            passwordHash,
            nav
        )
        if (res.success) {
            nav("/", { replace: true });
        } else {
            alert(res.message);
        }
    };
    return (
        <div className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">
                    Welcome, {props.userName}.
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button id="logoutButton" className="nav-item" onClick={logOut}>Log Out</button>
                    </li>
                    <li className="nav-item">
                        <button id="deleteAccountButton" className="nav-item" onClick={deleteAccount}>Delete Account</button>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default SignedInView;