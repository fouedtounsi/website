# Huile de Sfax - Product Showcase Website PRD

## Project Overview
Premium product showcase/catalog website for IJL International featuring:
- **Huile de Sfax** Extra Virgin Olive Oil (biological, cold-pressed)
- **Olive Wood Kitchenware** (handcrafted Tunisian artisan products)

## Brand Identity
- **Company**: IJL International
- **Location**: Sfax, Tunisia
- **Theme**: Dark luxury with gold accents (#D4AF37)
- **Typography**: Playfair Display (headings), Manrope (body)

## What's Been Implemented ✅

### Date: January 30, 2026

**Pages:**
1. **Homepage** - Video hero, feature highlights, Bento grid product preview
2. **Olive Oil Page** - 4 product formats (250ml, 750ml, 1L, 5L tin)
3. **Kitchenware Page** - 4 products (Classic Cup, Cutting Board, Mortar, Heart Dish)
4. **About Page** - Brand story, values, Tunisia heritage
5. **Contact Page** - Form with backend integration

**Backend APIs:**
- `GET /api/` - Welcome endpoint
- `GET /api/health` - Health check
- `GET /api/products/olive-oil` - Olive oil products data
- `GET /api/products/kitchenware` - Kitchenware products data
- `POST /api/contact` - Contact form submission (stores to MongoDB)
- `GET /api/contact` - Retrieve contact messages (admin)

**Features:**
- Dark theme with gold accents
- Responsive design (mobile hamburger menu)
- Smooth animations with Framer Motion
- All user-provided product images integrated
- Bilingual labels (French/English)
- Contact form with validation and success/error messages

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, MongoDB
- **Fonts**: Playfair Display, Manrope, Cormorant Garamond

## Core Requirements (Static)
- Product showcase only (no e-commerce)
- Display olive oil in 4 formats
- Display 4 kitchenware items
- Contact form for inquiries
- Bilingual content support
- Premium dark aesthetic

## User Personas
1. **Wholesale Buyers** - Looking for bulk olive oil
2. **Retailers/Distributors** - Seeking product partnerships
3. **End Consumers** - Interested in premium Tunisian products
4. **Gift Buyers** - Looking for unique artisan items

## Prioritized Backlog

### P0 (Completed)
- ✅ Homepage with hero and product preview
- ✅ Olive Oil product showcase
- ✅ Kitchenware product showcase
- ✅ About page
- ✅ Contact form functionality

### P1 (Future)
- Multi-language toggle (EN/FR/AR)
- Product detail modals/pages
- WhatsApp integration for quick contact
- Newsletter subscription

### P2 (Future)
- Blog/recipes section
- Certification badges display
- Testimonials carousel
- Social media integration

## Next Action Items
1. Update contact email/phone with real values
2. Add actual business address
3. Consider adding WhatsApp chat button for quick inquiries
4. Add social media links in footer
