import React, { useState } from "react";
import TemplateApi from "./Api";
import { useDispatch } from "react-redux";

const AdminLoginForm = () => {
    const dispatch = useDispatch();

    let username = "";
    let password = "";

    const [inputs, setInputs] = useState({ username, password });
    const [message, setMessage] = useState(null);

    const handleChange = (evt) => {
        const { value, name } = evt.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        async function postLogin() {
            let result = await TemplateApi.adminLoginPost(
                inputs.username,
                inputs.password
            );
            setMessage(result);
            let curToken = result.data.token;
            if (curToken) {
                dispatch({
                    type: "ADD_ADMIN",
                });
            }
            dispatch({
                type: "ADD_TOKEN",
                curToken,
            });
        }
        postLogin();
    };

    return (
        <div>
            <form action="/" onSubmit={handleSubmit}>
                <h3>Admin Login.</h3>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={inputs.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={inputs.password}
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
            {message ? (
                <div>
                    <h6>{JSON.stringify(message.data.message)}</h6>
                </div>
            ) : (
                null
            )}

            <p>
                <a href="/loginform"> not admin?</a>
            </p>
        </div>
    );
};

export default AdminLoginForm;
