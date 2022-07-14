/*  MyTestThings.jsx
    Holds a bunch of objects that were created during learning React-Three/Fiber
    For the game Dark Sun
*/

function MyTestObject(props) {
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

function MyTestPart(props) {
    // Let's show an engine!
    const myTextures = ["http://localhost/DarkSun/getmedia.php?file=steelwall2.jpg", "http://localhost/DarkSun/getmedia.php?file=sunflare.jpg"];
    const myMesh = React.useRef();
    const { nodes, materials } = useGLTF("http://localhost/DarkSun/getmedia.php?file=engine1.gltf");
    const tex = useLoader(TextureLoader, myTextures); // we can load any number of textures - but it must be received as an array of files
    console.log(tex);

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
                    <meshStandardMaterial map={tex[1]} />
                </React.Suspense>
            </mesh>
        </React.Suspense>
    );
}

function MouseBall(props) {
    // Provides a ball that follows the mouse
    // no prop fields are needed for normal operation
    // To use: <MouseBall />
    // This wasn't as effective as expected; moving the camera changes the 3D viewport (or, maybe it doesn't), so the MouseBall position
    // becomes off target. It is possible to translate, but that seems sloppy. I'm trying a different solution...
    const { viewport } = useThree();

    const myMouseBall = React.useRef(); // This gives us something we can reference within hook functions
    useFrame(({ mouse }) => {
        // Now, manage the 3d mouse-point
        let x = (mouse.x * viewport.width) / 2;
        let y = (mouse.y * viewport.height) / 2;
        myMouseBall.current.position.x = (x * 2.0) / 5.0;
        myMouseBall.current.position.y = (y * 2.0) / 5.0;
    });

    return (
        <React.Suspense>
            <mesh ref={myMouseBall}>
                <sphereBufferGeometry args={[0.25, 32, 32]} />
                <meshPhongMaterial color={"orange"} />
            </mesh>
        </React.Suspense>
    );
}
