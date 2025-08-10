<img width="1894" height="904" alt="send and schedule message" src="https://github.com/user-attachments/assets/b239e3be-46fc-461f-8bd0-7ef9bd529d78" />
Important: Backend free hosting par hai, isliye cold start ho sakta hai. Pehli baar kholte waqt 30-40 seconds intezar karein backend ke ready hone ke liye.

Slack Connect
Full-stack app jo Slack workspace ko OAuth 2.0 se connect karta hai, messages turant bhejne ya future mein schedule karne, aur scheduled messages manage karne ka feature deta hai.
Frontend: React (Vite), Backend: Node.js (TypeScript, Express), Data storage: lightweight JSON database.

Table of Contents

Features

Technology Stack

Getting Started

Usage

Architectural Overview

Photos

Features

OAuth 2.0 Slack Connection: Secure workspace authorization

Token Management: Access tokens store aur expiry se pehle refresh

Immediate Messaging: Turant messages bhejna

Scheduled Messaging: Future mein message delivery schedule karna

Scheduled Message Management: Pending messages dekhna, list karna, cancel karna

Technology Stack

Frontend: React, Vite, TypeScript, Axios

Backend: Node.js, Express.js, TypeScript

Persistence: JSON database

OAuth 2.0: Slack OAuth v2 API

Scheduling: node-cron (ya similar) for scheduled tasks

Getting Started

Prerequisites:

Node.js (>=14.x)

npm (>=6.x) ya yarn

Slack workspace aur registered Slack App with scopes:
channels:read, chat:write, chat:write.public

Clone Repository:

Frontend: git clone https://github.com/<Sagargupta5159>/slack-connect-frontend.git

Backend: git clone https://github.com/<Sagargupta5159>/slack-connect-backend.git

Environment Configuration:
.env file mein variables set karein:

ini
Copy
Edit
SLACK_CLIENT_ID=<your-slack-client-id>  
SLACK_CLIENT_SECRET=<your-slack-client-secret>  
SLACK_REDIRECT_URI=http://localhost:5000/api/auth/slack/callback  
PORT=5000  
Note: SLACK_REDIRECT_URI Slack App settings ke redirect URL se match hona chahiye.

Install Dependencies:

Backend: cd backend → npm install

Frontend: cd frontend → npm install

Running the Application:

Backend: cd backend → npm run dev (http://localhost:5000)

Frontend: cd frontend → npm run dev (http://localhost:5173)

Usage

Frontend URL pe jaayein

"Connect to Slack" click karein, workspace authorize karein

Channel select karein

Message likhein, "Send Now" ya "Schedule" choose karein

Agar schedule kiya hai, date-time pick karein

Scheduled tab mein pending messages dekh aur cancel kar sakte hain

Architectural Overview

OAuth Flow: Frontend se Slack OAuth endpoint, authorization code backend mein, backend tokens exchange karta hai

Token Management: Tokens MongoDB mein securely saved, refresh token se expiry se pehle new access token

Immediate Messaging: Backend Slack API chat.postMessage call karta hai

Scheduling Engine: Messages MongoDB mein saved, node-cron scheduler specified time par message send karta hai

Message Management: APIs to list/delete scheduled messages for frontend display and cancellation



