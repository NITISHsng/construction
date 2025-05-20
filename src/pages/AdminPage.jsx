import React from "react";
// import { motion } from 'framer-motion';/
import {
  CheckCircle,
  Award,
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
// import { div } from '@/components/ui/separator';
import { Helmet } from "react-helmet-async";
const About = () => {
  return (
    <div className="admin-dashboard">
          <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Dashboard | SinghaInfra</title>
        <meta
          name="description"
          content="SinghaInfra Admin Dashboard - Manage all construction projects, view client data, track progress, and oversee company operations."
        />
        <meta
          name="keywords"
          content="SinghaInfra, admin dashboard, construction management, client data, project tracking, construction company, project reports"
        />
        <meta name="author" content="SinghaInfra" />
        <meta property="og:title" content="SinghaInfra Admin Dashboard" />
        <meta
          property="og:description"
          content="The admin panel for SinghaInfra allows easy management of construction projects, client interaction, and progress tracking."
        />
        <meta
          property="og:image"
          content="https://www.singhainfra.in"
        />
        <meta property="og:url" content="https://www.singhainfra.in/admin" />
      </Helmet>
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-64 md:h-80 bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            About Singhainfra
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Introduction */}
        <div initial="hidden" animate="visible" className="mb-16">
          <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
            Singhainfra Construction is committed to delivering modern, safe, and
            sustainable buildings across India. With a foundation built on
            integrity and expertise, we transform visions into reality through
            innovative construction solutions.
          </p>
          <div className="max-w-md mx-auto" />
        </div>

        {/* Vision & Mission */}
        <div
          initial="hidden"
          
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
            <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-800">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become India's most trusted and innovative construction partner
              by delivering sustainable and beautiful buildings that enhance
              lives and communities across the nation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
            <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
              <Building size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-800">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We focus on quality, safety, and client collaboration to ensure
              successful outcomes for every project. Through transparent
              processes and innovative methods, we strive to exceed expectations
              and set new industry standards.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          initial="hidden"
          
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-blue-100">
            <h4 className="text-5xl font-bold text-blue-600 mb-3">30+</h4>
            <p className="text-gray-700 text-lg font-medium">
              Projects Completed
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-blue-100">
            <h4 className="text-5xl font-bold text-blue-600 mb-3">98%</h4>
            <p className="text-gray-700 text-lg font-medium">
              Client Satisfaction
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-blue-100">
            <h4 className="text-5xl font-bold text-blue-600 mb-3">3+</h4>
            <p className="flex justify-center text-gray-700 text-lg font-medium">
              Years Experience
            </p>
          </div>
        </div>

        {/* Services */}
        <div
          initial="hidden"
          
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 bg-white p-10 rounded-2xl shadow-md border border-blue-100"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Our Services
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Residential & Commercial Construction",
              "Architectural Design & Planning",
              "Interior and Exterior Finishing",
              "Renovation & Remodeling Services",
              "Eco-Friendly Sustainable Building",
              "Project Supervision & Management",
            ].map((service, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <p className="text-gray-700">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Overview */}
        <div
          initial="hidden"
          
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 bg-gradient-to-r from-blue-700 to-blue-600 p-10 rounded-2xl shadow-md"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="p-5 bg-white/10 rounded-full">
                <Users size={80} className="text-white" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-3xl font-bold mb-4 text-white text-center md:text-left">
                Meet Our Team
              </h3>
              <p className="text-blue-50 leading-relaxed">
                From certified engineers to skilled designers and expert workers
                — our team brings experience, dedication, and creativity to
                every site. We value honesty, teamwork, and the pursuit of
                excellence. With diverse backgrounds and expertise, our team
                works in harmony to deliver exceptional results for every
                client.
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div
          initial="hidden"
          
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Our Location
          </h3>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-blue-100 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" size={24} />
                <p className="text-gray-700">
                  123 Builder's Avenue, Kolkata, West Bengal, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" size={24} />
                <p className="text-gray-700">+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" size={24} />
                <p className="text-gray-700">info@Singhainfra.in</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                title="SinghaInfra Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.9470752951024!2d88.36389541496168!3d22.57264698517685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7340011678abcd1234!2sYour+Office+Location!5e0!3m2!1sen!2sin!4v1613541024321"
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Why Trust Us */}
        <div
          initial="hidden"
          
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Why Trust Singhainfra?
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
                <Award size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-blue-800">
                Proven Track Record
              </h4>
              <p className="text-gray-600">
                With 30+ completed projects and high ratings, we consistently
                deliver what we promise on time and within budget.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
                <CheckCircle size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-blue-800">
                Transparent Process
              </h4>
              <p className="text-gray-600">
                From consultation to delivery, we maintain open communication
                and clear pricing with no hidden costs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-blue-800">
                Client-Focused
              </h4>
              <p className="text-gray-600">
                Your satisfaction is our mission — we build long-term trust, not
                just structures. We value every relationship.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {/* Contact Information Section */}
        <div
          initial="hidden"
          
          viewport={{ once: true, amount: 0.3 }}
          className="bg-blue-900 text-white p-8 md:p-10 rounded-2xl shadow-md mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
            Contact Information
          </h3>

          <div className="space-y-4 text-left">
            <li className="flex items-start gap-3">
              <Phone className="text-yellow-400 mt-1" size={20} />
              <span>
                <strong>Phone</strong>: (+91) 9635868211
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-yellow-400 mt-1" size={20} />
              <span>
                <strong>Whatsapp</strong>: 9635868211
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="text-yellow-400 mt-1" size={20} />
              <span>
                <strong>Email</strong>:  <a href="mailto:support@singhainfra.in?subject=Hello%20SinghInfra&body=Hello%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.">support@singhainfra.in</a>

              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="text-yellow-400 mt-1" size={20} />
              <span>
                <strong>Office</strong>: Rd no 2, Sevoke More, Siliguri, West Bengal -
                7340011
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="text-yellow-400 mt-1" size={20} />
              <span>
                <strong>Working Hours</strong> <br />
                Monday - Friday: 8 AM – 10 PM <br />
                Saturday: 9 AM – 2 PM
              </span>
            </li>
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold text-yellow-400">
              Emergency Service :{" "}
              <span className="text-yellow-300">(+91) 7679526642</span>
            </p>
            <p className="text-sm text-white mt-1">
              Need urgent construction support? Our emergency team is available
              24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
