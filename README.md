# Login & Signup Application

A modern, responsive login and signup application built with HTML, CSS, JavaScript, Node.js, Express, and Supabase Authentication.

## Features

- 🔐 **Secure Authentication**: Supabase Auth with built-in security
- 🎨 **Modern UI**: Beautiful orange-themed design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔒 **Password Security**: Strong password validation with strength indicator
- 🚀 **Real-time Validation**: Instant form validation and user feedback
- 🌐 **Supabase**: Cloud authentication and database integration
- 📊 **Dashboard**: Protected user dashboard with profile information
- 📈 **Admin Dashboard**: User analytics and login activity tracking

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+ modules)
- **Backend**: Node.js, Express.js (static file server)
- **Database & Auth**: Supabase
- **Authentication**: Supabase Auth
- **Styling**: Custom CSS with orange color theme

## Live Demo

[View Live Demo](https://kondamurisrimahalakshmi.github.io/login-signup-app)

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/kondamurisrimahalakshmi/login-signup-app.git
cd login-signup-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

The Supabase credentials are pre-configured in the `.env` file. The application is ready to use out of the box.

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

## Supabase Configuration

The application uses Supabase for authentication. The credentials are configured in:
- `supabase-client.js` - Client configuration
- `.env` - Environment variables

Authentication is handled entirely client-side using Supabase Auth.

## Authentication Flow

The application uses Supabase Auth for all authentication operations:

### Signup
- User submits name, email, and password
- `supabase.auth.signUp()` creates new user account
- User metadata stores the name
- Redirects to login page on success

### Login
- User submits email and password
- `supabase.auth.signInWithPassword()` authenticates user
- Session token stored in localStorage
- Redirects to StudyCast application

### Session Management
- Sessions managed by Supabase Auth
- Client-side token storage
- Automatic session refresh

## Deployment

### GitHub Pages (Frontend Only)

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source as "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at `https://kondamurisrimahalakshmi.github.io/login-signup-app`

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
├── admin.html          # Admin dashboard
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript (ES6 module)
├── supabase-client.js  # Supabase client configuration
├── server.js           # Express server (static file server)
├── package.json        # Dependencies and scripts
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## Security Features

- ✅ Supabase Auth with built-in security
- ✅ Secure password hashing (handled by Supabase)
- ✅ Session token management
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

1. Check the [Issues](https://github.com/kondamurisrimahalakshmi/login-signup-app/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainer

## Acknowledgments

- Font Awesome for icons
- Supabase for authentication and database services
- Express.js community for excellent documentation
- All contributors who helped improve this project

---

## Migration from MongoDB to Supabase

This application has been migrated from MongoDB Atlas to Supabase Authentication. For migration details, see `MIGRATION_NOTES.md`.
