import React, { useState, useEffect } from "react";
import { portfolioApi } from "../services/api";
import { useToast } from "../hooks/use-toast";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await portfolioApi.getPortfolio();
      
      if (result.success) {
        setPortfolioData(result.data);
      } else {
        setError(result.error);
        toast({
          variant: "destructive",
          title: "Failed to load portfolio",
          description: result.error
        });
      }
    } catch (err) {
      const errorMessage = "Unable to connect to server. Please try again later.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Portfolio</h2>
          <p className="text-gray-500">Please wait while we load Christa's portfolio...</p>
        </div>
      </div>
    );
  }

  if (error && !portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to Load Portfolio</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={loadPortfolioData}
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} />
      <main>
        <section id="home">
          <Hero data={portfolioData} />
        </section>
        <section id="about">
          <About data={portfolioData} />
        </section>
        <section id="skills">
          <Skills data={portfolioData} />
        </section>
        <section id="experience">
          <Experience data={portfolioData} />
        </section>
        <section id="projects">
          <Projects data={portfolioData} />
        </section>
        <section id="contact">
          <Contact data={portfolioData} />
        </section>
      </main>
      <Footer data={portfolioData} />
    </div>
  );
};

export default Portfolio;