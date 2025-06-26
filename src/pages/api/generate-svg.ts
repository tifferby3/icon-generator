import { generateSVGs, optimizeSVG } from '../../services/svgService';
import { handleApiError, logError } from '../../services/errorService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  try {
    // Generate SVGs using the service
    const svgStrings = await generateSVGs(prompt);
    logError(svgStrings, 'LLM raw SVGs'); // DEBUG: log what LLM returns
    // Optimize each SVG
    const optimized = svgStrings.map(svg => {
      try {
        return { svg: optimizeSVG(svg) };
      } catch (e) {
        logError(e, 'SVG Optimization');
        return { error: handleApiError(e, 'SVG Optimization'), original: svg };
      }
    });
    logError(optimized, 'Optimized SVGs'); // DEBUG: log what is sent to frontend
    return res.status(200).json({ svgs: optimized });
  } catch (err) {
    logError(err, 'generate-svg API');
    return res.status(500).json({ error: handleApiError(err, 'generate-svg API') });
  }
}
