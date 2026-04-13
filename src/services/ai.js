const API_BASE_URL = 'http://localhost:3000/api';

// Fake AI thinking delay (1.5 s) — keeps the Loader animation meaningful
const fakeDelay = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

export const analyzeIdeaWithAI = async (ideaData) => {
  await fakeDelay(1500);
  try {
    const response = await fetch(`${API_BASE_URL}/validate-idea`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea: ideaData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze idea.');
    }

    return await response.json();
  } catch (error) {
    console.error('Analysis Error:', error);
    throw error;
  }
};

export const improveIdeaWithAI = async (title) => {
  await fakeDelay(1200);
  try {
    const response = await fetch(`${API_BASE_URL}/improve-idea`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) throw new Error('Failed to improve idea.');
    return await response.json();
  } catch (error) {
    console.error('Improvement Error:', error);
    throw error;
  }
};

export const generatePitchWithAI = async (title) => {
  await fakeDelay(1000);
  try {
    const response = await fetch(`${API_BASE_URL}/generate-pitch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) throw new Error('Failed to generate pitch.');
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Pitch Error:', error);
    throw error;
  }
};
