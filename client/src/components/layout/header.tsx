import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText } from "lucide-react";
import LanguageSelector from "@/components/ui/language-selector";

export default function Header() {
  const [location] = useLocation();
  const { t } = useTranslation();
  
  const navigation = [
    { name: t('allTools'), href: "/#tools" },
    { name: t('features'), href: "/#features" },
    { name: t('about'), href: "/about" },
    { name: t('contact'), href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location === "/";
    return location === href;
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="text-white text-lg" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">PDFKit Pro</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    isActive(item.href)
                      ? "text-primary font-medium"
                      : "text-gray-700 hover:text-primary"
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" data-testid="mobile-menu-button">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`py-2 px-3 rounded-md transition-colors ${
                        isActive(item.href)
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-gray-700 hover:text-primary hover:bg-gray-100"
                      }`}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
