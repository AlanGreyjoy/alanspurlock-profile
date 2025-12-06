import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, RoundedBox, Float } from '@react-three/drei';
import type { Group } from 'three';

// A simple cozy cottage composition
function Cottage(props: any) {
    return (
        <group {...props}>
            {/* Base */}
            <RoundedBox args={[2, 1.5, 2]} radius={0.1} position={[0, 0.75, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#fcd5ce" />
            </RoundedBox>
            {/* Roof */}
            <mesh position={[0, 1.9, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
                <coneGeometry args={[2.2, 1.5, 4]} />
                <meshStandardMaterial color="#ffb5a7" />
            </mesh>
            {/* Door */}
            <RoundedBox args={[0.5, 1, 0.1]} radius={0.05} position={[0, 0.5, 1]} castShadow>
                <meshStandardMaterial color="#9d8189" />
            </RoundedBox>
        </group>
    );
}

function Tree({ position, color = "#a8e6cf", scale = 1 }: { position: [number, number, number], color?: string, scale?: number }) {
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
                <meshStandardMaterial color="#8d6e63" />
            </mesh>
            {/* Leaves */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh position={[0, 1.2, 0]} castShadow>
                    <dodecahedronGeometry args={[0.6]} />
                    <MeshDistortMaterial color={color} speed={2} distort={0.4} radius={1} />
                </mesh>
            </Float>
        </group>
    )
}

export function Glade() {
    const group = useRef<Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Gentle floating motion for the whole island
            const t = state.clock.getElapsedTime();
            group.current.position.y = Math.sin(t / 2) * 0.1;
        }
    });

    return (
        <group ref={group}>
            {/* The Ground "Island" */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[6, 64]} />
                <meshStandardMaterial color="#e2f0cb" />
            </mesh>

            {/* Main Cottage */}
            <Cottage position={[0, 0, 0]} />

            {/* Scattered Trees */}
            <Tree position={[-2.5, 0, 1]} scale={1.2} />
            <Tree position={[2, 0, 2]} color="#b9fbc0" />
            <Tree position={[-1.5, 0, -2]} scale={0.8} color="#98f5e1" />
            <Tree position={[2.5, 0, -1.5]} scale={1.1} />

            {/* Some "Rocks" or decorative blobs */}
            <mesh position={[2, 0.2, 3]} castShadow receiveShadow>
                <sphereGeometry args={[0.3]} />
                <meshStandardMaterial color="#a0a0a0" />
            </mesh>

        </group>
    );
}
