
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import logo from '@/assets/logo.png';

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
}

const LanguageSelector = ({ onLanguageSelect }: LanguageSelectorProps) => {
  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-kiosk-lg border-0">
        <CardHeader className="text-center pb-6 pt-8">
         <div className="flex justify-center mb-6">
 
  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center overflow-hidden">
    <img
      src={logo}
      alt="Hospiosk Logo"
      className="w-full h-full object-cover rounded-full p-4"
    />
  </div>
</div>
         <CardTitle className="text-4xl font-bold text-foreground mb-2">
  Hospital Kiosk
</CardTitle>
          <p className="text-lg text-muted-foreground">
  भाषा चुनें / Choose Language
</p>
        </CardHeader>
        <CardContent className="pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {languages.map((language) => (
              <Button
                key={language.code}
                onClick={() => onLanguageSelect(language.code)}
                variant="outline"
                className="h-28 text-xl font-semibold border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl shadow-soft"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl">{language.flag}</span>
                  <span className="text-foreground">{language.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelector;
