import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Filter, X } from "lucide-react";

export const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([20, 200]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedWorkType, setSelectedWorkType] = useState<string[]>([]);

  const services = [
    "Carpenter", "Plumber", "Electrician", "Painter", "Mason", 
    "Cleaner", "Gardner", "Cook", "Mechanic", "AC Technician"
  ];

  const experienceLevels = ["Beginner", "Intermediate", "Expert"];
  const availability = ["Today", "Tomorrow", "This Week", "Flexible"];
  const workTypes = ["Solo Work", "Team Work", "Both"];

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handleFilterToggle = (
    value: string, 
    selectedItems: string[], 
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([20, 200]);
    setSelectedRatings([]);
    setSelectedServices([]);
    setSelectedExperience([]);
    setSelectedAvailability([]);
    setSelectedWorkType([]);
  };

  const getActiveFilterCount = () => {
    return selectedRatings.length + selectedServices.length + 
           selectedExperience.length + selectedAvailability.length + 
           selectedWorkType.length;
  };

  return (
    <Card className="sticky top-24 h-fit shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()}
              </Badge>
            )}
          </CardTitle>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range (per hour)</h3>
          <div className="px-3">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Worker Rating */}
        <div>
          <h3 className="font-medium mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingToggle(rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center cursor-pointer"
                >
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">& above</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Service Type */}
        <div>
          <h3 className="font-medium mb-3">Service Type</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {services.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service}`}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={() => handleFilterToggle(service, selectedServices, setSelectedServices)}
                />
                <label
                  htmlFor={`service-${service}`}
                  className="text-sm cursor-pointer"
                >
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div>
          <h3 className="font-medium mb-3">Experience Level</h3>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`experience-${level}`}
                  checked={selectedExperience.includes(level)}
                  onCheckedChange={() => handleFilterToggle(level, selectedExperience, setSelectedExperience)}
                />
                <label
                  htmlFor={`experience-${level}`}
                  className="text-sm cursor-pointer"
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div>
          <h3 className="font-medium mb-3">Availability</h3>
          <div className="space-y-2">
            {availability.map((avail) => (
              <div key={avail} className="flex items-center space-x-2">
                <Checkbox
                  id={`availability-${avail}`}
                  checked={selectedAvailability.includes(avail)}
                  onCheckedChange={() => handleFilterToggle(avail, selectedAvailability, setSelectedAvailability)}
                />
                <label
                  htmlFor={`availability-${avail}`}
                  className="text-sm cursor-pointer"
                >
                  {avail}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Work Type */}
        <div>
          <h3 className="font-medium mb-3">Work Preference</h3>
          <div className="space-y-2">
            {workTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`worktype-${type}`}
                  checked={selectedWorkType.includes(type)}
                  onCheckedChange={() => handleFilterToggle(type, selectedWorkType, setSelectedWorkType)}
                />
                <label
                  htmlFor={`worktype-${type}`}
                  className="text-sm cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};