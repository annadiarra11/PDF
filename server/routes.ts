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
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed'));
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

  return httpServer;
}
