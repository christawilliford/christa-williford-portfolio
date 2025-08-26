import React from "react";
import { BookOpen, Award, Users, Target } from "lucide-react";

const About = ({ data }) => {
  const stats = [
    { icon: BookOpen, label: "Publications", value: "15+" },
    { icon: Award, label: "Years Experience", value: "20+" },
    { icon: Users, label: "Programs Led", value: "10+" },
    { icon: Target, label: "Research Projects", value: "25+" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Me
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {data.about.summary}
              </p>
            </div>

            {/* Key highlights */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {data.about.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-700 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 leading-relaxed">{highlight}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Education & Certifications
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-teal-200 pl-4">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Stats and visual elements */}
          <div className="space-y-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-lg mb-4">
                      <IconComponent size={24} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Professional focus */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-8 rounded-xl border-l-4 border-teal-600">
              <h4 className="font-semibold text-gray-900 mb-4">Professional Focus</h4>
              <p className="text-gray-700 leading-relaxed">
                My work sits at the intersection of traditional scholarship and digital innovation, 
                helping institutions navigate the complexities of preserving and providing access 
                to our cultural heritage in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;