// src/connects/ConnectSlack.tsx
import React from "react";
import "./ConnectSlack.css";

const ConnectSlack = () => {
  const handleConnect = () => {
    const clientId = "YOUR_SLACK_CLIENT_ID"; // Replace with env or config
    const redirectUri = "http://localhost:5000/api/auth/slack/callback"; // Backend URL

    const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=chat:write,channels:read,users:read&redirect_uri=${redirectUri}`;
    window.location.href = slackAuthUrl;
  };

  return (
    <div className="connect-container">
      <h2>Connect Your Slack Workspace</h2>
      <button onClick={handleConnect} className="connect-button">
        Connect to Slack
      </button>
    </div>
  );
};

export default ConnectSlack;
