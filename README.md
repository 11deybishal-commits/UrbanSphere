# UrbanSphere - AI-Powered 3D Smart City Platform

An immersive 3D smart city exploration platform with AI-powered insights, real-time data visualization, and natural language search.

## Features

- 🏙️ Interactive 3D city visualization with Three.js
- 🤖 AI-powered natural language search and insights
- 📊 Real-time data analytics and visualization
- 🏥 Smart building information system
- 🚦 Traffic and pollution monitoring
- 🎨 Futuristic UI with smooth animations

## Tech Stack

**Frontend:**
- React + Vite
- Three.js + React Three Fiber
- TailwindCSS + Framer Motion
- Recharts for data visualization

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- OpenAI/Gemini API integration

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB URI and OpenAI API key to .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` in backend folder:

```
MONGODB_URI=mongodb://localhost:27017/urbansphere
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
```

## API Endpoints

- GET `/api/locations` - Get all city locations
- GET `/api/locations/:id` - Get specific location
- GET `/api/hospitals` - Get hospital data
- GET `/api/traffic` - Get traffic data
- GET `/api/analytics` - Get city analytics
- POST `/api/ai/search` - Natural language search
- POST `/api/ai/insights/:buildingId` - Get AI insights for building

## Usage

1. Start the backend server
2. Start the frontend dev server
3. Navigate to http://localhost:5173
4. Explore the 3D city, click buildings, use AI search

## License

MIT
