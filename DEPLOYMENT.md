# UrbanSphere Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- MongoDB Atlas account (for database)

## Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/urbansphere`)
5. Replace `<password>` with your actual password
6. Save this connection string for later

## Step 2: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and save it securely

## Step 3: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: urbansphere-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   NODE_ENV=production
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://urbansphere-backend.onrender.com`)

## Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist

5. Add Environment Variable:
   ```
   VITE_API_URL=your_render_backend_url
   ```

6. Update `frontend/src/services/api.js`:
   ```javascript
   const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

7. Click "Deploy"
8. Wait for deployment (2-5 minutes)
9. Your app will be live at `https://your-project.vercel.app`

## Step 5: Update CORS Settings

1. In your backend code (`backend/src/server.js`), update CORS:
   ```javascript
   app.use(cors({
     origin: ['https://your-project.vercel.app', 'http://localhost:5173'],
     credentials: true
   }));
   ```

2. Commit and push changes
3. Render will auto-deploy the update

## Alternative: Deploy Both on Vercel

### Backend on Vercel:
1. Create `vercel.json` in backend folder (already created)
2. Deploy backend separately
3. Add environment variables in Vercel dashboard

### Frontend on Vercel:
1. Follow Step 4 above
2. Update API_BASE to point to Vercel backend URL

## Troubleshooting

### Backend Issues:
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure OpenAI API key is valid
- Check environment variables are set correctly

### Frontend Issues:
- Verify API URL is correct
- Check browser console for CORS errors
- Ensure backend is running before testing frontend

### Database Issues:
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access
- Verify database user has read/write permissions

## Post-Deployment

1. Test all features:
   - 3D city visualization
   - Building selection
   - AI search
   - Insights panel
   - Real-time metrics

2. Monitor:
   - Render dashboard for backend health
   - Vercel analytics for frontend performance
   - MongoDB Atlas for database metrics

## Cost Optimization

- **Free Tier Limits**:
  - Render: 750 hours/month (sleeps after 15 min inactivity)
  - Vercel: 100 GB bandwidth/month
  - MongoDB Atlas: 512 MB storage

- **Tips**:
  - Backend may sleep on Render free tier (first request takes 30s)
  - Consider upgrading for production use
  - Use caching to reduce API calls

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render:
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS CNAME record

## Environment Variables Summary

### Backend (Render):
```
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-...
PORT=5000
NODE_ENV=production
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Support

For issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

Your UrbanSphere app is now live! 🚀
