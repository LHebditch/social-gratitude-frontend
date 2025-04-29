import HomePage from "./home/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Social gratitude, be inspired to stay grateful",
  keywords: [
    'gratitude',
    'social',
    'gamification',
    'gamified',
    'thankfulness'
  ],
  authors: [{
    name: 'Lyndon Hebditch',
    url: 'https://www.linkedin.com/in/lyndon-hebditch-4799b59b/'
  }]
};

export default function Home() {
  return (
    <HomePage />
  );
}
