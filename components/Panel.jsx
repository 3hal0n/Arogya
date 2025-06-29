import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Panel(props) {
  const { nodes, materials } = useGLTF('/assets/models/panel_route_guide_hospital.glb')
  
  return (
    <group {...props} dispose={null}>
      <group 
        scale={0.06} 
        position={[0, -3, -1]}  // Reset position
        rotation={[0, 1.5, 0]}  // Reset rotation
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.base__0.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.R__0.geometry}
          material={materials['Scene_-_Root']}
          position={[0.014, 53.558, 39.021]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/panel_route_guide_hospital.glb')