# Migration to Supabase Authentication

## Summary
The application has been migrated from MongoDB Atlas to Supabase for authentication and user management.

## Changes Made

### 1. Authentication Backend
- **Removed**: MongoDB/Mongoose connection and user models
- **Added**: Supabase client-side authentication
- **File**: `supabase-client.js` - New Supabase client configuration

### 2. Server Updates
- **File**: `server.js`
- **Changes**: Simplified to only serve static files (authentication now handled client-side)
- **Removed**: All MongoDB-related code, JWT token generation, bcrypt password hashing

### 3. Frontend Updates
- **File**: `script.js`
- **Changes**:
  - Updated `loginUser()` to use `supabase.auth.signInWithPassword()`
  - Updated `signupUser()` to use `supabase.auth.signUp()`
  - Made functions globally accessible for inline event handlers
  - Removed API URL configuration (no longer needed)

- **File**: `index.html`
- **Changes**: Added `type="module"` to script tag to support ES6 imports

### 4. Dependencies
- **Added**: `@supabase/supabase-js@^2.75.0`
- **Kept**: Express, CORS, and dotenv for static file serving

## How It Works

### Signup Flow
1. User fills signup form with name, email, and password
2. `signupUser()` calls `supabase.auth.signUp()` with user data
3. User metadata (name) is stored in Supabase Auth user profile
4. Success message shown and user redirected to login

### Login Flow
1. User enters email and password
2. `loginUser()` calls `supabase.auth.signInWithPassword()`
3. On success, stores session token and user data in localStorage
4. Tracks login activity locally
5. Redirects to StudyCast application

### Session Management
- Session tokens stored in localStorage
- User data retrieved from Supabase Auth user object
- Login activity tracked client-side for admin dashboard

## Configuration
- **Supabase URL**: Configured in `supabase-client.js`
- **Supabase Anon Key**: Configured in `supabase-client.js`
- Both values loaded from `.env` file

## Testing
To test the application:
1. Start the server: `npm start`
2. Visit: `http://localhost:3000`
3. Try signing up with a new account
4. Try logging in with the created account

## Notes
- Email confirmation is disabled by default in Supabase
- All authentication is handled client-side via Supabase Auth
- Server only serves static files (no backend authentication logic)
- Admin dashboard still uses localStorage for tracking (unchanged)
