import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const nutrientIds: Record<string, number> = { calories:1008, protein:1003, carbs:1005, fat:1004, fibre:1079, sugar:2000 };
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers:cors });
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string" || query.length > 120) throw new Error("Enter a valid food search.");
    const key = Deno.env.get("USDA_API_KEY");
    if (!key) throw new Error("USDA_API_KEY secret is not configured.");
    const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key="+encodeURIComponent(key), {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({query, pageSize:12, dataType:["Foundation","SR Legacy","Survey (FNDDS)"]})
    });
    if (!response.ok) throw new Error("Nutrition database is temporarily unavailable.");
    const payload = await response.json();
    const foods = (payload.foods ?? []).map((f:any) => {
      const values:Record<string,number|null> = {};
      for (const [name,id] of Object.entries(nutrientIds)) {
        const item = (f.foodNutrients ?? []).find((n:any) => n.nutrientId === id);
        values[name] = item?.value == null ? null : Number(item.value);
      }
      return {
        id:String(f.fdcId), name:f.description, category:f.foodCategory,
        dataType:f.dataType, source:"USDA FoodData Central",
        nutrients:{calories:values.calories,protein:values.protein,carbs:values.carbs, fat:values.fat, fibre:values.fibre, sugar:values.sugar}
      };
    });
    return new Response(JSON.stringify({foods}), {headers:{...cors,"Content-Type":"application/json"}});
  } catch (e) {
    return new Response(JSON.stringify({error:e.message}), {status:400,headers:{...cors,"Content-Type":"application/json"}});
  }
});
