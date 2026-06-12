import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sun, Leaf, Heart } from 'lucide-react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

function NotchDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col items-center py-16">
      <div
        className="w-10 h-3 rounded-full"
        style={{ backgroundColor: '#947955' }}
      />
      <div
        className="w-full mt-1"
        style={{
          height: '1px',
          backgroundColor: dark
            ? 'rgba(233, 206, 172, 0.15)'
            : 'rgba(33, 46, 68, 0.1)',
        }}
      />
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Page header animations
      gsap.to('.about-overline', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1,
      });
      gsap.to('.about-headline', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.25,
      });
      gsap.to('.about-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.45,
      });

      // Section 2: Block 1 left text
      gsap.from('.block1-text', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.block1-text',
          start: 'top 85%',
        },
      });

      // Section 2: Block 1 right image
      gsap.from('.block1-image', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.block1-image',
          start: 'top 85%',
        },
      });

      // Section 2: Block 2 left image
      gsap.from('.block2-image', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.block2-image',
          start: 'top 85%',
        },
      });

      // Section 2: Block 2 right text
      gsap.from('.block2-text', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.block2-text',
          start: 'top 85%',
        },
      });

      // Section 3: Philosophy headline
      gsap.from('.philosophy-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-headline',
          start: 'top 85%',
        },
      });

      // Section 3: Value columns staggered
      gsap.from('.value-col', {
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 85%',
        },
      });

      // Section 3: Quote
      gsap.from('.philosophy-quote', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-quote',
          start: 'top 85%',
        },
      });

      // Section 4: Studio headline
      gsap.from('.studio-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.studio-headline',
          start: 'top 85%',
        },
      });

      // Section 4: Photo grid
      gsap.from('.studio-photo', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.studio-grid',
          start: 'top 85%',
        },
      });

      // Section 5: CTA
      gsap.from('.cta-content > *', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.cta-content',
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
          className="flex items-center justify-center px-content"
          style={{
            backgroundColor: '#e4ceac',
            minHeight: '60vh',
            paddingTop: '10rem',
            paddingBottom: '6rem',
          }}
        >
          <div className="max-w-container mx-auto text-center">
            <p
              className="about-overline uppercase mb-6 opacity-0"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                lineHeight: '1.0',
                color: '#eb7e56',
              }}
            >
              LE CABINET
            </p>
            <h1
              className="about-headline uppercase font-normal opacity-0"
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                lineHeight: '0.85',
                letterSpacing: '-2.4px',
                color: '#212e44',
                transform: 'translateY(40px)',
              }}
            >
              Atelier <em className="italic">Lumière</em>
            </h1>
            <p
              className="about-subtitle mx-auto mt-8 opacity-0"
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: '-0.54px',
                color: 'rgba(33, 46, 68, 0.6)',
                maxWidth: '640px',
                transform: 'translateY(30px)',
              }}
            >
              Fondé en 2008 à Lyon, Atelier Lumière est un cabinet d'architecture
              et de paysage animé par la conviction que la lumière naturelle est
              le premier matériau de l'architecture.
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

        {/* Section 2: Notre Histoire */}
        <section
          style={{
            backgroundColor: '#e4ceac',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
          className="px-content"
        >
          <div className="max-w-container mx-auto">
            {/* Block 1: text left / image right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="block1-text">
                <p
                  className="uppercase mb-4"
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.7px',
                    lineHeight: '1.0',
                    color: '#eb7e56',
                  }}
                >
                  2008
                </p>
                <h3
                  className="uppercase font-normal mb-8"
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    lineHeight: '1.0',
                    letterSpacing: '-1.2px',
                    color: '#212e44',
                  }}
                >
                  Une histoire qui commence par la{' '}
                  <em className="italic">lumière</em>
                </h3>
                <p
                  className="mb-6"
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: 'rgba(33, 46, 68, 0.7)',
                  }}
                >
                  Camille Renard fonde Atelier Lumière en 2008, après dix ans
                  passés au sein de grandes agences parisiennes. Son constat est
                  simple : trop de beaux projets d'architecture sont dénaturés
                  par un manque d'attention porté à la lumière naturelle.
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: 'rgba(33, 46, 68, 0.7)',
                  }}
                >
                  Installée à Lyon, elle réunit une petite équipe d'architectes
                  partageant la même conviction : chaque espace doit être conçu
                  pour la lumière qui l'habitera.
                </p>
              </div>
              <div className="block1-image">
                <img
                  src="/about-studio.jpg"
                  alt="Premier atelier Atelier Lumière à Lyon"
                  className="w-full"
                  style={{
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <p
                  className="mt-3 italic"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(33, 46, 68, 0.5)',
                  }}
                >
                  Premier atelier — Lyon, 2008
                </p>
              </div>
            </div>

            <NotchDivider />

            {/* Block 2: image left / text right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="block2-image order-2 lg:order-1">
                <img
                  src="/project-03.jpg"
                  alt="Visite de chantier Centre Culturel M"
                  className="w-full"
                  style={{
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <p
                  className="mt-3 italic"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(33, 46, 68, 0.5)',
                  }}
                >
                  Visite de chantier — Centre Culturel M, 2023
                </p>
              </div>
              <div className="block2-text order-1 lg:order-2">
                <p
                  className="uppercase mb-4"
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.7px',
                    lineHeight: '1.0',
                    color: '#eb7e56',
                  }}
                >
                  2015 — AUJOURD'HUI
                </p>
                <h3
                  className="uppercase font-normal mb-8"
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    lineHeight: '1.0',
                    letterSpacing: '-1.2px',
                    color: '#212e44',
                  }}
                >
                  Une croissance <em className="italic">maîtrisée</em>
                </h3>
                <p
                  className="mb-6"
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: 'rgba(33, 46, 68, 0.7)',
                  }}
                >
                  De 3 collaborateurs en 2008, l'équipe compte aujourd'hui 25
                  personnes — architectes, urbanistes, paysagistes, ingénieurs
                  structure, architectes d'intérieur. Une croissance
                  volontairement maîtrisée, qui préserve la qualité de chaque
                  projet et la proximité avec nos clients.
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: 'rgba(33, 46, 68, 0.7)',
                  }}
                >
                  En 2015, Lucas Moreau rejoint Camille Renard comme associé,
                  apportant son expertise en équipements publics et sa vision de
                  l'architecture au service du collectif.
                </p>
              </div>
            </div>

            <NotchDivider />
          </div>
        </section>

        {/* Section 3: Notre Philosophie */}
        <section
          style={{
            backgroundColor: '#212e44',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
          className="px-content"
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
              PHILOSOPHIE
            </p>
            <h2
              className="philosophy-headline uppercase font-normal text-center"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#e4ceac',
              }}
            >
              Ce en quoi nous <em className="italic">croyons</em>
            </h2>

            {/* 3-column values grid */}
            <div
              className="values-grid grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24"
              style={{ marginTop: '8rem' }}
            >
              <div className="value-col text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-6">
                  <Sun size={40} color="#eb7e56" strokeWidth={1.5} />
                </div>
                <h4
                  className="uppercase font-normal mb-4"
                  style={{
                    fontSize: '30px',
                    lineHeight: '1.0',
                    letterSpacing: '-0.9px',
                    color: '#e4ceac',
                  }}
                >
                  La Lumière comme Matériau
                </h4>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: 'rgba(228, 206, 172, 0.7)',
                  }}
                >
                  Nous concevons chaque espace en fonction de la lumière qu'il
                  recevra. L'orientation, les ouvertures, les matériaux — tout
                  est pensé pour que la lumière naturelle devienne le premier
                  élément architectural.
                </p>
              </div>

              <div className="value-col text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-6">
                  <Leaf size={40} color="#eb7e56" strokeWidth={1.5} />
                </div>
                <h4
                  className="uppercase font-normal mb-4"
                  style={{
                    fontSize: '30px',
                    lineHeight: '1.0',
                    letterSpacing: '-0.9px',
                    color: '#e4ceac',
                  }}
                >
                  Architecture Durable
                </h4>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: 'rgba(228, 206, 172, 0.7)',
                  }}
                >
                  Chaque projet intègre une démarche environnementale : choix
                  des matériaux, performance énergétique, gestion de l'eau,
                  biodiversité. Nous visons la neutralité carbone à l'horizon
                  2030 pour l'ensemble de nos constructions.
                </p>
              </div>

              <div className="value-col text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-6">
                  <Heart size={40} color="#eb7e56" strokeWidth={1.5} />
                </div>
                <h4
                  className="uppercase font-normal mb-4"
                  style={{
                    fontSize: '30px',
                    lineHeight: '1.0',
                    letterSpacing: '-0.9px',
                    color: '#e4ceac',
                  }}
                >
                  Le Lieu avant Tout
                </h4>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: 'rgba(228, 206, 172, 0.7)',
                  }}
                >
                  Nous ne transportons pas un style d'un projet à l'autre.
                  Chaque construction naît de son terrain, de son climat, de son
                  histoire. Le contexte est notre premier inspirateur.
                </p>
              </div>
            </div>

            {/* Philosophy Quote */}
            <div
              className="philosophy-quote text-center mx-auto"
              style={{ marginTop: '10rem', maxWidth: '800px' }}
            >
              <p
                className="font-normal"
                style={{
                  fontSize: '80px',
                  lineHeight: '1.0',
                  color: '#eb7e56',
                  opacity: 0.3,
                }}
              >
                &ldquo;
              </p>
              <p
                className="italic -mt-6"
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.9px',
                  color: '#e4ceac',
                }}
              >
                L'architecture est le jeu savant, correct et magnifique des
                volumes assemblés sous la lumière.
              </p>
              <p
                className="uppercase mt-8"
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.7px',
                  lineHeight: '1.0',
                  color: 'rgba(228, 206, 172, 0.4)',
                }}
              >
                — Le Corbusier
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: L'Équipe en Image */}
        <section
          style={{
            backgroundColor: '#e4ceac',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
          className="px-content"
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
              LE STUDIO
            </p>
            <h2
              className="studio-headline uppercase font-normal text-center"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
              }}
            >
              L'<em className="italic">équipe</em> en images
            </h2>

            {/* 2x3 Photo Grid */}
            <div
              className="studio-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto"
              style={{ marginTop: '6rem', maxWidth: '1200px' }}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="studio-photo overflow-hidden">
                  <img
                    src="/about-studio.jpg"
                    alt={`Studio atmosphere ${num}`}
                    className="w-full transition-transform duration-300 hover:scale-[1.03]"
                    style={{
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              ))}
            </div>

            <p
              className="text-center uppercase mt-8"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                lineHeight: '1.0',
                color: 'rgba(33, 46, 68, 0.4)',
              }}
            >
              Atelier Lumière — Lyon, 2025
            </p>
          </div>
        </section>

        {/* Section 5: CTA Banner */}
        <section
          style={{
            backgroundColor: '#eb7e56',
            paddingTop: '10rem',
            paddingBottom: '10rem',
          }}
          className="px-content"
        >
          <div className="cta-content max-w-container mx-auto text-center">
            <h2
              className="uppercase font-normal"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
              }}
            >
              Construisons <em className="italic">ensemble</em>
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
              Vous avez un projet ? Nous serions ravis d'en discuter avec vous.
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
              Nous Contacter
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
