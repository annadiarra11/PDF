import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FileUpload from "@/components/ui/file-upload";
import ToolCard from "@/components/ui/tool-card";
import ProcessingModal from "@/components/ui/processing-modal";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { 
  FileText, 
  RotateCw, 
  Scissors, 
  Minimize2, 
  ArrowUpDown, 
  Trash2, 
  Palette, 
  Wrench,
  Image,
  File,
  Presentation,
  FileSpreadsheet,
  Lock,
  Unlock,
  Shield,
  Zap,
  Globe,
  DollarSign,
  Smartphone,
  Languages
} from "lucide-react";

export default function Home() {
  const { processFiles, isProcessing, progress } = usePDFProcessor();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    // Auto-detect operation based on file type and show appropriate tool
  };

  const coreTools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into a single document",
      icon: FileText,
      href: "/tools/merge-pdf"
    },
    {
      title: "Rotate PDF", 
      description: "Adjust the orientation of pages within your PDF",
      icon: RotateCw,
      href: "/tools/rotate-pdf"
    },
    {
      title: "Extract Pages",
      description: "Create new PDF with selected pages from existing file",
      icon: Scissors,
      href: "/tools/extract-pages"
    },
    {
      title: "Compress PDF",
      description: "Reduce file size for optimized sharing and storage",
      icon: Minimize2,
      href: "/tools/compress-pdf"
    },
    {
      title: "Organize PDF",
      description: "Reorder pages to create a custom sequence",
      icon: ArrowUpDown,
      href: "/tools/organize-pdf"
    },
    {
      title: "Remove Pages",
      description: "Delete specified pages from PDF document",
      icon: Trash2,
      href: "/tools/remove-pages"
    },
    {
      title: "Grayscale PDF",
      description: "Convert PDF documents to grayscale for printing",
      icon: Palette,
      href: "/tools/grayscale-pdf"
    },
    {
      title: "Repair PDF",
      description: "Fix corrupted or damaged PDF files",
      icon: Wrench,
      href: "/tools/repair-pdf"
    }
  ];

  const convertToTools = [
    {
      title: "JPG to PDF",
      description: "Convert JPEG images to PDF format",
      icon: Image,
      href: "/tools/jpg-to-pdf"
    },
    {
      title: "PNG to PDF",
      description: "Convert PNG images to PDF format", 
      icon: Image,
      href: "/tools/png-to-pdf"
    },
    {
      title: "Word to PDF",
      description: "Convert Word documents to PDF format",
      icon: File,
      href: "/tools/word-to-pdf"
    },
    {
      title: "PowerPoint to PDF",
      description: "Convert PowerPoint presentations to PDF",
      icon: Presentation,
      href: "/tools/powerpoint-to-pdf"
    },
    {
      title: "Excel to PDF",
      description: "Convert Excel spreadsheets to PDF",
      icon: FileSpreadsheet,
      href: "/tools/excel-to-pdf"
    },
    {
      title: "TXT to PDF",
      description: "Convert text files to PDF format",
      icon: FileText,
      href: "/tools/txt-to-pdf"
    }
  ];

  const convertFromTools = [
    {
      title: "PDF to JPG",
      description: "Convert PDF pages to JPEG images",
      icon: Image,
      href: "/tools/pdf-to-jpg"
    },
    {
      title: "PDF to PNG", 
      description: "Convert PDF pages to PNG images",
      icon: Image,
      href: "/tools/pdf-to-png"
    },
    {
      title: "PDF to Word",
      description: "Extract text from PDF to Word document",
      icon: File,
      href: "/tools/pdf-to-word"
    },
    {
      title: "PDF to TXT",
      description: "Extract plain text from PDF documents",
      icon: FileText,
      href: "/tools/pdf-to-txt"
    },
    {
      title: "PDF to ZIP",
      description: "Convert PDF to compressed ZIP archive",
      icon: FileText,
      href: "/tools/pdf-to-zip"
    }
  ];

  const securityTools = [
    {
      title: "Protect PDF",
      description: "Add password protection to your PDF documents",
      icon: Lock,
      href: "/tools/protect-pdf"
    },
    {
      title: "Unlock PDF",
      description: "Remove password protection from PDF files",
      icon: Unlock,
      href: "/tools/unlock-pdf"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "All files are automatically deleted from our servers after 1 hour. Your privacy is guaranteed.",
      color: "text-success"
    },
    {
      icon: Zap,
      title: "Lightning Fast", 
      description: "Client-side processing means instant results without uploading to servers for most operations.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Works on all modern browsers and devices. No software installation required.",
      color: "text-warning"
    },
    {
      icon: DollarSign,
      title: "Completely Free",
      description: "All tools are free to use with no hidden fees, subscriptions, or registration required.",
      color: "text-success"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Fully responsive design that works perfectly on smartphones, tablets, and desktops.",
      color: "text-primary"
    },
    {
      icon: Languages,
      title: "Multi-Language",
      description: "Available in multiple languages to serve users worldwide with localized interfaces.",
      color: "text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional PDF Operations
              <span className="text-primary block mt-2">Made Simple</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Comprehensive suite of PDF tools for merging, converting, compressing, and editing. 
              Secure, fast, and completely free to use.
            </p>
            
            {/* Quick Upload Zone */}
            <div className="max-w-lg mx-auto">
              <FileUpload
                onFilesSelected={handleFilesSelected}
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".tiff"]
                }}
                multiple
              />
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-success" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-warning"></i>
                <span>Auto Delete in 1 hour</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>Works Offline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Complete PDF Toolkit</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to work with PDF documents, organized by category for easy access.</p>
          </div>

          {/* Core PDF Operations */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left flex items-center">
              <FileText className="text-primary mr-3" />
              Core PDF Operations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreTools.map((tool) => (
                <ToolCard
                  key={tool.title}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                  category="core"
                />
              ))}
            </div>
          </div>

          {/* Convert to PDF */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left flex items-center">
              <FileText className="text-success mr-3" />
              Convert to PDF
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {convertToTools.map((tool) => (
                <ToolCard
                  key={tool.title}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                  category="convert-to"
                />
              ))}
            </div>
          </div>

          {/* Convert from PDF */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left flex items-center">
              <FileText className="text-warning mr-3" />
              Convert from PDF
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {convertFromTools.map((tool) => (
                <ToolCard
                  key={tool.title}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                  category="convert-from"
                />
              ))}
            </div>
          </div>

          {/* Security Tools */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left flex items-center">
              <Shield className="text-danger mr-3" />
              Security Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityTools.map((tool) => (
                <ToolCard
                  key={tool.title}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  href={tool.href}
                  category="security"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose PDFKit Pro?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Built with security, performance, and ease of use in mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-8">
                <div className={`w-16 h-16 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 ${feature.color.replace('text-', 'bg-')}/10`}>
                  <feature.icon className={`text-2xl ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* File Size Configuration Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-12">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <i className="fas fa-info-circle text-blue-500 text-xl"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Configurable File Limits</h4>
                <p className="text-blue-800">
                  File size limits can be easily configured per tool to meet your specific requirements. 
                  Current limit: <span className="font-semibold">10MB per file</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">About PDFKit Pro</h2>
              <p className="text-xl text-gray-600">Empowering users with professional PDF tools that are secure, fast, and accessible to everyone.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional team working with documents" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We believe everyone should have access to powerful PDF tools without compromising on security or paying expensive subscription fees. 
                  PDFKit Pro was built to democratize document processing with enterprise-grade functionality.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-success text-xl"></i>
                    <span className="text-gray-700">Privacy-first approach with automatic file deletion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-success text-xl"></i>
                    <span className="text-gray-700">Client-side processing for maximum security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-success text-xl"></i>
                    <span className="text-gray-700">No registration or personal information required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <ProcessingModal
        isOpen={isProcessing}
        progress={progress}
      />
    </div>
  );
}
