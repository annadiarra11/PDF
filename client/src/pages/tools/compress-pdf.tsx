import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FileUpload from "@/components/ui/file-upload";
import ProcessingModal from "@/components/ui/processing-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { Minimize2, Info, Zap } from "lucide-react";

export default function CompressPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState([0.7]); // 70% quality
  const { processFiles, isProcessing, progress } = usePDFProcessor();

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleCompress = () => {
    if (!selectedFile) return;
    
    processFiles([selectedFile], 'compress', { 
      quality: compressionLevel[0] 
    });
  };

  const getCompressionLabel = (value: number) => {
    if (value >= 0.8) return "High Quality (Minimal Compression)";
    if (value >= 0.6) return "Balanced (Recommended)";
    if (value >= 0.4) return "High Compression";
    return "Maximum Compression";
  };

  const getEstimatedReduction = (value: number) => {
    const reduction = Math.round((1 - value) * 60); // Estimate based on quality
    return `~${reduction}% smaller`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Minimize2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Compress PDF Files
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Reduce your PDF file size while maintaining quality. Perfect for email attachments and faster sharing.
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
                  <Minimize2 className="w-5 h-5 text-primary mr-2" />
                  Select PDF File to Compress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesSelected={handleFileSelected}
                  accept={{ "application/pdf": [".pdf"] }}
                  multiple={false}
                  data-testid="compress-pdf-upload"
                />
                
                {selectedFile && (
                  <div className="mt-6 space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            Original size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-success">
                            {getEstimatedReduction(compressionLevel[0])}
                          </p>
                          <p className="text-xs text-gray-500">Estimated reduction</p>
                        </div>
                      </div>
                    </div>

                    {/* Compression Settings */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Compression Level</Label>
                      <div className="space-y-4">
                        <Slider
                          value={compressionLevel}
                          onValueChange={setCompressionLevel}
                          min={0.1}
                          max={1}
                          step={0.1}
                          className="w-full"
                          data-testid="compression-slider"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Maximum Compression</span>
                          <span>High Quality</span>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-primary">
                            {getCompressionLabel(compressionLevel[0])}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quality: {Math.round(compressionLevel[0] * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleCompress}
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary-dark"
                      data-testid="compress-pdf-button"
                    >
                      <Minimize2 className="w-4 h-4 mr-2" />
                      Compress PDF
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How PDF Compression Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload PDF</h3>
                    <p className="text-gray-600 text-sm">
                      Select the PDF file you want to compress from your device.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Choose Quality</h3>
                    <p className="text-gray-600 text-sm">
                      Adjust the compression level to balance file size and quality.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Download</h3>
                    <p className="text-gray-600 text-sm">
                      Get your compressed PDF with reduced file size instantly.
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
                    Smart Optimization
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our compression algorithm optimizes images and removes unnecessary data while preserving text quality and document structure.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Info className="w-5 h-5 text-success mr-2" />
                    Customizable Settings
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Choose your preferred compression level - from maximum file size reduction to preserving the highest quality possible.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tips */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Info className="w-5 h-5 text-primary mr-2" />
                  Compression Tips
                </h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• <strong>High Quality (80-100%):</strong> Best for documents with detailed images or graphics</li>
                  <li>• <strong>Balanced (60-80%):</strong> Recommended for most documents, good balance of size and quality</li>
                  <li>• <strong>High Compression (40-60%):</strong> Good for text-heavy documents or email attachments</li>
                  <li>• <strong>Maximum (10-40%):</strong> Smallest file size, may affect image quality</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      <ProcessingModal
        isOpen={isProcessing}
        title="Compressing PDF..."
        description="Please wait while we optimize your PDF file size."
        progress={progress}
      />
    </div>
  );
}
