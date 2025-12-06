import { useRef } from 'react';
import { useScroll, Float, Stars, Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Glade } from './Glade';

export function ParallaxWorld() {
    const scroll = useScroll();

    // Refs for layers
    const bgRef = useRef<Group>(null);
    const midRef = useRef<Group>(null);
    const fgRef = useRef<Group>(null);

    useFrame((state, delta) => {
        // scroll.offset is a value between 0 and 1
        const offset = scroll.offset;

        // Background: Moves very slowly (distant)
        if (bgRef.current) {
            bgRef.current.position.y = offset * 2;
            bgRef.current.rotation.y = offset * 0.1;
        }

        // Midground: The main cottage. Moves at medium speed acting as the visual anchor.
        // It should start partly visible and stay in view or slowly pan up.
        if (midRef.current) {
            // slight rotation for dynamic feel
            midRef.current.rotation.y = Math.sin(offset * Math.PI) * 0.2;
        }

        // Foreground: Moves fast (close to camera)
        if (fgRef.current) {
            fgRef.current.position.y = offset * 15; // Rises quickly
        }
    });

    return (
        <>
            {/* BACKGROUND LAYER - Distance */}
            <group ref={bgRef} position={[0, -5, -10]}>
                <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Cloud opacity={0.5} position={[0, 10, -20]} speed={0.2} segments={20} bounds={[10, 2, 2]} />
                <Cloud opacity={0.3} position={[-10, 5, -20]} speed={0.2} segments={20} bounds={[10, 2, 2]} />
            </group>

            {/* MIDGROUND LAYER - The Focus */}
            <group ref={midRef} position={[2, -2, 0]}>
                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                    <Glade />
                </Float>
            </group>

            {/* FOREGROUND LAYER - "Bokeh" elements */}
            <group ref={fgRef} position={[0, -5, 3]}>
                {/* Abstract "Leaves" or "Magic Particles" that float up as you scroll */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <Float key={i} speed={3} rotationIntensity={1} floatIntensity={1}>
                        <mesh position={[
                            (Math.random() - 0.5) * 15, // Spread X
                            Math.random() * -10 - 2,    // Start below view
                            (Math.random() - 0.5) * 5   // Spread Z
                        ]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                            <dodecahedronGeometry args={[0.1 + Math.random() * 0.2]} />
                            <meshStandardMaterial color="#ffdec2" transparent opacity={0.8} />
                        </mesh>
                    </Float>
                ))}

                {/* A blurred framing element on the left/right? */}
                <mesh position={[-5, -2, 2]}>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshStandardMaterial color="#4a3b52" transparent opacity={0.9} roughness={1} />
                </mesh>
                <mesh position={[6, -8, 4]}>
                    <sphereGeometry args={[3, 32, 32]} />
                    <meshStandardMaterial color="#4a3b52" transparent opacity={0.9} roughness={1} />
                </mesh>
            </group>
        </>
    );
}
