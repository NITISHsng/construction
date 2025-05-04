import { CheckCircle} from "lucide-react";
import React from "react";
import Counter from "../components/Counter";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1, 
    });
  return (
    <section id="about" className="py-16 bg-gray-100 mt-[10px]">
      <div className="container mx-auto px-6">
        <div className="grid text-3xl grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
     

          {/* Text Section */}
          <div className="animate-slide-up">
            <div className="inline-block text-4xl font-semibold py-2 bg-secondary/20 text-secondary-foreground rounded-full mb-6">
              About  <span className=" lg:text-4xl md:text-4xl sm:text-4xl font-bold text-primary">Singha<span className="text-blue-600">infra</span></span>

            </div>

            <p className="text-3xl text-gray-700 mb-8">
            <span className=" font-bold text-primary">Singha<span className="text-blue-600">infra  </span></span>
             Construction is a leading construction company
              specializing in residential and commercial projects              Building Excellence Since <span className="text-blue-600">2021</span>. With over two
              decades of experience, we've built a reputation for quality
              craftsmanship, reliability, and customer satisfaction.
            </p>

            {/* List of Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Quality Craftsmanship",
                "On-Time Delivery",
                "Transparent Pricing",
                "Licensed Professionals",
                "Sustainable Building",
                "Long-term Warranty",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Contact Button */}
            <button className="bg-[rgb(25,25,140)] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[rgb(25,25,160)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-2">
              <a href="#contact">Get In Touch</a>
            </button>
          </div>
               {/* Image Section */}
               <div
            className="relative rounded-xl overflow-hidden h-[500px] transition-all duration-500 opacity-100"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div ref={ref}  className="flex flex-col gap-2 sm:flex-row sm:gap-6">


                <div className="bg-primary/90 p-4 rounded-lg backdrop-blur-sm">
  <div className="flex text-white justify-center items-center text-4xl font-bold text-primary-foreground">
    <span>{inView ? <Counter target={3} duration={1000} /> : 0}</span>
    <span className="ml-1 ">+</span>
  </div>
  <div className="text-primary-foreground/80 text-white text-sm">
  Years Experience
  </div>
</div>


                
                <div className="bg-yellow-300 p-4 rounded-lg backdrop-blur-sm text-center">
  <div className="flex justify-center items-center text-4xl font-bold text-primary-foreground">
    <span>{inView ? <Counter target={30} duration={1000} /> : 0}</span>
    <span className="ml-1">+</span>
  </div>
  <div className="text-primary-foreground/80 text-sm">
    Projects Completed
  </div>
</div>

                <div className="bg-white/90 p-4 rounded-lg backdrop-blur-sm">
  <div className="flex justify-center items-center text-4xl font-bold text-primary-foreground">
    <span>{inView ? <Counter target={98} duration={1000} /> : 0}</span>
    <span className="ml-1">%</span>
  </div>
  <div className="text-primary-foreground/80 text-sm">
  Client Satisfaction
  </div>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-12">
      <a
            href="/about"
            className="px-6 py-2 text-3xl border rounded-md transition-colors hover:bg-[rgb(25,25,120)] hover:text-white"
          >
            More About 
          </a>

            </div>
    </section>
  );
};

export default About;