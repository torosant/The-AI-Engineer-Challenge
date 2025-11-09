# Vercel serverless function for /api/health endpoint
# This file automatically becomes available at /api/health on Vercel
from mangum import Mangum
from app import app

# Wrap FastAPI app with Mangum
# Configure with api_gateway_base_path to handle /api prefix correctly
handler = Mangum(app, lifespan="off", api_gateway_base_path="/api")

