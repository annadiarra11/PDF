import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  progress?: number;
}

export default function ProcessingModal({
  isOpen,
  title = "Processing your file...",
  description = "Please wait while we process your PDF.",
  progress = 0
}: ProcessingModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" data-testid="processing-modal">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="text-2xl text-primary animate-spin" />
          </div>
          <h3 className="text-xl font-semibold mb-2" data-testid="processing-title">
            {title}
          </h3>
          <p className="text-gray-600 mb-6" data-testid="processing-description">
            {description}
          </p>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="w-full" data-testid="processing-progress" />
            <p className="text-sm text-gray-500" data-testid="progress-text">
              {progress}% Complete
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
