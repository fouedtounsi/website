import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const auth = localStorage.getItem('adminAuth');
    if (auth) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API}/admin/login`, {}, {
        auth: { username, password }
      });
      
      // Store credentials (base64 encoded)
      const auth = btoa(`${username}:${password}`);
      localStorage.setItem('adminAuth', auth);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Identifiants invalides / Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-brand-gold/30 text-brand-gold mb-4">
            <Lock size={32} />
          </div>
          <h1 className="font-playfair text-3xl text-text-primary">Admin Panel</h1>
          <p className="text-text-secondary mt-2">Tunisia Olive Oil</p>
        </div>

        <form onSubmit={handleLogin} className="bg-surface-secondary border border-white/5 p-8">
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-text-secondary text-sm mb-2">
              Nom d'utilisateur / Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-tertiary border border-white/10 text-text-primary px-4 py-3 focus:outline-none focus:border-brand-gold/50"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-text-secondary text-sm mb-2">
              Mot de passe / Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-tertiary border border-white/10 text-text-primary px-4 py-3 pr-12 focus:outline-none focus:border-brand-gold/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter / Login'}
          </button>
        </form>

        <p className="text-center text-text-muted text-xs mt-6">
          <a href="/" className="hover:text-brand-gold">← Retour au site / Back to site</a>
        </p>
      </div>
    </div>
  );
}
