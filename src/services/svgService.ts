import { callGeminiAPI } from '../utils/svgUtils';
import { optimize } from 'svgo';

export async function generateSVGs(prompt: string): Promise<string[]> {
  // Call Gemini and extract SVGs
  const svgStrings = await callGeminiAPI(prompt);
  // Optionally, filter out non-SVG responses
  return svgStrings.filter(svg => svg.trim().startsWith('<svg'));
}

export function optimizeSVG(svg: string): string {
  return optimize(svg, { multipass: true }).data;
}
