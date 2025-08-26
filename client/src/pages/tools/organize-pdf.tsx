import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FileText, ArrowUpDown, Upload, X } from "lucide-react";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { formatFileSize } from "@/lib/pdf-utils";
import Layout from "@/components/layout/layout";

export default function OrganizePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageOrder, setPageOrder] = useState("");
  const { processFiles, isProcessing, progress } = usePDFProcessor();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    multiple: false
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const parsePageOrder = (order: string): number[] => {
    const pages: number[] = [];
    const parts = order.split(',');
    
    for (const part of parts) {
      const pageNum = parseInt(part.trim());
      if (pageNum > 0) pages.push(pageNum);
    }
    
    return pages;
  };

  const handleOrganize = async () => {
    const pageNumbers = parsePageOrder(pageOrder);
    if (pageNumbers.length === 0) {
      alert("Please enter valid page numbers");
      return;
    }
    
    await processFiles(files, 'extract', { pageNumbers });
    setFiles([]);
    setPageOrder("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">Organize PDF Pages</h1>
          <p className="text-xl text-muted-foreground mb-6" data-testid="page-description">
            Rearrange pages in your PDF document in any order
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Upload PDF File
            </CardTitle>
            <CardDescription>
              Select a PDF file to reorganize its pages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
              }`}
              data-testid="dropzone"
            >
              <input {...getInputProps()} data-testid="file-input" />
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-lg">Drop the PDF file here...</p>
              ) : (
                <div>
                  <p className="text-lg mb-2">Drag & drop a PDF file here, or click to select</p>
                  <p className="text-sm text-muted-foreground">Maximum file size: 10MB</p>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3" data-testid="selected-files-title">Selected File:</h3>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" data-testid={`file-item-${index}`}>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium" data-testid={`file-name-${index}`}>{file.name}</p>
                        <p className="text-sm text-muted-foreground" data-testid={`file-size-${index}`}>{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      data-testid={`remove-file-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {files.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Page Order</CardTitle>
              <CardDescription>Specify the new order for your PDF pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">New Page Order</label>
                  <Input
                    placeholder="e.g., 3,1,5,2,4"
                    value={pageOrder}
                    onChange={(e) => setPageOrder(e.target.value)}
                    data-testid="page-order-input"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter page numbers in the order you want them (e.g., "3,1,5,2,4" to put page 3 first, then page 1, etc.)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {files.length > 0 && pageOrder && (
          <div className="text-center">
            <Button
              onClick={handleOrganize}
              disabled={isProcessing}
              size="lg"
              className="min-w-[200px]"
              data-testid="organize-button"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Organize PDF
                </>
              )}
            </Button>
            
            {isProcessing && (
              <div className="mt-4">
                <Progress value={progress} className="w-full max-w-md mx-auto" data-testid="progress-bar" />
                <p className="text-sm text-muted-foreground mt-2" data-testid="progress-text">{progress}%</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}