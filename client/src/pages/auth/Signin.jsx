import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { signIn } from '../../redux/features/auth/authSlice';
import landing from '../../assets/landingFour.jpeg'

const Signin = () => {
  const { given_name, email, picture } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(given_name && email && picture) {
      navigate('/');
    }
  }, [given_name, email, picture]);

  const handleLoginSuccess = async (credentials) => {
    dispatch(signIn(credentials.credential));
  };

  return (
    <div className="md:relative flex flex-col md:flex-row justify-center w-full bg-red h-screen md:h-full md:mt-20 rounded-2xl">
      <div className="z-10">
        <div className="bg-bg_alt w-[320px] md:w-[440px] rounded-2xl p-8">
          <div className="flex items-center p-2 flex-col gap-4 bg-bg_light">
            <div className="w-full flex justify-between items-center px-4 sm:flex-row flex-col mt-4 mb-5">
              <h2 className="font-bold text-3xl text-green">Welcome to Forloops Studio</h2>
            </div>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
              login_uri="http://localhost:3000"
              redirect_uri="http://localhost:3000/api/auth/callback/google"
              cancel_on_tap_outside={true}
              useOneTap={true}
              size="large"
              theme="filled_black"
              text="continue_with"
              shape="pill"
              width="100%"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-cl p-4 rounded-2xl">
        <img src={landing} className='h-full object-cover w-full rounded-3xl' alt="landing" />
      </div>
    </div>
  );
};

export default Signin;