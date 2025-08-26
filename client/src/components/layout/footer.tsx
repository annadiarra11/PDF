import { Link } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "PDF Tools", href: "/#tools" },
    { name: "Features", href: "/#features" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const popularTools = [
    { name: "Merge PDF", href: "/tools/merge-pdf" },
    { name: "Compress PDF", href: "/tools/compress-pdf" },
    { name: "JPG to PDF", href: "/tools/jpg-to-pdf" },
    { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR Compliance", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white">PDFKit Pro</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Professional PDF operations made simple, secure, and accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" data-testid="social-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" data-testid="social-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" data-testid="social-github">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              {popularTools.map((tool) => (
                <li key={tool.name}>
                  <Link 
                    href={tool.href} 
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-tool-${tool.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-legal-${link.name.toLowerCase().replace(/[& ]/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm" data-testid="copyright">
            © {currentYear} PDFKit Pro. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Language:</span>
            <Select defaultValue="en">
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-gray-300" data-testid="footer-language-selector">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
}
