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
