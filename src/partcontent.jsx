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
        objectType: 'ship',
        className: "Basic 1",
        coreModel: "ship1.gltf",
        coreMeshName: "ShipBody",
        textureSet: ["steelwall2.jpg"],
        defaultRotation: [Math.PI / 2, 0, 0],
        defaultScale: 0.2,
        weight: 50,
        ports: [
            {id:0, portx: 1.5, porty:0, portz:-1.5, realx:2.5, realy:0, realz:-3, rot:Math.PI/2},
            {id:1, portx: -1.5, porty:0, portz:-1.5, realx:-2.5, realy:0, realz:-3, rot:-Math.PI/2},
            {id:2, portx: 1.75, porty:0, portz:2.5, realx:2.2, realy:0, realz:1.7, rot:Math.PI*0.3},
            {id:3, portx: -1.75, porty:0, portz:2.5, realx:-2.2, realy:0, realz:1.7, rot:-Math.PI*0.3}
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
    
    let classFunct = null;
    switch(partName) {
        case "Basic Capacitor 1": classFunct = PartClass_Capacitor1; break;
        case "Basic Engine 1": classFunct = PartClass_Engine1; break;
        default:
            console.log("Error: did not find part type of "+ partName);
            return null;
    }
    return {
        ...classFunct(),
        position:[0,0,0],
        adrift:true
    }
}

export function attachPart(baseObject, portId, attachObject) {
    // Allows a part to be attached to a ship - or another part

    // Do some input validation. Check that the part we are attaching isn't a ship
    if(attachObject.objectType!=='part') {
        console.log('Error in attachPart: object being attached is not a part (it needs to be). Object:', attachObject);
        return;
    }
    // Check that the base object has the port available
    if(baseObject.ports.length<=portId) {
        console.log('Error in attachPart: object attaching to doesnt have '+ (portId+1) +' ports!');
        return;
    }
    let selectedPort = baseObject.ports.find(e=>e.id===portId);
    if(!selectedPort) {
        console.log('Error in attachPart: could not find part with id='+ portId);
        return;
    }
    // Check that the port selected is empty
    if(typeof(selectedPort.attached)==='object') {
        console.log('Error in attachPart: selected port is already occupied. Maybe you want to detach part first?');
        return;
    }

    selectedPort.attached = attachObject;
    attachObject.adrift = false;
}

export function PartClass_Engine1() {
    // Returns a part class for energy production
    console.log('Make the engine!');
    let b = {
        objectType: 'part',
        name: "Basic Engine 1",
        partClass: "engine",
        coreModel: "engine1.gltf",
        coreMeshName: "Base",
        textureSet: ['steelwall2.jpg', 'MetalPipes.png'],
        defaultRotation: [0,0,0], // [0,0,Math.PI/2],
        rootPortPosition: [0,0,0],
        defaultScale: 0.25,
        weight: 100,
        ports: [],
        Render: (props) => {
            return (
                <mesh geometry={props.nodes.Spinner.geometry} material={props.materials.SpinnerGeometry} >
                    <meshStandardMaterial map={props.texSet[1]} />
                </mesh>
            );
        } 
    };
    return b;
}

export function PartClass_Capacitor1() {
    // Returns a part clas object for energy storage
    let b = {
        objectType: 'part',
        name: "Basic Capacitor 1",
        partClass: "capacitor",
        coreModel: "Capacitor2.gltf",
        coreMeshName: "Box",
        textureSet: ["steelwall2.jpg", "sunflare.jpg"],
        defaultRotation: [Math.PI / 2, Math.PI, 0],
        rootPortPosition: [0,0,-1.5],
        defaultScale: 0.25,
        weight: 120,
        ports: [
            {id:0, x:1.5, y:0, z:1.5},
            {id:1, x: -1.5, y:0, z:1.5}
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
    //     showPorts - set to true to show input & output ports

    const {nodes, materials} = useGLTF("http://localhost/DarkSun/getmedia.php?file="+ props.part.coreModel);
    const textures = useLoader(TextureLoader, props.part.textureSet.map((f)=>"http://localhost/DarkSun/getmedia.php?file="+f));
    const MoreDetail = props.part.Render;
    //console.log(props.position);
//    console.log(props.part);

    if(props.isAttached===false) console.log(props.part);
    
    return (
        <React.Suspense fallback={null}>
            <mesh
                {...props}
                geometry={nodes[props.part.coreMeshName].geometry}
                material={materials[props.part.coreMeshName+"Material"]}
                scale={props.part.isLoose?props.part.defaultScale:1}
                position={
                    props.isAttached?[props.position[0]-props.part.rootPortPosition[0], props.position[1]-props.part.rootPortPosition[1], props.position[2]-props.part.rootPortPosition[2]]:[0,0,0]
                }
                rotation={props.isLoose?props.part.defaultRotation:[0,props.attachRot,0]}
            >
                <meshStandardMaterial map={textures[0]} />
                {/*Now, render the part-specific content */}
                <MoreDetail nodes={nodes} materials={materials} texSet={textures}/>
                {/* Now, show attachment ports, if that is enabled */}
                {props.showPorts===true?
                    <>
                        <mesh position={props.part.rootPortPosition}>
                            <sphereBufferGeometry args={[0.25,64,64]} />
                            <meshPhongMaterial color="red" />
                        </mesh>
                        {props.part.ports.map((port,key)=>
                            <mesh position={[port.x, port.y, port.z]} key={key}>
                                <sphereBufferGeometry args={[0.25,64,64]} />
                                <meshPhongMaterial color="blue" />
                            </mesh>
                        )}
                    </>
                :''}
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
                {/* Show attached parts */}
                {props.ship.ports.map((port, key) => {
                    if(typeof(port.attached)!=='object') return null;
                    return (
                        <RenderPart
                            key={key}
                            part={port.attached}
                            position={[port.realx, port.realy, port.realz]}
                            showPorts={props.showPorts}
                            isLoose={false}
                            attachRot={port.rot}
                            isAttached={true}
                        />
                    );
                })}
                {/* Now, show attachment ports, if that is enabled (and the ports are empty) */}
                {props.showPorts===true?
                    props.ship.ports.map((port,key) => {
                        if(typeof(port.attached)==='object') return null;
                        return (
                            <mesh position={[port.portx, port.porty, port.portz]} key={key}>
                                <sphereBufferGeometry args={[0.25,64,64]} />
                                <meshPhongMaterial color="blue" />
                            </mesh>
                        );
                    })
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

