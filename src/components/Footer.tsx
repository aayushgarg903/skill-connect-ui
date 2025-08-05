import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary">
              Dire<span className="text-foreground">Hire</span>
            </div>
            <p className="text-muted-foreground">
              Connecting customers with trusted local professionals for all your home service needs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                support@direhire.com
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                1-800-DIRE-HIRE
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                Available nationwide
              </div>
            </div>
          </div>

          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Customers</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Find Workers
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Service Areas
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Pricing Guide
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Safety & Insurance
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Customer Reviews
              </a>
            </div>
          </div>

          {/* For Workers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Workers</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Join as Professional
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Worker Dashboard
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Certification Program
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Marketing Tools
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Payment Processing
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Success Stories
              </a>
            </div>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Support
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Community Guidelines
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get the latest updates on new services and special offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Enter your email"
                className="md:w-64"
              />
              <Button variant="default">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} DiReHire. All rights reserved.
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>

          {/* Additional Links */}
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Accessibility
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};