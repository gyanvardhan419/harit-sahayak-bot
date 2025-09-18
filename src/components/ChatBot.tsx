import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Leaf, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface FarmingData {
  state: string;
  landSize: string;
  soilType: string;
  climate: string;
  season: string;
}

interface ChatBotProps {
  farmingData: FarmingData;
  selectedLanguage: string;
  onBack: () => void;
}

const ChatBot = ({ farmingData, selectedLanguage, onBack }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message with farming context
    const welcomeMessage = {
      id: "welcome",
      type: 'bot' as const,
      content: `Hello! I'm your AI farming assistant. Based on your details - ${farmingData.state}, ${farmingData.landSize} farm with ${farmingData.soilType}, ${farmingData.climate} climate for ${farmingData.season} season - I'm ready to help with crop recommendations, farming techniques, pest management, and more. What would you like to know?`,
      timestamp: new Date()
    };
    
    setTimeout(() => {
      setMessages([welcomeMessage]);
    }, 500);
  }, [farmingData]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Farming recommendations based on the provided data
    if (message.includes('crop') || message.includes('what to grow')) {
      const { season, soilType, state } = farmingData;
      if (season === 'kharif') {
        return `For Kharif season in ${state} with ${soilType}, I recommend: Rice (if water available), Cotton, Sugarcane, or Maize. These crops suit the monsoon period and your soil type. Would you like specific variety recommendations?`;
      } else if (season === 'rabi') {
        return `For Rabi season in ${state}, consider: Wheat, Barley, Mustard, Gram (Chickpea), or Peas. These winter crops work well with ${soilType}. Need irrigation and fertilizer guidance?`;
      } else {
        return `For Zaid season in ${state}, try: Fodder crops, Watermelon, Muskmelon, Cucumber, or Fodder Maize. These handle the summer heat well with proper irrigation.`;
      }
    }
    
    if (message.includes('fertilizer') || message.includes('nutrients')) {
      return `Based on your ${farmingData.soilType}, I recommend: NPK fertilizers with balanced ratios, organic compost, and micronutrients like Zinc and Boron. For specific dosage, conduct a soil test first. Would you like organic or chemical fertilizer options?`;
    }
    
    if (message.includes('pest') || message.includes('disease')) {
      return `Common pests in ${farmingData.state} include: Aphids, Bollworm, and Stem Borer. Integrated Pest Management (IPM) works best - use neem oil, install pheromone traps, and maintain field hygiene. Need specific pest identification help?`;
    }
    
    if (message.includes('irrigation') || message.includes('water')) {
      return `For ${farmingData.climate} climate and ${farmingData.landSize} farm, consider: Drip irrigation for water efficiency, sprinkler systems for uniform coverage. Check soil moisture at 6-inch depth before watering. Need water scheduling guidance?`;
    }
    
    if (message.includes('price') || message.includes('market')) {
      return `Current market trends in ${farmingData.state}: Check local mandis, use government apps like eNAM for price discovery. Consider value-added processing and direct marketing. Want information about government schemes?`;
    }
    
    if (message.includes('weather') || message.includes('climate')) {
      return `For ${farmingData.climate} conditions in ${farmingData.state}: Monitor IMD forecasts, plan sowing with rainfall patterns, use weather-based crop advisories. Install weather stations for micro-climate data. Need seasonal planning help?`;
    }
    
    // Default response
    return `I can help you with crop selection, fertilization, pest management, irrigation, market prices, and weather planning for your ${farmingData.landSize} farm in ${farmingData.state}. What specific farming challenge are you facing?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Setup
          </Button>
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">AI Farm Assistant</h1>
          </div>
        </div>

        {/* Farm Details Summary */}
        <Card className="mb-6 shadow-green">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" />
              <span>Your Farm Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{farmingData.state}</Badge>
              <Badge variant="secondary">{farmingData.landSize}</Badge>
              <Badge variant="secondary">{farmingData.soilType}</Badge>
              <Badge variant="secondary">{farmingData.climate}</Badge>
              <Badge variant="secondary">{farmingData.season}</Badge>
              <Badge variant="outline">Language: {selectedLanguage}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col shadow-green">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-3 animate-chat-bubble-in",
                  message.type === 'user' ? "flex-row-reverse space-x-reverse" : ""
                )}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={cn(
                    message.type === 'bot' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-accent text-accent-foreground"
                  )}>
                    {message.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={cn(
                  "max-w-[80%] rounded-lg p-3 transition-smooth",
                  message.type === 'bot' 
                    ? "bg-muted" 
                    : "bg-primary text-primary-foreground"
                )}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3 animate-chat-bubble-in">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Questions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Quick Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "What crops should I grow?",
              "Fertilizer recommendations",
              "Pest control methods",
              "Irrigation planning",
              "Current market prices",
              "Weather forecast impact"
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputMessage(question);
                  setTimeout(handleSendMessage, 100);
                }}
                className="transition-bounce hover:shadow-green"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBot;