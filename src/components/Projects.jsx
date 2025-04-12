import React, { useState } from "react";

const projects = [
  { category: "residential", title: "Modern Family Home", description: "A custom-built 4-bedroom family home with sustainable features", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "commercial", title: "Office Tower Complex", description: "A 15-story commercial office building in the downtown district", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "residential", title: "Luxury Apartment Renovation", description: "Complete renovation of a high-end urban apartment", image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "commercial", title: "Retail Shopping Center", description: "A modern shopping plaza with 12 retail units and parking facilities", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },

  // New projects added
  // { category: "residential", title: "Beachfront Villa", description: "A luxurious villa with stunning ocean views and private access to the beach", image: "https://images.unsplash.com/photo-1505691723518-36a7bff29401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "commercial", title: "Tech Startup Hub", description: "A modern co-working space designed for tech startups and entrepreneurs", image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "residential", title: "Suburban Townhouse", description: "A stylish and affordable townhouse located in a growing suburban community", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  // { category: "commercial", title: "Convention Center", description: "A state-of-the-art convention center for corporate and entertainment events", image: "https://images.unsplash.com/photo-1504705759701-7f2adf4f1d0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  // { category: "residential", title: "Penthouse Loft", description: "An exclusive penthouse suite with panoramic city views and modern amenities", image: "https://images.unsplash.com/photo-1591474200742-79bcd363879f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "commercial", title: "Boutique Hotel", description: "A charming boutique hotel blending modern elegance with classic design", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "residential", title: "Eco-Friendly Cabin", description: "A sustainable cabin built with eco-conscious materials in a forest retreat", image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "commercial", title: "Luxury Car Showroom", description: "A high-end car dealership with a sleek and futuristic interior design", image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { category: "residential", title: "Countryside Farmhouse", description: "A cozy farmhouse surrounded by scenic landscapes and open fields", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  // { category: "commercial", title: "Fitness Center", description: "A modern gym with top-tier fitness equipment and wellness programs", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
];


const ProjectCard = ({ project }) => (
  <div className="overflow-hidden group h-full bg-white shadow-lg rounded-lg">
    <div className="relative h-64 overflow-hidden">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <button className="px-4 py-2 border rounded-md transition-colors hover:bg-[rgb(25,25,120)] hover:text-white ">
        View Project
      </button>
    </div>
  </div>
);

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-16 bg-gray-100 mt-[10px] p-8">

      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Featured Projects</h2>
          <p className="text-lg text-gray-600">
            Take a look at some of our recent construction projects showcasing our commitment to quality
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {["all", "residential", "commercial"].map((category) => (
            <button key={category} onClick={() => setFilter(category)} className={`px-4 py-2 border rounded-md ${filter === category ? "bg-primary text-gray-600" : "hover:scale-105"}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 border rounded-md transition-colors hover:bg-[rgb(25,25,120)] hover:text-white">
            <a href="#contact">Request a Custom Project</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
