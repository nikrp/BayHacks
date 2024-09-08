// src/components/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';


const API_KEY = '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'; // Replace with your actual API key


const Chatbot = () => {
 const [messages, setMessages] = useState([]);
 const [input, setInput] = useState('');


 const handleSend = async () => {
   if (input.trim() === '') return;


   // Add user's message to the chat
   setMessages([...messages, { role: 'user', content: input}]);
   setInput('');


   // Send message to OpenAI API
   try {
     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
       model: 'gpt-3.5-turbo',
       messages: [{ role: 'user', content: input  + "You are a chatbot for the app StudySphere. StudySphere is an app for students for students to meet students with similar interests to study together. You can use the buddy search tool to find people with similar interests."}],
     }, {
       headers: {
         'Authorization': `Bearer ${API_KEY}`,
         'Content-Type': 'application/json',
       },
     });


     const botReply = response.data.choices[0].message.content;


     // Add bot's reply to the chat
     setMessages([...messages, { role: 'user', content: input }, { role: 'bot', content: botReply }]);
   } catch (error) {
     console.error('Error sending message:', error);
   }
 };


 return (
   <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
     <div className="flex flex-col space-y-4 h-80 overflow-auto p-2 border-b border-gray-300">
       {messages.map((msg, index) => (
         <div key={index} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
           <div className={`p-2 rounded-lg ${msg.role === 'bot' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
             {msg.content}
           </div>
         </div>
       ))}
     </div>
     <div className="flex mt-4">
       <input
         type="text"
         className="flex-1 p-2 border border-gray-300 rounded-l-lg"
         value={input}
         onChange={(e) => setInput(e.target.value)}
         placeholder="Type your message..."
       />
       <button
         className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
         onClick={handleSend}
       >
         Send
       </button>
     </div>
   </div>
 );
};


export default Chatbot;