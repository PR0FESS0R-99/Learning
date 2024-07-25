import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls } from '@react-three/drei'

function Model(props) {
  const { scene } = useGLTF('/bmw.glb');
  return <primitive object={scene} {...props} />
}

function App() {
  return (
    <Canvas dpr={[1, 2]} shadow camera={{ fov: 15 }} style={{ position: 'absolute', width:'600px', height:'600px' }} >

      <color attach="background" args={['#101010']} />

      <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
        <Stage enviroment={null}>
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>

    </Canvas>
  )
}

export default App
