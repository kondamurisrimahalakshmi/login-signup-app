# Render Deployment Guide

## Step-by-Step Render Deployment

### 1. Connect Your GitHub Repository
- Go to [render.com](https://render.com)
- Sign up/Login with your GitHub account
- Click "New +" → "Web Service"
- Connect your repository: `kondamurisrimahalakshmi/login-signup-app`

### 2. Configure Your Service
- **Name**: `login-signup-app` (or your preferred name)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start` (NOT `node start`)
- **Root Directory**: `/` (leave empty for root)

**⚠️ IMPORTANT**: Make sure the Start Command is exactly `npm start` and NOT `node start`

### 3. Set Environment Variables
Click "Advanced" → "Environment Variables" and add:

```
NODE_ENV = production
JWT_SECRET = your-super-secure-jwt-secret-key-change-this-in-production-2024
MONGODB_URI = mongodb+srv://subhashkrish66_db_user:Kondamuri%401@subhash1.uvonm7n.mongodb.net/login_signup_db?retryWrites=true&w=majority
```

**Important Notes:**
- Generate a strong JWT_SECRET (at least 32 characters)
- PORT is automatically set by Render
- Make sure your MongoDB Atlas IP whitelist includes Render's IP ranges

### 4. MongoDB Atlas Configuration
- Go to your MongoDB Atlas dashboard
- Click "Network Access" → "Add IP Address"
- Add `0.0.0.0/0` for all IPs (or Render's specific IP ranges)
- Ensure your database user has read/write permissions

### 5. Deploy
- Click "Create Web Service"
- Render will automatically build and deploy your app
- Your app will be available at: `https://your-app-name.onrender.com`

### 6. Custom Domain (Optional)
- Go to your service settings
- Click "Custom Domains"
- Add your domain and configure DNS

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| NODE_ENV | production | Environment mode |
| JWT_SECRET | [strong secret] | JWT signing secret |
| MONGODB_URI | [your connection string] | MongoDB Atlas connection |
| PORT | [auto-set by Render] | Server port |

## Troubleshooting

### Common Issues:
1. **"Cannot find module '/opt/render/project/src/start'" Error**: 
   - This happens when Start Command is set to `node start` instead of `npm start`
   - **Solution**: Change Start Command to `npm start` in Render dashboard
2. **MongoDB Connection Error**: Check IP whitelist in Atlas
3. **Build Failures**: Ensure all dependencies are in package.json
4. **Environment Variables**: Double-check variable names and values
5. **Static Files**: Verify file paths are correct

### Render Logs:
- Go to your service dashboard
- Click "Logs" tab to view real-time logs
- Check for any error messages during deployment
