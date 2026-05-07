import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# Initialize Gemini model
model = genai.GenerativeModel("gemini-2.5-flash-lite")

def extract_recipe(scraped_text):
    prompt = f"""
    Extract recipe info from text below.

    Return ONLY JSON with:
    title, cuisine, prep_time, cook_time, total_time,
    servings, difficulty, ingredients, instructions,
    nutrition_estimate, substitutions,
    shopping_list, related_recipes.

    Text:
    {scraped_text}
    """
    # Prompt LLM to extract structured recipe JSON
    response = model.generate_content(prompt)
    # Clean up response and parse JSON
    cleaned = response.text.replace("```json", "").replace("```", "")
    # Return parsed recipe JSON
    return json.loads(cleaned)