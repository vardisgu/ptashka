"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Kind = "bagel" | "coffee" | "wine";

function stdMat(color: number, roughness = 0.5) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.05 });
}

function buildBagel(scene: THREE.Scene) {
  const outer = new THREE.Group();
  const inner = new THREE.Group();
  outer.add(inner);
  scene.add(outer);

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.5, 48, 96),
    stdMat(0x1c1c1c, 0.55),
  );
  inner.add(torus);

  // кунжут — плоские зёрна, сориентированные по нормали поверхности
  const seedGeo = new THREE.SphereGeometry(0.085, 10, 10);
  const seedMat = stdMat(0xd6d6d6, 0.7);
  const R = 1.05;
  const r = 0.5;
  for (let i = 0; i < 44; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const p = new THREE.Vector3(
      (R + r * Math.cos(v)) * Math.cos(u),
      (R + r * Math.cos(v)) * Math.sin(u),
      r * Math.sin(v),
    );
    const ringCenter = new THREE.Vector3(R * Math.cos(u), R * Math.sin(u), 0);
    const normal = p.clone().sub(ringCenter).normalize();
    const seed = new THREE.Mesh(seedGeo, seedMat);
    seed.position.copy(p);
    seed.scale.set(1.35, 0.85, 0.45);
    seed.lookAt(p.clone().add(normal));
    inner.add(seed);
  }

  outer.rotation.x = 1.0;
  return (t: number) => {
    inner.rotation.z = t * 0.45;
  };
}

function buildCoffee(scene: THREE.Scene) {
  const g = new THREE.Group();
  scene.add(g);

  // чашка — усечённый конус
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.55, 1.0, 48),
    stdMat(0x1c1c1c, 0.45),
  );
  g.add(cup);

  // поверхность кофе
  const coffee = new THREE.Mesh(
    new THREE.CircleGeometry(0.72, 48),
    new THREE.MeshStandardMaterial({ color: 0x060606, roughness: 0.25 }),
  );
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.42;
  g.add(coffee);

  // ручка
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.34, 0.09, 14, 36, Math.PI),
    stdMat(0x1c1c1c, 0.45),
  );
  handle.position.set(0.82, 0.05, 0);
  handle.rotation.z = -Math.PI / 2;
  g.add(handle);

  // блюдце
  const saucer = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 0.85, 0.09, 48),
    stdMat(0x262626, 0.5),
  );
  saucer.position.y = -0.58;
  g.add(saucer);

  // пар — поднимающиеся частицы с затуханием
  const steamMat = new THREE.MeshBasicMaterial({
    color: 0x9a9a9a,
    transparent: true,
    opacity: 0,
  });
  const puffs: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number; x: number }[] = [];
  for (let i = 0; i < 10; i++) {
    const m = steamMat.clone();
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), m);
    const x = -0.35 + (i % 3) * 0.35;
    puff.position.set(x, 0.6, 0.2);
    g.add(puff);
    puffs.push({ mesh: puff, mat: m, phase: i / 10, x });
  }

  g.rotation.x = 0.28;
  g.position.y = -0.1;
  return (t: number) => {
    for (const p of puffs) {
      const k = (t * 0.35 + p.phase) % 1;
      p.mesh.position.y = 0.55 + k * 1.5;
      p.mesh.position.x = p.x + Math.sin((k + p.phase) * 6) * 0.09;
      const s = 0.7 + k * 1.1;
      p.mesh.scale.setScalar(s);
      p.mat.opacity = k < 0.15 ? k / 0.15 * 0.55 : 0.55 * (1 - (k - 0.15) / 0.85);
    }
  };
}

function buildWine(scene: THREE.Scene) {
  const g = new THREE.Group();
  scene.add(g);

  // бутылка — крупная, наклонена к бокалу
  const bottle = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.33, 0.33, 1.5, 40),
    stdMat(0x141414, 0.3),
  );
  bottle.add(body);
  const shoulder = new THREE.Mesh(
    new THREE.SphereGeometry(0.33, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    stdMat(0x141414, 0.3),
  );
  shoulder.position.y = 0.75;
  bottle.add(shoulder);
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.13, 0.55, 24),
    stdMat(0x141414, 0.3),
  );
  neck.position.y = 1.18;
  bottle.add(neck);

  bottle.rotation.z = 2.25;
  bottle.position.set(1.2, 0.95, 0);
  g.add(bottle);

  // струя — гладкая изогнутая трубка от горлышка к бокалу
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.22, 0.28, 0),
    new THREE.Vector3(-0.05, -0.15, 0),
    new THREE.Vector3(-0.45, -0.5, 0),
    new THREE.Vector3(-0.68, -0.62, 0),
  ]);
  const stream = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 24, 0.05, 10),
    new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.15 }),
  );
  g.add(stream);

  // бокал
  const glass = new THREE.Group();
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.1,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
  });
  const bowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.36, 0.75, 40, 1, true),
    glassMat,
  );
  glass.add(bowl);
  const wine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.37, 0.34, 40),
    stdMat(0x0e0e0e, 0.2),
  );
  wine.position.y = -0.16;
  glass.add(wine);
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.55, 16),
    stdMat(0x1a1a1a, 0.3),
  );
  stem.position.y = -0.65;
  glass.add(stem);
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.34, 0.06, 32),
    stdMat(0x1a1a1a, 0.3),
  );
  base.position.y = -0.94;
  glass.add(base);

  glass.position.set(-0.72, -0.45, 0);
  g.add(glass);

  g.position.y = 0.05;
  return (t: number) => {
    // вино в бокале мягко «дышит», струя едва пульсирует
    const k = 1 + Math.sin(t * 1.6) * 0.05;
    wine.scale.set(1, k, 1);
    stream.scale.set(1 + Math.sin(t * 5) * 0.06, 1, 1);
    bottle.rotation.z = 2.25 + Math.sin(t * 0.8) * 0.02;
  };
}

const builders: Record<Kind, (s: THREE.Scene) => (t: number) => void> = {
  bagel: buildBagel,
  coffee: buildCoffee,
  wine: buildWine,
};

export function Icon3D({ kind }: { kind: Kind }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const size = el.clientWidth || 120;
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(-4, -2, 3);
    scene.add(rim);

    const update = builders[kind](scene);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      update(clock.getElapsedTime());
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) {
      update(0.4);
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material;
          (Array.isArray(m) ? m : [m]).forEach((mm) => mm.dispose());
        }
      });
      if (renderer.domElement.parentElement === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [kind]);

  return <div ref={ref} className="hub__icon3d" aria-hidden />;
}
