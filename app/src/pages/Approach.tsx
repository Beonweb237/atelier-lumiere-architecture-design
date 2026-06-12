import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Layers, Zap, Users } from 'lucide-react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Notch divider motif                                               */
/* ------------------------------------------------------------------ */
function NotchDivider() {
  return (
    <div className="flex flex-col items-center py-16">
      <div
        className="rounded-full"
        style={{
          width: '40px',
          height: '12px',
          backgroundColor: '#947955',
        }}
      />
      <div
        className="w-full mt-3"
        style={{
          height: '1px',
          backgroundColor: 'rgba(33, 46, 68, 0.1)',
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline step data                                                */
/* ------------------------------------------------------------------ */
const timelineSteps = [
  {
    num: '01',
    title: 'Écoute',
    desc: 'Comprendre vos besoins, le terrain, et la lumière',
  },
  {
    num: '02',
    title: 'Esquisse',
    desc: 'Premières propositions, esquisses à main levée',
  },
  {
    num: '03',
    title: 'Conception',
    desc: 'Plans, maquettes BIM, choix des matériaux',
  },
  {
    num: '04',
    title: 'Suivi',
    desc: 'Consultation des entreprises, réunions de chantier',
  },
  {
    num: '05',
    title: 'Livraison',
    desc: 'Réception, parfait achèvement, un an de garantie',
  },
];

const testimonials = [
  {
    quote:
      'Atelier Lumière a su transformer un terrain difficile en une maison lumineuse où il fait bon vivre. Leur écoute et leur rigueur ont fait toute la différence.',
    name: 'Marie & Thomas L.',
    project: 'MAISON L',
  },
  {
    quote:
      'La maquette BIM nous a permis de visualiser notre loft avant les travaux. Nous avons pu ajuster chaque détail en amont, sans surprise sur le chantier.',
    name: 'Sophie D.',
    project: 'LOFT SAINT-ANTOINE',
  },
  {
    quote:
      'Un cabinet d\'architecture à l\'écoute des contraintes budgétaires et environnementales. Le centre culturel est devenu un lieu emblématique de notre ville.',
    name: 'Jean-Marc P., Maire',
    project: 'CENTRE CULTUREL M',
  },
];

const bimFeatures = [
  {
    icon: Layers,
    title: 'Modélisation 3D',
    body: 'Maquettes numériques détaillées dès l\'esquisse. Visualisation immersive du projet avant la première pierre.',
  },
  {
    icon: Zap,
    title: 'Performance Énergétique',
    body: 'Simulations thermiques et lumineuses intégrées au modèle. Conformité RE2020 et certifications HQE, BREEAM.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    body: 'Plateforme collaborative partagée avec tous les intervenants : maître d\'ouvrage, BET, entreprises, administration.',
  },
];

/* ------------------------------------------------------------------ */
/*  Approach Page                                                     */
/* ------------------------------------------------------------------ */
export default function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ---- Page load animations ---- */
      gsap.to('.approach-overline', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to('.approach-headline', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power2.out',
      });
      gsap.to('.approach-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.35,
        ease: 'power2.out',
      });

      /* ---- Section 2: headline ---- */
      gsap.from('.process-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-headline',
          start: 'top 85%',
        },
      });

      /* ---- Timeline nodes staggered ---- */
      gsap.from('.timeline-node', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-wrap',
          start: 'top 80%',
        },
      });

      /* ---- Timeline line fill ---- */
      gsap.fromTo(
        '.timeline-line-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-wrap',
            start: 'top 75%',
          },
        }
      );

      /* ---- Editorial blocks ---- */
      gsap.from('.editorial-text-1', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.editorial-text-1', start: 'top 85%' },
      });
      gsap.from('.editorial-img-1', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.editorial-img-1', start: 'top 85%' },
      });
      gsap.from('.editorial-img-2', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.editorial-img-2', start: 'top 85%' },
      });
      gsap.from('.editorial-text-2', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.editorial-text-2', start: 'top 85%' },
      });

      /* ---- BIM section ---- */
      gsap.from('.bim-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.bim-headline', start: 'top 85%' },
      });
      gsap.from('.bim-intro', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.bim-intro', start: 'top 85%' },
      });
      gsap.from('.bim-col', {
        y: 60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.bim-grid', start: 'top 80%' },
      });
      gsap.from('.bim-cta', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.bim-cta', start: 'top 90%' },
      });

      /* ---- Testimonials ---- */
      gsap.from('.testi-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.testi-headline', start: 'top 85%' },
      });
      gsap.from('.testi-card', {
        y: 60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.testi-grid', start: 'top 80%' },
      });
    },
    { scope: containerRef }
  );

  return (
    <Layout>
      <div ref={containerRef}>
        {/* ============================================================ */}
        {/* SECTION 1 — Page Header                                       */}
        {/* ============================================================ */}
        <section
          className="flex flex-col items-center justify-center text-center"
          style={{
            minHeight: '60vh',
            backgroundColor: '#e4ceac',
            paddingTop: '120px',
          }}
        >
          <p
            className="approach-overline uppercase opacity-0"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              color: '#eb7e56',
              marginBottom: '1.5rem',
            }}
          >
            MÉTHODOLOGIE
          </p>
          <h1
            className="approach-headline uppercase font-normal opacity-0"
            style={{
              fontSize: '80px',
              lineHeight: '0.85',
              letterSpacing: '-2.4px',
              color: '#212e44',
              transform: 'translateY(40px)',
              marginBottom: '1.5rem',
            }}
          >
            Notre <em className="italic">Approche</em>
          </h1>
          <p
            className="approach-subtitle opacity-0"
            style={{
              fontSize: '18px',
              lineHeight: '1.4',
              letterSpacing: '-0.54px',
              color: 'rgba(33, 46, 68, 0.6)',
              maxWidth: '560px',
              transform: 'translateY(30px)',
            }}
          >
            Un processus rigoureux au service de la création
          </p>
          <div
            className="mt-12"
            style={{
              width: '160px',
              height: '1px',
              backgroundColor: 'rgba(33, 46, 68, 0.1)',
            }}
          />
        </section>

        {/* ============================================================ */}
        {/* SECTION 2 — Process Timeline                                  */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: '#e4ceac',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
        >
          <div className="max-w-container mx-auto px-content">
            <p
              className="text-label uppercase text-center"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                color: '#212e44',
                marginBottom: '1.5rem',
              }}
            >
              PROCESSUS
            </p>
            <h2
              className="process-headline uppercase font-normal text-center"
              style={{
                fontSize: '60px',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
                marginBottom: '8rem',
              }}
            >
              Cinq étapes, un <em className="italic">projet</em>
            </h2>

            {/* Timeline */}
            <div className="timeline-wrap relative hidden md:block">
              {/* Horizontal track */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: '24px',
                  height: '1px',
                  backgroundColor: 'rgba(33, 46, 68, 0.15)',
                }}
              >
                {/* Animated fill */}
                <div
                  className="timeline-line-fill absolute left-0 top-0 h-full origin-left"
                  style={{ backgroundColor: '#eb7e56', width: '100%' }}
                />
              </div>

              {/* Nodes */}
              <div className="relative flex justify-between">
                {timelineSteps.map((step) => (
                  <div
                    key={step.num}
                    className="timeline-node flex flex-col items-center text-center"
                    style={{ width: '18%' }}
                  >
                    {/* Numbered circle */}
                    <div
                      className="flex items-center justify-center font-normal transition-transform duration-300"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#eb7e56',
                        color: '#f9f6f0',
                        fontSize: '14px',
                        letterSpacing: '0.7px',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {step.num}
                    </div>
                    {/* Title */}
                    <h4
                      className="uppercase font-normal"
                      style={{
                        fontSize: '18px',
                        letterSpacing: '-0.54px',
                        color: '#212e44',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {step.title}
                    </h4>
                    {/* Description */}
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: 'rgba(33, 46, 68, 0.6)',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical stack */}
            <div className="md:hidden flex flex-col gap-12">
              {timelineSteps.map((step) => (
                <div
                  key={step.num}
                  className="timeline-node flex items-start gap-6"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center font-normal"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#eb7e56',
                      color: '#f9f6f0',
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4
                      className="uppercase font-normal"
                      style={{
                        fontSize: '18px',
                        letterSpacing: '-0.54px',
                        color: '#212e44',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: 'rgba(33, 46, 68, 0.6)',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3 — Editorial Split                                   */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: '#e4ceac',
            paddingTop: '0',
            paddingBottom: '15rem',
          }}
        >
          <div className="max-w-container mx-auto px-content">
            {/* Block 1: text left / image right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="editorial-text-1">
                <p
                  className="uppercase"
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.7px',
                    color: '#eb7e56',
                    marginBottom: '1.5rem',
                  }}
                >
                  CONCEPTION
                </p>
                <h3
                  className="uppercase font-normal"
                  style={{
                    fontSize: '40px',
                    lineHeight: '1.0',
                    letterSpacing: '-1.2px',
                    color: '#212e44',
                    marginBottom: '2rem',
                  }}
                >
                  Chaque projet commence par un <em className="italic">dessin</em>
                </h3>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: '#212e44',
                    marginBottom: '1.5rem',
                  }}
                >
                  Avant les logiciels, il y a la main. Nos architectes esquissent chaque projet à main levée, en réunion avec le client. Ces premiers dessins capturent l'essence du lieu — l'orientation, la topographie, les vues — et posent les fondations de toute la construction à venir.
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: '#212e44',
                  }}
                >
                  L'esquisse n'est pas une étape : c'est une méthode. Nous revenons au dessin à chaque impasse, à chaque question.
                </p>
              </div>
              <div className="editorial-img-1">
                <img
                  src="/project-05.jpg"
                  alt="Esquisse préliminaire — Maison L"
                  className="w-full"
                  style={{ aspectRatio: '4/3', objectFit: 'cover', borderRadius: '4px' }}
                />
                <p
                  className="mt-3 italic"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(33, 46, 68, 0.5)',
                  }}
                >
                  Esquisse préliminaire — Maison L
                </p>
              </div>
            </div>

            <NotchDivider />

            {/* Block 2: image left / text right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="editorial-img-2 order-2 md:order-1">
                <img
                  src="/project-03.jpg"
                  alt="Réunion de chantier — Centre Culturel M"
                  className="w-full"
                  style={{ aspectRatio: '4/3', objectFit: 'cover', borderRadius: '4px' }}
                />
                <p
                  className="mt-3 italic"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(33, 46, 68, 0.5)',
                  }}
                >
                  Réunion de chantier — Centre Culturel M
                </p>
              </div>
              <div className="editorial-text-2 order-1 md:order-2">
                <p
                  className="uppercase"
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.7px',
                    color: '#eb7e56',
                    marginBottom: '1.5rem',
                  }}
                >
                  SUIVI DE CHANTIER
                </p>
                <h3
                  className="uppercase font-normal"
                  style={{
                    fontSize: '40px',
                    lineHeight: '1.0',
                    letterSpacing: '-1.2px',
                    color: '#212e44',
                    marginBottom: '2rem',
                  }}
                >
                  Présents de la première pierre à la <em className="italic">livraison</em>
                </h3>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: '#212e44',
                    marginBottom: '1.5rem',
                  }}
                >
                  Nous ne concevons pas de plans que nous ne suivons pas. Chaque projet dispose d'un architecte référent présent sur le chantier, des réunions de lancement au parfait achèvement. Cette continuité garantit la fidélité du bâtiment à l'intention de conception.
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    letterSpacing: '-0.54px',
                    color: '#212e44',
                  }}
                >
                  Nos clients ont un interlocuteur unique du début à la fin.
                </p>
              </div>
            </div>

            <NotchDivider />
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4 — BIM & Outils Numériques (dark)                    */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: '#212e44',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
        >
          <div className="max-w-container mx-auto px-content text-center">
            <p
              className="uppercase"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                color: '#eb7e56',
                marginBottom: '1.5rem',
              }}
            >
              TECHNOLOGIE
            </p>
            <h2
              className="bim-headline uppercase font-normal"
              style={{
                fontSize: '60px',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#e4ceac',
                marginBottom: '2rem',
              }}
            >
              BIM : construire en <em className="italic">3D</em> avant de construire
            </h2>
            <p
              className="bim-intro mx-auto"
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: '-0.54px',
                color: 'rgba(228, 206, 172, 0.8)',
                maxWidth: '800px',
              }}
            >
              Atelier Lumière maîtrise la maquette numérique BIM (Building Information Modeling) depuis 2018. Chaque projet est modélisé en trois dimensions dès la phase esquisse, permettant de détecter les conflits, optimiser les performances énergétiques, et communiquer visuellement avec tous les intervenants.
            </p>

            {/* 3-column feature grid */}
            <div
              className="bim-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24"
              style={{ marginTop: '8rem' }}
            >
              {bimFeatures.map((feat) => (
                <div key={feat.title} className="bim-col flex flex-col items-center text-center">
                  <feat.icon
                    size={40}
                    style={{ color: '#eb7e56', marginBottom: '1.5rem' }}
                  />
                  <h4
                    className="uppercase font-normal"
                    style={{
                      fontSize: '30px',
                      lineHeight: '1.0',
                      letterSpacing: '-0.9px',
                      color: '#e4ceac',
                      marginBottom: '1rem',
                    }}
                  >
                    {feat.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.4',
                      letterSpacing: '-0.54px',
                      color: 'rgba(228, 206, 172, 0.7)',
                    }}
                  >
                    {feat.body}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bim-cta" style={{ marginTop: '10rem' }}>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.4',
                  letterSpacing: '-0.54px',
                  color: 'rgba(228, 206, 172, 0.6)',
                  marginBottom: '2rem',
                }}
              >
                Vous avez un projet ? Découvrez comment nous pouvons vous accompagner.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 text-sm font-medium transition-opacity duration-300 hover:opacity-90"
                style={{
                  backgroundColor: '#eb7e56',
                  color: '#212e44',
                  borderRadius: '25px',
                }}
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5 — Testimonials                                      */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: '#e4ceac',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
        >
          <div className="max-w-container mx-auto px-content">
            <p
              className="text-label uppercase text-center"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                color: '#212e44',
                marginBottom: '1.5rem',
              }}
            >
              TÉMOIGNAGES
            </p>
            <h2
              className="testi-headline uppercase font-normal text-center"
              style={{
                fontSize: '60px',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
                marginBottom: '8rem',
              }}
            >
              Ce que nos clients <em className="italic">disent</em>
            </h2>

            <div className="testi-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
              {testimonials.map((t) => (
                <div key={t.name} className="testi-card flex flex-col">
                  {/* Decorative quote */}
                  <span
                    style={{
                      fontSize: '80px',
                      lineHeight: '1',
                      color: '#eb7e56',
                      opacity: 0.3,
                      fontFamily: 'Inter, serif',
                      marginBottom: '-0.5rem',
                    }}
                  >
                    &ldquo;
                  </span>
                  <p
                    style={{
                      fontSize: '22px',
                      lineHeight: '1.5',
                      letterSpacing: '-0.66px',
                      color: '#212e44',
                      marginBottom: '2rem',
                    }}
                  >
                    {t.quote}
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <p
                      className="font-medium"
                      style={{
                        fontSize: '18px',
                        color: '#212e44',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="uppercase"
                      style={{
                        fontSize: '14px',
                        letterSpacing: '0.7px',
                        color: '#eb7e56',
                      }}
                    >
                      {t.project}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
