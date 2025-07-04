# YAPSTER 💬

A modern, real-time chat application built with the MERN stack featuring instant messaging, user authentication, and media sharing capabilities.

## 🚀 Quick Navigation

- [📋 Clone & Setup](#-quick-start) - Get started locally
- [🐳 Docker Deployment](#-docker-deployment) - Deploy with Docker
- [🌐 Live Demo](#-live-demo) - Try the live app

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-blue?style=for-the-badge&logo=render)](https://yapster.kbuilds.me)

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based login/signup system
- 💬 **Real-time Messaging** - Instant message delivery with Socket.io
- 🖼️ **Image Sharing** - Upload and share images with Cloudinary integration
- 👥 **Online Status** - See who's online in real-time
- 🎨 **Theme Toggle** - Dark/Light mode with DaisyUI
- 📱 **Responsive Design** - Mobile-first, cross-platform compatibility
- 💾 **Message Persistence** - Chat history saved in MongoDB
- 🔒 **Secure** - XSS & CSRF protection with encrypted passwords

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Zustand** - State management
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time engine
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Cloud & DevOps
- **Cloudinary** - Image storage & optimization
- **Docker** - Containerization
- **Render** - Cloud deployment
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/25Kamalesh/yapster.git
   cd yapster
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd Backend
   npm install
   
   # Frontend
   cd ../Frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in Backend directory
   cp Backend/.env.example Backend/.env
   ```
   
   Edit `Backend/.env` with your credentials:
   ```env
   PORT=4000
   NODE_ENV=development
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-key
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd Backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd Frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000

## 🐳 Docker Deployment

### Local Docker Setup

```bash
# Build the Docker image
docker build -t yapster:latest .

# Run with environment variables
docker run -p 4000:4000 \
  -e NODE_ENV=production \
  -e MONGO_URI="your-mongodb-uri" \
  -e JWT_SECRET="your-secret" \
  -e CLOUDINARY_CLOUD_NAME="your-cloud" \
  -e CLOUDINARY_API_KEY="your-key" \
  -e CLOUDINARY_API_SECRET="your-secret" \
  yapster:latest
```

### Docker Hub

```bash
# Pull from Docker Hub
docker pull kamalesh25/yapster:latest

# Run the container
docker run -p 4000:4000 --env-file .env kamalesh25/yapster:latest
```

## 📁 Project Structure

```
yapster/
├── Backend/
│   ├── src/
│   │   ├── Controllers/       # API controllers
│   │   ├── Models/           # Database models
│   │   ├── Routes/           # API routes
│   │   ├── Middlewares/      # Custom middleware
│   │   ├── lib/              # Utilities & config
│   │   └── Server.js         # Main server file
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── Components/       # React components
│   │   ├── Store/           # Zustand stores
│   │   ├── lib/             # Utilities
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   └── package.json
├── Dockerfile               # Container configuration
├── .dockerignore           # Docker ignore rules
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/SignUp` - User registration
- `POST /api/v1/auth/SignIn` - User login
- `POST /api/v1/auth/SignOut` - User logout
- `GET /api/v1/auth/check` - Check auth status
- `PUT /api/v1/auth/update-profile` - Update profile

### Messages
- `GET /api/v1/messages/users` - Get all users
- `GET /api/v1/messages/:id` - Get messages with user
- `POST /api/v1/messages/send/:id` - Send message

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | ✅ |
| `NODE_ENV` | Environment mode | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `JWT_EXPIRES_IN` | JWT expiration time | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ‍💻 Author

**Kamalesh**
- GitHub: [@25Kamalesh](https://github.com/25Kamalesh)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- Email: kamaleshb.2004@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Socket.io](https://socket.io/) - Real-time communication
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [MongoDB](https://mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image management

---

⭐ If you found this project helpful, please give it a star on GitHub!

