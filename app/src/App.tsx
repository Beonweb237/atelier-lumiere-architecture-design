import { Routes, Route } from 'react-router-dom';
import { useLenis } from '@/hooks/useLenis';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Approach from '@/pages/Approach';
import Expertises from '@/pages/Expertises';
import Team from '@/pages/Team';
import Publications from '@/pages/Publications';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import Admin from '@/pages/Admin';

export default function App() {
  useLenis();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projets" element={<Projects />} />
      <Route path="/projets/:slug" element={<ProjectDetail />} />
      <Route path="/approche" element={<Approach />} />
      <Route path="/expertises" element={<Expertises />} />
      <Route path="/equipe" element={<Team />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mentions-legales" element={<Legal />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
