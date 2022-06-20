import { useState } from "react";

const Login = (props) => {
    const [name, setName] = useState("");

    const handleChange = (setter) => {
        return event => setter(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(event);
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleChange(setName)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Login;