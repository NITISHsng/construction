import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "./DataContext";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MapPin, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
const ProjectDetails = () => {
  const { projects } = useData();
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const project = projects.find((p) => p.title === decodedTitle);
  const mountRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentView, setCurrentView] = useState("front");
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    if (project?.images?.length > 0) {
      setSelectedImage({
        src: project.images[0],
        alt: `${project.title} - Image 1`,
        view: "Main",
      });
    }
  }, [project]);

  useEffect(() => {
    if (!mountRef.current || !project) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x404040));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const loader = new OBJLoader();
    setSpinner(true); // Start loading

    loader.load(
      project.modelPath || "/model.obj",
      (object) => {
        object.scale.set(4, 4, 4);
        object.position.set(0, 0, 0);
        scene.add(object);
        setSpinner(false); // Stop loading after success
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
        setSpinner(false); // Stop loading on error too
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, [project]);

  if (!project) {
    return <div className="p-6 text-center text-red-500">Project not found.</div>;
  }

  const { title: projectTitle, fullDescription, place, ownerName, images, imageDetails,category } = project;

  return (
<>

            <Helmet>
        <meta charSet="utf-8" />
        <title>{projectTitle} || {category} | SinghaInfra | Best Construction Company in Siliguri & Islampur</title>
            <meta name="author" content="SinghaInfra"/>
       <meta
  name="description"
  content={fullDescription}
/>

        <meta
          name="keywords"
          content="SinghaInfra, construction company, infrastructure, Siliguri, Islampur, residential construction, commercial construction, infrastructure projects, building services, best construction company in Siliguri, best construction company in Islampur"
        />
        <meta name="author" content="SinghaInfra" />
              <meta property="og:url" content="https://www.singhainfra.in/project" />
      </Helmet>

    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full lg:h-[30vh] md:h-[50vw] overflow-hidden">
        <img
          src={project.image}
          alt={projectTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        <div className="relative z-10 container mx-auto h-full flex items-end pb-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-3xl">
            {projectTitle}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            {selectedImage && (
              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden shadow-md border">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {images?.map((img, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        setSelectedImage({
                          src: img,
                          alt: `${projectTitle} - Image ${index + 1}`,
                          view: `View ${index + 1}`,
                        })
                      }
                      className={`cursor-pointer rounded-md overflow-hidden aspect-square relative group ${
                        selectedImage.src === img ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center p-1.5 group-hover:bg-black/80">
                        View {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Perspective Views */}
            <div>
              <div className="mb-4">
                <img
                  src={imageDetails[currentView]}
                  alt={`${currentView} view`}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>

              <div className="flex gap-4 justify-center">
                {Object.entries(imageDetails).map(([key, url]) => (
                  <div
                    key={key}
                    onClick={() => setCurrentView(key)}
                    className={`cursor-pointer border rounded-xl overflow-hidden shadow ${
                      currentView === key ? "ring-4 ring-blue-500" : ""
                    }`}
                  >
                    <div className="relative md:w-40 md:h-50 sm:w-25 sm:h-30 w-16 h-20 overflow-hidden">
                      <img src={url} alt={key} className="absolute h-full w-full object-cover" />
                      <div className="absolute left-0 w-full flex justify-center text-white capitalize text-bold hover:bg-black/80 bg-black/50 py-1 bottom-0">
                        {key}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Location & Details</h2>
              <div className="space-y-6 border p-6 rounded-lg shadow-md">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About this Building</h3>
                  <p className="text-gray-600 leading-relaxed">{fullDescription}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-md">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Owner</p>
                      <p className="font-medium">{ownerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-md">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{place}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
          </div>

          {/* Right Side - 3D Model */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">3D Model View</h2>
              <p className="text-gray-500 mb-4">
                Interact with the 3D model by clicking and dragging to rotate, scrolling to zoom.
              </p>
              <hr />
            </div>

            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
              {spinner && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                  <span className="text-sm text-gray-600 animate-pulse">
                    Loading 3D model...
                  </span>
                </div>
              )}
              Coming soon real 3D model
              <div ref={mountRef} className="w-full h-full" />
            </div>
          </div>

          
        </div>
      </div>
    </div>
</>
  );
};

export default ProjectDetails;
