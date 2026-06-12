import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Building2, Trees } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseItem {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const expertiseItems: ExpertiseItem[] = [
  {
    icon: <Compass size={40} color="#eb7e56" strokeWidth={1.5} />,
    title: 'Architecture',
    body: 'Conception sur mesure de maisons individuelles, rénovations et extensions. Chaque projet est une réponse unique au terrain, à la lumière et aux aspirations de ses habitants.',
  },
  {
    icon: <Building2 size={40} color="#eb7e56" strokeWidth={1.5} />,
    title: 'Bâtiments Publics',
    body: 'Équipements culturels, éducatifs et administratifs. Nous créons des lieux qui enrichissent le tissu urbain et favorisent les rencontres.',
  },
  {
    icon: <Trees size={40} color="#eb7e56" strokeWidth={1.5} />,
    title: 'Paysage & Urbanisme',
    body: "Aménagement de jardins, espaces publics et études urbaines. L'échelle du territoire informe celle de l'architecture.",
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      columnsRef.current.forEach((col, i) => {
        if (!col) return;
        gsap.fromTo(
          col,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: col,
              start: 'top 90%',
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
        backgroundColor: '#e4ceac',
        paddingTop: '15rem',
        paddingBottom: '15rem',
      }}
    >
      <div className="max-w-container mx-auto px-content">
        <div ref={headlineRef} className="text-center mb-24">
          <p
            className="uppercase mb-6"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              color: '#947955',
            }}
          >
            SAVOIR-FAIRE
          </p>
          <h2
            className="uppercase font-normal"
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              lineHeight: '0.85',
              letterSpacing: '-1.8px',
              color: '#212e44',
            }}
          >
            Notre <em className="italic">Expertise</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {expertiseItems.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => { columnsRef.current[i] = el; }}
              className="text-center md:text-left"
            >
              <div className="mb-6 flex justify-center md:justify-start">
                {item.icon}
              </div>
              <h4
                className="uppercase font-normal mb-4"
                style={{
                  fontSize: '30px',
                  lineHeight: '1.0',
                  letterSpacing: '-0.9px',
                  color: '#212e44',
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.4',
                  letterSpacing: '-0.54px',
                  color: 'rgba(33, 46, 68, 0.8)',
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
