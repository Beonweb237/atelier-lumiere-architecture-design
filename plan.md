# Plan — Template Premium : Cabinet d'Architecture & Bureau d'Etudes

## Contexte
Secteur 25 de la bibliotheque de templates premium. Template React/Next.js pour cabinets d'architecture, bureaux d'etudes structure, BET, cabinets d'urbanisme, paysagistes et designers d'interieur.

## Objectif
Creer un template web premium, realiste et vendable qui mette en valeur un portfolio architectural spectaculaire avec une identite creative forte. Le site doit etre lui-meme une oeuvre architecturale.

## Etapes d'Execution

### Stage 1 — Design System & Assets
- Creer le design system complet (couleurs, typographie, espacement, composants)
- Generer les images d'architecture de demonstration (hero, projets, equipe)
- Produire le design.md avec toutes les specifications visuelles

### Stage 2 — Structure du Projet & Configuration
- Initialiser le projet Next.js avec Tailwind CSS et shadcn/ui
- Configurer le design system (typographie Geist, palette couleurs)
- Mettre en place le layout principal, navigation et footer

### Stage 3 — Pages Publiques (Batch 1)
- Page Accueil (Hero + Approche + Portfolio preview + Equipe + CTA)
- Page Portfolio (Galerie filtree + Fiches projets)
- Page Detail Projet (Contexte + Concept + Specs + Photos)

### Stage 4 — Pages Publiques (Batch 2)
- Page Approche / Philosophie
- Page Expertises (Architecture, Urbanisme, Interieur, Paysage, Restauration)
- Page Equipe (Architectes, Urbanistes, Ingenieurs)
- Page Publications (Articles, Prix, Conferences)
- Page A Propos (Histoire, Philosophie, Valeurs, Chiffres)
- Page Contact (Formulaire avec type de projet)

### Stage 5 — Espace Admin (Optionnel)
- Dashboard admin simplifie
- Gestion du portfolio, publications, contacts

### Stage 6 — Polish & Deploy
- SEO metadata, Schema.org markup
- Accessibility WCAG AA
- Animations et transitions
- Deploy

## Competences Requises
- `web-template-library` : Guide de conception du template
- `vibecoding-webapp-swarm` : Construction du webapp React

## Architecture des Pages

### Pages Publiques (10 pages)
1. **Accueil** — Hero projet phare, approche en 3 etapes, portfolio apercu, equipe, CTA
2. **Portfolio** — Realisations filtrables par typologie (logement, bureaux, culture, equipement, urbanisme)
3. **Detail Projet** — Contexte, concept, specs techniques, equipe, photos HD
4. **Approche** — Processus creatif, methodologie, outils (BIM, maquette 3D)
5. **Expertises** — Architecture, urbanisme, interieur, paysage, restauration, BIM
6. **Equipe** — Architectes, urbanistes, ingenieurs, dessinateurs
7. **Publications** — Articles, conferences, prix, expositions
8. **A Propos** — Histoire, philosophie, valeurs, chiffres cles
9. **Contact** — Formulaire avec type de projet et budget, coordonnees
10. **Mentions Legales** — Ordre des Architectes, OPQIBI, RGPD

### Espace Admin (optionnel)
- Dashboard avec stats simplifiees
- Gestion des projets (CRUD)
- Gestion des contacts
- Gestion des publications

## Composants Reutilisables
- Navigation sticky avec backdrop blur
- Hero avec projet phare
- Portfolio immersif (grande photo + titre + type + annee)
- Filtres de portfolio multi-criteres
- Fiche projet detaillee
- Carte equipe (photo + nom + role + specialite)
- Temoignage client
- Chiffres cles
- Formulaire de contact avec selecteur projet
- Grille de publications/prix
- Footer 4 colonnes

## Design Direction
- **Palette** : Blanc pur (#FFFFFF) bg, Noir profond (#0A0A0A) text, accent Terre cuite (#C2410C)
- **Typographie** : Geist Sans (titres, 400-700), Geist Mono (labels/data)
- **Mood** : Minimaliste, conceptuel, lumineux, architectural, epure
- **Espacement** : Genereux (80-120px section padding)
- **Animations** : Fade-up entrance, scroll reveals, hover transitions
