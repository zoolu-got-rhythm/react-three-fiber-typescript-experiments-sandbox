import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMeshJump } from './hooks/transformationHooks/useMeshJump';
import { useMeshRotate90 } from './hooks/transformationHooks/useMeshRotate90';


const left = {x: -0.2, y: 0};
const right = {x: 0.2, y: 0};
const up = {x: 0, y: 0.2};
const down = {x: 0, y: -0.2};
const evenKeyCodeDirectionsMap: any = {
	keyw: up,
	keys: down,
	keya: left,
	keyd: right,
	arrowleft: left,
	arrowright: right,
	arrowdown: down,
	arrowup: up
}; 

export function Box(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  const [rotate90, rotateMesh90UpdateFn] = useMeshRotate90("z");
  const [jump, jumpMeshUpdateFn] = useMeshJump(4); 

  const {camera} = useThree();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
        console.log("keydown");
        console.log(e.code);
        const directionStrToLowerCase: string = e.code.toLowerCase();
        if(directionStrToLowerCase in evenKeyCodeDirectionsMap)
            setKeyPressed(directionStrToLowerCase);
    });
    
    window.addEventListener("keyup", (e) => {
        setKeyPressed(null);
    });
  }, []);

    useFrame((state, delta) => {      
        // camera.rotation.z += 0.002;
        // camera.rotation.y += 0.002;

        // rotate render loop logic
        // @ts-ignore
        rotateMesh90UpdateFn(ref);

        // move box render loop logic
        if(keyPressed){
            const directionalXAndYCoords = evenKeyCodeDirectionsMap[keyPressed];
            ref.current.position.x += directionalXAndYCoords.x;
            ref.current.position.y += directionalXAndYCoords.y;
        }

        // bounce/jump render loop logic
        // @ts-ignore
        jumpMeshUpdateFn(ref);
    });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      onClick={(event) => {
          click(!clicked); 
          // @ts-ignore
          rotate90(true);
          // @ts-ignore
          jump(true);
        }}
      onPointerOver={(event) => {
          hover(true);
          document.body.classList.add("hand-pointer");
        }}
      onPointerOut={(event) => {
          hover(false);
          document.body.classList.remove("hand-pointer");
          }}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}