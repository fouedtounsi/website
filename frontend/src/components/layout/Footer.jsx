import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6f2dfogv_Logo%20IJL.jpg";

export const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/olive-oil', label: t('nav.oliveOil') },
    { path: '/kitchenware', label: t('nav.kitchenware') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer data-testid="footer" className="bg-surface-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <img 
              src={LOGO_URL} 
              alt="IJL International" 
              className="h-16 w-auto mb-6"
            />
            <p className="text-text-secondary text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            <p className="text-brand-gold font-cormorant italic text-lg mt-4">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary font-playfair text-lg mb-6">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.path.replace('/', '') || 'home'}`}
                    className="text-text-secondary text-sm hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-text-primary font-playfair text-lg mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  Montreal, Quebec, Canada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold flex-shrink-0" />
                <a 
                  href="mailto:contact@huiledetunisia.com"
                  data-testid="footer-email"
                  className="text-text-secondary text-sm hover:text-brand-gold transition-colors duration-300"
                >
                  contact@huiledetunisia.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                <a 
                  href="tel:+15140000000"
                  data-testid="footer-phone"
                  className="text-text-secondary text-sm hover:text-brand-gold transition-colors duration-300"
                >
                  +1 (514) 000-0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} IJL International. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">Tunisia Olive Oil</span>
            <span className="text-brand-gold">•</span>
            <span className="text-brand-gold text-xs font-cormorant italic">{t('footer.shipsCanada')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
