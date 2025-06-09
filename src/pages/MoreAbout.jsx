import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Clock } from "lucide-react";
import Counter from "../components/Counter";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle,
  Award,
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          About | SinghaInfra | Best Construction Company in Fulbari, Siliguri
        </title>
        <meta
          name="description"
          content="SinghaInfra is a trusted construction company based in Fulbari, Siliguri, West Bengal, specializing in high-quality infrastructure projects. Building Excellence, Crafting Futures with SinghaInfra."
        />
        <meta
          name="keywords"
          content="SinghaInfra, construction company,siliguri construction company, islampur construction company infrastructure, Fulbari, Siliguri, residential construction, commercial construction, infrastructure projects, building services, best construction company in Fulbari, best construction company in Siliguri"
        />
        <meta name="author" content="SinghaInfra" />
        <meta property="og:url" content="https://www.singhainfra.in/about" />
        <meta
          property="og:description"
          content="SinghaInfra is a trusted construction company based in Fulbari, Siliguri, West Bengal, islampur, specializing in high-quality infrastructure projects. Building Excellence, Crafting Futures with SinghaInfra."
        />
        <meta
          property="og:image"
          content="https://www.singhainfra.in/logo.jpeg"
        />
        <meta property="og:singhainfra.in" content="SinghaInfra" />
      </Helmet>

      <div className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen pb-16">
        {/* Hero Section */}
        <div className="relative h-[10vh] md:h-[20vh] bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center animate-fade-up">
            About Singhainfra
          </h1>
        </div>
        <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }
      `}</style>

        <div className="container mx-auto px-6 py-16 max-w-7xl">
          {/* Introduction */}
          <div initial="hidden" animate="visible" className="mb-16">
            <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
              Singhainfra Construction is committed to delivering modern, safe,
              and sustainable buildings across India. With a foundation built on
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
                To become India's most trusted and innovative construction
                partner by delivering sustainable and beautiful buildings that
                enhance lives and communities across the nation.
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
                processes and innovative methods, we strive to exceed
                expectations and set new industry standards.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            initial="hidden"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mb-20"
          >
            <div
              ref={ref}
              className="justify-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-blue-100"
            >
              <h4 className="flex items-center justify-center text-5xl font-bold text-blue-600 mb-3">
                <span>
                  {inView ? <Counter target={30} duration={1000} /> : 0}
                </span>
                <span className="mb-2">+</span>
              </h4>
              <p className="text-gray-700 text-lg font-medium">
                Projects Completed
              </p>
            </div>

            <div
              ref={ref}
              className="justify-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-blue-100"
            >
              <h4 className="flex items-center justify-center text-5xl font-bold text-blue-600 mb-3">
                <span>
                  {inView ? <Counter target={98} duration={1000} /> : 0}
                </span>
                <span className="mb-2">%</span>
              </h4>
              <p className="text-gray-700 text-lg font-medium">
                Client Satisfaction
              </p>
            </div>

            <div
              ref={ref}
              className="justify-center bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center border border-blue-100"
            >
              <h4 className="flex items-center justify-center text-5xl font-bold text-blue-600 mb-3">
                <span>
                  {inView ? <Counter target={3} duration={1000} /> : 0}
                </span>
                <span className="mb-2">+</span>
              </h4>
              <p className="text-gray-700 text-lg font-medium">
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
                  From certified engineers to skilled designers and expert
                  workers — our team brings experience, dedication, and
                  creativity to every site. We value honesty, teamwork, and the
                  pursuit of excellence. With diverse backgrounds and expertise,
                  our team works in harmony to deliver exceptional results for
                  every client.
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              Our Location
            </h3>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-blue-100">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side - Contact Info */}
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-700 mb-1">
                      Contact Information
                    </h4>
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span>{" "}
                      <a href="tel:+917679526642" className="text-blue-600 ">
                        (+91) 7679526642
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">WhatsApp:</span>{" "}
                      <a
                        href="https://wa.me/919635868211?text=Hello%20WowInfra%0A"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 "
                      >
                        9635868211
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span>{" "}
                       <a href="mailto:support@singhainfra.in?subject=Hello%20SinghInfra&body=Hello%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.">support@singhainfra.in</a>

                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-700 mb-1">
                      Office
                    </h4>
                    <p className="text-gray-700">
                      Asian Highway 02, Kamrangaguri, Siliguri, Fulbari, West Bengal 734015
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-700 mb-1">
                      Working Hours
                    </h4>
                    <p className="text-gray-700">
                      9:30 AM - 9:30 PM
                    </p>
                   
                  </div>
                </div>

                {/* Right Side - Map */}
                <div className="flex-1 rounded-xl overflow-hidden shadow-md">
                  <iframe
                    title="Singhainfra Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14730.59015723143!2d88.40716019790722!3d26.66299839989032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44310c8f9ce71%3A0xfd0ed7d932b9374c!2sSinghainfra%20%26%20co.!5e0!3m2!1sen!2sin!4v1747305756111!5m2!1sen!2sin"

                    width="100%"
                    height="300"
                    allowFullScreen=""
                    loading="lazy"
                    className="border-0 w-full h-full"
                  ></iframe>
         
                </div>
              </div>
            </div>
          </div>

          {/* Why Trust Us */}
          <div
            initial="hidden"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              Why Trust Singhainfra?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
                <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">
                  Proven Track Record
                </h3>
                <p className="text-gray-600">
                  With 30+ completed projects and high ratings, we consistently
                  deliver what we promise on time and within budget.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
                <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">
                  Transparent Process
                </h3>
                <p className="text-gray-600">
                  From consultation to delivery, we maintain open communication
                  and clear pricing with no hidden costs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-blue-100">
                <div className="mb-4 inline-block p-3 bg-blue-100 rounded-xl text-blue-700">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">
                  Client-Focused
                </h3>
                <p className="text-gray-600">
                  Your satisfaction is our mission — we build long-term trust,
                  not just structures. We value every relationship.
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
                  <strong>Phone</strong>:
                         <a
          href="tel:+917679526642"
          aria-label="Call +91 76795 26642"
        >
         (+91)76795 26642
        </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-yellow-500 text-2xl" />

                <span>
                  <strong>Whatsapp</strong>: <a
                        href="https://wa.me/919635868211?text=Hello%20WowInfra%0A"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        9635868211
                      </a>
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
                  <strong>Office</strong>: Asian Highway 02, Kamrangaguri, Siliguri, Fulbari, West Bengal 734015
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-yellow-400 mt-1" size={20} />
                <span>
                  <strong>Working Hours</strong> <br />
                 9:30 AM – 9:30 PM
                 
                </span>
              </li>
            </div>

            <div className="mt-6">
              <p className="text-lg font-semibold text-yellow-400">
                Emergency Service :{" "}
                <span className="text-yellow-300">(+91) 7679526642</span>
              </p>
              <p className="text-sm text-white mt-1">
                Need urgent construction support? Our emergency team is
                available 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
