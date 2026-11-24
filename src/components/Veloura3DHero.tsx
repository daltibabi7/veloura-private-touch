"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface VelouraCanvasProps {
  interactive?: boolean;
  className?: string;
}

export default function Veloura3DHero({ interactive = true, className = "" }: VelouraCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xfff0dd, 0.4);
    scene.add(ambientLight);

    // Warm Gold Directional Lights
    const mainLight = new THREE.DirectionalLight(0xc6a66b, 2.8);
    mainLight.position.set(5, 6, 6);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xdfca9a, 2.0);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const topSoftLight = new THREE.PointLight(0xffeedd, 3, 20);
    topSoftLight.position.set(0, 5, 3);
    scene.add(topSoftLight);

    // Flowing organic sculptural torus knot (mimicking golden liquid fabric / human-inspired curve)
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 160, 32, 2, 3);

    // Metallic Champagne-gold material
    const material = new THREE.MeshStandardMaterial({
      color: 0xc6a66b,
      metalness: 0.88,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const sculpture = new THREE.Mesh(geometry, material);
    scene.add(sculpture);

    // Floating Gold Atmospheric Particles
    const particlesCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const particleScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleScales[i] = Math.random();
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdfca9a,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / container.clientWidth;
      const y = (event.clientY - rect.top) / container.clientHeight;
      mouseX = (x - 0.5) * 1.5;
      mouseY = (y - 0.5) * 1.5;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      sculpture.rotation.x = 0.25 * Math.sin(elapsedTime * 0.3) + targetY * 0.5;
      sculpture.rotation.y = elapsedTime * 0.22 + targetX * 0.8;
      sculpture.rotation.z = 0.1 * Math.cos(elapsedTime * 0.2);

      // Subtle breathing scale
      const scale = 1 + Math.sin(elapsedTime * 0.8) * 0.03;
      sculpture.scale.set(scale, scale, scale);

      // Particle subtle drift
      particleSystem.rotation.y = elapsedTime * 0.04;
      particleSystem.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-auto ${className}`}
      aria-label="Interactive 3D luxury gold sculpture"
    />
  );
}
