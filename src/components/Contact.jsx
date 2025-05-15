import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      await addDoc(collection(db, "messages"), {
        userId: user ? user.uid : null,
        name,
        email,
        phone,
        subject,
        message,
        status: true,
        timestamp: new Date(),
      });

      toast.success("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-blue-900 text-white py-16 px-6">

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
          <p className="text-3xl">
            Contact us today for a free consultation and quote for your next
            construction project.
          </p>
        </div>

        <div className="grid grid-cols-1 text-xl lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                className="p-1 pl-3 bg-blue-800 border border-blue-700 rounded-md w-full"
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="p-1 pl-3 bg-blue-800 border border-blue-700 rounded-md w-full"
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="p-1 pl-3 bg-blue-800 border border-blue-700 rounded-md w-full"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="p-1 pl-3 bg-blue-800 border border-blue-700 rounded-md w-full"
                type="text"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <textarea
              className="p-2 bg-blue-800 border border-blue-700 rounded-md w-full h-32"
              name="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              className="w-full bg-yellow-500 text-blue-900 font-bold py-3 rounded-md hover:bg-yellow-400"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-2">
            <h1 className="font-bold">Contact Information</h1>
            <div className="space-y-5 pt-2 sm:text-xl">
              <div className="flex items-center gap-4">
                <Phone className="text-yellow-500" size={35} />
                <div>
                  <span className="font-medium">Phone :</span>
                  <a href="tel:+919635868211"> (+91) 9635868211 </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaWhatsapp className="text-yellow-500" size={35} />
                <div>
                  <span className="font-medium">WhatsApp :</span>
                  <a
                    href="https://wa.me/919635868211?text=Hello!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-white no-underline"
                  >
                    9635868211
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-yellow-500" size={35} />
                <div>
                  <span className="font-medium">Email :</span>
                  <a href="mailto:info@Singhainfra-construction.com">
                    info@Singhainfra-construction.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-yellow-500" size={35} />
                <div className="flex">
                  <span className="font-medium">Office :Rd no 2, Sevoke More, Siliguri, West Bengal-7340011</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="text-yellow-500" size={35} />
                <div className="flex flex-col">
                  <span className="font-medium">Working Hours : 9:30 AM - 9:30 PM</span>   
                </div>
              </div>
            </div>
            <div className="mt-3">
              <span className="font-semibold">Emergency Service :</span>{" "}
              <span className="font-bold text-yellow-500">
                <a href="tel:+917679526642" className="ml-2">
                  (+91) 7679526642
                </a>
              </span>
              <p>
                Need urgent construction support? Our emergency team is
                available 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
