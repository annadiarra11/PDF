import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CloudUpload, File, X } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
  className?: string;
}

export default function FileUpload({
  onFilesSelected,
  accept = { "application/pdf": [".pdf"] },
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  className
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => multiple ? [...prev, ...acceptedFiles] : acceptedFiles);
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected, multiple]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "upload-zone",
          isDragActive && "dragover",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        data-testid="file-upload-zone"
      >
        <input {...getInputProps()} data-testid="file-input" />
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CloudUpload className="text-2xl text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {isDragActive ? "Drop your files here" : "Drop your files here"}
          </h3>
          <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
          <Button type="button" className="bg-primary text-white hover:bg-primary-dark" data-testid="browse-files-button">
            Choose Files
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            Max file size: {formatFileSize(maxSize)}
          </p>
        </div>
      </div>

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-red-800 font-medium mb-2">Some files were rejected:</h4>
          <ul className="text-red-700 text-sm space-y-1">
            {fileRejections.map(({ file, errors }, index) => (
              <li key={index}>
                {file.name}: {errors.map(e => e.message).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border"
              data-testid={`uploaded-file-${index}`}
            >
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500"
                data-testid={`remove-file-${index}`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
