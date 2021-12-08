import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, LineBasicMaterialProps, useFrame } from '@react-three/fiber'
import { BufferGeometry, LineBasicMaterial } from 'three';

interface Props extends LineBasicMaterialProps{
    from: number[],
    to: number[],
}

// note: issue with lineWidth working on LineBasicMaterial - 
// may be a chrome browser compatability problem
export function Line({from, to, ...props}: Props) {
    const ref: any = useRef(null!);
    useLayoutEffect(() => {
      ref.current.geometry.setFromPoints([from, to].map((point) => new THREE.Vector3(...point)));
        console.log(ref);
    }, [from, to]);
    return (
      <line ref={ref}>
        <bufferGeometry />
        <lineBasicMaterial {...props} />
      </line>
    );
}