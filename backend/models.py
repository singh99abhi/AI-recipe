from sqlalchemy import Column, Integer, String, JSON, DateTime
from datetime import datetime
from db import Base
# Recipe model for storing recipe data
class Recipe(Base):
    __tablename__ = "recipes"
    # Primary key and index for recipe ID
    id = Column(Integer, primary_key=True, index=True)
    # Recipe URL
    url = Column(String)
    # Recipe Title
    title = Column(String)
    # Recipe Cuisine
    cuisine = Column(String)
    # Recipe Difficulty
    difficulty = Column(String)
    # Recipe JSON
    recipe_json = Column(JSON)
    # Recipe Extracted At
    extracted_at = Column(DateTime, default=datetime.utcnow)