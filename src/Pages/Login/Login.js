import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
const Login = () => {
    const [userEmail, setUserEmail] = useState('');

    const { login, createUserWithGoogle, passwordRecover } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                console.log("logged in user: ", user);
                form.reset();

                const currentUser = { email: user.email };
                // get jwt toke
                fetch('https://genius-car-server-ten-xi.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then((res) => res.json())
                    .then(data => {
                        // local strage is the easiest but not the best place to store jwt token
                        localStorage.setItem('genius-token', data.token);
                        navigate(from, { replace: true })
                    })


            })
            .catch(error => {
                console.error(error)
            })
    }



    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const handleForgotPassword = () => {
        passwordRecover(userEmail)
            .then(() => {
                alert("Password reset email sent to your email address.");
                console.log("password reset email sent");
            })
            .then(error => {
                console.error(error)
            })
    }



    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row gap-20">
                <div className="text-center lg:text-left">

                    <img className='w-3/4' src={img} alt="" />
                </div>

                <div className="card  w-full max-w-sm shadow-2xl bg-base-100  py-20">
                    <h1 className="text-5xl font-bold text-center">Login</h1>

                    <form onSubmit={handleLogin} className="card-body">



                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={handleEmailChange} type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link onClick={handleForgotPassword} className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn btn-primary' type="submit" value="Login" />
                        </div>


                    </form>


                    <p className='text-center my-3'>
                        <small>New to Genius Car ? <Link className='text-orange-600 font-bold' to='/signup'>SignUp</Link></small>
                    </p>

                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </div>
    );
};

export default Login;