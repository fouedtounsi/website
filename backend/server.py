from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
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
app = FastAPI(title="Huile de Sfax API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

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


# API Routes
@api_router.get("/")
async def root():
    return {"message": "Huile de Sfax API - Welcome"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Huile de Sfax API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact_form(input: ContactMessageCreate):
    """Submit a contact form message"""
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

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for msg in messages:
        if isinstance(msg['created_at'], str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    
    return messages


# Product Endpoints (Static data for now)
@api_router.get("/products/olive-oil")
async def get_olive_oil_products():
    """Get all olive oil products"""
    return {
        "category": "Olive Oil",
        "category_fr": "Huile d'Olive",
        "products": [
            {
                "id": "oil-250ml",
                "name": "250ml Bottle",
                "name_fr": "Bouteille 250ml",
                "size": "250ml / 8.45 fl oz",
                "description": "Perfect for personal use or as a gift",
                "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/rxzvc8pm_Image%202026-01-14%20at%2011.04.12%20AM%20%282%29.jpeg"
            },
            {
                "id": "oil-750ml",
                "name": "750ml Bottle",
                "name_fr": "Bouteille 750ml",
                "size": "750ml / 25.4 fl oz",
                "description": "Ideal for regular household cooking",
                "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/ovii6g2w_Image%202026-01-14%20at%2011.04.12%20AM%20%281%29.jpeg"
            },
            {
                "id": "oil-1l",
                "name": "1L Bottle",
                "name_fr": "Bouteille 1L",
                "size": "1L / 33.81 fl oz",
                "description": "Best value for everyday use",
                "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/jbnqgx2x_Image%202026-01-14%20at%2011.04.09%20AM%20%281%29.jpeg"
            },
            {
                "id": "oil-5l",
                "name": "5L Tin",
                "name_fr": "Bidon 5L",
                "size": "5L / 169.07 fl oz",
                "description": "Professional size for restaurants & bulk buyers",
                "image": "https://customer-assets.emergentagent.com/job_8a2d9a0f-5241-493d-9731-b77954b88672/artifacts/s0xiozcb_Image%202026-01-14%20at%2011.04.08%20AM%20%281%29.jpeg"
            }
        ]
    }

@api_router.get("/products/kitchenware")
async def get_kitchenware_products():
    """Get all olive wood kitchenware products"""
    return {
        "category": "Olive Wood Kitchenware",
        "category_fr": "Ustensiles en Bois d'Olivier",
        "products": [
            {
                "id": "classic-cup",
                "name": "Classic Wine Cup",
                "name_fr": "Coupe Classique",
                "reference": "T13",
                "description": "Elegant wine goblet handcrafted from premium olive wood",
                "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/6xmzcof6_Classic%20Wine%20Cup%20REF%20T13.jpg"
            },
            {
                "id": "cutting-board",
                "name": "Irregular Cutting Board",
                "name_fr": "Planche à Découper Irrégulière",
                "reference": "P02",
                "dimensions": "25/30/35/40/45 CM",
                "description": "Natural edge cutting board with unique wood grain patterns",
                "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/3w9avqvz_Cutting%20Board%20REF%20P02.jpg"
            },
            {
                "id": "flat-mortar",
                "name": "Flat Mortar",
                "name_fr": "Mortier Plat",
                "reference": "M03",
                "dimensions": "6/8/10/12/14/16/18 CM",
                "description": "Traditional mortar & pestle for grinding spices and herbs",
                "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/hg47jtoq_Flat%20Mortard.jpg"
            },
            {
                "id": "heart-dish",
                "name": "Heart Dish",
                "name_fr": "Plat Cœur",
                "reference": "B08",
                "description": "Beautiful heart-shaped serving dish for special occasions",
                "image": "https://customer-assets.emergentagent.com/job_oilwood-fusion/artifacts/h1ifnun3_Heart%20Dish%20REF%20B08.jpg"
            }
        ]
    }


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
