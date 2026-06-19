/* ============================================================
   JFit user data store  (localStorage, metric units)
   Single source of truth for profile + daily logs.
   Kept behind this module so storage can later be swapped to
   IndexedDB (e.g. if progress photos are added) without
   touching any UI code.
   ============================================================ */
const JStore = (function () {
  const KEY = "jfit-user-v1";
  let data = { profile: null, logs: [] };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && typeof d === "object") {
          data = Object.assign({ profile: null, logs: [] }, d);
          if (!Array.isArray(data.logs)) data.logs = [];
        }
      }
    } catch (e) {}
    return data;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }

  function dateKey(d) {
    const t = d ? new Date(d) : new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, "0");
    const da = String(t.getDate()).padStart(2, "0");
    return `${y}-${m}-${da}`;
  }

  /* ---- profile ---- */
  function hasProfile() { return !!(data.profile && data.profile.heightCm && data.profile.age); }
  function getProfile() { return data.profile || {}; }
  function setProfile(patch) {
    data.profile = Object.assign({}, data.profile, patch, { updatedAt: Date.now() });
    if (!data.profile.startDate) data.profile.startDate = dateKey();
    save();
    return data.profile;
  }

  /* ---- logs (one entry per calendar day, upserted) ---- */
  function getLogs() {
    return data.logs.slice().sort((a, b) => (a.date < b.date ? -1 : 1));
  }
  function getLog(date) { return data.logs.find((l) => l.date === date); }
  function upsertLog(date, patch) {
    let l = data.logs.find((x) => x.date === date);
    if (!l) { l = { date }; data.logs.push(l); }
    Object.assign(l, patch);
    save();
    return l;
  }
  function addCaloriesToday(kc) {
    if (!kc) return;
    const d = dateKey();
    const existing = getLog(d);
    upsertLog(d, { kcalBurned: ((existing && existing.kcalBurned) || 0) + kc });
  }

  /* ---- derived helpers ---- */
  function currentWeight() {
    const withW = getLogs().filter((l) => typeof l.weightKg === "number");
    if (withW.length) return withW[withW.length - 1].weightKg;
    return data.profile ? data.profile.startWeightKg : null;
  }
  function latestHip() {
    const withH = getLogs().filter((l) => typeof l.hipCm === "number");
    if (withH.length) return withH[withH.length - 1].hipCm;
    return data.profile ? data.profile.hipCm : null;
  }
  function caloriesToday() {
    const l = getLog(dateKey());
    return (l && l.kcalBurned) || 0;
  }
  // last n calendar days, oldest -> newest; value is null when no entry
  function lastNDays(n, field) {
    const out = [];
    const today = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const dt = new Date(today);
      dt.setDate(today.getDate() - i);
      const key = dateKey(dt);
      const l = getLog(key);
      out.push({ date: key, value: l && typeof l[field] === "number" ? l[field] : null });
    }
    return out;
  }

  /* ---- backup ---- */
  function exportJSON() { return JSON.stringify(data, null, 2); }
  function importJSON(str) {
    try {
      const d = JSON.parse(str);
      if (d && typeof d === "object") {
        data = Object.assign({ profile: null, logs: [] }, d);
        if (!Array.isArray(data.logs)) data.logs = [];
        save();
        return true;
      }
    } catch (e) {}
    return false;
  }

  return {
    load, save, dateKey,
    hasProfile, getProfile, setProfile,
    getLogs, getLog, upsertLog, addCaloriesToday,
    currentWeight, latestHip, caloriesToday, lastNDays,
    exportJSON, importJSON,
  };
})();
JStore.load();
