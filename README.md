# Task Manager App

A modern mobile task management application built with React Native, featuring user authentication and task organization capabilities.

## Features

- User Authentication (Login/Signup)
- Task Creation and Management
- Clean and Modern UI
- Secure Password Handling
- Cross-Platform Support (iOS & Android)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kumarsatyam444/task-manager-app.git
```

```bash
cd task-manager-app
```

```bash
npm install
```

```bash
cd frontend && npm install
```

```bash
cd backend && npm install
```

## Running the App

### Start the Backend Server:
```bash
cd backend
npm start
```

### Start the Frontend:
```bash
cd frontend
npm start
```

### Run on Android:
```bash
npm run android
```

### Run on iOS:
```bash
npm run ios
```

## Project Structure

```
task-manager-app/
├── frontend/
│   ├── src/
│   │   ├── screens/
│   │   ├── context/
│   │   ├── assets/
│   │   └── components/
│   ├── App.js
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
└── README.md
```

## Environment Setup

Create a .env file in the backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a .env file in the frontend directory:
```
API_URL=http://localhost:5000
```

## Tech Stack

- Frontend:
  - React Native
  - React Navigation
  - React Native Paper
  - Axios

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Kumar Satyam - ndakumarsatyam@gmail.com
Project Link: https://github.com/kumarsatyam444/task-manager-app
