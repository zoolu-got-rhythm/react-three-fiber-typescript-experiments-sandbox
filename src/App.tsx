import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber'
import { Box } from './Box';
import { Line } from './Line';
import * as THREE from 'three';
import { MovingBox } from './MovingCube';


function App() {

  // create grid
  let xyPointsHorizontal = [];
  let xyPointsVertical = [];
  for(let i = 0; i < 11; i++){
    xyPointsHorizontal.push([{x: -5, y: -5+i}, {x: 5, y: -5+i}]);
    xyPointsVertical.push([{x: -5+i, y: -5}, {x: -5+i, y: 5}]);
  }

  return (
    <div className="App">
      <Canvas className="three-js-canvas" camera={{position: new THREE.Vector3(0,0,8)}}> 
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        {xyPointsHorizontal.map(fromToArr => {
          const from = fromToArr[0];
          const to = fromToArr[1];
          return <Line from={[from.x,from.y,0]} to={[to.x,to.y,0]} color="lime" />
        })}
        {xyPointsVertical.map(fromToArr => {
          const from = fromToArr[0];
          const to = fromToArr[1];
          return <Line from={[from.x,from.y,0]} to={[to.x,to.y,0]} color="lime" />
        })}

        <MovingBox position={[1.5,1.5,0]} moveDistance={1} directions={["left", "left","up","down","left","down", "left"]}/>
        <MovingBox position={[3.5,3.5,0]} moveDistance={1} directions={["left", "left","up","down","left","down", "left"]}/>

      </Canvas>
    </div>
  );
}

export default App;
