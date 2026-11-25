import { supabase } from "./supabase";
import type { Food } from "./nutrition";

export async function searchFoods(query: string): Promise<Food[]> {
  if (!supabase) throw new Error("Connect Supabase first. See SETUP.md.");
  const { data, error } = await supabase.functions.invoke("nutrition-search", { body: { query } });
  if (error) throw error;
  return (data?.foods ?? []) as Food[];
}
export async function scanFood(file: File): Promise<{ candidates: string[]; note: string }> {
  if (!supabase) throw new Error("Connect Supabase first. See SETUP.md.");
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const { data, error } = await supabase.functions.invoke("scan-food", {
    body: { imageBase64: base64, mimeType: file.type }
  });
  if (error) throw error;
  return data as { candidates: string[]; note: string };
}
export async function saveFoodLog(food: Food, grams: number, meal: string, date: string, nutrients: Food["nutrients"]) {
  if (!supabase) throw new Error("Connect Supabase first. See SETUP.md.");
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Please sign in before saving your diary.");
  const { error } = await supabase.from("meal_entries").insert({
    user_id: auth.user.id, food_name: food.name, quantity_grams: grams, meal_type: meal,
    consumed_on: date, calories: nutrients.calories, protein_g: nutrients.protein,
    carbs_g: nutrients.carbs, fat_g: nutrients.fat, fibre_g: nutrients.fibre,
    sugar_g: nutrients.sugar, source: food.source, food_fdc_id: food.id
  });
  if (error) throw error;
}
export async function loadTodayLogs(date: string) {
  if (!supabase) throw new Error("Connect Supabase first. See SETUP.md.");
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return [];
  const { data, error } = await supabase.from("meal_entries").select("*").eq("consumed_on", date).order("created_at");
  if (error) throw error;
  return data ?? [];
}
export async function deleteLog(id: string) {
  if (!supabase) throw new Error("Connect Supabase first. See SETUP.md.");
  const { error } = await supabase.from("meal_entries").delete().eq("id", id);
  if (error) throw error;
}
