from db import engine, SessionLocal, Base
from models import Recipe
from scrapper import scrape_recipe
from llm_services import extract_recipe
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


# Initialize database tables

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable frontend-backend communication

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/extract")
def extract(url: str):
    db = SessionLocal()

    try:
        # Scrape webpage
        scraped = scrape_recipe(url)

        if not scraped or len(scraped.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Could not extract recipe content from URL"
            )

        # Extract structured recipe
        recipe_data = extract_recipe(scraped)

        # Validate essential fields
        if not recipe_data.get("title"):
            raise HTTPException(
                status_code=400,
                detail="Not a valid recipe page or extraction failed"
            )

        recipe = Recipe(
            url=url,
            title=recipe_data["title"],
            cuisine=recipe_data["cuisine"],
            difficulty=recipe_data["difficulty"],
            recipe_json=recipe_data
        )

        db.add(recipe)
        db.commit()
        db.refresh(recipe)

        return recipe_data

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal error: {str(e)}"
        )


# Endpoint to get all saved recipes
@app.get("/recipes")
def get_recipes():
    db = SessionLocal()
    return db.query(Recipe).all()


# Endpoint to get a single recipe by ID
@app.get("/recipes/{recipe_id}")
def get_recipe(recipe_id: int):
    db = SessionLocal()
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()

app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")