import { useRef } from 'react';
import { ExternalLink, Shield, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BLACK = '#212e44';
const TERRACOTTA = '#eb7e56';
const BEIGE = '#e4ceac';
const BLACK_10 = 'rgba(33, 46, 68, 0.1)';
const BLACK_40 = 'rgba(33, 46, 68, 0.4)';

/* ------------------------------------------------------------------ */
/*  Reusable components                                                */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="font-normal uppercase"
      style={{
        fontSize: '30px',
        lineHeight: '1.0',
        letterSpacing: '-0.9px',
        color: BLACK,
        marginBottom: '2rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </h4>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h5
      className="font-normal"
      style={{
        fontSize: '20px',
        lineHeight: '1.2',
        letterSpacing: '-0.6px',
        color: BLACK,
        marginTop: '3rem',
        marginBottom: '1rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </h5>
  );
}

function LegalText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={className}
      style={{
        fontSize: '18px',
        lineHeight: '1.6',
        letterSpacing: '-0.54px',
        color: BLACK,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </p>
  );
}

function Separator() {
  return (
    <div
      className="w-full"
      style={{
        height: '1px',
        backgroundColor: BLACK_10,
        margin: '4rem 0',
      }}
    />
  );
}

function ExternalAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
      style={{
        fontSize: '18px',
        lineHeight: '1.6',
        letterSpacing: '-0.54px',
        color: BLACK,
        fontFamily: 'Inter, sans-serif',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
    >
      {children}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Legal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* Header entrance */
      gsap.to('.legal-overline', {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1,
      });
      gsap.to('.legal-headline', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.25,
      });

      /* Section blocks scroll reveal */
      const blocks = gsap.utils.toArray<HTMLElement>('.legal-block');
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
            },
          }
        );
      });

      /* RGPD sub-blocks with stagger */
      const rgpdSubBlocks = gsap.utils.toArray<HTMLElement>('.rgpd-sub');
      rgpdSubBlocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
            },
          }
        );
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
          className="relative flex flex-col items-center justify-center text-center"
          style={{
            backgroundColor: BEIGE,
            minHeight: '40vh',
            paddingTop: '8rem',
            paddingBottom: '4rem',
          }}
        >
          {/* Overline */}
          <span
            className="legal-overline uppercase opacity-0"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              lineHeight: '1.0',
              color: TERRACOTTA,
              marginBottom: '1.5rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            INFORMATIONS LÉGALES
          </span>

          {/* Headline */}
          <h1
            className="legal-headline uppercase font-normal opacity-0"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: '0.85',
              letterSpacing: '-2.4px',
              color: BLACK,
              transform: 'translateY(40px)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Mentions <em className="italic">Légales</em>
          </h1>

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
        {/* SECTION 2 — Informations Légales                              */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: BEIGE,
            paddingTop: '10rem',
            paddingBottom: '8rem',
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: '800px', paddingLeft: '3rem', paddingRight: '3rem' }}
          >
            {/* Block: Éditeur */}
            <div className="legal-block opacity-0">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5 flex-shrink-0" style={{ color: TERRACOTTA }} />
                <SectionTitle>Éditeur du site</SectionTitle>
              </div>
              <LegalText>Atelier Lumière, SARL au capital de 50 000 €</LegalText>
              <LegalText className="mt-2">SIRET : 123 456 789 00012</LegalText>
              <LegalText className="mt-2">RCS Lyon B 123 456 789</LegalText>
              <LegalText className="mt-2">
                Siège social : 12, rue de la Lumière, 69002 Lyon, France
              </LegalText>
              <LegalText className="mt-2">Téléphone : +33 4 72 00 00 00</LegalText>
              <LegalText className="mt-2">
                Email :{' '}
                <a
                  href="mailto:contact@atelier-lumiere.fr"
                  className="transition-opacity duration-200 hover:opacity-70"
                  style={{ color: BLACK, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  contact@atelier-lumiere.fr
                </a>
              </LegalText>
              <LegalText className="mt-2">
                Directeur de la publication : Camille Renard, Gérante
              </LegalText>
            </div>

            <Separator />

            {/* Block: Responsable de la rédaction */}
            <div className="legal-block opacity-0">
              <SectionTitle>Responsable de la rédaction</SectionTitle>
              <LegalText>
                Camille Renard — Architecte DPLG, Gérante d&apos;Atelier Lumière
              </LegalText>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3 — Ordre des Architectes & OPQIBI                    */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: BEIGE,
            paddingTop: '8rem',
            paddingBottom: '8rem',
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: '800px', paddingLeft: '3rem', paddingRight: '3rem' }}
          >
            {/* Ordre des Architectes */}
            <div className="legal-block opacity-0">
              <SectionTitle>Inscription à l&apos;Ordre des Architectes</SectionTitle>
              <LegalText>
                Conformément à la loi n° 77-2 du 3 janvier 1977, Camille Renard et Lucas Moreau sont
                inscrits au Tableau de l&apos;Ordre des Architectes de la région
                Auvergne-Rhône-Alpes.
              </LegalText>
              <LegalText className="mt-4">
                Numéro d&apos;inscription Camille Renard : <strong>06912</strong>
              </LegalText>
              <LegalText className="mt-2">
                Numéro d&apos;inscription Lucas Moreau : <strong>08437</strong>
              </LegalText>
              <div className="mt-4">
                <ExternalAnchor href="https://www.architectes.org">
                  www.architectes.org
                </ExternalAnchor>
              </div>
            </div>

            <Separator />

            {/* OPQIBI */}
            <div className="legal-block opacity-0">
              <SectionTitle>Certification OPQIBI</SectionTitle>
              <LegalText>
                Atelier Lumière est inscrit à l&apos;OPQIBI (Organisme Professionnel de
                Qualification des Ingénieurs-Bureaux d&apos;Études) sous le numéro{' '}
                <strong>10032147</strong>, dans les domaines suivants :
              </LegalText>
              <ul className="mt-4 ml-6 space-y-2">
                {[
                  '1111 — Études d\'architecture',
                  '1121 — Études de structure',
                  '1131 — Études d\'ingénierie HVAC',
                  '1161 — Études techniques environnementales et énergétiques',
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-4"
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.6',
                      letterSpacing: '-0.54px',
                      color: BLACK,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <span
                      className="absolute left-0"
                      style={{ color: TERRACOTTA }}
                    >
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <ExternalAnchor href="https://www.opqibi.com">www.opqibi.com</ExternalAnchor>
              </div>
            </div>

            <Separator />

            {/* Assurance RCP */}
            <div className="legal-block opacity-0">
              <SectionTitle>Assurance professionnelle</SectionTitle>
              <LegalText>
                Atelier Lumière dispose d&apos;une assurance Responsabilité Civile Professionnelle
                (RCP) couvrant l&apos;ensemble de ses activités d&apos;architecture et de maîtrise
                d&apos;œuvre, souscrite auprès de :
              </LegalText>
              <LegalText className="mt-4 font-medium">
                AXA Assurances — Contrat RCP Architectes n° 12345678
              </LegalText>
              <LegalText className="mt-2">
                Cette assurance couvre les dommages immobiliers résultant des services fournis dans
                le cadre de nos missions d&apos;architecture, de conception, et de direction de
                travaux, conformément aux articles 1792 et suivants du Code civil.
              </LegalText>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4 — Données Personnelles (RGPD)                       */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: BEIGE,
            paddingTop: '8rem',
            paddingBottom: '8rem',
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: '800px', paddingLeft: '3rem', paddingRight: '3rem' }}
          >
            <div className="legal-block opacity-0">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 flex-shrink-0" style={{ color: TERRACOTTA }} />
                <SectionTitle>Protection des données personnelles</SectionTitle>
              </div>
              <LegalText>
                Atelier Lumière s&apos;engage à ce que la collecte et le traitement de vos données
                personnelles, effectués à partir du site atelier-lumiere.fr, soient conformes au
                Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et
                Libertés.
              </LegalText>

              {/* Responsable du traitement */}
              <div className="rgpd-sub opacity-0">
                <SubTitle>Responsable du traitement</SubTitle>
                <LegalText>
                  Le responsable du traitement des données est Atelier Lumière SARL, représentée par
                  Camille Renard.
                </LegalText>
              </div>

              {/* Données collectées */}
              <div className="rgpd-sub opacity-0">
                <SubTitle>Données collectées</SubTitle>
                <LegalText>
                  Les données collectées via le formulaire de contact sont : nom, prénom, adresse
                  email, numéro de téléphone, type de projet, budget estimé, localisation, et
                  description du projet. Ces données sont collectées avec votre consentement
                  explicite.
                </LegalText>
              </div>

              {/* Finalité du traitement */}
              <div className="rgpd-sub opacity-0">
                <SubTitle>Finalité du traitement</SubTitle>
                <LegalText>
                  Les données sont utilisées exclusivement pour répondre à votre demande de contact
                  et, le cas échéant, pour établir un devis ou une proposition architecturale.
                </LegalText>
              </div>

              {/* Durée de conservation */}
              <div className="rgpd-sub opacity-0">
                <SubTitle>Durée de conservation</SubTitle>
                <LegalText>
                  Les données sont conservées pendant une durée de 3 ans à compter du dernier
                  contact, sauf opposition de votre part.
                </LegalText>
              </div>

              {/* Vos droits */}
              <div className="rgpd-sub opacity-0">
                <SubTitle>Vos droits</SubTitle>
                <LegalText>
                  Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
                  rectification, d&apos;effacement, de limitation du traitement, et de portabilité
                  de vos données. Vous pouvez exercer ces droits en contactant :{' '}
                  <a
                    href="mailto:dpo@atelier-lumiere.fr"
                    className="transition-opacity duration-200 hover:opacity-70"
                    style={{ color: BLACK, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    dpo@atelier-lumiere.fr
                  </a>{' '}
                  ou par courrier à l&apos;adresse du siège social.
                </LegalText>
              </div>

              {/* Cookies */}
              <div className="rgpd-sub opacity-0">
                <SubTitle>Cookies</SubTitle>
                <LegalText>
                  Le site atelier-lumiere.fr utilise des cookies techniques nécessaires au
                  fonctionnement du site (préférences de navigation, formulaire). Aucun cookie de
                  traçage publicitaire n&apos;est déposé sans votre consentement explicite.
                </LegalText>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5 — Hébergement & Propriété Intellectuelle            */}
        {/* ============================================================ */}
        <section
          style={{
            backgroundColor: BEIGE,
            paddingTop: '8rem',
            paddingBottom: '15rem',
          }}
        >
          <div
            className="mx-auto"
            style={{ maxWidth: '800px', paddingLeft: '3rem', paddingRight: '3rem' }}
          >
            {/* Hébergement */}
            <div className="legal-block opacity-0">
              <SectionTitle>Hébergement</SectionTitle>
              <LegalText>Le site atelier-lumiere.fr est hébergé par :</LegalText>
              <LegalText className="mt-4 font-medium">OVHcloud</LegalText>
              <LegalText>2, rue Kellermann — 59100 Roubaix, France</LegalText>
              <LegalText>Téléphone : +33 9 72 10 10 07</LegalText>
            </div>

            <Separator />

            {/* Propriété intellectuelle */}
            <div className="legal-block opacity-0">
              <SectionTitle>Propriété intellectuelle</SectionTitle>
              <LegalText>
                L&apos;ensemble des éléments constituant le site atelier-lumiere.fr (textes,
                photographies, plans, logos, icônes, etc.) est la propriété exclusive d&apos;Atelier
                Lumière ou de ses partenaires. Toute reproduction, représentation, ou diffusion, en
                tout ou partie, est interdite sans autorisation préalable écrite.
              </LegalText>
              <LegalText className="mt-4">
                Les photographies d&apos;architecture sont protégées par le droit d&apos;auteur. Leur
                reproduction est soumise à l&apos;autorisation expresse des photographes et
                d&apos;Atelier Lumière, conformément aux dispositions du Code de la propriété
                intellectuelle.
              </LegalText>
            </div>

            <Separator />

            {/* Crédits photographiques */}
            <div className="legal-block opacity-0">
              <SectionTitle>Crédits photographiques</SectionTitle>
              <LegalText>Les photographies présentées sur ce site sont réalisées par :</LegalText>
              {['Cyrille Weiner', 'Takuji Shimmura', 'Autres photographes selon projet'].map(
                (name) => (
                  <LegalText key={name} className="mt-2">
                    {name}
                  </LegalText>
                )
              )}
              <LegalText className="mt-4">
                Toute utilisation des photographies sans autorisation écrite est strictement
                interdite.
              </LegalText>
            </div>

            <Separator />

            {/* Conditions d'utilisation */}
            <div className="legal-block opacity-0">
              <SectionTitle>Conditions d&apos;utilisation</SectionTitle>
              <LegalText>
                L&apos;utilisation du site atelier-lumiere.fr implique l&apos;acceptation pleine et
                entière des conditions générales d&apos;utilisation décrites ci-dessus.
              </LegalText>
              <p
                className="mt-8 uppercase"
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.7px',
                  lineHeight: '1.0',
                  color: BLACK_40,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Dernière mise à jour : Janvier 2025
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
