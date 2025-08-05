import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Search, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-workers.jpg";

export const HeroSearch = () => {
  const [date, setDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");

  const services = [
    "Carpenter", "Plumber", "Electrician", "Painter", "Mason", 
    "Cleaner", "Gardner", "Cook", "Mechanic", "AC Technician"
  ];

  const urgencyOptions = [
    "Same Day", "Within Week", "Flexible"
  ];

  return (
    <section 
      className="relative bg-gradient-to-r from-primary/90 to-primary-glow/90 py-20 lg:py-32"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Find Trusted <span className="text-yellow-300">Local Workers</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Connect with skilled professionals for home repairs, cleaning, and maintenance services
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-2xl p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
            {/* Service Type */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Service Type
              </label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-lg">
                  {services.map((service) => (
                    <SelectItem key={service} value={service.toLowerCase()}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Date Picker */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Preferred Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border border-border" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Urgency */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Urgency
              </label>
              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger className="h-12">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="How urgent?" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-lg">
                  {urgencyOptions.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-transparent mb-2">
                Search
              </label>
              <Button variant="hero" size="xl" className="w-full h-12">
                <Search className="mr-2 h-5 w-5" />
                Search Workers
              </Button>
            </div>
          </div>

          {/* Quick Service Buttons */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Popular services:</p>
            <div className="flex flex-wrap gap-3">
              {["Plumber", "Electrician", "Carpenter", "Cleaner", "Painter"].map((service) => (
                <Button
                  key={service}
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedService(service.toLowerCase())}
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};