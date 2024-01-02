import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');



    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
        await axios.post('/login', {
            emailOrPhone,
            password,
        });
          alert('Login successful');
          navigate('/', { replace: true });
        } catch (error) {
          // Handle login error, e.g., display an error message
        alert('login failed')
        }
      };


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4"> Login</h1>
            <form className="max-w-lg mx-auto" onSubmit={handleLogin}>
                    <input type="text" placeholder='Enter email or phone number'
                        name=""
                        id=""
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}/>
                    <input type="password"
                        placeholder="password"
                        name=""
                        id=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?  <Link className="underline text-black" to={'/register'}>Register now</Link></div>
          </form>
            </div>
        </div>
    );
}