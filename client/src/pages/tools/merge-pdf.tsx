import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FileUpload from "@/components/ui/file-upload";
import ProcessingModal from "@/components/ui/processing-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { FileText, ArrowRight, Info } from "lucide-react";

export default function MergePdf() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { processFiles, isProcessing, progress } = usePDFProcessor();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleMerge = () => {
    if (selectedFiles.length < 2) {
      return;
    }
    processFiles(selectedFiles, 'merge');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Merge PDF Files
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Combine multiple PDF documents into a single file. Simply upload your PDFs and we'll merge them in the order you specify.
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
                  <FileText className="w-5 h-5 text-primary mr-2" />
                  Select PDF Files to Merge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  accept={{ "application/pdf": [".pdf"] }}
                  multiple={true}
                  data-testid="merge-pdf-upload"
                />
                
                {selectedFiles.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Files to Merge ({selectedFiles.length})</h3>
                      {selectedFiles.length >= 2 && (
                        <Button 
                          onClick={handleMerge}
                          disabled={isProcessing}
                          className="bg-primary hover:bg-primary-dark"
                          data-testid="merge-pdf-button"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Merge PDFs
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border"
                          data-testid={`merge-file-${index}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          {index < selectedFiles.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedFiles.length < 2 && (
                      <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Info className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-warning font-medium">More Files Needed</h4>
                            <p className="text-warning/80 text-sm">
                              Please select at least 2 PDF files to merge them together.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>How to Merge PDFs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload Files</h3>
                    <p className="text-gray-600 text-sm">
                      Select or drag and drop multiple PDF files you want to merge.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Arrange Order</h3>
                    <p className="text-gray-600 text-sm">
                      Files will be merged in the order they appear. The order is based on upload sequence.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Download</h3>
                    <p className="text-gray-600 text-sm">
                      Click merge and download your combined PDF file automatically.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Info className="w-5 h-5 text-success mr-2" />
                    Secure Processing
                  </h3>
                  <p className="text-gray-600 text-sm">
                    All merging happens locally in your browser when possible. Files uploaded to our servers are automatically deleted after 1 hour.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-2" />
                    Preserve Quality
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Original PDF quality and formatting are maintained during the merge process. No compression or quality loss.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <ProcessingModal
        isOpen={isProcessing}
        title="Merging PDF Files..."
        description="Please wait while we combine your PDF documents."
        progress={progress}
      />
    </div>
  );
}
