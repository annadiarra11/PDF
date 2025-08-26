import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FileUpload from "@/components/ui/file-upload";
import ProcessingModal from "@/components/ui/processing-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { useToast } from "@/hooks/use-toast";
import { Image, FileText, Info, Settings } from "lucide-react";

export default function PdfToJpg() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageQuality, setImageQuality] = useState("high");
  const [resolution, setResolution] = useState("300");
  const [extractAllPages, setExtractAllPages] = useState(true);
  const [pageRange, setPageRange] = useState("");
  const { isProcessing, progress } = usePDFProcessor();
  const { toast } = useToast();

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleConvert = () => {
    if (!selectedFile) return;
    
    // Note: PDF to image conversion typically requires server-side processing
    // This would need implementation with libraries like pdf2pic or PDF.js
    toast({
      title: "Feature Coming Soon",
      description: "PDF to JPG conversion requires server-side processing and will be available in a future update.",
      variant: "destructive",
    });
  };

  const parsePageRange = (range: string) => {
    if (!range.trim()) return [];
    
    try {
      const pages: number[] = [];
      const parts = range.split(',');
      
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }
          }
        } else {
          const page = parseInt(trimmed);
          if (!isNaN(page)) {
            pages.push(page);
          }
        }
      }
      
      return Array.from(new Set(pages)).sort((a, b) => a - b);
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warning/5 via-yellow-50 to-amber-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Image className="w-8 h-8 text-warning" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Convert PDF to JPG
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Extract pages from your PDF as high-quality JPEG images. Perfect for presentations, web use, or image editing.
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
                  <FileText className="w-5 h-5 text-warning mr-2" />
                  Select PDF File to Convert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesSelected={handleFileSelected}
                  accept={{ "application/pdf": [".pdf"] }}
                  multiple={false}
                  data-testid="pdf-to-jpg-upload"
                />
                
                {selectedFile && (
                  <div className="mt-6 space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <FileText className="w-8 h-8 text-warning" />
                      </div>
                    </div>

                    {/* Conversion Settings */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Image Quality</Label>
                          <Select value={imageQuality} onValueChange={setImageQuality}>
                            <SelectTrigger data-testid="quality-select">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low (Faster, Smaller)</SelectItem>
                              <SelectItem value="medium">Medium (Balanced)</SelectItem>
                              <SelectItem value="high">High (Recommended)</SelectItem>
                              <SelectItem value="highest">Highest (Larger Files)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Resolution (DPI)</Label>
                          <Select value={resolution} onValueChange={setResolution}>
                            <SelectTrigger data-testid="resolution-select">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="150">150 DPI (Web)</SelectItem>
                              <SelectItem value="300">300 DPI (Print)</SelectItem>
                              <SelectItem value="600">600 DPI (High Quality)</SelectItem>
                              <SelectItem value="1200">1200 DPI (Maximum)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Page Selection */}
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Page Selection</Label>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="extract-all"
                            checked={extractAllPages}
                            onCheckedChange={(checked) => setExtractAllPages(checked === true)}
                            data-testid="extract-all-checkbox"
                          />
                          <Label htmlFor="extract-all" className="text-sm">
                            Extract all pages
                          </Label>
                        </div>

                        {!extractAllPages && (
                          <div className="space-y-2">
                            <Label htmlFor="page-range" className="text-sm">
                              Page Range (e.g., 1,3,5-8)
                            </Label>
                            <Input
                              id="page-range"
                              value={pageRange}
                              onChange={(e) => setPageRange(e.target.value)}
                              placeholder="1,3,5-8"
                              data-testid="page-range-input"
                            />
                            {pageRange && (
                              <p className="text-xs text-gray-500">
                                Pages to extract: {parsePageRange(pageRange).join(', ') || 'Invalid range'}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={handleConvert}
                      disabled={isProcessing}
                      className="w-full bg-warning hover:bg-warning/90 text-gray-900"
                      data-testid="convert-pdf-to-jpg-button"
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Convert to JPG
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How to Convert PDF to JPG</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-warning font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload PDF</h3>
                    <p className="text-gray-600 text-sm">
                      Select the PDF file you want to convert to JPEG images.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-warning font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Configure Options</h3>
                    <p className="text-gray-600 text-sm">
                      Choose quality, resolution, and which pages to extract.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-warning font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Download Images</h3>
                    <p className="text-gray-600 text-sm">
                      Get your JPG images in a ZIP file for easy download.
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
                    <Settings className="w-5 h-5 text-primary mr-2" />
                    Customizable Output
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Control image quality, resolution, and which pages to extract. Perfect for different use cases from web to print.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Info className="w-5 h-5 text-success mr-2" />
                    Batch Processing
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Extract all pages at once or specify exact page ranges. Each page becomes a separate high-quality JPEG image.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quality Guide */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Image className="w-5 h-5 text-warning mr-2" />
                  Quality & Resolution Guide
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Image Quality:</h4>
                    <ul className="space-y-1">
                      <li>• <strong>Low:</strong> Fast processing, small files</li>
                      <li>• <strong>Medium:</strong> Good balance for most uses</li>
                      <li>• <strong>High:</strong> Recommended for documents</li>
                      <li>• <strong>Highest:</strong> Best quality, larger files</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resolution (DPI):</h4>
                    <ul className="space-y-1">
                      <li>• <strong>150 DPI:</strong> Web use, screen viewing</li>
                      <li>• <strong>300 DPI:</strong> Standard print quality</li>
                      <li>• <strong>600 DPI:</strong> High-quality printing</li>
                      <li>• <strong>1200 DPI:</strong> Professional printing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Notice */}
            <Card className="mt-6 border-warning/20 bg-warning/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 flex items-center text-warning">
                  <Info className="w-5 h-5 mr-2" />
                  Development Notice
                </h3>
                <p className="text-gray-700">
                  PDF to JPG conversion requires specialized server-side processing libraries and will be available in a future update. 
                  This feature is currently in development and will support all the options shown above.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      <ProcessingModal
        isOpen={isProcessing}
        title="Converting PDF to JPG..."
        description="Please wait while we extract images from your PDF document."
        progress={progress}
      />
    </div>
  );
}
