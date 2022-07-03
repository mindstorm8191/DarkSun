/*
        Dark Sun
    A top-down space shooter with RPG elements
    Destroy enemy space ships, then salvage parts off the wreckage to improve your own. Salvaged parts don't come whole & working; you must
    gather components from multiple parts to fabricate a working one. Inner components can then be upgraded to improve its performance

*/

import React from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// Canvas is a react-three-fiber version of the html canvas, allowing the library to control its content
// useFrame lets us update content just like RequestAnimationFrame
// useLoader allows us to load file content from data sources

import shipmodel from "./ship1.gltf";
import shipTexture from "./steelwall2.jpg";

// To manage center of gravity, we have a COG object, and everything will attach to that, at its root. We will shift this around as needed to
// compensate for sides that are heavier than others

function App() {
    return (
        <div id="canvas-container">
            <Canvas style={{ backgroundColor: "#202020", height: 700 }}>
                <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={0.5} castShadow />
                <MyTestShip />
            </Canvas>
        </div>
    );
}

function MyTestShip(props) {
    const myMesh = React.useRef();
    const { nodes, materials } = useGLTF(shipmodel);
    const tex = useLoader(TextureLoader, shipTexture);
    console.log(materials);
    return (
        <React.Suspense fallback={null}>
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.2} geometry={nodes.ShipBody.geometry} material={materials.ShipBodyMaterial}>
                <meshStandardMaterial map={tex} />
            </mesh>
        </React.Suspense>
    );

    //const { nodes, materials } = useGLTF("../media/ship3.glb");
    /*
    return (
            <primitive object={null} />
        </React.Suspense>
    );*/
}

function COGpoint(props) {
    // This is the root of any entity, which affects the position and rotation of any attached object. Attached objects include ships, drifting
    // parts and flying shots.
}

export default App;
