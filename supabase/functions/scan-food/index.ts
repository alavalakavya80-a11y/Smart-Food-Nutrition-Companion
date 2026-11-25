import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
const cors = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type" };
serve(async (req) => {
  if (req.method==="OPTIONS") return new Response("ok",{headers:cors});
  try {
    const {imageBase64,mimeType}=await req.json();
    if (!imageBase64 || !["image/jpeg","image/png","image/webp"].includes(mimeType)) throw new Error("Upload a JPG, PNG or WEBP image.");
    if (imageBase64.length > 8_000_000) throw new Error("Image is too large. Please choose a smaller image.");
    const apiKey=Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) throw new Error("GEMINI_API_KEY secret is not configured.");
    const response=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+encodeURIComponent(apiKey),{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:[{parts:[
        {text:"Identify visible food items in this image. Return ONLY JSON with keys candidates (array of up to 5 short searchable food names including likely preparation where possible) and note (one short uncertainty note). Do not estimate calories, grams, ingredients, vitamins or portion sizes from the image. If unclear, return an empty candidates array."},
        {inline_data:{mime_type:mimeType,data:imageBase64}}
      ]}],generationConfig:{responseMimeType:"application/json",temperature:0.1}})
    });
    if(!response.ok) throw new Error("Food image recognition service failed. Try again later.");
    const result=await response.json();
    const raw=result.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
    const parsed=JSON.parse(raw);
    return new Response(JSON.stringify({
      candidates:Array.isArray(parsed.candidates)?parsed.candidates.slice(0,5):[],
      note:typeof parsed.note==="string"?parsed.note:"Please confirm the food and serving."
    }),{headers:{...cors,"Content-Type":"application/json"}});
  } catch(e) {
    return new Response(JSON.stringify({error:e.message}),{status:400,headers:{...cors,"Content-Type":"application/json"}});
  }
});
