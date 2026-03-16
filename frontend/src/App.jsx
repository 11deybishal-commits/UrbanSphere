import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import CityScene from './components/CityScene';
import AIInsightsPanel from './components/AIInsightsPanel';
import Footer from './components/Footer';
import StatsCards from './components/StatsCards';
import MiniMap from './components/MiniMap';
import LiveMetrics from './components/LiveMetrics';
import ControlPanel from './components/ControlPanel';
import NotificationPanel from './components/NotificationPanel';
import { locationAPI, analyticsAPI } from './services/api';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [insightsPanelOpen, setInsightsPanelOpen] = useState(false);
  const [visualSettings, setVisualSettings] = useState({
    particles: true,
    dataStreams: true,
    energyBeams: true,
    holographicRings: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [locationsRes, analyticsRes] = await Promise.all([
        locationAPI.getAll(),
        analyticsAPI.get()
      ]);
      
      if (locationsRes.data.success) {
        setBuildings(locationsRes.data.data);
      }
      
      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setInsightsPanelOpen(true);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-darker via-dark to-darker overflow-hidden">
      <Navbar />
      
      <SearchBar onSearch={(query) => console.log('Search:', query)} />
      
      <NotificationPanel />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          analytics={analytics}
        />
        
        <main className="flex-1 relative">
          <StatsCards analytics={analytics} />
          
          <CityScene 
            buildings={buildings}
            onBuildingClick={handleBuildingClick}
            selectedBuilding={selectedBuilding}
            visualSettings={visualSettings}
          />
          
          <MiniMap buildings={buildings} selectedBuilding={selectedBuilding} />
          <LiveMetrics />
          <ControlPanel onSettingsChange={setVisualSettings} />
          
          <AnimatePresence>
            {insightsPanelOpen && selectedBuilding && (
              <AIInsightsPanel 
                building={selectedBuilding}
                onClose={() => setInsightsPanelOpen(false)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
