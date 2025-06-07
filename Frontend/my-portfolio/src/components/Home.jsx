import React from "react";
import ThemeToggle from "./ThemeToggle";
import StarBackground from "./StarBackground";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* theme toggle */}
        <ThemeToggle />
        {/* background Effects*/}

        <StarBackground />

        {/* Navbar */}
        <Navbar />
        {/* herosection */}
        <HeroSection/>
        {/* aboutSection */}
        <AboutSection/>
        {/* Main Content */}
        {/* Footer */}
      </div>
    </>
  );
};

export default Home;
