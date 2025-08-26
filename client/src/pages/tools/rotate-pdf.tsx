import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, RotateCw, Upload, X } from "lucide-react";
import { usePDFProcessor } from "@/hooks/use-pdf-processor";
import { formatFileSize } from "@/lib/pdf-utils";
import Layout from "@/components/layout/layout";

export default function RotatePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [rotation, setRotation] = useState("90");
  const { processFiles, isProcessing, progress } = usePDFProcessor();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    multiple: false
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleRotate = async () => {
    await processFiles(files, 'rotate', { rotation: parseInt(rotation) });
    setFiles([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">Rotate PDF</h1>
          <p className="text-xl text-muted-foreground mb-6" data-testid="page-description">
            Rotate your PDF pages clockwise or counterclockwise
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Upload PDF File
            </CardTitle>
            <CardDescription>
              Select a PDF file to rotate. All pages will be rotated by the specified degrees.
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
              <CardTitle>Rotation Settings</CardTitle>
              <CardDescription>Choose the rotation angle for your PDF pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rotation Angle</label>
                  <Select value={rotation} onValueChange={setRotation} data-testid="rotation-select">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90° Clockwise</SelectItem>
                      <SelectItem value="180">180° (Upside Down)</SelectItem>
                      <SelectItem value="270">270° (90° Counterclockwise)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {files.length > 0 && (
          <div className="text-center">
            <Button
              onClick={handleRotate}
              disabled={isProcessing}
              size="lg"
              className="min-w-[200px]"
              data-testid="rotate-button"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Rotate PDF
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