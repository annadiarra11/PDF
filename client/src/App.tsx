import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import MergePdf from "@/pages/tools/merge-pdf";
import CompressPdf from "@/pages/tools/compress-pdf";
import JpgToPdf from "@/pages/tools/jpg-to-pdf";
import PdfToJpg from "@/pages/tools/pdf-to-jpg";
import RotatePdf from "@/pages/tools/rotate-pdf";
import ExtractPages from "@/pages/tools/extract-pages";
import RemovePages from "@/pages/tools/remove-pages";
import OrganizePdf from "@/pages/tools/organize-pdf";
import GrayscalePdf from "@/pages/tools/grayscale-pdf";
import PngToPdf from "@/pages/tools/png-to-pdf";
import PdfToPng from "@/pages/tools/pdf-to-png";
import RepairPdf from "@/pages/tools/repair-pdf";
import ProtectPdf from "@/pages/tools/protect-pdf";
import UnlockPdf from "@/pages/tools/unlock-pdf";
import PdfToTxt from "@/pages/tools/pdf-to-txt";
import WordToPdf from "@/pages/tools/word-to-pdf";
import TxtToPdf from "@/pages/tools/txt-to-pdf";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/tools/merge-pdf" component={MergePdf} />
      <Route path="/tools/compress-pdf" component={CompressPdf} />
      <Route path="/tools/jpg-to-pdf" component={JpgToPdf} />
      <Route path="/tools/pdf-to-jpg" component={PdfToJpg} />
      <Route path="/tools/rotate-pdf" component={RotatePdf} />
      <Route path="/tools/extract-pages" component={ExtractPages} />
      <Route path="/tools/remove-pages" component={RemovePages} />
      <Route path="/tools/organize-pdf" component={OrganizePdf} />
      <Route path="/tools/grayscale-pdf" component={GrayscalePdf} />
      <Route path="/tools/png-to-pdf" component={PngToPdf} />
      <Route path="/tools/pdf-to-png" component={PdfToPng} />
      <Route path="/tools/repair-pdf" component={RepairPdf} />
      <Route path="/tools/protect-pdf" component={ProtectPdf} />
      <Route path="/tools/unlock-pdf" component={UnlockPdf} />
      <Route path="/tools/pdf-to-txt" component={PdfToTxt} />
      <Route path="/tools/word-to-pdf" component={WordToPdf} />
      <Route path="/tools/txt-to-pdf" component={TxtToPdf} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
