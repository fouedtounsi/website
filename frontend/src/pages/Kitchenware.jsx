import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TreeDeciduous, Brush, Heart, Sparkles, ZoomIn } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';
import { useLanguage } from '../context/LanguageContext';
import { ImageLightbox } from '../components/shared/ImageLightbox';

const PRODUCT_IMAGES = {
  cup: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6xmzcof6_Classic%20Wine%20Cup%20REF%20T13.jpg",
  cuttingBoard: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/3w9avqvz_Cutting%20Board%20REF%20P02.jpg",
  mortar: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/hg47jtoq_Flat%20Mortard.jpg",
  heartDish: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/h1ifnun3_Heart%20Dish%20REF%20B08.jpg",
  roundMortar: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/depri7sw_Round%20Mortard%20REF%20M01.jpg",
  chessGames: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6su95ih4_Rustic%20Chess%20Games.jpg",
  cuttingBoardSet: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/ublmw7w9_Set%20of%203%20Cutting%20Board.jpg",
  ovalDishSet: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/gvi5wag7_Set%20of%203%20Oval%20Dipping%20Dish%20Ref%20B12.jpg",
  spoonSet: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/5be4zzh9_Spoon%20Table%20REF%20S16.jpg",
  rectangularBoard: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/vn5553ii_Rectangular%20Board.jpg",
  rectangularClassicBoard: "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/b2b49s7q_Rectangular%20Classic%20Board.jpg"
};

const productsData = [
  { id: 'classic-cup', nameEn: 'Classic Wine Cup', nameFr: 'Coupe Classique', reference: 'T13', image: 'cup' },
  { id: 'cutting-board', nameEn: 'Irregular Cutting Board', nameFr: 'Planche à Découper Irrégulière', reference: 'P02', dimensions: '25/30/35/40/45 CM', image: 'cuttingBoard' },
  { id: 'flat-mortar', nameEn: 'Flat Mortar', nameFr: 'Mortier Plat', reference: 'M03', dimensions: '6/8/10/12/14/16/18 CM', image: 'mortar' },
  { id: 'heart-dish', nameEn: 'Heart Dish', nameFr: 'Plat Cœur', reference: 'B08', image: 'heartDish' },
  { id: 'round-mortar', nameEn: 'Round Mortar', nameFr: 'Mortier Rond', reference: 'M01', dimensions: '6/8/10/12/14/16/18 CM', image: 'roundMortar' },
  { id: 'rustic-chess', nameEn: 'Rustic Chess Games', nameFr: "Jeux d'Echecs Rustique", reference: 'J01', dimensions: '30/37/50 CM', image: 'chessGames' },
  { id: 'cutting-board-set', nameEn: 'Set of 3 Cutting Board', nameFr: '3 Planches de Découpage', reference: 'K04', image: 'cuttingBoardSet' },
  { id: 'oval-dish-set', nameEn: 'Set of 3 Oval Dipping Dish', nameFr: 'Kit de 3 Plats Ovale', reference: 'B12', image: 'ovalDishSet' },
  { id: 'spoon-set', nameEn: 'Spoon Table Set', nameFr: 'Couvert de Cuillère', reference: 'S16', dimensions: '20/25/30/35 CM', image: 'spoonSet' },
  { id: 'rectangular-board', nameEn: 'Rectangular Board', nameFr: 'Planche Rectangulaire', reference: 'P06', dimensions: '20/25/30/35 CM', image: 'rectangularBoard' },
  { id: 'rectangular-classic-board', nameEn: 'Rectangular Classic Board', nameFr: 'Planche Rectangulaire Classique', reference: 'P07', dimensions: '20/25/30/35 CM', image: 'rectangularClassicBoard' }
];

