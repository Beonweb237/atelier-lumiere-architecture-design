import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Filter } from 'lucide-react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Project {
  id: number;
  slug: string;
  name: string;
  category: string;
  year: number;
  location: string;
  image: string;
  typology: string;
  program: string;
  status: string;
  distinction: boolean;
}

const PROJECTS: Project[] = [
  { id: 1, slug: 'maison-l', name: 'Maison L', category: 'RÉSIDENTIEL', year: 2024, location: 'Lyon', image: '/project-01.jpg', typology: 'logement', program: 'neuf', status: 'livré', distinction: true },
  { id: 2, slug: 'loft-saint-antoine', name: 'Loft Saint-Antoine', category: 'RÉNOVATION', year: 2024, location: 'Paris', image: '/project-02.jpg', typology: 'logement', program: 'rénovation', status: 'livré', distinction: false },
  { id: 3, slug: 'centre-culturel-m', name: 'Centre Culturel M', category: 'PUBLIC', year: 2023, location: 'Marseille', image: '/project-03.jpg', typology: 'culture', program: 'neuf', status: 'livré', distinction: true },
  { id: 4, slug: 'refuge-alpin', name: 'Refuge Alpin', category: 'HÔTELLERIE', year: 2023, location: 'Chamonix', image: '/project-04.jpg', typology: 'équipement', program: 'neuf', status: 'livré', distinction: false },
  { id: 5, slug: 'boutique-hotel-l-ours', name: "Boutique Hôtel L'Ours", category: 'INTÉRIEUR', year: 2023, location: 'Bordeaux', image: '/project-05.jpg', typology: 'logement', program: 'rénovation', status: 'livré', distinction: true },
  { id: 6, slug: 'siege-social-techvert', name: 'Siège Social TechVert', category: 'BUREAUX', year: 2022, location: 'Nantes', image: '/project-06.jpg', typology: 'bureaux', program: 'neuf', status: 'livré', distinction: false },
  { id: 7, slug: 'villa-restaurée-v', name: 'Villa Restaurée V', category: 'RÉNOVATION', year: 2022, location: 'Lyon', image: '/project-07.jpg', typology: 'logement', program: 'rénovation', status: 'livré', distinction: true },
  { id: 8, slug: 'residence-jardins', name: 'Résidence Jardins', category: 'RÉSIDENTIEL', year: 2022, location: 'Strasbourg', image: '/project-08.jpg', typology: 'logement', program: 'neuf', status: 'livré', distinction: false },
  { id: 9, slug: 'pavillon-du-lac', name: 'Pavillon du Lac', category: 'PUBLIC', year: 2021, location: 'Annecy', image: '/project-09.jpg', typology: 'culture', program: 'neuf', status: 'livré', distinction: true },
  { id: 10, slug: 'micro-logements-z', name: 'Micro-Logements Z', category: 'URBAINE', year: 2021, location: 'Paris', image: '/project-10.jpg', typology: 'urbanisme', program: 'neuf', status: 'livré', distinction: false },
  { id: 11, slug: 'domaine-viticole-r', name: 'Domaine Viticole R', category: 'RÉSIDENTIEL', year: 2021, location: 'Aix-en-Provence', image: '/project-11.jpg', typology: 'logement', program: 'extension', status: 'livré', distinction: true },
  { id: 12, slug: 'mediatheque-du-sud', name: 'Médiathèque du Sud', category: 'PUBLIC', year: 2020, location: 'Toulouse', image: '/project-12.jpg', typology: 'équipement', program: 'neuf', status: 'livré', distinction: false },
];

/* ------------------------------------------------------------------ */
/*  Filter definitions                                                  */
/* ------------------------------------------------------------------ */

