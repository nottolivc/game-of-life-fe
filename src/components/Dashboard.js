import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import "./Dashboard.css";
import { useSpring, a } from "react-spring/three";
//import Presets from "./Presets";
// shadows
softShadows();

const SpinningMesh = ({ position, color, speed, args }) => {
  // ref for mesh
  const mesh = useRef();

  // re-render/update rotation on each frame
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach="material"
        factor={0.6}
      />
    </a.mesh>
  );
};

const Dashboard = (props) => {
  return (
    <>
      <header>
        <br />
        <h1>Welcome to Conways Game of Life, Begin!</h1>
        <h5>Move the mouse or trackpad to rotate the 3d objects</h5>
      </header>
      <div className="canvas">
        {/* canvas cannot take html elements */}
        <Canvas
          colorManagement
          shadowMap
          camera={{ position: [-5, 2, 10], fov: 58 }}
        >
          <ambientLight intensity={0.3} />
          {/* light source */}
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          {/* A light to help illumnate the spinning boxes */}
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <group>
            {/* This mesh is a floor */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -3, 0]}
              receiveShadow
            >
              <planeBufferGeometry attach="geometry" args={[100, 100]} />
              <shadowMaterial attach="material" opacity={0.3} />
            </mesh>
            <SpinningMesh
              position={[0, 1, 0]}
              color="#00ddff"
              args={[3, 2, 1]}
              speed={2}
            />
            <SpinningMesh position={[-2, 1, -5]} color="blue" speed={5} />
            <SpinningMesh position={[5, 1, -2]} color="blue" speed={5} />
          </group>
          {/* control canvas */}
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};

export default Dashboard;
