const NotAuthorizedWarning = (props) => {
    return (
        <div data-testid="accessDenied">
            <p className="h1">Loading...</p>
            <div >
                <blockquote className="blockquote mb-0">
                    <p>You aren't logged in. If this takes too long, click <a id="clickme" href="/login">here</a> to log in manually.</p>
                </blockquote>
            </div>
            {/* <div className="card" style={{ backgroundColor: "red" }}>
                <div className="card-header">
                    You aren't authorized!
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>Click <a id="clickme" href="/login">here</a> to log in.</p>
                    </blockquote>
                </div>
            </div> */}
        </div>
    );
};

export default NotAuthorizedWarning;

