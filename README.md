# SMM - Social Media Manager

A full-featured social media scheduling and management application built with React and Node.js.

## Features

- 📅 **Content Calendar** - Schedule and manage posts across multiple platforms
- 🖼️ **Media Library** - Upload, organize, and manage media files
- 📱 **Multi-Platform Support** - Instagram, Facebook, Twitter, TikTok, LinkedIn, YouTube, Threads, Snapchat
- 📊 **Analytics Dashboard** - Track engagement, impressions, and audience insights
- 💬 **Social Inbox** - Manage messages and comments from all platforms
- ⚙️ **Settings** - User preferences, account management, and integrations

## Project Structure

```
smm/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Full page components
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── App.js          # Main app component
│   │   └── index.js        # App entry point
│   ├── public/             # Static files
│   └── package.json        # Frontend dependencies
│
└── backend/                 # Node.js Express server
    ├── src/
    │   ├── models/         # Mongoose schemas
    │   ├── routes/         # API routes
    │   ├── controllers/    # Route controllers (future)
    │   └── index.js        # Server entry point
    ├── .env.example        # Environment template
    └── package.json        # Backend dependencies
```

## Technology Stack

### Frontend
- React 18+
- React Router v6
- Axios for API calls
- CSS3 / Responsive Design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
```bash
cd smm
```

2. **Frontend Setup**
```bash
cd frontend
npm install
```

3. **Backend Setup**
```bash
cd ../backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```
Server runs on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm start
```
App runs on `http://localhost:3000`

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Media
- `GET /api/media` - Get all media
- `POST /api/media` - Upload media
- `DELETE /api/media/:id` - Delete media

### Social Accounts
- `GET /api/social-accounts` - Get all connected accounts
- `POST /api/social-accounts` - Connect new account
- `DELETE /api/social-accounts/:id` - Disconnect account

### Analytics
- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/posts/:id` - Get post analytics
- `GET /api/analytics/range` - Get analytics by date range

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id` - Update user profile

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/smm
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
PORT=5000
```

## Features Roadmap

- [ ] Social media API integrations
- [ ] Advanced scheduling with timezone support
- [ ] Collaboration and team management
- [ ] Custom analytics reports
- [ ] AI-powered caption suggestions
- [ ] Hashtag recommendations
- [ ] Post templates
- [ ] Content calendar views (week/month/year)
- [ ] Mobile app
- [ ] Webhook support for real-time updates

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.

## Support

For support, email support@smm-app.com or create an issue in the repository.
