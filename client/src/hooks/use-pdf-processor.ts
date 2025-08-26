import { useState } from 'react';
import { PDFProcessor, downloadBlob } from '@/lib/pdf-utils';
import { useToast } from '@/hooks/use-toast';

export function usePDFProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const processFiles = async (
    files: File[],
    operation: 'merge' | 'compress' | 'rotate' | 'extract' | 'remove' | 'protect' | 'image-to-pdf',
    options: any = {}
  ) => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      let result: Uint8Array;
      let filename: string;

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      switch (operation) {
        case 'merge':
          result = await PDFProcessor.mergePDFs(files);
          filename = 'merged-document.pdf';
          break;
        case 'compress':
          result = await PDFProcessor.compressPDF(files[0], options.quality || 0.5);
          filename = `compressed-${files[0].name}`;
          break;
        case 'rotate':
          result = await PDFProcessor.rotatePDF(files[0], options.rotation || 90);
          filename = `rotated-${files[0].name}`;
          break;
        case 'extract':
          result = await PDFProcessor.extractPages(files[0], options.pageNumbers || [1]);
          filename = `extracted-${files[0].name}`;
          break;
        case 'remove':
          result = await PDFProcessor.removePages(files[0], options.pageNumbers || []);
          filename = `modified-${files[0].name}`;
          break;
        case 'protect':
          result = await PDFProcessor.addPasswordProtection(files[0], options.password || '');
          filename = `protected-${files[0].name}`;
          break;
        case 'image-to-pdf':
          result = await PDFProcessor.convertImageToPDF(files[0]);
          filename = `${files[0].name.split('.')[0]}.pdf`;
          break;
        default:
          throw new Error('Unsupported operation');
      }

      clearInterval(progressInterval);
      setProgress(100);

      // Download the result
      const blob = new Blob([result], { type: 'application/pdf' });
      downloadBlob(blob, filename);

      toast({
        title: "Success!",
        description: "Your PDF has been processed and downloaded.",
      });

    } catch (error) {
      console.error('PDF processing error:', error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your PDF.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return {
    processFiles,
    isProcessing,
    progress,
  };
}
