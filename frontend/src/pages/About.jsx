import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, Award } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6f2dfogv_Logo%20IJL.jpg";
const HERO_BG = "https://images.unsplash.com/photo-1729834819935-4365b7a42d08?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHx0dW5pc2lhbiUyMG9saXZlJTIwZ3JvdmUlMjBzdW5zZXQlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzY5ODAxOTY3fDA&ixlib=rb-4.1.0&q=85";
const PRODUCT_IMAGE = "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/ovii6g2w_Image%202026-01-14%20at%2011.04.12%20AM%20%281%29.jpeg";

const stats = [
  { icon: <Calendar className="w-6 h-6" />, value: 'Est. 2010', label: 'Years of Excellence' },
  { icon: <MapPin className="w-6 h-6" />, value: 'Montreal', label: 'Canada' },
  { icon: <Users className="w-6 h-6" />, value: 'Canada-wide', label: 'Delivery' },
  { icon: <Award className="w-6 h-6" />, value: '100%', label: 'Organic Certified' }
];

const values = [
  {
    title: 'Quality',
    titleFr: 'Qualité',
    description: 'We never compromise on quality. Every product undergoes rigorous quality control.'
  },
  {
    title: 'Tradition',
    titleFr: 'Tradition',
    description: 'We preserve ancient techniques while embracing modern standards.'
  },
  {
    title: 'Sustainability',
    titleFr: 'Durabilité',
    description: 'Our practices respect the environment and support local communities.'
  },
  {
    title: 'Authenticity',
    titleFr: 'Authenticité',
    description: 'What you see is what you get - pure, genuine Tunisian products.'
  }
];

export default function About() {
  return (
    <div data-testid="about-page" className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-surface-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={HERO_BG}
            alt="Tunisian Olive Grove"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-primary via-surface-primary/80 to-surface-primary" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
                Notre Histoire
              </span>
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-tight">
                About Us
              </h1>
              <div className="gold-line mb-6" />
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                IJL International is a family-owned company dedicated to bringing the finest 
                Tunisian products to Canada. Based in Montreal, Quebec, we are the Canadian 
                subsidiary importing premium olive oil directly from Tunisia's finest groves.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                Our mission is to share the authentic taste and craftsmanship of Tunisia 
                with Canadian markets. Products available in our Montreal warehouse with 
                delivery across Canada.
              </p>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src={LOGO_URL}
                  alt="IJL International Logo"
                  className="w-64 md:w-80 h-auto"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-brand-gold/20 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface-secondary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center text-brand-gold mb-3">
                  {stat.icon}
                </div>
                <div className="font-playfair text-3xl md:text-4xl text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-text-muted text-xs uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="overflow-hidden">
                <img
                  src={PRODUCT_IMAGE}
                  alt="Our Products"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface-secondary border border-brand-gold/20 p-4">
                <span className="font-cormorant italic text-brand-gold text-lg">Depuis 2010</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
                Notre Parcours
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
                Our Journey
              </h2>
              <div className="gold-line mb-6" />
              <div className="space-y-4 text-text-secondary text-base leading-relaxed">
                <p>
                  Our story began in the sun-drenched olive groves of Tunisia, where generations 
                  of families have cultivated olives using traditional methods. Inspired by 
                  this rich heritage, we established IJL International in Montreal to bring 
                  these treasures to Canadian homes.
                </p>
                <p>
                  Today, we import directly from local Tunisian farmers and artisans, ensuring fair 
                  prices and sustainable practices. Our olive oil is cold-pressed within 
                  hours of harvest, then shipped to our Montreal warehouse for distribution across Canada.
                </p>
                <p>
                  Our olive wood products are crafted by skilled artisans who transform 
                  reclaimed wood from old olive trees into beautiful, functional pieces 
                  that tell a story of Tunisian craftsmanship.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            accent="Nos Valeurs"
            title="Our Values"
            align="center"
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`value-${value.title.toLowerCase()}`}
                className="feature-card"
              >
                <h3 className="font-playfair text-xl text-text-primary mb-1">{value.title}</h3>
                <p className="font-cormorant italic text-brand-gold text-sm mb-3">{value.titleFr}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tunisia Section */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-gold font-cormorant italic text-2xl mb-4 block">
              Produit de Tunisie
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
              Product of Tunisia
            </h2>
            <p className="text-text-secondary text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Tunisia has been cultivating olives for over 3,000 years. The unique climate, 
              soil, and traditional farming methods of the Tunisia region produce some of the 
              world's finest olive oil. We're proud to carry this legacy forward.
            </p>
            <div className="inline-flex items-center gap-3 text-brand-gold">
              <MapPin size={24} />
              <span className="font-playfair text-2xl">Tunisia, Tunisia</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
              Ready to Experience Tunisia?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              Whether you're a retailer, distributor, or simply curious about our products, 
              we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              data-testid="about-cta-contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
