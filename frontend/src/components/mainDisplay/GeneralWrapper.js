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
            if (res && res.error) {
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
        <div style={{ backgroundImage: "url('https://media.istockphoto.com/photos/breakfast-served-on-a-hotel-bed-picture-id936331412?k=20&m=936331412&s=612x612&w=0&h=WeIEVoB9DarqRpcOg4UQ0pKCAQAGQIxsitd7cnIWXc8=')", height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <GlobalNavBar isAuthorized={isAuthorized} userName={userName} backendPackage={props.backendPackage} />
            {
                isVisible ?
                    isAuthorized ?
                        <div>
                            <button id="bookButton" onClick={goToBook}>Book!</button>
                        </div>
                        : <div>
                            <p className="h1" style={{ color: "#FFFFFF" }} >Log in to book!</p></div>
                    : <div></div>
            }
            <Outlet />
        </div>
    );
};

export default GeneralWrapper;