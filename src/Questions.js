import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Questions() {
    const [subjects, setSubjects] = useState('')  
    const [interests, setInterests] = useState('')
    const [skills, setSkills] = useState('')
    const [subjectsError, setSubjectsError] = useState('')
    const [interestsError, setInterestsError] = useState('')
    const [skillsError, setSkillsError] = useState('')


    return (
        <div>
            <div className={'mainContainer flex flex-col justify-center items-center h-screen'}>
                <div className={`w-2/6 rounded-xl`}>
                    <div className={'titleContainer items-center justify-center mb-5'}>
                        <div className={'inputContainer'}>
                            <input value={subjects} placeholder="Enter your subjects here" onChange={(ev) => setSubjects(ev.target.value)} type="subjects" className="w-full input input-bordered input-primary rounded-md" />
                                <label className="errorLabel">{subjectsError}</label>
                        </div>
                        <div className={'inputContainer mb-5'}></div>
                        <input value={interests} placeholder = "Enter your interests here" onChange={(ev) => setInterests(ev.target.value)} type = "interests" className = "w-full input input-bordered input-primary rounded-md" />
                        <label className="errorLabel">{interestsError}</label>

                        <div className={'inputContainer mb-5'}></div>
                        <input value={skills} placeholder = "Enter your skills here" onChange={(ev) => setSkills(ev.target.value)} type = "skills" className = "w-full input input-bordered input-primary rounded-md" />
                        <label className="errorLabel">{skillsError}</label>

                        <button className={`btn text-lg text-white btn-info w-full rounded-md mt-5`} >Next</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
