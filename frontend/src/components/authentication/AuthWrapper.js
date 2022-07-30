import { useEffect, useState } from "react";
import NotAuthorizedWarning from "./NotAuthorizedWarning";

const AuthWrapper = (props) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const maybeToken = localStorage.getItem("jwt");
        if (maybeToken) {
            setAuthToken(JSON.parse(maybeToken));
            console.log(JSON.parse(maybeToken));
        }
    }, []);

    // TODO: make loading animation while checking if use token exists

    return (
        <div>{authToken !== null ? props.privateComponent : <NotAuthorizedWarning test={authToken} />}</div>
    );
};

export default AuthWrapper;