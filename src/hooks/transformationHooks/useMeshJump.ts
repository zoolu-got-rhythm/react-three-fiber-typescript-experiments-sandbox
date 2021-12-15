import { useState } from "react";
import { BufferGeometry, Material } from "three";

export function useMeshJump(jumpHeightZAxis: number = 1, nOfFramesToCompleteAnimation: number = 60){
    // if frame is is being re-rendered at 60FPS, then if arg parsed in is 60, animation will happen over a second
    const [jumping, jump] = useState<boolean>(false);
    const [jumpVal, setJumpVal] = useState<number>(0);

    function update(meshRef: React.MutableRefObject<THREE.Mesh>){
        if(jumping == true){
            if(jumpVal >= Math.PI){
                jump(false);
                setJumpVal(0);
            }else{
                setJumpVal(jumpVal + Math.PI / nOfFramesToCompleteAnimation);
                meshRef.current.position.z = Math.sin(jumpVal) * jumpHeightZAxis;
            }
        }
    }

    return [jump, update];
}