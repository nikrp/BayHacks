import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import Chatbot from './ChatBot';


export default function BuddySearch()

{
    const [searchTopic,setSearch]= useState('');
    const [searchTopicError, setSearchTopicError] = useState('')
    const [data, setData] = useState(undefined);
    const [skills, setSkills] = useState([])
    const [subjects, setSubjects] = useState([])  
    const [iValue, setIValue] = useState([]);
    const [results, setResults] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () => {
        setShowInfo(!showInfo);
      };

      async function updateResults() {
        if (!skills || skills.length === 0 || !subjects || subjects.length === 0) {
          console.error('Both skills and subjects must be non-empty arrays.');
          return;
        }
      
        try {
          const results = new Map();
      
          const topicsQuerySnapshot = await db.collection("users")
            .where("topics", "array-contains-any", skills)
            .get();
          
          topicsQuerySnapshot.forEach(doc => {
            results.set(doc.id, doc.data());
          });
      
          const skillsQuerySnapshot = await db.collection("users")
            .where("skills", "array-contains-any", subjects)
            .get();
          
          skillsQuerySnapshot.forEach(doc => {
            results.set(doc.id, doc.data());
          });
      
          const finalResults = Array.from(results.values());
      
          console.log(finalResults);
          setResults(finalResults);
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      }

    useEffect(() => {
        async function collectUserData() {
            const doc = await db.collection(`users`).doc(auth.currentUser.uid).get();

            setData(doc.data());
            setIValue(doc.data().interests);
            setSubjects(doc.data().topics);
            setSkills(doc.data().skills);

            updateResults(doc.data().skills, doc.data().topics);
        }
          
        collectUserData();
    }, []);

    const navigate = useNavigate()
    return (
        <div className="flex flex-col flex-1 items-center h-screen px-20">
            <h1 className="text-6xl text-bold m-4 text-center font-semibold">Buddy Search</h1>
            <button onClick={() => updateResults()} className={`btn text-lg m-4 text-white btn-info w-1/4 item-center gap-3 rounded-md mx-auto`}>Refresh</button>
            
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Needs Help With</th>
                        <th>Is Good At</th>
                    </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            return (
                                <tr>
                                    <th>{index + 1}</th>
                                    <th>{result.fName + result.lName}</th>
                                    <th>{result.email}</th>
                                    <th>{result.topics.join(', ')}</th>
                                    <th>{result.skills.join(', ')}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col justify-center px-20">    
            
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
        </div>
    );
}