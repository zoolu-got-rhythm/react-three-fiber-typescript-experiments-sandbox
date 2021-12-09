import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { setUncaughtExceptionCaptureCallback } from 'process';
import { Vector3 } from 'three';




interface Props extends MeshProps{
    directions: string[];
    moveDistance: number;
}

export function MovingBox(props: Props) {
    const directionsToVectorMap = {
        left: new THREE.Vector3(-props.moveDistance, 0, 0),
        right: new THREE.Vector3(props.moveDistance, 0, 0),
        up: new THREE.Vector3(0, props.moveDistance, 0),
        down: new THREE.Vector3(0, -props.moveDistance, 0)
    }

    const ref = useRef<THREE.Mesh>(null!)
    const [rotate90, shouldRotate90] = useState(false);
    const [moving, setIsMoving] = useState<boolean>(false);
    const [prevVectorPos, setPrevVectorPos] = useState<THREE.Vector3>(new THREE.Vector3(0,0,0));
    // @ts-ignore
    const [destVectorPos, setDestVectorPos] = useState<THREE.Vector3>(new THREE.Vector3(...props.position));
    const [tick, setTick] = useState<number>(0);
    
    useEffect(() => {
    }, []);

    useFrame((state, delta) => {
        // console.log(state);
        // rotate render loop logic
        if(rotate90 == true){
            if(ref.current.rotation.x >= (Math.PI * 2) / 4){
                shouldRotate90(false);
                ref.current.rotation.x = 0;
            }else{
                const currentRotation = ((Math.PI * 2) / 4) / 20; // in radians
                ref.current.rotation.x += currentRotation;
                // if(props.directions.length > 0)
                //     switch(props.directions[0].toLowerCase()){
                //         case "down" : 
                //             ref.current.rotation.x += currentRotation;
                //             break;
                //         case "up" : 
                //             ref.current.rotation.x += -currentRotation;
                //             break;
                //     }
                
            }
        }

        // move cube logic
        if(!moving && props.directions.length > 0){
            setPrevVectorPos(prevVectorPos.copy(destVectorPos));
            
            let temp = new THREE.Vector3(0,0,0);
            temp.copy(prevVectorPos);
            // @ts-ignore
            temp.add(directionsToVectorMap[props.directions.shift()?.toLowerCase()]);
            
            setDestVectorPos(destVectorPos.copy(temp)); // slow to update? or isn't being logged properly?
            setIsMoving(true);
            shouldRotate90(true);
        }else{
            if(tick < 60){
                ref.current.position.copy(prevVectorPos.lerp(destVectorPos, tick / 60));
                setTick(tick + 1);
            }else{
                setIsMoving(false);
                setTick(0);
            }   
        }
    });

    return (
    <mesh
        {...props}
        ref={ref}
        scale={1}
    >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
    </mesh>
    )
}