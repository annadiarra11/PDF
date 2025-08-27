import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { FileText, Twitter, Linkedin, Github } from "lucide-react";
import LanguageSelector from "@/components/ui/language-selector";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('pdfTools'), href: "/#tools" },
    { name: t('features'), href: "/#features" },
    { name: t('aboutUs'), href: "/about" },
    { name: t('contact'), href: "/contact" },
  ];

  const popularTools = [
    { name: t('mergePdf'), href: "/tools/merge-pdf" },
    { name: t('compressPdf'), href: "/tools/compress-pdf" },
    { name: t('jpgToPdf'), href: "/tools/jpg-to-pdf" },
    { name: t('pdfToJpg'), href: "/tools/pdf-to-jpg" },
  ];

  const legalLinks = [
    { name: t('privacyPolicy'), href: "/privacy" },
    { name: t('termsConditions'), href: "/terms" },
    { name: t('cookiePolicy'), href: "#" },
    { name: t('gdprCompliance'), href: "#" },
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
              {t('companyDesc')}
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
            <h4 className="text-lg font-semibold text-white mb-4">{t('quickLinks')}</h4>
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
            <h4 className="text-lg font-semibold text-white mb-4">{t('popularTools')}</h4>
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
            <h4 className="text-lg font-semibold text-white mb-4">{t('legal')}</h4>
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
            © {currentYear} PDFKit Pro. {t('allRightsReserved')}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">{t('language')}:</span>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
