import { useState } from "react";

const AuthWrapper = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // TODO: implement actual authentication

    return (
        { isAuthenticated? props.privateComponent : < NotAuthorizedWarning />}
    );
};

export default AuthWrapper;