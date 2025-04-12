import React from "react";
import { Building, Home, Hammer, Truck, Wrench } from "lucide-react";

const servicesData = [
  {
    icon: <Home className="h-12 w-12 text-primary" />,
    title: "Residential Construction",
    description: "Custom homes, renovations, and remodeling services tailored to your unique vision and lifestyle needs."
  },
  {
    icon: <Building className="h-12 w-12 text-primary" />,
    title: "Commercial Construction",
    description: "From office buildings to retail spaces, we deliver commercial projects on time and within budget."
  },
  {
    icon: <Hammer className="h-12 w-12 text-primary" />,
    title: "Renovation & Remodeling",
    description: "Transform your existing space with our expert renovation and remodeling services."
  },
  {
    icon: <Truck className="h-12 w-12 text-primary" />,
    title: "Design & Build",
    description: "Comprehensive design and build solutions that take your project from concept to completion."
  },
  {
    icon: <Wrench className="h-12 w-12 text-primary" />,
    title: "Project Management",
    description: "Professional project management ensuring your construction project runs smoothly from start to finish."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-gray-100 p-7">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Construction Services</h2>
          <p className="text-lg text-gray-600">
            We offer a comprehensive range of construction services to meet all your building needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl hover:shadow-lg transition-shadow group">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
