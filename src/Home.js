import logo from './Logo2.png';
import homebg from './homebg.png';
import { useNavigate } from 'react-router-dom'
import './output.css';
import AboutUs from './AboutUs';
import { motion } from "framer-motion";
import { useViewportScroll } from "framer-motion";
import { useTransform } from "framer-motion";
import { useState } from 'react';
import Chatbot from './ChatBot';
export default function Home() {
    const navigate = useNavigate();
    const { scrollYProgress } = useViewportScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };


    return (
        <div className={`min-h-screen flex-1`} >
            <div className={`px-32 py-5 w-screen flex flex-row justify-between items-center mb-20`}>
                <img src={logo} alt="Anish is goofy" className={`w-40 h-20`} />
                <div className={`flex flex-row items-center gap-6`}>
                    
                    <p className={`text-lg font-medium text-gray-500`}>Collaboration</p>
                    <a href="mailto:anish.khinvasara@gmail.com" className={`text-lg font-medium text-gray-500`}>Contact Us</a>
                </div>

                <div className={`flex items-center justify-center gap-4 `}>
                    <button style={{scale}} onClick={() => navigate('/Login', { replace: true })} className={`btn btn-info text-md rounded-full text-white px-5`}>Login</button>
                    <motion.button style={{scale}} onClick={() => navigate('/Signup', { replace: true })} className={`btn btn-info text-md rounded-full text-white px-5 `}>
        
                        Signup</motion.button>
                </div>
            </div>
            <div className={`px-32 py-5 flex flex-row`}>
                <div className={`w-1/2`}>
               
                    <motion.h1 style ={{ scale }} className={`text-5xl font-semibold text-gray-900 mb-5`}>
                    <motion.div
                        style={{
                        scaleY: scrollYProgress
                        }}
                        />
                        Working hard to create connections.</motion.h1>
                    <motion.p style = {{scale}} className={`tracking-wide text-gray-500 text-lg mb-5 mr-5`}>
                        
                        StudySphere connects students with similar interests to collaborate and study together. Users can match with peers, join study groups, and participate in collaborative learning activities through the app’s intuitive interface.</motion.p>
                    <div className={`flex items-center gap-5`}>
                        <motion.button style={{ scale }} className={`btn btn-info text-white text-md`}>
                        <motion.div
                        style={{
                        scaleY: scrollYProgress
                        }}
                        />
                            Join Us Today
                            </motion.button>
                    </div>
                </div>
                <div className="relative w-1/2"> {/* This container should have `relative` positioning */}
                    <div className="w-full">
                        <img src="https://www.themeetingmagazines.com/wp-content/uploads/2020/03/ACF-2020-03-Issue-Col2-860x418.jpg" alt="Collaborating Image" className="w-full h-full rounded-xl"
                        />
                    </div>
                </div>
            
                {/* <div className="bottom-4 right-4 fixed items-end">
        <div className="avatar placeholder cursor-pointer" onClick={toggleInfo}>
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span>AI</span>
          </div>
        </div>
        {showInfo && (
            <Chatbot />
        )}
      </div>
        */ }

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
            <AboutUs />




        </div>
    );

}