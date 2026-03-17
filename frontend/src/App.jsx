import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CityScene from './components/CityScene';
import AIInsightsPanel from './components/AIInsightsPanel';
import Footer from './components/Footer';
import { locationAPI, analyticsAPI } from './services/api';

function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [insightsPanelOpen, setInsightsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [locationsRes, analyticsRes] = await Promise.all([
        locationAPI.getAll(),
        analyticsAPI.get()
      ]);
      
      if (locationsRes.data.success) {
        setBuildings(locationsRes.data.data || []);
      }
      
      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setBuildings([]);
      setAnalytics({
        metrics: {
          totalPopulation: 0,
          activeVehicles: 0,
          averageAQI: 0,
          hospitalOccupancy: 0,
          energyConsumption: 0,
          waterUsage: 0
        },
        trends: {
          trafficGrowth: 0,
          pollutionChange: 0,
          populationGrowth: 0
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setInsightsPanelOpen(true);
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-darker via-dark to-darker flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-primary text-lg font-semibold">Loading UrbanSphere...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-darker via-dark to-darker overflow-hidden">
      <Navbar analytics={analytics} />
      
      <SearchBar onSearch={(query) => console.log('Search:', query)} />
      
      <main className="w-full h-[calc(100vh-80px)] relative">
        <CityScene 
          buildings={buildings}
          onBuildingClick={handleBuildingClick}
          selectedBuilding={selectedBuilding}
        />
        
        <AnimatePresence>
          {insightsPanelOpen && selectedBuilding && (
            <AIInsightsPanel 
              building={selectedBuilding}
              onClose={() => setInsightsPanelOpen(false)}
            />
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
