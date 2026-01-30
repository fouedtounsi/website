import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Leaf, Award, ThermometerSnowflake, ZoomIn } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';
import { useLanguage } from '../context/LanguageContext';
import { ImageLightbox } from '../components/shared/ImageLightbox';

const PRODUCT_IMAGES = {
  '250ml': "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/rxzvc8pm_Image%202026-01-14%20at%2011.04.12%20AM%20%282%29.jpeg",
  '500ml': "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/xdffe8un_500%20ml.jpg",
  '750ml': "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/ovii6g2w_Image%202026-01-14%20at%2011.04.12%20AM%20%281%29.jpeg",
  '1l': "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/jbnqgx2x_Image%202026-01-14%20at%2011.04.09%20AM%20%281%29.jpeg",
  '3l': "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/pzhqk6dm_3l.jpg",
  '5l': "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/s0xiozcb_Image%202026-01-14%20at%2011.04.08%20AM%20%281%29.jpeg"
};

export default function OliveOil() {
  const { t, language } = useLanguage();

  const products = [
    {
      id: 'oil-250ml',
      name: t('oliveOil.250mlName'),
      nameFr: 'Bouteille 250ml',
      sku: 'TOO-250',
      size: '250ml / 8.45 fl oz',
      description: t('oliveOil.250mlDesc'),
      image: PRODUCT_IMAGES['250ml']
    },
    {
      id: 'oil-500ml',
      name: t('oliveOil.500mlName'),
      nameFr: 'Bouteille 500ml',
      sku: 'TOO-500',
      size: '500ml / 16.9 fl oz',
      description: t('oliveOil.500mlDesc'),
      image: PRODUCT_IMAGES['500ml']
    },
    {
      id: 'oil-750ml',
      name: t('oliveOil.750mlName'),
      nameFr: 'Bouteille 750ml',
      sku: 'TOO-750',
      size: '750ml / 25.4 fl oz',
      description: t('oliveOil.750mlDesc'),
      image: PRODUCT_IMAGES['750ml']
    },
    {
      id: 'oil-1l',
      name: t('oliveOil.1lName'),
      nameFr: 'Bouteille 1L',
      sku: 'TOO-1000',
      size: '1L / 33.81 fl oz',
      description: t('oliveOil.1lDesc'),
      image: PRODUCT_IMAGES['1l']
    },
    {
      id: 'oil-3l',
      name: t('oliveOil.3lName'),
      nameFr: 'Bidon 3L',
      sku: 'TOO-3000',
      size: '3L / 101.44 fl oz',
      description: t('oliveOil.3lDesc'),
      image: PRODUCT_IMAGES['3l']
    },
    {
      id: 'oil-5l',
      name: t('oliveOil.5lName'),
      nameFr: 'Bidon 5L',
      sku: 'TOO-5000',
      size: '5L / 169.07 fl oz',
      description: t('oliveOil.5lDesc'),
      image: PRODUCT_IMAGES['5l']
    }
  ];

  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: t('oliveOil.feature1Title'),
      titleFr: '100% Biologique',
      description: t('oliveOil.feature1Desc')
    },
    {
      icon: <ThermometerSnowflake className="w-6 h-6" />,
      title: t('oliveOil.feature2Title'),
      titleFr: 'Première Pression à Froid',
      description: t('oliveOil.feature2Desc')
    },
    {
      icon: <Droplet className="w-6 h-6" />,
      title: t('oliveOil.feature3Title'),
      titleFr: 'Extra Vierge',
      description: t('oliveOil.feature3Desc')
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('oliveOil.feature4Title'),
      titleFr: 'Qualité Supérieure',
      description: t('oliveOil.feature4Desc')
    }
  ];

  return (
    <div data-testid="olive-oil-page" className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-surface-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
                {t('oliveOil.heroAccent')}
              </span>
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-tight">
                {t('oliveOil.heroTitle')}
              </h1>
              <div className="gold-line mb-6" />
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {t('oliveOil.heroDesc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact"
                  data-testid="olive-oil-contact-cta"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {t('oliveOil.inquireNow')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden">
                <img
                  src={PRODUCT_IMAGES['5l']}
                  alt="Tunisia Olive Oil Extra Virgin Olive Oil"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-brand-gold/20" />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-6 -left-6 bg-surface-secondary border border-brand-gold/20 p-4">
                <span className="font-cormorant italic text-brand-gold text-lg">{t('oliveOil.productOfTunisia')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            accent={t('oliveOil.whyChooseAccent')}
            title={t('oliveOil.whyChooseTitle')}
            align="center"
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`feature-${index}`}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border border-brand-gold/30 text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl text-text-primary mb-1">{feature.title}</h3>
                <p className="font-cormorant italic text-brand-gold text-sm mb-3">{feature.titleFr}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            accent={t('oliveOil.formatsAccent')}
            title={t('oliveOil.formatsTitle')}
            subtitle={t('oliveOil.formatsSubtitle')}
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`product-${product.id}`}
                className="group relative bg-surface-secondary border border-white/5 hover:border-brand-gold/30 overflow-hidden transition-all duration-500"
              >
                {/* SKU Badge */}
                <div className="absolute top-4 left-4 z-10 bg-black/70 px-3 py-1">
                  <span className="text-xs uppercase tracking-widest text-brand-gold">
                    SKU: {product.sku}
                  </span>
                </div>
                
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <span className="font-cormorant italic text-brand-gold text-sm mb-2 block">
                    {product.nameFr}
                  </span>
                  <h3 className="font-playfair text-xl text-text-primary mb-2">
                    {product.name}
                  </h3>
                  <div className="gold-line mb-4" />
                  <p className="text-text-muted text-xs uppercase tracking-widest mb-2">
                    {product.size}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            accent={t('oliveOil.galleryAccent')}
            title={t('oliveOil.galleryTitle')}
            align="center"
          />
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(PRODUCT_IMAGES).map(([size, image], index) => (
              <motion.div
                key={size}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="aspect-square overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Tunisia Olive Oil ${size}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
              {t('oliveOil.ctaTitle')}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              {t('oliveOil.ctaSubtitle')}
            </p>
            <Link
              to="/contact"
              data-testid="olive-oil-cta-contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t('oliveOil.contactUs')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
