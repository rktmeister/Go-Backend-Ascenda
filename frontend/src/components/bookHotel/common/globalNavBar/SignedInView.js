import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../../../utils/backendAPI";

const SignedInView = (props) => {
    const nav = useNavigate();
    const logOut = () => {
        // call backend
        nav("/", { replace: true });
    };
    const deleteAccount = () => {
        const password = prompt("Enter password:");
        if (password === null || password === "") {
            return; // user cancelled prompt
        }

        const passwordHash = hashPassword(password);
        const res = props.backendPackage.deleteAccount(
            props.userName,
            passwordHash,
            nav
        )
        if (res.success) {
            nav("/authed/profile", { replace: true });
        } else {
            alert(res.message);
        }
    };
    return (
        <div>
            <div>
                Welcome, {props.userName}.
            </div>
            <button onClick={logOut}>Log Out</button>
            <button onClick={deleteAccount}>Go to profile page</button>
        </div>
    )
};

export default SignedInView;