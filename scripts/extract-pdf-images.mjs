import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import mupdf from 'mupdf';

const PDF_PATH = "C:\\Users\\jjson\\OneDrive\\Desktop\\CATALOGO 2025☺☺☺♥️♥️ (1).pdf";
const OUTPUT_DIR = "C:\\Users\\jjson\\OneDrive\\Documenti\\dontelmo-app\\public\\catalog-images";

async function extractImages() {
  console.log('Loading MuPDF...');

  mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Opening PDF: ${PDF_PATH}`);
  const pdfData = readFileSync(PDF_PATH);
  const doc = mupdf.Document.openDocument(pdfData, "application/pdf");

  const pageCount = doc.countPages();
  console.log(`Total pages: ${pageCount}`);

  const DPI = 150;
  const SCALE = DPI / 72; // PDF points to pixels at target DPI

  const successful = [];
  const failed = [];

  for (let i = 0; i < pageCount; i++) {
    const pageNum = i + 1;
    const padded = String(pageNum).padStart(3, '0');
    const filename = `page_${padded}.jpg`;
    const outputPath = join(OUTPUT_DIR, filename);

    try {
      const page = doc.loadPage(i);
      const bounds = page.getBounds();

      // Render page to pixmap at target scale
      const matrix = mupdf.Matrix.scale(SCALE, SCALE);
      const pixmap = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false, true);

      // Get JPEG bytes
      const jpegBytes = pixmap.asJPEG(85, false);
      writeFileSync(outputPath, jpegBytes);

      const width = pixmap.getWidth();
      const height = pixmap.getHeight();
      console.log(`[${pageNum}/${pageCount}] Saved ${filename} (${width}x${height})`);
      successful.push(filename);

      pixmap.destroy();
      page.destroy();
    } catch (err) {
      console.error(`[${pageNum}/${pageCount}] Failed: ${err.message}`);
      failed.push(pageNum);
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Successfully extracted: ${successful.length} images`);
  if (failed.length > 0) {
    console.log(`Failed pages: ${failed.join(', ')}`);
  }

  return { successful, failed };
}

extractImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
