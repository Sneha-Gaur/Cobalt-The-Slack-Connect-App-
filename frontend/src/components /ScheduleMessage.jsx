import React, { useState } from 'react';
import axios from 'axios';

const ScheduleMessage = () => {
  const [channel, setChannel] = useState('');
  const [message, setMessage] = useState('');
  const [datetime, setDatetime] = useState('');
  const [status, setStatus] = useState('');

  const handleSchedule = async () => {
    if (!channel || !message || !datetime) {
      setStatus('❗ Please fill all fields.');
      return;
    }

    const team_id = localStorage.getItem('team_id');
    if (!team_id) {
      setStatus(' Slack workspace not connected.');
      return;
    }
    console.log(channel,
        message,
        datetime,
        team_id);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/message/schedule`, {
        channel,
        message,
        // sendAt: datetime,
        sendAt: new Date(datetime).toISOString(),
        team_id
      });

      setStatus(' Message scheduled successfully!');
      setChannel('');
      setMessage('');
      setDatetime('');
    } catch (err) {
      console.error(err);
      setStatus(' Failed to schedule message.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '10px', width: '400px', margin: 'auto', marginTop: '30px' }}>
      <h2>Schedule Message</h2>

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
      />

      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <button onClick={handleSchedule} style={{ padding: '10px 20px' }}>Schedule</button>
      <p>{status}</p>
    </div>
  );
};

export default ScheduleMessage;
