import React, { useEffect } from 'react';

const ConnectSlack = () => {
  const slackUrl = `${import.meta.env.VITE_API_URL}/api/auth/slack`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team_id');

    if (teamId) {
      localStorage.setItem('team_id', teamId);
    }
  }, []);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Connect your Slack workspace</h2>
      <a href={slackUrl}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#4A154B',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Connect to Slack
        </button>
      </a>
    </div>
  );
};

export default ConnectSlack;
