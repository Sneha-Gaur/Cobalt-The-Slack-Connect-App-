import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduledList = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');

    const fetchScheduled = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/scheduled`);
            setMessages(res.data.messages);
        } catch (err) {
            console.error(err);
            setStatus(' Failed to fetch scheduled messages.');
        }
    };

    //   const cancelMessage = async (id) => {
    //     try {
    //       await axios.post(`${import.meta.env.VITE_API_URL}/api/message/cancel`, { messageId: id });
    //       setStatus(' Message cancelled');
    //       fetchScheduled(); // Refresh list
    //     } catch (err) {
    //       console.error(err);
    //       setStatus(' Failed to cancel message.');
    //     }
    //   };

    const cancelMessage = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/message/${id}/cancel`);
            setStatus(' Message cancelled');
            fetchScheduled(); // Refresh the list
        } catch (err) {
            console.error(err);
            setStatus(' Failed to cancel message.');
        }
    };


    useEffect(() => {
        fetchScheduled();
    }, []);

    return (
        <div style={{ padding: '20px', width: '90%', margin: 'auto' }}>
            <h2> Scheduled Messages</h2>
            <p>{status}</p>
            {messages.length === 0 ? (
                <p>No scheduled messages.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th>Channel</th>
                            <th>Message</th>
                            <th>Send Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg._id} style={{ borderBottom: '1px solid #ccc' }}>
                                <td>{msg.channel}</td>
                                <td>{msg.message}</td>
                                <td>{new Date(msg.send_at).toLocaleString()}</td>
                                <td>
                                    <button
                                        onClick={() => cancelMessage(msg._id)}
                                        style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ScheduledList;
