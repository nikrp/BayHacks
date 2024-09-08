import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from './firebase';
import { getDoc, collection, addDoc, updateDoc, setDoc, doc } from 'firebase/firestore';


const SignUp = () => {
    const navigate = useNavigate()
  
    const onButtonClick = () => {
      auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
          db.collection('users').doc(userCredential.user.uid).set({
              username: username,
            }).then(() => {
            auth.signOut();
            navigate('/login', { replace: true });
          });
      }).catch((e) => {
          alert('Error signing in: Email already registered or password less than 6 characters')
          console.error("Error signing up: ", e)
      })
    }

    return (
        <div>
    
        <div className={'mainContainer flex justify-center items-center h-screen'}>
            <div className={`w-2/6 rounded-xl`}>
            <div className={'titleContainer'}>
                <h1 className={`text-5xl font-semibold text-center`}>Sign Up</h1>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input value={username} placeholder="Enter your username here" onChange={(ev) => setUsername(ev.target.value)} type="username" className="w-full input input-bordered input-primary rounded-md" />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            
    
    
            <div className={'inputContainer'}>
                <input value={email} placeholder="Enter your email here" onChange={(ev) => setEmail(ev.target.value)} type="email" className="w-full input input-bordered input-primary rounded-md" />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input value={password} placeholder="Enter your password here" onChange={(ev) => setPassword(ev.target.value)} type="password" className="input input-bordered input-primary w-full rounded-md" />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <button className={`btn text-lg text-white btn-info w-full rounded-md`} onClick={onButtonClick}>Sign Up</button>
                <button onClick={() => navigate('/', { replace: true })} className={`btn btn-info mr-4 text-lg text-white fixed top-5 left-8  rounded-md`}>Home</button>
            </div>
          </div>
        </div>
        </div>
      )
    }
    
    export default SignUpQd;