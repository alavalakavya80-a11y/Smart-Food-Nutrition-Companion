# Smart Food Calorie Calculator — VS Code setup

## 1. Install tools
Install Node.js LTS, VS Code and Git. Open this folder in VS Code.

## 2. Install and run
Open Terminal > New Terminal:
```bash
npm install
cp .env.example .env
npm run dev
```
On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.
Open the local URL printed by Vite (usually http://localhost:5173).

## 3. Create Supabase project
1. Create a project at https://supabase.com.
2. Open Project Settings > API. Copy Project URL and anon/public key into `.env`.
3. Never put the service_role key in frontend `.env`.
4. Open SQL Editor and run all of `supabase/schema.sql`.
5. In Authentication > Providers, enable Email. Configure email confirmation as appropriate for your project.

## 4. Configure Edge Function secrets
Install Supabase CLI and sign in:
```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set USDA_API_KEY=YOUR_USDA_FOODDATA_CENTRAL_KEY
supabase secrets set GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```
Get a USDA FoodData Central API key from https://fdc.nal.usda.gov/api-key-signup.html.
Get a Gemini API key from Google AI Studio. Keep both keys private; only add them as Supabase secrets.

## 5. Deploy functions
From this project folder:
```bash
supabase functions deploy nutrition-search
supabase functions deploy scan-food
```
In Supabase Dashboard > Edge Functions, confirm both are deployed. If your project requires JWT verification, keep it enabled so only authenticated users can invoke your functions.

## 6. Test in this order
1. Sign up and sign in.
2. Nutrition Analyzer: search `cooked white rice`.
3. Select a result, set quantity to 200 g. Values should scale from the USDA per-100-g values.
4. Add it to the diary and check Calorie Tracker.
5. Upload a clear meal photo in Food Scanner. Select one suggested food; verify it by searching in Nutrition Analyzer.
6. Open Diet Planner and switch between weekdays.

## Important implementation notes
- USDA results are not guaranteed to contain every Indian recipe or every nutrient. A missing nutrient is displayed as unavailable, not zero.
- Search results are per 100 g. Serving conversions for cups/pieces require food-specific gram weights. This starter asks for grams by default; the other units are estimates until you add verified portion mappings.
- The scanner only suggests names. It does not infer exact portion size or nutritional values from pixels.
- The meal plan is general balanced-meal inspiration, not medical advice or a weight-loss prescription.
- This is a working starter, not a claim that every food in the world has a verified database record. Add IFCT/verified Indian recipe records with source and licence metadata before claiming comprehensive Indian coverage.
- Before public deployment, add rate limiting, image size limits, a privacy notice, account deletion, server-side validation, and tests. Review provider terms and applicable privacy rules.
