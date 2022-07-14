/*  partcontent.jsx
    Has several functions to generate game objects
    For the game Dark Sun
*/

import React from "react";
import * as Three from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";


export function ShipClass_Basic1() {
    // Returns a ship class object
    let b = {
        className: "Basic 1",
        coreModel: "ship1.gltf",
        coreMeshName: "ShipBody",
        textureSet: ["steelwall2.jpg"],
        defaultRotation: [Math.PI / 2, 0, 0],
        defaultScale: 0.2,
        weight: 50,
        ports: [
            {id:1, x: 1.5, y:0, z:-1.5},
            {id:2, x: -1.5, y:0, z:-1.5},
            {id:3, x: 1.75, y:0, z:2.5},
            {id:4, x: -1.75, y:0, z:2.5}
        ],
        // x+ is right
        // z+ is down the screen
        // 
        Render: (props) => null,
        attachPart: (port, part) => {

        }
    };
    return b;
}

export function createShip(shipName) {
    // Returns a completed ship, ready for action

    // For now, we only have one ship available
    return {
        ...ShipClass_Basic1(),
        position:[0,0,0],
        adrift:false
    }
}

export function createPart(partName) {
    // Returns a completed part, ready for action
    
    // For now, we only have one part to generate...
    return {
        ...PartClass_Capacitor1(),
        position:[4,0,0],
        adrift:true
    }
}

export function PartClass_Capacitor1() {
    // Returns a part clas object for energy storage
    let b = {
        name: "Basic 1",
        partClass: "capacitor",
        coreModel: "Capacitor2.gltf",
        coreMeshName: "Box",
        textureSet: ["steelwall2.jpg", "sunflare.jpg"],
        defaultRotation: [Math.PI / 2, Math.PI, 0],
        defaultScale: 0.3,
        weight: 120,
        ports: [
            {id:1, x: 0.5, y:0.5, z:0},
            {id:2, x: -0.5, y:0.5, z:0}
        ],
        Render: (props) => {
            return (
                <>
                    <mesh geometry={props.nodes.Cell1.geometry} material={props.materials.Cell1Material} scale={0.7} position={[0.75, -0.25, 0.6]}>
                        <meshStandardMaterial map={props.texSet[1]} />
                    </mesh>
                    <mesh geometry={props.nodes.Cell1.geometry} material={props.materials.Cell1Material} scale={0.7} position={[0, -0.25, 0.6]}>
                        <meshStandardMaterial map={props.texSet[1]} />
                    </mesh>
                    <mesh geometry={props.nodes.Cell1.geometry} material={props.materials.Cell1Material} scale={0.7} position={[-0.75, -0.25, 0.6]}>
                        <meshStandardMaterial map={props.texSet[1]} />
                    </mesh>
                    <mesh geometry={props.nodes.Cell1.geometry} material={props.materials.Cell1Material} scale={0.7} position={[0.75, -0.25, -0.2]}>
                        <meshStandardMaterial map={props.texSet[1]} />
                    </mesh>
                    <mesh geometry={props.nodes.Cell1.geometry} material={props.materials.Cell1Material} scale={0.7} position={[0, -0.25, -0.2]}>
                        <meshStandardMaterial map={props.texSet[1]} />
                    </mesh>
                    <mesh geometry={props.nodes.Cell1.geometry} material={props.materials.Cell1Material} scale={0.7} position={[-0.75, -0.25, -0.2]}>
                        <meshStandardMaterial map={props.texSet[1]} />
                    </mesh>
                </>
            );
        }
    };
    return b;
}

export function RenderPart(props) {
    // Handles rendering a part, with all attached equipment
    // prop fields - data
    //     part - part object to render

    const {nodes, materials} = useGLTF("http://localhost/DarkSun/getmedia.php?file="+ props.part.coreModel);
    const textures = useLoader(TextureLoader, props.part.textureSet.map((f)=>"http://localhost/DarkSun/getmedia.php?file="+f));
    const MoreDetail = props.part.Render;
    console.log(props.position);

    return (
        <React.Suspense fallback={null}>
            <mesh
                {...props}
                geometry={nodes[props.part.coreMeshName].geometry}
                material={materials[props.part.coreMeshName+"Material"]}
                scale={props.part.defaultScale}
                rotation={props.part.defaultRotation}
                position={props.position?props.position:[0,0,0]}
            >
                <meshStandardMaterial map={textures[0]} />
                {/*Now, render the part-specific content */}
                <MoreDetail nodes={nodes} materials={materials} texSet={textures}/>
            </mesh>
        </React.Suspense>
    );
}

