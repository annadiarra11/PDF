import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [language, setLanguage] = useState("en");
  
  const navigation = [
    { name: "Tools", href: "/#tools" },
    { name: "Features", href: "/#features" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
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
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20 bg-gray-100 border-0" data-testid="language-selector">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 EN</SelectItem>
                <SelectItem value="es">🇪🇸 ES</SelectItem>
                <SelectItem value="fr">🇫🇷 FR</SelectItem>
                <SelectItem value="de">🇩🇪 DE</SelectItem>
              </SelectContent>
            </Select>
            
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
