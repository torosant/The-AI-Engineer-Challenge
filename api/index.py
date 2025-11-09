# Vercel serverless function entry point for FastAPI app
# This handles all /api/* requests via Vercel's routing
from mangum import Mangum
from app import app

# Wrap FastAPI app with Mangum
# FastAPI routes are defined as /chat and /health
# Vercel will route /api/chat and /api/health to this function
handler = Mangum(app, lifespan="off")

