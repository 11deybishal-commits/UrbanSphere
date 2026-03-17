import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

export const processNaturalLanguageQuery = async (query) => {
  try {
    if (!openai) {
      console.warn('OpenAI not configured, using fallback');
      return parseFallbackQuery(query);
    }

    const prompt = `You are an AI assistant for a smart city platform. Convert the following natural language query into structured search parameters.

Query: "${query}"

Return a JSON object with these fields:
- type: (hospital, traffic, location, pollution, general)
- filters: object with relevant filters
- intent: brief description of what user wants

Examples:
"best hospital nearby" -> {"type": "hospital", "filters": {"sortBy": "rating", "emergencyLoad": "low"}, "intent": "find top-rated hospital with low wait time"}
"least traffic route to airport" -> {"type": "traffic", "filters": {"destination": "airport", "sortBy": "congestionLevel"}, "intent": "find route with least congestion"}

Return only valid JSON, no markdown.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 300
    });

    const content = response.choices[0].message.content.trim();
    return JSON.parse(content);
  } catch (error) {
    console.error('AI Query Processing Error:', error);
    return parseFallbackQuery(query);
  }
};

function parseFallbackQuery(query) {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('hospital')) {
    return {
      type: 'hospital',
      filters: { sortBy: 'rating' },
      intent: 'find hospitals'
    };
  } else if (lowerQuery.includes('traffic') || lowerQuery.includes('route')) {
    return {
      type: 'traffic',
      filters: { sortBy: 'congestionLevel' },
      intent: 'find traffic information'
    };
  } else {
    return {
      type: 'location',
      filters: {},
      intent: query
    };
  }
}

export const generateBuildingInsights = async (building) => {
  try {
    if (!openai) {
      console.warn('OpenAI not configured, using fallback insights');
      return generateFallbackInsights(building);
    }

    const prompt = `Generate smart city insights for this building:

Name: ${building.name}
Type: ${building.type}
${building.type === 'hospital' ? `
Capacity: ${building.capacity}
Current Patients: ${building.currentPatients}
Emergency Load: ${building.emergencyLoad}
Wait Time: ${building.estimatedWaitTime} minutes
` : ''}

Provide:
1. Current status summary
2. AI recommendation
3. Key metrics
4. Predicted trends

Return JSON format:
{
  "summary": "brief status",
  "recommendation": "actionable advice",
  "metrics": ["metric1", "metric2", "metric3"],
  "prediction": "future trend"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 400
    });

    const content = response.choices[0].message.content.trim();
    return JSON.parse(content);
  } catch (error) {
    console.error('AI Insights Error:', error);
    return generateFallbackInsights(building);
  }
};

function generateFallbackInsights(building) {
  const insights = {
    residential: {
      summary: `${building.name} is a residential building with ${building.population || 0} residents`,
      recommendation: "Maintain regular inspections and ensure all amenities are functional",
      metrics: [
        `Population: ${building.population || 0}`,
        `Floors: ${building.metadata?.floors || 'N/A'}`,
        `Year Built: ${building.metadata?.yearBuilt || 'N/A'}`
      ],
      prediction: "Stable occupancy expected with seasonal variations"
    },
    hospital: {
      summary: `${building.name} is operating at ${building.currentPatients ? Math.round((building.currentPatients / building.capacity) * 100) : 0}% capacity`,
      recommendation: building.emergencyLoad === 'high' ? "Consider diverting non-emergency cases to nearby facilities" : "Continue normal operations",
      metrics: [
        `Capacity: ${building.capacity || 0} beds`,
        `Current Patients: ${building.currentPatients || 0}`,
        `Wait Time: ${building.estimatedWaitTime || 0} minutes`
      ],
      prediction: "Patient load expected to remain stable"
    },
    commercial: {
      summary: `${building.name} is a commercial building with active business operations`,
      recommendation: "Monitor foot traffic and optimize energy consumption during peak hours",
      metrics: [
        `Floors: ${building.metadata?.floors || 'N/A'}`,
        `Capacity: ${building.metadata?.capacity || 'N/A'}`,
        `Status: Operational`
      ],
      prediction: "Increased activity expected during business hours"
    },
    park: {
      summary: `${building.name} is a public park providing green space for the community`,
      recommendation: "Regular maintenance and monitoring of visitor capacity recommended",
      metrics: [
        "Status: Open to public",
        "Maintenance: Regular",
        "Accessibility: High"
      ],
      prediction: "Higher usage expected during weekends and holidays"
    }
  };

  return insights[building.type] || {
    summary: `${building.name} is currently operational`,
    recommendation: "Monitor regularly for optimal performance",
    metrics: ["Status: Active", "Performance: Normal", "Capacity: Available"],
    prediction: "Stable operations expected"
  };
}
