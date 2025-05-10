import React, { useState } from "react";
import { useData } from "../pages/DataContext";
import { Link } from "react-router-dom";
const ProjectCard = ({ project }) => (
  <div className="overflow-hidden group h-full bg-white shadow-lg rounded-lg">
    <div className="relative h-64 overflow-hidden">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">
      {/* {project.description.split(" ").slice(0, 6).join(" ")}{project.description.split(" ").length > 6 && "..."} */}
  {project.description}
      </h3>
      <Link
      to={`/project/${encodeURIComponent(project.title)}`}
      className="px-4 py-2 border rounded-md transition-colors hover:bg-[rgb(25,25,120)] hover:text-white ">
        View Project
      </Link>
    </div>
  </div>
);

const Projects = () => {
  const { projects, staticProjects } = useData();
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-16 bg-gray-100 mt-[10px] p-8">

      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-3xl text-gray-600">
            Take a look at some of our recent construction projects showcasing our commitment to quality
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex text-xl lg:text-xl justify-center gap-4 mb-12">
          {["all", "residential", "commercial"].map((category) => (
            <button key={category} onClick={() => setFilter(category)} className={`px-4 py-2 border rounded-md ${filter === category ? "bg-primary text-gray-600" : "hover:scale-105"}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 text-3xl border rounded-md transition-colors hover:bg-[rgb(25,25,120)] hover:text-white">
            <a href="#contact">Request a Custom Project</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
