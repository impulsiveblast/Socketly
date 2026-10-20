# Socketly — Real-Time Chat Application

**Socketly** is a lightweight real-time messaging application built with Node.js, Express.js, and Socket.IO. It enables connected users to exchange messages instantly and tracks active connections through event-driven, bidirectional communication.

**[Live Demo](https://socketly.vercel.app/) · [GitHub Repository](https://github.com/impulsiveblast/Socketly)**

## Overview

Traditional HTTP communication typically follows a request-response model. Socketly uses Socket.IO to establish persistent, event-driven communication between clients and the server, allowing messages and connection updates to be delivered in real time.

The project demonstrates practical implementation of WebSocket-based communication, server-side event handling, client presence tracking, and event broadcasting.

## Features

- **Real-Time Messaging:** Exchange messages between connected clients without manually refreshing the page.
- **Live Client Tracking:** Maintain the number of connected clients and broadcast updated counts when users connect or disconnect.
- **Event-Driven Communication:** Handle connection, disconnection, message, and feedback events using Socket.IO.
- **Server-Side Broadcasting:** Deliver messages to other connected clients using Socket.IO's broadcast mechanism.
- **Lightweight Backend:** Use Express.js to serve static frontend assets and manage the HTTP server hosting Socket.IO.
- **Live Deployment:** Access the application through the deployed web interface.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js |
| Web Framework | Express.js |
| Real-Time Communication | Socket.IO |
| Frontend | HTML, CSS, JavaScript |
| Deployment | Vercel |

## Architecture

```text
          Client A                 Client B
              │                        │
              └──────────┬─────────────┘
                         │
                    Socket.IO
                         │
                 Node.js + Express
                         │
                 Event-Based Server
                         │
          ┌──────────────┴──────────────┐
          │                             │
    Message Broadcast            Client Tracking
          │                             │
    Other Connected             Live Client Count
       Clients                    Broadcast
```

## How It Works

1. **Server Initialization:** Express creates the HTTP server, and Socket.IO attaches to it to handle real-time connections.
2. **Client Connection:** When a client connects, its socket ID is added to a server-side `Set`.
3. **Presence Update:** The server broadcasts the updated number of connected clients through the `clients-total` event.
4. **Message Handling:** The server listens for incoming `message` events and broadcasts the payload to other connected clients.
5. **Feedback Events:** Incoming `feedback` events are relayed to other clients.
6. **Disconnection Handling:** When a client disconnects, its socket ID is removed and the updated client count is broadcast to everyone.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/impulsiveblast/Socketly.git
cd Socketly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm start
```

The server runs on port `4000` by default. Open `http://localhost:4000` in your browser.

To run the application in development mode with automatic server restarts:

```bash
npm run dev
```

## Project Structure

```text
Socketly/
├── view/                 # Frontend assets
├── app.js                # Express and Socket.IO server
├── package.json          # Dependencies and npm scripts
├── package-lock.json     # Dependency lockfile
└── README.md             # Project documentation
```

## Key Engineering Concepts

- **Persistent connections:** Maintain a communication channel for real-time events.
- **Event-driven architecture:** Respond to client events without repeatedly polling the server.
- **Broadcast communication:** Relay messages to connected peers through Socket.IO.
- **Connection lifecycle management:** Track socket connections and clean up disconnected clients.
- **Separation of concerns:** Serve the frontend independently from the server's real-time event-handling logic.

## Future Enhancements

- User authentication and identity management.
- Private messaging and chat rooms.
- Persistent message history using a database.
- Typing indicators and delivery/read receipts.
- Reconnection handling and improved error states.
- Automated tests for messaging and connection lifecycle events.

## Author

**Brahamjeet Anand**

- GitHub: [@impulsiveblast](https://github.com/impulsiveblast)

---

*Built to explore real-time web communication, Socket.IO event handling, and event-driven backend development.*
