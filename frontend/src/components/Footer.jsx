import React from "react";
import { Heart, ExternalLink } from "lucide-react";

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Professional",
      links: [
        { name: "LinkedIn", url: data.personal.linkedin },
        { name: "ORCID", url: data.personal.orcid },
        { name: "Academia.edu", url: data.personal.academia }
      ]
    },
    {
      title: "Organization",
      links: [
        { name: "CLIR", url: "https://www.clir.org/" },
        { name: "Publications", url: "https://www.clir.org/pubs/" },
        { name: "Pocket Burgundies", url: "https://www.clir.org/pocket-burgundies/" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "About", url: "#about", internal: true },
        { name: "Experience", url: "#experience", internal: true },
        { name: "Projects", url: "#projects", internal: true },
        { name: "Contact", url: "#contact", internal: true }
      ]
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/About section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Christa Williford</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Senior Director of Research and Assessment at CLIR, bridging 
              scholarship with digital stewardship and cultural preservation.
            </p>
            <div className="text-sm text-gray-400">
              Based in {data.personal.location}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.internal ? (
                      <button
                        onClick={() => scrollToSection(link.url.replace('#', ''))}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Christa Williford. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>for advancing library science and digital preservation</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;