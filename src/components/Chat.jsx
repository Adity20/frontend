import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { motion } from 'framer-motion';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:1337', {
      transports: ['polling']
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', handleMessage);
    }
  }, [socket]);

  const handleMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && message) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Chat Room</h2>
        <div className="overflow-y-auto h-64 bg-gray-100 rounded-md p-4 mb-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className="bg-blue-500 text-white p-2 rounded-lg mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {msg}
            </motion.div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-grow px-4 py-2 rounded-l-md border-t border-l border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
