import React, { useState } from "react";
import TemplateApi from "./Api";
import { useDispatch} from "react-redux";


const LoginForm = () => {
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
            let result = await TemplateApi.loginPost(
                inputs.username,
                inputs.password
            );
            setMessage(result);
            let curToken = result.data.token;
            dispatch({
                type: "ADD_TOKEN",
                curToken
            });

       
        }
        postLogin();
      

    };

    return (
        <div>
            <form action="/" onSubmit={handleSubmit}>
                <h3>
                    Login Below. 
                </h3>
                <h6>Don't have an account? Register
                    <a href="/registerform"> here</a></h6>
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
                <a href="/adminloginform"> admin?</a>
            </p>
        </div>
    );
};

export default LoginForm;
