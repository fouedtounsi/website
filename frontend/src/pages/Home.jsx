import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Award, Globe, Droplet, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VIDEO_URL = "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/4597fkxz_Video%202026-01-14%20at%2011.06.14%20AM.mp4";

const OLIVE_TREES = {
  tree1: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/47m9lec2_Olive%20tree1.jpeg",
  tree2: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/1ql9qh7w_Olive%20tree3.jpeg"
};

const PRODUCT_IMAGES = {
  oliveOil: [
    "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/s0xiozcb_Image%202026-01-14%20at%2011.04.08%20AM%20%281%29.jpeg",
    "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/jbnqgx2x_Image%202026-01-14%20at%2011.04.09%20AM%20%281%29.jpeg",
    "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/ovii6g2w_Image%202026-01-14%20at%2011.04.12%20AM%20%281%29.jpeg",
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/xdffe8un_500%20ml.jpg",
  ],
  kitchenware: [
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/3w9avqvz_Cutting%20Board%20REF%20P02.jpg",
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/hg47jtoq_Flat%20Mortard.jpg",
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6xmzcof6_Classic%20Wine%20Cup%20REF%20T13.jpg",
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/h1ifnun3_Heart%20Dish%20REF%20B08.jpg",
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/depri7sw_Round%20Mortard%20REF%20M01.jpg",
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6su95ih4_Rustic%20Chess%20Games.jpg",
  ]
};

