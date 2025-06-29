import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

export function Doctor(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/assets/models/doctor_-_sketchfab_weekly_-_13_mar23.glb'
  )
  const { actions } = useAnimations(animations, group)

  // Play the first animation automatically
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  return (
    <group ref={group} position={[0, 2, 0]} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[Math.PI / 2, 0, 0]} scale={0.127}>
          <group
            name="acb33b0390ac4a4591a6b4518e958e7dfbx"
            rotation={[Math.PI, 0, 0]}
            scale={0.03}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_17.skeleton}
                  />
                  <skinnedMesh
                    name="Object_19"
                    geometry={nodes.Object_19.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_19.skeleton}
                  />
                  <skinnedMesh
                    name="Object_21"
                    geometry={nodes.Object_21.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_21.skeleton}
                  />
                  <skinnedMesh
                    name="Object_23"
                    geometry={nodes.Object_23.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_23.skeleton}
                  />
                  <skinnedMesh
                    name="Object_25"
                    geometry={nodes.Object_25.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_25.skeleton}
                  />
                  <skinnedMesh
                    name="Object_27"
                    geometry={nodes.Object_27.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_27.skeleton}
                  />
                  <skinnedMesh
                    name="Object_29"
                    geometry={nodes.Object_29.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_29.skeleton}
                  />
                  <skinnedMesh
                    name="Object_31"
                    geometry={nodes.Object_31.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_31.skeleton}
                  />
                  <skinnedMesh
                    name="Object_33"
                    geometry={nodes.Object_33.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_33.skeleton}
                  />
                  <skinnedMesh
                    name="Object_35"
                    geometry={nodes.Object_35.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_35.skeleton}
                  />
                  <skinnedMesh
                    name="Object_37"
                    geometry={nodes.Object_37.geometry}
                    material={materials.Material_3}
                    skeleton={nodes.Object_37.skeleton}
                  />
                  <skinnedMesh
                    name="Object_39"
                    geometry={nodes.Object_39.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_39.skeleton}
                  />
                  <skinnedMesh
                    name="Object_41"
                    geometry={nodes.Object_41.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_41.skeleton}
                  />
                  <skinnedMesh
                    name="Object_43"
                    geometry={nodes.Object_43.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_43.skeleton}
                  />
                  <skinnedMesh
                    name="Object_45"
                    geometry={nodes.Object_45.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_45.skeleton}
                  />
                  <skinnedMesh
                    name="Object_47"
                    geometry={nodes.Object_47.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_47.skeleton}
                  />
                  <skinnedMesh
                    name="Object_49"
                    geometry={nodes.Object_49.geometry}
                    material={materials.material_0}
                    skeleton={nodes.Object_49.skeleton}
                  />
                  <skinnedMesh
                    name="Object_51"
                    geometry={nodes.Object_51.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_51.skeleton}
                  />
                  <skinnedMesh
                    name="Object_53"
                    geometry={nodes.Object_53.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_53.skeleton}
                  />
                  <skinnedMesh
                    name="Object_55"
                    geometry={nodes.Object_55.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_55.skeleton}
                  />
                  <skinnedMesh
                    name="Object_57"
                    geometry={nodes.Object_57.geometry}
                    material={materials.Material_4}
                    skeleton={nodes.Object_57.skeleton}
                  />
                  <group
                    name="Object_6"
                    position={[-89.863, -242.617, -546.747]}
                    rotation={[1.565, 0, 0]}
                    scale={[1, 0.978, 1.023]}
                  />
                  <group
                    name="Object_8"
                    position={[-91.477, -94.087, -268.988]}
                    rotation={[0.842, 0, 0]}
                    scale={[1, 1, 0.643]}
                  />
                  <group name="Object_10" position={[-91.265, 16.952, -224.602]} />
                  <group name="Object_12" position={[0.948, -8.2, -350.259]} />
                  <group name="Object_14" position={[-181.676, -225.791, -545.751]} />
                  <group name="Object_16" position={[-86.486, -16.541, -802.108]} />
                  <group name="Object_18" position={[136.376, 74.481, -2164.232]} />
                  <group name="Object_20" position={[183.787, -204.829, -2350.56]} />
                  <group name="Object_22" position={[175.115, -157.833, -2225.848]} />
                  <group name="Object_24" position={[137.084, 53.592, -2198.852]} />
                  <group name="Object_26" position={[-92.752, -35.336, -923.939]} />
                  <group name="Object_28" position={[-91.562, -235.561, -918.841]} />
                  <group name="Object_30" position={[-197.1, -206.076, -914.363]} />
                  <group name="Object_32" position={[-36.844, -235.211, -916.824]} />
                  <group name="Object_34" position={[-88.779, -176.6, 6.009]} />
                  <group name="Object_36" />
                  <group name="Object_38" position={[-311.828, 53.592, -2198.852]} />
                  <group name="Object_40" position={[-91.562, -231.379, -941.367]} />
                  <group name="Object_42" position={[-174.57, -231.51, -762.056]} />
                  <group name="Object_44" position={[-192.453, -225.048, -940.494]} />
                  <group name="Object_46" position={[-219.539, -212.816, -1156.542]} />
                  <group name="Object_48" position={[-43.231, -173.25, 5.677]} />
                  <group name="Object_50" position={[731.68, -202.293, -884.334]} />
                  <group name="Object_52" position={[-359.489, -204.829, -2350.56]} />
                  <group name="Object_54" position={[-349.899, -157.833, -2225.848]} />
                  <group name="Object_56" position={[-918.11, -180.511, -884.334]} />
                  <group name="Collar" position={[-91.265, 16.952, -224.602]}>
                    <group
                      name="tie1"
                      position={[-0.212, -111.039, -44.386]}
                      rotation={[0.842, 0, 0]}
                      scale={[1, 1, 0.643]}>
                      <group
                        name="tie"
                        position={[1.593, -31.89, 31.82]}
                        rotation={[0.746, 0, 0]}
                        scale={[1, 1.24, 1.371]}
                      />
                    </group>
                  </group>
                  <group name="coat" position={[0.948, -8.2, -350.259]} />
                  <group name="button003" position={[-181.676, -225.791, -545.751]} />
                  <group name="shirt" position={[-86.486, -16.541, -802.108]} />
                  <group name="trousers" position={[136.376, 74.481, -2164.232]} />
                  <group name="shoesoleL" position={[183.787, -204.829, -2350.56]} />
                  <group name="shoeL" position={[175.115, -157.833, -2225.848]} />
                  <group name="shinL" position={[137.084, 53.592, -2198.852]} />
                  <group name="belt" position={[-92.752, -35.336, -923.939]} />
                  <group
                    name="buckle"
                    position={[-91.562, -235.561, -918.841]}
                    rotation={[-0.016, -0.013, -0.001]}
                  />
                  <group
                    name="Plane006"
                    position={[-197.1, -206.076, -914.363]}
                    rotation={[0, 0.026, 0]}
                    scale={[1.001, 1, 1.001]}
                  />
                  <group
                    name="belt2"
                    position={[-36.844, -235.211, -916.824]}
                    rotation={[0.001, -0.016, 0]}
                  />
                  <group name="glasses" position={[-88.779, -176.6, 6.009]} />
                  <group name="head" />
                  <group name="ShinR" position={[-311.828, 53.592, -2198.852]} />
                  <group
                    name="buckel2"
                    position={[-91.562, -231.379, -941.367]}
                    rotation={[-0.016, -0.013, -0.001]}
                  />
                  <group name="button004" position={[-174.57, -231.51, -762.056]} />
                  <group name="button005" position={[-192.453, -225.048, -940.494]} />
                  <group name="button006" position={[-219.539, -212.816, -1156.542]} />
                  <group name="glass" position={[-43.231, -173.25, 5.677]} />
                  <group name="hand_L" position={[731.68, -202.293, -884.334]} />
                  <group name="shoesoleR" position={[-359.489, -204.829, -2350.56]} />
                  <group name="shoeR" position={[-349.899, -157.833, -2225.848]} />
                  <group name="hand_R" position={[-918.11, -180.511, -884.334]} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/doctor_-_sketchfab_weekly_-_13_mar23.glb')