import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, Mountain, Cloud, Calendar, Sprout } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const landSizes = [
  { value: "small", label: "Small (< 2 acres)", description: "Marginal farmers" },
  { value: "medium-small", label: "Medium-Small (2-4 acres)", description: "Small farmers" },
  { value: "semi-medium", label: "Semi-Medium (4-10 acres)", description: "Semi-medium farmers" },
  { value: "medium", label: "Medium (10-25 acres)", description: "Medium farmers" },
  { value: "large", label: "Large (> 25 acres)", description: "Large farmers" }
];

const soilTypes = [
  "Alluvial Soil", "Black Cotton Soil", "Red Soil", "Laterite Soil", 
  "Desert Soil", "Mountain Soil", "Saline Soil", "Peaty Soil"
];

const climateConditions = [
  "Tropical Wet", "Tropical Dry", "Subtropical Humid", "Montane", 
  "Arid", "Semi-Arid", "Coastal", "Continental"
];

const seasons = [
  { value: "kharif", label: "Kharif (Jun-Oct)", description: "Monsoon season crops" },
  { value: "rabi", label: "Rabi (Nov-Apr)", description: "Winter season crops" },
  { value: "zaid", label: "Zaid (Mar-Jun)", description: "Summer season crops" },
  { value: "year-round", label: "Year Round", description: "Perennial crops" }
];

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
  const [formData, setFormData] = useState<FarmingData>({
    state: "",
    landSize: "",
    soilType: "",
    climate: "",
    season: ""
  });

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
            Tell Us About Your Farm
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Provide details about your farming conditions to get personalized AI recommendations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* State Selection */}
          <Card className="farm-card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary" />
                <CardTitle>Region</CardTitle>
              </div>
              <CardDescription>Select your state in India</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.state} 
                onValueChange={(value) => setFormData({...formData, state: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
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
                <CardTitle>Land Area</CardTitle>
              </div>
              <CardDescription>Size of your farming area</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.landSize} 
                onValueChange={(value) => setFormData({...formData, landSize: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select land size" />
                </SelectTrigger>
                <SelectContent>
                  {landSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      <div>
                        <div className="font-medium">{size.label}</div>
                        <div className="text-sm text-muted-foreground">{size.description}</div>
                      </div>
                    </SelectItem>
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
                <CardTitle>Soil Type</CardTitle>
              </div>
              <CardDescription>Type of soil in your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.soilType} 
                onValueChange={(value) => setFormData({...formData, soilType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
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
                <CardTitle>Climate Condition</CardTitle>
              </div>
              <CardDescription>Your area's climate type</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.climate} 
                onValueChange={(value) => setFormData({...formData, climate: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select climate" />
                </SelectTrigger>
                <SelectContent>
                  {climateConditions.map((climate) => (
                    <SelectItem key={climate} value={climate}>{climate}</SelectItem>
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
                <CardTitle>Growing Season</CardTitle>
              </div>
              <CardDescription>When do you plan to grow?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.season} 
                onValueChange={(value) => setFormData({...formData, season: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.value} value={season.value}>
                      <div>
                        <div className="font-medium">{season.label}</div>
                        <div className="text-sm text-muted-foreground">{season.description}</div>
                      </div>
                    </SelectItem>
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
                <CardTitle>Get AI Recommendations</CardTitle>
              </div>
              <CardDescription>
                {isComplete ? "All details provided!" : "Complete all fields above"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSubmit}
                disabled={!isComplete}
                className="w-full"
                size="lg"
              >
                Start Chat Assistant
              </Button>
              {isComplete && (
                <Badge className="mt-2 w-full justify-center animate-pulse-green" variant="secondary">
                  Ready to proceed!
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