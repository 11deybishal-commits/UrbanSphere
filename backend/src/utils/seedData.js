import CityLocation from '../models/CityLocation.js';
import Hospital from '../models/Hospital.js';
import TrafficData from '../models/TrafficData.js';
import PollutionData from '../models/PollutionData.js';

export const seedDatabase = async () => {
  try {
    const locationCount = await CityLocation.countDocuments();
    if (locationCount > 0) {
      console.log('📊 Database already seeded');
      return;
    }

    console.log('🌱 Seeding database...');

    const locations = [];
    const hospitals = [];
    
    const buildingTypes = ['residential', 'commercial', 'hospital', 'park', 'office', 'industrial'];
    const colors = {
      residential: '#4a90e2',
      commercial: '#f39c12',
      hospital: '#e74c3c',
      park: '#27ae60',
      office: '#9b59b6',
      industrial: '#95a5a6'
    };

    for (let i = 0; i < 50; i++) {
      const type = buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
      const x = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      const height = type === 'park' ? 0.2 : Math.random() * 8 + 2;
      
      const location = await CityLocation.create({
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
        type,
        position: { x, y: height / 2, z },
        dimensions: {
          width: Math.random() * 2 + 1,
          height,
          depth: Math.random() * 2 + 1
        },
        color: colors[type],
        population: type === 'residential' ? Math.floor(Math.random() * 500) + 100 : 0,
        metadata: {
          address: `${Math.floor(Math.random() * 9999)} City Street`,
          floors: Math.floor(height / 0.4),
          yearBuilt: 2000 + Math.floor(Math.random() * 24),
          capacity: Math.floor(Math.random() * 1000) + 100
        }
      });
      
      locations.push(location);
      
      if (type === 'hospital') {
        const hospital = await Hospital.create({
          name: `${location.name} Medical Center`,
          locationId: location._id,
          position: { x, y: height / 2, z },
          capacity: Math.floor(Math.random() * 300) + 100,
          currentPatients: Math.floor(Math.random() * 200) + 50,
          emergencyLoad: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          estimatedWaitTime: Math.floor(Math.random() * 60) + 10,
          departments: ['Emergency', 'Surgery', 'Cardiology', 'Pediatrics', 'Radiology'].slice(0, Math.floor(Math.random() * 3) + 2),
          rating: Math.random() * 2 + 3,
          contact: {
            phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
            email: `contact@hospital${i}.com`
          }
        });
        hospitals.push(hospital);
      }
    }

    const routes = ['Downtown Express', 'Airport Highway', 'Coastal Road', 'Industrial Belt', 'Suburban Loop'];
    for (let i = 0; i < routes.length; i++) {
      await TrafficData.create({
        routeId: `route_${i + 1}`,
        routeName: routes[i],
        congestionLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        averageSpeed: Math.floor(Math.random() * 40) + 30,
        vehicleCount: Math.floor(Math.random() * 500) + 100,
        incidents: Math.random() > 0.7 ? [{
          type: 'accident',
          location: `Mile ${Math.floor(Math.random() * 10)}`,
          severity: 'minor'
        }] : []
      });
    }

    const areas = ['Downtown', 'Suburbs', 'Industrial Zone', 'Waterfront', 'Airport'];
    for (let i = 0; i < areas.length; i++) {
      await PollutionData.create({
        area: areas[i],
        aqi: Math.floor(Math.random() * 150) + 20,
        pm25: Math.random() * 50 + 10,
        pm10: Math.random() * 80 + 20,
        co2: Math.random() * 400 + 300,
        quality: ['good', 'moderate', 'unhealthy'][Math.floor(Math.random() * 3)]
      });
    }

    console.log('✅ Database seeded successfully');
    console.log(`   - ${locations.length} locations created`);
    console.log(`   - ${hospitals.length} hospitals created`);
    console.log(`   - 5 traffic routes created`);
    console.log(`   - 5 pollution zones created`);
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};
