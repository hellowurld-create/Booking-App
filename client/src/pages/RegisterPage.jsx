import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function RegisterPage() {
    const navigate = useNavigate();


    const [fname, setFname] = useState(null);
    const [lname, setLname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNo, setPhoneNo] = useState(null);
    const [password, setPassword] = useState(null);
    
    
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', {
                fname,
                lname,
                email,
                phoneNo,
                password
            });

            // Show success alert
            alert('Registration successful. Now Log in');

            // Redirect to the login page
           navigate('/login', { replace: true });
        } catch (error) {
            // Handle registration error if needed
            alert('Registration failed. Please try again later.');
        }
    }

    return (
        <div className="mt-4 grow flex items-center  justify-around">
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4"> Register</h1>
            <form className="max-w-lg mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder='John' value={fname} name="fname" id="fname"
                     onChange={e=>setFname(e.target.value)}
                    />
                    <input type="text" placeholder='Doe' value={lname} name="lname" id="lname"
                    onChange={e=>setLname(e.target.value)}
                    />
                    <input type="email" placeholder='your@email.com' value={email} name="email" id="email"
                     onChange={e=>setEmail(e.target.value)}
                    />
                    <input type="text" placeholder='+234-703-3454-242' value={phoneNo} name="phoneNo" id="phoneNo"
                     onChange={e=>setPhoneNo(e.target.value)}
                    />
                    <input type="password" placeholder="password" value={password} name="password" id="password"
                    onChange={e=>setPassword(e.target.value)}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already have an account?  <Link className="underline text-black" to={'/login'}>Login</Link></div>
            </form>
            </div>
        </div>
    );
}