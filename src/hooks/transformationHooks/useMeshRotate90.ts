import { useState } from "react";

const validAxis = ["x", "y", "z"];

// rotate mesh 90 degrees 
// should change axisToRotateOn from string to a unit vector specifing which direction to rotate by 90 in
export function useMeshRotate90(axisToRotateOn: string, nOfFramesToCompleteAnimation: number = 60){
    if(!(validAxis.includes(axisToRotateOn)))
        throw new Error("axis must be x, y or z");

    const [rotate90, shouldRotate90] = useState(false);

    function update(meshRef: React.MutableRefObject<THREE.Mesh>){   
        if(rotate90 == true){
            // @ts-ignore
            if(meshRef.current.rotation[axisToRotateOn] >= (Math.PI * 2) / 4){
                shouldRotate90(false);
                // @ts-ignore
                meshRef.current.rotation[axisToRotateOn] = 0;
            }else{
                // @ts-ignore
                meshRef.current.rotation[axisToRotateOn] += ((Math.PI * 2) / 4) / nOfFramesToCompleteAnimation;
            }
        }
    }

    return [shouldRotate90, update];
}