/*
        Dark Sun
    A top-down space shooter with RPG elements
    Destroy enemy space ships, then salvage parts off the wreckage to improve your own. Salvaged parts don't come whole & working; you must
    gather components from multiple parts to fabricate a working one. Inner components can then be upgraded to improve its performance

*/

import React from "react";
import * as Three from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// Canvas is a react-three-fiber version of the html canvas, allowing the library to control its content
// useFrame lets us update content just like RequestAnimationFrame
// useLoader allows us to load file content from data sources

//import shipmodel from "./ship1.gltf";
//import shipTexture from "./steelwall2.jpg";
// Models and images can be loaded this way, but they become part of the javascript; players will have to wait until all of them are
// downloaded before being able to play. With a lot of potential content, this will become a problem. Instead, we can load content
// dynamically... we just have to work around CORS, which my PHP script does.

// To manage center of gravity, we have a COG object, and everything will attach to that, at its root. We will shift this around as needed to
// compensate for sides that are heavier than others

function ShipClass_Basic1() {
    // Returns a ship class object
    let b = {
        model: "http://localhost/DarkSun/getmedia.php?file=ship1.gltf",
        texture: "http://localhost/DarkSun/getmedia.php?file=steelwall2.jpg",
        normalRotation: [Math.PI / 2, 0, 0],
        normalScale: 0.2,
        weight: 50,
    };
    return b;
}

function partclass_engine_ice1() {
    // Returns a part class object. This is a basic internal combustion engine that burns gas to turn a generator
    let b = {
        model: "http://localhost/DarkSun/getmedia.php?file=engine1.gltf",
        texture: "http://localhost/DarkSun/getmedia.php?file=steelwall2.jpg",
        normalRotation: [Math.PI / 2, 0, 0],
        normalScale: 0.2,
        weight: 100,
    };
    return b;
}

function App() {
    const [userMode, setUserMode] = React.useState("combat");

    function Dolly(props) {
        // React hooks can only be used inside the <Canvas /> tag. While we use it in App(), operations there are not inside it.
        // Dolly() is a small React component (called inside <Canvas />), thus bypassing this problem. Currently it only manages the
        // camera. Since we're not displaying anything with this object, this returns null.

        useFrame(({ camera }) => {
            if (userMode === "combat") {
                camera.position.z = 5;
            } else {
                camera.position.z = 2;
            }
        });
        return null;
    }

    return (
        <div id="canvas-container">
            <Canvas style={{ backgroundColor: "#202020", height: "100vh" }} camera={{ position: [0, 0, 5] }}>
                <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={0.5} castShadow />
                <MyTestShip position={[0.5, 0, 0]} />
                <MyTestShip position={[-0.5, 0, 0]} rotation={[0, 0.1, 0]} isAdrift={true} />
                <MyTestPart />
                {/* Also show a starry background... we'll probably need to improve this later, but this should do for now */}
                <StarryBackground />
                <Dolly />
            </Canvas>
            <div style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "lightgrey", padding: 5, fontWeight: "bold" }}>
                <span style={{ marginRight: 15, cursor: "pointer", textDecoration: "underline" }} onClick={() => setUserMode("edit")}>
                    Edit
                </span>
                <span style={{ marginRight: 15, cursor: "pointer", textDecoration: "underline" }} onClick={() => setUserMode("combat")}>
                    Combat
                </span>
            </div>
        </div>
    );
}

function MyTestPart(props) {
    // Let's show an engine!
    const myMesh = React.useRef();
    const { nodes, materials } = useGLTF("http://localhost/DarkSun/getmedia.php?file=engine1.gltf");
    const tex = useLoader(TextureLoader, "http://localhost/DarkSun/getmedia.php?file=steelwall2.jpg");

    return (
        <React.Suspense fallback={null}>
            <mesh
                {...props}
                ref={myMesh}
                geometry={nodes.Cube.geometry}
                material={materials.CubeMaterial}
                scale={0.25}
                rotation={[
                    (props.rotation ? props.rotation[0] : 0) + Math.PI / 2,
                    (props.rotation ? props.rotation[1] : 0) + -Math.PI / 2,
                    (props.rotation ? props.rotation[2] : 0) + 0,
                ]}
            >
                <React.Suspense fallback={null}>
                    <meshStandardMaterial map={tex} />
                </React.Suspense>
            </mesh>
        </React.Suspense>
    );
}

function MyTestShip(props) {
    const myMesh = React.useRef();
    const { nodes, materials } = useGLTF("http://localhost/DarkSun/getmedia.php?file=ship1.gltf");
    const tex = useLoader(TextureLoader, "http://localhost/DarkSun/getmedia.php?file=steelwall2.jpg");

    let wasAdrift = false;
    let adrift = {};
    if (wasAdrift !== props.isAdrift) {
        if (props.isAdrift) {
            // This is now drifting. Set adrift rates
            adrift.x = Math.random() * 0.006 - 0.003;
            adrift.y = Math.random() * 0.006 - 0.003;
            adrift.rx = Math.random() * 0.01 - 0.005;
            adrift.ry = Math.random() * 0.01 - 0.005;
            //adrift.rz = Math.random() * 0.02 - 0.01;
        }
    }

    useFrame(() => {
        if (props.isAdrift) {
            myMesh.current.position.x += adrift.x;
            myMesh.current.position.y += adrift.y;
            myMesh.current.rotation.x += adrift.rx;
            myMesh.current.rotation.y += adrift.ry;
            //myMesh.current.rotation.z += adrift.rz;
        }
    });

    // Rotation; the mesh recognizes rotation as an x,y,z set, even when passed in as an array. However, using rotation through props
    // doesn't convert it to x,y,z values yet

    return (
        <React.Suspense fallback={null}>
            <mesh
                {...props}
                ref={myMesh}
                rotation={[
                    (props.rotation ? props.rotation[0] : 0) + Math.PI / 2,
                    (props.rotation ? props.rotation[1] : 0) + 0,
                    (props.rotation ? props.rotation[2] : 0) + 0,
                ]}
                scale={0.2}
                geometry={nodes.ShipBody.geometry}
                material={materials.ShipBodyMaterial}
            >
                <React.Suspense fallback={<meshPhongMaterial color="red" />}>
                    <meshStandardMaterial map={tex} />
                </React.Suspense>
            </mesh>
        </React.Suspense>
    );
}

function StarryBackground(props) {
    // Shows a starry background around our environment

    const myMesh = React.useRef();

    const tex = useLoader(TextureLoader, "http://localhost/DarkSun/getmedia.php?file=background2.png");
    tex.wrapS = tex.wrapT = Three.MirroredRepeatWrapping;
    tex.repeat.set(3, 3);

    useFrame(() => {
        myMesh.current.rotation.x += 0.0003;
    });

    return (
        <mesh ref={myMesh}>
            <sphereBufferGeometry args={[10, 64, 64]} />
            <React.Suspense fallback={<meshPhongMaterial color={"grey"} side={Three.BackSide} />}>
                <meshStandardMaterial map={tex} side={Three.BackSide} />
            </React.Suspense>
        </mesh>
    );
}

function COGpoint(props) {
    // This is the root of any entity, which affects the position and rotation of any attached object. Attached objects include ships, drifting
    // parts and flying shots.
}

export default App;
