# Vercel serverless function entry point for FastAPI app
# This catch-all handler routes all /api/* requests to FastAPI
from mangum import Mangum
from app import app

# Wrap FastAPI app with Mangum for AWS Lambda/Vercel compatibility
handler = Mangum(app, lifespan="off")

