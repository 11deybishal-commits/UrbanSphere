import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const processNaturalLanguageQuery = async (query) => {
  try {
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
    return {
      type: 'general',
      filters: {},
      intent: query
    };
  }
};

export const generateBuildingInsights = async (building) => {
  try {
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
    return {
      summary: `${building.name} is currently operational`,
      recommendation: "Monitor regularly for optimal performance",
      metrics: ["Status: Active", "Performance: Normal", "Capacity: Available"],
      prediction: "Stable operations expected"
    };
  }
};
