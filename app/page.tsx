import HomePage from "./home/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Social gratitude, be inspired to stay grateful",
};

export default function Home() {
  return (
    <HomePage />
  );
}
