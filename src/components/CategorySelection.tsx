import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, Mountain, Cloud, Calendar, Sprout } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface CategorySelectionProps {
  onComplete: (data: FarmingData) => void;
}

interface FarmingData {
  state: string;
  landSize: string;
  soilType: string;
  climate: string;
  season: string;
}

const CategorySelection = ({ onComplete }: CategorySelectionProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FarmingData>({
    state: "",
    landSize: "",
    soilType: "",
    climate: "",
    season: ""
  });

  // Indian states with translation keys
  const indianStates = [
    { value: "andhra-pradesh", label: t('andhraPradesh') },
    { value: "arunachal-pradesh", label: t('arunachalPradesh') },
    { value: "assam", label: t('assam') },
    { value: "bihar", label: t('bihar') },
    { value: "chhattisgarh", label: t('chhattisgarh') },
    { value: "goa", label: t('goa') },
    { value: "gujarat", label: t('gujarat') },
    { value: "haryana", label: t('haryana') },
    { value: "himachal-pradesh", label: t('himachalPradesh') },
    { value: "jharkhand", label: t('jharkhand') },
    { value: "karnataka", label: t('karnataka') },
    { value: "kerala", label: t('kerala') },
    { value: "madhya-pradesh", label: t('madhyaPradesh') },
    { value: "maharashtra", label: t('maharashtra') },
    { value: "manipur", label: t('manipur') },
    { value: "meghalaya", label: t('meghalaya') },
    { value: "mizoram", label: t('mizoram') },
    { value: "nagaland", label: t('nagaland') },
    { value: "odisha", label: t('odisha') },
    { value: "punjab", label: t('punjab') },
    { value: "rajasthan", label: t('rajasthan') },
    { value: "sikkim", label: t('sikkim') },
    { value: "tamil-nadu", label: t('tamilNadu') },
    { value: "telangana", label: t('telangana') },
    { value: "tripura", label: t('tripura') },
    { value: "uttar-pradesh", label: t('uttarPradesh') },
    { value: "uttarakhand", label: t('uttarakhand') },
    { value: "west-bengal", label: t('westBengal') }
  ];

  const landSizes = [
    { value: "small", label: t('smallFarm') },
    { value: "medium", label: t('mediumFarm') },
    { value: "large", label: t('largeFarm') }
  ];

  const soilTypes = [
    { value: "clay-loam", label: t('clayLoam') },
    { value: "sandy-loam", label: t('sandyLoam') },
    { value: "silt-loam", label: t('siltLoam') },
    { value: "clay", label: t('clay') },
    { value: "sandy", label: t('sandy') }
  ];

  const climateConditions = [
    { value: "tropical", label: t('tropical') },
    { value: "subtropical", label: t('subtropical') },
    { value: "temperate", label: t('temperate') },
    { value: "arid", label: t('arid') },
    { value: "semi-arid", label: t('semiarid') }
  ];

  const seasons = [
    { value: "kharif", label: t('kharif') },
    { value: "rabi", label: t('rabi') },
    { value: "zaid", label: t('zaid') }
  ];

  const handleSubmit = () => {
    if (Object.values(formData).every(value => value !== "")) {
      onComplete(formData);
    }
  };

  const isComplete = Object.values(formData).every(value => value !== "");

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('categoryTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('categorySubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* State Selection */}
          <Card className="farm-card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary" />
                <CardTitle>{t('selectRegion')}</CardTitle>
              </div>
              <CardDescription>{t('selectRegion')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.state} 
                onValueChange={(value) => setFormData({...formData, state: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectRegion')} />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Land Size */}
          <Card className="farm-card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Ruler className="w-6 h-6 text-primary" />
                <CardTitle>{t('selectLandSize')}</CardTitle>
              </div>
              <CardDescription>{t('selectLandSize')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.landSize} 
                onValueChange={(value) => setFormData({...formData, landSize: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectLandSize')} />
                </SelectTrigger>
                <SelectContent>
                  {landSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Soil Type */}
          <Card className="farm-card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mountain className="w-6 h-6 text-primary" />
                <CardTitle>{t('selectSoilType')}</CardTitle>
              </div>
              <CardDescription>{t('selectSoilType')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.soilType} 
                onValueChange={(value) => setFormData({...formData, soilType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectSoilType')} />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>{soil.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Climate */}
          <Card className="farm-card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Cloud className="w-6 h-6 text-primary" />
                <CardTitle>{t('selectClimate')}</CardTitle>
              </div>
              <CardDescription>{t('selectClimate')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.climate} 
                onValueChange={(value) => setFormData({...formData, climate: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectClimate')} />
                </SelectTrigger>
                <SelectContent>
                  {climateConditions.map((climate) => (
                    <SelectItem key={climate.value} value={climate.value}>{climate.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Season */}
          <Card className="farm-card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary" />
                <CardTitle>{t('selectSeason')}</CardTitle>
              </div>
              <CardDescription>{t('selectSeason')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.season} 
                onValueChange={(value) => setFormData({...formData, season: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectSeason')} />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.value} value={season.value}>{season.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className={`farm-card-hover ${isComplete ? 'ring-2 ring-primary shadow-glow' : ''}`}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sprout className="w-6 h-6 text-primary" />
                <CardTitle>{t('continue')}</CardTitle>
              </div>
              <CardDescription>
                {isComplete ? t('continue') : t('categorySubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSubmit}
                disabled={!isComplete}
                className="w-full"
                size="lg"
              >
                {t('continue')}
              </Button>
              {isComplete && (
                <Badge className="mt-2 w-full justify-center animate-pulse-green" variant="secondary">
                  {t('continue')}!
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CategorySelection;