import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = [headlineRef.current, bodyRef.current, ctaRef.current].filter(Boolean);

      elements.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
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
      style={{
        backgroundColor: '#212e44',
        paddingTop: '15rem',
        paddingBottom: '15rem',
      }}
    >
      <div className="max-w-container mx-auto px-content text-center">
        <h2
          ref={headlineRef}
          className="uppercase font-normal mb-6"
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: '0.85',
            letterSpacing: '-1.8px',
            color: '#e4ceac',
          }}
        >
          Démarrons votre <em className="italic">projet</em>
        </h2>

        <p
          ref={bodyRef}
          className="max-w-2xl mx-auto mb-12"
          style={{
            fontSize: '18px',
            lineHeight: '1.4',
            letterSpacing: '-0.54px',
            color: 'rgba(228, 206, 172, 0.8)',
          }}
        >
          Racontez-nous votre vision. Nous vous accompagnons de la première esquisse à la livraison de votre bâtiment.
        </p>

        <Link
          ref={ctaRef}
          to="/contact"
          className="inline-block px-8 py-3 text-sm font-medium transition-all duration-300 hover:opacity-90"
          style={{
            backgroundColor: '#eb7e56',
            color: '#212e44',
            borderRadius: '25px',
          }}
        >
          Nous Contacter
        </Link>
      </div>
    </section>
  );
}
