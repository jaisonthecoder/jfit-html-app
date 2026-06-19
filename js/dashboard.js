/* ============================================================
   JFit dashboard — weight-loss journey, forecast, last-10-days
   Charts are dependency-free inline SVG (offline-safe).
   ============================================================ */
function sparkChart(series, opts) {
  opts = opts || {};
  const W = 320, H = 120, pad = { l: 26, r: 12, t: 12, b: 18 };
  const color = opts.color || "#ff5630";
  const vals = series.filter((s) => s.value != null).map((s) => s.value);
  if (vals.length === 0) {
    return `<div class="chart-empty">No ${opts.label || "data"} logged yet. Add an entry below and your trend will appear here.</div>`;
  }
  let min = Math.min(...vals), max = Math.max(...vals);
  if (min === max) { min -= 1; max += 1; }
  const r = max - min; min -= r * 0.15; max += r * 0.15;
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b, n = series.length;
  const X = (i) => pad.l + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const Y = (v) => pad.t + ih - ((v - min) / (max - min)) * ih;

  const pts = [];
  series.forEach((s, i) => { if (s.value != null) pts.push([X(i), Y(s.value), s.value]); });
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  let area = "";
  if (pts.length > 1) {
    const base = (pad.t + ih).toFixed(1);
    area = `<path d="${path} L ${pts[pts.length - 1][0].toFixed(1)} ${base} L ${pts[0][0].toFixed(1)} ${base} Z" fill="${color}" opacity=".10"/>`;
  }
  const dots = pts.map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.6" fill="${color}"/>`).join("");
  const last = pts[pts.length - 1];
  const lastLbl = `<text x="${Math.min(W - 2, last[0] + 5).toFixed(1)}" y="${(last[1] - 6).toFixed(1)}" class="cv" text-anchor="${last[0] > W - 44 ? "end" : "start"}" fill="${color}">${last[2]}</text>`;
  const axis = `<text x="2" y="${(pad.t + 8).toFixed(1)}" class="ct">${max.toFixed(0)}</text>`
    + `<text x="2" y="${(pad.t + ih).toFixed(1)}" class="ct">${min.toFixed(0)}</text>`
    + `<text x="${pad.l}" y="${H - 4}" class="ct">${series[0].date.slice(5)}</text>`
    + `<text x="${W - pad.r}" y="${H - 4}" class="ct" text-anchor="end">${series[n - 1].date.slice(5)}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="spark">${area}<path d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>${dots}${axis}${lastLbl}</svg>`;
}

