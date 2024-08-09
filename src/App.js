import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newMessage = { role: 'user', content: [{ type: 'text', text: userInput }] };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setUserInput('');

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/chat', {
          messages: [...messages, newMessage],
        });

        if (response.data.messages) {
          const assistantMessages = response.data.messages.map(msg => ({
            role: 'assistant',
            content: msg.content,
          }));
          setMessages(prevMessages => [...prevMessages, ...assistantMessages]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/upload', formData);

        if (response.data.image_url) {
          const newImageMessage = { role: 'user', content: [{ type: 'image_url', image_url: { url: response.data.image_url } }] };
          setMessages(prevMessages => [...prevMessages, newImageMessage]);
        } else if (response.data.image_urls) {
          const newImageMessages = response.data.image_urls.map(url => ({
            role: 'user',
            content: [{ type: 'image_url', image_url: { url } }],
          }));
          setMessages(prevMessages => [...prevMessages, ...newImageMessages]);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const renderMessageContent = (content) => {
    if (content[0].type === 'text') {
      return <span>{content[0].text}</span>;
    } else if (content[0].type === 'image_url') {
      return <img src={content[0].image_url.url} alt="Uploaded" style={{ maxWidth: '100%' }} />;
    }
  };

  return (
    <div className="container">
      <h1>The Maths Solver</h1>
      <div id="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {renderMessageContent(message.content)}
          </div>
        ))}
      </div>
      <div id="input-container">
        <input
          type="text"
          id="user-input"
          placeholder="Hi! Ask me anything..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button id="send-button" onClick={handleSendMessage}>Send</button>
      </div>
      <div id="file-upload-container">
        <input
          type="file"
          id="file-upload"
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default App;
