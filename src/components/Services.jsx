import React from "react";
import { Building, Home, Hammer, Truck, Wrench } from "lucide-react";
import { CheckCircle, Award, Users } from 'lucide-react';

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
        {/* Services Section */}
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

        {/* Why Trust Section */}
        <div className="mt-24 mb-16">
          <h3 className="text-3xl mt-5 font-bold mb-8 text-gray-800 text-center">
            Why Trust WowInfra?
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl">
                <Award size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 ">Proven Track Record</h4>
              <p className="text-gray-600">
                With 30+ completed projects and high ratings, we consistently deliver what we promise on time and within budget.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl">
                <CheckCircle size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3">Transparent Process</h4>
              <p className="text-gray-600">
                From consultation to delivery, we maintain open communication and clear pricing with no hidden costs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3">Client-Focused</h4>
              <p className="text-gray-600">
                Your satisfaction is our mission — we build long-term trust, not just structures. We value every relationship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