function renderDashboard() {
  const body = document.getElementById("dash-body");
  if (!body) return;

  if (!JStore.hasProfile()) {
    body.innerHTML = `<div class="info-card setup-card">
      <h3>👋 Let's personalize JFit</h3>
      <p>Add your weight, height and goal to unlock your dashboard — daily calorie target, a weight forecast, and your day-by-day journey.</p>
      <button class="btn btn-primary" onclick="nav('profile')">Set up my profile</button>
    </div>`;
    return;
  }

  const p = JStore.getProfile();
  const cur = JStore.currentWeight();
  const start = p.startWeightKg != null ? p.startWeightKg : cur;
  const goal = p.goalWeightKg;
  const bmr = Health.bmr({ sex: p.sex, age: p.age, heightCm: p.heightCm, weightKg: cur });
  const tdee = Health.tdee(bmr, p.activity);
  const tgt = Health.dailyTarget(tdee, p.goalType, p.targetRateKgPerWk, p.sex);
  const kcalToday = JStore.caloriesToday();
  const todayLog = JStore.getLog(JStore.dateKey()) || {};
  const hip = JStore.latestHip();

  // ---- progress ----
  let progHtml = "";
  if (goal != null && start != null) {
    const denom = start - goal;
    let pct = denom !== 0 ? ((start - cur) / denom) * 100 : 0;
    pct = Math.max(0, Math.min(100, pct));
    const toGo = Math.abs(cur - goal);
    const lost = (start - cur);
    progHtml = `<div class="info-card">
      <div class="dash-prog-top">
        <div><div class="dp-cur">${cur != null ? cur : "–"}<span> kg</span></div><div class="dp-l">current weight</div></div>
        <div class="dp-goal"><div class="dp-cur">${goal}<span> kg</span></div><div class="dp-l">goal</div></div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct.toFixed(0)}%"></div></div>
      <div class="dash-prog-foot">
        <span>Start ${start} kg</span>
        <span><b>${toGo.toFixed(1)} kg</b> to go</span>
      </div>
      ${Math.abs(lost) > 0.05 ? `<div class="dp-note">${lost > 0 ? "⬇ Down" : "⬆ Up"} ${Math.abs(lost).toFixed(1)} kg since start — keep going 💪</div>` : ""}
    </div>`;
  }

  // ---- today / calories impact ----
  const impact = kcalToday > 0
    ? `<div class="dp-note">🔥 You burned <b>${kcalToday} kcal</b> in workouts today ≈ <b>${Health.kgFromKcal(kcalToday).toFixed(2)} kg</b> fat-energy. Paired with your calorie target, that accelerates your goal.</div>`
    : `<div class="dp-note mut">No workout logged today yet — finish a session and your burn shows here automatically.</div>`;

  const logHtml = `<div class="info-card">
    <h3>📅 Log today <span class="mut" style="font-weight:400;font-size:12px">${JStore.dateKey()}</span></h3>
    <div class="log-row">
      <label>Weight (kg)<input id="lg-weight" type="number" step="0.1" inputmode="decimal" value="${todayLog.weightKg != null ? todayLog.weightKg : ""}"></label>
      <label>Hip (cm)<input id="lg-hip" type="number" step="0.1" inputmode="decimal" value="${todayLog.hipCm != null ? todayLog.hipCm : ""}"></label>
      <button class="btn btn-primary log-save" onclick="logToday()">Save</button>
    </div>
    ${impact}
  </div>`;

  // ---- forecast ----
  let foreHtml = "";
  if (goal != null && p.goalType !== "maintain") {
    const w30 = Health.projectWeight(cur, goal, p.targetRateKgPerWk, 30, p.goalType);
    const w90 = Health.projectWeight(cur, goal, p.targetRateKgPerWk, 90, p.goalType);
    const weeks = Health.weeksToGoal(cur, goal, p.targetRateKgPerWk);
    const reached = p.goalType === "lose" ? cur <= goal : cur >= goal;
    const goalLine = reached
      ? `🎉 You've reached your goal weight!`
      : (weeks != null
        ? `At <b>${p.targetRateKgPerWk} kg/week</b>, you could reach <b>${goal} kg</b> around <b>${Health.fmtDate(Health.addDays(weeks * 7))}</b> (~${Math.ceil(weeks)} weeks).`
        : "");
    foreHtml = `<div class="info-card forecast">
      <h3>📈 Forecast</h3>
      <div class="fc-row">
        <div class="fc-box"><div class="v">${w30.toFixed(1)}<span> kg</span></div><div class="l">in 30 days</div></div>
        <div class="fc-box"><div class="v">${w90.toFixed(1)}<span> kg</span></div><div class="l">in 90 days</div></div>
      </div>
      <p class="fc-line">${goalLine}</p>
      <p class="pf-disc">Estimate only. Real weight change is non-linear — it slows as you lose, and varies with sleep, water, diet and adherence. Use the weekly average, not any single day. Not medical advice.</p>
    </div>`;
  }

  // ---- stats ----
  const statHtml = `<div class="dash-stats">
    <div class="d-stat"><div class="v">${bmr || "–"}</div><div class="l">BMR</div></div>
    <div class="d-stat"><div class="v">${tdee || "–"}</div><div class="l">Maintenance</div></div>
    <div class="d-stat hi"><div class="v">${tgt ? tgt.target : "–"}</div><div class="l">Daily target</div></div>
    <div class="d-stat"><div class="v">${p.targetRateKgPerWk}<span style="font-size:11px"> kg/wk</span></div><div class="l">Goal rate</div></div>
  </div>`;

  // ---- charts ----
  const wSeries = JStore.lastNDays(10, "weightKg");
  const hSeries = JStore.lastNDays(10, "hipCm");
  const chartHtml = `<div class="info-card">
    <h3>⚖️ Weight · last 10 days</h3>
    ${sparkChart(wSeries, { color: "#ff5630", label: "weight" })}
  </div>
  <div class="info-card">
    <h3>📏 Hip size · last 10 days</h3>
    ${sparkChart(hSeries, { color: "#3b82f6", label: "hip size" })}
  </div>`;

  const hello = p.name ? `<div class="dash-hello">Hi ${p.name} 👋</div>` : "";
  body.innerHTML = hello + progHtml + statHtml + logHtml + foreHtml + chartHtml;
}

function logToday() {
  const w = parseFloat(document.getElementById("lg-weight").value);
  const h = parseFloat(document.getElementById("lg-hip").value);
  const patch = {};
  if (!isNaN(w)) patch.weightKg = w;
  if (!isNaN(h)) patch.hipCm = h;
  if (!Object.keys(patch).length) { toast("Enter your weight or hip size"); return; }
  JStore.upsertLog(JStore.dateKey(), patch);
  toast("✓ Logged for today");
  renderDashboard();
  if (typeof renderHome === "function") renderHome();
}
