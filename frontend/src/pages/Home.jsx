import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Award, Globe } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';

const VIDEO_URL = "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/4597fkxz_Video%202026-01-14%20at%2011.06.14%20AM.mp4";

const PRODUCT_IMAGES = {
  oliveOil: [
    "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/s0xiozcb_Image%202026-01-14%20at%2011.04.08%20AM%20%281%29.jpeg",
    "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/jbnqgx2x_Image%202026-01-14%20at%2011.04.09%20AM%20%281%29.jpeg",
  ],
  kitchenware: [
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/3w9avqvz_Cutting%20Board%20REF%20P02.jpg",
    "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/hg47jtoq_Flat%20Mortard.jpg",
  ]
};

export default function Home() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "100% Biological",
      description: "Certified organic cultivation with no pesticides or chemicals"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Superior Quality",
      description: "First cold pressing for maximum flavor and nutrients"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Product of Tunisia",
      description: "Sourced from the finest olive groves of Sfax"
    }
  ];

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-surface-primary" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="font-cormorant italic text-brand-gold text-xl md:text-2xl mb-4 block">
              Qualité Supérieure / Superior Quality
            </span>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-text-primary mb-6 leading-tight">
              Huile de Tunisia
            </h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Premium biological extra virgin olive oil & handcrafted olive wood kitchenware from Tunisia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/olive-oil"
                data-testid="hero-cta-olive-oil"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Explore Olive Oil
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/kitchenware"
                data-testid="hero-cta-kitchenware"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                View Kitchenware
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

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="text-brand-gold mb-4">{feature.icon}</div>
                <h3 className="font-playfair text-xl text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Products Preview */}
      <section className="py-24 md:py-32 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            accent="Discover Our Collections"
            title="Two Traditions, One Excellence"
            subtitle="From the golden olive groves of Tunisia to your table - experience the finest olive products"
          />

          {/* Bento Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Olive Oil Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-8 relative group overflow-hidden"
            >
              <Link to="/olive-oil" data-testid="bento-olive-oil" className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={PRODUCT_IMAGES.oliveOil[0]}
                    alt="Huile de Tunisia Olive Oil"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-brand-gold font-cormorant italic text-lg">Huile d'Olive Extra Vierge</span>
                    <h3 className="font-playfair text-3xl md:text-4xl text-text-primary mt-2">Extra Virgin Olive Oil</h3>
                    <p className="text-text-secondary mt-2 max-w-md">Biological first cold pressed olive oil in various formats: 250ml, 750ml, 1L & 5L</p>
                    <span className="inline-flex items-center gap-2 text-brand-gold mt-4 text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                      Explore Collection <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Small Cards */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative group overflow-hidden flex-1"
              >
                <Link to="/olive-oil" data-testid="bento-olive-oil-secondary" className="block h-full">
                  <div className="h-full overflow-hidden">
                    <img
                      src={PRODUCT_IMAGES.oliveOil[1]}
                      alt="Olive Oil Bottles"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-brand-gold text-xs uppercase tracking-widest">Multiple Formats</span>
                      <p className="text-text-primary font-playfair text-lg mt-1">250ml - 5L</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group overflow-hidden flex-1"
              >
                <Link to="/kitchenware" data-testid="bento-kitchenware" className="block h-full">
                  <div className="h-full overflow-hidden">
                    <img
                      src={PRODUCT_IMAGES.kitchenware[0]}
                      alt="Olive Wood Kitchenware"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-brand-gold text-xs uppercase tracking-widest">Handcrafted</span>
                      <p className="text-text-primary font-playfair text-lg mt-1">Olive Wood</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Full Width Kitchenware Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-12 relative group overflow-hidden"
            >
              <Link to="/kitchenware" data-testid="bento-kitchenware-full" className="block">
                <div className="aspect-[21/9] overflow-hidden">
                  <img
                    src={PRODUCT_IMAGES.kitchenware[1]}
                    alt="Olive Wood Collection"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-8 md:p-12">
                    <span className="text-brand-gold font-cormorant italic text-lg">Artisanat Tunisien</span>
                    <h3 className="font-playfair text-3xl md:text-4xl text-text-primary mt-2">Olive Wood Kitchenware</h3>
                    <p className="text-text-secondary mt-2 max-w-md">Handcrafted cups, cutting boards, mortars & unique serving pieces</p>
                    <span className="inline-flex items-center gap-2 text-brand-gold mt-4 text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                      View Collection <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
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
            <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
              Première Pression à Froid / First Cold Pressing
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-primary mb-6">
              Experience Tunisian Excellence
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
              From our olive groves to your kitchen - discover the authentic taste of Tunisia
            </p>
            <Link
              to="/contact"
              data-testid="cta-contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
