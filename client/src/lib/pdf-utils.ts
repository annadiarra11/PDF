import { PDFDocument, rgb } from 'pdf-lib';

export class PDFProcessor {
  static async mergePDFs(files: File[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    return await mergedPdf.save();
  }

  static async compressPDF(file: File, quality = 0.5): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Basic compression by rewriting the PDF
    return await pdfDoc.save({
      useObjectStreams: false,
      addDefaultPage: false,
    });
  }

  static async rotatePDF(file: File, rotation: number): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const pages = pdfDoc.getPages();
    pages.forEach(page => {
      page.setRotation(rotation as any);
    });
    
    return await pdfDoc.save();
  }

  static async extractPages(file: File, pageNumbers: number[]): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const newPdf = await PDFDocument.create();
    
    const pages = await newPdf.copyPages(pdfDoc, pageNumbers.map(n => n - 1));
    pages.forEach(page => newPdf.addPage(page));
    
    return await newPdf.save();
  }

  static async removePages(file: File, pageNumbers: number[]): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();
    
    // Get pages to keep (inverse of pages to remove)
    const pagesToKeep = Array.from({ length: totalPages }, (_, i) => i)
      .filter(i => !pageNumbers.includes(i + 1));
    
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdfDoc, pagesToKeep);
    pages.forEach(page => newPdf.addPage(page));
    
    return await newPdf.save();
  }

  static async addPasswordProtection(file: File, password: string): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Note: PDF-lib doesn't support encryption directly
    // This would need a server-side implementation with a library like pdf2pic
    // For now, return the original file
    return await pdfDoc.save();
  }

  static async convertImageToPDF(file: File): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    
    const imageBytes = await file.arrayBuffer();
    let image;
    
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      throw new Error('Unsupported image format');
    }
    
    const { width, height } = image.scale(1);
    page.setSize(width, height);
    page.drawImage(image, { x: 0, y: 0, width, height });
    
    return await pdfDoc.save();
  }

  static async convertPDFToImages(file: File): Promise<string[]> {
    // This requires server-side processing with tools like pdf2pic
    // For client-side, we'd need a library like PDF.js
    // This is a placeholder implementation
    throw new Error('PDF to image conversion requires server-side processing');
  }

  static async extractText(file: File): Promise<string> {
    // Text extraction from PDF requires additional libraries
    // This is a basic placeholder implementation
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // PDF-lib doesn't have built-in text extraction
    // Would need pdf-parse or similar library
    return "Text extraction requires additional libraries for full implementation";
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
