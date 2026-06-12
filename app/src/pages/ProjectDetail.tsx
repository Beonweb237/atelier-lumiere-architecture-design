import { useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ProjectData {
  slug: string;
  name: string;
  category: string;
  year: number;
  location: string;
  heroImage: string;
  contextHeadline: string;
  contextBody1: string;
  contextBody2: string;
  contextImage: string;
  contextCaption: string;
  specs: { label: string; value: string }[];
  planImage: string;
  planCaption: string;
  gallery: { image: string; caption: string; credit: string; orientation: 'portrait' | 'landscape' }[];
  relatedSlugs: string[];
}

const PROJECTS_DB: Record<string, ProjectData> = {
  'maison-l': {
    slug: 'maison-l',
    name: 'Maison L',
    category: 'RÉSIDENTIEL',
    year: 2024,
    location: 'Lyon',
    heroImage: '/project-01.jpg',
    contextHeadline: 'Un terrain en pente, une vue à saisir',
    contextBody1: "Située sur les hauteurs de Lyon, cette parcelle en forte pente offrait un panorama exceptionnel sur la ville. Le défi : imaginer une maison qui épouse le terrain sans le dénaturer, tout en capturant la lumière du sud à chaque heure de la journée.",
    contextBody2: "Les clients, un couple avec deux enfants, rêvaient d'un lieu de vie chaleureux où intérieur et extérieur se confondent — une maison qui respire.",
    contextImage: '/project-01.jpg',
    contextCaption: 'Vue du terrain avant construction',
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Famille L.' },
      { label: 'SURFACE', value: '320 m² habitable' },
      { label: 'BUDGET', value: '1.2 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Béton brut, chêne massif, aluminium, verre' },
      { label: 'NORMES', value: 'RT2012, BBC Effinergie' },
      { label: 'DURÉE', value: '18 mois' },
      { label: 'ANNÉE', value: '2024' },
    ],
    planImage: '/project-01.jpg',
    planCaption: 'Plan de masse — échelle 1/200',
    gallery: [
      { image: '/project-01.jpg', caption: 'Façade sud — vue jardin', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-01.jpg', caption: 'Double séjour', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-01.jpg', caption: 'Escalier en béton ciré', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-01.jpg', caption: 'Cuisine ouverte', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-01.jpg', caption: 'Chambre parentale, vue sur Lyon', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-01.jpg', caption: 'Terrasse — crépuscule', credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['loft-saint-antoine', 'refuge-alpin', 'residence-jardins'],
  },
  'loft-saint-antoine': {
    slug: 'loft-saint-antoine',
    name: 'Loft Saint-Antoine',
    category: 'RÉNOVATION',
    year: 2024,
    location: 'Paris',
    heroImage: '/project-02.jpg',
    contextHeadline: "Transformer l'ancien en lieu de vie contemporain",
    contextBody1: "Dans un ancien atelier de fabrication du XIe arrondissement de Paris, ce loft de 180 m² conservait une âme industrielle remarquable : hauteur sous plafond de 5 mètres, poutres métalliques apparentes, sol en béton brut.",
    contextBody2: "Le défi était de préserver ce caractère brut tout en y insufflant une chaleur résidentielle — créer un contraste harmonieux entre l'industriel et l'intime.",
    contextImage: '/project-02.jpg',
    contextCaption: "L'atelier avant transformation",
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'M. et Mme D.' },
      { label: 'SURFACE', value: '180 m²' },
      { label: 'BUDGET', value: '850 K€ HT' },
      { label: 'MATÉRIAUX', value: 'Brique apparente, acier, béton ciré, chêne' },
      { label: 'NORMES', value: 'RT2012 rénovation' },
      { label: 'DURÉE', value: '12 mois' },
      { label: 'ANNÉE', value: '2024' },
    ],
    planImage: '/project-02.jpg',
    planCaption: 'Plan — échelle 1/100',
    gallery: [
      { image: '/project-02.jpg', caption: 'Vue depuis la mezzanine', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-02.jpg', caption: 'Espace de vie principal', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-02.jpg', caption: "Détail des poutres d'origine", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-02.jpg', caption: 'Chambre avec verrière', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-02.jpg', caption: "Cuisine intégrée dans l'aciérie", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-02.jpg', caption: 'Cour intérieure paysagée', credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['maison-l', 'villa-restaurée-v', 'boutique-hotel-l-ours'],
  },
  'centre-culturel-m': {
    slug: 'centre-culturel-m',
    name: 'Centre Culturel M',
    category: 'PUBLIC',
    year: 2023,
    location: 'Marseille',
    heroImage: '/project-03.jpg',
    contextHeadline: "Un nouvel écrin culturel pour la ville",
    contextBody1: "Au cœur du quartier de la Joliette, ce centre culturel de 2 500 m² s'inscrit dans une démarche de réappropriation urbaine. Le bâtiment dialogue avec le paysage portuaire environnant.",
    contextBody2: "Programmé autour d'une grande salle modulable de 400 places, de galeries d'exposition et d'ateliers artistiques, il vise à devenir un pôle de création contemporaine accessible à tous.",
    contextImage: '/project-03.jpg',
    contextCaption: "Maquette d'étude",
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Ville de Marseille' },
      { label: 'SURFACE', value: '2 500 m²' },
      { label: 'BUDGET', value: '8.5 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Béton blanc, verre structuré, métal perforé' },
      { label: 'NORMES', value: 'ERP type L, HQE' },
      { label: 'DURÉE', value: '24 mois' },
      { label: 'ANNÉE', value: '2023' },
    ],
    planImage: '/project-03.jpg',
    planCaption: 'Plan RDC — échelle 1/500',
    gallery: [
      { image: '/project-03.jpg', caption: 'Façade ouest, vue crépuscule', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-03.jpg', caption: "Hall d'accueil", credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-03.jpg', caption: "Salle de spectacle", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-03.jpg', caption: 'Galerie exposition', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-03.jpg', caption: "Détail de la façade perforée", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-03.jpg', caption: 'Terrasse panoramique', credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['mediatheque-du-sud', 'pavillon-du-lac', 'maison-l'],
  },
  'refuge-alpin': {
    slug: 'refuge-alpin',
    name: 'Refuge Alpin',
    category: 'HÔTELLERIE',
    year: 2023,
    location: 'Chamonix',
    heroImage: '/project-04.jpg',
    contextHeadline: "Un abri face au Mont-Blanc",
    contextBody1: "À 2 000 mètres d'altitude, ce refuge de montagne redéfinit l'expérience de l'hébergement alpin. Le projet s'ancre dans la roche avec une sobriété qui honore le paysage.",
    contextBody2: "Conçu pour accueillir 40 alpinistes, il offre des espaces de convivialité chauffés au bois et des chambres minimalistes avec vue imprenable sur le massif.",
    contextImage: '/project-04.jpg',
    contextCaption: 'Vue du site en hiver',
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Club Alpin Français' },
      { label: 'SURFACE', value: '450 m²' },
      { label: 'BUDGET', value: '2.1 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Bois local, pierre de taille, zinc' },
      { label: 'NORMES', value: 'RT2012, parasismique' },
      { label: 'DURÉE', value: '14 mois' },
      { label: 'ANNÉE', value: '2023' },
    ],
    planImage: '/project-04.jpg',
    planCaption: 'Plan de coupe — échelle 1/200',
    gallery: [
      { image: '/project-04.jpg', caption: 'Façade sud enneigée', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-04.jpg', caption: "Salle commune avec cheminée", credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-04.jpg', caption: "Chambre avec vue montagne", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-04.jpg', caption: "Dortoir collectif", credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-04.jpg', caption: "Terrasse d'altitude", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-04.jpg', caption: "Détail charpente bois", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['maison-l', 'domaine-viticole-r', 'pavillon-du-lac'],
  },
  'boutique-hotel-l-ours': {
    slug: 'boutique-hotel-l-ours',
    name: "Boutique Hôtel L'Ours",
    category: 'INTÉRIEUR',
    year: 2023,
    location: 'Bordeaux',
    heroImage: '/project-05.jpg',
    contextHeadline: "L'élégance discrète d'une demeure bordelaise",
    contextBody1: "Dans un hôtel particulier du XVIIIe siècle, ce boutique-hotel de 12 chambres revisite le classicisme français avec une sensibilité contemporaine.",
    contextBody2: "Chaque chambre raconte une histoire unique, avec des matériaux nobles — marbre de Carrare, velours, laiton — et une lumière travaillée pour créer des ambiances intimes.",
    contextImage: '/project-05.jpg',
    contextCaption: "Cour intérieure d'origine",
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Hôtel L\'Ours SAS' },
      { label: 'SURFACE', value: '600 m²' },
      { label: 'BUDGET', value: '1.8 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Marbre, velours, laiton, chêne fumé' },
      { label: 'NORMES', value: 'ERP type N, accessibilité PMR' },
      { label: 'DURÉE', value: '10 mois' },
      { label: 'ANNÉE', value: '2023' },
    ],
    planImage: '/project-05.jpg',
    planCaption: 'Plan étage — échelle 1/100',
    gallery: [
      { image: '/project-05.jpg', caption: "Salon d'honneur", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-05.jpg', caption: 'Suite principale', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-05.jpg', caption: "Détail marbre et laiton", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-05.jpg', caption: 'Bar intime', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-05.jpg', caption: 'Chambre standard', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-05.jpg', caption: "Bibliothèque avec cheminée", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['loft-saint-antoine', 'refuge-alpin', 'villa-restaurée-v'],
  },
  'siege-social-techvert': {
    slug: 'siege-social-techvert',
    name: 'Siège Social TechVert',
    category: 'BUREAUX',
    year: 2022,
    location: 'Nantes',
    heroImage: '/project-06.jpg',
    contextHeadline: 'Le bien-être au travail par la lumière',
    contextBody1: "Pour ce siège social de 3 500 m², l'ambition était de créer un environnement de travail où la nature et la technologie coexistent en harmonie.",
    contextBody2: "Des patios végétalisés ponctuent les plateaux, la lumière naturelle pénètre jusqu'au cœur du bâtiment, et des espaces informels favorisent les échanges.",
    contextImage: '/project-06.jpg',
    contextCaption: "Vue de la rue de Strasbourg",
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'TechVert' },
      { label: 'SURFACE', value: '3 500 m²' },
      { label: 'BUDGET', value: '6.2 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Béton mat, verre, aluminium, bois' },
      { label: 'NORMES', value: 'HQE, BREEAM Very Good' },
      { label: 'DURÉE', value: '20 mois' },
      { label: 'ANNÉE', value: '2022' },
    ],
    planImage: '/project-06.jpg',
    planCaption: 'Plan R+1 — échelle 1/300',
    gallery: [
      { image: '/project-06.jpg', caption: 'Atrium central', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-06.jpg', caption: 'Open-space avec vue patio', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-06.jpg', caption: "Salle de réunion executive", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-06.jpg', caption: 'Restaurant entreprise', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-06.jpg', caption: 'Terrasse végétalisée R+2', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-06.jpg', caption: "Détail façade brise-soleil", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['centre-culturel-m', 'micro-logements-z', 'mediatheque-du-sud'],
  },
  'villa-restaurée-v': {
    slug: 'villa-restaurée-v',
    name: 'Villa Restaurée V',
    category: 'RÉNOVATION',
    year: 2022,
    location: 'Lyon',
    heroImage: '/project-07.jpg',
    contextHeadline: "Révéler l'âme d'une demeure historique",
    contextBody1: "Cette villa du XIXe siècle, laissée à l'abandon pendant deux décennies, recelait un potentiel exceptionnel. La restauration a mis en valeur ses boiseries d'époque et ses parquets en point de Hongrie.",
    contextBody2: "L'extension contemporaine en verre et acier crée un dialogue saisissant entre ancien et moderne, offrant une nouvelle vie à cette demeure sans la dénaturer.",
    contextImage: '/project-07.jpg',
    contextCaption: 'État initial de la façade',
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Famille V.' },
      { label: 'SURFACE', value: '420 m²' },
      { label: 'BUDGET', value: '1.5 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Pierre de taille, verre, acier Corten' },
      { label: 'NORMES', value: 'RT2012, Bâtiment de France' },
      { label: 'DURÉE', value: '16 mois' },
      { label: 'ANNÉE', value: '2022' },
    ],
    planImage: '/project-07.jpg',
    planCaption: 'Plan — échelle 1/200',
    gallery: [
      { image: '/project-07.jpg', caption: 'Façade restaurée', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-07.jpg', caption: 'Extension vitrée', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-07.jpg', caption: "Salon avec boiseries d'origine", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-07.jpg', caption: 'Cuisine contemporaine', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-07.jpg', caption: 'Jardin paysagé', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-07.jpg', caption: "Détail acier Corten", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['loft-saint-antoine', 'maison-l', 'boutique-hotel-l-ours'],
  },
  'residence-jardins': {
    slug: 'residence-jardins',
    name: 'Résidence Jardins',
    category: 'RÉSIDENTIEL',
    year: 2022,
    location: 'Strasbourg',
    heroImage: '/project-08.jpg',
    contextHeadline: "Habiter au cœur de la nature urbaine",
    contextBody1: "Ce programme de 32 logements intermédiaires s'organise autour de jardins partagés. Chaque appartement dispose d'un jardin privatif, d'une terrasse ou d'un balcon généreux.",
    contextBody2: "Construit en ossature bois avec des matériaux biosourcés, ce projet incarne une vision durable du logement collectif où le végétal est partie prenante de l'architecture.",
    contextImage: '/project-08.jpg',
    contextCaption: "Vue d'ensemble du programme",
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Résidence Jardins SA' },
      { label: 'SURFACE', value: '2 800 m²' },
      { label: 'BUDGET', value: '4.8 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Bois, brique crue, enduit chaux' },
      { label: 'NORMES', value: 'RE2020, Effinergie +, E3C2' },
      { label: 'DURÉE', value: '22 mois' },
      { label: 'ANNÉE', value: '2022' },
    ],
    planImage: '/project-08.jpg',
    planCaption: 'Plan type — échelle 1/200',
    gallery: [
      { image: '/project-08.jpg', caption: "Cour-jardin centrale", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-08.jpg', caption: 'Appartement type', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-08.jpg', caption: "Détail ossature bois", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-08.jpg', caption: "Balcon filant", credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-08.jpg', caption: "Jardin privatif RDC", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-08.jpg', caption: "Vue depuis terrasse collective", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['maison-l', 'domaine-viticole-r', 'micro-logements-z'],
  },
  'pavillon-du-lac': {
    slug: 'pavillon-du-lac',
    name: 'Pavillon du Lac',
    category: 'PUBLIC',
    year: 2021,
    location: 'Annecy',
    heroImage: '/project-09.jpg',
    contextHeadline: "Une architecture en dialogue avec l'eau",
    contextBody1: "Ce pavillon d'accueil pour le parc naturel du lac d'Annecy se fond dans le paysage avec une légèreté troublante. Entièrement construit en bois local, il s'ouvre sur le lac par des façades vitrées.",
    contextBody2: "La toiture en double courbure, inspirée des barques du lac, crée un volume intérieur surprenant où la lumière danse sur les parois en bois.",
    contextImage: '/project-09.jpg',
    contextCaption: 'Vue du lac au printemps',
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: "Parc Naturel Régional" },
      { label: 'SURFACE', value: '350 m²' },
      { label: 'BUDGET', value: '1.6 M€ HT' },
      { label: 'MATÉRIAUX', value: "Mélèze, sapin, verre feuilleté" },
      { label: 'NORMES', value: 'RT2012, accessibilité PMR' },
      { label: 'DURÉE', value: '12 mois' },
      { label: 'ANNÉE', value: '2021' },
    ],
    planImage: '/project-09.jpg',
    planCaption: 'Plan — échelle 1/200',
    gallery: [
      { image: '/project-09.jpg', caption: 'Façade lac', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-09.jpg', caption: "Intérieur bois", credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-09.jpg', caption: "Détail charpente cintrée", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-09.jpg', caption: 'Terrasse sur pilotis', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-09.jpg', caption: 'Vue depuis le parc', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-09.jpg', caption: "Salle d'exposition", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['refuge-alpin', 'mediatheque-du-sud', 'centre-culturel-m'],
  },
  'micro-logements-z': {
    slug: 'micro-logements-z',
    name: 'Micro-Logements Z',
    category: 'URBAINE',
    year: 2021,
    location: 'Paris',
    heroImage: '/project-10.jpg',
    contextHeadline: "Réinventer le logement urbain compact",
    contextBody1: "En plein cœur du XXe arrondissement, ce programme de 20 micro-logements de 15 à 25 m² démontre que la petite surface n'est pas incompatible avec la qualité d'habitat.",
    contextBody2: "Chaque unité est pensée comme un module optimisé : lit mezzanine, kitchenette intégrée, salle de bain fonctionnelle, et surtout une luminosité maximale grâce aux façades vitrées.",
    contextImage: '/project-10.jpg',
    contextCaption: "Implantation en îlot",
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Z_Logements' },
      { label: 'SURFACE', value: '450 m²' },
      { label: 'BUDGET', value: '980 K€ HT' },
      { label: 'MATÉRIAUX', value: 'Béton, métal, verre' },
      { label: 'NORMES', value: 'RT2012' },
      { label: 'DURÉE', value: '10 mois' },
      { label: 'ANNÉE', value: '2021' },
    ],
    planImage: '/project-10.jpg',
    planCaption: 'Plan type unité — échelle 1/50',
    gallery: [
      { image: '/project-10.jpg', caption: 'Façade rue', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-10.jpg', caption: "Unité type 20m²", credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-10.jpg', caption: "Détail module cuisine", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-10.jpg', caption: 'Mezzanine chambre', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-10.jpg', caption: 'Cour collective', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-10.jpg', caption: "Toiture terrasse", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['residence-jardins', 'siege-social-techvert', 'loft-saint-antoine'],
  },
  'domaine-viticole-r': {
    slug: 'domaine-viticole-r',
    name: 'Domaine Viticole R',
    category: 'RÉSIDENTIEL',
    year: 2021,
    location: 'Aix-en-Provence',
    heroImage: '/project-11.jpg',
    contextHeadline: "Une bastide provençale réimaginée",
    contextBody1: "Ce domaine viticole de 12 hectares abrite une bastide du XVIIIe siècle transformée en maison d'hôtes de luxe. Les dépendances ont été réhabilitées en cave de dégustation et en spa.",
    contextBody2: "Les terrasses en pierre sèche s'étagent dans les vignes, offrant des espaces de réception en plein air avec une vue imprenable sur la Sainte-Victoire.",
    contextImage: '/project-11.jpg',
    contextCaption: 'Vue aérienne du domaine',
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Famille R.' },
      { label: 'SURFACE', value: '680 m²' },
      { label: 'BUDGET', value: '3.2 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Pierre de taille, tuile romane, chêne' },
      { label: 'NORMES', value: 'RT2012 rénovation' },
      { label: 'DURÉE', value: '18 mois' },
      { label: 'ANNÉE', value: '2021' },
    ],
    planImage: '/project-11.jpg',
    planCaption: 'Plan — échelle 1/300',
    gallery: [
      { image: '/project-11.jpg', caption: "Façade sud avec terrasses", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-11.jpg', caption: 'Salon voûté', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-11.jpg', caption: "Cave de dégustation", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-11.jpg', caption: 'Piscine et jardin', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-11.jpg', caption: 'Chambre avec vue vignes', credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-11.jpg', caption: "Orangerie rénovée", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['refuge-alpin', 'maison-l', 'residence-jardins'],
  },
  'mediatheque-du-sud': {
    slug: 'mediatheque-du-sud',
    name: 'Médiathèque du Sud',
    category: 'PUBLIC',
    year: 2020,
    location: 'Toulouse',
    heroImage: '/project-12.jpg',
    contextHeadline: "Un sanctuaire de lecture et de lumière",
    contextBody1: "Cette médiathèque de 4 000 m² se distingue par son espace central à double hauteur inondé de lumière naturelle. Un atrium en bois lamellé-collé culmine à 12 mètres.",
    contextBody2: "Les rayonnements s'organisent en îlots thématiques, chacun avec son ambiance propre. Des espaces de travail collectif, des boxes individuels et un auditorium de 100 places complètent l'offre.",
    contextImage: '/project-12.jpg',
    contextCaption: "Concours d'architecture 2018",
    specs: [
      { label: "MAÎTRE D'OUVRAGE", value: 'Métropole de Toulouse' },
      { label: 'SURFACE', value: '4 000 m²' },
      { label: 'BUDGET', value: '9.8 M€ HT' },
      { label: 'MATÉRIAUX', value: 'Bois lamellé-collé, verre, béton brut' },
      { label: 'NORMES', value: 'ERP type L, HQE, RT2012' },
      { label: 'DURÉE', value: '30 mois' },
      { label: 'ANNÉE', value: '2020' },
    ],
    planImage: '/project-12.jpg',
    planCaption: 'Plan RDC — échelle 1/500',
    gallery: [
      { image: '/project-12.jpg', caption: "Atrium central", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-12.jpg', caption: "Salle de lecture", credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-12.jpg', caption: "Détail charpente bois", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-12.jpg', caption: 'Auditorium', credit: 'Takuji Shimmura', orientation: 'landscape' },
      { image: '/project-12.jpg', caption: "Espace jeunesse", credit: 'Cyrille Weiner', orientation: 'portrait' },
      { image: '/project-12.jpg', caption: "Façade ouest, fin de journée", credit: 'Takuji Shimmura', orientation: 'landscape' },
    ],
    relatedSlugs: ['centre-culturel-m', 'pavillon-du-lac', 'siege-social-techvert'],
  },
};

/* ---- simple list for related projects ---- */
const RELATED_PROJECT_META = [
  { slug: 'maison-l', name: 'Maison L', category: 'RÉSIDENTIEL', year: 2024, image: '/project-01.jpg' },
  { slug: 'loft-saint-antoine', name: 'Loft Saint-Antoine', category: 'RÉNOVATION', year: 2024, image: '/project-02.jpg' },
  { slug: 'centre-culturel-m', name: 'Centre Culturel M', category: 'PUBLIC', year: 2023, image: '/project-03.jpg' },
  { slug: 'refuge-alpin', name: 'Refuge Alpin', category: 'HÔTELLERIE', year: 2023, image: '/project-04.jpg' },
  { slug: 'boutique-hotel-l-ours', name: "Boutique Hôtel L'Ours", category: 'INTÉRIEUR', year: 2023, image: '/project-05.jpg' },
  { slug: 'siege-social-techvert', name: 'Siège Social TechVert', category: 'BUREAUX', year: 2022, image: '/project-06.jpg' },
  { slug: 'villa-restaurée-v', name: 'Villa Restaurée V', category: 'RÉNOVATION', year: 2022, image: '/project-07.jpg' },
  { slug: 'residence-jardins', name: 'Résidence Jardins', category: 'RÉSIDENTIEL', year: 2022, image: '/project-08.jpg' },
  { slug: 'pavillon-du-lac', name: 'Pavillon du Lac', category: 'PUBLIC', year: 2021, image: '/project-09.jpg' },
  { slug: 'micro-logements-z', name: 'Micro-Logements Z', category: 'URBAINE', year: 2021, image: '/project-10.jpg' },
  { slug: 'domaine-viticole-r', name: 'Domaine Viticole R', category: 'RÉSIDENTIEL', year: 2021, image: '/project-11.jpg' },
  { slug: 'mediatheque-du-sud', name: 'Médiathèque du Sud', category: 'PUBLIC', year: 2020, image: '/project-12.jpg' },
];

/* ------------------------------------------------------------------ */
/*  Notch Divider                                                      */
/* ------------------------------------------------------------------ */

function NotchDivider() {
  return (
    <div className="flex flex-col items-center" style={{ marginTop: '6rem', marginBottom: '6rem' }}>
      <div
        className="rounded-full"
        style={{
          width: '40px',
          height: '12px',
          backgroundColor: '#947955',
          marginBottom: '-6px',
        }}
      />
      <div style={{ width: '120px', height: '1px', backgroundColor: 'rgba(33, 46, 68, 0.1)' }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project Detail Page                                                */
/* ------------------------------------------------------------------ */

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const project = useMemo(() => {
    if (!slug) return null;
    return PROJECTS_DB[slug] || null;
  }, [slug]);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return project.relatedSlugs
      .map((s) => RELATED_PROJECT_META.find((p) => p.slug === s))
      .filter(Boolean) as typeof RELATED_PROJECT_META;
  }, [project]);

  const heroRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  /* ---- Hero plane scroll animation ---- */
  useGSAP(() => {
    if (!heroRef.current || !planeRef.current) return;

    gsap.to(planeRef.current, {
      y: '0vh',
      z: 800,
      rotateY: -5,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '80% top',
        scrub: 1,
      },
    });
  }, { scope: heroRef, dependencies: [slug] });

  /* ---- Title entrance ---- */
  useGSAP(() => {
    if (!titleRef.current) return;

    gsap.from(titleRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3,
    });
  }, { scope: titleRef, dependencies: [slug] });

  /* ---- Context section ---- */
  useGSAP(() => {
    if (!contextRef.current) return;

    const leftCol = contextRef.current.querySelector('.context-left');
    const rightCol = contextRef.current.querySelector('.context-right');

    if (leftCol) {
      gsap.from(leftCol, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: contextRef.current, start: 'top 75%', once: true },
      });
    }
    if (rightCol) {
      gsap.from(rightCol, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: { trigger: contextRef.current, start: 'top 75%', once: true },
      });
    }
  }, { scope: contextRef, dependencies: [slug] });

  /* ---- Specs section ---- */
  useGSAP(() => {
    if (!specsRef.current) return;

    const headline = specsRef.current.querySelector('.specs-headline');
    const rows = specsRef.current.querySelectorAll('.spec-row');
    const planImg = specsRef.current.querySelector('.spec-plan');

    if (headline) {
      gsap.from(headline, {
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: specsRef.current, start: 'top 75%', once: true },
      });
    }

    if (rows.length) {
      gsap.from(rows, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: specsRef.current, start: 'top 70%', once: true },
      });
    }

    if (planImg) {
      gsap.from(planImg, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: { trigger: specsRef.current, start: 'top 70%', once: true },
      });
    }
  }, { scope: specsRef, dependencies: [slug] });

  /* ---- Gallery section ---- */
  useGSAP(() => {
    if (!galleryRef.current) return;

    const headline = galleryRef.current.querySelector('.gallery-headline');
    const images = galleryRef.current.querySelectorAll('.gallery-item');

    if (headline) {
      gsap.from(headline, {
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: galleryRef.current, start: 'top 75%', once: true },
      });
    }

    if (images.length) {
      gsap.from(images, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: galleryRef.current, start: 'top 70%', once: true },
      });
    }
  }, { scope: galleryRef, dependencies: [slug] });

  /* ---- Related projects section ---- */
  useGSAP(() => {
    if (!relatedRef.current) return;

    const headline = relatedRef.current.querySelector('.related-headline');
    const cards = relatedRef.current.querySelectorAll('.related-card');

    if (headline) {
      gsap.from(headline, {
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: relatedRef.current, start: 'top 75%', once: true },
      });
    }

    if (cards.length) {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: relatedRef.current, start: 'top 70%', once: true },
      });
    }
  }, { scope: relatedRef, dependencies: [slug] });

  /* ---- Not found ---- */
  if (!project) {
    return (
      <Layout>
        <div
          className="min-h-[100dvh] flex items-center justify-center"
          style={{ backgroundColor: '#e4ceac' }}
        >
          <div className="text-center pt-20">
            <h1
              className="uppercase font-normal mb-4"
              style={{ fontSize: '60px', lineHeight: '0.85', letterSpacing: '-1.8px', color: '#212e44' }}
            >
              Projet non trouvé
            </h1>
            <Link
              to="/projets"
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: '#eb7e56' }}
            >
              <ArrowLeft size={16} />
              Retour au portfolio
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ======== SECTION 1: PROJECT HERO ======== */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          height: '80vh',
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
            transform: 'translateZ(-400px) rotateY(-15deg) translateY(-60vh)',
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
              src={project.heroImage}
              alt={project.name}
              className="w-full h-full object-cover"
              style={{ transform: 'scale(2)', transformOrigin: 'center center' }}
            />
          </div>
        </div>

        {/* Title Overlay */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, paddingTop: '16vh' }}
        >
          <h1
            className="uppercase font-normal text-center"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: '0.85',
              letterSpacing: '-2.4px',
              color: '#212e44',
            }}
          >
            {project.name}
          </h1>
          <div
            className="flex items-center gap-3 mt-5"
            style={{
              fontSize: '14px',
              letterSpacing: '0.7px',
              color: '#eb7e56',
              lineHeight: '1.0',
            }}
          >
            <span className="uppercase">{project.category}</span>
            <span style={{ color: 'rgba(33, 46, 68, 0.3)' }}>·</span>
            <span className="uppercase">{project.year}</span>
            <span style={{ color: 'rgba(33, 46, 68, 0.3)' }}>·</span>
            <span className="uppercase">{project.location}</span>
          </div>
          <div
            className="mt-8 mx-auto"
            style={{
              width: '120px',
              height: '1px',
              backgroundColor: 'rgba(33, 46, 68, 0.1)',
            }}
          />
        </div>
      </div>

      {/* ======== SECTION 2: CONTEXTE & CONCEPT ======== */}
      <div
        ref={contextRef}
        style={{ backgroundColor: '#e4ceac', paddingTop: '15rem', paddingBottom: '0' }}
      >
        <div
          className="mx-auto px-content"
          style={{ maxWidth: '1200px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left: Text */}
            <div className="context-left">
              <span
                className="uppercase block mb-4"
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.7px',
                  color: '#eb7e56',
                  lineHeight: '1.0',
                }}
              >
                CONTEXTE
              </span>
              <h2
                className="uppercase font-normal mb-8"
                style={{
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  lineHeight: '1.0',
                  letterSpacing: '-1.2px',
                  color: '#212e44',
                }}
              >
                {project.contextHeadline}
              </h2>
              <p
                className="mb-6"
                style={{
                  fontSize: '18px',
                  lineHeight: '1.4',
                  letterSpacing: '-0.54px',
                  color: '#212e44',
                }}
              >
                {project.contextBody1}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.4',
                  letterSpacing: '-0.54px',
                  color: '#212e44',
                }}
              >
                {project.contextBody2}
              </p>
            </div>

            {/* Right: Image */}
            <div className="context-right">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3 / 4', borderRadius: '4px' }}
              >
                <img
                  src={project.contextImage}
                  alt={project.contextCaption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                className="mt-3 italic"
                style={{
                  fontSize: '14px',
                  color: 'rgba(33, 46, 68, 0.5)',
                }}
              >
                {project.contextCaption}
              </p>
              <p
                className="mt-1 uppercase"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.5px',
                  color: '#eb7e56',
                }}
              >
                Crédit photo : Cyrille Weiner
              </p>
            </div>
          </div>
        </div>
      </div>

      <NotchDivider />

      {/* ======== SECTION 3: FICHE TECHNIQUE ======== */}
      <div
        ref={specsRef}
        style={{ backgroundColor: '#e4ceac', paddingTop: '0', paddingBottom: '0' }}
      >
        <div className="max-w-container mx-auto px-content">
          <h2
            className="specs-headline uppercase font-normal text-center mb-16"
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: '1.0',
              letterSpacing: '-1.2px',
              color: '#212e44',
            }}
          >
            Fiche <em className="italic">Technique</em>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left: Specs */}
            <div>
              {project.specs.map((spec, i) => (
                <div
                  key={i}
                  className="spec-row"
                  style={{
                    borderBottom: '1px solid rgba(33, 46, 68, 0.1)',
                    paddingTop: '1.25rem',
                    paddingBottom: '1.25rem',
                  }}
                >
                  <span
                    className="uppercase block mb-1"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.7px',
                      color: '#eb7e56',
                      lineHeight: '1.0',
                    }}
                  >
                    {spec.label}
                  </span>
                  <span
                    style={{
                      fontSize: '18px',
                      letterSpacing: '-0.54px',
                      color: '#212e44',
                    }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Plan */}
            <div className="spec-plan">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4 / 3',
                  borderRadius: '4px',
                  border: '1px solid rgba(33, 46, 68, 0.1)',
                }}
              >
                <img
                  src={project.planImage}
                  alt={project.planCaption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                className="mt-3 italic"
                style={{
                  fontSize: '14px',
                  color: 'rgba(33, 46, 68, 0.5)',
                }}
              >
                {project.planCaption}
              </p>
              <p
                className="mt-1 uppercase"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.5px',
                  color: '#eb7e56',
                }}
              >
                Crédit photo : Cyrille Weiner
              </p>
            </div>
          </div>
        </div>
      </div>

      <NotchDivider />

      {/* ======== SECTION 4: GALERIE PHOTOS ======== */}
      <div
        ref={galleryRef}
        style={{ backgroundColor: '#e4ceac', paddingTop: '0', paddingBottom: '15rem' }}
      >
        <div className="max-w-container mx-auto px-content">
          <h2
            className="gallery-headline uppercase font-normal text-center mb-16"
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: '1.0',
              letterSpacing: '-1.2px',
              color: '#212e44',
            }}
          >
            Galerie <em className="italic">Photos</em>
          </h2>

          {/* Masonry 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '3rem' }}>
            {/* Left column */}
            <div className="flex flex-col" style={{ gap: '3rem' }}>
              {project.gallery.filter((_, i) => i % 2 === 0).map((photo, i) => (
                <div key={`left-${i}`} className="gallery-item group">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: photo.orientation === 'portrait' ? '3 / 4' : '4 / 3',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <p
                    className="mt-3 italic"
                    style={{
                      fontSize: '14px',
                      color: 'rgba(33, 46, 68, 0.5)',
                    }}
                  >
                    {photo.caption}
                  </p>
                  <p
                    className="mt-1 uppercase"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                      color: '#eb7e56',
                    }}
                  >
                    Crédit photo : {photo.credit}
                  </p>
                </div>
              ))}
            </div>

            {/* Right column — offset with extra top margin for masonry */}
            <div className="flex flex-col" style={{ gap: '3rem', marginTop: '4rem' }}>
              {project.gallery.filter((_, i) => i % 2 === 1).map((photo, i) => (
                <div key={`right-${i}`} className="gallery-item group">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: photo.orientation === 'portrait' ? '3 / 4' : '4 / 3',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <p
                    className="mt-3 italic"
                    style={{
                      fontSize: '14px',
                      color: 'rgba(33, 46, 68, 0.5)',
                    }}
                  >
                    {photo.caption}
                  </p>
                  <p
                    className="mt-1 uppercase"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                      color: '#eb7e56',
                    }}
                  >
                    Crédit photo : {photo.credit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======== SECTION 5: PROJETS SIMILAIRES ======== */}
      <div
        ref={relatedRef}
        style={{ backgroundColor: '#e4ceac', paddingTop: '0', paddingBottom: '15rem' }}
      >
        <div className="max-w-container mx-auto px-content">
          <h2
            className="related-headline uppercase font-normal text-center mb-16"
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: '1.0',
              letterSpacing: '-1.2px',
              color: '#212e44',
            }}
          >
            Projets <em className="italic">Similaires</em>
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '6rem' }}
          >
            {relatedProjects.map((rp) => (
              <Link
                key={rp.slug}
                to={`/projets/${rp.slug}`}
                className="related-card group block"
              >
                <div
                  className="relative overflow-hidden mb-5"
                  style={{ aspectRatio: '4 / 3', borderRadius: '4px' }}
                >
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
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
                  {rp.name}
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
                    {rp.category}
                  </span>
                  <span style={{ color: 'rgba(33, 46, 68, 0.3)' }}>·</span>
                  <span style={{ fontSize: '14px', color: 'rgba(33, 46, 68, 0.5)' }}>
                    {rp.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to portfolio */}
          <div className="text-center" style={{ marginTop: '8rem' }}>
            <Link
              to="/projets"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:opacity-70"
              style={{
                fontSize: '18px',
                letterSpacing: '-0.54px',
                color: '#212e44',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              <ArrowLeft size={18} />
              Retour au portfolio
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