export default function Home() {
  const { t, language } = useLanguage();
  const [showOilFormats, setShowOilFormats] = useState(false);
  const [showKitchenware, setShowKitchenware] = useState(false);

  const oilFormats = [
    { size: '250ml', sku: 'TOO-250' },
    { size: '500ml', sku: 'TOO-500' },
    { size: '750ml', sku: 'TOO-750' },
    { size: '1L', sku: 'TOO-1000' },
    { size: '3L', sku: 'TOO-3000' },
    { size: '5L', sku: 'TOO-5000' },
  ];

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: language === 'fr' ? '100% Biologique' : '100% Biological',
      description: language === 'fr' 
        ? 'Culture biologique certifiée sans pesticides' 
        : 'Certified organic cultivation with no pesticides'
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: language === 'fr' ? 'Première Pression à Froid' : 'First Cold Pressing',
      description: language === 'fr'
        ? 'Extraite à moins de 27°C pour préserver les nutriments'
        : 'Extracted below 27°C to preserve nutrients'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: language === 'fr' ? 'Qualité Supérieure' : 'Superior Quality',
      description: language === 'fr'
        ? 'Des meilleures oliveraies de Tunisie'
        : 'From the finest olive groves of Tunisia'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: language === 'fr' ? 'Livraison au Canada' : 'Delivery in Canada',
      description: language === 'fr'
        ? 'Disponible dans notre entrepôt de Montréal'
        : 'Available from our Montreal warehouse'
    }
  ];

  return (
    <div data-testid="home-page" className="min-h-screen">
      
      {/* ==================== LANDING SECTION ==================== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0">
          <img
            src={OLIVE_TREES.tree1}
            alt="Tunisian Olive Grove"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-surface-primary" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="font-cormorant italic text-brand-gold text-xl md:text-2xl mb-4 block">
              {language === 'fr' ? 'Qualité Supérieure' : 'Superior Quality'}
            </span>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-text-primary mb-6 leading-tight">
              Tunisia Olive Oil
            </h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
              {language === 'fr' 
                ? 'Huile d\'olive extra vierge biologique et articles en bois d\'olivier artisanaux de Tunisie'
                : 'Premium biological extra virgin olive oil & handcrafted olive wood products from Tunisia'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/olive-oil"
                data-testid="hero-cta-olive-oil"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                {language === 'fr' ? 'Découvrir l\'Huile' : 'Explore Olive Oil'}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/kitchenware"
                data-testid="hero-cta-kitchenware"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                {language === 'fr' ? 'Articles Bois d\'Olivier' : 'Olive Wood Products'}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-brand-gold to-transparent" />
        </motion.div>
      </section>

      {/* ==================== ABOUT / STORY SECTION ==================== */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images Grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <img 
                    src={OLIVE_TREES.tree1} 
                    alt="Olive Tree" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden">
                  <img 
                    src={PRODUCT_IMAGES.oliveOil[0]} 
                    alt="Olive Oil" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden">
                  <img 
                    src={OLIVE_TREES.tree2} 
                    alt="Ancient Olive Tree" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden">
                  <img 
                    src={PRODUCT_IMAGES.kitchenware[0]} 
                    alt="Olive Wood" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
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
                {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
                {language === 'fr' ? 'De la Tunisie au Canada' : 'From Tunisia to Canada'}
              </h2>
              <div className="gold-line mb-6" />
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                {language === 'fr' 
                  ? 'La Tunisie cultive des olives depuis plus de 3 000 ans. Nous importons la meilleure huile d\'olive extra vierge directement de Tunisie vers notre entrepôt à Montréal.'
                  : 'Tunisia has been cultivating olives for over 3,000 years. We import the finest extra virgin olive oil directly from Tunisia to our warehouse in Montreal.'}
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {language === 'fr'
                  ? 'Nos articles en bois d\'olivier sont fabriqués par des artisans qualifiés qui transforment le bois récupéré de vieux oliviers en belles pièces fonctionnelles.'
                  : 'Our olive wood products are crafted by skilled artisans who transform reclaimed wood from old olive trees into beautiful, functional pieces.'}
              </p>
              <Link
                to="/about"
                className="btn-ghost inline-flex items-center gap-2"
              >
                {language === 'fr' ? 'En Savoir Plus' : 'Learn More'}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
              {language === 'fr' ? 'Pourquoi Nous Choisir' : 'Why Choose Us'}
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary">
              {language === 'fr' ? 'L\'Excellence Tunisienne' : 'Tunisian Excellence'}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 border border-brand-gold/30 text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCTS SECTION ==================== */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
              {language === 'fr' ? 'Nos Produits' : 'Our Products'}
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-4">
              {language === 'fr' ? 'Deux Collections, Une Excellence' : 'Two Collections, One Excellence'}
            </h2>
            <div className="gold-line mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Olive Oil Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden bg-surface-secondary"
            >
              {/* Main Card - Clickable to expand */}
              <div 
                onClick={() => setShowOilFormats(!showOilFormats)}
                className="cursor-pointer group"
                data-testid="product-olive-oil"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={PRODUCT_IMAGES.oliveOil[1]}
                    alt="Extra Virgin Olive Oil"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-brand-gold font-cormorant italic text-lg">
                      {language === 'fr' ? 'Huile d\'Olive Extra Vierge' : 'Extra Virgin Olive Oil'}
                    </span>
                    <h3 className="font-playfair text-3xl text-text-primary mt-2">
                      {language === 'fr' ? 'Huile d\'Olive' : 'Olive Oil'}
                    </h3>
                    <p className="text-text-secondary mt-2">
                      {language === 'fr' ? 'Cliquez pour voir les formats' : 'Click to see available formats'}
                    </p>
                    <span className="inline-flex items-center gap-2 text-brand-gold mt-4 text-sm uppercase tracking-widest">
                      {language === 'fr' ? 'Formats Disponibles' : 'Available Formats'} 
                      <ChevronDown size={14} className={`transition-transform duration-300 ${showOilFormats ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Expandable Formats Section */}
              <AnimatePresence>
                {showOilFormats && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-surface-secondary border-t border-brand-gold/20">
                      <h4 className="font-playfair text-lg text-text-primary mb-4">
                        {language === 'fr' ? 'Formats Disponibles' : 'Available Formats'}
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {oilFormats.map((format) => (
                          <div 
                            key={format.sku}
                            className="bg-surface-tertiary border border-white/5 p-3 text-center hover:border-brand-gold/30 transition-colors"
                          >
                            <span className="text-text-primary font-playfair text-lg block">{format.size}</span>
                            <span className="text-text-muted text-xs">SKU: {format.sku}</span>
                          </div>
                        ))}
                      </div>
                      <Link 
                        to="/olive-oil" 
                        className="btn-primary inline-flex items-center gap-2 mt-6 w-full justify-center"
                      >
                        {language === 'fr' ? 'Voir Tous les Produits' : 'View All Products'}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Kitchenware Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden"
            >
              <Link to="/kitchenware" data-testid="product-kitchenware" className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={PRODUCT_IMAGES.kitchenware[1]}
                    alt="Olive Wood Kitchenware"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-brand-gold font-cormorant italic text-lg">
                      {language === 'fr' ? 'Artisanat Tunisien' : 'Tunisian Craftsmanship'}
                    </span>
                    <h3 className="font-playfair text-3xl text-text-primary mt-2">
                      {language === 'fr' ? 'Articles Bois d\'Olivier' : 'Olive Wood Products'}
                    </h3>
                    <p className="text-text-secondary mt-2">
                      {language === 'fr' ? 'Planches • Mortiers • Coupes • Jeux' : 'Boards • Mortars • Cups • Games'}
                    </p>
                    <span className="inline-flex items-center gap-2 text-brand-gold mt-4 text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                      {language === 'fr' ? 'Voir la Collection' : 'View Collection'} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== GALLERY SECTION ==================== */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
              {language === 'fr' ? 'Galerie' : 'Gallery'}
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-4">
              {language === 'fr' ? 'Notre Collection' : 'Our Collection'}
            </h2>
            <div className="gold-line mx-auto" />
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Olive Trees */}
            <div className="aspect-square overflow-hidden group col-span-2 row-span-2">
              <img
                src={OLIVE_TREES.tree1}
                alt="Tunisian Olive Grove"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Products */}
            {[...PRODUCT_IMAGES.oliveOil.slice(0, 2), ...PRODUCT_IMAGES.kitchenware.slice(0, 4)].map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}

            {/* Second Olive Tree */}
            <div className="aspect-square overflow-hidden group col-span-2">
              <img
                src={OLIVE_TREES.tree2}
                alt="Ancient Olive Tree"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
              {language === 'fr' ? 'Contactez-Nous' : 'Get in Touch'}
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
              {language === 'fr' ? 'Prêt à Commander?' : 'Ready to Order?'}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              {language === 'fr'
                ? 'Contactez-nous pour des demandes de gros, des opportunités de distribution ou pour trouver un détaillant près de chez vous.'
                : 'Contact us for wholesale inquiries, distribution opportunities, or to find a retailer near you.'}
            </p>
            <Link
              to="/contact"
              data-testid="cta-contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              {language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