interface FilterGroup {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    key: 'typology',
    label: 'Typologie',
    options: [
      { value: 'logement', label: 'Logement' },
      { value: 'bureaux', label: 'Bureaux' },
      { value: 'culture', label: 'Culture' },
      { value: 'équipement', label: 'Équipement' },
      { value: 'urbanisme', label: 'Urbanisme' },
    ],
  },
  {
    key: 'program',
    label: 'Programme',
    options: [
      { value: 'neuf', label: 'Neuf' },
      { value: 'rénovation', label: 'Rénovation' },
      { value: 'extension', label: 'Extension' },
    ],
  },
  {
    key: 'status',
    label: 'Statut',
    options: [
      { value: 'livré', label: 'Livré' },
      { value: 'en cours', label: 'En cours' },
      { value: 'concours', label: 'Concours' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Projects Page                                                      */
/* ------------------------------------------------------------------ */

export default function Projects() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    typology: [],
    program: [],
    status: [],
    distinction: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* ---- filtering logic ---- */
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (activeFilters.typology.length > 0 && !activeFilters.typology.includes(p.typology)) return false;
      if (activeFilters.program.length > 0 && !activeFilters.program.includes(p.program)) return false;
      if (activeFilters.status.length > 0 && !activeFilters.status.includes(p.status)) return false;
      if (activeFilters.distinction.length > 0 && !activeFilters.distinction.includes(String(p.distinction))) return false;
      return true;
    });
  }, [activeFilters]);

  const toggleFilter = useCallback((groupKey: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[groupKey];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [groupKey]: updated };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({ typology: [], program: [], status: [], distinction: [] });
  }, []);

  const activeCount = useMemo(
    () => Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0),
    [activeFilters]
  );

  /* ---- GSAP animations ---- */
  useGSAP(() => {
    if (!heroRef.current || !planeRef.current || !titleRef.current) return;

    /* Hero plane scroll animation */
    gsap.to(planeRef.current, {
      y: '-10vh',
      z: 1000,
      rotateY: -10,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '70% top',
        scrub: 1,
      },
    });

    /* Title + filters entrance */
    gsap.from(titleRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heroRef.current,
        start: '40% top',
        end: '70% top',
        scrub: 1,
      },
    });
  }, { scope: heroRef });

  /* Grid entrance animations */
  useGSAP(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: gridRef, dependencies: [filteredProjects] });

  /* CTA entrance */
  useGSAP(() => {
    if (!ctaRef.current) return;

    const children = ctaRef.current.children;
    gsap.from(children, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: ctaRef });

  /* ---- animate filter changes ---- */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' }
    );
  }, [filteredProjects]);

  return (
    <Layout>
      {/* ======== SECTION 1: HERO ======== */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          height: '70vh',
          backgroundColor: '#e4ceac',
          perspective: '1200px',
        }}
      >
        {/* Dimensional Plane */}
        <div
          ref={planeRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-600px) rotateY(-20deg) translateY(-80vh)',
            opacity: 0.7,
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: '60%',
              maxWidth: '900px',
              aspectRatio: '16 / 9',
              borderRadius: '4px',
            }}
          >
            <img
              src="/project-07.jpg"
              alt="Projet architectural en vedette"
              className="w-full h-full object-cover"
              style={{ transform: 'scale(2)', transformOrigin: 'center center' }}
            />
          </div>
        </div>

        {/* Title Overlay */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, paddingTop: '10vh' }}
        >
          <span
            className="uppercase mb-4"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              color: '#947955',
              lineHeight: '1.0',
            }}
          >
            PORTFOLIO
          </span>
          <h1
            className="uppercase font-normal text-center"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: '0.85',
              letterSpacing: '-2.4px',
              color: '#212e44',
            }}
          >
            Nos <em className="italic">Réalisations</em>
          </h1>
        </div>
      </div>

      {/* ======== SECTION 2: PROJECT GRID ======== */}
      <div style={{ backgroundColor: '#e4ceac', paddingTop: '8rem', paddingBottom: '15rem' }}>
        <div className="max-w-container mx-auto px-content">
          {/* Section Header */}
          <div className="text-center" style={{ marginBottom: '6rem' }}>
            <span
              className="uppercase block mb-4"
              style={{
                fontSize: '14px',
                letterSpacing: '0.7px',
                color: '#947955',
                lineHeight: '1.0',
              }}
            >
              ARCHIVES
            </span>
            <h2
              className="uppercase font-normal"
              style={{
                fontSize: 'clamp(32px, 4vw, 60px)',
                lineHeight: '0.85',
                letterSpacing: '-1.8px',
                color: '#212e44',
              }}
            >
              Tous les <em className="italic">Projets</em>
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col items-center" style={{ marginBottom: '4rem' }}>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 px-6 py-2.5 text-sm transition-all duration-300 hover:opacity-80"
              style={{
                border: '1px solid rgba(33, 46, 68, 0.2)',
                borderRadius: '25px',
                color: '#212e44',
                letterSpacing: '0.7px',
                fontSize: '14px',
                backgroundColor: activeCount > 0 ? 'rgba(33, 46, 68, 0.05)' : 'transparent',
              }}
            >
              <Filter size={14} />
              Filtres {activeCount > 0 && `(${activeCount})`}
            </button>

            {showFilters && (
              <div
                className="w-full max-w-3xl"
                style={{ marginTop: '2rem', padding: '2rem', borderRadius: '4px', border: '1px solid rgba(33, 46, 68, 0.1)', backgroundColor: 'rgba(249, 246, 240, 0.5)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FILTER_GROUPS.map((group) => (
                    <div key={group.key}>
                      <span
                        className="uppercase block mb-3"
                        style={{ fontSize: '14px', letterSpacing: '0.7px', color: '#eb7e56', lineHeight: '1.0' }}
                      >
                        {group.label}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((opt) => {
                          const isActive = activeFilters[group.key].includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              onClick={() => toggleFilter(group.key, opt.value)}
                              className="px-4 py-1.5 text-sm transition-all duration-200"
                              style={{
                                borderRadius: '25px',
                                border: isActive ? '1px solid #212e44' : '1px solid rgba(33, 46, 68, 0.2)',
                                backgroundColor: isActive ? '#212e44' : 'transparent',
                                color: isActive ? '#e4ceac' : '#212e44',
                                fontSize: '13px',
                                letterSpacing: '0.3px',
                              }}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Distinction filter */}
                <div style={{ marginTop: '1.5rem' }}>
                  <span
                    className="uppercase block mb-3"
                    style={{ fontSize: '14px', letterSpacing: '0.7px', color: '#eb7e56', lineHeight: '1.0' }}
                  >
                    Distinction
                  </span>
                  <button
                    onClick={() => toggleFilter('distinction', 'true')}
                    className="px-4 py-1.5 text-sm transition-all duration-200"
                    style={{
                      borderRadius: '25px',
                      border: activeFilters.distinction.includes('true') ? '1px solid #212e44' : '1px solid rgba(33, 46, 68, 0.2)',
                      backgroundColor: activeFilters.distinction.includes('true') ? '#212e44' : 'transparent',
                      color: activeFilters.distinction.includes('true') ? '#e4ceac' : '#212e44',
                      fontSize: '13px',
                      letterSpacing: '0.3px',
                    }}
                  >
                    Primé
                  </button>
                </div>

                {activeCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm underline transition-opacity hover:opacity-70"
                    style={{ color: '#212e44' }}
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            )}

            {/* Active filter pills */}
            {!showFilters && activeCount > 0 && (
              <div className="flex flex-wrap gap-2 justify-center" style={{ marginTop: '1rem' }}>
                {FILTER_GROUPS.map((group) =>
                  activeFilters[group.key].map((val) => {
                    const opt = group.options.find((o) => o.value === val);
                    return (
                      <span
                        key={`${group.key}-${val}`}
                        className="flex items-center gap-1 px-3 py-1 text-xs"
                        style={{
                          borderRadius: '25px',
                          backgroundColor: '#212e44',
                          color: '#e4ceac',
                          fontSize: '12px',
                        }}
                      >
                        {opt?.label}
                        <button onClick={() => toggleFilter(group.key, val)} className="ml-1 hover:opacity-70">×</button>
                      </span>
                    );
                  })
                )}
                {activeFilters.distinction.includes('true') && (
                  <span
                    className="flex items-center gap-1 px-3 py-1 text-xs"
                    style={{
                      borderRadius: '25px',
                      backgroundColor: '#212e44',
                      color: '#e4ceac',
                      fontSize: '12px',
                    }}
                  >
                    Primé
                    <button onClick={() => toggleFilter('distinction', 'true')} className="ml-1 hover:opacity-70">×</button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results count */}
          <p
            className="text-center mb-8"
            style={{ fontSize: '14px', color: 'rgba(33, 46, 68, 0.5)', letterSpacing: '-0.54px' }}
          >
            {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''}
          </p>

          {/* Project Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: '6rem' }}
          >
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projets/${project.slug}`}
                className="project-card group block"
              >
                <div
                  className="relative overflow-hidden mb-5"
                  style={{ aspectRatio: '4 / 3', borderRadius: '4px' }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className="font-normal transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        fontSize: '24px',
                        letterSpacing: '-0.72px',
                        color: '#212e44',
                        lineHeight: '1.2',
                        opacity: 0.9,
                      }}
                    >
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className="uppercase"
                        style={{
                          fontSize: '14px',
                          letterSpacing: '0.7px',
                          color: '#eb7e56',
                          lineHeight: '1.0',
                        }}
                      >
                        {project.category}
                      </span>
                      <span style={{ color: 'rgba(33, 46, 68, 0.3)' }}>·</span>
                      <span style={{ fontSize: '14px', color: 'rgba(33, 46, 68, 0.5)' }}>
                        {project.year}
                      </span>
                    </div>
                    <p
                      className="mt-1"
                      style={{ fontSize: '14px', color: 'rgba(33, 46, 68, 0.5)', letterSpacing: '-0.54px' }}
                    >
                      {project.location}
                    </p>
                  </div>
                  {project.distinction && (
                    <span
                      className="shrink-0 px-2 py-1 text-xs uppercase"
                      style={{
                        borderRadius: '4px',
                        backgroundColor: 'rgba(235, 126, 86, 0.15)',
                        color: '#eb7e56',
                        fontSize: '11px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Primé
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p style={{ fontSize: '18px', color: 'rgba(33, 46, 68, 0.5)', letterSpacing: '-0.54px' }}>
                Aucun projet ne correspond aux filtres sélectionnés.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm underline transition-opacity hover:opacity-70"
                style={{ color: '#eb7e56' }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ======== SECTION 3: CTA BANNER ======== */}
      <div
        style={{
          backgroundColor: '#eb7e56',
          paddingTop: '10rem',
          paddingBottom: '10rem',
        }}
      >
        <div ref={ctaRef} className="max-w-container mx-auto px-content text-center">
          <h2
            className="uppercase font-normal"
            style={{
              fontSize: 'clamp(32px, 4vw, 60px)',
              lineHeight: '0.85',
              letterSpacing: '-1.8px',
              color: '#212e44',
            }}
          >
            Votre projet commence <em className="italic">ici</em>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontSize: '18px',
              lineHeight: '1.4',
              letterSpacing: '-0.54px',
              color: 'rgba(33, 46, 68, 0.8)',
              maxWidth: '600px',
              marginTop: '2rem',
            }}
          >
            Chaque construction commence par une conversation. Parlons de votre vision.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-10 px-8 py-3 text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: '#212e44',
              color: '#e4ceac',
              borderRadius: '25px',
              letterSpacing: '0.3px',
            }}
          >
            Nous Contacter
          </Link>
        </div>
      </div>
    </Layout>
  );
}
