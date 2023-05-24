import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase_setup/firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import '../App.css'
const OtpLogin = () => {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isCaptchaConfigured, setIsCaptchaConfigured] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const verifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log(response);
        if (isCaptchaConfigured) {
          onSignInSubmit();
        } else {
          setIsCaptchaConfigured(true);
        }
      }
    }, auth);
    setRecaptchaVerifier(verifier);
  }, []);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const onSignInSubmit = async () => {
    try {
      const phoneNumber = "+92" + phone;
      const appVerifier = recaptchaVerifier;
      const auth = getAuth();
      console.log(phoneNumber);
  
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setVerificationId(confirmationResult.verificationId);
      alert("Sms is being sent to your number with the verification code");
    } catch (error) {
      console.log(error, "Some error occurred");
      alert(error);
    }
  };
  

  const onSubmitOTP = async () => {
    const code = verificationCode;
  
    try {
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
      console.log(user, "User is verified successfully");
      alert("User is verified successfully");
    } catch (error) {
      alert(error);
    }
  };
  


  return (
    <div className="container">
    <h2>OTP Login</h2>
    <div>
      <div id="sign-in-button"></div>
      <label htmlFor="phone">Phone:</label>
      <input type="phone" id="phone" value={phone} onChange={handlePhoneChange} />
      <button onClick={onSignInSubmit}>Send OTP</button>
    </div>
    <div>
      <label htmlFor="otp">Verification Code:</label>
      <input type="text" id="otp" value={verificationCode} onChange={handleVerificationCodeChange} />
      <button onClick={onSubmitOTP}>Verify OTP</button>
    </div>
  </div>
  );
};

export default OtpLogin;
