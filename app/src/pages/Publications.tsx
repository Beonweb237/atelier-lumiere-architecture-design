import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink } from 'lucide-react';
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

const awards = [
  {
    year: '2024',
    name: "\u00C9querre d'Argent",
    project: 'Maison L, Lyon',
  },
  {
    year: '2023',
    name: 'Mention Spéciale — Mies Van der Rohe Award',
    project: 'Centre Culturel M, Saint-Étienne',
  },
  {
    year: '2023',
    name: 'Prix de la Première Œuvre — AJAP',
    project: 'Pavillon du Lac, Aix-les-Bains',
  },
  {
    year: '2022',
    name: 'Label Architecture Contemporaine Remarquable',
    project: 'Villa Restaurée V, Lyon',
  },
  {
    year: '2021',
    name: 'Trophées de la Construction — Catégorie Rénovation',
    project: 'Loft Saint-Antoine, Lyon',
  },
  {
    year: '2020',
    name: 'Prix AMO — Architecture Maîtrise d\'Ouvrage',
    project: 'Médiathèque du Sud, Vienne',
  },
];

const articles = [
  {
    image: '/project-01.jpg',
    title: 'Lumière et Matière : une Architecture Sensuelle',
    venue: "L'ARCHITECTURE D'AUJOURD'HUI",
    date: 'Janvier 2025',
    excerpt:
      'Camille Renard explore la relation entre la lumière naturelle et les matériaux bruts dans l\'architecture résidentielle contemporaine.',
  },
  {
    image: '/project-03.jpg',
    title: 'Le Centre Culturel M : Un Lieu de Rencontre',
    venue: 'AMC',
    date: 'Novembre 2024',
    excerpt:
      'Analyse du projet Centre Culturel M, de la programmation à la livraison, dans le contexte urbain de Saint-Étienne.',
  },
  {
    image: '/project-07.jpg',
    title: 'Rénovation Énergétique et Patrimoine : Réconcilier les Deux',
    venue: 'LE MONITEUR',
    date: 'Septembre 2024',
    excerpt:
      'Comment concilier performance énergétique et respect du patrimoine bâti : le cas de la Villa Restaurée V.',
  },
  {
    image: '/project-04.jpg',
    title: 'Architecture de Montagne : S\'intégrer sans Se Soumettre',
    venue: 'ARCHISTORM',
    date: 'Juin 2024',
    excerpt:
      'Le Refuge Alpin, une réflexion sur l\'architecture en site de montagne et son rapport au paysage.',
  },
  {
    image: '/project-09.jpg',
    title: 'Le BIM au Service de la Conception Participative',
    venue: 'CONSTRUCTION 21',
    date: 'Mars 2024',
    excerpt:
      'Paul Marchand présente la démarche BIM d\'Atelier Lumière et son impact sur la collaboration avec les maîtres d\'ouvrage.',
  },
  {
    image: '/project-12.jpg',
    title: 'Médiathèques : Nouveaux Lieux de Vie Urbaine',
    venue: 'TECHNIQUES & ARCHITECTURE',
    date: 'Janvier 2024',
    excerpt:
      'La médiathèque comme troisième lieu : entre service public et espace de sociabilité contemporaine.',
  },
];

const conferences = [
  {
    date: 'MARS 2025',
    title: "L'Architecture Résidentielle Demain",
    venue:
      'Conférence d\'ouverture — Salon de l\'Architecture de Lyon \u00B7 Camille Renard',
  },
  {
    date: 'NOVEMBRE 2024',
    title: 'BIM et Transition Écologique',
    venue: "Congrès National du BIM \u00B7 Paris \u00B7 Paul Marchand",
  },
  {
    date: 'SEPTEMBRE 2024',
    title: 'Penser le Paysage dans l\'Architecture Contemporaine',
    venue:
      'École Nationale Supérieure d\'Architecture de Lyon \u00B7 Thomas Garnier',
  },
  {
    date: 'JUIN 2024',
    title: 'Rénovation du Patrimoine : Enjeux et Méthodes',
    venue: "Journées du Patrimoine \u00B7 Lyon \u00B7 Inès Benali",
  },
  {
    date: 'MARS 2024',
    title:
      'Architecture Intérieure : De l\'Échelle du Corps à l\'Échelle de la Ville',
    venue:
      'Biennale de Design de Saint-Étienne \u00B7 Sarah Kim',
  },
];

