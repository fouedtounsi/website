import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, TreeDeciduous, Mail, TrendingUp } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    oliveOil: 0,
    kitchenware: 0,
    messages: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    const config = { headers: { Authorization: `Basic ${auth}` } };

    Promise.all([
      axios.get(`${API}/admin/olive-oil`, config),
      axios.get(`${API}/admin/kitchenware`, config),
      axios.get(`${API}/admin/messages`, config)
    ]).then(([oilRes, kitchenRes, msgRes]) => {
      setStats({
        oliveOil: oilRes.data.length,
        kitchenware: kitchenRes.data.length,
        messages: msgRes.data.length,
        unreadMessages: msgRes.data.filter(m => !m.read).length
      });
    }).catch(console.error);
  }, []);

  const cards = [
    {
      title: 'Huile d\'Olive',
      count: stats.oliveOil,
      icon: <Droplet size={24} />,
      link: '/admin/olive-oil',
      color: 'text-yellow-500'
    },
    {
      title: 'Bois d\'Olivier',
      count: stats.kitchenware,
      icon: <TreeDeciduous size={24} />,
      link: '/admin/kitchenware',
      color: 'text-green-500'
    },
    {
      title: 'Messages',
      count: stats.messages,
      subtitle: stats.unreadMessages > 0 ? `${stats.unreadMessages} non lu(s)` : null,
      icon: <Mail size={24} />,
      link: '/admin/messages',
      color: 'text-blue-500'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-2">Bienvenue dans votre panneau d'administration</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="bg-surface-secondary border border-white/5 p-6 hover:border-brand-gold/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm">{card.title}</p>
                <p className="font-playfair text-4xl text-text-primary mt-2">{card.count}</p>
                {card.subtitle && (
                  <p className="text-brand-gold text-xs mt-1">{card.subtitle}</p>
                )}
              </div>
              <div className={card.color}>{card.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-surface-secondary border border-white/5 p-6">
        <h2 className="font-playfair text-xl text-text-primary mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/olive-oil"
            className="flex items-center gap-3 p-4 bg-surface-tertiary hover:bg-brand-gold/10 transition-colors"
          >
            <Droplet className="text-brand-gold" size={20} />
            <span className="text-text-primary">Gérer les produits d'huile d'olive</span>
          </Link>
          <Link
            to="/admin/kitchenware"
            className="flex items-center gap-3 p-4 bg-surface-tertiary hover:bg-brand-gold/10 transition-colors"
          >
            <TreeDeciduous className="text-brand-gold" size={20} />
            <span className="text-text-primary">Gérer les articles en bois d'olivier</span>
          </Link>
          <Link
            to="/admin/messages"
            className="flex items-center gap-3 p-4 bg-surface-tertiary hover:bg-brand-gold/10 transition-colors"
          >
            <Mail className="text-brand-gold" size={20} />
            <span className="text-text-primary">Voir les messages de contact</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-4 bg-surface-tertiary hover:bg-brand-gold/10 transition-colors"
          >
            <TrendingUp className="text-brand-gold" size={20} />
            <span className="text-text-primary">Modifier les paramètres du site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
