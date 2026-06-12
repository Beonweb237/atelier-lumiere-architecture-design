import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  Mail,
  FileText,
  Eye,
  Plus,
  Pencil,
  Trash2,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ProjectStatus = 'Livré' | 'En cours' | 'Concours';
type ContactStatus = 'non-lu' | 'lu' | 'archive';
type PubType = 'Article' | 'Prix' | 'Conférence';

interface Project {
  id: number;
  name: string;
  category: string;
  status: ProjectStatus;
  year: number;
  location: string;
  surface: string;
  description: string;
  client: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  location: string;
  date: string;
  message: string;
  status: ContactStatus;
}

interface Publication {
  id: number;
  title: string;
  source: string;
  date: string;
  type: PubType;
  excerpt: string;
  published: boolean;
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const INITIAL_PROJECTS: Project[] = [
  { id: 1, name: 'Villa Lumière', category: 'Résidentiel', status: 'Livré', year: 2024, location: 'Lyon', surface: '340 m²', description: 'Maison contemporaine avec patio central et toiture végétalisée.', client: 'Famille Dubois' },
  { id: 2, name: 'Centre Culturel Mosaïque', category: 'Public', status: 'En cours', year: 2025, location: 'Saint-Étienne', surface: '2 800 m²', description: 'Centre culturel avec salle de spectacle, médiathèque et ateliers artistiques.', client: 'Métropole de Saint-Étienne' },
  { id: 3, name: 'Loft Industriel', category: 'Rénovation', status: 'Livré', year: 2023, location: 'Lyon', surface: '180 m²', description: 'Rénovation complète d\'un ancien atelier textile en loft résidentiel.', client: 'Sophie Martin' },
  { id: 4, name: 'Pavillon Alpin', category: 'Résidentiel', status: 'Livré', year: 2023, location: 'Chamonix', surface: '220 m²', description: 'Chalet contemporain avec vue panoramique sur le Mont-Blanc.', client: 'Famille Rousseau' },
  { id: 5, name: 'Bureau Vert', category: 'Public', status: 'En cours', year: 2025, location: 'Grenoble', surface: '4 500 m²', description: 'Immeuble de bureaux BBC avec façade bois et jardins suspendus.', client: 'GreenTech SA' },
  { id: 6, name: 'Hôtel L\'Océanide', category: 'Intérieur', status: 'Livré', year: 2024, location: 'Biarritz', surface: '1 200 m²', description: 'Rénovation intérieure d\'un hôtel boutique face à l\'océan.', client: 'Groupe Hôtellerie Luxe' },
  { id: 7, name: 'Concours Bibliothèque', category: 'Public', status: 'Concours', year: 2025, location: 'Lyon', surface: '5 000 m²', description: 'Projet lauréat pour une médiathèque métropolitaine.', client: 'Grand Lyon' },
  { id: 8, name: 'Maison Passive', category: 'Résidentiel', status: 'En cours', year: 2025, location: 'Annecy', surface: '160 m²', description: 'Maison passive avec ossature bois et panneaux solaires intégrés.', client: 'Famille Bernard' },
  { id: 9, name: 'Micro-Logements', category: 'Public', status: 'Livré', year: 2022, location: 'Lyon', surface: '650 m²', description: 'Immeuble de 12 micro-logements innovants en centre-ville.', client: 'Société HLM du Grand Lyon' },
  { id: 10, name: 'Vignoble des Côteaux', category: 'Paysage', status: 'Livré', year: 2023, location: 'Beaujolais', surface: '3 ha', description: 'Aménagement d\'un domaine viticole avec chai et salle de dégustation.', client: 'Domaine des Côteaux' },
  { id: 11, name: 'Pavillon Lacustre', category: 'Résidentiel', status: 'En cours', year: 2025, location: 'Lac d\'Annecy', surface: '145 m²', description: 'Pavillon sur pilotis avec structure bois et toit végétalisé.', client: 'Famille Moreau' },
  { id: 12, name: 'Restoration Monument', category: 'Rénovation', status: 'En cours', year: 2025, location: 'Lyon', surface: '1 800 m²', description: 'Restauration d\'un hôtel particulier du XVIIIe siècle.', client: 'DRAC Auvergne-Rhône-Alpes' },
];

const INITIAL_CONTACTS: Contact[] = [
  { id: 1, name: 'Claire Fontaine', email: 'claire.fontaine@email.fr', phone: '06 12 34 56 78', projectType: 'Rénovation', budget: '300 000 - 500 000 €', location: 'Lyon 6e', date: '2025-01-15', message: 'Nous souhaitons rénover notre appartement haussmannien de 180m² en conservant les éléments anciens tout en intégrant des solutions contemporaines.', status: 'non-lu' },
  { id: 2, name: 'Marc Lefebvre', email: 'm.lefebvre@enterprise.fr', phone: '07 23 45 67 89', projectType: 'Construction neuve', budget: '1 000 000 - 2 000 000 €', location: 'Saint-Étienne', date: '2025-01-14', message: 'Projet de construction d\'un siège social pour notre entreprise, environ 3000m² sur un terrain de 8000m².', status: 'lu' },
  { id: 3, name: 'Sophie Durand', email: 'sophie.durand@email.fr', phone: '06 34 56 78 90', projectType: 'Extension', budget: '150 000 - 300 000 €', location: 'Caluire-et-Cuire', date: '2025-01-12', message: 'Extension de notre maison individuelle pour ajouter un bureau et une chambre, environ 40m².', status: 'non-lu' },
  { id: 4, name: 'Jean-Pierre Martin', email: 'jp.martin@mairie.fr', phone: '04 78 12 34 56', projectType: 'Équipement public', budget: '> 2 000 000 €', location: 'Villeurbanne', date: '2025-01-10', message: 'Étude préliminaire pour une nouvelle médiathèque de quartier, surface totale envisagée 1500m².', status: 'lu' },
  { id: 5, name: 'Émilie Rousseau', email: 'emilie.r@email.fr', phone: '06 45 67 89 01', projectType: 'Rénovation', budget: '500 000 - 1 000 000 €', location: 'Lyon 2e', date: '2025-01-08', message: 'Rénovation complète d\'un loft canut de 250m² avec création d\'une terrasse sur le toit.', status: 'non-lu' },
  { id: 6, name: 'Thomas Bernard', email: 't.bernard@promo.fr', phone: '07 56 78 90 12', projectType: 'Construction neuve', budget: '5 000 000 - 10 000 000 €', location: 'Lyon 9e', date: '2025-01-06', message: 'Programme de 40 logements collectifs avec espaces verts et parking souterrain.', status: 'archive' },
  { id: 7, name: 'Anne-Sophie Petit', email: 'as.petit@email.fr', phone: '06 67 89 01 23', projectType: 'Intérieur', budget: '< 150 000 €', location: 'Écully', date: '2025-01-05', message: 'Aménagement intérieur d\'une maison neuve, conseil en décoration et choix des matériaux.', status: 'lu' },
  { id: 8, name: 'Philippe Garnier', email: 'p.garnier@hotel.fr', phone: '06 78 90 12 34', projectType: 'Rénovation', budget: '2 000 000 - 5 000 000 €', location: 'Lyon 1er', date: '2025-01-03', message: 'Rénovation d\'un hôtel 4 étoiles du centre historique, 45 chambres.', status: 'non-lu' },
];

const INITIAL_PUBLICATIONS: Publication[] = [
  { id: 1, title: 'Lumière et Matière : une architecture sensible', source: 'ArchDaily France', date: '2024-12-15', type: 'Article', excerpt: 'Retour sur notre approche architecturale alliant lumière naturelle et matériaux bruts.', published: true },
  { id: 2, title: 'Prix de l\'Architecture Régionale 2024', source: 'Ordre des Architectes Auvergne-Rhône-Alpes', date: '2024-11-20', type: 'Prix', excerpt: 'Lauréats du prix régional pour le projet Centre Culturel Mosaïque.', published: true },
  { id: 3, title: 'Construire avec le Paysage', source: 'Salon de l\'Architecture, Paris', date: '2024-10-08', type: 'Conférence', excerpt: 'Conférence sur l\'intégration paysagère dans l\'architecture contemporaine.', published: true },
  { id: 4, title: 'Les Matériaux Bio-Sourcés en Architecture', source: 'Le Moniteur', date: '2024-09-12', type: 'Article', excerpt: 'Article sur l\'utilisation de matériaux bio-sourcés dans nos projets récents.', published: true },
  { id: 5, title: 'Rénovation Patrimoniale : défis et solutions', source: 'Villa Noailles, Hyères', date: '2024-06-22', type: 'Conférence', excerpt: 'Table ronde sur la rénovation des bâtiments historiques.', published: false },
  { id: 6, title: 'Prix AMI Bois Construction 2024', source: 'France Bois', date: '2024-05-15', type: 'Prix', excerpt: 'Mention spéciale pour le projet Pavillon Lacustre.', published: true },
];

const ACTIVITIES = [
  { date: '15 JAN 2025', action: 'Nouveau contact — Maison L, Lyon (Famille D.)' },
  { date: '14 JAN 2025', action: 'Projet mis à jour — Centre Culturel M (ajout photos)' },
  { date: '12 JAN 2025', action: 'Nouvel article ajouté — \'Lumière et Matière\'' },
  { date: '10 JAN 2025', action: 'Nouveau contact — Rénovation loft, Lyon (Sophie D.)' },
  { date: '08 JAN 2025', action: 'Projet ajouté — Villa Restaurée V' },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function statusBadgeStyle(status: ProjectStatus) {
  if (status === 'Livré') return { backgroundColor: '#e4ceac', color: '#212e44', border: '1px solid rgba(33,46,68,0.2)' };
  if (status === 'En cours') return { backgroundColor: '#eb7e56', color: '#212e44' };
  return { backgroundColor: '#212e44', color: '#e4ceac' };
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatCard({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) {
  return (
    <div
      className="rounded p-8 flex flex-col gap-3"
      style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}
    >
      <div style={{ color: '#eb7e56' }}>{icon}</div>
      <div className="text-4xl font-normal" style={{ color: '#212e44', letterSpacing: '-1.08px' }}>
        {number}
      </div>
      <div className="text-label uppercase" style={{ color: 'rgba(33,46,68,0.5)', fontSize: '14px', letterSpacing: '0.7px' }}>
        {label}
      </div>
    </div>
  );
}

/* ----- Overview Tab ----- */
function OverviewTab() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard icon={<FolderOpen size={24} />} number="12" label="PROJETS" />
        <StatCard icon={<Mail size={24} />} number="8" label="NOUVEAUX CONTACTS (30J)" />
        <StatCard icon={<FileText size={24} />} number="6" label="PUBLICATIONS" />
        <StatCard icon={<Eye size={24} />} number="2 450" label="VISITES (30J)" />
      </div>

      {/* Recent Activity */}
      <div className="mt-16">
        <h4
          className="uppercase font-normal mb-8"
          style={{ fontSize: '30px', lineHeight: '1.0', letterSpacing: '-0.9px', color: '#212e44' }}
        >
          Activité récente
        </h4>
        <div className="max-w-[800px] flex flex-col">
          {ACTIVITIES.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-6 py-4"
              style={{ borderBottom: '1px solid rgba(33,46,68,0.08)' }}
            >
              <span
                className="uppercase shrink-0"
                style={{ fontSize: '14px', letterSpacing: '0.7px', color: '#eb7e56', width: '110px' }}
              >
                {a.date}
              </span>
              <span style={{ fontSize: '16px', color: '#212e44' }}>{a.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-16">
        <h4
          className="uppercase font-normal mb-8"
          style={{ fontSize: '30px', lineHeight: '1.0', letterSpacing: '-0.9px', color: '#212e44' }}
        >
          Actions rapides
        </h4>
        <div className="flex flex-wrap gap-8">
          <button
            className="px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#212e44', color: '#e4ceac', borderRadius: '25px' }}
            onClick={() => { /* would switch tab */ }}
          >
            + Nouveau projet
          </button>
          <button
            className="px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#212e44', color: '#e4ceac', borderRadius: '25px' }}
            onClick={() => { /* would switch tab */ }}
          >
            + Nouvelle publication
          </button>
          <button
            className="px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:opacity-70"
            style={{ backgroundColor: 'transparent', color: '#212e44', borderRadius: '25px', border: '1px solid #212e44' }}
            onClick={() => navigate('/')}
          >
            Voir le site →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----- Projects Tab ----- */
function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({});

  const itemsPerPage = 8;

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const categories = ['all', ...Array.from(new Set(INITIAL_PROJECTS.map((p) => p.category)))];
  const statuses = ['all', 'Livré', 'En cours', 'Concours'];

  function openCreate() {
    setFormData({ name: '', category: 'Résidentiel', status: 'En cours', year: 2025, location: '', surface: '', description: '', client: '' });
    setIsCreateOpen(true);
  }

  function openEdit(p: Project) {
    setFormData({ ...p });
    setEditProject(p);
  }

  function saveProject() {
    if (!formData.name) return;
    if (editProject) {
      setProjects((prev) => prev.map((p) => (p.id === editProject.id ? { ...p, ...formData } as Project : p)));
      setEditProject(null);
    } else {
      const newProject: Project = { ...formData as Project, id: Date.now() };
      setProjects((prev) => [...prev, newProject]);
      setIsCreateOpen(false);
    }
    setFormData({});
  }

  function deleteProject(id: number) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  }

  const inputClass = 'border-0 border-b rounded-none px-0 py-2 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0';
  const inputStyle = { borderBottom: '1px solid rgba(33,46,68,0.2)', backgroundColor: 'transparent' };

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="uppercase font-normal" style={{ fontSize: '40px', lineHeight: '1.0', letterSpacing: '-1.2px', color: '#212e44' }}>
          Projets
        </h3>
        <Button
          onClick={openCreate}
          className="px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: '#212e44', color: '#e4ceac', borderRadius: '25px' }}
        >
          <Plus size={16} className="mr-2" />
          Nouveau projet
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2" style={{ color: 'rgba(33,46,68,0.4)' }} />
          <Input
            placeholder="Rechercher un projet..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-6 w-[300px] border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ borderBottom: '1px solid rgba(33,46,68,0.2)', backgroundColor: 'transparent' }}
          />
        </div>
        <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[160px] border-0 border-b rounded-none focus:ring-0" style={{ borderBottom: '1px solid rgba(33,46,68,0.2)' }}>
            <SelectValue placeholder="Typologie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            {categories.filter((c) => c !== 'all').map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[160px] border-0 border-b rounded-none focus:ring-0" style={{ borderBottom: '1px solid rgba(33,46,68,0.2)' }}>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>{s === 'all' ? 'Tous' : s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded overflow-hidden" style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}>
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: 'rgba(33,46,68,0.03)' }}>
              <TableHead className="uppercase text-xs font-normal" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Nom</TableHead>
              <TableHead className="uppercase text-xs font-normal" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Typologie</TableHead>
              <TableHead className="uppercase text-xs font-normal" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Année</TableHead>
              <TableHead className="uppercase text-xs font-normal" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Statut</TableHead>
              <TableHead className="uppercase text-xs font-normal text-right" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((p) => (
              <TableRow key={p.id} style={{ borderBottom: '1px solid rgba(33,46,68,0.05)' }}>
                <TableCell className="font-normal" style={{ fontSize: '16px', color: '#212e44' }}>{p.name}</TableCell>
                <TableCell style={{ fontSize: '16px', color: '#212e44' }}>{p.category}</TableCell>
                <TableCell style={{ fontSize: '16px', color: '#212e44' }}>{p.year}</TableCell>
                <TableCell>
                  <Badge className="rounded-full px-3 py-1 text-xs font-normal" style={statusBadgeStyle(p.status)}>
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button onClick={() => openEdit(p)} className="inline-flex items-center justify-center w-8 h-8 rounded transition-colors hover:bg-black/5 mr-1" style={{ color: '#212e44' }}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleteConfirm(p.id)} className="inline-flex items-center justify-center w-8 h-8 rounded transition-colors hover:bg-red-50" style={{ color: '#212e44' }}>
                    <Trash2 size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12" style={{ color: 'rgba(33,46,68,0.4)' }}>
                  Aucun projet trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded transition-colors disabled:opacity-30 hover:bg-black/5"
            style={{ color: '#212e44' }}
          >
            <ChevronLeft size={16} /> Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className="w-8 h-8 flex items-center justify-center text-sm rounded transition-colors"
              style={{
                color: n === page ? '#f9f6f0' : '#212e44',
                backgroundColor: n === page ? '#212e44' : 'transparent',
              }}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded transition-colors disabled:opacity-30 hover:bg-black/5"
            style={{ color: '#212e44' }}
          >
            Suivant <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Dialog open={isCreateOpen || !!editProject} onOpenChange={() => { setIsCreateOpen(false); setEditProject(null); }}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}>
          <DialogHeader>
            <DialogTitle className="uppercase font-normal" style={{ fontSize: '30px', letterSpacing: '-0.9px', color: '#212e44' }}>
              {editProject ? 'Modifier le projet' : 'Nouveau projet'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="col-span-2">
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Nom</Label>
              <Input value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Typologie</Label>
              <Select value={formData.category || 'Résidentiel'} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger className="border-0 border-b rounded-none focus:ring-0" style={inputStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Résidentiel', 'Public', 'Rénovation', 'Intérieur', 'Paysage'].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Année</Label>
              <Input type="number" value={formData.year || ''} onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Statut</Label>
              <Select value={formData.status || 'En cours'} onValueChange={(v) => setFormData({ ...formData, status: v as ProjectStatus })}>
                <SelectTrigger className="border-0 border-b rounded-none focus:ring-0" style={inputStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['Livré', 'En cours', 'Concours'] as ProjectStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Localisation</Label>
              <Input value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Surface</Label>
              <Input value={formData.surface || ''} onChange={(e) => setFormData({ ...formData, surface: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div className="col-span-2">
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Client</Label>
              <Input value={formData.client || ''} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div className="col-span-2">
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                style={{ borderBottom: '1px solid rgba(33,46,68,0.2)', backgroundColor: 'transparent', minHeight: '80px' }}
              />
            </div>
          </div>
          <DialogFooter className="mt-6 gap-3">
            <Button
              variant="outline"
              onClick={() => { setIsCreateOpen(false); setEditProject(null); }}
              className="px-6 py-2.5 text-sm font-medium rounded-[25px]"
              style={{ border: '1px solid #212e44', color: '#212e44', backgroundColor: 'transparent' }}
            >
              Annuler
            </Button>
            <Button
              onClick={saveProject}
              className="px-6 py-2.5 text-sm font-medium rounded-[25px]"
              style={{ backgroundColor: '#212e44', color: '#e4ceac' }}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-[400px]" style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}>
          <DialogHeader>
            <DialogTitle className="font-normal" style={{ fontSize: '24px', color: '#212e44' }}>
              Confirmer la suppression
            </DialogTitle>
          </DialogHeader>
          <p style={{ color: 'rgba(33,46,68,0.6)', fontSize: '16px' }}>
            Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
          </p>
          <DialogFooter className="mt-4 gap-3">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-[25px]" style={{ border: '1px solid #212e44', color: '#212e44', backgroundColor: 'transparent' }}>
              Annuler
            </Button>
            <Button onClick={() => deleteConfirm && deleteProject(deleteConfirm)} className="rounded-[25px]" style={{ backgroundColor: '#eb7e56', color: '#212e44' }}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ----- Contacts Tab ----- */
function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filtered = contacts.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const unreadCount = contacts.filter((c) => c.status === 'non-lu').length;

  function markAsRead(id: number) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'lu' as ContactStatus } : c)));
  }

  function archiveContact(id: number) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'archive' as ContactStatus } : c)));
  }

  function deleteContact(id: number) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (selectedContact?.id === id) setSelectedContact(null);
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h3 className="uppercase font-normal" style={{ fontSize: '40px', lineHeight: '1.0', letterSpacing: '-1.2px', color: '#212e44' }}>
            Contacts
          </h3>
          {unreadCount > 0 && (
            <span
              className="inline-flex items-center justify-center text-xs font-medium rounded-full"
              style={{ backgroundColor: '#eb7e56', color: '#f9f6f0', width: '28px', height: '28px' }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] border-0 border-b rounded-none focus:ring-0" style={{ borderBottom: '1px solid rgba(33,46,68,0.2)', backgroundColor: 'transparent' }}>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="non-lu">Non lu</SelectItem>
            <SelectItem value="lu">Lu</SelectItem>
            <SelectItem value="archive">Archivé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="rounded p-8 flex flex-col gap-4 transition-shadow hover:shadow-sm"
            style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '20px', color: '#212e44' }}>{c.name}</span>
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: c.status === 'non-lu' ? '#eb7e56' : '#e4ceac' }}
                />
              </div>
              <span style={{ fontSize: '14px', letterSpacing: '0.7px', color: 'rgba(33,46,68,0.4)' }}>
                {c.date}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
              <span style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)' }}>{c.email}</span>
              <span style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)' }}>{c.phone}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="uppercase text-xs" style={{ letterSpacing: '0.7px', color: '#eb7e56' }}>{c.projectType}</span>
              <span style={{ fontSize: '16px', color: '#212e44' }}>{c.budget}</span>
            </div>

            <span style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)' }}>{c.location}</span>

            <p className="line-clamp-3" style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {c.message}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-2 pt-4" style={{ borderTop: '1px solid rgba(33,46,68,0.05)' }}>
              <button onClick={() => setSelectedContact(c)} className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: '#212e44' }}>
                Voir
              </button>
              {c.status === 'non-lu' && (
                <button onClick={() => markAsRead(c.id)} className="text-sm transition-opacity hover:opacity-70" style={{ color: 'rgba(33,46,68,0.5)' }}>
                  Marquer comme lu
                </button>
              )}
              {c.status !== 'archive' && (
                <button onClick={() => archiveContact(c.id)} className="text-sm transition-opacity hover:opacity-70" style={{ color: 'rgba(33,46,68,0.5)' }}>
                  Archiver
                </button>
              )}
              <button onClick={() => deleteContact(c.id)} className="text-sm transition-colors hover:text-red-500 ml-auto" style={{ color: 'rgba(33,46,68,0.4)' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-16" style={{ color: 'rgba(33,46,68,0.4)' }}>
            Aucun contact trouvé
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-[600px]" style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}>
          <DialogHeader>
            <DialogTitle className="font-normal" style={{ fontSize: '24px', color: '#212e44' }}>
              {selectedContact?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-wrap gap-6">
                <span style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)' }}>{selectedContact.email}</span>
                <span style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)' }}>{selectedContact.phone}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="uppercase text-xs" style={{ letterSpacing: '0.7px', color: '#eb7e56' }}>{selectedContact.projectType}</span>
                <span style={{ fontSize: '16px', color: '#212e44' }}>{selectedContact.budget}</span>
                <span style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)' }}>{selectedContact.location}</span>
              </div>
              <div className="mt-2">
                <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Message</Label>
                <p style={{ fontSize: '16px', color: '#212e44', lineHeight: '1.6' }}>{selectedContact.message}</p>
              </div>
            </div>
          )}
          <DialogFooter className="mt-6 gap-3 flex-wrap">
            {selectedContact?.status === 'non-lu' && (
              <Button onClick={() => { markAsRead(selectedContact.id); setSelectedContact(null); }} className="rounded-[25px]" style={{ backgroundColor: '#212e44', color: '#e4ceac' }}>
                Marquer comme lu
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setSelectedContact(null)}
              className="rounded-[25px]"
              style={{ border: '1px solid #212e44', color: '#212e44', backgroundColor: 'transparent' }}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ----- Publications Tab ----- */
function PublicationsTab() {
  const [pubs, setPubs] = useState<Publication[]>(INITIAL_PUBLICATIONS);
  const [editPub, setEditPub] = useState<Publication | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Publication>>({});

  function openCreate() {
    setFormData({ title: '', source: '', date: '', type: 'Article', excerpt: '', published: true });
    setIsCreateOpen(true);
  }

  function openEdit(p: Publication) {
    setFormData({ ...p });
    setEditPub(p);
  }

  function savePub() {
    if (!formData.title || !formData.source) return;
    if (editPub) {
      setPubs((prev) => prev.map((p) => (p.id === editPub.id ? { ...p, ...formData } as Publication : p)));
      setEditPub(null);
    } else {
      const newPub: Publication = { ...formData as Publication, id: Date.now() };
      setPubs((prev) => [...prev, newPub]);
      setIsCreateOpen(false);
    }
    setFormData({});
  }

  function deletePub(id: number) {
    setPubs((prev) => prev.filter((p) => p.id !== id));
  }

  function togglePublished(id: number) {
    setPubs((prev) => prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
  }

  const inputClass = 'border-0 border-b rounded-none px-0 py-2 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0';
  const inputStyle = { borderBottom: '1px solid rgba(33,46,68,0.2)', backgroundColor: 'transparent' };

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="uppercase font-normal" style={{ fontSize: '40px', lineHeight: '1.0', letterSpacing: '-1.2px', color: '#212e44' }}>
          Publications
        </h3>
        <Button
          onClick={openCreate}
          className="px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: '#212e44', color: '#e4ceac', borderRadius: '25px' }}
        >
          <Plus size={16} className="mr-2" />
          Nouvelle publication
        </Button>
      </div>

      {/* Publications List */}
      <div className="flex flex-col gap-6">
        {pubs.map((p) => (
          <div
            key={p.id}
            className="rounded p-6 flex flex-col sm:flex-row sm:items-center gap-6"
            style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span style={{ fontSize: '18px', color: '#212e44' }}>{p.title}</span>
                <Badge
                  className="rounded-full px-2 py-0.5 text-[10px] uppercase font-normal shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: p.published ? 'rgba(33,46,68,0.08)' : 'rgba(33,46,68,0.03)',
                    color: p.published ? '#212e44' : 'rgba(33,46,68,0.4)',
                    border: '1px solid rgba(33,46,68,0.1)',
                  }}
                  onClick={() => togglePublished(p.id)}
                >
                  {p.published ? 'Publié' : 'Brouillon'}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="uppercase text-xs" style={{ letterSpacing: '0.7px', color: '#eb7e56' }}>{p.source}</span>
                <span style={{ fontSize: '14px', color: 'rgba(33,46,68,0.4)' }}>{p.date}</span>
              </div>
              <p className="truncate" style={{ fontSize: '16px', color: 'rgba(33,46,68,0.6)' }}>
                {p.excerpt}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="inline-flex items-center justify-center w-8 h-8 rounded transition-colors hover:bg-black/5" style={{ color: '#212e44' }}>
                <Pencil size={16} />
              </button>
              <button onClick={() => deletePub(p.id)} className="inline-flex items-center justify-center w-8 h-8 rounded transition-colors hover:bg-red-50" style={{ color: '#212e44' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {pubs.length === 0 && (
          <div className="text-center py-16" style={{ color: 'rgba(33,46,68,0.4)' }}>
            Aucune publication
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Dialog open={isCreateOpen || !!editPub} onOpenChange={() => { setIsCreateOpen(false); setEditPub(null); }}>
        <DialogContent className="max-w-[600px]" style={{ backgroundColor: '#f9f6f0', border: '1px solid rgba(33,46,68,0.08)' }}>
          <DialogHeader>
            <DialogTitle className="uppercase font-normal" style={{ fontSize: '30px', letterSpacing: '-0.9px', color: '#212e44' }}>
              {editPub ? 'Modifier la publication' : 'Nouvelle publication'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 mt-4">
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Titre</Label>
              <Input value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Source / Venue</Label>
              <Input value={formData.source || ''} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className={inputClass} style={inputStyle} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Date</Label>
                <Input type="date" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Type</Label>
                <Select value={formData.type || 'Article'} onValueChange={(v) => setFormData({ ...formData, type: v as PubType })}>
                  <SelectTrigger className="border-0 border-b rounded-none focus:ring-0" style={inputStyle}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(['Article', 'Prix', 'Conférence'] as PubType[]).map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="uppercase text-xs mb-2 block" style={{ letterSpacing: '0.7px', color: 'rgba(33,46,68,0.6)' }}>Extrait</Label>
              <Textarea
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                style={{ borderBottom: '1px solid rgba(33,46,68,0.2)', backgroundColor: 'transparent', minHeight: '80px' }}
              />
            </div>
          </div>
          <DialogFooter className="mt-6 gap-3">
            <Button
              variant="outline"
              onClick={() => { setIsCreateOpen(false); setEditPub(null); }}
              className="rounded-[25px]"
              style={{ border: '1px solid #212e44', color: '#212e44', backgroundColor: 'transparent' }}
            >
              Annuler
            </Button>
            <Button
              onClick={savePub}
              className="rounded-[25px]"
              style={{ backgroundColor: '#212e44', color: '#e4ceac' }}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Admin Component                                               */
/* ------------------------------------------------------------------ */

type TabId = 'overview' | 'projects' | 'contacts' | 'publications';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Tableau de Bord', icon: <LayoutDashboard size={20} /> },
  { id: 'projects', label: 'Projets', icon: <FolderOpen size={20} /> },
  { id: 'contacts', label: 'Contacts', icon: <Mail size={20} /> },
  { id: 'publications', label: 'Publications', icon: <FileText size={20} /> },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const navigate = useNavigate();

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden" style={{ backgroundColor: '#e4ceac' }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col shrink-0 h-full"
        style={{ width: '260px', backgroundColor: '#212e44' }}
      >
        {/* Logo */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium" style={{ color: '#e4ceac' }}>
              Atelier <em className="italic">Lumière</em>
            </span>
            <span
              className="uppercase text-xs font-normal"
              style={{ letterSpacing: '0.7px', color: '#eb7e56' }}
            >
              Admin
            </span>
          </div>
        </div>

        {/* Separator */}
        <div style={{ height: '1px', backgroundColor: 'rgba(233,206,172,0.1)', margin: '0 1.5rem' }} />

        {/* Tabs */}
        <nav className="flex flex-col mt-4 flex-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-4 w-full text-left transition-colors"
                style={{
                  padding: '1rem 1.5rem',
                  color: isActive ? '#e4ceac' : 'rgba(233,206,172,0.6)',
                  backgroundColor: isActive ? 'rgba(233,206,172,0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid #eb7e56' : '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(233,206,172,0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {tab.icon}
                <span style={{ fontSize: '16px' }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(233,206,172,0.1)' }}>
          <p style={{ fontSize: '14px', color: 'rgba(233,206,172,0.4)' }}>
            admin@atelier-lumiere.fr
          </p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mt-2 text-sm transition-opacity hover:opacity-80 hover:underline"
            style={{ color: '#eb7e56' }}
          >
            <LogOut size={14} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden" style={{ width: 'calc(100vw - 260px)' }}>
        {/* Top Bar */}
        <header
          className="flex items-center justify-between shrink-0 px-8 h-16"
          style={{ backgroundColor: '#f9f6f0', borderBottom: '1px solid rgba(33,46,68,0.08)' }}
        >
          <h2 className="font-normal" style={{ fontSize: '20px', color: '#212e44' }}>
            Administration
          </h2>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="text-sm rounded-[25px] px-4 py-1.5 h-auto"
            style={{ border: '1px solid rgba(33,46,68,0.2)', color: '#212e44', backgroundColor: 'transparent' }}
          >
            <LogOut size={14} className="mr-2" />
            Déconnexion
          </Button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-12">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'contacts' && <ContactsTab />}
          {activeTab === 'publications' && <PublicationsTab />}
        </div>
      </main>
    </div>
  );
}
