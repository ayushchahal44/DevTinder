# DevTinder - Developer Networking Platform

DevTinder is a modern web application designed to help developers connect, collaborate, and find their perfect tech match. Built with Next.js, TypeScript, and Tailwind CSS, it provides a Tinder-like interface for professional networking in the tech industry.

## 🖼️ Screenshots & Demo

### Home Page
![Home Page](public/screenshots/home.png)

### Discovery Page
![Discovery Page](public/screenshots/discover.png)

### Profile View
![Profile View](public/screenshots/profile.png)

### Connection Request
![Connection Request](public/screenshots/connect.png)

## Features

### 🎯 Core Features
- **Swipe Interface**: Tinder-like interface for discovering developers
- **Profile Management**: Detailed developer profiles with skills, experience, and social links
- **Connection System**: Send and manage connection requests
- **Search & Filter**: Advanced search and filtering capabilities
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔍 Discovery Features
- **Skill-based Matching**: Find developers based on technical skills
- **Location-based Search**: Filter developers by location
- **Experience Level Filtering**: Match with developers of similar experience
- **Interactive Profiles**: View detailed information with expandable sections

### 💬 Social Features
- **Connection Requests**: Send personalized connection requests
- **Social Media Integration**: Links to GitHub, LinkedIn, and Twitter
- **Profile Sharing**: Share developer profiles with others
- **Real-time Updates**: Instant feedback on actions

## Tech Stack

- **Frontend**:
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Framer Motion (Animations)
  - Shadcn/ui (Component Library)
  - Sonner (Toast Notifications)

- **Backend**:
  - Next.js API Routes
  - TypeScript
  - MongoDB (Database)
  - JWT Authentication

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Detailed Installation Guide

1. **Clone the Repository**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/DevTinder.git
   
   # Navigate to the project directory
   cd DevTinder
   ```

2. **Install Dependencies**
   ```bash
   # Install all dependencies
   npm install
   # or
   yarn install
   
   # Install additional required packages
   npm install framer-motion sonner
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Database Configuration
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   
   # Optional: Email Configuration (for notifications)
   EMAIL_SERVER_HOST=smtp.example.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your_email
   EMAIL_SERVER_PASSWORD=your_password
   EMAIL_FROM=noreply@devtinder.com
   ```

4. **Database Setup**
   ```bash
   # If using MongoDB locally
   mongod --dbpath /path/to/data/directory
   
   # Or use MongoDB Atlas
   # 1. Create a free account at https://www.mongodb.com/cloud/atlas
   # 2. Create a new cluster
   # 3. Get your connection string and update MONGODB_URI in .env.local
   ```

5. **Development Server**
   ```bash
   # Start the development server
   npm run dev
   # or
   yarn dev
   
   # The application will be available at http://localhost:3000
   ```

6. **Production Build**
   ```bash
   # Create a production build
   npm run build
   # or
   yarn build
   
   # Start the production server
   npm start
   # or
   yarn start
   ```

### Common Issues & Solutions

1. **Port Already in Use**
   ```bash
   # Find the process using port 3000
   lsof -i :3000
   
   # Kill the process
   kill -9 <PID>
   ```

2. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check your connection string
   - Verify network access if using MongoDB Atlas

3. **Environment Variables**
   - Make sure `.env.local` is in the root directory
   - Restart the development server after changing variables

4. **Dependency Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules
   rm -rf node_modules
   
   # Reinstall dependencies
   npm install
   ```

## Project Structure

```
DevTinder/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── discover/          # Discovery page
│   ├── profile/           # Profile management
│   └── ...                # Other pages
├── components/            # Reusable components
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Sonner](https://sonner.emilkowal.ski/)

## Contact

For any questions or suggestions, please open an issue in the repository or contact us at [email@example.com](mailto:email@example.com).
