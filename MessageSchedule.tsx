import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MessageSchedule.css"; // ✅ Correct CSS file name

interface ScheduledMessage {
  id: number;
  channel: string;
  text: string;
  scheduleTime: string;
}

const MessageSchedule = () => {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const fetchScheduledMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/messages/scheduled"
      );
      setMessages(response.data || []);
    } catch (error) {
      console.error("Error fetching scheduled messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledMessages();
  }, []);

  const handleCancel = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      setStatus("Message cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling message:", error);
      setStatus("Failed to cancel message.");
    }
  };

  if (loading) return <p>Loading scheduled messages...</p>;

  return (
    <div className="scheduled-container">
      <h2>Scheduled Messages</h2>
      {status && <p className="status-message">{status}</p>}
      {messages.length === 0 ? (
        <p>No scheduled messages.</p>
      ) : (
        <table className="scheduled-table">
          <thead>
            <tr>
              <th>Channel</th>
              <th>Message</th>
              <th>Scheduled Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>#{msg.channel}</td>
                <td>{msg.text}</td>
                <td>{new Date(msg.scheduleTime).toLocaleString()}</td>
                <td>
                  <button
                    className="cancel-button"
                    onClick={() => handleCancel(msg.id)}
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

export default MessageSchedule;
