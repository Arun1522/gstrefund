// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import { findAnswer } from './fuzzySearch';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);

    const handleAsk = () => {
        if (!query.trim()) return;

        setLoading(true);
        setChat([...chat, { question: query, answer: '...' }]);
        setQuery('');

        setTimeout(() => {
            const response = findAnswer(query);
            setChat(prevChat => {
                const newChat = [...prevChat];
                newChat[newChat.length - 1].answer = response;
                return newChat;
            });
            setLoading(false);
        }, 1000); // simulate a delay for answer generation
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chat]);

    return (
        <div className="App">
            <h1>GST Refund AI</h1>
            <div ref={chatContainerRef} className="chat-container">
                {chat.map((msg, index) => (
                    <div key={index} className="message">
                        <div className="question">{msg.question}</div>
                        <div className="answer">{msg.answer}</div>
                    </div>
                ))}
                {loading && <div className="loading">Please wait, your answer is generating...</div>}
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Ask a question about GST refund..."
                    onKeyPress={(e) => { if (e.key === 'Enter') handleAsk(); }}
                />
                <button onClick={handleAsk}>Ask</button>
            </div>
        </div>
    );
}

export default App;
