/* ============================================================
   JFit health math  (pure functions, metric)
   Sources:
   - BMR: Mifflin-St Jeor (1990) — recommended by the Academy of
     Nutrition & Dietetics; accurate within 10% for ~82% of adults.
   - TDEE activity multipliers: FAO/WHO/UNU standard scale.
   - Energy density of body tissue: ~7700 kcal/kg (Wishnofsky).
     NOTE: this OVER-estimates loss over time because metabolism
     adapts (Hall/NIH). We therefore present projections as
     estimates with a range, cap the rate, and never imply
     guaranteed linear loss.
   These are estimates for healthy adults, NOT medical advice.
   ============================================================ */
const Health = (function () {
  const ACTIVITY = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, athlete: 1.9,
  };
  const ACTIVITY_LABEL = {
    sedentary: "Sedentary — desk job, little exercise",
    light: "Light — exercise 1–3 days/week",
    moderate: "Moderate — exercise 3–5 days/week",
    very: "Very active — 6–7 days/week",
    athlete: "Athlete — hard training 2×/day",
  };
  const KCAL_PER_KG = 7700;

  function bmr(p) {
    if (!p || !p.heightCm || !p.weightKg || !p.age) return null;
    const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age;
    return Math.round(p.sex === "female" ? base - 161 : base + 5);
  }
  function tdee(b, activity) {
    if (!b) return null;
    return Math.round(b * (ACTIVITY[activity] || 1.2));
  }
  function dailyDeficit(rateKgPerWk) {
    return Math.round((rateKgPerWk || 0) * KCAL_PER_KG / 7);
  }
  function dailyTarget(td, goalType, rateKgPerWk, sex) {
    if (!td) return null;
    const adj = dailyDeficit(rateKgPerWk);
    let target = td;
    if (goalType === "lose") target = td - adj;
    else if (goalType === "gain") target = td + adj;
    const floor = sex === "female" ? 1200 : 1500;
    let warn = false;
    if (goalType === "lose" && target < floor) { target = floor; warn = true; }
    return { target: Math.round(target), warn, floor };
  }

  function kgFromKcal(kc) { return kc / KCAL_PER_KG; }

  function weeksToGoal(currentKg, goalKg, rateKgPerWk) {
    if (!rateKgPerWk || rateKgPerWk <= 0) return null;
    const diff = currentKg - goalKg;
    if (diff <= 0) return 0;
    return diff / rateKgPerWk;
  }
  // Projected weight after `days`, using planned weekly rate.
  // Mild damping after 90 days to reflect metabolic adaptation.
  function projectWeight(currentKg, goalKg, rateKgPerWk, days, goalType) {
    if (!rateKgPerWk || rateKgPerWk <= 0) return currentKg;
    let perDay = rateKgPerWk / 7;
    const damp = days > 90 ? 0.85 : 1; // honest slowdown for long horizons
    let change = perDay * days * damp;
    if (goalType === "gain") return currentKg + change;
    let projected = currentKg - change;
    if (goalType === "lose" && goalKg != null) projected = Math.max(projected, goalKg);
    return projected;
  }
  function addDays(n) {
    const d = new Date();
    d.setDate(d.getDate() + Math.round(n));
    return d;
  }
  function fmtDate(d) {
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  }
  function bmi(weightKg, heightCm) {
    if (!weightKg || !heightCm) return null;
    const m = heightCm / 100;
    return weightKg / (m * m);
  }
  function bmiClass(b) {
    if (b == null) return "";
    if (b < 18.5) return "Underweight";
    if (b < 25) return "Healthy";
    if (b < 30) return "Overweight";
    return "Obese";
  }

  return {
    ACTIVITY, ACTIVITY_LABEL, KCAL_PER_KG,
    bmr, tdee, dailyDeficit, dailyTarget, kgFromKcal,
    weeksToGoal, projectWeight, addDays, fmtDate, bmi, bmiClass,
  };
})();
