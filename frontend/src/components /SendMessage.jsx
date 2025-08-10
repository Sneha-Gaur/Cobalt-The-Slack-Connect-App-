// src/components/SendMessage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
  const [channel, setChannel] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    if (!channel || !message) {
      setStatus('Please enter both channel ID and message.');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/message/send`, {
        channel,
        message,
      });

      setStatus(' Message sent successfully!');
      setChannel('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus(' Failed to send message.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '10px', width: '400px', margin: 'auto', marginTop: '50px' }}>
      <h2>Send Immediate Message</h2>
      <input
        type="text"
        placeholder="Channel ID"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      ></textarea>
      <button onClick={handleSend} style={{ padding: '10px 20px' }}>Send</button>
      <p>{status}</p>
    </div>
  );
};

export default SendMessage;
