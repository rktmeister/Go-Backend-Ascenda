import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../../../utils/backendAPI";

const SignedInView = (props) => {
    const nav = useNavigate();
    const logOut = () => {
        const res = props.backendPackage.logOut(
            nav
        );
        if (res.success) {
            nav("/", { replace: true });
        } else {
            alert(res.message);
        }
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
            nav("/", { replace: true });
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
            <button onClick={deleteAccount}>Delete Account</button>
        </div>
    )
};

export default SignedInView;