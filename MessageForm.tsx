// src/message/MessageForm.tsx
import React, { useEffect, useState } from "react";
import "./MessageForm.css";
import axios from "axios";

interface Channel {
  id: string;
  name: string;
}

const MessageForm = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Fetch available Slack channels on component load
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/channels");
        setChannels(response.data.channels);
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      }
    };

    fetchChannels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChannel || !message) {
      setStatus("Please select a channel and enter a message.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const payload = {
        channel: selectedChannel,
        text: message,
        ...(schedule && scheduleDate ? { scheduleTime: scheduleDate } : {}),
      };

      const endpoint = schedule
        ? "http://localhost:5000/api/messages/schedule"
        : "http://localhost:5000/api/messages/send";

      const response = await axios.post(endpoint, payload);

      setStatus(response.data.message || "Message processed.");
      setMessage("");
      setScheduleDate("");
      setSchedule(false);
    } catch (error) {
      console.error("Message sending failed:", error);
      setStatus("Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <div className="message-form-container">
      <h2>Send or Schedule a Slack Message</h2>
      <form onSubmit={handleSubmit} className="message-form">
        <label>
          Choose Channel:
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
          >
            <option value="">-- Select Channel --</option>
            {channels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                #{channel.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Message:
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </label>

        <label className="schedule-toggle">
          <input
            type="checkbox"
            checked={schedule}
            onChange={() => setSchedule(!schedule)}
          />
          Schedule Message
        </label>

        {schedule && (
          <label>
            Schedule Date & Time:
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </label>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : schedule ? "Schedule Message" : "Send Now"}
        </button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default MessageForm;
