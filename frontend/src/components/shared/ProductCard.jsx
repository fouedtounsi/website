import { motion } from 'framer-motion';

export const ProductCard = ({ 
  image, 
  title, 
  titleFr, 
  reference, 
  dimensions,
  category,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      data-testid={`product-card-${reference || title.toLowerCase().replace(/\s+/g, '-')}`}
      className="group relative overflow-hidden bg-surface-secondary border border-white/5 hover:border-brand-gold/30 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="gold-line mb-4" />
          <h3 className="font-playfair text-xl text-text-primary mb-1">{title}</h3>
          {titleFr && (
            <p className="font-cormorant italic text-brand-gold text-sm mb-2">{titleFr}</p>
          )}
          {dimensions && (
            <p className="text-text-secondary text-xs mt-2">DIM: {dimensions}</p>
          )}
          {reference && (
            <p className="text-text-muted text-xs">REF: {reference}</p>
          )}
        </div>
      </div>

      {/* Category Badge */}
      {category && (
        <div className="absolute top-4 left-4">
          <span className="text-xs uppercase tracking-widest text-brand-gold bg-black/70 px-3 py-1">
            {category}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
