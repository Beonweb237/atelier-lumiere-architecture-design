import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#e4ceac',
        paddingTop: '4rem',
        paddingBottom: '15rem',
      }}
    >
      <div
        ref={contentRef}
        className="max-w-container mx-auto px-content text-center"
      >
        <p
          className="uppercase mb-8"
          style={{
            fontSize: '14px',
            letterSpacing: '0.7px',
            color: '#947955',
          }}
        >
          ATELIER LUMIÈRE
        </p>

        <h1
          className="uppercase font-normal mb-8"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: '0.85',
            letterSpacing: '-2.4px',
            color: '#212e44',
          }}
        >
          L'architecture au service de la <em className="italic">lumière</em>
        </h1>

        <p
          className="max-w-2xl mx-auto mb-12"
          style={{
            fontSize: '18px',
            lineHeight: '1.4',
            letterSpacing: '-0.54px',
            color: 'rgba(33, 46, 68, 0.8)',
          }}
        >
          Nous concevons des espaces où la matière et la lumière dialoguent pour créer des lieux de vie durables, élégants et profondément ancrés dans leur environnement.
        </p>

        <Link
          to="/projets"
          className="inline-block px-8 py-3 text-sm font-medium transition-all duration-300 hover:opacity-90"
          style={{
            backgroundColor: '#212e44',
            color: '#e4ceac',
            borderRadius: '25px',
          }}
        >
          Découvrir nos projets
        </Link>
      </div>
    </section>
  );
}
