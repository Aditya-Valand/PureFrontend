import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import { marked } from 'marked'; // Import marked for parsing markdown

const ChatBot = () => {
  const Auth = useAuth(); // Get the token from AuthContext
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Fetch response from the API endpoint with Authorization token
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat/bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.user.token}`, // Use token from AuthContext
        },
        body: JSON.stringify({ prompt: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }
      const data = await response.json();

      // Updated logic to handle dummy JSON structure
      if (data.status === "success" && data.data.length > 0) {
        const aiResponseContent = data.data;// Combine all parts into a single string
        const aiResponse = {
          content: aiResponseContent,
          sender: 'ai',
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        content:
          error.message || "Sorry, I couldn't process your message. Please try again.",
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to render markdown as HTML without sanitization
  const renderMarkdown = (markdownText) => {
    return marked(markdownText); // Convert markdown to HTML using marked.js
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F9F6]">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 4a2 2 0 1 1 4 0a7 7 0 1 1 -4 0" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Insight Buddy</h2>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === 'user'
                  ? 'bg-[#4CAF50] text-white rounded-br-sm'
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
              }`}
            >
              {message.sender === 'ai' ? (
                // Render AI messages as parsed markdown with Tailwind typography styling
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                />
              ) : (
                // Render user messages as plain text
                <p className="text-sm">{message.content}</p>
              )}
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl p-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white shadow-t">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message Insight Buddy..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
          />
          <button
            type="submit"
            className="p-2 bg-[#4CAF50] text-white rounded-full hover:bg-green-600 transition-colors"
            disabled={isTyping}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
