import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const SinghaInfraLogo = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: "#0077be" });
    const building = new THREE.Mesh(geometry, material);
    building.position.y = 1;
    building.scale.set(0, 0, 0);
    scene.add(building);

    const loader = new THREE.FontLoader();
    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new THREE.TextGeometry("SinghaInfra", {
        font: font,
        size: 0.5,
        height: 0.1,
      });
      const textMaterial = new THREE.MeshStandardMaterial({ color: "orange" });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-3, -1, 0);
      scene.add(textMesh);

      gsap.fromTo(textMesh.position, { y: -5 }, { y: -1, duration: 1.5, ease: "power3.out", delay: 2 });
    });

    gsap.to(building.scale, { x: 1, y: 1, z: 1, duration: 2, ease: "bounce.out" });

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default SinghaInfraLogo;
