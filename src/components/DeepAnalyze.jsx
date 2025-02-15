import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { marked } from "marked";

const DeepAnalyze = () => {
  const { session } = useParams(); // Get session ID from URL params
  const Auth = useAuth();

  const [messages, setMessages] = useState([]); // Chat messages
  const [inputMessage, setInputMessage] = useState(''); // User input
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of chat messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch initial analysis from session API (GET request)
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat/history/${session}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Auth.user.token}`, // Add token to request header
          },
        });

        if (!response.ok) throw new Error('Failed to fetch analysis');

        const data = await response.json();

        // Add initial analysis as the first message in the chat
        const initialMessage = {
          content: data.data[1]?.text || 'No analysis available.',
          sender: 'ai',
          timestamp: new Date().toISOString(),
        };
        setMessages([initialMessage]); // Set initial message as the first chat message
      } catch (error) {
        console.error('Error fetching analysis:', error);
        const errorMessage = {
          content: 'Failed to fetch analysis. Please try again.',
          sender: 'ai',
          timestamp: new Date().toISOString(),
        };
        setMessages([errorMessage]);
      }
    };

    if (session && Auth.user?.token) {
      fetchAnalysis();
    }
  }, [session, Auth.user]);

  // Handle sending a message in the chat
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat/bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.user.token}`,
        },
        body: JSON.stringify({ prompt: inputMessage }),
      });

      if (!response.ok) throw new Error('Failed to fetch response from server');

      const data = await response.json();

      if (data.status === "success" && data.data.length > 0) {
        const aiResponseContent = data.data; // Assuming this is a string or markdown content
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

  // Render Markdown as HTML using marked.js
  const renderMarkdown = (markdownText) => marked(markdownText);

  return (
    <div className="flex flex-col h-screen bg-[#F5F9F6]">
      {/* Chat Messages Container */}
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
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                />
              ) : (
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
            placeholder="Ask Insight Buddy..."
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

export default DeepAnalyze;
