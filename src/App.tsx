import InputComp from "./Components/InputComp";
import Recipe from "./Components/Recipe";
import Banner from "./Components/Banner";
import Loading from "./Components/Loading";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Dashboard from "./Components/Dashboard";

function App() {
  const [title, setTitle] = useState<string>("");
  const [data, setData] = useState<string>("");

  const [banner, setBanner] = useState<boolean>(true);
  const [apiToggle, setApiToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  interface reciEvent{
    target: {
      recipe: {
        value: string
      },
      reset: () => void
    },
    preventDefault: () => void,
  }

  const getRecipe = async (name:string) => {

    const apiKey: string = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {responseMimeType: "application/json"}
    });

    const prompt: string = `
    Write a detailed recipe for ${name}:
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
    const text: string = res.text()
    setData(text);
    setTitle(name);
    setLoading(false);
    setApiToggle(true);
  }

  const handleSubmit = async (e: reciEvent):Promise<void> => {
    e.preventDefault();
    if(e.target.recipe.value !== ""){
      try {
        setLoading(true);
    
        const apiKey: string = import.meta.env.VITE_GEMINI_API_KEY;
        const query = e.target.recipe.value
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
        });
    
        const prompt = `check if ${e.target.recipe.value} is actually a recipe name or a dish, dessert or anything that can be cooked, if yes then just say Yes, if not just say "Please Enter a valid Recipe Name", your answer should either be Yes or a "Please Enter a valid Recipe Name"`
        const result = await model.generateContent(prompt)
        const res = await result.response
        const text: string = res.text()
        const trimed = text.trim()

        if(trimed === "Yes") {
          getRecipe(query)
        }
        else {
          alert(trimed)
          setLoading(false)
        }
    
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
