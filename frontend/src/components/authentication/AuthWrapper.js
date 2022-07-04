import { useEffect, useState } from "react";
import NotAuthorizedWarning from "./NotAuthorizedWarning";

const AuthWrapper = (props) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const maybeUser = localStorage.getItem("user");
        if (maybeUser) {
            setAuthToken(JSON.parse(maybeUser).token);
        }
    }, []);

    // TODO: make loading animation while checking if use token exists

    return (
        <div>{authToken !== null ? props.privateComponent : <NotAuthorizedWarning test={authToken} />}</div>
    );
};

export default AuthWrapper;