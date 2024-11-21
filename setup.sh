# Create project directory
mkdir prd-generator
cd prd-generator

# Create frontend directory and install Next.js
mkdir frontend
cd frontend
# Initialize Next.js with specific options
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm

cd ..

# Create backend directory and set up FastAPI
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pydantic python-dotenv