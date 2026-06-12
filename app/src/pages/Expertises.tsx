import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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
/*  Expertise data                                                    */
/* ------------------------------------------------------------------ */
interface ExpertiseData {
  overline: string;
  headline: string;
  headlineItalic: string;
  body1: string;
  body2: string;
  specLabel: string;
  specValue: string;
  image: string;
  caption: string;
  imageOnLeft: boolean;
}

const expertises: ExpertiseData[] = [
  {
    overline: 'RÉSIDENTIEL',
    headline: 'Maisons ',
    headlineItalic: 'individuelles',
    body1: 'Conception sur mesure de maisons individuelles, de l\'esquisse à la livraison. Chaque projet est une réponse unique au terrain, à l\'orientation, et aux aspirations de ses habitants.',
    body2: 'Nous concevons des espaces durables, performants énergétiquement, et profondément liés à leur environnement. Du premier croquis au parfait achèvement, nous accompagnons nos clients à chaque étape.',
    specLabel: 'Typologie',
    specValue: 'maisons neuves, extensions, surélévations',
    image: '/project-01.jpg',
    caption: 'Maison L — Lyon, 2024',
    imageOnLeft: true,
  },
  {
    overline: 'PUBLIC',
    headline: 'Équipements ',
    headlineItalic: 'publics',
    body1: 'Équipements culturels, éducatifs, sportifs et administratifs. Nous créons des lieux qui enrichissent le tissu urbain, favorisent les rencontres, et améliorent la qualité de vie des usagers.',
    body2: 'Notre démarche intègre la concertation avec les élus, les services techniques, et les futurs usagers dès la phase programmation.',
    specLabel: 'Typologie',
    specValue: 'médiathèques, centres culturels, écoles, mairies',
    image: '/project-03.jpg',
    caption: 'Centre Culturel M — 2023',
    imageOnLeft: false,
  },
  {
    overline: 'RÉNOVATION',
    headline: 'Rénovation & ',
    headlineItalic: 'restauration',
    body1: 'Réhabilitation de bâtiments anciens, extensions contemporaines, restauration du patrimoine. Nous conjuguant respect de l\'existant et audace architecturale.',
    body2: 'Chaque intervention sur un bâtiment existant commence par un diagnostic approfondi : structure, matériaux, pathologies. Nous proposons des solutions qui préservent l\'âme du lieu tout en répondant aux normes contemporaines.',
    specLabel: 'Typologie',
    specValue: 'rénovation complète, extension, restauration MH',
    image: '/project-07.jpg',
    caption: 'Villa Restaurée V — 2022',
    imageOnLeft: true,
  },
  {
    overline: 'INTÉRIEUR',
    headline: 'Architecture ',
    headlineItalic: 'intérieure',
    body1: 'Aménagement intérieur, scénographie, design de mobilier sur mesure. Nous pensons l\'intérieur comme un prolongement de l\'architecture — dans la continuité des matériaux, de la lumière, et de l\'esprit du lieu.',
    body2: 'De la boutique au restaurant, de l\'hôtel particulier au loft, chaque espace intérieur raconte une histoire.',
    specLabel: 'Typologie',
    specValue: 'boutiques, hôtels, restaurants, logements',
    image: '/project-05.jpg',
    caption: 'Boutique Hôtel L\'Ours — 2023',
    imageOnLeft: false,
  },
  {
    overline: 'PAYSAGE',
    headline: 'Paysage & ',
    headlineItalic: 'urbanisme',
    body1: 'Aménagement de jardins privés et d\'espaces publics, études urbaines, plans de circulation. L\'échelle du territoire informe celle de l\'architecture.',
    body2: 'Nous concevons le paysage comme un matériau à part entière — il structure l\'espace, guide la circulation, et crée des ambiances. Chaque projet paysager s\'intègre dans une démarche environnementale globale.',
    specLabel: 'Typologie',
    specValue: 'jardins privés, espaces publics, études urbaines',
    image: '/project-09.jpg',
    caption: 'Pavillon du Lac — 2021',
    imageOnLeft: true,
  },
  {
    overline: 'CONSEIL',
    headline: 'BIM & ',
    headlineItalic: 'conseil',
    body1: 'Maîtrise d\'œuvre, assistance à maîtrise d\'ouvrage, conseil réglementaire et environnemental. Notre expertise technique accompagne les porteurs de projet à toutes les échelles.',
    body2: 'Nous assurons la conformité réglementaire (RT2012, RE2020, accessibilité) et proposons des démarches de certification environnementale (HQE, BREEAM, BBCA).',
    specLabel: 'Certifications',
    specValue: 'OPQIBI, Ordre des Architectes',
    image: '/project-12.jpg',
    caption: 'Médiathèque du Sud — 2020',
    imageOnLeft: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Expertise Block                                                   */
/* ------------------------------------------------------------------ */
function ExpertiseBlock({
  data,
  index,
}: {
  data: ExpertiseData;
  index: number;
}) {
  const imgClass = `exp-img-${index}`;
  const txtClass = `exp-txt-${index}`;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-[1200px] mx-auto">
        {/* Image column */}
        <div
          className={`${imgClass} ${data.imageOnLeft ? 'md:order-1' : 'md:order-2'}`}
        >
          <img
            src={data.image}
            alt={data.caption}
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
            {data.caption}
          </p>
        </div>

        {/* Text column */}
        <div
          className={`${txtClass} ${data.imageOnLeft ? 'md:order-2' : 'md:order-1'}`}
        >
          <p
            className="uppercase"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              color: '#eb7e56',
              marginBottom: '1.5rem',
            }}
          >
            {data.overline}
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
            {data.headline}
            <em className="italic">{data.headlineItalic}</em>
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
            {data.body1}
          </p>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.4',
              letterSpacing: '-0.54px',
              color: '#212e44',
              marginBottom: '2rem',
            }}
          >
            {data.body2}
          </p>
          <div className="flex flex-wrap items-baseline gap-2">
            <span
              className="uppercase"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                color: 'rgba(33, 46, 68, 0.5)',
              }}
            >
              {data.specLabel} :
            </span>
            <span
              style={{
                fontSize: '18px',
                letterSpacing: '-0.54px',
                color: '#212e44',
              }}
            >
              {data.specValue}
            </span>
          </div>
        </div>
      </div>
      <NotchDivider />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Expertises Page                                                   */
