import InputComp from "./Components/InputComp";
import Recipe from "./Components/Recipe";
import Banner from "./Components/Banner";
import Loading from "./Components/Loading";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Dashboard from "./Components/Dashboard";

function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");

  const [banner, setBanner] = useState(true);
  const [apiToggle, setApiToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(e.target.recipe.value !== ""){
      try {
        setLoading(true);
    
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          generationConfig: {responseMimeType: "application/json"}
        });
    
        const prompt = `
        Write a detailed recipe for ${e.target.recipe.value}:
        {
          type: "object,
          properties: {
            ingredients: {
              type: "array",
              items: {
                type: "string"
              }
            },
            method: {
              type: "string",
              description: "Recipe instructions in detailed paragraphs. The format should be without any special characters."
            }
          },
          required: ["ingredients", "method"]
        }
        `
        const result = await model.generateContent(prompt)
        const res = await result.response
        const text = res.text()
        setData(text);
        setTitle(e.target.recipe.value);
        setLoading(false);
        setApiToggle(true);
    
        e.target.reset()
      } catch (error) {
        setLoading(false);
        alert(error)
        e.target.reset()
      }
    }
  };
  return (
    <>
      {banner && <Banner setBanner={setBanner} />}
      <Dashboard/>
      <InputComp handleSubmit={handleSubmit} />
      {loading && (<Loading />)}
      {apiToggle && (<Recipe data={data} title={title} />)}
    </>
  );
}

export default App;
