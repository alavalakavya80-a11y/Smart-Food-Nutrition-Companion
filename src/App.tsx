import { useState,useMemo } from "react";
import "./styles.css";

const images = {
    // Sprouts
  greenGramSprouts: "/foods/Green Gram Sprouts.jpeg",
  chickpeaSprouts: "/foods/Chickpea Sprouts.jpeg",
  mixedSprouts: "/foods/Mixed Sprouts.jpeg",

  // Millets
  ragi: "/foods/Ragi.jpeg",
  ragiJava: "/foods/Ragi Java.jpeg",
  jowar: "/foods/Jowar.jpeg",
  bajra: "/foods/Bajra.jpeg",
  foxtailMillet: "/foods/Foxtail Millet.jpeg",
  littleMillet: "/foods/Little Millet.jpeg",

  // Additional healthy foods
  tofu: "/foods/Tofu.jpeg",
  buttermilk: "/foods/Buttermilk.jpeg",
  roastedChickpeas: "/foods/Roasted Chickpeas.jpeg",
  sweetPotato: "/foods/Sweet Potato.jpeg",
  cabbage: "/foods/Cabbage.jpeg",
  beans: "/foods/Beans.jpeg",
  peas: "/foods/Green Peas.jpeg",
  kiwi: "/foods/Kiwi.jpeg",
  strawberry: "/foods/Strawberry.jpeg",
  blueberry: "/foods/Blueberry.jpeg",
  vegetableSoup: "/foods/Vegetable Soup.jpeg",
  idli: "/foods/Idli.jpeg",
  dosa: "/foods/Plain Dosa.jpeg",
  masaladosa: "/foods/Masala Dosa.jpeg",
  ravadosa: "/foods/Rava Dosa.jpeg",
  uttapam: "/foods/Uttapam.jpeg",
  pesarattu: "/foods/Pesarattu.jpeg",
  upma: "/foods/Upma.jpeg",
  pongal: "/foods/Pongal.jpeg",
  poha: "/foods/Poha.jpeg",
  vegetableBiriyani: "/foods/Vegetable Biriyani.jpeg",
  ChickenBiriyani: "/foods/Chicken Biriyani.jpeg",
  MuttonBiriyani: "/foods/Mutton Biriyani.jpeg",
  curdrice: "/foods/Curd Rice.jpeg",
  lemonrice: "/foods/Lemon Rice.jpeg",
  tomatorice: "/foods/Tomato Rice.jpeg",
  sambar: "/foods/Sambar.jpeg",
  rasam: "/foods/Rasam.jpeg",
  chapathi: "/foods/Chapathi.jpeg",
  roti: "/foods/Roti.jpeg",
  parotha: "/foods/Parotha.jpeg",
  alooparotha: "/foods/Aloo Parotha.jpeg",
  palakpanner: "/foods/Palak Paneer.jpeg",
  paneerbuttermasala: "/foods/Paneer Butter Masala.jpeg",
  rajma: "/foods/Rajma.jpeg",
  pavbhaji: "/foods/Pav Bhaji.jpeg",
  daltadka: "/foods/Dal Tadka.jpeg",
  Chole: "/foods/Chole.jpeg",
  vegetablepulao: "/foods/Vegetable Pulao.jpeg",
  appam: "/foods/Appam.jpeg",
  meduvada: "/foods/Medu Vada.jpeg",
  apple: "/foods/Apple.jpeg",
  Banana: "/foods/Banana.jpeg",
  mango: "/foods/Mango.jpeg",
  papaya: "/foods/Papaya.jpeg",
  pineapple: "/foods/Pineapple.jpeg",
  watermelon: "/foods/Watermelon.jpeg",
  orange: "/foods/Orange.jpeg",
  guava: "/foods/Guava.jpeg",
  pomegranate:"/foods/Pomegranate.jpeg",
  grapes: "/foods/Grapes.jpeg",
  spinach: "/foods/Spinach.jpeg",
  tomato: "/foods/Tomato.jpeg",
  cucumber: "/foods/Cucumber.jpeg",
  cauliflower: "/foods/Cauliflower.jpeg",
  betroot: "/foods/Beetroot.jpeg",
  carrot: "/foods/Carrot.jpeg",
  Broccoli: "/foods/Broccoli.jpeg",
  Ladyfinger: "/foods/Lady Finger.jpeg",
  almonds: "/foods/Almonds.jpeg",
  cashews: "/foods/Cashews.jpeg",
  walnuts: "/foods/Walnuts.jpeg",
  pistachios: "/foods/Pistachios.jpeg",
  peanuts: "/foods/Peanuts.jpeg",
  hazelnuts: "/foods/Hazelnuts.jpeg",
  chiaseeds: "/foods/Chia Seeds.jpeg",
  flaxseeds: "/foods/Flax Seeds.jpeg",
  pumpkinseeds: "/foods/Pumpkin Seeds.jpeg",
  Sunflowerseeds: "/foods/Sunflower Seeds.jpeg",
  sesameseeds: "/foods/Sesame Seeds.jpeg",
  milk: "/foods/Milk.jpeg",
  curd: "/foods/Curd.jpeg",
  paneer: "/foods/Paneer.jpeg",
  greekyogurt: "/foods/Greek Yogurt.jpeg",
  boiledegg: "/foods/Boiled Egg.jpeg",
  chickenbreast: "/foods/Chicken Breast.jpeg",
  salmon: "/foods/Salmon.jpeg",
  oats: "/foods/Oats.jpeg",
  brownrice: "/foods/Brown Rice.jpeg",
  whiterice: "/foods/White Rice.jpeg",
  quinoa: "/foods/Quinoa.jpeg",
  wholewheatbread: "/foods/Whole Wheat Bread.jpeg",
  // Update the rest to match the exact filenames in your public/foods folder!
};


