import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { testAccessToken } from "../../utils/backendAPI";
import NotAuthorizedWarning from "./NotAuthorizedWarning";

const AuthWrapper = (props) => {
    const loc = useLocation();
    const nav = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    // useEffect(() => {
    //     const maybeToken = localStorage.getItem("jwt");
    //     if (maybeToken) {
    //         setAuthToken(JSON.parse(maybeToken));
    //         console.log(JSON.parse(maybeToken));
    //     }
    // }, []);


    // essentially redirects to login if refresh token is invalid
    useEffect(() => {
        (async () => {
            const res = await testAccessToken(nav);
            if (res !== null && res.success) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        })();
    }, [loc]);

    // TODO: make loading animation while checking if use token exists

    return (
        <div>
            {
                isAuthorized ?
                    <Outlet />

                    : <NotAuthorizedWarning />
            }
        </div>
    );
};

export default AuthWrapper;