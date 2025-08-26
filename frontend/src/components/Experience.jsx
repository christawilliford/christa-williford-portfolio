import React, { useState } from "react";
import { MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const Experience = ({ data }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A career spanning library services, research assessment, and digital preservation, 
            with leadership roles at premier institutions.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-teal-200"></div>

          {data.experience.map((exp, index) => (
            <div key={exp.id} className="relative mb-12">
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-teal-600 rounded-full border-4 border-white shadow-md"></div>

              {/* Content */}
              <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-8'}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {exp.organization}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements toggle */}
                    <button
                      onClick={() => toggleExpanded(exp.id)}
                      className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
                    >
                      {expandedId === exp.id ? 'Hide' : 'Show'} Key Achievements
                      {expandedId === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {/* Achievements */}
                    {expandedId === exp.id && (
                      <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Career highlights summary */}
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Career Highlights
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">20+</div>
              <div className="text-gray-600 font-medium">Years in Library Science</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Research Publications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">10+</div>
              <div className="text-gray-600 font-medium">Major Program Assessments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;