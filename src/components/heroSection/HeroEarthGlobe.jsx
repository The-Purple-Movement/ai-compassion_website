'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Fallback procedural texture generator for instant photorealistic rendering
function createProceduralEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Deep Ocean Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#0F2620');
  grad.addColorStop(0.5, '#163B32');
  grad.addColorStop(1, '#0B1D19');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Continent Landmasses
  ctx.fillStyle = '#235347';
  for (let i = 0; i < 60; i++) {
    const x = (Math.sin(i * 1.6) * 0.45 + 0.5) * 1024;
    const y = (Math.cos(i * 2.1) * 0.4 + 0.5) * 512;
    const r = (Math.sin(i) * 0.5 + 0.8) * 50;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Golden City Lights
  ctx.fillStyle = '#F4D06F';
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.4 + 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function HeroEarthGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 480;
    let height = container.clientHeight || 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Group containing the rotating Earth
    const globeGroup = new THREE.Group();
    globeGroup.rotation.z = 0.22; // Natural axial tilt
    globeGroup.rotation.x = 0.1;
    scene.add(globeGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.6);
    sunLight.position.set(5.5, 4.0, 4.5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xc96f4a, 1.0);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    const topFill = new THREE.DirectionalLight(0x6ca3b8, 0.8);
    topFill.position.set(0, 5, 2);
    scene.add(topFill);

    // Texture & Earth Mesh
    const radius = 1.85;
    const initialTexture = createProceduralEarthTexture();

    const sphereGeo = new THREE.SphereGeometry(radius, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: initialTexture,
      roughness: 0.55,
      metalness: 0.08,
    });
    const earthMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(earthMesh);

    // Load Photorealistic High-Res Texture Maps
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/earth/earth_color_2k.webp',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        sphereMat.map = tex;
        sphereMat.needsUpdate = true;
      },
      undefined,
      () => {
        console.warn('Hero globe using procedural texture');
      }
    );

    textureLoader.load('/earth/earth_bump_2k.webp', (bumpTex) => {
      sphereMat.bumpMap = bumpTex;
      sphereMat.bumpScale = 0.05;
      sphereMat.needsUpdate = true;
    });

    // Outer Atmosphere Fresnel Glow
    const atmoGeo = new THREE.SphereGeometry(radius * 1.035, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x6ca3b8,
      transparent: true,
      opacity: 0.16,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmoMesh);

    // Outer Warm Halo
    const haloGeo = new THREE.SphereGeometry(radius * 1.12, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc9a96a,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // Mouse Parallax Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 480;
      height = container.clientHeight || 480;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Continuous Revolving Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous rotation of the Earth (revolving world)
      earthMesh.rotation.y += 0.0024;

      // Smooth mouse parallax damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      globeGroup.rotation.y = targetX * 0.6;
      globeGroup.rotation.x = 0.1 + targetY * 0.4;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full pointer-events-none flex items-center justify-center select-none"
    />
  );
}
