import React from "react";
import { Building, Home, Hammer, Truck, Wrench ,ShieldCheck} from "lucide-react";
import { CheckCircle, Award, Users } from 'lucide-react';
import gsap from "gsap";
import { useEffect } from "react";
const servicesData = [
  {
    icon: <Home className="h-12 w-12 text-primary" />,
    title: "Residential Construction",
    description: "We specialize in building high-quality custom homes, complete home renovations, and personalized remodeling services that reflect your lifestyle, vision, and long-term needs."
  },
  {
    icon: <Building className="h-12 w-12 text-primary" />,
    title: "Commercial Construction",
    description: "Our team delivers office buildings, retail spaces, and commercial complexes with a strong focus on quality, compliance, and timely delivery while staying within budget constraints."
  },
  {
    icon: <Hammer className="h-12 w-12 text-primary" />,
    title: "Renovation & Remodeling",
    description: "Whether it’s a kitchen upgrade or a full-scale home transformation, we revitalize spaces with expert craftsmanship and attention to every design detail."
  },
  {
    icon: <Truck className="h-12 w-12 text-primary" />,
    title: "Design & Build",
    description: "Our integrated design-build approach streamlines your project from concept to completion, ensuring clarity, cost control, and consistent communication throughout."
  },
  {
    icon: <Wrench className="h-12 w-12 text-primary" />,
    title: "Project Management",
    description: "We offer end-to-end project management services, coordinating all stakeholders and schedules to ensure that your construction goals are achieved seamlessly."
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "Safety & Compliance",
    description: "We prioritize safety and adhere to strict industry regulations, ensuring that every project meets legal standards and provides a secure environment for all workers and occupants."
  }
];





import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Services = () => {

useEffect(() => {
  const serviceItems = gsap.utils.toArray("#serviceOption .serviceItem");
  const trustItems = gsap.utils.toArray("#whySinghaInfra .singhaInfraItem");

  serviceItems.forEach((item, i) => {
    gsap.fromTo(
      item,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 95%",
          end: "top 80%",
          toggleActions: "play none none none",
          // markers: true, // for debugging only
        },
      }
    );
  });

  trustItems.forEach((item, i) => {
    gsap.fromTo(
      item,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 95%",
          end: "top 80%",
          toggleActions: "play none none none",
          // markers: true,
        },
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


  return (
    <section id="services" className="py-16 bg-gray-100 p-7">


      <div className="container mx-auto">
        {/* Services Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="md:text-5xl text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600 md:text-2xl md:whitespace-nowrap">
 We offer a comprehensive range of construction services to meet all your building needs</p>
        </div>

        <div id="serviceOption" className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div  key={index} className="serviceItem opacity-0 p-6 bg-white rounded-2xl hover:shadow-lg transition-shadow group">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Why Trust Section */}
        <div className="mt-24 mb-0">
          <h1 className="text-2xl md:text-4xl mt-5 font-bold mb-8 text-gray-800 text-center">
            Why Trust Singhainfra?
          </h1>

          <div id="whySinghaInfra" className=" grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="singhaInfraItem  bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl">
                <Award size={24} />
              </div>
              <h2 className="text-xl font-bold mb-3 ">Proven Track Record</h2>
              <p className="text-gray-600">
                With 30+ completed projects and high ratings, we consistently deliver what we promise on time and within budget.
              </p>
            </div>

            <div className="singhaInfraItem bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl">
                <CheckCircle size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3">Transparent Process</h4>
              <p className="text-gray-600">
                From consultation to delivery, we maintain open communication and clear pricing with no hidden costs.
              </p>
            </div>

            <div className="singhaInfraItem bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
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
