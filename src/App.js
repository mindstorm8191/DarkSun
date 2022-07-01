/*
        Dark Sun
    A top-down space shooter with RPG elements
    Destroy enemy space ships, then salvage parts off the wreckage to improve your own. Salvaged parts don't come whole & working; you must
    gather components from multiple parts to fabricate a working one. Inner components can then be upgraded to improve its performance

*/

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// To manage center of gravity, we have a COG object, and everything will attach to that, at its root. We will shift this around as needed to
// compensate for sides that are heavier than others

function App() {
    return (
        <div id="canvas-container">
            <Canvas style={{ backgroundColor: "#202020", height: 700 }}>
                <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={0.5} castShadow />
                <MyObject />
            </Canvas>
        </div>
    );
}

function MyObject(props) {
    const myMesh = React.useRef();
    const [active, setActive] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);
    const [drift, setDrift] = React.useState([0, 0, 0]);
    let spot = [0, 0, 0];

    useFrame(() => {
        //Reference.current.rotation.x += 0.005;
        //Reference.current.rotation.y += 0.005;
        //console.log("meep!");
        myMesh.current.rotation.z += 0.005;
        if (clicked) {
            //console.log(myMesh.current);
            myMesh.current.position.x += drift[0];
            myMesh.current.position.y += drift[1];
            myMesh.current.position.z += drift[2];
        }
    });

    return (
        <mesh
            ref={myMesh}
            scale={active ? 1.5 : 1}
            position={spot}
            onPointerEnter={() => setActive(true)}
            onPointerLeave={() => setActive(false)}
            onClick={() => {
                console.log(myMesh.current);
                setDrift([Math.random() * 0.02 - 0.01, Math.random() * 0.02 - 0.01, Math.random() * 0.02 - 0.01]);
                setClicked(!clicked);
            }}
        >
            <octahedronGeometry />
            <meshPhongMaterial color="yellow" />
            <mesh position={[1.5, 0, 0]}>
                <boxGeometry />
                <meshPhongMaterial color="red" />
            </mesh>
        </mesh>
    );
    // Something to note: Not only does rotation get affected by this, so does scaling. It may be better to attach all objects to a
    // root object, and manipulate from there, instead of worrying about effects of connected objects.
}

function SpaceFloater(props) {}

export default App;
