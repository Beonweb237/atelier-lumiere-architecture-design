import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const contactSchema = z.object({
  nomComplet: z.string().min(1, 'Veuillez saisir votre nom complet.'),
  email: z
    .string()
    .min(1, 'Veuillez saisir votre adresse email.')
    .email('Veuillez saisir une adresse email valide.'),
  telephone: z.string().optional(),
  typeProjet: z.string().min(1, 'Veuillez sélectionner un type de projet.'),
  budget: z.string().optional(),
  localisation: z.string().optional(),
  description: z
    .string()
    .min(1, 'Veuillez décrire votre projet.')
    .min(20, 'Veuillez fournir une description d\'au moins 20 caractères.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TYPE_PROJET_OPTIONS = [
  'Maison individuelle',
  'Rénovation / Extension',
  'Bâtiment public',
  'Intérieur / Design',
  'Paysage / Urbanisme',
  'Autre',
];

const BUDGET_OPTIONS = [
  '< 300K \u20AC',
  '300K \u2013 1M \u20AC',
  '1M \u2013 3M \u20AC',
  '> 3M \u20AC',
  '\u00C0 d\u00E9finir',
];

const BLACK = '#212e44';
const TERRACOTTA = '#eb7e56';
const BEIGE = '#e4ceac';
const BLACK_10 = 'rgba(33, 46, 68, 0.1)';
const BLACK_20 = 'rgba(33, 46, 68, 0.2)';
const BLACK_30 = 'rgba(33, 46, 68, 0.3)';
const BLACK_40 = 'rgba(33, 46, 68, 0.4)';
const BLACK_60 = 'rgba(33, 46, 68, 0.6)';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nomComplet: '',
      email: '',
      telephone: '',
      typeProjet: '',
      budget: '',
      localisation: '',
      description: '',
    },
  });

  const selectedType = watch('typeProjet');
  const selectedBudget = watch('budget');

  /* ---- GSAP animations ---- */
  useGSAP(
    () => {
      /* Header entrance */
      gsap.to('.contact-overline', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1,
      });
      gsap.to('.contact-headline', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.25,
      });
      gsap.to('.contact-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.45,
      });

      /* Form + Coordinates scroll reveal */
      gsap.fromTo(
        '.contact-form-col',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form-section',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.contact-coords-col',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: '.contact-form-section',
            start: 'top 80%',
          },
        }
      );

      /* Map section */
      gsap.fromTo(
        '.contact-map',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-map-section',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.contact-map-label',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: '.contact-map-section',
            start: 'top 80%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  /* ---- Submit handler ---- */
  const onSubmit = async (_data: ContactFormData) => {
    setSubmitState('loading');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitState('success');
    reset();
  };

  /* ---- Reusable radio button ---- */
  const RadioOption = ({
    value,
    selected,
    onSelect,
  }: {
    value: string;
    selected: string;
    onSelect: (val: string) => void;
  }) => (
    <label
      className="flex items-center gap-3 cursor-pointer group"
      onClick={() => onSelect(value)}
    >
      <span
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          border: `1px solid ${BLACK_30}`,
          backgroundColor: selected === value ? TERRACOTTA : 'transparent',
        }}
      >
        {selected === value && (
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#fff' }}
          />
        )}
      </span>
      <span
        className="text-base transition-colors duration-200"
        style={{
          color: selected === value ? BLACK : BLACK_60,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {value}
      </span>
    </label>
  );

  return (
    <Layout>
      <div ref={containerRef}>
        {/* ============================================================ */}
        {/* SECTION 1 — Page Header                                       */}
        {/* ============================================================ */}
        <section
          className="relative flex flex-col items-center justify-center text-center"
          style={{
            backgroundColor: BEIGE,
            minHeight: '50vh',
            paddingTop: '8rem',
            paddingBottom: '4rem',
          }}
        >
          {/* Overline */}
          <span
            className="contact-overline uppercase opacity-0"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              lineHeight: '1.0',
              color: TERRACOTTA,
              marginBottom: '1.5rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            CONTACT
          </span>

          {/* Headline */}
          <h1
            className="contact-headline uppercase font-normal opacity-0"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: '0.85',
              letterSpacing: '-2.4px',
              color: BLACK,
              transform: 'translateY(40px)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Nous <em className="italic">contacter</em>
          </h1>

          {/* Subtitle */}
          <p
            className="contact-subtitle opacity-0 max-w-[560px] mx-auto mt-6"
            style={{
              fontSize: '18px',
              lineHeight: '1.4',
              letterSpacing: '-0.54px',
              color: BLACK_60,
              fontFamily: 'Inter, sans-serif',
              transform: 'translateY(30px)',
            }}
          >
            Racontez-nous votre projet. Nous vous répondrons sous 48 heures ouvrées.
          </p>

          {/* Decorative rule */}
          <div
            className="mt-12"
            style={{
              width: '160px',
              height: '1px',
              backgroundColor: BLACK_10,
            }}
          />
        </section>

        {/* ============================================================ */}
        {/* SECTION 2 — Form + Coordinates                                */}
        {/* ============================================================ */}
        <section
          className="contact-form-section"
          style={{
            backgroundColor: BEIGE,
            paddingTop: '15rem',
            paddingBottom: '15rem',
          }}
        >
          <div
            className="mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24"
            style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}
          >
            {/* ---------- Left: Form ---------- */}
            <div className="contact-form-col flex-1 lg:max-w-[60%]">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Field 1 — Nom complet */}
                <div className="mb-10">
                  <label
                    className="block uppercase mb-3"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    NOM COMPLET <span style={{ color: TERRACOTTA }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom et prénom"
                    {...register('nomComplet')}
                    className="w-full bg-transparent outline-none pb-3 transition-colors duration-200"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      color: BLACK,
                      borderBottom: errors.nomComplet
                        ? `1px solid #e74c3c`
                        : `1px solid ${BLACK_20}`,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottom = `1px solid ${BLACK}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottom = errors.nomComplet
                        ? `1px solid #e74c3c`
                        : `1px solid ${BLACK_20}`;
                    }}
                  />
                  {errors.nomComplet && (
                    <p className="mt-2 text-sm" style={{ color: '#e74c3c' }}>
                      {errors.nomComplet.message}
                    </p>
                  )}
                </div>

                {/* Field 2 — Email */}
                <div className="mb-10">
                  <label
                    className="block uppercase mb-3"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    EMAIL <span style={{ color: TERRACOTTA }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="votre@email.fr"
                    {...register('email')}
                    className="w-full bg-transparent outline-none pb-3 transition-colors duration-200"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      color: BLACK,
                      borderBottom: errors.email
                        ? `1px solid #e74c3c`
                        : `1px solid ${BLACK_20}`,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottom = `1px solid ${BLACK}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottom = errors.email
                        ? `1px solid #e74c3c`
                        : `1px solid ${BLACK_20}`;
                    }}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm" style={{ color: '#e74c3c' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Field 3 — Téléphone */}
                <div className="mb-10">
                  <label
                    className="block uppercase mb-3"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    TÉLÉPHONE
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    {...register('telephone')}
                    className="w-full bg-transparent outline-none pb-3 transition-colors duration-200"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      color: BLACK,
                      borderBottom: `1px solid ${BLACK_20}`,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottom = `1px solid ${BLACK}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottom = `1px solid ${BLACK_20}`;
                    }}
                  />
                </div>

                {/* Field 4 — Type de projet */}
                <div className="mb-10">
                  <label
                    className="block uppercase mb-4"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    TYPE DE PROJET <span style={{ color: TERRACOTTA }}>*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TYPE_PROJET_OPTIONS.map((option) => (
                      <RadioOption
                        key={option}
                        value={option}
                        selected={selectedType}
                        onSelect={(val) => setValue('typeProjet', val, { shouldValidate: true })}
                      />
                    ))}
                  </div>
                  {errors.typeProjet && (
                    <p className="mt-2 text-sm" style={{ color: '#e74c3c' }}>
                      {errors.typeProjet.message}
                    </p>
                  )}
                </div>

                {/* Field 5 — Budget estimé */}
                <div className="mb-10">
                  <label
                    className="block uppercase mb-4"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    BUDGET ESTIMÉ
                  </label>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {BUDGET_OPTIONS.map((option) => (
                      <RadioOption
                        key={option}
                        value={option}
                        selected={selectedBudget || ''}
                        onSelect={(val) => setValue('budget', val)}
                      />
                    ))}
                  </div>
                </div>

                {/* Field 6 — Localisation */}
                <div className="mb-10">
                  <label
                    className="block uppercase mb-3"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    LOCALISATION
                  </label>
                  <input
                    type="text"
                    placeholder="Ville ou région"
                    {...register('localisation')}
                    className="w-full bg-transparent outline-none pb-3 transition-colors duration-200"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      color: BLACK,
                      borderBottom: `1px solid ${BLACK_20}`,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottom = `1px solid ${BLACK}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottom = `1px solid ${BLACK_20}`;
                    }}
                  />
                </div>

                {/* Field 7 — Description */}
                <div className="mb-10">
                  <label
                    className="block uppercase mb-3"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    DÉCRIVEZ VOTRE PROJET <span style={{ color: TERRACOTTA }}>*</span>
                  </label>
                  <textarea
                    placeholder="Racontez-nous votre projet : contexte, ambitions, contraintes, délais..."
                    {...register('description')}
                    className="w-full bg-transparent outline-none p-4 transition-colors duration-200 resize-vertical"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      color: BLACK,
                      minHeight: '160px',
                      border: errors.description
                        ? '1px solid #e74c3c'
                        : `1px solid ${BLACK_20}`,
                      borderRadius: '4px',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = `1px solid ${BLACK}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.border = errors.description
                        ? '1px solid #e74c3c'
                        : `1px solid ${BLACK_20}`;
                    }}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm" style={{ color: '#e74c3c' }}>
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitState === 'loading' || submitState === 'success'}
                  className="w-full font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  style={{
                    height: '56px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor:
                      submitState === 'success' ? '#4a9b6b' : BLACK,
                    color: submitState === 'success' ? '#fff' : BEIGE,
                    letterSpacing: '-0.54px',
                  }}
                  onMouseEnter={(e) => {
                    if (submitState === 'idle') {
                      e.currentTarget.style.backgroundColor = TERRACOTTA;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (submitState === 'idle') {
                      e.currentTarget.style.backgroundColor = BLACK;
                    }
                  }}
                >
                  {submitState === 'loading' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  )}
                  {submitState === 'idle' && 'Envoyer ma demande'}
                  {submitState === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message envoyé
                    </>
                  )}
                </button>

                {/* Success message */}
                {submitState === 'success' && (
                  <p
                    className="mt-6 text-center"
                    style={{
                      fontSize: '16px',
                      color: BLACK_60,
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '-0.54px',
                    }}
                  >
                    Merci pour votre message. Nous vous contacterons sous 48 heures ouvrées.
                  </p>
                )}
              </form>
            </div>

            {/* ---------- Right: Coordinates ---------- */}
            <div className="contact-coords-col lg:max-w-[40%]" style={{ color: BLACK }}>
              {/* Firm name */}
              <h3
                className="font-normal"
                style={{
                  fontSize: '24px',
                  letterSpacing: '-0.72px',
                  lineHeight: '1.2',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Atelier Lumière
              </h3>

              {/* Separator */}
              <div
                className="my-8"
                style={{
                  width: '60px',
                  height: '1px',
                  backgroundColor: BLACK_10,
                }}
              />

              {/* Address */}
              <div className="mb-8">
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    letterSpacing: '-0.54px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  12, rue de la Lumière
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    letterSpacing: '-0.54px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  69002 Lyon, France
                </p>
              </div>

              {/* Contact */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-4 h-4" style={{ color: BLACK_40 }} />
                  <span
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.6',
                      letterSpacing: '-0.54px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    +33 4 72 00 00 00
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" style={{ color: BLACK_40 }} />
                  <a
                    href="mailto:contact@atelier-lumiere.fr"
                    className="transition-opacity duration-200 hover:opacity-70"
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.6',
                      letterSpacing: '-0.54px',
                      fontFamily: 'Inter, sans-serif',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      color: BLACK,
                    }}
                  >
                    contact@atelier-lumiere.fr
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-4 h-4" style={{ color: BLACK_40 }} />
                  <span
                    className="uppercase"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      lineHeight: '1.0',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Lundi – Vendredi
                  </span>
                </div>
                <p
                  className="ml-7"
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    letterSpacing: '-0.54px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  9h00 – 18h00
                </p>
              </div>

              {/* Social */}
              <div className="mb-8">
                <p
                  className="uppercase mb-3"
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.7px',
                    lineHeight: '1.0',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  RÉSEAUX SOCIAUX
                </p>
                <div className="flex items-center gap-8">
                  {['LinkedIn', 'Instagram', 'Pinterest'].map((social) => (
                    <a
                      key={social}
                      href={`https://${social.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity duration-200 hover:opacity-70"
                      style={{
                        fontSize: '16px',
                        color: BLACK,
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-0.54px',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Legal snippet */}
              <div className="mt-16">
                <p
                  className="uppercase"
                  style={{
                    fontSize: '14px',
                    letterSpacing: '0.7px',
                    lineHeight: '1.4',
                    color: BLACK_40,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Membre de l&apos;Ordre des Architectes · Inscrit à l&apos;OPQIBI
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontSize: '14px',
                    color: BLACK_40,
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.54px',
                  }}
                >
                  SIRET : 123 456 789 00012
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3 — Plan d'Accès (Map)                                */}
        {/* ============================================================ */}
        <section className="contact-map-section relative" style={{ height: '50vh' }}>
          {/* Map iframe */}
          <div className="contact-map absolute inset-0 opacity-0">
            <iframe
              title="Plan d'accès Atelier Lumière"
              src="https://www.openstreetmap.org/export/embed.html?bbox=4.8193%2C45.7520%2C4.8393%2C45.7620&amp;layer=mapnik&amp;marker=45.7570%2C4.8293"
              className="w-full h-full"
              style={{ border: 0, filter: 'grayscale(1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Terracotta overlay tint */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: 'rgba(235, 126, 86, 0.05)' }}
            />
          </div>

          {/* Overlay label */}
          <div
            className="contact-map-label absolute opacity-0 flex items-start gap-3"
            style={{
              bottom: '2rem',
              left: '2rem',
              backgroundColor: '#f9f6f0',
              padding: '1.5rem 2rem',
              borderRadius: '4px',
              boxShadow: '0 4px 20px rgba(33, 46, 68, 0.1)',
            }}
          >
            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: TERRACOTTA }} />
            <div>
              <p
                className="font-medium"
                style={{
                  fontSize: '18px',
                  color: BLACK,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.54px',
                }}
              >
                Atelier Lumière
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: BLACK_60,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.54px',
                  marginTop: '2px',
                }}
              >
                12, rue de la Lumière — Lyon 2e
              </p>
            </div>
          </div>
        </section>

        {/* Black section below map for visual grounding */}
        <div style={{ backgroundColor: BLACK, height: '4rem' }} />
      </div>
    </Layout>
  );
}