/* ------------------------------------------------------------------ */
export default function Expertises() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ---- Page load animations ---- */
      gsap.to('.exp-overline', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to('.exp-headline', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power2.out',
      });
      gsap.to('.exp-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.35,
        ease: 'power2.out',
      });

      /* ---- Each expertise block ---- */
      expertises.forEach((_, i) => {
        gsap.from(`.exp-img-${i}`, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: `.exp-img-${i}`,
            start: 'top 85%',
          },
        });
        gsap.from(`.exp-txt-${i}`, {
          y: 80,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: `.exp-txt-${i}`,
            start: 'top 85%',
          },
        });
      });

      /* ---- CTA banner ---- */
      gsap.from('.exp-cta-headline', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.exp-cta-section',
          start: 'top 80%',
        },
      });
      gsap.from('.exp-cta-body', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.exp-cta-section',
          start: 'top 80%',
        },
      });
      gsap.from('.exp-cta-btn', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.exp-cta-section',
          start: 'top 80%',
        },
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
            className="exp-overline uppercase opacity-0"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              color: '#eb7e56',
              marginBottom: '1.5rem',
            }}
          >
            SAVOIR-FAIRE
          </p>
          <h1
            className="exp-headline uppercase font-normal opacity-0"
            style={{
              fontSize: '80px',
              lineHeight: '0.85',
              letterSpacing: '-2.4px',
              color: '#212e44',
              transform: 'translateY(40px)',
              marginBottom: '1.5rem',
            }}
          >
            Nos <em className="italic">Expertises</em>
          </h1>
          <p
            className="exp-subtitle opacity-0"
            style={{
              fontSize: '18px',
              lineHeight: '1.4',
              letterSpacing: '-0.54px',
              color: 'rgba(33, 46, 68, 0.6)',
              maxWidth: '600px',
              transform: 'translateY(30px)',
            }}
          >
            Six domaines de compétence au service de l'architecture contemporaine
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
        {/* SECTIONS 2-7 — Expertise Blocks                               */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: '#e4ceac',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
        >
          <div className="px-content">
            {expertises.map((exp, i) => (
              <ExpertiseBlock key={exp.overline} data={exp} index={i} />
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 8 — CTA Banner                                        */}
        {/* ============================================================ */}
        <section
          className="exp-cta-section flex flex-col items-center justify-center text-center"
          style={{
            backgroundColor: '#212e44',
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
        >
          <div className="max-w-container mx-auto px-content">
            <h2
              className="exp-cta-headline uppercase font-normal"
              style={{
                fontSize: '60px',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#e4ceac',
                marginBottom: '2rem',
              }}
            >
              Un projet en <em className="italic">tête ?</em>
            </h2>
            <p
              className="exp-cta-body mx-auto"
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: '-0.54px',
                color: 'rgba(228, 206, 172, 0.8)',
                maxWidth: '600px',
                marginBottom: '3rem',
              }}
            >
              Quelle que soit l'échelle de votre ambition, nous avons l'expertise pour vous accompagner. Parlons-en.
            </p>
            <Link
              to="/contact"
              className="exp-cta-btn inline-block px-8 py-3 text-sm font-medium transition-opacity duration-300 hover:opacity-90"
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
      </div>
    </Layout>
  );
}
