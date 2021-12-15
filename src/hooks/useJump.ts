import { useState } from "react";
import { BufferGeometry, Material } from "three";

export function useMeshJump(){
    const [jumping, jump] = useState<boolean>(false);
    const [jumpVal, setJumpVal] = useState<number>(0);

    function update(meshRef: React.MutableRefObject<THREE.Mesh>){
        if(jumping == true){
            if(jumpVal >= Math.PI){
                console.log("end flip");
                jump(false);
                setJumpVal(0);
            }else{
                setJumpVal(jumpVal + Math.PI / 30);
                meshRef.current.position.z = Math.sin(jumpVal) * 1;
            }
        }
    }

    return [jump, update];
}