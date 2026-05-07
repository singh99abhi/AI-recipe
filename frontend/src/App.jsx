import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [tab, setTab] = useState("extract");
  const [error, setError] = useState("");
  // Extract recipe from backend API
  const extractRecipe = async () => {
    try {
      setError("");

      const res = await axios.get("/extract", {
        params: { url }
      });

      setRecipe(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };
  // Fetch saved recipe history
  const fetchRecipes = async () => {
    const res = await axios.get("/recipes");
    setRecipes(res.data);

  };
  // Load saved recipes when history tab is opened
  useEffect(() => {
    if (tab === "history") fetchRecipes();
  }, [tab]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          Recipe Extractor
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >
          <button onClick={() => setTab("extract")}>Extract Recipe</button>
          <button onClick={() => setTab("history")}>Saved Recipes</button>
        </div>

        {tab === "extract" && (
          <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter recipe URL"
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                }}
              />
              <button onClick={extractRecipe}>Extract</button>
            </div>

            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
            )}

            {recipe && (
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h2>{recipe.title || "Untitled Recipe"}</h2>
                <p><strong>Cuisine:</strong> {recipe.cuisine || "N/A"}</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>

                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients?.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                  ))}
                </ul>

                <h3>Instructions</h3>
                <ol>
                  {recipe.instructions?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {tab === "history" && (
          <div>
            <h2>Saved Recipes</h2>
            {recipes.length === 0 ? (
              <p>No saved recipes yet.</p>
            ) : (
              recipes.map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: "12px",
                    marginBottom: "10px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <strong>{r.title}</strong>
                  <p style={{ margin: 0 }}>{r.cuisine}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;