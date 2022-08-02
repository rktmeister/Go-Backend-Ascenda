import { useNavigate } from "react-router-dom";

const SignedInView = (props) => {
    const nav = useNavigate();
    const logOut = () => {
        // call backend
        nav("/", { replace: true });
    };
    const goToProfilePage = () => {
        nav("/authed/profile", { replace: true });
    };
    return (
        <div>
            <div>
                Welcome, {props.userName}.
            </div>
            <button onClick={logOut}>Log Out</button>
            <button onClick={goToProfilePage}>Go to profile page</button>
        </div>
    )
};

export default SignedInView;