import type { NextApiRequest, NextApiResponse } from 'next';
import { createZipBuffer } from '../../utils/fileUtils';

// Download endpoint: expects POST with { svgs: string[], filenames?: string[] }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { svgs, filenames } = req.body;
  if (!Array.isArray(svgs) || svgs.length === 0) {
    return res.status(400).json({ error: 'No SVGs provided' });
  }
  try {
    const zipBuffer = await createZipBuffer(svgs, filenames);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="icons.zip"');
    res.status(200).send(zipBuffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create ZIP' });
  }
}