export function RenderShip(props) {
    // Handles rendering a ship, with all attached equipment
    // prop fields - data
    //     ship - ship object to render

    const { nodes, materials } = useGLTF("http://localhost/DarkSun/getmedia.php?file=" + props.ship.coreModel);
    // useLoader does not allow us to generate unknown counts of textures. However, it will accept an array or file paths, and then
    // output an array of textures that way. We just have to append some text to each name first.
    const textures = useLoader(
        TextureLoader,
        props.ship.textureSet.map((f) => "http://localhost/DarkSun/getmedia.php?file=" + f)
    );
    

    return (
        <React.Suspense fallback={null}>
            <mesh
                {...props}
                geometry={nodes[props.ship.coreMeshName].geometry}
                material={materials[props.ship.coreMeshName + "Material"]}
                scale={props.ship.defaultScale}
                rotation={props.ship.defaultRotation}
                position={props.position?props.position:[0,0,0]}
            >
                <meshStandardMaterial map={textures[0]} />
                {/* Now, show attachment ports, if that is enabled */}
                {props.showPorts===true?
                    props.ship.ports.map((port,key) =>
                        <mesh position={[port.x, port.y, port.z]} key={key}>
                            <sphereBufferGeometry args={[0.25,64,64]} />
                            <meshPhongMaterial color="blue" />
                        </mesh>
                    )
                :''}
            </mesh>
        </React.Suspense>
    );
}

export function PartClass_engine_ice1() {
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

export function MyCapacitor(props) {
    // See if we can load something with multiple parts...

    const { nodes, materials } = useGLTF("http://localhost/DarkSun/getmedia.php?file=Capacitor2.gltf");
    const tex1 = useLoader(TextureLoader, "http://localhost/DarkSun/getmedia.php?file=steelwall2.jpg");
    const tex2 = useLoader(TextureLoader, "http://localhost/DarkSun/getmedia.php?file=sunflare.jpg");

    return (
        <React.Suspense fallback={null}>
            <mesh
                {...props}
                geometry={nodes.Box.geometry}
                material={materials.BoxMaterial}
                scale={0.3}
                rotation={[Math.PI / 2, Math.PI, 0]}
                position={[-1, 0, 0]}
            >
                <React.Suspense fallback={null}>
                    <meshStandardMaterial map={tex1} />
                    <mesh geometry={nodes.Cell1.geometry} material={materials.Cell1Material} scale={0.7} position={[0.75, -0.25, 0.6]}>
                        <meshStandardMaterial map={tex2} />
                    </mesh>
                    <mesh geometry={nodes.Cell1.geometry} material={materials.Cell1Material} scale={0.7} position={[0, -0.25, 0.6]}>
                        <meshStandardMaterial map={tex2} />
                    </mesh>
                    <mesh geometry={nodes.Cell1.geometry} material={materials.Cell1Material} scale={0.7} position={[-0.75, -0.25, 0.6]}>
                        <meshStandardMaterial map={tex2} />
                    </mesh>
                    <mesh geometry={nodes.Cell1.geometry} material={materials.Cell1Material} scale={0.7} position={[0.75, -0.25, -0.2]}>
                        <meshStandardMaterial map={tex2} />
                    </mesh>
                    <mesh geometry={nodes.Cell1.geometry} material={materials.Cell1Material} scale={0.7} position={[0, -0.25, -0.2]}>
                        <meshStandardMaterial map={tex2} />
                    </mesh>
                    <mesh geometry={nodes.Cell1.geometry} material={materials.Cell1Material} scale={0.7} position={[-0.75, -0.25, -0.2]}>
                        <meshStandardMaterial map={tex2} />
                    </mesh>
                </React.Suspense>
            </mesh>
        </React.Suspense>
    );
    // z+ moves up
    // y+ moves closer
    // rotation Y turns block counter-clockwise
}
