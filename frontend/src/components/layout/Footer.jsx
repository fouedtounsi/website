import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6f2dfogv_Logo%20IJL.jpg";

export const Footer = () => {
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
              Premium biological extra virgin olive oil and handcrafted olive wood kitchenware. 
              Proudly crafted in Tunisia with centuries of tradition.
            </p>
            <p className="text-brand-gold font-cormorant italic text-lg mt-4">
              Product of Tunisia
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary font-playfair text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/olive-oil', label: 'Olive Oil' },
                { path: '/kitchenware', label: 'Kitchenware' },
                { path: '/about', label: 'About Us' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
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
            <h4 className="text-text-primary font-playfair text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  Sfax, Tunisia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold flex-shrink-0" />
                <a 
                  href="mailto:contact@huiledesfax.com"
                  data-testid="footer-email"
                  className="text-text-secondary text-sm hover:text-brand-gold transition-colors duration-300"
                >
                  contact@huiledesfax.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                <a 
                  href="tel:+21600000000"
                  data-testid="footer-phone"
                  className="text-text-secondary text-sm hover:text-brand-gold transition-colors duration-300"
                >
                  +216 00 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} IJL International. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs">Huile de Sfax</span>
            <span className="text-brand-gold">•</span>
            <span className="text-brand-gold text-xs font-cormorant italic">Qualité Supérieure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
