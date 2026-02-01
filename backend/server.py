from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Tunisia Olive Oil API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBasic()

# Admin credentials (in production, use environment variables)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'TunisiaOlive2024!')


def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


# ==================== MODELS ====================

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    read: bool = False

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=5, max_length=255)
    company: Optional[str] = Field(None, max_length=200)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)

class ContactMessageResponse(BaseModel):
    success: bool
    message: str
    id: str


class OliveOilProduct(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    sku: str
    name_en: str
    name_fr: str
    size: str
    description_en: str
    description_fr: str
    image: str
    active: bool = True
    order: int = 0

class OliveOilProductCreate(BaseModel):
    sku: str
    name_en: str
    name_fr: str
    size: str
    description_en: str
    description_fr: str
    image: str
    active: bool = True
    order: int = 0

class OliveOilProductUpdate(BaseModel):
    sku: Optional[str] = None
    name_en: Optional[str] = None
    name_fr: Optional[str] = None
    size: Optional[str] = None
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    image: Optional[str] = None
    active: Optional[bool] = None
    order: Optional[int] = None


class KitchenwareProduct(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    reference: str
    name_en: str
    name_fr: str
    dimensions: Optional[str] = None
    description_en: str
    description_fr: str
    image: str
    active: bool = True
    order: int = 0

class KitchenwareProductCreate(BaseModel):
    reference: str
    name_en: str
    name_fr: str
    dimensions: Optional[str] = None
    description_en: str
    description_fr: str
    image: str
    active: bool = True
    order: int = 0

class KitchenwareProductUpdate(BaseModel):
    reference: Optional[str] = None
    name_en: Optional[str] = None
    name_fr: Optional[str] = None
    dimensions: Optional[str] = None
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    image: Optional[str] = None
    active: Optional[bool] = None
    order: Optional[int] = None


class SiteSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "site_settings"
    email: str = "contact@huiledetunisia.com"
    phone: str = "+1 (514) 000-0000"
    address: str = "Montreal, Quebec, Canada"
    company_name: str = "IJL International"

class SiteSettingsUpdate(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    company_name: Optional[str] = None


# ==================== PUBLIC API ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Tunisia Olive Oil API - Welcome"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Tunisia Olive Oil API"}


# Contact Form
@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact_form(input: ContactMessageCreate):
    try:
        contact_obj = ContactMessage(**input.model_dump())
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contact_messages.insert_one(doc)
        return ContactMessageResponse(
            success=True,
            message="Thank you for your message. We will get back to you soon!",
            id=contact_obj.id
        )
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


# Public Products API
@api_router.get("/products/olive-oil")
async def get_olive_oil_products():
    products = await db.olive_oil_products.find({"active": True}, {"_id": 0}).sort("order", 1).to_list(100)
    if not products:
        # Return default products if none in DB
        return {"products": get_default_olive_oil_products()}
    return {"products": products}

@api_router.get("/products/kitchenware")
async def get_kitchenware_products():
    products = await db.kitchenware_products.find({"active": True}, {"_id": 0}).sort("order", 1).to_list(100)
    if not products:
        # Return default products if none in DB
        return {"products": get_default_kitchenware_products()}
    return {"products": products}

@api_router.get("/settings")
async def get_site_settings():
    settings = await db.site_settings.find_one({"id": "site_settings"}, {"_id": 0})
    if not settings:
        return SiteSettings().model_dump()
    return settings


# ==================== ADMIN API ROUTES ====================

# Admin Login Check
@api_router.post("/admin/login")
async def admin_login(username: str = Depends(verify_admin)):
    return {"success": True, "message": "Login successful", "username": username}

@api_router.get("/admin/verify")
async def verify_admin_session(username: str = Depends(verify_admin)):
    return {"authenticated": True, "username": username}


# Admin - Contact Messages
@api_router.get("/admin/messages", response_model=List[ContactMessage])
async def get_all_messages(username: str = Depends(verify_admin)):
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for msg in messages:
        if isinstance(msg.get('created_at'), str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    return messages

@api_router.put("/admin/messages/{message_id}/read")
async def mark_message_read(message_id: str, username: str = Depends(verify_admin)):
    result = await db.contact_messages.update_one({"id": message_id}, {"$set": {"read": True}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True}

@api_router.delete("/admin/messages/{message_id}")
async def delete_message(message_id: str, username: str = Depends(verify_admin)):
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True}


# Admin - Olive Oil Products
@api_router.get("/admin/olive-oil", response_model=List[OliveOilProduct])
async def admin_get_olive_oil(username: str = Depends(verify_admin)):
    products = await db.olive_oil_products.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return products

@api_router.post("/admin/olive-oil", response_model=OliveOilProduct)
async def admin_create_olive_oil(product: OliveOilProductCreate, username: str = Depends(verify_admin)):
    product_obj = OliveOilProduct(**product.model_dump())
    await db.olive_oil_products.insert_one(product_obj.model_dump())
    return product_obj

@api_router.put("/admin/olive-oil/{product_id}", response_model=OliveOilProduct)
async def admin_update_olive_oil(product_id: str, product: OliveOilProductUpdate, username: str = Depends(verify_admin)):
    update_data = {k: v for k, v in product.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.olive_oil_products.update_one({"id": product_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    updated = await db.olive_oil_products.find_one({"id": product_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/olive-oil/{product_id}")
async def admin_delete_olive_oil(product_id: str, username: str = Depends(verify_admin)):
    result = await db.olive_oil_products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True}


# Admin - Kitchenware Products
@api_router.get("/admin/kitchenware", response_model=List[KitchenwareProduct])
async def admin_get_kitchenware(username: str = Depends(verify_admin)):
    products = await db.kitchenware_products.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return products

@api_router.post("/admin/kitchenware", response_model=KitchenwareProduct)
async def admin_create_kitchenware(product: KitchenwareProductCreate, username: str = Depends(verify_admin)):
    product_obj = KitchenwareProduct(**product.model_dump())
    await db.kitchenware_products.insert_one(product_obj.model_dump())
    return product_obj

@api_router.put("/admin/kitchenware/{product_id}", response_model=KitchenwareProduct)
async def admin_update_kitchenware(product_id: str, product: KitchenwareProductUpdate, username: str = Depends(verify_admin)):
    update_data = {k: v for k, v in product.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.kitchenware_products.update_one({"id": product_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    updated = await db.kitchenware_products.find_one({"id": product_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/kitchenware/{product_id}")
async def admin_delete_kitchenware(product_id: str, username: str = Depends(verify_admin)):
    result = await db.kitchenware_products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True}


# Admin - Site Settings
@api_router.get("/admin/settings", response_model=SiteSettings)
async def admin_get_settings(username: str = Depends(verify_admin)):
    settings = await db.site_settings.find_one({"id": "site_settings"}, {"_id": 0})
    if not settings:
        return SiteSettings()
    return settings

@api_router.put("/admin/settings", response_model=SiteSettings)
async def admin_update_settings(settings: SiteSettingsUpdate, username: str = Depends(verify_admin)):
    update_data = {k: v for k, v in settings.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    await db.site_settings.update_one(
        {"id": "site_settings"}, 
        {"$set": update_data}, 
        upsert=True
    )
    updated = await db.site_settings.find_one({"id": "site_settings"}, {"_id": 0})
    return updated


# Admin - Initialize Default Products
@api_router.post("/admin/init-products")
async def init_default_products(username: str = Depends(verify_admin)):
    # Check if products already exist
    oil_count = await db.olive_oil_products.count_documents({})
    kitchen_count = await db.kitchenware_products.count_documents({})
    
    if oil_count == 0:
        default_oil = get_default_olive_oil_products()
        for i, p in enumerate(default_oil):
            p['id'] = str(uuid.uuid4())
            p['order'] = i
            p['active'] = True
        await db.olive_oil_products.insert_many(default_oil)
    
    if kitchen_count == 0:
        default_kitchen = get_default_kitchenware_products()
        for i, p in enumerate(default_kitchen):
            p['id'] = str(uuid.uuid4())
            p['order'] = i
            p['active'] = True
        await db.kitchenware_products.insert_many(default_kitchen)
    
    return {"success": True, "message": "Default products initialized"}


# ==================== DEFAULT PRODUCTS ====================

def get_default_olive_oil_products():
    return [
        {
            "sku": "TOO-250",
            "name_en": "250ml Bottle",
            "name_fr": "Bouteille 250ml",
            "size": "250ml / 8.45 fl oz",
            "description_en": "Perfect for personal use or as a gift",
            "description_fr": "Parfait pour un usage personnel ou comme cadeau",
            "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/rxzvc8pm_Image%202026-01-14%20at%2011.04.12%20AM%20%282%29.jpeg"
        },
        {
            "sku": "TOO-500",
            "name_en": "500ml Bottle",
            "name_fr": "Bouteille 500ml",
            "size": "500ml / 16.9 fl oz",
            "description_en": "Ideal size for regular cooking needs",
            "description_fr": "Taille idéale pour les besoins de cuisson réguliers",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/xdffe8un_500%20ml.jpg"
        },
        {
            "sku": "TOO-750",
            "name_en": "750ml Bottle",
            "name_fr": "Bouteille 750ml",
            "size": "750ml / 25.4 fl oz",
            "description_en": "Popular choice for household cooking",
            "description_fr": "Choix populaire pour la cuisine familiale",
            "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/ovii6g2w_Image%202026-01-14%20at%2011.04.12%20AM%20%281%29.jpeg"
        },
        {
            "sku": "TOO-1000",
            "name_en": "1L Bottle",
            "name_fr": "Bouteille 1L",
            "size": "1L / 33.81 fl oz",
            "description_en": "Best value for everyday use",
            "description_fr": "Meilleur rapport qualité-prix pour un usage quotidien",
            "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/jbnqgx2x_Image%202026-01-14%20at%2011.04.09%20AM%20%281%29.jpeg"
        },
        {
            "sku": "TOO-3000",
            "name_en": "3L Jug",
            "name_fr": "Bidon 3L",
            "size": "3L / 101.44 fl oz",
            "description_en": "Family size for frequent cooking",
            "description_fr": "Format familial pour une cuisson fréquente",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/pzhqk6dm_3l.jpg"
        },
        {
            "sku": "TOO-5000",
            "name_en": "5L Tin",
            "name_fr": "Bidon 5L",
            "size": "5L / 169.07 fl oz",
            "description_en": "Professional size for restaurants & bulk buyers",
            "description_fr": "Format professionnel pour restaurants et acheteurs en gros",
            "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/s0xiozcb_Image%202026-01-14%20at%2011.04.08%20AM%20%281%29.jpeg"
        }
    ]

def get_default_kitchenware_products():
    return [
        {
            "reference": "T13",
            "name_en": "Classic Wine Cup",
            "name_fr": "Coupe Classique",
            "dimensions": None,
            "description_en": "Elegant wine goblet handcrafted from premium olive wood",
            "description_fr": "Coupe à vin élégante fabriquée à la main en bois d'olivier",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6xmzcof6_Classic%20Wine%20Cup%20REF%20T13.jpg"
        },
        {
            "reference": "P02",
            "name_en": "Irregular Cutting Board",
            "name_fr": "Planche à Découper Irrégulière",
            "dimensions": "25/30/35/40/45 CM",
            "description_en": "Natural edge cutting board with unique wood grain patterns",
            "description_fr": "Planche à découper naturelle avec motifs de grain uniques",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/3w9avqvz_Cutting%20Board%20REF%20P02.jpg"
        },
        {
            "reference": "M03",
            "name_en": "Flat Mortar",
            "name_fr": "Mortier Plat",
            "dimensions": "6/8/10/12/14/16/18 CM",
            "description_en": "Traditional mortar & pestle for grinding spices and herbs",
            "description_fr": "Mortier traditionnel pour broyer épices et herbes",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/hg47jtoq_Flat%20Mortard.jpg"
        },
        {
            "reference": "B08",
            "name_en": "Heart Dish",
            "name_fr": "Plat Cœur",
            "dimensions": None,
            "description_en": "Beautiful heart-shaped serving dish for special occasions",
            "description_fr": "Magnifique plat en forme de cœur pour occasions spéciales",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/h1ifnun3_Heart%20Dish%20REF%20B08.jpg"
        },
        {
            "reference": "M01",
            "name_en": "Round Mortar",
            "name_fr": "Mortier Rond",
            "dimensions": "6/8/10/12/14/16/18 CM",
            "description_en": "Classic round mortar & pestle perfect for crushing herbs",
            "description_fr": "Mortier rond classique parfait pour écraser les herbes",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/depri7sw_Round%20Mortard%20REF%20M01.jpg"
        },
        {
            "reference": "J01",
            "name_en": "Rustic Chess Games",
            "name_fr": "Jeux d'Echecs Rustique",
            "dimensions": "30/37/50 CM",
            "description_en": "Handcrafted olive wood chess set with natural rustic edge",
            "description_fr": "Jeu d'échecs en bois d'olivier avec bord rustique naturel",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6su95ih4_Rustic%20Chess%20Games.jpg"
        },
        {
            "reference": "K04",
            "name_en": "Set of 3 Cutting Board",
            "name_fr": "3 Planches de Découpage",
            "dimensions": None,
            "description_en": "Set of three olive wood cutting boards in various sizes",
            "description_fr": "Ensemble de trois planches en bois d'olivier",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/ublmw7w9_Set%20of%203%20Cutting%20Board.jpg"
        },
        {
            "reference": "B12",
            "name_en": "Set of 3 Oval Dipping Dish",
            "name_fr": "Kit de 3 Plats Ovale",
            "dimensions": None,
            "description_en": "Elegant oval dipping dishes perfect for appetizers",
            "description_fr": "Élégants plats ovales parfaits pour les apéritifs",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/gvi5wag7_Set%20of%203%20Oval%20Dipping%20Dish%20Ref%20B12.jpg"
        },
        {
            "reference": "S16",
            "name_en": "Spoon Table Set",
            "name_fr": "Couvert de Cuillère",
            "dimensions": "20/25/30/35 CM",
            "description_en": "Complete olive wood spoon and fork set for serving",
            "description_fr": "Ensemble complet de cuillères et fourchettes en bois d'olivier",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/5be4zzh9_Spoon%20Table%20REF%20S16.jpg"
        },
        {
            "reference": "P06",
            "name_en": "Rectangular Board",
            "name_fr": "Planche Rectangulaire",
            "dimensions": "20/25/30/35 CM",
            "description_en": "Classic rectangular cutting board with natural grain",
            "description_fr": "Planche rectangulaire classique avec grain naturel",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/vn5553ii_Rectangular%20Board.jpg"
        },
        {
            "reference": "P07",
            "name_en": "Rectangular Classic Board",
            "name_fr": "Planche Rectangulaire Classique",
            "dimensions": "20/25/30/35 CM",
            "description_en": "Elegant classic rectangular board for serving and cutting",
            "description_fr": "Élégante planche rectangulaire pour servir et découper",
            "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/b2b49s7q_Rectangular%20Classic%20Board.jpg"
        }
    ]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