type FoodBase = {
  name: string;
  category: string;
  cuisine: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  vitamins?: string;
  minerals?: string;
};

type Food = FoodBase & {
  id: string;
  serving: string;
  multiplier: number;
  image: string;
};

const getFoodImage = (name: string): string => {
  const imageMap: Record<string, string> = {
        "Green Gram Sprouts": images.greenGramSprouts,
    "Chickpea Sprouts": images.chickpeaSprouts,
    "Mixed Sprouts": images.mixedSprouts,
    "Ragi": images.ragi,
    "Ragi Java": images.ragiJava,
    "Jowar": images.jowar,
    "Bajra": images.bajra,
    "Foxtail Millet": images.foxtailMillet,
    "Little Millet": images.littleMillet,
    "Tofu": images.tofu,
    "Buttermilk": images.buttermilk,
    "Roasted Chickpeas": images.roastedChickpeas,
    "Sweet Potato": images.sweetPotato,
    "Cabbage": images.cabbage,
    "Beans": images.beans,
    "Green Peas": images.peas,
    "Kiwi": images.kiwi,
    "Strawberry": images.strawberry,
    "Blueberry": images.blueberry,
    "Vegetable Soup": images.vegetableSoup,
    "Idli": images.idli,
    "Plain Dosa": images.dosa,
    "Masala Dosa": images.masaladosa,
    "Rava Dosa":images.ravadosa,
    "Uttapam": images.uttapam,
    "Pesarattu": images.pesarattu,
    "Upma": images.upma,
    "Pongal": images.pongal,
    "Poha": images.poha,
    "Vegetable Biryani": images.vegetableBiriyani,
    "Chicken Biryani": images.ChickenBiriyani,
    "Mutton Biryani": images.MuttonBiriyani,
    "Curd Rice": images.curdrice,
    "Lemon Rice": images.lemonrice,
    "Tomato Rice": images.tomatorice,
    "Sambar": images.sambar,
    "Rasam": images.rasam,
    "Chapati": images.chapathi,
    "Roti": images.roti,
    "Parotha": images.parotha,
    "Aloo Parotha": images.alooparotha,
    "Palak Paneer": images.palakpanner,
    "Paneer Butter Masala": images.paneerbuttermasala,
    "Dal Tadka": images.daltadka,
    "Chole": images.Chole,
    "Rajma":images.rajma,
    "Pav Bhaji":images.pavbhaji,
    "Vegetable Pulao": images.vegetablepulao,
    "Appam": images.appam,
    "Medu Vada": images.meduvada,
    "Apple": images.apple,
    "Banana": images.Banana,
    "Mango": images.mango,
    "Papaya": images.papaya,
    "Watermelon": images.watermelon,
    "Orange": images.orange,
    "Guava": images.guava,
    "Pomegranate": images.pomegranate,
    "Pineapple":images.pineapple,
    "Grapes": images.grapes,
    "Spinach": images.spinach,
    "Tomato": images.tomato,
    "Cucumber": images.cucumber,
    "Cauliflower": images.cauliflower,
    "Beetroot": images.betroot,
    "Carrot": images.carrot,
    "Broccoli": images.Broccoli,
    "Lady Finger": images.Ladyfinger,
    "Almonds": images.almonds,
    "Cashews": images.cashews,
    "Walnuts": images.walnuts,
    "Pistachios": images.pistachios,
    "Peanuts": images.peanuts,
    "Hazelnuts": images.hazelnuts,
    "Chia Seeds": images.chiaseeds,
    "Flax Seeds": images.flaxseeds,
    "Pumpkin Seeds": images.pumpkinseeds,
    "Sunflower Seeds": images.Sunflowerseeds,
    "Sesame Seeds": images.sesameseeds,
    "Milk": images.milk,
    "Curd": images.curd,
    "Paneer": images.paneer,
    "Greek Yogurt": images.greekyogurt,
    "Boiled Egg": images.boiledegg,
    "Chicken Breast": images.chickenbreast,
    "Salmon": images.salmon,
    "Oats": images.oats,
    "Brown Rice": images.brownrice,
    "White Rice": images.whiterice,
    "Quinoa": images.quinoa,
    "Whole Wheat Bread": images.wholewheatbread,
  };

  return imageMap[name] || `https://placehold.co/500x350?text=${encodeURIComponent(name)}`;
};



