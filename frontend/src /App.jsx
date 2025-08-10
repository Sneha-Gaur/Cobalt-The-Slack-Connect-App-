import React, { useEffect, useState } from 'react';
import ConnectSlack from './components/ConnectSlack';
import SendMessage from './components/SendMessage';
import ScheduleMessage from './components/ScheduleMessage'; 
import ScheduledList from './components/ScheduledList';

function App() {
  const [connected, setConnected] = useState(false);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   if (urlParams.get('connected') === 'true') {
  //     setConnected(true);
  //   }
  // }, []);
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const isConnected = urlParams.get('connected') === 'true';
  const teamId = urlParams.get('team_id');
    console.log('connected:', isConnected);
  console.log('teamId from URL:', teamId);
  if (isConnected) {
    setConnected(true);

    if (teamId) {
      localStorage.setItem('team_id', teamId);
    }
  }
}, []);

  return (
    <div style={{ padding: '2rem' }}>
  <h1>Slack Connect App</h1>

  {!connected && <ConnectSlack />}

  {connected && (
    <div
      style={{
        display: 'flex',
        gap: '4rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ width: '400px' }}>
        <SendMessage />
      </div>
      <div style={{ width: '400px' }}>
        <ScheduleMessage />
      </div>
      <div style={{ width: '600px' }}>
        <ScheduledList />
      </div>
    </div>
  )}
</div>

  );
}

export default App;
