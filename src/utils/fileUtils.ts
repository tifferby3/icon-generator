import JSZip from 'jszip';

export async function createZipBuffer(svgs: string[], filenames?: string[]): Promise<Buffer> {
  const zip = new JSZip();
  svgs.forEach((svg, i) => {
    const name = filenames?.[i] || `icon${i + 1}.svg`;
    zip.file(name, svg);
  });
  return await zip.generateAsync({ type: 'nodebuffer' });
}
