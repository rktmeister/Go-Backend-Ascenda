import SignedInView from "./SignedInView";
import SignedOutView from "./SignedOutView";

const GlobalNavBar = (props) => {
    return (
        <div>
            {
                props.isAuthorized ?
                    <SignedInView userName={props.userName} />
                    : <SignedOutView />
            }
        </div>
    );
};

export default GlobalNavBar;