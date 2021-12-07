import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber'
import { Box } from './Box';


function App() {
  return (
    <div className="App">
      <Canvas> 
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
