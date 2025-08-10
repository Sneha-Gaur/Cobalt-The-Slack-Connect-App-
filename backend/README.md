LIVE ON - https://slackconnectsagar.netlify.app/

**Important:** The backend runs on a free hosting plan and may be in a “cold start” state.
               When you open the deployed link, allow 30–40 seconds for the backend to wake up before interacting with the application.

# Slack Connect

A full-stack application that allows users to connect their Slack workspace via OAuth 2.0, send messages immediately or schedule them for future delivery, and manage scheduled messages. Built with React (Vite) on the frontend and Node.js (TypeScript, Express) on the backend, with token and message persistence in a lightweight JSON database.

---

## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Clone Repository](#clone-repository)
  * [Environment Configuration](#environment-configuration)
  * [Install Dependencies](#install-dependencies)
  * [Running the Application](#running-the-application)
* [Usage](#usage)
* [Architectural Overview](#Architectural-Overview)
* [Photos](#Photos)

---

## Features

* **OAuth 2.0 Slack Connection**: Securely connect and authorize a Slack workspace.
* **Token Management**: Store and refresh access tokens automatically before expiry.
* **Immediate Messaging**: Send messages instantly to any selected Slack channel.
* **Scheduled Messaging**: Schedule messages to be delivered at a specified future date and time.
* **Scheduled Message Management**: View, list, and cancel pending scheduled messages.

---

## Technology Stack

* **Frontend**: React, Vite, TypeScript, Axios
* **Backend**: Node.js, Express.js, TypeScript
* **Persistence**: 
* **OAuth 2.0**: Slack OAuth v2 API
* **Scheduling**: Node-cron (or similar) for executing scheduled tasks

---

## Getting Started

### Prerequisites

* Node.js (>= v14.x)
* npm (>= v6.x) or yarn
* A Slack workspace and a registered Slack App with OAuth scopes:

  * `channels:read`
  * `chat:write`
  * `chat:write.public`

### Clone Repository

```bash
For Frontend
git clone https://github.com/<Sagargupta5159>/slack-connect-frontend.git
For Backend
git clone https://github.com/<Sagargupta5159>/slack-connect-backend.git
cd slack-connect
```

### Environment Configuration

Create a `.env` file in the **root** of the project with the following variables:

```ini
# Slack OAuth
SLACK_CLIENT_ID=<your-slack-client-id>
SLACK_CLIENT_SECRET=<your-slack-client-secret>
SLACK_REDIRECT_URI=http://localhost:5000/api/auth/slack/callback

# Server
PORT=5000

# MongoDB
```

> **Note:** Ensure that `SLACK_REDIRECT_URI` matches the redirect URL configured in your Slack App settings.

### Install Dependencies

Install backend and frontend dependencies separately:

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### Running the Application

#### Start Backend

```bash
cd backend
npm run dev
```

This starts the backend server at `http://localhost:5000`.

#### Start Frontend

```bash
cd frontend
npm run dev
```

This starts the frontend at `http://localhost:5173` (or as configured by Vite).

---

## Usage

1. Navigate to the frontend URL.
2. Click **Connect to Slack** and authorize your workspace.
3. Select a channel from the dropdown.
4. Compose a message and choose **Send Now** or **Schedule**.
5. If scheduling, pick a date and time; view and manage pending messages in the **Scheduled** tab.

---

## Architectural Overview

* **OAuth Flow**: The frontend redirects users to Slack’s OAuth endpoint. Upon approval, Slack returns an authorization code to the backend callback endpoint, which exchanges it for access and refresh tokens.
* **Token Management**: Tokens are stored securely in a [Mongo](https://www.mongodb.com/). A refresh logic runs before token expiry to obtain a new access token using the stored refresh token.
* **Immediate Messaging**: On send, the backend calls Slack’s `chat.postMessage` API with the access token and channel info.
* **Scheduling Engine**: Scheduled messages are persisted in MongoDB. A scheduler (using node-cron) polls or triggers at the specified times to dispatch stored messages.
* **Message Management**: Endpoints to list and delete scheduled entries allow the frontend to display and cancel pending messages.

---

## Photos

---<img width="1894" height="904" alt="Screenshot 2025-08-08 001828" src="https://github.com/user-attachments/assets/ddad9d90-ad07-493d-9260-7dc8237c75ef" />


<img width="1247" height="341" alt="Screenshot 2025-08-08 003651" src="https://github.com/user-attachments/assets/71d90751-8949-4723-9035-d63c49aec473" />


##
