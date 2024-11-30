import React from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaEnvelope } from "react-icons/fa"; // Import icons

const Contact = () => {
  return (
    <section id="contact" className="py-10 text-white">
      <div className="container mx-auto px-6 max-w-6xl text-start">
        <h2 className="text-3xl poppins-bold mb-4">CONTACT</h2>
        <p className="text-gray-400 text-start mb-6">
          I am an IT student currently pursuing my degree at Multimedia Nusantara
          University and am open for internship opportunities. I have extensive
          experience and have completed various projects related to my coursework,
          including developing organizational websites, Android applications, and
          much more.
        </p>
        <p className="text-gray-400 text-start mb-6">
          Feel free to reach out if you'd like me to contribute to your projects
          or company! You can contact me through the social media links below or
          email me directly.
        </p>
        <a
          href="mailto:alfonsusjason01@gmail.com"
          className="text-gray-300 hover:text-white text-start flex items-center mb-6" // Add flex and items-center
        >
          <FaEnvelope className="mr-2" />{" "}
          {/* Add envelope icon with margin-right */}
          alfonsusjason01@gmail.com
        </a>
        <div className="flex justify-start space-x-6">
          <a
            href="https://www.instagram.com/jasonchrist_5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com/alfonsus_jason"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.youtube.com/channel/UC6wlvK-3tIXc_iArWtjJ49g"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;