import SignedInView from "./SignedInView";
import SignedOutView from "./SignedOutView";

const GlobalNavBar = (props) => {
    return (
        <div className="mb-3">
            {
                props.isAuthorized ?
                    <SignedInView
                        userName={props.userName}
                        backendPackage={props.backendPackage}
                    />
                    : <SignedOutView />
            }
        </div>
    );
};

export default GlobalNavBar;