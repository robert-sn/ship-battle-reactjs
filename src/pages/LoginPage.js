import { useState } from "react";
import { loginUser } from "../api/AuthenticationClient";
import { Link } from 'react-router-dom';

export default function RegisterPage({setToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        let req = {
            email: email,
            password: password
        }
        try{
            let resp = await loginUser(JSON.stringify(req));
            setToken(resp.accessToken)
            sessionStorage.setItem("token", resp.accessToken);
            console.log(resp.accessToken);
        
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <h1>Login Page</h1>
            <br /><br /><br />
            <form onSubmit={handleSubmit} action="/" method="post">
                <span>Email</span>
                <input name="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value) }/>
                <br />
                <span>Password</span>
                <input name="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value) }/>
                    <br />
                <button type="submit" >Login</button>
            </form>
            <br />
            <Link to="/register">Register</Link>
        </div>
    );
}