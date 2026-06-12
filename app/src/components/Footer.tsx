import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#e4ceac', paddingTop: '15rem', paddingBottom: '4rem' }}>
      <div className="max-w-container mx-auto px-content">
        <div className="mb-16">
          <h3
            className="uppercase font-normal"
            style={{
              fontSize: '40px',
              lineHeight: '1.0',
              letterSpacing: '-1.2px',
              color: '#212e44',
            }}
          >
            CONSTRUIRE AVEC LA <em className="italic">LUMIÈRE</em>
          </h3>
        </div>

        <div
          className="w-full mb-12"
          style={{ height: '1px', backgroundColor: 'rgba(33, 46, 68, 0.1)' }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p
            className="text-sm"
            style={{ color: 'rgba(33, 46, 68, 0.6)', letterSpacing: '-0.54px' }}
          >
            © 2025 Atelier Lumière
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: '#212e44', letterSpacing: '-0.54px' }}
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: '#212e44', letterSpacing: '-0.54px' }}
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: '#212e44', letterSpacing: '-0.54px' }}
            >
              Pinterest
            </a>
          </div>

          <p
            className="text-sm"
            style={{ color: 'rgba(33, 46, 68, 0.6)', letterSpacing: '-0.54px' }}
          >
            Conçu avec soin
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 text-xs" style={{ color: 'rgba(33, 46, 68, 0.4)' }}>
          <Link to="/" className="hover:opacity-70 transition-opacity">Accueil</Link>
          <Link to="/projets" className="hover:opacity-70 transition-opacity">Projets</Link>
          <Link to="/approche" className="hover:opacity-70 transition-opacity">Approche</Link>
          <Link to="/expertises" className="hover:opacity-70 transition-opacity">Expertises</Link>
          <Link to="/equipe" className="hover:opacity-70 transition-opacity">Équipe</Link>
          <Link to="/publications" className="hover:opacity-70 transition-opacity">Publications</Link>
          <Link to="/a-propos" className="hover:opacity-70 transition-opacity">À Propos</Link>
          <Link to="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
          <Link to="/mentions-legales" className="hover:opacity-70 transition-opacity">Mentions Légales</Link>
          <Link to="/admin" className="hover:opacity-70 transition-opacity">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
