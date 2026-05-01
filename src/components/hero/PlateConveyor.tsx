import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { PLATES, type Plate } from "./plates";

const SPEED = 0.35;            // world units / sec
const SPACING = 2.2;           // distance between plates
const PLATE_RADIUS = 0.85;
const PLATE_HEIGHT = 0.08;
const TILT = -0.35;            // rad, tilt toward camera
const BOUND = (PLATES.length * SPACING) / 2;

function PlateMesh({
  plate,
  offset,
  paused,
}: {
  plate: Plate;
  offset: number;
  paused: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, plate.image);

  // Better-looking texture
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  // Materials: top = food photo, side/bottom = warm ceramic
  const materials = useMemo(() => {
    const ceramic = new THREE.MeshStandardMaterial({
      color: "#f0ebe0",
      roughness: 0.55,
      metalness: 0.05,
    });
    const top = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.0,
    });
    // CylinderGeometry material order: [side, top, bottom]
    return [ceramic, top, ceramic];
  }, [texture]);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (!paused) {
      // Move left, wrap on the right
      group.current.position.x -= delta * SPEED;
      if (group.current.position.x < -BOUND) {
        group.current.position.x += PLATES.length * SPACING;
      }
      // Subtle bob + slow self-rotation
      const t = state.clock.elapsedTime + offset;
      group.current.position.y = Math.sin(t * 0.8) * 0.08;
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group
      ref={group}
      position={[offset * SPACING - BOUND / 2, 0, 0]}
      rotation={[TILT, 0, 0]}
    >
      <mesh material={materials} castShadow={false} receiveShadow={false}>
        <cylinderGeometry
          args={[PLATE_RADIUS, PLATE_RADIUS * 0.92, PLATE_HEIGHT, 64]}
        />
      </mesh>
    </group>
  );
}

function Scene({ paused }: { paused: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#ffe6c2" />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#e8a44a" />
      {PLATES.map((p, i) => (
        <PlateMesh key={p.id} plate={p} offset={i} paused={paused} />
      ))}
    </>
  );
}

export default function PlateConveyor() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.6, 4.2], fov: 38 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene paused={!!reduce} />
      </Suspense>
    </Canvas>
  );
}
