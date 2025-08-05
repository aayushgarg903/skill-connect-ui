import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Shield, Eye, Heart } from "lucide-react";
import { useState } from "react";

interface Worker {
  id: string;
  name: string;
  profession: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  projectRate?: number;
  skills: string[];
  isAvailable: boolean;
  isVerified: boolean;
  isTopRated: boolean;
  experience: string;
  profileImage: string;
  portfolioImages: string[];
  completedJobs: number;
}

interface WorkerCardProps {
  worker: Worker;
}

export const WorkerCard = ({ worker }: WorkerCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const generateAvatar = (name: string) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  };

  const generatePortfolioImage = (index: number) => {
    return `https://picsum.photos/200/150?random=${worker.id}-${index}`;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border">
      <CardContent className="p-0">
        {/* Header with Avatar and Basic Info */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={generateAvatar(worker.name)} alt={worker.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {worker.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
                    <Shield className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-foreground">{worker.name}</h3>
                  {worker.isTopRated && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                      Top Rated
                    </Badge>
                  )}
                </div>
                <p className="text-primary font-medium">{worker.profession}</p>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {worker.location}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="self-start"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              </Button>
            </div>
          </div>

          {/* Rating and Experience */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= worker.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{worker.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">
                  ({worker.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {worker.completedJobs} jobs completed
            </div>
          </div>

          {/* Availability and Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full mr-2 ${
                worker.isAvailable ? 'bg-success' : 'bg-error'
              }`} />
              <span className={`text-sm font-medium ${
                worker.isAvailable ? 'text-success' : 'text-error'
              }`}>
                {worker.isAvailable ? 'Available Today' : 'Busy'}
              </span>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-lg text-foreground">
                ${worker.hourlyRate}/hr
              </div>
              {worker.projectRate && (
                <div className="text-sm text-muted-foreground">
                  ${worker.projectRate} project rate
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {worker.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {worker.skills.length > 3 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{worker.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Portfolio Preview */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Recent Work</h4>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={generatePortfolioImage(index)}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            <Button variant="default" className="flex-1">
              Hire Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};