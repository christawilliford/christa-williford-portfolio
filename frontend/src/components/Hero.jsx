import React from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

const Hero = ({ data }) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              <span className="block">{data.personal.name.split(' ')[0]}</span>
              <span className="block text-teal-600">{data.personal.name.split(' ')[1]}</span>
            </h1>
            
            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                {data.personal.title}
              </p>
              <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                {data.personal.tagline}
              </p>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Learn About My Work
            </button>
            
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-teal-600 hover:text-teal-600 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
            >
              View LinkedIn Profile
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Professional links */}
          <div className="flex justify-center gap-6 pt-8">
            <a
              href={data.personal.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors font-medium text-sm"
            >
              ORCID Profile
            </a>
            <span className="text-gray-300">•</span>
            <a
              href={data.personal.academia}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors font-medium text-sm"
            >
              Academia.edu
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-teal-600 transition-colors animate-bounce"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;