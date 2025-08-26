# PDFKit Pro

## Overview

PDFKit Pro is a comprehensive web application for PDF operations and document processing. The platform provides a complete suite of PDF manipulation tools including merge, compress, rotate, extract pages, and various format conversions (image-to-PDF, PDF-to-image, document conversions). Built as a full-stack TypeScript application with a React frontend and Express backend, the system emphasizes security with automatic file deletion, user privacy, and professional-grade PDF processing capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **Routing**: Wouter for client-side routing with file-based page organization
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation schemas
- **PDF Processing**: PDF-lib library for client-side PDF operations
- **File Handling**: React Dropzone for drag-and-drop file uploads

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **File Upload**: Multer middleware with configurable size limits and file type validation
- **Storage Strategy**: In-memory storage with planned database integration
- **API Design**: RESTful endpoints with structured error handling and logging middleware

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Centralized schema definitions in shared directory
- **Migration Strategy**: Drizzle Kit for database migrations and schema changes
- **Current Implementation**: Memory-based storage with database interfaces ready for production

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Planned Security**: Session-based authentication with connect-pg-simple for session storage
- **File Security**: Automatic file deletion after 1 hour for privacy
- **Validation**: Zod schemas for input validation across client and server

### Development and Build System
- **Build Tool**: Vite for frontend with esbuild for backend bundling
- **Development**: Hot reload with Vite middleware integration
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Code Quality**: Consistent formatting and shared type definitions

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL for production data storage
- **Connection**: @neondatabase/serverless for database connectivity

### PDF Processing Libraries
- **PDF-lib**: Primary PDF manipulation library for merge, compress, rotate operations
- **Client-side Processing**: Reduces server load and improves privacy

### UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Consistent icon library throughout the application

### File Handling
- **Multer**: Server-side file upload handling with type validation
- **React Dropzone**: Enhanced file upload experience with drag-and-drop

### Form and Validation
- **React Hook Form**: Performant form handling with minimal re-renders
- **Zod**: Type-safe schema validation shared between client and server
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Development Tools
- **Vite Plugins**: Runtime error overlay and development tooling for Replit
- **TypeScript**: End-to-end type safety with strict configuration
- **ESM**: Modern module system throughout the application

### Additional Services
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing solution for React applications
- **Date-fns**: Date manipulation and formatting utilities