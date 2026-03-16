# 🚀 Complete Deployment Guide - Vercel & Render

## Step-by-Step Deployment Instructions

### 📋 Prerequisites Checklist
- [ ] GitHub account with UrbanSphere repository
- [ ] Vercel account (sign up at vercel.com)
- [ ] Render account (sign up at render.com)
- [ ] MongoDB Atlas account (sign up at mongodb.com/cloud/atlas)
- [ ] OpenAI API key (get from platform.openai.com)

---

## Part 1: Setup MongoDB Atlas (Database)

### Step 1: Create MongoDB Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create account
3. Choose "Free Shared" tier (M0)
4. Select cloud provider (AWS recommended)
5. Choose region closest to you
6. Click "Create Cluster" (takes 3-5 minutes)

### Step 2: Configure Database Access
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `urbanadmin`
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 3: Configure Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `urbansphere`

Example:
```
mongodb+srv://urbanadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/urbansphere?retryWrites=true&w=majority
```

**Save this connection string!**

---

## Part 2: Get OpenAI API Key

### Step 1: Create OpenAI Account
1. Go to https://platform.openai.com
2. Sign up or log in
3. Add payment method (required for API access)

### Step 2: Generate API Key
1. Click your profile → "API Keys"
2. Click "Create new secret key"
3. Name it "UrbanSphere"
4. Copy the key (starts with `sk-`)
5. **Save it immediately** (you can't see it again!)

**Save this API key!**

---

## Part 3: Deploy Backend to Render

### Step 1: Create Web Service
1. Go to https://render.com
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Click "Connect account" to link GitHub
5. Find and select "UrbanSphere" repository
6. Click "Connect"

### Step 2: Configure Service
Fill in these settings:

**Basic Settings:**
- **Name:** `urbansphere-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select "Free" (for testing)
- Or "Starter" ($7/month for production)

### Step 3: Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these 4 variables:

1. **MONGODB_URI**
   ```
   mongodb+srv://urbanadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/urbansphere?retryWrites=true&w=majority
   ```

2. **OPENAI_API_KEY**
   ```
   sk-your-openai-api-key-here
   ```

3. **PORT**
   ```
   5000
   ```

4. **NODE_ENV**
   ```
   production
   ```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Watch the logs for any errors
4. Once deployed, you'll see "Your service is live"
5. **Copy your backend URL** (e.g., `https://urbansphere-backend.onrender.com`)

### Step 5: Test Backend
Open in browser:
```
https://your-backend-url.onrender.com/api/health
```

Should return:
```json
{
  "status": "operational",
  "timestamp": "...",
  "services": {
    "database": "connected",
    "api": "running"
  }
}
```

---

## Part 4: Deploy Frontend to Vercel

### Step 1: Update API Configuration
Before deploying, update the API URL in your code:

1. Open `frontend/src/services/api.js`
2. Update line 3:
```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'https://your-render-backend-url.onrender.com/api';
```

3. Commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Step 2: Create Vercel Project
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New" → "Project"
4. Import "UrbanSphere" repository
5. Click "Import"

### Step 3: Configure Project
**Framework Preset:** Vite (auto-detected)

**Root Directory:** Click "Edit" → Select `frontend`

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Step 4: Add Environment Variable
Click "Environment Variables"

Add:
- **Key:** `VITE_API_URL`
- **Value:** `https://your-render-backend-url.onrender.com/api`
- **Environment:** All (Production, Preview, Development)

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-5 minutes
3. Once deployed, click "Visit" to see your app
4. **Copy your frontend URL** (e.g., `https://urbansphere.vercel.app`)

---

## Part 5: Update CORS Settings

### Step 1: Update Backend CORS
1. Go to your GitHub repository
2. Edit `backend/src/server.js`
3. Find the `app.use(cors())` line
4. Replace with:
```javascript
app.use(cors({
  origin: [
    'https://your-vercel-app.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

5. Commit and push changes
6. Render will auto-deploy the update

---

## Part 6: Verify Deployment

### Test Checklist:
- [ ] Backend health endpoint works
- [ ] Frontend loads without errors
- [ ] 3D city scene renders
- [ ] Buildings are clickable
- [ ] AI search works
- [ ] Insights panel opens
- [ ] All visual effects work
- [ ] No console errors

### Common URLs to Test:
```
Frontend: https://your-app.vercel.app
Backend Health: https://your-backend.onrender.com/api/health
Backend Locations: https://your-backend.onrender.com/api/locations
Backend Analytics: https://your-backend.onrender.com/api/analytics
```

---

## 🎉 Deployment Complete!

Your UrbanSphere application is now live!

### Share Your App:
- Frontend: `https://your-app.vercel.app`
- GitHub: `https://github.com/11deybishal-commits/UrbanSphere`

---

## 📊 Monitoring & Maintenance

### Vercel Dashboard:
- View deployment logs
- Monitor bandwidth usage
- Check build status
- View analytics

### Render Dashboard:
- Monitor backend health
- View server logs
- Check database connections
- Monitor response times

### MongoDB Atlas:
- Monitor database metrics
- View connection stats
- Check storage usage
- Backup data

---

## 🐛 Troubleshooting

### Frontend Issues:

**White screen / Not loading:**
```bash
# Check Vercel build logs
# Verify VITE_API_URL is set correctly
# Check browser console for errors
```

**API calls failing:**
```bash
# Verify backend URL is correct
# Check CORS settings in backend
# Ensure backend is running on Render
```

### Backend Issues:

**Database connection failed:**
```bash
# Verify MongoDB connection string
# Check MongoDB Atlas network access (0.0.0.0/0)
# Ensure database user has correct permissions
```

**OpenAI API errors:**
```bash
# Verify API key is correct
# Check OpenAI account has credits
# Ensure API key has correct permissions
```

**Render service sleeping:**
```bash
# Free tier sleeps after 15 min inactivity
# First request takes 30-60 seconds to wake up
# Consider upgrading to paid tier for production
```

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Testing):
- **Vercel:** Free (100GB bandwidth/month)
- **Render:** Free (750 hours/month, sleeps after 15 min)
- **MongoDB Atlas:** Free (512MB storage)
- **OpenAI:** Pay per use (~$0.002 per request)

**Total:** ~$0-5/month for testing

### Production Tier:
- **Vercel Pro:** $20/month (1TB bandwidth)
- **Render Starter:** $7/month (always on)
- **MongoDB M10:** $0.08/hour (~$57/month)
- **OpenAI:** ~$10-50/month depending on usage

**Total:** ~$94-127/month for production

---

## 🚀 Next Steps

1. **Custom Domain:**
   - Add custom domain in Vercel settings
   - Update DNS records
   - Enable HTTPS (automatic)

2. **Performance:**
   - Enable Vercel Analytics
   - Monitor Render metrics
   - Optimize API calls

3. **Security:**
   - Add rate limiting
   - Implement API authentication
   - Enable security headers

4. **Features:**
   - Add user authentication
   - Implement data caching
   - Add more AI features

---

## 📞 Support

**Issues?**
- GitHub: https://github.com/11deybishal-commits/UrbanSphere/issues
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs

**Your app is now live and ready to impress! 🎉**
