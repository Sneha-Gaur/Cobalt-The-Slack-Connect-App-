import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConnectSlack from "./connects/ConnectSlack";
import MessageForm from "./message/MessageForm";
import MessageSchedule from "./schedule/MessageSchedule";
import "./main.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1>Slack Connect</h1>
          <ul>
            <li>
              <Link to="/">Connect</Link>
            </li>
            <li>
              <Link to="/message">Send Message</Link>
            </li>
            <li>
              <Link to="/scheduled">Schedule Messages</Link>
            </li>{" "}
            {/* lowercase */}
          </ul>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<ConnectSlack />} />
            <Route path="/message" element={<MessageForm />} />
            <Route path="/scheduled" element={<MessageSchedule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
