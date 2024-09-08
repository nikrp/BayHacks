import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import AboutUs from "./AboutUs";
import { useState } from "react";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import ChatBot from "./ChatBot";
import Questions from "./Questions";
import BuddySearch from "./BuddySearch";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className={`${signedIn ? `flex flex-row` : `flex flex-col`}`}>
      {signedIn && <Sidebar />}
      <Routes>
        <Route path ="/signup" element= {<Signup/>}/>
        <Route path ="/login" element= {<Login setSignedIn={setSignedIn}/>}/>
        <Route path = "/AboutUs" element= {<AboutUs/>}/>
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/BuddySearch" element={<BuddySearch/>}/>
      </Routes>
    </div>
  );
}

export default App