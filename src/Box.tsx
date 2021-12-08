import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'


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
  const [rotate90, shouldRotate90] = useState(false);
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [jumping, jump] = useState<boolean>(false);
  const [jumpVal, setJumpVal] = useState<number>(0);

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
        // console.log(state);
        // rotate render loop logic
        if(rotate90 == true){
            if(ref.current.rotation.x >= (Math.PI * 2) / 4){
                shouldRotate90(false);
                ref.current.rotation.x = 0;
            }else{
                ref.current.rotation.x += ((Math.PI * 2) / 4) / 30;
            }
        }

        // move box render loop logic
        if(keyPressed){
            const directionalXAndYCoords = evenKeyCodeDirectionsMap[keyPressed];
            ref.current.position.x += directionalXAndYCoords.x;
            ref.current.position.y += directionalXAndYCoords.y;
        }

        // bounce/jump render loop logic
        if(jumping == true){
            if(jumpVal >= Math.PI){
                console.log("end flip");
                jump(false);
                setJumpVal(0);
            }else{
                setJumpVal(jumpVal + Math.PI / 30);
                ref.current.position.z = Math.sin(jumpVal) * 1;
            }
        }

    });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      onClick={(event) => {
          click(!clicked); 
          shouldRotate90(true);
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