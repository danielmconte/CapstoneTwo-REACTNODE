import React, { useState } from "react";
import TemplateApi from "./Api";
import { useDispatch } from "react-redux";





const RegisterForm = () => {
    const dispatch = useDispatch();
    let username = null;
    let password = null;
    const [inputs, setInputs] = useState({ username, password });
    const [message, setMessage] = useState(null);

    const handleChange = (evt) => {
        const { value, name } = evt.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        async function postRegister() {
            let result = await TemplateApi.registerPost(
                inputs.username,
                inputs.password
            );
            setMessage(result);
            let curToken = result.data.token;
            dispatch({
                type: "ADD_TOKEN",
                curToken,
            });
        }
        postRegister();
    };

    return (
        <div>
            <form action="/" onSubmit={handleSubmit}>
                <h3>Register Below:</h3>
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
                <button>Register</button>
            </form>
            {message ? (
                <div>
                    <h6>{JSON.stringify(message.data.message)}</h6>
                </div>
            ) : (
                null
            )}
        </div>
    );
};

export default RegisterForm;
