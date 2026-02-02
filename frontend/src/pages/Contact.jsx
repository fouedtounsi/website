import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${API}/contact`, formData);
      setStatus({ 
        type: 'success', 
        message: t('contact.successMessage')
      });
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: t('contact.errorMessage')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.email'),
      value: 'info@tunisianolivegold.ca',
      href: 'mailto:info@tunisianolivegold.ca'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.phone'),
      value: '(438) 779-9000',
      href: 'tel:+14387799000'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.location'),
      value: 'Montreal, Quebec, Canada',
      href: null
    }
  ];

  return (
    <div data-testid="contact-page" className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-brand-gold font-cormorant italic text-xl mb-4 block">
              {t('contact.heroAccent')}
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-tight">
              {t('contact.heroTitle')}
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-text-secondary text-lg leading-relaxed">
              {t('contact.heroDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-surface-secondary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`contact-info-${index}`}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 border border-brand-gold/30 text-brand-gold mb-4">
                  {info.icon}
                </div>
                <h3 className="font-playfair text-lg text-text-primary mb-2">{info.title}</h3>
                {info.href ? (
                  <a 
                    href={info.href}
                    className="text-text-secondary hover:text-brand-gold transition-colors duration-300"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="text-text-secondary">{info.value}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 md:py-32 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeader
                accent={t('contact.formAccent')}
                title={t('contact.formTitle')}
                subtitle={t('contact.formSubtitle')}
              />
              
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.nameLabel')}
                      required
                      data-testid="contact-input-name"
                      className="form-input-gold"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailLabel')}
                      required
                      data-testid="contact-input-email"
                      className="form-input-gold"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('contact.companyLabel')}
                      data-testid="contact-input-company"
                      className="form-input-gold"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t('contact.subjectLabel')}
                      required
                      data-testid="contact-input-subject"
                      className="form-input-gold"
                    />
                  </div>
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messageLabel')}
                    required
                    rows={6}
                    data-testid="contact-input-message"
                    className="form-input-gold resize-none"
                  />
                </div>

                {/* Status Message */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-4 ${
                      status.type === 'success' 
                        ? 'bg-green-900/20 border border-green-500/30 text-green-400'
                        : 'bg-red-900/20 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="contact-submit-button"
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
                  <Send size={16} />
                </button>
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-12"
            >
              <div className="bg-surface-secondary border border-white/5 p-8 md:p-12">
                <h3 className="font-playfair text-2xl text-text-primary mb-6">
                  {t('contact.whyContactTitle')}
                </h3>
                <div className="space-y-6">
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">{t('contact.reason1Title')}</h4>
                    <p className="text-text-secondary text-sm">{t('contact.reason1Desc')}</p>
                  </div>
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">{t('contact.reason2Title')}</h4>
                    <p className="text-text-secondary text-sm">{t('contact.reason2Desc')}</p>
                  </div>
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">{t('contact.reason3Title')}</h4>
                    <p className="text-text-secondary text-sm">{t('contact.reason3Desc')}</p>
                  </div>
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">{t('contact.reason4Title')}</h4>
                    <p className="text-text-secondary text-sm">{t('contact.reason4Desc')}</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-8 bg-surface-tertiary border border-brand-gold/20">
                <h4 className="font-playfair text-xl text-text-primary mb-4">{t('contact.quickContactTitle')}</h4>
                <p className="text-text-secondary text-sm mb-4">{t('contact.quickContactDesc')}</p>
                <a 
                  href="mailto:contact@huiledetunisia.com"
                  className="text-brand-gold hover:text-brand-gold-dim transition-colors duration-300 flex items-center gap-2"
                >
                  <Mail size={18} />
                  contact@huiledetunisia.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
