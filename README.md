# Login & Signup Application

A modern, responsive login and signup application built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB Atlas.

## Features

- 🔐 **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- 🎨 **Modern UI**: Beautiful orange-themed design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔒 **Password Security**: Strong password validation with strength indicator
- 🚀 **Real-time Validation**: Instant form validation and user feedback
- 🌐 **MongoDB Atlas**: Cloud database integration for user management
- 📊 **Dashboard**: Protected user dashboard with profile information

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Styling**: Custom CSS with orange color theme

## Live Demo

[View Live Demo](https://mahalakshmi.github.io/login-signup-app)

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/mahalakshmi/login-signup-app.git
cd login-signup-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

1. Copy the example environment file:
```bash
cp env.example .env
```

2. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
MONGODB_URI=mongodb+srv://subhashkrish66_db_user:Kondamuri%401@subhash1.uvonm7n.mongodb.net/login_signup_db?retryWrites=true&w=majority
DB_NAME=login_signup_db
```

### 4. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update the `MONGODB_URI` in your `.env` file

## API Endpoints

### Authentication
- `POST /api/signup` - Create a new user account
- `POST /api/login` - Authenticate user and get JWT token
- `POST /api/logout` - Logout user (client-side token removal)

### User Management
- `GET /api/profile` - Get user profile (requires authentication)
- `GET /api/verify-token` - Verify JWT token validity

### System
- `GET /api/health` - Health check endpoint

## Deployment

### GitHub Pages (Frontend Only)

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source as "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at `https://mahalakshmi.github.io/login-signup-app`

### Full Stack Deployment (Heroku)

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set JWT_SECRET=your-production-jwt-secret
heroku config:set MONGODB_URI=your-mongodb-atlas-connection-string
```

3. Deploy:
```bash
git push heroku main
```

### Full Stack Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

## Project Structure

```
login-signup-app/
├── index.html          # Main login/signup page
├── dashboard.html      # User dashboard
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── .gitignore          # Git ignore rules
├── env.example         # Environment variables example
└── README.md           # Project documentation
```

## Security Features

- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ JWT token authentication
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Environment variable protection
- ✅ Secure password requirements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/mahalakshmi/login-signup-app/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainer

## Acknowledgments

- Font Awesome for icons
- MongoDB Atlas for cloud database
- Express.js community for excellent documentation
- All contributors who helped improve this project

---

**Note**: Remember to change the JWT secret and MongoDB connection string in production!
