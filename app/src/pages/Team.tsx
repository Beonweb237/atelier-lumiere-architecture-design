import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Camille Renard',
    role: 'ARCHITECTE DPLG \u00B7 FONDATRICE',
    specialty: 'Architecture r\u00E9sidentielle, patrimoine',
    bio: "Dipl\u00F4m\u00E9e de l'ENSAPM, Camille fonde Atelier Lumi\u00E8re en 2008 apr\u00E8s dix ans au sein de grandes agences parisiennes.",
    image: '/about-studio.jpg',
  },
  {
    name: 'Lucas Moreau',
    role: 'ARCHITECTE DPLG \u00B7 ASSOCI\u00C9',
    specialty: 'B\u00E2timents publics, \u00E9quipements',
    bio: "Ancien collaborateur de Dietmar Feichtinger, Lucas rejoint le cabinet en 2012 pour d\u00E9velopper la branche \u00E9quipements publics.",
    image: '/about-studio.jpg',
  },
  {
    name: 'In\u00E8s Benali',
    role: 'ARCHITECTE \u00B7 CHEF DE PROJET',
    specialty: 'R\u00E9novation, restauration du patrimoine',
    bio: "Sp\u00E9cialiste de la r\u00E9novation \u00E9nerg\u00E9tique, In\u00E8s pilote les projets de r\u00E9habilitation et de restauration.",
    image: '/about-studio.jpg',
  },
  {
    name: 'Thomas Garnier',
    role: 'URBANISTE \u00B7 PAYSAGISTE',
    specialty: 'Urbanisme, paysage, am\u00E9nagement',
    bio: "Docteur en urbanisme de l'Universit\u00E9 de Lyon, Thomas apporte une vision territoriale \u00E0 chaque projet.",
    image: '/about-studio.jpg',
  },
  {
    name: 'Sarah Kim',
    role: "ARCHITECTE D'INT\u00C9RIEUR",
    specialty: 'Architecture int\u00E9rieure, sc\u00E9nographie',
    bio: "Dipl\u00F4m\u00E9e de l'\u00C9cole Boulle, Sarah con\u00E7oit des espaces int\u00E9rieurs d'une grande pr\u00E9cision mat\u00E9rielle.",
    image: '/about-studio.jpg',
  },
  {
    name: 'Paul Marchand',
    role: 'ING\u00C9NIEUR STRUCTURE \u00B7 BIM MANAGER',
    specialty: 'Structure, BIM, performance \u00E9nerg\u00E9tique',
    bio: "Ancien du bureau d'\u00E9tudes Egis, Paul supervise la mod\u00E9lisation BIM et les calculs structure.",
    image: '/about-studio.jpg',
  },
];

const stats = [
  { value: 180, suffix: '+', label: "PROJETS LIVR\u00C9S", desc: "Depuis la cr\u00E9ation du cabinet en 2008" },
  { value: 15, suffix: '', label: "ANN\u00C9ES D'EXISTENCE", desc: 'Une croissance ma\u00EEtris\u00E9e et durable' },
  { value: 25, suffix: '', label: 'COLLABORATEURS', desc: 'Architectes, urbanistes, ing\u00E9nieurs' },
  { value: 12, suffix: '', label: 'PRIX & DISTINCTIONS', desc: "\u00C9querre d'Argent, Mies Van der Rohe, AJAP" },
];

