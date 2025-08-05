import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Bell } from "lucide-react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Booth
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Support
            </a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="lg">
              Find Workers
            </Button>
            <Button variant="hero" size="lg">
              Join as Worker
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
                href="#"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                Booth
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                Support
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button variant="outline" size="lg" className="w-full">
                  Find Workers
                </Button>
                <Button variant="hero" size="lg" className="w-full">
                  Join as Worker
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};