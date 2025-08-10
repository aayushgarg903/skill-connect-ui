import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">
              Dire<span className="text-foreground">Hire</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.home')}
            </a>
            <a href="/booth" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.booth')}
            </a>
            <a href="/support" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.support')}
            </a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English {language === 'en' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>
                  हिंदी {language === 'hi' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/auth?type=customer'}>
              {t('nav.findWorkers')}
            </Button>
            <Button variant="hero" size="lg" onClick={() => window.location.href = '/auth?type=worker'}>
              {t('nav.joinAsWorker')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              <a
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.home')}
              </a>
              <a
                href="/booth"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.booth')}
              </a>
              <a
                href="/support"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.support')}
              </a>
              <div className="flex gap-2 px-3 py-2">
                <Button 
                  variant={language === 'en' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setLanguage('en')}
                >
                  EN
                </Button>
                <Button 
                  variant={language === 'hi' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setLanguage('hi')}
                >
                  हि
                </Button>
              </div>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button variant="outline" size="lg" className="w-full" onClick={() => window.location.href = '/auth?type=customer'}>
                  {t('nav.findWorkers')}
                </Button>
                <Button variant="hero" size="lg" className="w-full" onClick={() => window.location.href = '/auth?type=worker'}>
                  {t('nav.joinAsWorker')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};