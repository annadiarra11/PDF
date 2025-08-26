import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
      'application/vnd.ms-powerpoint', // .ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // Here you would typically send an email notification
      console.log("Contact message received:", message);
      
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to send message. Please check your input." 
      });
    }
  });

  // File upload endpoint
  app.post("/api/upload", upload.single('file'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: "No file uploaded" 
        });
      }

      const uploadedFile = await storage.createUploadedFile({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size
      });

      res.json({ 
        success: true, 
        fileId: uploadedFile.id,
        filename: uploadedFile.originalName 
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to upload file" 
      });
    }
  });

  // Document to PDF conversion endpoint
  app.post("/api/document-to-pdf", upload.single('file'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // For document conversion, we'd need specialized libraries like mammoth for Word, etc.
      // For now, return a proper JSON error response
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      
      res.json({
        success: false,
        message: "Document conversion is not yet implemented on the server side. Please use client-side processing."
      });
    } catch (error) {
      console.error("Document conversion error:", error);
      res.status(500).json({ success: false, message: "Failed to convert document" });
    }
  });

  // PDF to text extraction endpoint
  app.post("/api/pdf-to-text", upload.single('file'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // Text extraction would need specialized library like pdf-parse
      // For now, return a proper JSON error response
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      
      res.json({
        success: false,
        message: "PDF text extraction is not yet implemented on the server side. Please use client-side processing."
      });
    } catch (error) {
      console.error("PDF text extraction error:", error);
      res.status(500).json({ success: false, message: "Failed to extract text from PDF" });
    }
  });

  // File download endpoint
  app.get("/api/files/:id", async (req, res) => {
    try {
      const file = await storage.getUploadedFile(req.params.id);
      if (!file) {
        return res.status(404).json({ 
          success: false, 
          message: "File not found" 
        });
      }

      const filePath = path.join('uploads', file.filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ 
          success: false, 
          message: "File not found on disk" 
        });
      }

      res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
      res.setHeader('Content-Type', file.mimeType);
      res.sendFile(path.resolve(filePath));
    } catch (error) {
      console.error("File download error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to download file" 
      });
    }
  });

  // Cleanup expired files (called periodically)
  app.post("/api/cleanup", async (req, res) => {
    try {
      const expiredFiles = await storage.getExpiredFiles();
      
      for (const file of expiredFiles) {
        const filePath = path.join('uploads', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        await storage.deleteUploadedFile(file.id);
      }

      res.json({ 
        success: true, 
        deleted: expiredFiles.length 
      });
    } catch (error) {
      console.error("Cleanup error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Cleanup failed" 
      });
    }
  });

  const httpServer = createServer(app);

  // Setup periodic cleanup (every hour)
  setInterval(async () => {
    try {
      const expiredFiles = await storage.getExpiredFiles();
      for (const file of expiredFiles) {
        const filePath = path.join('uploads', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        await storage.deleteUploadedFile(file.id);
      }
      if (expiredFiles.length > 0) {
        console.log(`Cleaned up ${expiredFiles.length} expired files`);
      }
    } catch (error) {
      console.error("Automatic cleanup error:", error);
    }
  }, 60 * 60 * 1000); // 1 hour

  // PDF to Image conversion endpoint (server-side processing)
  app.post("/api/pdf-to-images", upload.single('file'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: "No PDF file uploaded" 
        });
      }

      const { format = 'jpg', quality = 'high' } = req.body;
      
      // Use pdf2pic for server-side PDF to image conversion
      const pdf2pic = require('pdf2pic');
      
      const convert = pdf2pic.fromPath(req.file.path, {
        density: quality === 'high' ? 300 : quality === 'medium' ? 150 : 72,
        saveFilename: `${req.file.filename}`,
        savePath: './uploads/',
        format: format,
        width: 2480,
        height: 3508
      });

      const results = await convert.bulk(-1, { responseType: 'buffer' });
      
      // Clean up uploaded file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });

      res.json({ 
        success: true, 
        images: results.map((result, index) => ({
          page: index + 1,
          data: result.buffer.toString('base64'),
          filename: `${req.file.originalname.split('.')[0]}_page_${index + 1}.${format}`
        }))
      });
    } catch (error) {
      console.error("PDF to image conversion error:", error);
      
      // Clean up uploaded file on error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting uploaded file:', err);
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to convert PDF to images. This feature requires server-side processing." 
      });
    }
  });

  // PDF text extraction endpoint
  app.post("/api/extract-text", upload.single('file'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: "No PDF file uploaded" 
        });
      }

      const pdfParse = require('pdf-parse');
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(dataBuffer);
      
      // Clean up uploaded file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });

      res.json({ 
        success: true, 
        text: data.text,
        pages: data.numpages,
        info: data.info
      });
    } catch (error) {
      console.error("Text extraction error:", error);
      
      // Clean up uploaded file on error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting uploaded file:', err);
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to extract text from PDF" 
      });
    }
  });

  return httpServer;
}
