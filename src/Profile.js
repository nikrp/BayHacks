import { useEffect, useState } from "react"
import { auth, db } from "./firebase"
import Chatbot from './ChatBot';

export default function Profile() {
    const [data, setData] = useState(undefined);
    const [skills, setSkills] = useState('')
    const [subjects, setSubjects] = useState('')  
    const [iValue, setIValue] = useState("");
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    useEffect(() => {
        async function collectUserData() {
            const doc = await db.collection(`users`).doc(auth.currentUser.uid).get();

            setData(doc.data());
            setIValue(doc.data().interests);
            setSubjects(doc.data().topics);
            setSkills(doc.data().skills);
        }

        collectUserData();
    }, []);

    async function updateData() {
        console.log(iValue, subjects.split(","), skills.split(","))
        await db.collection("users").doc(auth.currentUser.uid).update({
            interests: iValue,
            topics: subjects.split(','),
            skills: skills.split(','),
          });          
          
    }

    return (
        <div className={`flex-1 flex flex-col px-20`}>
            <div className="avatar placeholder w-fit h-fit mt-5 mx-auto mb-5">
                <div className="bg-neutral text-neutral-content w-40 rounded-full">
                    <span className="text-8xl mb-8">{data ? data.username.charAt(0).toUpperCase() : "loading..."}</span>
                </div>
            </div>
            <div className={`w-full gap-2 flex flex-wrap justify-between`}>
                <div className={`w-[49%]`}>
                    <p className={`font-semibold mb-1`}>Name</p>
                    <input className={`w-full input-bordered rounded-md input input-primary`} value={data ? data.fName + " " + data.lName : ""} readOnly/>
                </div>
                <div className={`w-[49%]`}>
                    <p className={`font-semibold mb-1`}>Username</p>
                    <input className={`w-full input-bordered rounded-md input input-primary`} value={data ? data.username : "loading..."} readOnly/>
                </div>
                <div className={`w-[49%]`}>
                    <p className={`font-semibold mb-1`}>Email</p>
                    <input className={`w-full input-bordered rounded-md input input-primary`} type="email" value={data ? auth.currentUser.email : "loading..."} readOnly/>
                </div>
                <div className={`w-[49%]`}>
                    <p className={`font-semibold mb-1`}>Password</p>
                    <input className={`w-full input-bordered rounded-md input input-primary`} type="password" value={data ? "HaiNikhil123#" : "loading..."} readOnly/>
                </div>
                <div className={`w-[49%]`}>
                    <p className={`font-semibold mb-1`}>Interests</p>
                    <input onChange={(e) => setIValue(e.target.value)} className={`w-full input-bordered rounded-md input input-primary`} type="text" value={data ? iValue : "loading..."} />
                </div>
                <div className={`w-[49%]`}>
                    <p className={`font-semibold mb-1`}>Topics You Need Help With</p>
                    <input onChange={(e) => setSubjects(e.target.value)} className={`w-full input-bordered rounded-md input input-primary`} type="text" value={data ? subjects : "loading..."} />
                </div>
                <div className={`w-[49%]`}>
                    <p className={`font-semibold mb-1`}>Skills You Are Good At</p>
                    <input onChange={(e) => setSkills(e.target.value)} className={`w-full input-bordered rounded-md input input-primary`} type="text" value={data ? skills : "loading..."} />
                </div>
                <div className={`w-[49%] flex items-end`}>
                    <button className={`btn btn-primary w-full rounded-md`} onClick={updateData}>Save</button>
                </div>
            </div>
            <div className="fixed bottom-4 right-4 flex flex-col items-end">
            <div className="relative">
                <div className="avatar placeholder cursor-pointer" onClick={toggleInfo}>
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <img src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg" alt="chatbot" width="20" height="20"/>
                </div>
                </div>
                {showInfo && (
                <div className="absolute bottom-full right-0 mb-2 z-10">
                    <Chatbot />
                </div>
                )}
            </div>
            </div>    
        </div>
    )
}