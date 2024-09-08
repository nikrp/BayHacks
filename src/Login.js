

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from './firebase';
import { getDoc, doc } from 'firebase/firestore';
import Cookies from 'js-cookie';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const onButtonClick = () => {
    auth.signInWithEmailAndPassword(email, password).then((userCred) => {
      userCred.user.getIdToken().then((token) => {
        Cookies.set('acces_token', token);
        db.collection('users').doc(userCred.user.id).get().then((docSnap) => {
          const username = docSnap.data()
          props.setSignedIn(true);
          navigate('/profile', { replace: true, state: { username: username } });
        });
      })
    }).catch((e) => {
        alert("Incorect Email or Password");
        console.error("Error signing in:", e);
    });
    
  }

  return (
    

    <div className={'mainContainer flex justify-center items-center h-screen'}>
          <div className={`flex flex-row justify-left gap-6 absolute top-0 mt-8`}>     
          </div>
            <button onClick={() => navigate('/', { replace: true })} className={`btn btn-info mr-4 text-lg text-white fixed top-5 left-8  rounded-md`}>Home</button>
        <div className={`w-2/6 rounded-xl`}>
        <div className={'titleContainer'}>
            <h1 className={`text-5xl font-semibold text-center`}>Welcome Back</h1>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input value={email} placeholder="Enter your email here" onChange={(ev) => setEmail(ev.target.value)} type="email" className="w-full input input-bordered input-info" />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
            <input value={password} placeholder="Enter your password here" onChange={(ev) => setPassword(ev.target.value)} type="password" className="input input-bordered input-p
            rimary w-full" />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer mb-3'}>
            <button className={`btn text-lg text-white btn-info w-full`} onClick={onButtonClick}>Login</button>
            
            
        </div>
        <div className={`flex justify-between flex-row`}>
          <p>Dont Have an Account? <span className={`text-success cursor-pointer primary`} onClick={() => navigate('/signup', { replace: true })}>Sign Up Today!</span></p>
          <p><span className={`text-success cursor-pointer`} onClick={() => navigate('/signup', { replace: true })}>Forgot Password?</span></p>
        </div>
      </div>
    </div>
    
  )
}

export default Login;
