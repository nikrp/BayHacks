import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from './firebase';
import { getDoc, collection, addDoc, updateDoc, setDoc, doc } from 'firebase/firestore';

const Signup = (props) => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
  const [username, setUsername] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [currentStep, setCurrentStep] = useState('info')
  const [iValue, setIValue] = useState("");
  const [subjects, setSubjects] = useState('')  
    const [interests, setInterests] = useState([])
    const [skills, setSkills] = useState('')
    const [subjectsError, setSubjectsError] = useState('')
    const [interestsError, setInterestsError] = useState('')
    const [skillsError, setSkillsError] = useState('')
  const navigate = useNavigate()

  const onButtonClick = () => {
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        db.collection('users').doc(userCredential.user.uid).set({
            username: username,
            fName: fName,
            email: email,
            lName: lName,
            interests: iValue.split(","),
            topics: subjects.split(","),
            skills: skills.split(","),
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
            <div className={'titleContainer flex items-center justify-center'}>
                <ul class="steps">
                    <li className={`step ${`step-primary`}`}>Enter your Information</li>
                    <li className={`step ${currentStep === 'data' ? 'step-primary' : ''}`}>Enter your Data</li>
                </ul>
            </div>
            <br />
            {currentStep === 'info' ? (
                <div>
                    <div className={`flex items-center w-full gap-2`}>
                        <div className={'inputContainer w-1/2'}>
                            <input value={fName} placeholder="Enter your first name here" onChange={(ev) => setFName(ev.target.value)} type="text" className="w-full input input-bordered input-primary rounded-md" />
                            <label className="errorLabel">{usernameError}</label>
                        </div>
                        <div className={'inputContainer w-1/2'}>
                            <input value={lName} placeholder="Enter your last name here" onChange={(ev) => setLName(ev.target.value)} type="text" className="w-full input input-bordered input-primary rounded-md" />
                            <label className="errorLabel">{usernameError}</label>
                        </div>
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
                        <button className={`btn text-lg text-white btn-info w-full rounded-md`} onClick={() => setCurrentStep('data')}>Next</button>
                    </div>
                </div>
                
            ) : (
                <div>
                    <div className={'inputContainer'}>
                        <input value={iValue} placeholder="Enter your interests here. Seperate by commas" onChange={(ev) => {
                            setIValue(ev.target.value);
                            const words = ev.target.value.split(',');
                            setInterests(words);
                            if (ev.target.value.trim() === "") {
                                setInterests([]);
                            }
                        }} type="username" className="w-full input input-bordered input-primary rounded-md mb-2" />
                        <div className={`flex items-center gap-1 flex-wrap`}>{interests.map((interest, index) => {
                            return (
                                <p key={index} className={`px-4 py-1 rounded-full bg-primary`}>{interest.trim()}</p>
                            )
                        })}</div>
                    </div>
                    <br />
                    
                    <div className={'inputContainer'}>
                        <input value={subjects} placeholder="Enter topics you struggle with here. Seperate by commas" onChange={(ev) => setSubjects(ev.target.value)} type="text" className="w-full input input-bordered input-primary rounded-md mb-2" />
                    </div>
                    <br />
                    <div className={'inputContainer'}>
                        <input value={skills} placeholder="Enter your skills here. Seperate by commas" onChange={(ev) => setSkills(ev.target.value)} type="text" className="input input-bordered input-primary w-full rounded-md mb-2" />
                    </div>
                    <br />
                    <div className={'inputContainer flex items-center w-full gap-2'}>
                    <button className={`btn text-lg text-white btn-info w-1/2 rounded-md`} onClick={() => setCurrentStep('info')}>Back</button>
                        <button className={`btn text-lg text-white btn-info w-1/2 rounded-md`} onClick={onButtonClick}>Signup</button>
                    </div>
                </div>
            )}
        <button onClick={() => navigate('/', { replace: true })} className={`btn btn-info mr-4 text-lg text-white fixed top-5 left-8  rounded-md`}>Home</button>
        </div>
        </div>
        </div>
    
  )
}

export default Signup;