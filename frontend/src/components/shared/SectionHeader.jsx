import { motion } from 'framer-motion';

export const SectionHeader = ({ 
  title, 
  subtitle, 
  accent,
  align = 'left',
  className = '' 
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignClass} ${className}`}
    >
      {accent && (
        <span className="text-brand-gold font-cormorant italic text-lg mb-2">
          {accent}
        </span>
      )}
      <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
        {title}
      </h2>
      <div className={`gold-line mb-6 ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
