import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PlaneConfig {
  src: string;
  alt: string;
  z: number;
  x: string;
  y: string;
  rotateY: number;
  scale: number;
}

const planes: PlaneConfig[] = [
  {
    src: '/hero-plane-1.jpg',
    alt: 'Intérieur architectural chaleureux en béton et bois',
    z: -1200,
    x: '10%',
    y: '15%',
    rotateY: 60,
    scale: 0.7,
  },
  {
    src: '/hero-plane-2.jpg',
    alt: 'Façade moderne à l\'heure dorée',
    z: -850,
    x: '55%',
    y: '10%',
    rotateY: -45,
    scale: 0.8,
  },
  {
    src: '/hero-plane-3.jpg',
    alt: 'Détail intérieur avec lumière zénithale',
    z: -300,
    x: '30%',
    y: '50%',
    rotateY: 30,
    scale: 0.85,
  },
  {
    src: '/hero-plane-4.jpg',
    alt: 'Vue aérienne d\'un bâtiment contemporain',
    z: 200,
    x: '65%',
    y: '45%',
    rotateY: -50,
    scale: 0.9,
  },
  {
    src: '/hero-plane-5.jpg',
    alt: 'Maquette architecturale en atelier',
    z: 800,
    x: '15%',
    y: '60%',
    rotateY: 45,
    scale: 0.95,
  },
  {
    src: '/hero-plane-6.jpg',
    alt: 'Texture de béton en lumière chaude',
    z: 1400,
    x: '50%',
    y: '30%',
    rotateY: -30,
    scale: 1.0,
  },
];

export default function DimensionalHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      planesRef.current.forEach((plane, i) => {
        if (!plane) return;
        const config = planes[i];

        gsap.fromTo(
          plane,
          {
            y: '-10vh',
            z: config.z,
            rotateY: config.rotateY,
            opacity: 0.6,
          },
          {
            y: '-70vh',
            z: config.z + 2000,
            rotateY: config.rotateY * 0.5,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: '250vh',
        backgroundColor: '#e4ceac',
      }}
    >
      <div
        className="sticky top-0 left-0 w-full overflow-hidden"
        style={{
          height: '100vh',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {planes.map((plane, i) => (
            <div
              key={i}
              ref={(el) => { planesRef.current[i] = el; }}
              className="absolute"
              style={{
                left: plane.x,
                top: plane.y,
                width: 'clamp(200px, 30vw, 420px)',
                aspectRatio: '4/3',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                zIndex: planes.length - i,
              }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  borderRadius: '4px',
                  transform: `scale(${plane.scale})`,
                }}
              >
                <img
                  src={plane.src}
                  alt={plane.alt}
                  className="w-full h-full object-cover"
                  style={{
                    transform: 'scale(2)',
                    transformOrigin: 'center center',
                  }}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
