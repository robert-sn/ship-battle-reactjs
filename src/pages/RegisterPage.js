import { useState } from "react";
import { registerUser } from "../api/AuthenticationClient";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit() {
        let req = {
            email: email,
            password: password
        }
        console.log(JSON.stringify(req))
        try{
            const resp = await registerUser(JSON.stringify(req));
            console.log(resp)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <div>
            <h1>Register Page</h1>
            <br /><br /><br />
                <span>Email</span>
                <input name="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value) }/>
                <br />
                <span>Password</span>
                <input name="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value) }/>
                 <br />
                <button onClick={handleSubmit} type="submit" >Register</button>
            <br />
            <Link to="/">Login</Link>
        </div>
    );
}