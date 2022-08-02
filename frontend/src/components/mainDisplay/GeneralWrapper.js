import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GlobalNavBar from "../bookHotel/common/globalNavBar/GlobalNavBar";

const GeneralWrapper = (props) => {
    const nav = useNavigate();
    const loc = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userName, setUserName] = useState("");
    // does NOT redirect to login if refresh token is invalid, just detects
    useEffect(() => {
        (async () => {
            const res = await props.backendPackage.testIsLoggedIn();
            console.log(res);
            if (res.error) {
                setIsAuthorized(false);
            } else {
                setUserName(res.username);
                setIsAuthorized(true);
            }
        })();
    }, [loc]);

    const [isVisible, setIsVisible] = useState(true);
    const goToBook = () => {
        nav("/authed/book", { replace: true });
        setIsVisible(false);
    };

    useEffect(() => {
        if (loc.pathname === "/") {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [loc]);

    return (
        <div>
            <GlobalNavBar isAuthorized={isAuthorized} userName={userName} backendPackage={props.backendPackage} />
            {
                isVisible ?
                    isAuthorized ?
                        <div>
                            <button onClick={goToBook}>Book!</button>
                        </div>
                        : <div>Log in to book!</div>
                    : <div></div>
            }
            <Outlet />
        </div>
    );
};

export default GeneralWrapper;