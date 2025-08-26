# Deployment Guide

This guide walks you through deploying your portfolio to the recommended stack: **Vercel + Railway + MongoDB Atlas**.

## 🗂 Prerequisites

1. GitHub repository created with your portfolio code
2. Accounts created on:
   - [Vercel](https://vercel.com) (free)
   - [Railway](https://railway.app) (free starter, then $5/month)
   - [MongoDB Atlas](https://mongodb.com/atlas) (free tier available)

## 📊 Step 1: Set Up MongoDB Atlas (Database)

1. **Create Account**: Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create Cluster**: 
   - Choose "Free Shared" (M0 Sandbox)
   - Select a region close to your users
   - Name your cluster (e.g., "portfolio-cluster")
3. **Create Database User**:
   - Go to "Database Access"
   - Create a new user with password authentication
   - Grant "Atlas Admin" permissions
4. **Whitelist IP Addresses**:
   - Go to "Network Access" 
   - Add IP: `0.0.0.0/0` (allows access from anywhere - for development)
5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials

## 🚂 Step 2: Deploy Backend to Railway

1. **Create Account**: Sign up at [railway.app](https://railway.app)
2. **Connect GitHub**: Link your GitHub account
3. **Deploy Backend**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your portfolio repository
   - Railway will detect the Python backend automatically
4. **Set Environment Variables**:
   - Go to your project → "Variables" tab
   - Add these variables:
     ```
     MONGO_URL=your_mongodb_atlas_connection_string
     DB_NAME=portfolio
     ```
5. **Configure Build**:
   - Railway should automatically detect `requirements.txt`
   - If not, set build command: `pip install -r backend/requirements.txt`
   - Set start command: `uvicorn backend.server:app --host 0.0.0.0 --port $PORT`
6. **Initialize Database**:
   - Once deployed, run the initialization script via Railway's console:
   - `cd backend && python init_data.py`
7. **Get Backend URL**: Copy your Railway app URL (e.g., `https://your-app.railway.app`)

## ⚡ Step 3: Deploy Frontend to Vercel

1. **Create Account**: Sign up at [vercel.com](https://vercel.com)
2. **Connect GitHub**: Import your repository
3. **Configure Project**:
   - Framework Preset: "Create React App"
   - Root Directory: `frontend`
   - Build Command: `yarn build`
   - Output Directory: `build`
4. **Set Environment Variables**:
   - Add `REACT_APP_BACKEND_URL` = your Railway backend URL
5. **Deploy**: Vercel will automatically build and deploy
6. **Custom Domain** (Optional):
   - Go to "Domains" in your Vercel project
   - Add your custom domain (e.g., `christawilliford.com`)

## 🔧 Step 4: Testing Your Deployment

1. **Backend Health Check**: Visit `your-railway-url/api/` - should show API info
2. **Database Connection**: Check `your-railway-url/api/portfolio` - should return portfolio data  
3. **Frontend**: Visit your Vercel URL - should load the complete portfolio
4. **Integration**: Verify all sections load data from the backend

## 📋 Step 5: Post-Deployment Checklist

✅ **Security**:
- Update MongoDB Atlas network access to restrict IPs if needed
- Ensure all environment variables are set correctly
- Test HTTPS functionality

✅ **Performance**:
- Check loading speeds on mobile and desktop
- Verify all images and assets load correctly
- Test API response times

✅ **Functionality**:
- Test contact form submission
- Verify all navigation links work
- Check responsive design on different devices

## 🔄 Step 6: Future Updates

### Automatic Deployments
- **Frontend**: Push to GitHub → Vercel automatically deploys
- **Backend**: Push to GitHub → Railway automatically deploys

### Content Updates
You can update portfolio content in two ways:

1. **Through Code**: Update `backend/init_data.py` and redeploy
2. **Through API**: Create an admin interface (future enhancement)

## 💰 Estimated Monthly Costs

- **Vercel**: Free (up to 100GB bandwidth)
- **Railway**: $5/month (after free tier)
- **MongoDB Atlas**: Free (512MB storage)

**Total**: ~$5/month

## 🆘 Troubleshooting

**Common Issues**:

1. **Backend won't start**: Check Railway logs for Python errors
2. **Database connection fails**: Verify MONGO_URL format and credentials
3. **Frontend can't reach backend**: Check REACT_APP_BACKEND_URL and CORS settings
4. **Build failures**: Ensure all dependencies in package.json and requirements.txt

**Getting Help**:
- Railway: Check deployment logs in Railway dashboard
- Vercel: Check build logs in Vercel dashboard  
- MongoDB: Check database logs in Atlas dashboard

---

Your professional portfolio will be live and accessible worldwide! 🌍✨