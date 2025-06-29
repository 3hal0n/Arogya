import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

export function Hospital(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/assets/models/charite_university_hospital_-_operating_room.glb'
  )
  const { actions } = useAnimations(animations, group)

  // Play the first animation automatically
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]]?.play()
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.494}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[1.187, 270.993, 7.919]}
            rotation={[-0.419, 0.731, 0.285]}
            scale={33.906}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.OP_Mitte_Mitte_OP_Tex3_0.geometry}
              material={materials.Mitte_OP_Tex3}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.OP_Mitte_Mitte_OP_Tex2_0.geometry}
              material={materials.Mitte_OP_Tex2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.OP_Mitte_Mitte_OP_Tex1_0.geometry}
              material={materials.Mitte_OP_Tex1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.OP_Mitte_Mitte_OP_Tex4_0.geometry}
              material={materials.Mitte_OP_Tex4}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.OP_Mitte_Mitte_OP_Tex4_0_1.geometry}
              material={materials.Mitte_OP_Tex4}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_Door__0.geometry}
            material={materials.Window_Door__0}
            position={[-613.708, 302.808, -19.805]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.957, 105.416, 75.399]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window1__0.geometry}
            material={materials.Window_Door__0}
            position={[573.561, 328.377, 65.911]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.914, 100.708, 95.375]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window2__0.geometry}
            material={materials.Window_Door__0}
            position={[573.561, 325.814, -161.278]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.914, 100.708, 95.375]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/charite_university_hospital_-_operating_room.glb')
