import axios from 'axios';
import React, { useState } from 'react';
import Verification from '../View/Verification';
import { useUserAuth } from '../Context/UserAuthContext';

const VerificationController = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const ctx = useUserAuth();
  if (ctx !== null) {
    var login = ctx.login;
  }

  const VerificationHandler = (
    e: React.FormEvent<HTMLFormElement>,
    pin: (number | undefined)[],
    MobileNo: string | undefined
  ) => {
    e.preventDefault();
    const otp = pin.join('');
    const data = {
      username: MobileNo,
      password: otp,
    };
    axios
      .post(
        'https://extended-retail-app.herokuapp.com/api/customer/login',
        data
      )
      .then((response) => {
        login(response);
      })
      .catch((error) => setErrorMessage(error));
  };
  return (
    <>
      <Verification
        VerificationHandler={VerificationHandler}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default VerificationController;
