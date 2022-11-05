import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
    const { createUserWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignUp = () => {
        createUserWithGoogle()
            .then(result => {
                const user = result.user;
                console.log("google user:", user);

                setAuthToken(user);
                navigate(from, { replace: true });

            })
            .then(error => {
                console.error(error);
            })
    }

    return (
        <div>
            <p className='text-center'> <small>Social Login</small> </p>
            <p className='text-center'>
                <button onClick={handleGoogleSignUp} className='btn btn-ghost' >Google</button>

            </p>
        </div>
    );
};

export default SocialLogin;