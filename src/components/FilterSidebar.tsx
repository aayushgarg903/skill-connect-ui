import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const FilterSidebar = () => {
  const { t } = useLanguage();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedWorkType, setSelectedWorkType] = useState<string[]>([]);

  const services = [
    'services.carpenter', 'services.plumber', 'services.electrician', 'services.painter', 'services.mason',
    'services.cleaner', 'services.gardener', 'services.cook', 'services.driver', 'services.tutor'
  ];

  const experienceLevels = ['filters.beginner', 'filters.intermediate', 'filters.expert'];
  const availability = ['filters.today', 'filters.thisWeek', 'filters.flexible'];
  const workTypes = ['filters.onsite', 'filters.remote'];


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
    setSelectedServices([]);
    setSelectedExperience([]);
    setSelectedAvailability([]);
    setSelectedWorkType([]);
  };

  const getActiveFilterCount = () => {
    return selectedServices.length + selectedExperience.length + 
           selectedAvailability.length + selectedWorkType.length;
  };

  return (
    <Card className="sticky top-24 h-fit shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            {t('filters.title')}
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
              {t('filters.clear')}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Service Type */}
        <div>
          <h3 className="font-medium mb-3">{t('filters.serviceType')}</h3>
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
                  {t(service)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div>
          <h3 className="font-medium mb-3">{t('filters.experienceLevel')}</h3>
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
                  {t(level)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div>
          <h3 className="font-medium mb-3">{t('filters.availability')}</h3>
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
                  {t(avail)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Work Type */}
        <div>
          <h3 className="font-medium mb-3">{t('filters.workPreference')}</h3>
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
                  {t(type)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};