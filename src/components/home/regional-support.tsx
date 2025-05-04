"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Globe } from "lucide-react"

export function RegionalSupport() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")

  const languages = [
    { id: "english", name: "English", flag: "🇬🇧" },
    { id: "hindi", name: "हिंदी", flag: "🇮🇳" },
    { id: "tamil", name: "தமிழ்", flag: "🇮🇳" },
    { id: "telugu", name: "తెలుగు", flag: "🇮🇳" },
    { id: "bengali", name: "বাংলা", flag: "🇮🇳" },
    { id: "marathi", name: "मराठी", flag: "🇮🇳" },
  ]

  const content = {
    english: {
      title: "Play in Your Language",
      description:
        "Cricket Panga is available in multiple Indian languages. Play fantasy cricket in the language you're most comfortable with.",
      cta: "Get Started",
    },
    hindi: {
      title: "अपनी भाषा में खेलें",
      description: "क्रिकेट पंगा कई भारतीय भाषाओं में उपलब्ध है। अपनी पसंदीदा भाषा में फैंटेसी क्रिकेट खेलें।",
      cta: "शुरू करें",
    },
    tamil: {
      title: "உங்கள் மொழியில் விளையாடுங்கள்",
      description: "கிரிக்கெட் பங்கா பல இந்திய மொழிகளில் கிடைக்கிறது. நீங்கள் விரும்பும் மொழியில் கற்பனை கிரிக்கெட் விளையாடுங்கள்.",
      cta: "தொடங்குங்கள்",
    },
    telugu: {
      title: "మీ భాషలో ఆడండి",
      description: "క్రికెట్ పంగా అనేక భారతీయ భాషలలో అందుబాటులో ఉంది. మీకు సౌకర్యవంతమైన భాషలో ఫాంటసీ క్రికెట్ ఆడండి.",
      cta: "ప్రారంభించండి",
    },
    bengali: {
      title: "আপনার ভাষায় খেলুন",
      description: "ক্রিকেট পাঙ্গা একাধিক ভারতীয় ভাষায় উপলব্ধ। আপনার পছন্দের ভাষায় ফ্যান্টাসি ক্রিকেট খেলুন।",
      cta: "শুরু করুন",
    },
    marathi: {
      title: "तुमच्या भाषेत खेळा",
      description: "क्रिकेट पंगा अनेक भारतीय भाषांमध्ये उपलब्ध आहे. तुम्हाला सोयीस्कर असलेल्या भाषेत फँटसी क्रिकेट खेळा.",
      cta: "सुरू करा",
    },
  }

  return (
    <section className="py-12 md:py-16 bg-white">
            <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6 md:mb-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-orange-50 text-orange-700 border-orange-200">
            <Globe className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Regional Support
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">
            Cricket Panga Speaks Your Language
          </h2>
          <p className="max-w-[600px] text-sm sm:text-base text-gray-500">
            We support multiple Indian languages to make fantasy cricket accessible to everyone
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <Tabs defaultValue="english" value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <div className="bg-gray-50 p-3 md:p-4 border-b overflow-x-auto">
              <TabsList className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-1 sm:gap-2">
                {languages.map((lang) => (
                  <TabsTrigger
                    key={lang.id}
                    value={lang.id}
                    className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-xs sm:text-sm"
                  >
                    <span className="mr-1">{lang.flag}</span> <span className="truncate">{lang.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <CardContent className="p-4 md:p-6">
              {Object.entries(content).map(([lang, langContent]) => (
                <TabsContent key={lang} value={lang} className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold">{langContent.title}</h3>
                    <p className="text-sm md:text-base text-gray-500">{langContent.description}</p>
                    <Button className="text-white bg-blue-700 hover:bg-blue-800">{langContent.cta}</Button>
                  </div>
                </TabsContent>
              ))}
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </section>
  )
}
