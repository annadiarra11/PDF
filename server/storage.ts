import { type ContactMessage, type InsertContactMessage, type UploadedFile, type InsertUploadedFile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createUploadedFile(file: InsertUploadedFile): Promise<UploadedFile>;
  getUploadedFile(id: string): Promise<UploadedFile | undefined>;
  deleteUploadedFile(id: string): Promise<void>;
  getExpiredFiles(): Promise<UploadedFile[]>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<string, ContactMessage>;
  private uploadedFiles: Map<string, UploadedFile>;

  constructor() {
    this.contactMessages = new Map();
    this.uploadedFiles = new Map();
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createUploadedFile(insertFile: InsertUploadedFile): Promise<UploadedFile> {
    const id = randomUUID();
    const file: UploadedFile = { 
      ...insertFile, 
      id, 
      uploadedAt: new Date() 
    };
    this.uploadedFiles.set(id, file);
    return file;
  }

  async getUploadedFile(id: string): Promise<UploadedFile | undefined> {
    return this.uploadedFiles.get(id);
  }

  async deleteUploadedFile(id: string): Promise<void> {
    this.uploadedFiles.delete(id);
  }

  async getExpiredFiles(): Promise<UploadedFile[]> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return Array.from(this.uploadedFiles.values()).filter(
      file => file.uploadedAt && file.uploadedAt < oneHourAgo
    );
  }
}

export const storage = new MemStorage();
