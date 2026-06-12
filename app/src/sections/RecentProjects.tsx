import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  image: string;
  name: string;
  category: string;
  slug: string;
}

const projects: Project[] = [
  {
    image: '/project-01.jpg',
    name: 'Maison L',
    category: 'RÉSIDENTIEL',
    slug: 'maison-l',
  },
  {
    image: '/project-02.jpg',
    name: 'Loft Saint-Antoine',
    category: 'RÉNOVATION',
    slug: 'loft-saint-antoine',
  },
  {
    image: '/project-03.jpg',
    name: 'Centre Culturel M',
    category: 'PUBLIC',
    slug: 'centre-culturel-m',
  },
  {
    image: '/project-04.jpg',
    name: 'Refuge Alpin',
    category: 'HÔTELLERIE',
    slug: 'refuge-alpin',
  },
  {
    image: '/project-05.jpg',
    name: "Boutique Hôtel L'Ours",
    category: 'INTÉRIEUR',
    slug: 'boutique-hotel-l-ours',
  },
  {
    image: '/project-06.jpg',
    name: 'Siège Social TechVert',
    category: 'BUREAUX',
    slug: 'siege-social-techvert',
  },
];

export default function RecentProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
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
            PORTFOLIO
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
            Projets <em className="italic">Récents</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <Link to={`/projets/${project.slug}`} className="group block">
                <div
                  className="overflow-hidden mb-4"
                  style={{ borderRadius: '4px', aspectRatio: '4/3' }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p
                  className="uppercase mb-1"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.7px',
                    color: '#eb7e56',
                  }}
                >
                  {project.category}
                </p>
                <h3
                  className="font-normal transition-opacity duration-300 group-hover:opacity-70"
                  style={{
                    fontSize: '24px',
                    letterSpacing: '-0.72px',
                    color: '#212e44',
                  }}
                >
                  {project.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
            style={{
              fontSize: '18px',
              letterSpacing: '-0.54px',
              color: '#212e44',
            }}
          >
            Voir tous les projets
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
