// Helper functions for SVG parsing, validation, and AI call

export function extractSVGsFromText(text: string): string[] {
  return text.match(/<svg[\s\S]*?<\/svg>/gi) || [];
}

export async function callGeminiAPI(prompt: string): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not set');
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Generate 3 creative SVG icon code strings for: ${prompt}. Only return SVG code, no explanation, no markdown, no backticks.` }] }]
    })
  });
  const data = await res.json();
  let svgs: string[] = [];
  if (data.candidates && Array.isArray(data.candidates)) {
    svgs = data.candidates.flatMap((c: any) => {
      return extractSVGsFromText(c.content?.parts?.[0]?.text || '');
    });
  }
  return svgs;
}