export default function Kitchenware() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const products = productsData.map(p => ({
    ...p,
    name: language === 'fr' ? p.nameFr : p.nameEn,
    image: PRODUCT_IMAGES[p.image]
  }));

  const features = [
    {
      icon: <TreeDeciduous className="w-6 h-6" />,
      title: t('kitchenware.feature1Title'),
      titleFr: "Bois d'Olivier Authentique",
      description: t('kitchenware.feature1Desc')
    },
    {
      icon: <Brush className="w-6 h-6" />,
      title: t('kitchenware.feature2Title'),
      titleFr: 'Fait Main',
      description: t('kitchenware.feature2Desc')
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t('kitchenware.feature3Title'),
      titleFr: 'Motifs Uniques',
      description: t('kitchenware.feature3Desc')
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t('kitchenware.feature4Title'),
      titleFr: 'Alimentaire',
      description: t('kitchenware.feature4Desc')
    }
  ];

  return (
    <div data-testid="kitchenware-page" className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-surface-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden">
                    <img src={PRODUCT_IMAGES.cup} alt="Classic Wine Cup" className="w-full h-auto" />
                  </div>
                  <div className="overflow-hidden">
                    <img src={PRODUCT_IMAGES.heartDish} alt="Heart Dish" className="w-full h-auto" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden">
                    <img src={PRODUCT_IMAGES.cuttingBoard} alt="Cutting Board" className="w-full h-auto" />
                  </div>
                  <div className="overflow-hidden">
                    <img src={PRODUCT_IMAGES.mortar} alt="Flat Mortar" className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
                {t('kitchenware.heroAccent')}
              </span>
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-tight">
                {t('kitchenware.heroTitle')}
              </h1>
              <div className="gold-line mb-6" />
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {t('kitchenware.heroDesc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/contact"
                  data-testid="kitchenware-contact-cta"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {t('kitchenware.inquireNow')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            accent={t('kitchenware.craftAccent')}
            title={t('kitchenware.craftTitle')}
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
            accent={t('kitchenware.collectionAccent')}
            title={t('kitchenware.collectionTitle')}
            subtitle={t('kitchenware.collectionSubtitle')}
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                data-testid={`product-${product.id}`}
                className="group relative bg-surface-secondary border border-white/5 hover:border-brand-gold/30 overflow-hidden transition-all duration-500"
              >
                {/* Full Image Card - Clickable for zoom */}
                <div 
                  className="aspect-square overflow-hidden cursor-pointer relative"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Zoom overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                  </div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 sm:p-8 w-full">
                    <span className="font-cormorant italic text-brand-gold text-sm mb-2 block">
                      {language === 'fr' ? product.nameEn : product.nameFr}
                    </span>
                    <h3 className="font-playfair text-2xl text-text-primary mb-2">
                      {product.name}
                    </h3>
                    <div className="gold-line mb-4" />
                    {product.dimensions && (
                      <p className="text-text-muted text-xs uppercase tracking-widest mb-2">
                        DIM: {product.dimensions}
                      </p>
                    )}
                    <p className="text-text-muted text-xs uppercase tracking-widest">
                      REF: {product.reference}
                    </p>
                  </div>
                </div>

                {/* Always Visible Label */}
                <div className="absolute top-4 left-4 bg-black/70 px-3 py-1">
                  <span className="text-xs uppercase tracking-widest text-brand-gold">
                    REF: {product.reference}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Feature Image */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
                {t('kitchenware.legacyAccent')}
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
                {t('kitchenware.legacyTitle')}
              </h2>
              <div className="gold-line mb-6" />
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                {t('kitchenware.legacyDesc1')}
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                {t('kitchenware.legacyDesc2')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="overflow-hidden">
                <img
                  src={PRODUCT_IMAGES.cuttingBoard}
                  alt="Olive Wood Craftsmanship"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-surface-primary border border-brand-gold/20 p-4">
                <span className="font-cormorant italic text-brand-gold text-lg">{t('kitchenware.madeInTunisia')}</span>
              </div>
            </motion.div>
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
              {t('kitchenware.ctaTitle')}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              {t('kitchenware.ctaSubtitle')}
            </p>
            <Link
              to="/contact"
              data-testid="kitchenware-cta-contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t('kitchenware.getInTouch')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={products.map(p => ({
          src: p.image,
          title: p.name,
          subtitle: language === 'fr' ? p.nameEn : p.nameFr,
          reference: p.reference
        }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
