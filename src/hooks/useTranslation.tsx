import { createContext, useContext, useState, ReactNode } from 'react';

// Translation data for all supported languages
const translations = {
  en: {
    // Header
    selectLanguage: "Select Language",
    
    // Hero Section
    heroTitle: "AI-Powered Farming Assistant",
    heroSubtitle: "Get personalized farming advice based on your location, soil type, and climate conditions. Powered by AI to help Indian farmers make informed decisions.",
    getStarted: "Get Started",
    
    // Category Selection
    categoryTitle: "Tell us about your farm",
    categorySubtitle: "Provide information about your farming conditions to get personalized recommendations",
    
    // Form Labels
    selectRegion: "Select your region (State)",
    selectLandSize: "Select land area size",
    selectSoilType: "Select soil type",
    selectClimate: "Select climate condition",
    selectSeason: "Select growing season",
    
    // Options
    smallFarm: "Small Farm (< 2 acres)",
    mediumFarm: "Medium Farm (2-10 acres)",
    largeFarm: "Large Farm (> 10 acres)",
    
    clayLoam: "Clay Loam",
    sandyLoam: "Sandy Loam",
    siltLoam: "Silt Loam",
    clay: "Clay",
    sandy: "Sandy",
    
    tropical: "Tropical",
    subtropical: "Subtropical",
    temperate: "Temperate",
    arid: "Arid",
    semiarid: "Semi-arid",
    
    kharif: "Kharif (Monsoon)",
    rabi: "Rabi (Winter)",
    zaid: "Zaid (Summer)",
    
    // Buttons
    continue: "Continue",
    backToForm: "Back to Form",
    
    // Chat
    chatTitle: "Your AI Farming Assistant",
    chatPlaceholder: "Ask me anything about farming...",
    send: "Send",
    
    // States
    andhraPradesh: "Andhra Pradesh",
    arunachalPradesh: "Arunachal Pradesh",
    assam: "Assam",
    bihar: "Bihar",
    chhattisgarh: "Chhattisgarh",
    goa: "Goa",
    gujarat: "Gujarat",
    haryana: "Haryana",
    himachalPradesh: "Himachal Pradesh",
    jharkhand: "Jharkhand",
    karnataka: "Karnataka",
    kerala: "Kerala",
    madhyaPradesh: "Madhya Pradesh",
    maharashtra: "Maharashtra",
    manipur: "Manipur",
    meghalaya: "Meghalaya",
    mizoram: "Mizoram",
    nagaland: "Nagaland",
    odisha: "Odisha",
    punjab: "Punjab",
    rajasthan: "Rajasthan",
    sikkim: "Sikkim",
    tamilNadu: "Tamil Nadu",
    telangana: "Telangana",
    tripura: "Tripura",
    uttarPradesh: "Uttar Pradesh",
    uttarakhand: "Uttarakhand",
    westBengal: "West Bengal"
  },
  hi: {
    // Header
    selectLanguage: "भाषा चुनें",
    
    // Hero Section
    heroTitle: "एआई-संचालित कृषि सहायक",
    heroSubtitle: "अपने स्थान, मिट्टी के प्रकार और जलवायु की स्थिति के आधार पर व्यक्तिगत कृषि सलाह प्राप्त करें। भारतीय किसानों को सूचित निर्णय लेने में मदद करने के लिए एआई द्वारा संचालित।",
    getStarted: "शुरू करें",
    
    // Category Selection
    categoryTitle: "अपने खेत के बारे में बताएं",
    categorySubtitle: "व्यक्तिगत सिफारिशें प्राप्त करने के लिए अपनी कृषि स्थितियों के बारे में जानकारी प्रदान करें",
    
    // Form Labels
    selectRegion: "अपना क्षेत्र (राज्य) चुनें",
    selectLandSize: "भूमि क्षेत्र का आकार चुनें",
    selectSoilType: "मिट्टी का प्रकार चुनें",
    selectClimate: "जलवायु स्थिति चुनें",
    selectSeason: "बुआई का मौसम चुनें",
    
    // Options
    smallFarm: "छोटा खेत (< 2 एकड़)",
    mediumFarm: "मध्यम खेत (2-10 एकड़)",
    largeFarm: "बड़ा खेत (> 10 एकड़)",
    
    clayLoam: "चिकनी दोमट",
    sandyLoam: "रेतीली दोमट",
    siltLoam: "गादयुक्त दोमट",
    clay: "चिकनी मिट्टी",
    sandy: "रेतीली मिट्टी",
    
    tropical: "उष्णकटिबंधीय",
    subtropical: "उपोष्णकटिबंधीय",
    temperate: "समशीतोष्ण",
    arid: "शुष्क",
    semiarid: "अर्ध-शुष्क",
    
    kharif: "खरीफ (मानसून)",
    rabi: "रबी (शीत)",
    zaid: "जायद (ग्रीष्म)",
    
    // Buttons
    continue: "जारी रखें",
    backToForm: "फॉर्म पर वापस जाएं",
    
    // Chat
    chatTitle: "आपका एआई कृषि सहायक",
    chatPlaceholder: "कृषि के बारे में कुछ भी पूछें...",
    send: "भेजें",
    
    // States
    andhraPradesh: "आंध्र प्रदेश",
    arunachalPradesh: "अरुणाचल प्रदेश",
    assam: "असम",
    bihar: "बिहार",
    chhattisgarh: "छत्तीसगढ़",
    goa: "गोवा",
    gujarat: "गुजरात",
    haryana: "हरियाणा",
    himachalPradesh: "हिमाचल प्रदेश",
    jharkhand: "झारखंड",
    karnataka: "कर्नाटक",
    kerala: "केरल",
    madhyaPradesh: "मध्य प्रदेश",
    maharashtra: "महाराष्ट्र",
    manipur: "मणिपुर",
    meghalaya: "मेघालय",
    mizoram: "मिजोरम",
    nagaland: "नागालैंड",
    odisha: "ओडिशा",
    punjab: "पंजाब",
    rajasthan: "राजस्थान",
    sikkim: "सिक्किम",
    tamilNadu: "तमिल नाडु",
    telangana: "तेलंगाना",
    tripura: "त्रिपुरा",
    uttarPradesh: "उत्तर प्रदेश",
    uttarakhand: "उत्तराखंड",
    westBengal: "पश्चिम बंगाल"
  },
  bn: {
    // Header
    selectLanguage: "ভাষা নির্বাচন করুন",
    
    // Hero Section
    heroTitle: "এআই-চালিত কৃষি সহায়ক",
    heroSubtitle: "আপনার অবস্থান, মাটির ধরন এবং জলবায়ু অবস্থার ভিত্তিতে ব্যক্তিগত কৃষি পরামর্শ পান। ভারতীয় কৃষকদের জ্ঞাত সিদ্ধান্ত নিতে সাহায্য করার জন্য এআই দ্বারা চালিত।",
    getStarted: "শুরু করুন",
    
    // Category Selection
    categoryTitle: "আপনার খামার সম্পর্কে বলুন",
    categorySubtitle: "ব্যক্তিগত সুপারিশ পেতে আপনার কৃষি অবস্থা সম্পর্কে তথ্য প্রদান করুন",
    
    // Form Labels
    selectRegion: "আপনার অঞ্চল (রাজ্য) নির্বাচন করুন",
    selectLandSize: "জমির আয়তন নির্বাচন করুন",
    selectSoilType: "মাটির ধরন নির্বাচন করুন",
    selectClimate: "জলবায়ু অবস্থা নির্বাচন করুন",
    selectSeason: "চাষের মৌসুম নির্বাচন করুন",
    
    // Options
    smallFarm: "ছোট খামার (< ২ একর)",
    mediumFarm: "মাঝারি খামার (২-১০ একর)",
    largeFarm: "বড় খামার (> ১০ একর)",
    
    clayLoam: "কাদামাটি দোআঁশ",
    sandyLoam: "বালুকা দোআঁশ",
    siltLoam: "পলি দোআঁশ",
    clay: "কাদামাটি",
    sandy: "বালুকা",
    
    tropical: "ক্রান্তীয়",
    subtropical: "উপক্রান্তীয়",
    temperate: "নাতিশীতোষ্ণ",
    arid: "শুষ্ক",
    semiarid: "আধা-শুষ্ক",
    
    kharif: "খরিফ (বর্ষা)",
    rabi: "রবি (শীত)",
    zaid: "জায়েদ (গ্রীষ্ম)",
    
    // Buttons
    continue: "চালিয়ে যান",
    backToForm: "ফর্মে ফিরে যান",
    
    // Chat
    chatTitle: "আপনার এআই কৃষি সহায়ক",
    chatPlaceholder: "কৃষি সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন...",
    send: "পাঠান",
    
    // States (Bengali names)
    andhraPradesh: "অন্ধ্র প্রদেশ",
    arunachalPradesh: "অরুণাচল প্রদেশ",
    assam: "আসাম",
    bihar: "বিহার",
    chhattisgarh: "ছত্তিশগড়",
    goa: "গোয়া",
    gujarat: "গুজরাট",
    haryana: "হরিয়ানা",
    himachalPradesh: "হিমাচল প্রদেশ",
    jharkhand: "ঝাড়খণ্ড",
    karnataka: "কর্ণাটক",
    kerala: "কেরালা",
    madhyaPradesh: "মধ্য প্রদেশ",
    maharashtra: "মহারাষ্ট্র",
    manipur: "মণিপুর",
    meghalaya: "মেঘালয়",
    mizoram: "মিজোরাম",
    nagaland: "নাগাল্যান্ড",
    odisha: "ওডিশা",
    punjab: "পাঞ্জাব",
    rajasthan: "রাজস্থান",
    sikkim: "সিক্কিম",
    tamilNadu: "তামিলনাড়ু",
    telangana: "তেলেঙ্গানা",
    tripura: "ত্রিপুরা",
    uttarPradesh: "উত্তর প্রদেশ",
    uttarakhand: "উত্তরাখণ্ড",
    westBengal: "পশ্চিমবঙ্গ"
  },
  // Add more languages as needed - for brevity, I'll add a few key ones
  te: {
    selectLanguage: "భాష ఎంచుకోండి",
    heroTitle: "AI-శక్తితో కూడిన వ్యవసాయ సహాయకుడు",
    heroSubtitle: "మీ స్థానం, నేల రకం మరియు వాతావరణ పరిస్థితుల ఆధారంగా వ్యక్తిగత వ్యవసాయ సలహాలు పొందండి.",
    getStarted: "ప్రారంభించండి",
    categoryTitle: "మీ వ్యవసాయం గురించి చెప్పండి",
    selectRegion: "మీ ప్రాంతం (రాష్ట్రం) ఎంచుకోండి",
    continue: "కొనసాగించండి",
    chatTitle: "మీ AI వ్యవసాయ సహాయకుడు"
  },
  ta: {
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    heroTitle: "AI-இயங்கும் விவசாய உதவியாளர்",
    heroSubtitle: "உங்கள் இடம், மண் வகை மற்றும் காலநிலை நிலைமைகளின் அடிப்படையில் தனிப்பட்ட விவசாய ஆலோசனைகளைப் பெறுங்கள்।",
    getStarted: "தொடங்கவும்",
    categoryTitle: "உங்கள் பண்ணையைப் பற்றி சொல்லுங்கள்",
    selectRegion: "உங்கள் பகுதியை (மாநிலம்) தேர்ந்தெடுக்கவும்",
    continue: "தொடரவும்",
    chatTitle: "உங்கள் AI விவசாய உதவியாளர்"
  }
};

interface TranslationContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage as keyof typeof translations];
    if (languageTranslations && languageTranslations[key as keyof typeof languageTranslations]) {
      return languageTranslations[key as keyof typeof languageTranslations];
    }
    // Fallback to English
    const englishTranslations = translations.en;
    return englishTranslations[key as keyof typeof englishTranslations] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};