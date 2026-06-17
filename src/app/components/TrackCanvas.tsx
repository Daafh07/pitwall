"use client"

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function TrackCanvas({ speed = 0.0005, trackFile = "Monaco", color = "#FF7474", rotationX = -2.3, rotationZ = 0.2, mirrorX = true }: { speed?: number, trackFile?: string, color?: string, rotationX?: number, rotationZ?: number, mirrorX?: boolean }) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        let renderer: THREE.WebGLRenderer;

        const observer = new ResizeObserver(() => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (w === 0 || h === 0 || !canvas.isConnected) return;
            observer.disconnect();
            if (!canvas.isConnected) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
            try {
                renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            } catch {
                return;
            }

            renderer.setSize(w, h);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            camera.position.set(0, 2.1, 1.2);
            camera.lookAt(0, 0, 0);

            const ambientLight = new THREE.AmbientLight(0xffffff, 3);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            scene.add(directionalLight);

            const controls = new OrbitControls(camera, canvas);
            controls.enableDamping = true;
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableRotate = false;

            const loader = new GLTFLoader();
            loader.load(`/tracks/${trackFile}.glb`, (gltf) => {
                scene.add(gltf.scene);
                gltf.scene.scale.set(mirrorX ? -1.2 : 1.2, 1.2, 1.2);
                gltf.scene.rotation.x = rotationX;
                gltf.scene.rotation.z = rotationZ;
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                gltf.scene.position.sub(center);

                gltf.scene.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        mesh.material = new THREE.MeshStandardMaterial({
                            color: new THREE.Color(color),
                            roughness: 0.5,
                            metalness: 0.3,
                        });
                    }
                });


                let isDragging = false;
                let lastX = 0;
                canvas.addEventListener("mousedown", (e) => { isDragging = true; lastX = e.clientX; });
                canvas.addEventListener("mousemove", (e) => {
                    if (!isDragging) return;
                    const delta = e.clientX - lastX;
                    gltf.scene.rotation.z += delta * 0.005;
                    lastX = e.clientX;
                });
                canvas.addEventListener("mouseup", () => { isDragging = false; });

                function animate() {
                    requestAnimationFrame(animate);
                    controls.update();
                    gltf.scene.rotation.z += speed;
                    renderer.render(scene, camera);
                }
                animate();
            });
        });

        observer.observe(canvas);

        return () => {
            observer.disconnect();
            renderer?.dispose();
        };
    }, [speed, trackFile, color, rotationX, rotationZ]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}