function AnimatedCounter({
  target,
  suffix,
  triggered,
}: {
  target: number;
  suffix: string;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [triggered, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [countersTriggered, setCountersTriggered] = useState(false);

  useGSAP(
    () => {
      // Page header animations
      gsap.to('.team-overline', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1,
      });
      gsap.to('.team-headline', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.25,
      });
      gsap.to('.team-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.45,
      });

      // Stats section trigger
      ScrollTrigger.create({
        trigger: '.stats-section',
        start: 'top 80%',
        onEnter: () => setCountersTriggered(true),
        once: true,
      });

      // Stats labels animation
      gsap.from('.stat-item', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
        },
      });

      // Team headline
      gsap.from('.team-section-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.team-section-headline',
          start: 'top 85%',
        },
      });

      // Team cards
      gsap.from('.team-card', {
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 85%',
        },
      });

      // Recruitment CTA
      gsap.from('.recruit-content > *', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.recruit-content',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <Layout>
      <div ref={containerRef}>
        {/* Section 1: Page Header */}
        <section
          className="relative flex items-center justify-center px-content overflow-hidden"
          style={{
            backgroundColor: '#e4ceac',
            minHeight: '60vh',
            paddingTop: '10rem',
            paddingBottom: '6rem',
          }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/about-studio.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              opacity: 0.15,
            }}
          />
          <div className="relative z-10 max-w-container mx-auto text-center">
            <p
              className="team-overline uppercase mb-6 opacity-0"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                lineHeight: '1.0',
                color: '#eb7e56',
              }}
            >
              L&apos;ÉQUIPE
            </p>
            <h1
              className="team-headline uppercase font-normal opacity-0"
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                lineHeight: '0.85',
                letterSpacing: '-2.4px',
                color: '#212e44',
                transform: 'translateY(40px)',
              }}
            >
              Les <em className="italic">personnes</em> derrière les projets
            </h1>
            <p
              className="team-subtitle mx-auto mt-8 opacity-0"
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: '-0.54px',
                color: 'rgba(33, 46, 68, 0.6)',
                maxWidth: '600px',
                transform: 'translateY(30px)',
              }}
            >
              Architectes, urbanistes, ingénieurs — une équipe
              pluridisciplinaire passionnée par la conception spatiale
            </p>
            <div
              className="mx-auto mt-12"
              style={{
                width: '160px',
                height: '1px',
                backgroundColor: 'rgba(33, 46, 68, 0.1)',
              }}
            />
          </div>
        </section>

        {/* Section 2: Key Figures */}
        <section
          className="stats-section px-content"
          style={{
            backgroundColor: '#212e44',
            paddingTop: '10rem',
            paddingBottom: '10rem',
          }}
        >
          <div
            className="max-w-container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24"
          >
            {stats.map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <p
                  className="font-normal"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 60px)',
                    lineHeight: '1.0',
                    letterSpacing: '-1.8px',
                    color: '#e4ceac',
                  }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    triggered={countersTriggered}
                  />
                </p>
                <p
                  className="uppercase mt-4"
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.7px',
                    lineHeight: '1.0',
                    color: '#eb7e56',
                  }}
                >
                  {stat.label}
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.4',
                    color: 'rgba(228, 206, 172, 0.6)',
                  }}
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mx-auto mt-24"
            style={{
              width: '200px',
              height: '1px',
              backgroundColor: 'rgba(233, 206, 172, 0.15)',
            }}
          />
          <p
            className="text-center uppercase mt-8"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              lineHeight: '1.0',
              color: 'rgba(228, 206, 172, 0.4)',
            }}
          >
            Membre de l&apos;Ordre des Architectes · Inscrit à l&apos;OPQIBI
          </p>
        </section>

        {/* Section 3: L'Équipe */}
        <section
          className="px-content"
          style={{
            backgroundColor: '#e4ceac',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
        >
          <div className="max-w-container mx-auto">
            <p
              className="uppercase text-center mb-6"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                lineHeight: '1.0',
                color: '#eb7e56',
              }}
            >
              COLLABORATEURS
            </p>
            <h2
              className="team-section-headline uppercase font-normal text-center"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
              }}
            >
              L&apos;<em className="italic">équipe</em>
            </h2>

            {/* Team Grid */}
            <div
              className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24"
              style={{ marginTop: '6rem' }}
            >
              {teamMembers.map((member, i) => (
                <div key={i} className="team-card group">
                  <div
                    className="overflow-hidden mb-6"
                    style={{ borderRadius: '4px' }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full transition-all duration-400 group-hover:grayscale-0"
                      style={{
                        aspectRatio: '3/4',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLImageElement).style.filter =
                          'grayscale(0%)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLImageElement).style.filter =
                          'grayscale(100%)';
                      }}
                    />
                  </div>
                  <h3
                    className="font-normal transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      fontSize: '24px',
                      letterSpacing: '-0.72px',
                      color: '#212e44',
                      opacity: 0.9,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="uppercase mt-2"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: '#eb7e56',
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontSize: '16px',
                      color: 'rgba(33, 46, 68, 0.6)',
                    }}
                  >
                    {member.specialty}
                  </p>
                  <p
                    className="mt-3"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: 'rgba(33, 46, 68, 0.6)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Recrutement CTA */}
        <section
          className="px-content"
          style={{
            backgroundColor: '#eb7e56',
            paddingTop: '10rem',
            paddingBottom: '10rem',
          }}
        >
          <div className="recruit-content max-w-container mx-auto text-center">
            <h2
              className="uppercase font-normal"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
              }}
            >
              Rejoignez <em className="italic">l&apos;équipe</em>
            </h2>
            <p
              className="mx-auto mt-6"
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: '-0.54px',
                color: 'rgba(33, 46, 68, 0.8)',
                maxWidth: '600px',
              }}
            >
              Nous sommes toujours à la recherche de talents passionnés.
              Envoyez-nous votre candidature spontanée.
            </p>
            <a
              href="#/contact"
              className="inline-block mt-8 px-8 py-3 text-sm font-medium transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: '#212e44',
                color: '#e4ceac',
                borderRadius: '25px',
              }}
            >
              Candidature Spontanée
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
