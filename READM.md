# AI Recipe Extractor

An AI-powered full-stack application that extracts structured recipe information from recipe blog URLs.

## Features

- Extract recipe details from recipe URLs
- Scrape recipe webpages using BeautifulSoup
- Use Gemini LLM to structure recipe data into JSON
- Store extracted recipes in PostgreSQL
- View saved recipe history
- Frontend built with React + Vite
- Backend built with FastAPI

---

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- BeautifulSoup
- Requests
- Gemini API

### Frontend
- React
- Vite
- Axios

---

## Project Structure

```bash
AI-recipe/
│
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── scraper.py
│   ├── llm_services.py
│   ├── recipe_models.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── sampledata/
│   ├── sample_urls.txt
│   ├── response.txt
│
├── prompts/
│   ├── prompts.txt
│
└── README.md
```

---

## Setup Instructions

### Clone repository

```bash
git clone <your-repo-url>
cd AI-recipe
```

---

## Backend Setup

Go to backend:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
DATABASE_URL=your_postgresql_connection_url
GEMINI_API_KEY=your_gemini_api_key
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

Swagger docs:

```bash
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Go to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Extract Recipe

```http
GET /extract?url=<recipe_url>
```

Extracts recipe information and stores it in database.

---

### Get All Recipes

```http
GET /recipes
```

Returns all saved recipes.

---

### Get Recipe by ID

```http
GET /recipes/{recipe_id}
```

Returns a specific saved recipe.

---

## Sample Files

### Sample URLs
Located in:

```bash
sample_data/sample_urls.txt
```

### Sample Response
Located in:

```bash
sample_data/sample_response.json
```

### Prompt Used
Located in:

```bash
prompts/extract_prompt.txt
```

---

## Notes

- Some websites may block scraping due to anti-bot protections.
- Use scrape-friendly recipe websites for testing.

Example:
- BBC Good Food
- Simply Recipes
- Indian Healthy Recipes

---

## Future Improvements

- Better recipe scraping using JSON-LD structured data
- Improved UI
- Recipe search/filtering
- Docker support