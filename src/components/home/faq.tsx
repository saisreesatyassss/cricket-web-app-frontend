"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState("");

  const faqItems = [
    {
      id: "item-1",
      question: "What is Cricket Panga?",
      answer:
        "Cricket Panga is a fantasy sports platform where users can create virtual cricket teams based on real-life players. Participants earn points based on the actual performance of these players in live matches, competing against others to win exciting prizes.​",
      tags: ["cricket panga", "fantasy", "sports", "teams", "points"],
    },
    {
      id: "item-2",
      question: "How does the ₹49 deposit offer work?",
      answer:
        "When you deposit ₹49 into your Cricket Panga wallet, you receive a total value of ₹99. This includes your ₹49 deposit plus an additional ₹50 bonus. To activate this bonus, please share your payment receipt with us via WhatsApp at 8237358619. Once verified, the bonus will be credited to your account.​",
      tags: ["deposit", "offer", "bonus", "₹49", "wallet"],
    },
    {
      id: "item-3",
      question: "Are there state-specific editions of Cricket Panga?",
      answer:
        "Yes, Cricket Panga offers customized editions for various states, such as Goa Edition, Delhi Edition, Mumbai Edition, and more. These editions provide localized contests, leaderboards, and promotions tailored to the preferences of users in each region.​",
      tags: ["state", "editions", "goa", "delhi", "mumbai"],
    },
    {
      id: "item-4",
      question: "Is Cricket Panga legal in all Indian states?",
      answer:
        "Fantasy sports platforms like Cricket Panga are considered games of skill and are legal in most Indian states. However, certain states have restrictions:​ Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, Sikkim, Tamil Nadu. In these states, participation in paid fantasy sports contests may be prohibited due to local laws. ​",
      tags: ["legal", "india", "states", "restrictions"],
    },
    {
      id: "item-5",
      question: "Why are there restrictions in some states?",
      answer:
        "Gambling laws in India are state-specific. While the Supreme Court has recognized fantasy sports as games of skill, some states have laws that restrict or prohibit online gaming for money, including fantasy sports.​",
      tags: ["laws", "restrictions", "states", "fantasy sports"],
    },
    {
      id: "item-6",
      question:
        "Can users from restricted states participate in free contests?",
      answer:
        "Users from restricted states are advised to refrain from participating in any contests on Cricket Panga, including free ones, to ensure compliance with local laws.​",
      tags: ["restricted", "states", "free", "contests"],
    },
    {
      id: "item-7",
      question: "Does Cricket Panga provide analytics of previous matches?",
      answer:
        "Yes, Cricket Panga offers comprehensive analytics of past matches, including player performance statistics, team strategies, and match outcomes. This information helps users make informed decisions when creating their fantasy teams.​",
      tags: ["analytics", "past", "matches", "statistics"],
    },
    {
      id: "item-8",
      question: "How can I access the state-specific editions?",
      answer:
        "Upon registration, Cricket Panga automatically detects your location and directs you to the appropriate state-specific edition. Alternatively, you can manually select your preferred edition from the app or website settings.​",
      tags: ["state", "edition", "location", "settings"],
    },
    {
      id: "item-9",
      question: "Is there an age requirement to play on Cricket Panga?",
      answer:
        "Yes, users must be at least 18 years old to participate in contests on Cricket Panga, in accordance with legal regulations.​",
      tags: ["age", "requirement", "18"],
    },
    {
      id: "item-10",
      question: "How can I contact Cricket Panga support?",
      answer:
        "For any queries or assistance, you can reach out to our customer support team via the 'Contact Us' section on our website or app. We're here to help!​",
      tags: ["contact", "support", "help"],
    },
    {
      id: "item-11",
      question: "How many people can sign up for Cricket Panga?",
      answer: "Up to 1 lakh users can sign up for Cricket Panga.",
      tags: ["signup", "limit", "users"],
    },
    {
      id: "item-12",
      question: "How do I sign up for Cricket Panga?",
      answer: `To sign up, follow these simple steps:

1. Scan the QR Code to initiate your journey.
2. Make a Payment of ₹49 to your Cricket Panga wallet.
3. Send a WhatsApp Message by texting “Hi” to 8237358619.
4. Share Your Receipt of the payment on WhatsApp to receive your welcome bonus.`,
      tags: ["signup", "how to join", "whatsapp", "qr code"],
    },

    {
      id: "item-13",
      question: "How many people can play per edition?",
      answer: "Each edition is limited to the first 50,000 players only.",
      tags: ["limit", "edition", "players"],
    },
    {
      id: "item-14",
      question: "How much does it cost to participate in a match?",
      answer: "Each contestant needs to contribute ₹10 per match.",
      tags: ["cost", "match", "entry fee"],
    },
    {
      id: "item-15",
      question:
        "If there aren’t 50,000 players, will the winner still get ₹1 lakh?",
      answer:
        "No. If the total number of participants is less than 50,000, the prize amount will be adjusted proportionally based on the actual number of players.",
      tags: ["prize", "adjustment", "participants"],
    },
    {
      id: "item-16",
      question: "How do I avail the ₹49 for ₹99 wallet recharge offer?",
      answer: `The first 10,000 users who sign up can get ₹99 credited to their wallet for just ₹49.
Note: This offer is not available after the 10,000th sign-up.`,
      tags: ["wallet", "offer", "₹99", "₹49"],
    },
  ];

  const filteredFAQs = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.includes(searchQuery.toLowerCase()))
      )
    : faqItems;

  return (
    <section id="faq" className="py-12 md:py-20 bg-gray-50">
      <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-sm sm:text-base text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about Cricket Panga
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-6 md:mt-8 mb-8 md:mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={activeItem}
            onValueChange={setActiveItem}
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border rounded-lg mb-3 md:mb-4 overflow-hidden"
                >
                  <AccordionTrigger className="text-left px-4 md:px-6 hover:bg-gray-100 transition-colors text-sm md:text-base py-3 md:py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-6 pb-3 md:pb-4">
                    <div className="pt-2 text-sm md:text-base text-gray-600">
                      {item.answer}
                    </div>
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-3 md:mt-4">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-[10px] md:text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full cursor-pointer"
                          onClick={() => setSearchQuery(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center py-6 md:py-8">
                <p className="text-gray-500 mb-4 text-sm md:text-base">
                  No FAQs found matching your search.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
