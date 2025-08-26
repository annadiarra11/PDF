import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Type, Upload, X } from "lucide-react";
import { formatFileSize } from "@/lib/pdf-utils";
import Layout from "@/components/layout/layout";

export default function TxtToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/plain': ['.txt'] },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    multiple: false
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch('/api/document-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert text file to PDF');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        throw new Error(result.message || 'Text conversion not implemented yet');
      } else {
        throw new Error('Server returned invalid response format');
      }
      
      clearInterval(progressInterval);
      setProgress(100);

      if (result.success) {
        // Download the converted PDF
        const blob = new Blob([Uint8Array.from(atob(result.pdf), c => c.charCodeAt(0))], 
          { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setFiles([]);
        alert('Text file converted successfully!');
      } else {
        throw new Error(result.message || 'Conversion failed');
      }

    } catch (error) {
      console.error('Text conversion error:', error);
      alert('Failed to convert text file: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">Text to PDF</h1>
          <p className="text-xl text-muted-foreground mb-6" data-testid="page-description">
            Convert plain text files to PDF format
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Upload Text File
            </CardTitle>
            <CardDescription>
              Select a text file (.txt) to convert to PDF.
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
                <p className="text-lg">Drop the text file here...</p>
              ) : (
                <div>
                  <p className="text-lg mb-2">Drag & drop a text file here, or click to select</p>
                  <p className="text-sm text-muted-foreground">Supports .txt files • Maximum file size: 10MB</p>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3" data-testid="selected-files-title">Selected File:</h3>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" data-testid={`file-item-${index}`}>
                    <div className="flex items-center gap-3">
                      <Type className="h-5 w-5 text-green-500" />
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
          <div className="text-center">
            <Button
              onClick={handleConvert}
              disabled={isProcessing}
              size="lg"
              className="min-w-[200px]"
              data-testid="convert-button"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Converting...
                </div>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Convert to PDF
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