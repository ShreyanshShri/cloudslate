# Cloudslate

Cloudslate - an innovative platform designed to empower educators, teams, and creators to collaborate seamlessly, anytime and anywhere.

CloudSlate will allow educators, trainers, and teams to:

1. Create & Collaborate in Real Time
2. Enhance Engagement with multiple specialized tools like
   - Text Editor
   - Code Editor
   - White Board
   - Graph Plotter
   - Quiz Generator
   - Circuit maker
   - Virtual Physics lab
   - Virtual Chemistry lab

### Site:

https://cloudslate.vercel.app/

### Backend structure:

https://satisfying-baboon-b23.notion.site/Cloudslate-API-17e5ac324ee4802abc93fde001cc0033?pvs=4

## Installation

### HTTP Server

#### Setup

Create .env in /server/http/ directory

```
MONGODB_URI=<your mongodb uri>
JWT_PVT_KRY=<any string as a pvt key>
```

#### Installation

```
cd server/http
npm install
```

#### Running the server

```
npm start
```

The Server will start on 5000

### Client

#### Setup

Create .env in /client/ directory

```
VITE_SERVER_URL=http://localhost:3000/api/v1
```

#### Installation

```
cd client
npm install
```

#### Running the app

```
npm run dev
```

The client will start on port 5173 (default vite port).

Your app should be running on http://localhost:5173/
