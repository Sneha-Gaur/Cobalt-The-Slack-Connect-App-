Important: The backend runs on a free hosting plan and may be in a “cold start” state. When you open the deployed link, allow 30–40 seconds for the backend to wake up before interacting with the application.

Slack Connect
A full-stack application that allows users to connect their Slack workspace via OAuth 2.0, send messages immediately or schedule them for future delivery, and manage scheduled messages. Built with React (Vite) on the frontend and Node.js (TypeScript, Express) on the backend, with token and message persistence in a lightweight JSON database.

Table of Contents
Features

Technology Stack

Getting Started

Prerequisites
Clone Repository
Environment Configuration
Install Dependencies
Running the Application
Usage

Architectural Overview

Photos

Features
OAuth 2.0 Slack Connection: Securely connect and authorize a Slack workspace.
Token Management: Store and refresh access tokens automatically before expiry.
Immediate Messaging: Send messages instantly to any selected Slack channel.
Scheduled Messaging: Schedule messages to be delivered at a specified future date and time.
Scheduled Message Management: View, list, and cancel pending scheduled messages.
Technology Stack
Frontend: React, Vite, TypeScript, Axios
Backend: Node.js, Express.js, TypeScript
Persistence: 
OAuth 2.0: Slack OAuth v2 API
Scheduling: Node-cron (or similar) for executing scheduled tasks
Getting Started
Prerequisites
Node.js (>= v14.x)

npm (>= v6.x) or yarn

A Slack workspace and a registered Slack App with OAuth scopes:

channels:read
chat:write
chat:write.public
Clone Repository
For Frontend
git clone https://github.com/<Sagargupta5159>/slack-connect-frontend.git
For Backend
git clone https://github.com/<Sagargupta5159>/slack-connect-backend.git
cd slack-connect
Environment Configuration
Create a .env file in the root of the project with the following variables:

# Slack OAuth
SLACK_CLIENT_ID=<your-slack-client-id>
SLACK_CLIENT_SECRET=<your-slack-client-secret>
SLACK_REDIRECT_URI=http://localhost:5000/api/auth/slack/callback

# Server
PORT=5000

# MongoDB
Note: Ensure that SLACK_REDIRECT_URI matches the redirect URL configured in your Slack App settings.

Install Dependencies
Install backend and frontend dependencies separately:

Backend
cd backend
npm install
Frontend
cd ../frontend
npm install
Running the Application
Start Backend
cd backend
npm run dev
This starts the backend server at http://localhost:5000.

Start Frontend
cd frontend
npm run dev
This starts the frontend at http://localhost:5173 (or as configured by Vite).

Usage
Navigate to the frontend URL.
Click Connect to Slack and authorize your workspace.
Select a channel from the dropdown.
Compose a message and choose Send Now or Schedule.
If scheduling, pick a date and time; view and manage pending messages in the Scheduled tab.
Architectural Overview
OAuth Flow: The frontend redirects users to Slack’s OAuth endpoint. Upon approval, Slack returns an authorization code to the backend callback endpoint, which exchanges it for access and refresh tokens.
Token Management: Tokens are stored securely in a Mongo. A refresh logic runs before token expiry to obtain a new access token using the stored refresh token.
Immediate Messaging: On send, the backend calls Slack’s chat.postMessage API with the access token and channel info.
Scheduling Engine: Scheduled messages are persisted in MongoDB. A scheduler (using node-cron) polls or triggers at the specified times to dispatch stored messages.
Message Management: Endpoints to list and delete scheduled entries allow the frontend to display and cancel pending messages.

Photos--
Send and Schedule Message Page
This page allows users to send an immediate message or schedule a message for a future date and time.

Send Immediate Message: Enter the channel ID and message, then click Send to deliver it instantly to the selected Slack channel.

Schedule Message: Enter the channel ID, message, and select a date and time, then click Schedule to set up a future delivery.
Below these sections, the Scheduled Messages table displays any pending messages along with their channel, message content, scheduled time, and an option to cancel them.
<img width="1894" height="904" alt="send and schedule message" src="https://github.com/user-attachments/assets/4c5d1b3f-5fcf-4b62-88cc-60923a9f19f9" />

Scheduled Messages List (After Scheduling)
Once a message is scheduled, it appears in this list showing:

Channel – The Slack channel ID where the message will be sent.

Message – The text content of the scheduled message.

Send Time – The exact date and time when the message will be delivered.

Action – A Cancel button to remove the scheduled message before it is sent.
<img width="1247" height="341" alt="After schedule the message" src="https://github.com/user-attachments/assets/638b09c0-a355-4947-8414-ae9ad3575b37" />
