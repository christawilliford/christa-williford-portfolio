import React from "react";
import { Search, Database, Users, Cog } from "lucide-react";

const Skills = ({ data }) => {
  const iconMap = {
    "Research & Assessment": Search,
    "Digital Preservation": Database,
    "Leadership & Communication": Users,
    "Technical Expertise": Cog
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive skillset developed through decades of experience in library science, 
            digital preservation, and research assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.skills.slice(0, 2).map((skillCategory, index) => {
            const IconComponent = iconMap[skillCategory.category] || Search;
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-lg">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {skillCategory.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </div>
                      
                      {/* Skill level indicator */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${85 + Math.random() * 15}%`, // Random width between 85-100%
                            animationDelay: `${skillIndex * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional competencies */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Additional Competencies
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Software Preservation",
              "Digital Humanities",
              "Academic Publishing",
              "Fellowship Management",
              "Stakeholder Engagement",
              "Cross-sector Collaboration",
              "Policy Development",
              "Training & Development",
              "Quality Assurance",
              "Strategic Communications"
            ].map((competency, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium hover:bg-teal-200 transition-colors cursor-default"
              >
                {competency}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;