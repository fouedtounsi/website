import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplet, 
  TreeDeciduous, 
  Mail, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      navigate('/admin');
      return;
    }

    // Verify with server
    axios.get(`${API}/admin/verify`, {
      headers: { Authorization: `Basic ${auth}` }
    }).catch(() => {
      localStorage.removeItem('adminAuth');
      navigate('/admin');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/olive-oil', icon: <Droplet size={20} />, label: 'Huile d\'Olive' },
    { path: '/admin/kitchenware', icon: <TreeDeciduous size={20} />, label: 'Bois d\'Olivier' },
    { path: '/admin/messages', icon: <Mail size={20} />, label: 'Messages' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Paramètres' },
  ];

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-secondary border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
            <h1 className="font-playfair text-xl text-text-primary">Admin Panel</h1>
            <p className="text-brand-gold text-xs font-cormorant italic mt-1">Tunisia Olive Oil</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      location.pathname === item.path
                        ? 'bg-brand-gold/10 text-brand-gold border-l-2 border-brand-gold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-red-400 w-full transition-colors"
            >
              <LogOut size={20} />
              Déconnexion
            </button>
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-2 text-xs text-text-muted hover:text-brand-gold transition-colors mt-2"
            >
              ← Voir le site
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-surface-secondary">
          <h1 className="font-playfair text-lg text-text-primary">Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-text-secondary hover:text-text-primary"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Page content */}
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
