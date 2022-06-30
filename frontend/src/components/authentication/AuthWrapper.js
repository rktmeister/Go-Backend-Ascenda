import { useState } from "react";
import NotAuthorizedWarning from "./NotAuthorizedWarning";

const AuthWrapper = (props) => {
    const [authToken, setAuthToken] = useState("hasjd"); // TODO: set to null after testing

    return (
        <div>{authToken !== null ? props.privateComponent : <NotAuthorizedWarning />}</div>
    );
};

export default AuthWrapper;