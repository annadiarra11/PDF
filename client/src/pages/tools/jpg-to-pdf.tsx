import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FileUpload from "@/components/ui/file-upload";
import ProcessingModal from "@/components/ui/processing-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { Image, FileText, Info, Zap } from "lucide-react";

export default function JpgToPdf() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pageOrientation, setPageOrientation] = useState("auto");
  const [pageSize, setPageSize] = useState("a4");
  const { processFiles, isProcessing, progress } = usePDFProcessor();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleConvert = () => {
    if (selectedFiles.length === 0) return;
    
    // For multiple images, we'll process them one by one and create separate PDFs
    // or combine them into a single PDF
    selectedFiles.forEach((file, index) => {
      processFiles([file], 'image-to-pdf', {
        orientation: pageOrientation,
        size: pageSize
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-success/5 via-green-50 to-emerald-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Image className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Convert JPG to PDF
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your JPEG images into professional PDF documents. Perfect for creating portfolios, reports, or archives.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Upload Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="w-5 h-5 text-success mr-2" />
                  Select JPG Images to Convert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  accept={{ 
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/jpg": [".jpg", ".jpeg"]
                  }}
                  multiple={true}
                  data-testid="jpg-to-pdf-upload"
                />
                
                {selectedFiles.length > 0 && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Selected Images ({selectedFiles.length})</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedFiles.map((file, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-50 rounded-lg p-3 border text-center"
                            data-testid={`jpg-file-${index}`}
                          >
                            <Image className="w-8 h-8 text-success mx-auto mb-2" />
                            <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Conversion Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Page Size</Label>
                        <Select value={pageSize} onValueChange={setPageSize}>
                          <SelectTrigger data-testid="page-size-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                            <SelectItem value="letter">Letter (8.5 × 11 in)</SelectItem>
                            <SelectItem value="a3">A3 (297 × 420 mm)</SelectItem>
                            <SelectItem value="auto">Auto (Fit to Image)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Orientation</Label>
                        <Select value={pageOrientation} onValueChange={setPageOrientation}>
                          <SelectTrigger data-testid="orientation-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto Detect</SelectItem>
                            <SelectItem value="portrait">Portrait</SelectItem>
                            <SelectItem value="landscape">Landscape</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={handleConvert}
                      disabled={isProcessing}
                      className="w-full bg-success hover:bg-success/90"
                      data-testid="convert-jpg-to-pdf-button"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Convert to PDF
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How to Convert JPG to PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-success font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload Images</h3>
                    <p className="text-gray-600 text-sm">
                      Select one or multiple JPG/JPEG files from your device.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-success font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Configure Settings</h3>
                    <p className="text-gray-600 text-sm">
                      Choose page size and orientation for your PDF document.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-success font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Download PDF</h3>
                    <p className="text-gray-600 text-sm">
                      Get your converted PDF file ready for sharing or printing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Zap className="w-5 h-5 text-warning mr-2" />
                    High Quality Conversion
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Preserves original image quality and resolution. No compression or quality loss during the conversion process.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Info className="w-5 h-5 text-primary mr-2" />
                    Flexible Options
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Choose from various page sizes and orientations. Auto-detect features make conversion simple and efficient.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Supported Formats */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Image className="w-5 h-5 text-success mr-2" />
                  Supported Image Formats
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-700">.JPG</p>
                    <p className="text-xs text-gray-500">JPEG Images</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-gray-700">.JPEG</p>
                    <p className="text-xs text-gray-500">JPEG Images</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 opacity-50">
                    <p className="font-medium text-gray-700">.PNG</p>
                    <p className="text-xs text-gray-500">Coming Soon</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 opacity-50">
                    <p className="font-medium text-gray-700">.BMP</p>
                    <p className="text-xs text-gray-500">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      <ProcessingModal
        isOpen={isProcessing}
        title="Converting Images to PDF..."
        description="Please wait while we create your PDF document from the selected images."
        progress={progress}
      />
    </div>
  );
}
