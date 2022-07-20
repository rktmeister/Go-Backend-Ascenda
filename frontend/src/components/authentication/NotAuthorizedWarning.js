const NotAuthorizedWarning = (props) => {
    return (
        <div data-testid="accessDenied">
            <div className="card" style={{ backgroundColor: "red" }}>
                <div className="card-header">
                    You aren't authorized!
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>Click <a id="clickme" href="/login">here</a> to log in.</p>
                    </blockquote>
                </div>
            </div>
            <div>h{props.test}i</div>
        </div>
    );
};

export default NotAuthorizedWarning;

