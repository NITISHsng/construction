import React from "react";
import { Building, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 text-3xl">

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Building className="size-12 text-yellow-500" />
              <span className="  font-bold text-primary">Singha<span className="text-blue-900">infra</span></span>

            </div>
            <p className="text-gray-400 mb-6">
              Building excellence with integrity, quality, and innovative solutions since 2021.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-700 p-2 rounded-full hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  <Icon size={40} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className=" font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {["Residential Construction", "Commercial Construction", "Renovation & Remodeling", "Design & Build", "Project Management"].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className=" font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Projects", "Testimonials", "Contact"].map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/ /g, "")}`} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className=" font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li> Asian Highway 02, Kamrangaguri, Siliguri, Fulbari, West Bengal 734015</li>
              <li>info@Singhainfra-construction.com</li>
              <li>(+91)9635868211</li>
              <li>Mon-Fri: 9:30am - 9:30pm</li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Singhainfra Construction. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
