import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionHeader } from '../components/shared/SectionHeader';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
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
        message: 'Thank you for your message. We will get back to you soon!' 
      });
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again or email us directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'contact@huiledetunisia.com',
      href: 'mailto:contact@huiledetunisia.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+1 (514) 000-0000',
      href: 'tel:+15140000000'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
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
              Contactez-Nous
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-tight">
              Get in Touch
            </h1>
            <div className="gold-line mb-6" />
            <p className="text-text-secondary text-lg leading-relaxed">
              Interested in our products? Have questions about wholesale or distribution? 
              We'd love to hear from you. Fill out the form below or reach out directly.
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
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`contact-info-${info.title.toLowerCase()}`}
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
                accent="Envoyez-nous un message"
                title="Send a Message"
                subtitle="We typically respond within 24-48 hours."
              />
              
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
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
                      placeholder="Email Address *"
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
                      placeholder="Company (Optional)"
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
                      placeholder="Subject *"
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
                    placeholder="Your Message *"
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
                  Why Contact Us?
                </h3>
                <div className="space-y-6">
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">Wholesale Inquiries</h4>
                    <p className="text-text-secondary text-sm">
                      Looking to stock our products? We offer competitive wholesale pricing for retailers and distributors.
                    </p>
                  </div>
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">Export & Distribution</h4>
                    <p className="text-text-secondary text-sm">
                      Interested in becoming a distributor in your region? Let's discuss partnership opportunities.
                    </p>
                  </div>
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">Custom Orders</h4>
                    <p className="text-text-secondary text-sm">
                      Need custom labeling or specific quantities? We can accommodate special requests.
                    </p>
                  </div>
                  <div className="feature-card">
                    <h4 className="text-text-primary font-medium mb-2">Product Information</h4>
                    <p className="text-text-secondary text-sm">
                      Have questions about our olive oil or kitchenware? We're happy to provide detailed information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-8 bg-surface-tertiary border border-brand-gold/20">
                <h4 className="font-playfair text-xl text-text-primary mb-4">Quick Contact</h4>
                <p className="text-text-secondary text-sm mb-4">
                  For urgent inquiries, reach us directly:
                </p>
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
