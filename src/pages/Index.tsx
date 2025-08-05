import { Navbar } from "@/components/Navbar";
import { HeroSearch } from "@/components/HeroSearch";
import { FilterSidebar } from "@/components/FilterSidebar";
import { WorkerListings } from "@/components/WorkerListings";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section with Search */}
      <HeroSearch />
      
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterSidebar />
          </div>
          
          {/* Worker Listings */}
          <div className="flex-1">
            <WorkerListings />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
