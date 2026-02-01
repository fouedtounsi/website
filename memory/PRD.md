# Tunisia Olive Oil & Olive Wood Products - Website PRD

## Project Overview
Product showcase/catalog website for IJL International featuring:
- **Tunisia Olive Oil** - Extra Virgin Olive Oil (biological, cold-pressed)
- **Olive Wood Products** - Handcrafted Tunisian artisan kitchenware

## Brand Identity
- **Company**: IJL International
- **Origin**: Tunisia (imported to Canada)
- **Distribution**: Montreal, Quebec, Canada
- **Theme**: Dark luxury with gold accents (#D4AF37)
- **Typography**: Playfair Display (headings), Manrope (body)

## What's Been Implemented ✅

### Date: February 1, 2026

**Pages:**
1. **Homepage** - Static olive tree background, story section, features, expandable products, gallery, target audience
2. **Olive Oil Page** - 6 SKUs (250ml-5L) with zoom lightbox
3. **Kitchenware Page** - 11 products with zoom lightbox
4. **About Page** - Brand story with video
5. **Contact Page** - Form with backend integration (saves to MongoDB)

**Features:**
- EN/FR language switcher (localStorage persistence)
- Image zoom lightbox on all products
- Expandable product sections on homepage
- Target audience section (Importers/Distributors/Retailers)
- Mobile responsive design
- Dark theme with gold accents

**Products:**

*Olive Oil (6 SKUs):*
- TOO-250: 250ml Bottle
- TOO-500: 500ml Bottle
- TOO-750: 750ml Bottle
- TOO-1000: 1L Bottle
- TOO-3000: 3L Jug
- TOO-5000: 5L Tin

*Olive Wood Products (11 items):*
- T13: Classic Wine Cup
- P02: Irregular Cutting Board
- M03: Flat Mortar
- B08: Heart Dish
- M01: Round Mortar
- J01: Rustic Chess Games
- K04: Set of 3 Cutting Board
- B12: Oval Dipping Dish Set
- S16: Spoon Table Set
- P06: Rectangular Board
- P07: Classic Rectangular Board

**Backend APIs:**
- GET /api/health - Health check
- GET /api/products/olive-oil - Olive oil products
- GET /api/products/kitchenware - Kitchenware products
- POST /api/contact - Contact form submission
- GET /api/contact - Retrieve messages (admin)

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, MongoDB
- **Fonts**: Playfair Display, Manrope, Cormorant Garamond

## Contact Information (To Update)
- Email: contact@huiledetunisia.com
- Phone: +1 (514) 000-0000
- Location: Montreal, Quebec, Canada

## Target Audience
- Importers (North America)
- Distributors (Canada-wide)
- Retailers (Fine grocery, gourmet shops, specialty stores)

## Next Action Items
1. Update real contact information (email, phone, address)
2. Consider adding admin panel for content management
3. Add social media links
4. Consider WhatsApp integration for quick inquiries
