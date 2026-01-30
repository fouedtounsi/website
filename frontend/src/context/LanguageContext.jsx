import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      oliveOil: 'Olive Oil',
      kitchenware: 'Kitchenware',
      about: 'About',
      contact: 'Contact'
    },
    // Home Page
    home: {
      heroAccent: 'Superior Quality',
      heroTitle: 'Tunisia Olive Oil',
      heroSubtitle: 'Premium biological extra virgin olive oil & handcrafted olive wood kitchenware from Tunisia',
      exploreOil: 'Explore Olive Oil',
      viewKitchenware: 'View Kitchenware',
      feature1Title: '100% Biological',
      feature1Desc: 'Certified organic cultivation with no pesticides or chemicals',
      feature2Title: 'Superior Quality',
      feature2Desc: 'First cold pressing for maximum flavor and nutrients',
      feature3Title: 'Product of Tunisia',
      feature3Desc: 'Sourced from the finest olive groves of Tunisia',
      collectionsAccent: 'Discover Our Collections',
      collectionsTitle: 'Two Traditions, One Excellence',
      collectionsSubtitle: 'From the golden olive groves of Tunisia to your table - experience the finest olive products',
      extraVirgin: 'Extra Virgin Olive Oil',
      multipleFormats: 'Multiple Formats',
      handcrafted: 'Handcrafted',
      oliveWood: 'Olive Wood',
      oliveWoodKitchenware: 'Olive Wood Kitchenware',
      exploreCollection: 'Explore Collection',
      viewCollection: 'View Collection',
      ctaAccent: 'First Cold Pressing',
      ctaTitle: 'Experience Tunisian Excellence',
      ctaSubtitle: 'From our olive groves to your kitchen - discover the authentic taste of Tunisia',
      getInTouch: 'Get in Touch'
    },
    // Olive Oil Page
    oliveOil: {
      heroAccent: 'Extra Virgin Olive Oil',
      heroTitle: 'Extra Virgin Olive Oil',
      heroDesc: 'Experience the pure taste of Tunisian sunshine. Our biological extra virgin olive oil is cold-pressed from hand-picked olives, capturing the essence of the Mediterranean in every drop.',
      inquireNow: 'Inquire Now',
      productOfTunisia: 'Product of Tunisia',
      whyChooseAccent: 'What sets us apart',
      whyChooseTitle: 'Why Choose Our Oil',
      feature1Title: '100% Biological',
      feature1Desc: 'Certified organic olives grown without pesticides or synthetic fertilizers',
      feature2Title: 'First Cold Pressing',
      feature2Desc: 'Extracted at temperatures below 27°C to preserve nutrients and flavor',
      feature3Title: 'Extra Virgin Grade',
      feature3Desc: 'Acidity level below 0.8%, meeting the highest quality standards',
      feature4Title: 'Superior Quality',
      feature4Desc: 'Sourced from the finest olive groves in Tunisia',
      formatsAccent: 'Our Formats',
      formatsTitle: 'Available Formats',
      formatsSubtitle: 'From personal bottles to professional containers, find the perfect size for your needs',
      galleryAccent: 'Our Collection',
      galleryTitle: 'Product Gallery',
      ctaTitle: 'Interested in Our Olive Oil?',
      ctaSubtitle: 'Contact us for wholesale inquiries, export opportunities, or to find a distributor near you.',
      contactUs: 'Contact Us',
      // Products
      '250mlName': '250ml Bottle',
      '250mlDesc': 'Perfect for personal use or as a gift',
      '500mlName': '500ml Bottle',
      '500mlDesc': 'Ideal size for regular cooking needs',
      '750mlName': '750ml Bottle',
      '750mlDesc': 'Popular choice for household cooking',
      '1lName': '1L Bottle',
      '1lDesc': 'Best value for everyday use',
      '3lName': '3L Jug',
      '3lDesc': 'Family size for frequent cooking',
      '5lName': '5L Tin',
      '5lDesc': 'Professional size for restaurants & bulk buyers'
    },
    // Kitchenware Page
    kitchenware: {
      heroAccent: 'Tunisian Craftsmanship',
      heroTitle: 'Olive Wood Kitchenware',
      heroDesc: 'Discover our collection of handcrafted olive wood kitchenware. Each piece is a unique work of art, shaped by skilled Tunisian artisans using traditional techniques passed down through generations.',
      inquireNow: 'Inquire Now',
      craftAccent: 'Craftsmanship Excellence',
      craftTitle: 'Craftsmanship Excellence',
      feature1Title: 'Genuine Olive Wood',
      feature1Desc: 'Sourced from centuries-old olive trees in Tunisia',
      feature2Title: 'Handcrafted',
      feature2Desc: 'Each piece is individually shaped by skilled artisans',
      feature3Title: 'Unique Patterns',
      feature3Desc: 'Natural wood grain ensures no two pieces are alike',
      feature4Title: 'Food Safe',
      feature4Desc: 'Treated with natural oils, safe for food contact',
      collectionAccent: 'Our Collection',
      collectionTitle: 'Product Collection',
      collectionSubtitle: 'Each piece is unique, handcrafted from premium Tunisian olive wood',
      legacyAccent: 'Ancestral Know-How',
      legacyTitle: 'A Legacy of Craftsmanship',
      legacyDesc1: 'For generations, Tunisian artisans have transformed olive wood into functional works of art. Each piece in our collection carries the warmth and character of the Mediterranean.',
      legacyDesc2: 'Olive wood is renowned for its durability, natural antibacterial properties, and stunning grain patterns. No two pieces are ever the same, making each item truly unique.',
      madeInTunisia: 'Handmade in Tunisia',
      ctaTitle: 'Interested in Our Kitchenware?',
      ctaSubtitle: 'Contact us for wholesale orders, custom pieces, or to become a distributor.',
      getInTouch: 'Get in Touch'
    },
    // About Page
    about: {
      heroAccent: 'Our Story',
      heroTitle: 'About Us',
      heroDesc1: 'IJL International is a family-owned company dedicated to bringing the finest Tunisian products to Canada. Based in Montreal, Quebec, we are the Canadian subsidiary importing premium olive oil directly from Tunisia\'s finest groves.',
      heroDesc2: 'Our mission is to share the authentic taste and craftsmanship of Tunisia with Canadian markets. Products available in our Montreal warehouse with delivery across Canada.',
      statYears: 'Years of Excellence',
      statLocation: 'Canada',
      statDelivery: 'Delivery',
      statOrganic: 'Organic Certified',
      journeyAccent: 'Our Journey',
      journeyTitle: 'Our Journey',
      journeyDesc1: 'Our story began in the sun-drenched olive groves of Tunisia, where generations of families have cultivated olives using traditional methods. Inspired by this rich heritage, we established IJL International in Montreal to bring these treasures to Canadian homes.',
      journeyDesc2: 'Today, we import directly from local Tunisian farmers and artisans, ensuring fair prices and sustainable practices. Our olive oil is cold-pressed within hours of harvest, then shipped to our Montreal warehouse for distribution across Canada.',
      journeyDesc3: 'Our olive wood products are crafted by skilled artisans who transform reclaimed wood from old olive trees into beautiful, functional pieces that tell a story of Tunisian craftsmanship.',
      valuesAccent: 'Our Values',
      valuesTitle: 'Our Values',
      value1Title: 'Quality',
      value1Desc: 'We never compromise on quality. Every product undergoes rigorous quality control.',
      value2Title: 'Tradition',
      value2Desc: 'We preserve ancient techniques while embracing modern standards.',
      value3Title: 'Sustainability',
      value3Desc: 'Our practices respect the environment and support local communities.',
      value4Title: 'Authenticity',
      value4Desc: 'What you see is what you get - pure, genuine Tunisian products.',
      tunisiaAccent: 'From Tunisia to Canada',
      tunisiaTitle: 'Product of Tunisia • Delivered in Canada',
      tunisiaDesc: 'Tunisia has been cultivating olives for over 3,000 years. We import the finest extra virgin olive oil directly from Tunisia to our warehouse in Montreal. Orders ship across Canada with fast, reliable delivery.',
      ctaTitle: 'Ready to Experience Tunisia?',
      ctaSubtitle: 'Whether you\'re a retailer, distributor, or simply curious about our products, we\'d love to hear from you.',
      contactUs: 'Contact Us'
    },
    // Contact Page
    contact: {
      heroAccent: 'Contact Us',
      heroTitle: 'Get in Touch',
      heroDesc: 'Interested in our products? Have questions about wholesale or distribution? We\'d love to hear from you. Fill out the form below or reach out directly.',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      formAccent: 'Send us a message',
      formTitle: 'Send a Message',
      formSubtitle: 'We typically respond within 24-48 hours.',
      nameLabel: 'Your Name *',
      emailLabel: 'Email Address *',
      companyLabel: 'Company (Optional)',
      subjectLabel: 'Subject *',
      messageLabel: 'Your Message *',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Thank you for your message. We will get back to you soon!',
      errorMessage: 'Something went wrong. Please try again or email us directly.',
      whyContactTitle: 'Why Contact Us?',
      reason1Title: 'Wholesale Inquiries',
      reason1Desc: 'Looking to stock our products? We offer competitive wholesale pricing for retailers and distributors.',
      reason2Title: 'Export & Distribution',
      reason2Desc: 'Interested in becoming a distributor in your region? Let\'s discuss partnership opportunities.',
      reason3Title: 'Custom Orders',
      reason3Desc: 'Need custom labeling or specific quantities? We can accommodate special requests.',
      reason4Title: 'Product Information',
      reason4Desc: 'Have questions about our olive oil or kitchenware? We\'re happy to provide detailed information.',
      quickContactTitle: 'Quick Contact',
      quickContactDesc: 'For urgent inquiries, reach us directly:'
    },
    // Footer
    footer: {
      description: 'Premium biological extra virgin olive oil from Tunisia and handcrafted olive wood kitchenware. Imported and distributed by IJL International from Montreal, Canada.',
      tagline: 'Product of Tunisia • Distributed in Canada',
      navigation: 'Navigation',
      contact: 'Contact',
      rights: 'All rights reserved.',
      shipsCanada: 'Ships across Canada'
    }
  },
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      oliveOil: 'Huile d\'Olive',
      kitchenware: 'Ustensiles',
      about: 'À Propos',
      contact: 'Contact'
    },
    // Home Page
    home: {
      heroAccent: 'Qualité Supérieure',
      heroTitle: 'Huile d\'Olive de Tunisie',
      heroSubtitle: 'Huile d\'olive extra vierge biologique et ustensiles en bois d\'olivier artisanaux de Tunisie',
      exploreOil: 'Découvrir l\'Huile',
      viewKitchenware: 'Voir les Ustensiles',
      feature1Title: '100% Biologique',
      feature1Desc: 'Culture biologique certifiée sans pesticides ni produits chimiques',
      feature2Title: 'Qualité Supérieure',
      feature2Desc: 'Première pression à froid pour un maximum de saveur et de nutriments',
      feature3Title: 'Produit de Tunisie',
      feature3Desc: 'Provenant des meilleures oliveraies de Tunisie',
      collectionsAccent: 'Découvrez Nos Collections',
      collectionsTitle: 'Deux Traditions, Une Excellence',
      collectionsSubtitle: 'Des oliveraies dorées de Tunisie à votre table - découvrez les meilleurs produits d\'olive',
      extraVirgin: 'Huile d\'Olive Extra Vierge',
      multipleFormats: 'Formats Multiples',
      handcrafted: 'Fait Main',
      oliveWood: 'Bois d\'Olivier',
      oliveWoodKitchenware: 'Ustensiles en Bois d\'Olivier',
      exploreCollection: 'Explorer la Collection',
      viewCollection: 'Voir la Collection',
      ctaAccent: 'Première Pression à Froid',
      ctaTitle: 'Découvrez l\'Excellence Tunisienne',
      ctaSubtitle: 'De nos oliveraies à votre cuisine - découvrez le goût authentique de la Tunisie',
      getInTouch: 'Contactez-Nous'
    },
    // Olive Oil Page
    oliveOil: {
      heroAccent: 'Huile d\'Olive Extra Vierge',
      heroTitle: 'Huile d\'Olive Extra Vierge',
      heroDesc: 'Découvrez le goût pur du soleil tunisien. Notre huile d\'olive extra vierge biologique est pressée à froid à partir d\'olives cueillies à la main, capturant l\'essence de la Méditerranée dans chaque goutte.',
      inquireNow: 'Demander un Devis',
      productOfTunisia: 'Produit de Tunisie',
      whyChooseAccent: 'Ce qui nous distingue',
      whyChooseTitle: 'Pourquoi Choisir Notre Huile',
      feature1Title: '100% Biologique',
      feature1Desc: 'Olives biologiques certifiées cultivées sans pesticides ni engrais synthétiques',
      feature2Title: 'Première Pression à Froid',
      feature2Desc: 'Extraite à des températures inférieures à 27°C pour préserver les nutriments et la saveur',
      feature3Title: 'Grade Extra Vierge',
      feature3Desc: 'Niveau d\'acidité inférieur à 0,8%, répondant aux normes de qualité les plus élevées',
      feature4Title: 'Qualité Supérieure',
      feature4Desc: 'Provenant des meilleures oliveraies de Tunisie',
      formatsAccent: 'Nos Formats',
      formatsTitle: 'Formats Disponibles',
      formatsSubtitle: 'Des bouteilles personnelles aux contenants professionnels, trouvez la taille parfaite pour vos besoins',
      galleryAccent: 'Notre Collection',
      galleryTitle: 'Galerie de Produits',
      ctaTitle: 'Intéressé par Notre Huile d\'Olive?',
      ctaSubtitle: 'Contactez-nous pour des demandes de gros, des opportunités d\'exportation ou pour trouver un distributeur près de chez vous.',
      contactUs: 'Contactez-Nous',
      // Products
      '250mlName': 'Bouteille 250ml',
      '250mlDesc': 'Parfait pour un usage personnel ou comme cadeau',
      '500mlName': 'Bouteille 500ml',
      '500mlDesc': 'Taille idéale pour les besoins de cuisson réguliers',
      '750mlName': 'Bouteille 750ml',
      '750mlDesc': 'Choix populaire pour la cuisine familiale',
      '1lName': 'Bouteille 1L',
      '1lDesc': 'Meilleur rapport qualité-prix pour un usage quotidien',
      '3lName': 'Bidon 3L',
      '3lDesc': 'Format familial pour une cuisson fréquente',
      '5lName': 'Bidon 5L',
      '5lDesc': 'Format professionnel pour restaurants et acheteurs en gros'
    },
    // Kitchenware Page
    kitchenware: {
      heroAccent: 'Artisanat Tunisien',
      heroTitle: 'Ustensiles en Bois d\'Olivier',
      heroDesc: 'Découvrez notre collection d\'ustensiles en bois d\'olivier faits à la main. Chaque pièce est une œuvre d\'art unique, façonnée par des artisans tunisiens qualifiés utilisant des techniques traditionnelles transmises de génération en génération.',
      inquireNow: 'Demander un Devis',
      craftAccent: 'Excellence Artisanale',
      craftTitle: 'Excellence Artisanale',
      feature1Title: 'Véritable Bois d\'Olivier',
      feature1Desc: 'Provenant d\'oliviers centenaires de Tunisie',
      feature2Title: 'Fait Main',
      feature2Desc: 'Chaque pièce est individuellement façonnée par des artisans qualifiés',
      feature3Title: 'Motifs Uniques',
      feature3Desc: 'Le grain naturel du bois garantit que deux pièces ne sont jamais identiques',
      feature4Title: 'Contact Alimentaire',
      feature4Desc: 'Traité avec des huiles naturelles, sans danger pour le contact alimentaire',
      collectionAccent: 'Notre Collection',
      collectionTitle: 'Collection de Produits',
      collectionSubtitle: 'Chaque pièce est unique, fabriquée à la main à partir de bois d\'olivier tunisien de qualité',
      legacyAccent: 'Un Savoir-Faire Ancestral',
      legacyTitle: 'Un Héritage d\'Artisanat',
      legacyDesc1: 'Depuis des générations, les artisans tunisiens transforment le bois d\'olivier en œuvres d\'art fonctionnelles. Chaque pièce de notre collection porte la chaleur et le caractère de la Méditerranée.',
      legacyDesc2: 'Le bois d\'olivier est réputé pour sa durabilité, ses propriétés antibactériennes naturelles et ses motifs de grain magnifiques. Deux pièces ne sont jamais identiques, rendant chaque article vraiment unique.',
      madeInTunisia: 'Fait Main en Tunisie',
      ctaTitle: 'Intéressé par Nos Ustensiles?',
      ctaSubtitle: 'Contactez-nous pour des commandes en gros, des pièces personnalisées ou pour devenir distributeur.',
      getInTouch: 'Contactez-Nous'
    },
    // About Page
    about: {
      heroAccent: 'Notre Histoire',
      heroTitle: 'À Propos',
      heroDesc1: 'IJL International est une entreprise familiale dédiée à apporter les meilleurs produits tunisiens au Canada. Basée à Montréal, Québec, nous sommes la filiale canadienne important de l\'huile d\'olive premium directement des meilleures oliveraies de Tunisie.',
      heroDesc2: 'Notre mission est de partager le goût authentique et l\'artisanat de la Tunisie avec les marchés canadiens. Produits disponibles dans notre entrepôt de Montréal avec livraison à travers le Canada.',
      statYears: 'Années d\'Excellence',
      statLocation: 'Canada',
      statDelivery: 'Livraison',
      statOrganic: 'Certifié Biologique',
      journeyAccent: 'Notre Parcours',
      journeyTitle: 'Notre Parcours',
      journeyDesc1: 'Notre histoire a commencé dans les oliveraies ensoleillées de Tunisie, où des générations de familles ont cultivé des olives en utilisant des méthodes traditionnelles. Inspirés par ce riche patrimoine, nous avons établi IJL International à Montréal pour apporter ces trésors aux foyers canadiens.',
      journeyDesc2: 'Aujourd\'hui, nous importons directement des agriculteurs et artisans tunisiens locaux, assurant des prix équitables et des pratiques durables. Notre huile d\'olive est pressée à froid quelques heures après la récolte, puis expédiée à notre entrepôt de Montréal pour distribution à travers le Canada.',
      journeyDesc3: 'Nos produits en bois d\'olivier sont fabriqués par des artisans qualifiés qui transforment le bois récupéré de vieux oliviers en belles pièces fonctionnelles qui racontent une histoire de l\'artisanat tunisien.',
      valuesAccent: 'Nos Valeurs',
      valuesTitle: 'Nos Valeurs',
      value1Title: 'Qualité',
      value1Desc: 'Nous ne faisons jamais de compromis sur la qualité. Chaque produit subit un contrôle de qualité rigoureux.',
      value2Title: 'Tradition',
      value2Desc: 'Nous préservons les techniques anciennes tout en adoptant les normes modernes.',
      value3Title: 'Durabilité',
      value3Desc: 'Nos pratiques respectent l\'environnement et soutiennent les communautés locales.',
      value4Title: 'Authenticité',
      value4Desc: 'Ce que vous voyez est ce que vous obtenez - des produits tunisiens purs et authentiques.',
      tunisiaAccent: 'De la Tunisie au Canada',
      tunisiaTitle: 'Produit de Tunisie • Livré au Canada',
      tunisiaDesc: 'La Tunisie cultive des olives depuis plus de 3 000 ans. Nous importons la meilleure huile d\'olive extra vierge directement de Tunisie vers notre entrepôt à Montréal. Les commandes sont expédiées à travers le Canada avec une livraison rapide et fiable.',
      ctaTitle: 'Prêt à Découvrir la Tunisie?',
      ctaSubtitle: 'Que vous soyez détaillant, distributeur ou simplement curieux de nos produits, nous serions ravis de vous entendre.',
      contactUs: 'Contactez-Nous'
    },
    // Contact Page
    contact: {
      heroAccent: 'Contactez-Nous',
      heroTitle: 'Entrer en Contact',
      heroDesc: 'Intéressé par nos produits? Vous avez des questions sur la vente en gros ou la distribution? Nous serions ravis de vous entendre. Remplissez le formulaire ci-dessous ou contactez-nous directement.',
      email: 'Courriel',
      phone: 'Téléphone',
      location: 'Emplacement',
      formAccent: 'Envoyez-nous un message',
      formTitle: 'Envoyer un Message',
      formSubtitle: 'Nous répondons généralement dans les 24-48 heures.',
      nameLabel: 'Votre Nom *',
      emailLabel: 'Adresse Courriel *',
      companyLabel: 'Entreprise (Optionnel)',
      subjectLabel: 'Sujet *',
      messageLabel: 'Votre Message *',
      sendMessage: 'Envoyer le Message',
      sending: 'Envoi en cours...',
      successMessage: 'Merci pour votre message. Nous vous répondrons bientôt!',
      errorMessage: 'Une erreur s\'est produite. Veuillez réessayer ou nous envoyer un courriel directement.',
      whyContactTitle: 'Pourquoi Nous Contacter?',
      reason1Title: 'Demandes de Gros',
      reason1Desc: 'Vous souhaitez stocker nos produits? Nous offrons des prix de gros compétitifs pour les détaillants et distributeurs.',
      reason2Title: 'Export & Distribution',
      reason2Desc: 'Intéressé à devenir distributeur dans votre région? Discutons des opportunités de partenariat.',
      reason3Title: 'Commandes Personnalisées',
      reason3Desc: 'Besoin d\'étiquetage personnalisé ou de quantités spécifiques? Nous pouvons accommoder les demandes spéciales.',
      reason4Title: 'Information sur les Produits',
      reason4Desc: 'Vous avez des questions sur notre huile d\'olive ou nos ustensiles? Nous sommes heureux de fournir des informations détaillées.',
      quickContactTitle: 'Contact Rapide',
      quickContactDesc: 'Pour les demandes urgentes, contactez-nous directement:'
    },
    // Footer
    footer: {
      description: 'Huile d\'olive extra vierge biologique premium de Tunisie et ustensiles en bois d\'olivier artisanaux. Importé et distribué par IJL International depuis Montréal, Canada.',
      tagline: 'Produit de Tunisie • Distribué au Canada',
      navigation: 'Navigation',
      contact: 'Contact',
      rights: 'Tous droits réservés.',
      shipsCanada: 'Livraison à travers le Canada'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
