# Vercel serverless function for /api/chat endpoint
# This file automatically becomes available at /api/chat on Vercel
from mangum import Mangum
from app import app

# Wrap FastAPI app with Mangum
# Configure with api_gateway_base_path to handle /api prefix correctly
# When request comes to /api/chat, Mangum will route to /chat in FastAPI
handler = Mangum(app, lifespan="off", api_gateway_base_path="/api")

