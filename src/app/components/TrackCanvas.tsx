"use client"

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function TrackCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {   
        if (!canvasRef.current) return;

        //scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });

        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        camera.position.set(0, 2.3, 1);
        camera.lookAt(0, 0, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 3);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);


        const loader = new GLTFLoader();
        loader.load("/tracks/Monaco.glb", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(-1.5, 1.5, 1.5);
            gltf.scene.rotation.x = -2.3;
            gltf.scene.rotation.z = 0.2;
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            gltf.scene.position.sub(center);

            function animate() {
                requestAnimationFrame(animate);
                gltf.scene.rotation.z += 0.0007;
                renderer.render(scene, camera);
            }
            animate();
        });

        return () => renderer.dispose();
    }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}