const pressLogos = [
  "L'ARCHITECTURE D'AUJOURD'HUI",
  'AMC',
  'LE MONITEUR',
  'ARCHISTORM',
  'TECHNIQUES & ARCHITECTURE',
  'CONSTRUCTION 21',
  "L'ŒIL",
  'DOMUS',
];

const clippings = [
  {
    image: '/project-01.jpg',
    caption: "L'Architecture d'Aujourd'hui — Janvier 2025",
  },
  {
    image: '/project-03.jpg',
    caption: 'AMC — Novembre 2024',
  },
  {
    image: '/project-07.jpg',
    caption: 'Le Moniteur — Septembre 2024',
  },
];

export default function Publications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Page header animations
      gsap.to('.pub-overline', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1,
      });
      gsap.to('.pub-headline', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.25,
      });
      gsap.to('.pub-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.45,
      });

      // Awards headline
      gsap.from('.awards-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.awards-headline',
          start: 'top 85%',
        },
      });

      // Award items
      gsap.from('.award-item', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.awards-list',
          start: 'top 85%',
        },
      });

      // Articles headline
      gsap.from('.articles-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.articles-headline',
          start: 'top 85%',
        },
      });

      // Article cards
      gsap.from('.article-card', {
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.articles-grid',
          start: 'top 85%',
        },
      });

      // Conferences headline
      gsap.from('.conf-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.conf-headline',
          start: 'top 85%',
        },
      });

      // Conference entries
      gsap.from('.conf-entry', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.conf-list',
          start: 'top 85%',
        },
      });

      // Press headline + body
      gsap.from('.press-headline', {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.press-headline',
          start: 'top 85%',
        },
      });

      gsap.from('.press-body', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.press-headline',
          start: 'top 85%',
        },
      });

      // Press logos
      gsap.from('.press-logo', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.press-logos-row',
          start: 'top 85%',
        },
      });

      // Clipping thumbnails
      gsap.from('.clipping-item', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.clippings-grid',
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
              className="pub-overline uppercase mb-6 opacity-0"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                lineHeight: '1.0',
                color: '#eb7e56',
              }}
            >
              MÉDIAS & RECONNAISSANCE
            </p>
            <h1
              className="pub-headline uppercase font-normal opacity-0"
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                lineHeight: '0.85',
                letterSpacing: '-2.4px',
                color: '#212e44',
                transform: 'translateY(40px)',
              }}
            >
              Publications & <em className="italic">Distinctions</em>
            </h1>
            <p
              className="pub-subtitle mx-auto mt-8 opacity-0"
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: '-0.54px',
                color: 'rgba(33, 46, 68, 0.6)',
                maxWidth: '640px',
                transform: 'translateY(30px)',
              }}
            >
              Notre engagement pour l&apos;architecture contemporaine, reconnu
              par nos pairs et relayé par la presse
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

        {/* Section 2: Awards & Distinctions */}
        <section
          className="px-content"
          style={{
            backgroundColor: '#212e44',
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
              PRIX & DISTINCTIONS
            </p>
            <h2
              className="awards-headline uppercase font-normal text-center"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#e4ceac',
              }}
            >
              Reconnus par nos <em className="italic">pairs</em>
            </h2>

            <div
              className="awards-list mx-auto"
              style={{ marginTop: '6rem', maxWidth: '1000px' }}
            >
              {awards.map((award, i) => (
                <div key={i}>
                  <div className="award-item py-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                      <div className="md:col-span-2">
                        <p
                          className="uppercase"
                          style={{
                            fontSize: '14px',
                            letterSpacing: '0.7px',
                            lineHeight: '1.0',
                            color: '#eb7e56',
                          }}
                        >
                          {award.year}
                        </p>
                      </div>
                      <div className="md:col-span-6">
                        <p
                          className="font-normal"
                          style={{
                            fontSize: '24px',
                            letterSpacing: '-0.72px',
                            lineHeight: '1.2',
                            color: '#e4ceac',
                          }}
                        >
                          {award.name}
                        </p>
                      </div>
                      <div className="md:col-span-4">
                        <p
                          style={{
                            fontSize: '16px',
                            color: 'rgba(228, 206, 172, 0.6)',
                          }}
                        >
                          {award.project}
                        </p>
                      </div>
                    </div>
                  </div>
                  {i < awards.length - 1 && (
                    <div
                      style={{
                        height: '1px',
                        backgroundColor: 'rgba(233, 206, 172, 0.1)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Articles & Publications */}
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
              ARTICLES
            </p>
            <h2
              className="articles-headline uppercase font-normal text-center"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
              }}
            >
              Publications <em className="italic">récents</em>
            </h2>

            <div
              className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24"
              style={{ marginTop: '6rem' }}
            >
              {articles.map((article, i) => (
                <div key={i} className="article-card group">
                  <div
                    className="overflow-hidden mb-5"
                    style={{ borderRadius: '4px' }}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <h3
                    className="font-normal mb-3"
                    style={{
                      fontSize: '22px',
                      letterSpacing: '-0.66px',
                      lineHeight: '1.2',
                      color: '#212e44',
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="uppercase mb-2"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: '#eb7e56',
                    }}
                  >
                    {article.venue}
                  </p>
                  <p
                    className="mb-3"
                    style={{
                      fontSize: '14px',
                      color: 'rgba(33, 46, 68, 0.5)',
                    }}
                  >
                    {article.date}
                  </p>
                  <p
                    className="mb-4"
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
                    {article.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 transition-all duration-300 hover:underline"
                    style={{
                      fontSize: '16px',
                      color: '#212e44',
                    }}
                  >
                    Lire l&apos;article
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Conférences & Interventions */}
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
              CONFÉRENCES
            </p>
            <h2
              className="conf-headline uppercase font-normal text-center"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
              }}
            >
              Interventions & <em className="italic">conférences</em>
            </h2>

            <div
              className="conf-list mx-auto"
              style={{ marginTop: '6rem', maxWidth: '800px' }}
            >
              {conferences.map((conf, i) => (
                <div key={i} className="conf-entry mb-16 last:mb-0">
                  <p
                    className="uppercase mb-3"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: '#eb7e56',
                    }}
                  >
                    {conf.date}
                  </p>
                  <h3
                    className="font-normal mb-3"
                    style={{
                      fontSize: '24px',
                      letterSpacing: '-0.72px',
                      lineHeight: '1.2',
                      color: '#212e44',
                    }}
                  >
                    {conf.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'rgba(33, 46, 68, 0.6)',
                    }}
                  >
                    {conf.venue}
                  </p>
                </div>
              ))}
            </div>

            <NotchDivider />
          </div>
        </section>

        {/* Section 5: Presse */}
        <section
          className="px-content"
          style={{
            backgroundColor: '#212e44',
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
              PRESSE
            </p>
            <h2
              className="press-headline uppercase font-normal text-center"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#e4ceac',
              }}
            >
              Ils parlent de <em className="italic">nous</em>
            </h2>
            <p
              className="press-body text-center mx-auto mt-6"
              style={{
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: '-0.54px',
                color: 'rgba(228, 206, 172, 0.6)',
              }}
            >
              Retrouvez nos projets dans les magazines et journaux spécialisés.
            </p>

            {/* Press Logo Row */}
            <div
              className="press-logos-row flex flex-wrap justify-center gap-8 lg:gap-16"
              style={{ marginTop: '8rem' }}
            >
              {pressLogos.map((logo, i) => (
                <div
                  key={i}
                  className="press-logo flex items-center justify-center transition-opacity duration-300 hover:opacity-100"
                  style={{
                    width: '200px',
                    opacity: 0.4,
                  }}
                >
                  <span
                    className="uppercase text-center font-normal"
                    style={{
                      fontSize: '20px',
                      letterSpacing: '-0.6px',
                      color: '#e4ceac',
                    }}
                  >
                    {logo}
                  </span>
                </div>
              ))}
            </div>

            {/* Clipping Thumbnails */}
            <div
              className="clippings-grid grid grid-cols-1 sm:grid-cols-3 gap-8 mx-auto"
              style={{ marginTop: '8rem', maxWidth: '1000px' }}
            >
              {clippings.map((clip, i) => (
                <div key={i} className="clipping-item text-center">
                  <div
                    className="overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
                    style={{
                      borderRadius: '4px',
                      border: '1px solid rgba(233, 206, 172, 0.1)',
                    }}
                  >
                    <img
                      src={clip.image}
                      alt={clip.caption}
                      className="w-full"
                      style={{
                        aspectRatio: '3/4',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <p
                    className="uppercase mt-4"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: 'rgba(228, 206, 172, 0.5)',
                    }}
                  >
                    {clip.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
