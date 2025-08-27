import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { processFiles, isProcessing, progress } = usePDFProcessor();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    // Auto-detect operation based on file type and show appropriate tool
  };

  const coreTools = [
    {
      title: t('mergePdf'),
      description: t('mergePdfDesc'),
      icon: FileText,
      href: "/tools/merge-pdf"
    },
    {
      title: t('rotatePdf'), 
      description: t('rotatePdfDesc'),
      icon: RotateCw,
      href: "/tools/rotate-pdf"
    },
    {
      title: t('extractPages'),
      description: t('extractPagesDesc'),
      icon: Scissors,
      href: "/tools/extract-pages"
    },
    {
      title: t('compressPdf'),
      description: t('compressPdfDesc'),
      icon: Minimize2,
      href: "/tools/compress-pdf"
    },
    {
      title: t('organizePdf'),
      description: t('organizePdfDesc'),
      icon: ArrowUpDown,
      href: "/tools/organize-pdf"
    },
    {
      title: t('removePages'),
      description: t('removePagesDesc'),
      icon: Trash2,
      href: "/tools/remove-pages"
    },
    {
      title: t('grayscalePdf'),
      description: t('grayscalePdfDesc'),
      icon: Palette,
      href: "/tools/grayscale-pdf"
    },
    {
      title: t('repairPdf'),
      description: t('repairPdfDesc'),
      icon: Wrench,
      href: "/tools/repair-pdf"
    }
  ];

  const convertToTools = [
    {
      title: t('jpgToPdf'),
      description: t('jpgToPdfDesc'),
      icon: Image,
      href: "/tools/jpg-to-pdf"
    },
    {
      title: t('pngToPdf'),
      description: t('pngToPdfDesc'), 
      icon: Image,
      href: "/tools/png-to-pdf"
    },
    {
      title: t('wordToPdf'),
      description: t('wordToPdfDesc'),
      icon: File,
      href: "/tools/word-to-pdf"
    },
    {
      title: t('powerpointToPdf'),
      description: t('powerpointToPdfDesc'),
      icon: Presentation,
      href: "/tools/powerpoint-to-pdf"
    },
    {
      title: t('excelToPdf'),
      description: t('excelToPdfDesc'),
      icon: FileSpreadsheet,
      href: "/tools/excel-to-pdf"
    },
    {
      title: t('txtToPdf'),
      description: t('txtToPdfDesc'),
      icon: FileText,
      href: "/tools/txt-to-pdf"
    }
  ];

  const convertFromTools = [
    {
      title: t('pdfToJpg'),
      description: t('pdfToJpgDesc'),
      icon: Image,
      href: "/tools/pdf-to-jpg"
    },
    {
      title: t('pdfToPng'), 
      description: t('pdfToPngDesc'),
      icon: Image,
      href: "/tools/pdf-to-png"
    },
    {
      title: t('pdfToWord'),
      description: t('pdfToWordDesc'),
      icon: File,
      href: "/tools/pdf-to-word"
    },
    {
      title: t('pdfToTxt'),
      description: t('pdfToTxtDesc'),
      icon: FileText,
      href: "/tools/pdf-to-txt"
    },
    {
      title: t('pdfToZip'),
      description: t('pdfToZipDesc'),
      icon: FileText,
      href: "/tools/pdf-to-zip"
    }
  ];

  const securityTools = [
    {
      title: t('protectPdf'),
      description: t('protectPdfDesc'),
      icon: Lock,
      href: "/tools/protect-pdf"
    },
    {
      title: t('unlockPdf'),
      description: t('unlockPdfDesc'),
      icon: Unlock,
      href: "/tools/unlock-pdf"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: t('secureTitle'),
      description: t('secureDesc'),
      color: "text-success"
    },
    {
      icon: Zap,
      title: t('fastTitle'), 
      description: t('fastDesc'),
      color: "text-primary"
    },
    {
      icon: Globe,
      title: t('compatibleTitle'),
      description: t('compatibleDesc'),
      color: "text-warning"
    },
    {
      icon: DollarSign,
      title: t('freeTitle'),
      description: t('freeDesc'),
      color: "text-success"
    },
    {
      icon: Smartphone,
      title: t('mobileTitle'),
      description: t('mobileDesc'),
      color: "text-primary"
    },
    {
      icon: Languages,
      title: t('multiLangTitle'),
      description: t('multiLangDesc'),
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
              {t('welcome')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('description')}
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
              {t('corePdfOperations')}
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
              {t('convertToPdf')}
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
              {t('convertFromPdf')}
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
              {t('securityTools')}
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('whyChoosePdfkit')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('whyChoosePdfkitDesc')}</p>
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
                <h4 className="text-lg font-semibold text-blue-900 mb-2">{t('configurableFileLimits')}</h4>
                <p className="text-blue-800">
                  {t('configurableFileLimitsDesc')} <span className="font-semibold">10MB {t('perFile')}</span>
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('aboutPdfkit')}</h2>
              <p className="text-xl text-gray-600">{t('aboutPdfkitDesc')}</p>
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
                <h3 className="text-2xl font-bold">{t('ourMission')}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t('missionDesc')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-success text-xl"></i>
                    <span className="text-gray-700">{t('privacyFirst')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-success text-xl"></i>
                    <span className="text-gray-700">{t('clientSideProcessing')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-success text-xl"></i>
                    <span className="text-gray-700">{t('noRegistration')}</span>
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
