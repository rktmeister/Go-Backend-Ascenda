import { useState } from "react";
import NotAuthorizedWarning from "./NotAuthorizedWarning";

const AuthWrapper = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // TODO: implement actual authentication

    return (
        <div>{isAuthenticated ? props.privateComponent : <NotAuthorizedWarning />}</div>
    );
};

export default AuthWrapper;