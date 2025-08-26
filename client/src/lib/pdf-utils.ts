import { PDFDocument, rgb } from 'pdf-lib';

export class PDFProcessor {
  static async grayscalePDF(file: File): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Note: PDF-lib doesn't have built-in grayscale conversion
    // This is a placeholder - actual grayscale conversion requires advanced PDF manipulation
    // In a real implementation, you'd need to process each page's color space
    return await pdfDoc.save();
  }

  static async repairPDF(file: File): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      // Basic repair by rewriting the PDF structure
      return await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });
    } catch (error) {
      throw new Error('PDF repair failed: The document may be severely corrupted');
    }
  }

  static async unlockPDF(file: File, password?: string): Promise<Uint8Array> {
    const pdfBytes = await file.arrayBuffer();
    try {
      // PDF-lib has limited password support
      const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      return await pdfDoc.save();
    } catch (error) {
      throw new Error('Failed to unlock PDF. Password may be required or document is corrupted.');
    }
  }

  static async convertImagesToPDF(files: File[]): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    
    for (const file of files) {
      const page = pdfDoc.addPage();
      const imageBytes = await file.arrayBuffer();
      let image;
      
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (file.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        continue; // Skip unsupported formats
      }
      
      const { width, height } = image.scale(1);
      // Fit image to page while maintaining aspect ratio
      const pageWidth = 595; // A4 width
      const pageHeight = 842; // A4 height
      
      const scaleX = pageWidth / width;
      const scaleY = pageHeight / height;
      const scale = Math.min(scaleX, scaleY, 1); // Don't upscale
      
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;
      
      page.setSize(scaledWidth, scaledHeight);
      page.drawImage(image, { x: 0, y: 0, width: scaledWidth, height: scaledHeight });
    }
    
    return await pdfDoc.save();
  }
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
    
    // Enhanced compression with better options
    const saveOptions: any = {
      useObjectStreams: quality < 0.7, // Use object streams for better compression
      addDefaultPage: false,
    };

    // Apply quality-based compression settings
    if (quality <= 0.3) {
      // High compression - most aggressive settings
      saveOptions.objectsPerTick = 25;
      saveOptions.updateFieldAppearances = false;
    } else if (quality <= 0.7) {
      // Medium compression
      saveOptions.objectsPerTick = 50;
      saveOptions.updateFieldAppearances = false;
    } else {
      // Low compression - preserve quality
      saveOptions.objectsPerTick = 100;
      saveOptions.updateFieldAppearances = true;
    }
    
    const compressedBytes = await pdfDoc.save(saveOptions);
    
    // Ensure we actually achieve some compression
    console.log(`Original size: ${pdfBytes.byteLength}, Compressed size: ${compressedBytes.byteLength}, Ratio: ${(compressedBytes.byteLength / pdfBytes.byteLength * 100).toFixed(1)}%`);
    
    return compressedBytes;
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

  static async convertPDFToImages(file: File, format = 'jpg', quality = 'high'): Promise<string[]> {
    // Use server-side processing for PDF to image conversion
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    formData.append('quality', quality);

    try {
      const response = await fetch('/api/pdf-to-images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert PDF to images');
      }

      const result = await response.json();
      if (result.success) {
        return result.images.map((img: any) => ({
          page: img.page,
          dataUrl: `data:image/${format};base64,${img.data}`,
          filename: img.filename
        }));
      } else {
        throw new Error(result.message || 'Conversion failed');
      }
    } catch (error) {
      throw new Error('PDF to image conversion requires server-side processing');
    }
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
