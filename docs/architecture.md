# Architecture Overview

This diagram illustrates the basic communication flow between the WebRTC Client and the Signaling Server.

```mermaid
sequenceDiagram
    participant Client as WebRTC Client (React)
    participant Server as Signaling Server (Node.js)
    participant Horizon as Horizon World

    Note over Client: User opens web app
    Client->>Server: GET /ping
    Server-->>Client: { "message": "pong" }
    Note over Client: Connection verified

    Note over Horizon: Script runs
    Horizon->>Horizon: printHello()
```

## Components

1.  **WebRTC Client**: A React application that will eventually handle video/audio streaming.
2.  **Signaling Server**: A Node.js server to facilitate the initial connection between peers.
3.  **Horizon Scripts**: TypeScript code running within Meta Horizon Worlds to interface with the VR environment.
