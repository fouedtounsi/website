import { useLanguage } from '../../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      data-testid="language-switcher"
      className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 hover:text-brand-gold transition-colors duration-300 border border-white/20 hover:border-brand-gold/50 px-3 py-1.5"
    >
      <span className={language === 'en' ? 'text-brand-gold' : ''}>EN</span>
      <span className="text-white/30">|</span>
      <span className={language === 'fr' ? 'text-brand-gold' : ''}>FR</span>
    </button>
  );
};

export default LanguageSwitcher;