const baseFoods: FoodBase[] = [
  // INDIAN MEALS - approximate values per 100 g prepared food
  { name: "Idli", category: "Indian", cuisine: "South Indian", calories: 146, protein: 4.5, carbs: 29.5, fat: 0.7 },
  { name: "Plain Dosa", category: "Indian", cuisine: "South Indian", calories: 168, protein: 4, carbs: 28, fat: 4 },
  { name: "Masala Dosa", category: "Indian", cuisine: "South Indian", calories: 190, protein: 4, carbs: 27, fat: 7 },
  { name: "Rava Dosa", category: "Indian", cuisine: "South Indian", calories: 180, protein: 4, carbs: 28, fat: 6 },
  { name: "Uttapam", category: "Indian", cuisine: "South Indian", calories: 180, protein: 5, carbs: 30, fat: 4 },
  { name: "Pesarattu", category: "Indian", cuisine: "Andhra", calories: 160, protein: 8, carbs: 24, fat: 3 },
  { name: "Upma", category: "Indian", cuisine: "South Indian", calories: 150, protein: 4, carbs: 25, fat: 4 },
  { name: "Pongal", category: "Indian", cuisine: "South Indian", calories: 150, protein: 4, carbs: 23, fat: 5 },
  { name: "Poha", category: "Indian", cuisine: "Maharashtrian", calories: 130, protein: 2.5, carbs: 25, fat: 3 },
  { name: "Vegetable Biryani", category: "Indian", cuisine: "Indian", calories: 160, protein: 3.5, carbs: 27, fat: 4 },
  { name: "Chicken Biryani", category: "Indian", cuisine: "Indian", calories: 190, protein: 10, carbs: 23, fat: 7 },
  { name: "Mutton Biryani", category: "Indian", cuisine: "Indian", calories: 220, protein: 11, carbs: 24, fat: 9 },
  { name: "Curd Rice", category: "Indian", cuisine: "South Indian", calories: 130, protein: 3.5, carbs: 22, fat: 3 },
  { name: "Lemon Rice", category: "Indian", cuisine: "South Indian", calories: 170, protein: 3, carbs: 28, fat: 5 },
  { name: "Tomato Rice", category: "Indian", cuisine: "South Indian", calories: 150, protein: 3, carbs: 26, fat: 4 },
  { name: "Sambar", category: "Indian", cuisine: "South Indian", calories: 75, protein: 4, carbs: 12, fat: 2 },
  { name: "Rasam", category: "Indian", cuisine: "South Indian", calories: 35, protein: 1, carbs: 6, fat: 1 },
  { name: "Chapati", category: "Indian", cuisine: "North Indian", calories: 120, protein: 4, carbs: 22, fat: 2 },
  { name: "Roti", category: "Indian", cuisine: "North Indian", calories: 110, protein: 3.5, carbs: 20, fat: 2 },
  { name: "Parotha", category: "Indian", cuisine: "North Indian", calories: 260, protein: 5, carbs: 35, fat: 11 },
  { name: "Aloo Parotha", category: "Indian", cuisine: "North Indian", calories: 230, protein: 5, carbs: 32, fat: 9 },
  { name: "Palak Paneer", category: "Indian", cuisine: "North Indian", calories: 160, protein: 8, carbs: 9, fat: 10 },
  { name: "Paneer Butter Masala", category: "Indian", cuisine: "North Indian", calories: 240, protein: 10, carbs: 12, fat: 17 },
  { name: "Dal Tadka", category: "Indian", cuisine: "North Indian", calories: 130, protein: 7, carbs: 18, fat: 4 },
  { name: "Chole", category: "Indian", cuisine: "Punjabi", calories: 165, protein: 8, carbs: 25, fat: 4 },
  { name: "Rajma", category: "Indian", cuisine: "North Indian", calories: 140, protein: 8, carbs: 22, fat: 3 },
  { name: "Pav Bhaji", category: "Indian", cuisine: "Mumbai", calories: 180, protein: 4, carbs: 27, fat: 7 },
  { name: "Vegetable Pulao", category: "Indian", cuisine: "Indian", calories: 150, protein: 3, carbs: 27, fat: 3 },
  { name: "Appam", category: "Indian", cuisine: "Kerala", calories: 120, protein: 2, carbs: 25, fat: 1 },
  { name: "Medu Vada", category: "Indian", cuisine: "South Indian", calories: 280, protein: 8, carbs: 30, fat: 15 },
  {
    name: "Vegetable Soup",
    category: "Indian",
    cuisine: "International",
    calories: 35,
    protein: 1.5,
    carbs: 6,
    fat: 0.7
  },
   {
    name: "Tofu",
    category: "Protein",
    cuisine: "International",
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fat: 4.8
  },
  // FRUITS - raw edible portion per 100 g
  { name: "Apple", category: "Fruits", cuisine: "International", calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
  { name: "Banana", category: "Fruits", cuisine: "International", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  { name: "Mango", category: "Fruits", cuisine: "Indian", calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { name: "Papaya", category: "Fruits", cuisine: "Indian", calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3 },
  { name: "Watermelon", category: "Fruits", cuisine: "International", calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2 },
  { name: "Orange", category: "Fruits", cuisine: "International", calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1 },
  { name: "Guava", category: "Fruits", cuisine: "Indian", calories: 68, protein: 2.6, carbs: 14.3, fat: 1 },
  { name: "Pomegranate", category: "Fruits", cuisine: "Indian", calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2 },
  { name: "Pineapple", category: "Fruits", cuisine: "International", calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1 },
  { name: "Grapes", category: "Fruits", cuisine: "International", calories: 69, protein: 0.7, carbs: 18.1, fat: 0.2 },
  {
    name: "Kiwi",
    category: "Fruits",
    cuisine: "International",
    calories: 61,
    protein: 1.1,
    carbs: 14.7,
    fat: 0.5
  },
  
   {
    name: "Strawberry",
    category: "Fruits",
    cuisine: "International",
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3
  },
  {
    name: "Blueberry",
    category: "Fruits",
    cuisine: "International",
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3
  },
  // VEGETABLES - raw edible portion per 100 g
  { name: "Spinach", category: "Vegetables", cuisine: "International", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: "Tomato", category: "Vegetables", cuisine: "International", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { name: "Cucumber", category: "Vegetables", cuisine: "International", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
  { name: "Cauliflower", category: "Vegetables", cuisine: "International", calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
  { name: "Beetroot", category: "Vegetables", cuisine: "Indian", calories: 43, protein: 1.6, carbs: 9.6, fat: 0.2 },
  { name: "Carrot", category: "Vegetables", cuisine: "International", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
  { name: "Broccoli", category: "Vegetables", cuisine: "International", calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
  { name: "Lady Finger", category: "Vegetables", cuisine: "Indian", calories: 33, protein: 1.9, carbs: 7.5, fat: 0.2 },
   {
    name: "Sweet Potato",
    category: "Vegetables",
    cuisine: "Indian",
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1
  },
  {
    name: "Cabbage",
    category: "Vegetables",
    cuisine: "International",
    calories: 25,
    protein: 1.3,
    carbs: 5.8,
    fat: 0.1
  },
  {
    name: "Beans",
    category: "Vegetables",
    cuisine: "Indian",
    calories: 31,
    protein: 1.8,
    carbs: 7,
    fat: 0.1
  },
  {
    name: "Green Peas",
    category: "Vegetables",
    cuisine: "Indian",
    calories: 81,
    protein: 5.4,
    carbs: 14.5,
    fat: 0.4
  },
  // NUTS - dry, per 100 g
  { name: "Almonds", category: "Nuts", cuisine: "International", calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9 },
  { name: "Cashews", category: "Nuts", cuisine: "Indian", calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9 },
  { name: "Walnuts", category: "Nuts", cuisine: "International", calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2 },
  { name: "Pistachios", category: "Nuts", cuisine: "International", calories: 562, protein: 20.2, carbs: 27.5, fat: 45.3 },
  { name: "Peanuts", category: "Nuts", cuisine: "Indian", calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2 },
  { name: "Hazelnuts", category: "Nuts", cuisine: "International", calories: 628, protein: 15, carbs: 16.7, fat: 60.8 },

  // SEEDS - dry, per 100 g
  { name: "Chia Seeds", category: "Seeds", cuisine: "International", calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7 },
  { name: "Flax Seeds", category: "Seeds", cuisine: "International", calories: 534, protein: 18.3, carbs: 28.9, fat: 42.2 },
  { name: "Pumpkin Seeds", category: "Seeds", cuisine: "International", calories: 559, protein: 30.2, carbs: 10.7, fat: 49.1 },
  { name: "Sunflower Seeds", category: "Seeds", cuisine: "International", calories: 584, protein: 20.8, carbs: 20, fat: 51.5 },
  { name: "Sesame Seeds", category: "Seeds", cuisine: "Indian", calories: 573, protein: 17.7, carbs: 23.4, fat: 49.7 },

  // DAIRY - per 100 g
  { name: "Milk", category: "Dairy", cuisine: "International", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
  { name: "Curd", category: "Dairy", cuisine: "Indian", calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { name: "Paneer", category: "Dairy", cuisine: "Indian", calories: 305, protein: 18.9, carbs: 2.4, fat: 24.8 },
  { name: "Greek Yogurt", category: "Dairy", cuisine: "International", calories: 97, protein: 9, carbs: 4, fat: 5 },
    
  {
    name: "Buttermilk",
    category: "Dairy",
    cuisine: "Indian",
    calories: 40,
    protein: 3,
    carbs: 4,
    fat: 1
  },
  // PROTEIN FOODS - per 100 g
  { name: "Boiled Egg", category: "Snacks", cuisine: "International", calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6 },
  { name: "Chicken Breast", category: "Snacks", cuisine: "International", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Salmon", category: "International", cuisine: "International", calories: 208, protein: 20.4, carbs: 0, fat: 13.4 },
  {
    name: "Roasted Chickpeas",
    category: "Snacks",
    cuisine: "Indian",
    calories: 164,
    protein: 8.9,
    carbs: 27,
    fat: 2.6
  },
  // GRAINS - serving basis specified in names/comments
  { name: "Oats", category: "International", cuisine: "International", calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  { name: "Brown Rice", category: "International", cuisine: "International", calories: 123, protein: 2.7, carbs: 25.6, fat: 1 },
  { name: "White Rice", category: "Indian", cuisine: "Indian", calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3 },
  { name: "Quinoa", category: "International", cuisine: "International", calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
  { name: "Whole Wheat Bread", category: "International", cuisine: "International", calories: 247, protein: 13, carbs: 41, fat: 4.2 },
    // SPROUTS - approximate values per 100 g
  {
    name: "Green Gram Sprouts",
    category: "Sprouts",
    cuisine: "Indian",
    calories: 30,
    protein: 3,
    carbs: 6,
    fat: 0.2
  },
  {
    name: "Chickpea Sprouts",
    category: "Sprouts",
    cuisine: "Indian",
    calories: 120,
    protein: 7.5,
    carbs: 20,
    fat: 2
  },
  {
    name: "Mixed Sprouts",
    category: "Sprouts",
    cuisine: "Indian",
    calories: 45,
    protein: 4,
    carbs: 8,
    fat: 0.5
  },

  // MILLETS - cooked values per 100 g
  {
    name: "Ragi",
    category: "Millets",
    cuisine: "Indian",
    calories: 119,
    protein: 3.5,
    carbs: 25,
    fat: 1.3
  },
  {
    name: "Ragi Java",
    category: "Millets",
    cuisine: "South Indian",
    calories: 65,
    protein: 2,
    carbs: 13,
    fat: 0.7
  },
  {
    name: "Jowar",
    category: "Millets",
    cuisine: "Indian",
    calories: 120,
    protein: 3.5,
    carbs: 25,
    fat: 1.2
  },
  {
    name: "Bajra",
    category: "Millets",
    cuisine: "Indian",
    calories: 119,
    protein: 3.5,
    carbs: 23,
    fat: 1.3
  },
  {
    name: "Foxtail Millet",
    category: "Millets",
    cuisine: "Indian",
    calories: 120,
    protein: 3.5,
    carbs: 25,
    fat: 1
  },
  {
    name: "Little Millet",
    category: "Millets",
    cuisine: "Indian",
    calories: 119,
    protein: 3.5,
    carbs: 25,
    fat: 1
  },
];



 
const foodLibrary: Food[] = baseFoods.map((food, index) => ({
  ...food,
  id: String(index),
  serving: "100 g",
  multiplier: 1,
  image: getFoodImage(food.name),
}));
const categories = [
  "All",
  "Indian",
  "Fruits",
  "Vegetables",
  "Nuts",
  "Seeds",
  "Sprouts",
  "Millets",
  "Dairy",
  "Protein",
  "Snacks",
  "International",
];


const dietPlans = [
  {
    title: "Day 1 – Healthy Start",
    image: "/foods/Day1.png",
    meals: [
      "Breakfast: Ragi Dosa and Sambar",
      "Mid-morning: Apple and Almonds",
      "Lunch: Brown Rice, Dal and Spinach Curry",
      "Evening Snack: Green Gram Sprouts Salad",
      "Dinner: Chapati and Paneer Curry",
    ],
  },
  {
    title: "Day 2 – Protein Power",
    image: "/foods/Day2.png",
    meals: [
      "Breakfast: Sprouts Salad and Boiled Egg",
      "Mid-morning: Papaya",
      "Lunch: Jowar Roti and Chole",
      "Evening Snack: Greek Yogurt and Walnuts",
      "Dinner: Vegetable Khichdi and Curd",
    ],
  },
  {
    title: "Day 3 – Fibre Rich",
        image: "/foods/Day3.png",
    meals: [
      "Breakfast: Vegetable Oats Upma",
      "Mid-morning: Guava and Pumpkin Seeds",
      "Lunch: Rice, Rajma and Cucumber Salad",
      "Evening Snack: Roasted Peanuts",
      "Dinner: Chapati and Palak Paneer",
    ],
  },
  {
    title: "Day 4 – South Indian Special",
        image: "/foods/Day4.jpeg",
    meals: [
      "Breakfast: Idli and Sambar",
      "Mid-morning: Orange and Cashews",
      "Lunch: Vegetable Pulao and Raita",
      "Evening Snack: Mixed Sprouts Chaat",
      "Dinner: Dosa and Vegetable Curry",
    ],
  },
  {
    title: "Day 5 – Millet Nutrition",
       image: "/foods/Day5.jpeg",
    meals: [
      "Breakfast: Ragi Java and Boiled Egg",
      "Mid-morning: Banana and Chia Seeds",
      "Lunch: Jowar Roti, Dal Tadka and Vegetables",
      "Evening Snack: Almonds and Buttermilk",
      "Dinner: Brown Rice and Vegetable Sambar",
    ],
  },
  {
    title: "Day 6 – Balanced Protein",
        image: "/foods/Day6.jpeg",
    meals: [
      "Breakfast: Pesarattu and Chutney",
      "Mid-morning: Pomegranate",
      "Lunch: Vegetable or Chicken Biryani and Raita",
      "Evening Snack: Roasted Chickpeas",
      "Dinner: Chapati, Mixed Vegetable Curry and Dal",
    ],
  },
  {
    title: "Day 7 – Complete Nutrition",
        image: "/foods/Day7.jpeg",
    meals: [
      "Breakfast: Whole Wheat Toast and Paneer",
      "Mid-morning: Watermelon and Pistachios",
      "Lunch: Quinoa, Mixed Vegetables and Dal",
      "Evening Snack: Greek Yogurt and Flax Seeds",
      "Dinner: Vegetable Soup, Chapati and Tofu",
    ],
  },
];


function App() {
  type PageName =
  | "Food Library"
  | "Add to Daily Tracker"
  | "Diet Plans"
  | "Daily Tracker";

const [activePage, setActivePage] = useState<PageName>("Food Library");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState(100);
  const [tracker, setTracker] = useState<Food[]>([]);
  const [scannerFood, setScannerFood] = useState<Food | null>(null);

  const filteredFoods = useMemo(() => {
    return foodLibrary.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(search.toLowerCase()) ||
        food.cuisine.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All" ||
        food.category === category ||
        (category === "Indian" && food.cuisine !== "International");
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totals = tracker.reduce<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>(
    (sum, food) => ({
      calories: sum.calories + food.calories,
      protein: sum.protein + food.protein,
      carbs: sum.carbs + food.carbs,
      fat: sum.fat + food.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

 const addFood = (food: Food) => {
  const amount = quantity / 100;

  const item = {
    ...food,
    id: String(food.id) + "-" + String(Date.now()),
    calories: Math.round(food.calories * amount),
    protein: Number((food.protein * amount).toFixed(1)),
    carbs: Number((food.carbs * amount).toFixed(1)),
    fat: Number((food.fat * amount).toFixed(1)),
    serving: String(quantity) + " g",
  };

  setTracker((previous) => [...previous, item]);
};
const menu: {
  name: PageName;
  icon: string;
  color: string;
}[] = [
  { name: "Food Library", icon: "🍎", color: "mint" },
  { name: "Add to Daily Tracker", icon: "➕", color: "pink" },
  { name: "Diet Plans", icon: "🥗", color: "peach" },
  { name: "Daily Tracker", icon: "📊", color: "lavender" },
];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🥑</div>
          <div>
            <h2>Smart Food</h2>
            <span>Nutrition Companion</span>
          </div>
        </div>

        <p className="menu-heading">MAIN MENU</p>

        <nav>
          {menu.map((item) => (
            <button
              key={item.name}
              className={`menu-button ${item.color} ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
              <span className="menu-arrow">›</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span>💧</span>
            <h3>Little reminder</h3>
            <p>Remember to drink water throughout your day!</p>
          </div>
          <p className="sidebar-footer">Made with care 💚</p>
        </div>
      </aside>


<main className="main">
  <header className="topbar">
    <div>
      <p className="eyebrow">YOUR HEALTHY LIFESTYLE</p>
      <h1>{activePage}</h1>
      <p className="subheading">
        Discover, track and enjoy your food journey.
      </p>
    </div>
    <div className="profile">🌸</div>
  </header>
    
    {activePage === "Food Library" && (
  <>
    <section className="hero">
      <div className="hero-text">
        <span className="hero-label">✨ EAT WELL, FEEL WELL</span>
        <h2>Every bite tells a story.</h2>
        <p>
          Explore Indian favourites, fresh fruits, wholesome nuts and
          foods from around the world.
        </p>
        <button
          className="hero-button"
          onClick={() =>
            document.getElementById("food-search")?.focus()
          }
        >
          Explore foods →
        </button>
      </div>
          <img
  src="foods/main-image.jpeg"
  alt="Fresh colourful fruit bowl"
/>
      
    </section>

    <section className="section-heading">
      <div>
        <h2>Explore Food Library</h2>
        <p>Find nutrition details for your favourite foods.</p>
      </div>
      <span className="count-badge">
        {foodLibrary.length} entries
      </span>
    </section>

    <input
      id="food-search"
      className="search-box"
      placeholder="🔍 Search idli, almonds, mango, rice..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />

    <div className="categories">
      {categories.map((item) => (
        <button
          key={item}
          className={category === item ? "category active" : "category"}
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>

    <p className="result-count">
      Showing {filteredFoods.length} food entries
    </p>

    <div className="food-grid">
      {filteredFoods.map((food) => (
        <button
          key={food.id}
          className={`food-card ${
            selectedFood?.id === food.id ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedFood(food);
            setQuantity(100);
          }}
        >
          <img
            src={food.image}
            alt={food.name}
            className="food-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/500x350?text=${encodeURIComponent(food.name)}`;
            }}
          />

          <div className="food-card-content">
            <span className="food-category">
              {food.category}
            </span>

            <h3>{food.name}</h3>
            <p>{food.serving}</p>

            <strong>
              {Math.round(food.calories * food.multiplier)} kcal
            </strong>
          </div>
        </button>
      ))}
    </div>

    {filteredFoods.length === 0 && (
      <div className="empty-state">
        <span>🔎</span>
        <h3>No foods found</h3>
        <p>Try searching with another food name.</p>
      </div>
    )}

    {selectedFood && (
      <section className="nutrition-panel">
        <div className="nutrition-title">
          <div>
            <span className="hero-label">FOOD NUTRITION</span>
            <h2>{selectedFood.name}</h2>
            <p>Estimated nutrition per 100 grams</p>
          </div>

          <img
            src={selectedFood.image}
            alt={selectedFood.name}
            className="food-image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/500x350?text=${encodeURIComponent(selectedFood.name)}`;
            }}
          />
        </div>

        <div className="macro-grid">
          <div className="macro calorie">
            <span>🔥</span>
            <strong>{selectedFood.calories}</strong>
            <small>Calories (kcal)</small>
          </div>

          <div className="macro protein">
            <span>💪</span>
            <strong>{selectedFood.protein} g</strong>
            <small>Protein</small>
          </div>

          <div className="macro carbs">
            <span>🌾</span>
            <strong>{selectedFood.carbs} g</strong>
            <small>Carbohydrates</small>
          </div>

          <div className="macro fat">
            <span>🥑</span>
            <strong>{selectedFood.fat} g</strong>
            <small>Fat</small>
          </div>
        </div>
      </section>
    )}
  </>
)}


  {activePage === "Add to Daily Tracker" && (
  <section className="nutrition-panel">
    <div className="section-heading">
      <div>
        <h2>➕ Add Food to Daily Tracker</h2>
        <p>Select your food, enter the quantity, and add its nutrition details.</p>
      </div>
    </div>

    <div className="tracker-add-form">
      <label>Select Food</label>

      <select
        value={scannerFood?.name || ""}
        onChange={(event) => {
          const food = foodLibrary.find(
            (item) => item.name === event.target.value
          );

          setScannerFood(food || null);
          setQuantity(100);
        }}
      >
        <option value="">Choose a food</option>

        {baseFoods.map((food) => (
          <option key={food.name} value={food.name}>
            {food.name}
          </option>
        ))}
      </select>

      {scannerFood && (
        <>
          <div className="nutrition-title">
            <div>
              <span className="hero-label">SELECTED FOOD</span>
              <h2>{scannerFood.name}</h2>
              <p>Estimated nutrition per 100 grams</p>
            </div>

            <img
              src={scannerFood.image}
              alt={scannerFood.name}
              className="food-image"
            />
          </div>

          <label>Quantity (grams)</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) =>
              setQuantity(Math.max(1, Number(event.target.value) || 1))
            }
          />

          <div className="macro-grid">
            <div className="macro calorie">
              <span>🔥</span>
              <strong>
                {Math.round(scannerFood.calories * quantity / 100)}
              </strong>
              <small>Calories (kcal)</small>
            </div>

            <div className="macro protein">
              <span>💪</span>
              <strong>
                {(scannerFood.protein * quantity / 100).toFixed(1)} g
              </strong>
              <small>Protein</small>
            </div>

            <div className="macro carbs">
              <span>🌾</span>
              <strong>
                {(scannerFood.carbs * quantity / 100).toFixed(1)} g
              </strong>
              <small>Carbohydrates</small>
            </div>

            <div className="macro fat">
              <span>🥑</span>
              <strong>
                {(scannerFood.fat * quantity / 100).toFixed(1)} g
              </strong>
              <small>Fat</small>
            </div>
          </div>

          <button
            className="hero-button"
            onClick={() => {
              addFood(scannerFood);
              setScannerFood(null);
              setQuantity(100);
            }}
          >
            ➕ Add Food to Daily Tracker
          </button>
        </>
      )}
    </div>
  </section>
)}

  {activePage === "Diet Plans" && (
    <section>
      <div className="section-heading">
        <div>
          <h2>🥗 Healthy Diet Plans</h2>
          <p>Explore eight days of balanced meal ideas.</p>
        </div>
      </div>

      <div className="food-grid">
        {dietPlans.map((plan, index) => (
          <div className="food-card" key={plan.title}>
            <img
              src={plan.image}
              alt={plan.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/500x350?text=Healthy+food";
              }}
            />
            <div className="food-card-content">
              <span className="food-category">
                DAY {index + 1}
              </span>
              <h3>{plan.title}</h3>
              {plan.meals.map((meal) => (
                <p key={meal}>{meal}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

  {activePage === "Daily Tracker" && (
    <section>
      <div className="section-heading">
        <div>
          <h2>📊 Your Daily Nutrition</h2>
          <p>Track the food you have added throughout the day.</p>
        </div>
      </div>

      <div className="macro-grid">
        <div className="macro calorie">
          <span>🔥</span>
          <strong>{totals.calories}</strong>
          <small>Total Calories</small>
        </div>

        <div className="macro protein">
          <span>💪</span>
          <strong>{totals.protein.toFixed(1)} g</strong>
          <small>Protein</small>
        </div>

        <div className="macro carbs">
          <span>🌾</span>
          <strong>{totals.carbs.toFixed(1)} g</strong>
          <small>Carbohydrates</small>
        </div>

        <div className="macro fat">
          <span>🥑</span>
          <strong>{totals.fat.toFixed(1)} g</strong>
          <small>Fat</small>
        </div>
      </div>

      <h3>Food History</h3>

      {tracker.length === 0 ? (
        <div className="empty-state">
          <span>🍽️</span>
          <h3>No food added yet</h3>
          <p>Use the Food Scanner to add food to your tracker.</p>
        </div>
      ) : (
        <div className="food-grid">
          {tracker.map((food) => (
            <div className="food-card" key={food.id}>
              <img
                src={food.image}
                alt={food.name}
                className="food-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/500x350?text=${encodeURIComponent(food.name)}`;
                }}
              />
              <div className="food-card-content">
                <h3>{food.name}</h3>
                <p>{food.serving}</p>
                <strong>{food.calories} kcal</strong>
                <p>Protein: {food.protein} g</p>
                <p>Carbs: {food.carbs} g</p>
                <p>Fat: {food.fat} g</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )}
</main>
</div>
);
}

export default App;