import React, { useState } from 'react';
import axios from 'axios';
import Login from '../View/Login';
import { useNavigate } from 'react-router-dom';

const LoginController = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const GetOtpHandler = (
    e: React.FormEvent<HTMLFormElement>,
    MobileNo: string
  ): any => {
    e.preventDefault();
    const username = {
      username: MobileNo,
    };
    axios
      .post(
        'https://extended-retail-app.herokuapp.com/api/customer/getOtp',
        username
      )
      .then((res: any) => {
        //here i want to navigate only if res.data.otp is there
        navigate('/verification', {
          state: { otp: res.data.otp, MobileNo: MobileNo },
        });
      })
      .catch((error) => setErrorMessage(error));
  };

  return (
    <>
      <Login GetOtpHandler={GetOtpHandler} errorMessage={errorMessage} />
    </>
  );
};

export default LoginController;
