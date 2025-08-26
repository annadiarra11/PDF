import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Image, Upload, X } from "lucide-react";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { formatFileSize } from "@/lib/pdf-utils";
import Layout from "@/components/layout/layout";

export default function PngToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const { processFiles, isProcessing, progress } = usePDFProcessor();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': ['.png'] },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 1) {
      await processFiles(files, 'image-to-pdf', {});
    } else {
      // For multiple images, convert each and then merge
      await processFiles(files, 'images-to-pdf', {});
    }
    setFiles([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">PNG to PDF</h1>
          <p className="text-xl text-muted-foreground mb-6" data-testid="page-description">
            Convert PNG images to PDF documents
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Upload PNG Files
            </CardTitle>
            <CardDescription>
              Select one or more PNG image files to convert to PDF.
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
                <p className="text-lg">Drop the PNG files here...</p>
              ) : (
                <div>
                  <p className="text-lg mb-2">Drag & drop PNG files here, or click to select</p>
                  <p className="text-sm text-muted-foreground">Maximum file size: 10MB per file</p>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3" data-testid="selected-files-title">
                  Selected Files ({files.length}):
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" data-testid={`file-item-${index}`}>
                      <div className="flex items-center gap-3">
                        <Image className="h-5 w-5 text-blue-500" />
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