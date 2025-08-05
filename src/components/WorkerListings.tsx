import { WorkerCard } from "./WorkerCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

// Mock worker data
const mockWorkers = [
  {
    id: "1",
    name: "John Smith",
    profession: "Master Carpenter",
    location: "Downtown Area",
    rating: 4.8,
    reviewCount: 127,
    hourlyRate: 85,
    projectRate: 500,
    skills: ["Furniture Making", "Home Renovation", "Deck Building", "Custom Cabinets"],
    isAvailable: true,
    isVerified: true,
    isTopRated: true,
    experience: "Expert",
    profileImage: "",
    portfolioImages: [],
    completedJobs: 89
  },
  {
    id: "2",
    name: "Maria Garcia",
    profession: "Licensed Plumber",
    location: "North Side",
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 95,
    projectRate: 350,
    skills: ["Emergency Repairs", "Bathroom Installation", "Pipe Fitting", "Water Heaters"],
    isAvailable: true,
    isVerified: true,
    isTopRated: true,
    experience: "Expert",
    profileImage: "",
    portfolioImages: [],
    completedJobs: 156
  },
  {
    id: "3",
    name: "David Chen",
    profession: "Certified Electrician",
    location: "East District",
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: 90,
    skills: ["Wiring", "Panel Installation", "Smart Home Setup", "Lighting"],
    isAvailable: false,
    isVerified: true,
    isTopRated: false,
    experience: "Expert",
    profileImage: "",
    portfolioImages: [],
    completedJobs: 67
  },
  {
    id: "4",
    name: "Sarah Johnson",
    profession: "Professional Cleaner",
    location: "West End",
    rating: 4.6,
    reviewCount: 145,
    hourlyRate: 45,
    projectRate: 120,
    skills: ["Deep Cleaning", "Office Cleaning", "Move-in/out", "Eco-friendly"],
    isAvailable: true,
    isVerified: true,
    isTopRated: false,
    experience: "Intermediate",
    profileImage: "",
    portfolioImages: [],
    completedJobs: 234
  },
  {
    id: "5",
    name: "Mike Thompson",
    profession: "Interior Painter",
    location: "South Bay",
    rating: 4.5,
    reviewCount: 76,
    hourlyRate: 55,
    projectRate: 800,
    skills: ["Interior Painting", "Exterior Painting", "Wall Texture", "Color Consultation"],
    isAvailable: true,
    isVerified: false,
    isTopRated: false,
    experience: "Intermediate",
    profileImage: "",
    portfolioImages: [],
    completedJobs: 45
  },
  {
    id: "6",
    name: "Lisa Wong",
    profession: "Mason & Tiler",
    location: "Central City",
    rating: 4.8,
    reviewCount: 112,
    hourlyRate: 80,
    projectRate: 1200,
    skills: ["Tile Installation", "Stone Work", "Bathroom Tiling", "Kitchen Backsplash"],
    isAvailable: true,
    isVerified: true,
    isTopRated: true,
    experience: "Expert",
    profileImage: "",
    portfolioImages: [],
    completedJobs: 78
  }
];

export const WorkerListings = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const workersPerPage = 6;

  // Pagination calculations
  const totalPages = Math.ceil(mockWorkers.length / workersPerPage);
  const startIndex = (currentPage - 1) * workersPerPage;
  const currentWorkers = mockWorkers.slice(startIndex, startIndex + workersPerPage);

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "reviews", label: "Most Reviews" },
    { value: "availability", label: "Available First" }
  ];

  return (
    <div className="flex-1">
      {/* Listings Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Available Workers</h2>
          <p className="text-muted-foreground">
            {mockWorkers.length} workers found in your area
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-lg">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Worker Grid */}
      <div className={`grid gap-6 mb-8 ${
        viewMode === "grid" 
          ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-2" 
          : "grid-cols-1"
      }`}>
        {currentWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};