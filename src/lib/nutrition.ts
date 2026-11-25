export type Nutrients = {
  calories: number | null; protein: number | null; carbs: number | null;
  fat: number | null; fibre: number | null; sugar: number | null;
  vitamins?: Record<string, number | null>;
};
export type Food = {
  id: string; name: string; category?: string; dataType?: string;
  servingLabel?: string; servingGrams?: number; nutrients: Nutrients; source: string;
};

export function scaleNutrients(n: Nutrients, grams: number): Nutrients {
  const factor = grams / 100;
  const scale = (v: number | null | undefined) => v == null ? null : Math.round(v * factor * 10) / 10;
  const vitamins = n.vitamins ? Object.fromEntries(Object.entries(n.vitamins).map(([k,v]) => [k, scale(v)])) : undefined;
  return {
    calories: scale(n.calories), protein: scale(n.protein), carbs: scale(n.carbs),
    fat: scale(n.fat), fibre: scale(n.fibre), sugar: scale(n.sugar), vitamins
  };
}
export function gramsForUnit(quantity: number, unit: string, servingGrams = 100): number {
  const factors: Record<string, number> = {
    g: 1, kg: 1000, ml: 1, litre: 1000, cup: servingGrams, tbsp: servingGrams / 16,
    tsp: servingGrams / 48, piece: servingGrams, slice: servingGrams, serving: servingGrams
  };
  return quantity * (factors[unit] ?? 1);
}
export function fmt(value: number | null | undefined, unit = "") {
  return value == null ? "Unavailable" : `${value} ${unit}`.trim();
}
