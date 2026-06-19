/* ============================================================
   JFit profile page — capture personal data + show energy needs
   ============================================================ */
function renderProfile() {
  const p = JStore.getProfile();
  const set = (id, v) => { const el = document.getElementById(id); if (el != null && v != null) el.value = v; };

  // activity options (built once)
  const actSel = document.getElementById("pf-activity");
  if (actSel && !actSel.dataset.built) {
    actSel.innerHTML = Object.keys(Health.ACTIVITY_LABEL)
      .map((k) => `<option value="${k}">${Health.ACTIVITY_LABEL[k]}</option>`).join("");
    actSel.dataset.built = "1";
  }

  set("pf-name", p.name || "");
  if (p.sex) set("pf-sex", p.sex);
  set("pf-age", p.age);
  set("pf-height", p.heightCm);
  set("pf-start", p.startWeightKg);
  set("pf-current", JStore.currentWeight());
  set("pf-goal", p.goalWeightKg);
  set("pf-hip", JStore.latestHip());
  if (p.activity) set("pf-activity", p.activity);
  if (p.goalType) set("pf-goaltype", p.goalType);
  if (p.targetRateKgPerWk != null) set("pf-rate", String(p.targetRateKgPerWk));

  renderProfileResults();
}

function saveProfile() {
  const num = (id) => { const v = parseFloat(document.getElementById(id).value); return isNaN(v) ? null : v; };
  const val = (id) => document.getElementById(id).value;

  const age = num("pf-age");
  const heightCm = num("pf-height");
  const current = num("pf-current");
  const start = num("pf-start");
  const goal = num("pf-goal");
  const hip = num("pf-hip");

  if (!age || !heightCm || !current) {
    toast("Please fill in age, height and current weight");
    return;
  }
  if (age < 13 || age > 100) { toast("Enter a valid age (13–100)"); return; }
  if (heightCm < 120 || heightCm > 230) { toast("Enter a valid height in cm"); return; }

  JStore.setProfile({
    name: val("pf-name").trim(),
    sex: val("pf-sex"),
    age,
    heightCm,
    startWeightKg: start != null ? start : current,
    goalWeightKg: goal,
    hipCm: hip,
    activity: val("pf-activity"),
    goalType: val("pf-goaltype"),
    targetRateKgPerWk: parseFloat(val("pf-rate")),
  });

  // log today's weight + hip so the journey starts immediately
  const today = JStore.dateKey();
  const patch = {};
  if (current != null) patch.weightKg = current;
  if (hip != null) patch.hipCm = hip;
  if (Object.keys(patch).length) JStore.upsertLog(today, patch);

  toast("✓ Profile saved");
  renderProfileResults();
  if (typeof renderHome === "function") renderHome();
}

function renderProfileResults() {
  const box = document.getElementById("pf-results");
  if (!box) return;
  if (!JStore.hasProfile()) {
    box.innerHTML = `<p class="pf-hint">Fill in your details and tap Save to see your daily calorie needs.</p>`;
    return;
  }
  const p = JStore.getProfile();
  const w = JStore.currentWeight();
  const bmr = Health.bmr({ sex: p.sex, age: p.age, heightCm: p.heightCm, weightKg: w });
  const tdee = Health.tdee(bmr, p.activity);
  const tgt = Health.dailyTarget(tdee, p.goalType, p.targetRateKgPerWk, p.sex);
  const bmi = Health.bmi(w, p.heightCm);

  const goalWord = p.goalType === "lose" ? "lose fat" : p.goalType === "gain" ? "gain muscle" : "maintain";
  box.innerHTML = `
    <div class="pf-stats">
      <div class="pf-stat"><div class="v">${bmr}</div><div class="l">BMR kcal</div></div>
      <div class="pf-stat"><div class="v">${tdee}</div><div class="l">Maintenance</div></div>
      <div class="pf-stat hi"><div class="v">${tgt.target}</div><div class="l">Daily target</div></div>
      <div class="pf-stat"><div class="v">${bmi ? bmi.toFixed(1) : "–"}</div><div class="l">BMI · ${Health.bmiClass(bmi)}</div></div>
    </div>
    <p class="pf-hint">To <b>${goalWord}</b> at <b>${p.targetRateKgPerWk} kg/week</b>, eat about <b>${tgt.target} kcal/day</b>${tgt.warn ? ` (held at a safe minimum of ${tgt.floor})` : ""}. Workouts you log add to this.</p>
    ${tgt.warn ? `<p class="pf-warn">⚠️ Your chosen rate would push calories too low — we capped it at a safer level. Consider a slower rate.</p>` : ""}
    <p class="pf-disc">Estimates for healthy adults, not medical advice. Not for under-18, pregnancy, or medical conditions — check with a professional.</p>`;
}
