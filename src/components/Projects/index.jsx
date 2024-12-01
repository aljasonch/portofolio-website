import React from "react";
import htmlImg from "../../assets/html.png";
import Mentoring from "../../assets/mentoring.png";
import Minko from "../../assets/minko.png";
import Orion from "../../assets/orion.png";
const Projects = () => {
  return (
    <section id="projects" className=" py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl poppins-bold text-white text-center mb-12">
          PROJECTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-neutral-800 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <a href="https://mentoring2024.vercel.app" target="_blank">
              <img
                src={Mentoring}
                alt="HTML Project"
                className="w-full aspect-video object-cover"
              />
              <div className="px-6 py-4">
                <p className="text-gray-300 poppins-regular text-sm">
                  Click here to visit
                </p>
                <div className="flex justify-between">
                  <h3 className="text-xl poppins-bold text-white mb-2">
                    MENTORING UMN 2024
                  </h3>
                  <div className="text-slate-500 text-2xl">→</div>
                </div>
              </div>
            </a>
          </div>
          <div className="bg-neutral-800 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out ">
            <a href="https://minko.vercel.app" target="_blank">
              <img
                src={Minko}
                alt="HTML Project"
                className="w-full aspect-video object-cover"
              />
              <div className="px-6 py-4">
                <p className="text-gray-300 poppins-regular text-sm">
                  Click here to visit
                </p>
                <div className="flex justify-between">
                  <h3 className="text-xl poppins-bold text-white mb-2">
                    Minko | Furniture Store
                  </h3>
                  <div className="text-slate-500 text-2xl">→</div>
                </div>
              </div>
            </a>
          </div>
          <div className="bg-neutral-800 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <a href="http://orionai-beta.vercel.app/" target="_blank">
              <img
                src={Orion}
                alt="HTML Project"
                className="w-full aspect-video object-cover"
              />
              <div className="px-6 py-4">
                <p className="text-gray-300 poppins-regular text-sm">
                  Click here to visit
                </p>
                <div className="flex justify-between">
                  <h3 className="text-xl poppins-bold text-white mb-2">
                    Orion AI
                  </h3>
                  <div className="text-slate-500 text-2xl">→</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
