import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FileText, Scissors, Upload, X } from "lucide-react";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { formatFileSize } from "@/lib/pdf-utils";
import Layout from "@/components/layout/layout";

export default function ExtractPages() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageRange, setPageRange] = useState("");
  const { processFiles, isProcessing, progress } = usePDFProcessor();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    multiple: false
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const parsePageRange = (range: string): number[] => {
    const pages: number[] = [];
    const parts = range.split(',');
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
        for (let i = start; i <= end; i++) {
          if (i > 0) pages.push(i);
        }
      } else {
        const pageNum = parseInt(trimmed);
        if (pageNum > 0) pages.push(pageNum);
      }
    }
    
    return Array.from(new Set(pages)).sort((a, b) => a - b);
  };

  const handleExtract = async () => {
    const pageNumbers = parsePageRange(pageRange);
    if (pageNumbers.length === 0) {
      alert("Please enter valid page numbers");
      return;
    }
    
    await processFiles(files, 'extract', { pageNumbers });
    setFiles([]);
    setPageRange("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">Extract PDF Pages</h1>
          <p className="text-xl text-muted-foreground mb-6" data-testid="page-description">
            Extract specific pages from your PDF document
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Upload PDF File
            </CardTitle>
            <CardDescription>
              Select a PDF file to extract pages from.
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
              <CardTitle>Page Selection</CardTitle>
              <CardDescription>Specify which pages to extract from the PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Pages to Extract</label>
                  <Input
                    placeholder="e.g., 1,3,5-7,10"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    data-testid="page-range-input"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use commas to separate individual pages and dashes for ranges (e.g., "1,3,5-7,10")
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {files.length > 0 && pageRange && (
          <div className="text-center">
            <Button
              onClick={handleExtract}
              disabled={isProcessing}
              size="lg"
              className="min-w-[200px]"
              data-testid="extract-button"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <Scissors className="mr-2 h-4 w-4" />
                  Extract Pages
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