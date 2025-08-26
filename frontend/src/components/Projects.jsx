import React, { useState } from "react";
import { ExternalLink, Calendar, Tag } from "lucide-react";

const Projects = ({ data }) => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filterOptions = [
    { value: "all", label: "All Projects" },
    { value: "assessment", label: "Program Assessment" },
    { value: "research", label: "Research Publications" },
    { value: "preservation", label: "Digital Preservation" }
  ];

  const getProjectType = (project) => {
    if (project.title.toLowerCase().includes("assessment")) return "assessment";
    if (project.title.toLowerCase().includes("preservation") || 
        project.title.toLowerCase().includes("software")) return "preservation";
    return "research";
  };

  const filteredProjects = filter === "all" 
    ? data.projects 
    : data.projects.filter(project => getProjectType(project) === filter);

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes("ongoing")) return "bg-yellow-100 text-yellow-800";
    if (status.toLowerCase().includes("2022") || status.toLowerCase().includes("2025")) return "bg-green-100 text-green-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Research Projects & Publications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selected research projects, assessments, and publications that have shaped 
            the field of library science and digital preservation.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  filter === option.value
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.split(' - ')[0]}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies/tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium"
                    >
                      <Tag size={12} />
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      +{project.technologies.length - 2} more
                    </span>
                  )}
                </div>

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Publication
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project detail modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.link && (
                    <div className="pt-4 border-t border-gray-200">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        View Full Publication
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;