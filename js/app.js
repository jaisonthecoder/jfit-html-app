/* ============ EXERCISE LIBRARY (real GIFs from fitnessprogramer.com) ============ */
const U = "https://fitnessprogramer.com/wp-content/uploads/";

/* Smart image fallback: if a GIF 404s, retry the same filename under the most
   common alternate month-folders before showing a clean placeholder.
   Catches small year/month guesses without needing every URL hand-verified. */
const ALT_FOLDERS = ["2021/02/","2021/04/","2021/08/","2021/06/","2021/05/","2021/09/","2021/10/","2023/01/","2022/02/"];
function gifFallback(img){
  try{
    const file = (img.dataset.file||"").split("/").pop();
    let n = parseInt(img.dataset.try||"0",10);
    if(file && n < ALT_FOLDERS.length){
      img.dataset.try = n+1;
      img.src = U + ALT_FOLDERS[n] + file;
      return;
    }
  }catch(e){}
  // give up → placeholder
  img.style.opacity=1; img.style.background="#21262d"; img.removeAttribute("src");
  const ph = img.parentElement && img.parentElement.querySelector(".gifph");
  if(ph) ph.style.display="grid"; else { img.style.opacity=.25; }
}
const LIB = {
  push:[
    {n:"Barbell Bench Press",eq:"Barbell, Bench",kcal:9,g:U+"2021/02/Barbell-Bench-Press.gif",d:"Lie flat, grip just outside shoulders. Lower bar to mid-chest, press up explosively. Keep shoulder blades pinned.",mp:"Chest (pectoralis major)",ms:"Front delts, triceps",sr:"4 sets x 5-8 reps - rest 2-3 min"},
    {n:"Incline Barbell Bench Press",eq:"Barbell, Bench",kcal:8,g:U+"2021/02/Incline-Barbell-Bench-Press.gif",d:"Bench at 30–45°. Targets upper chest. Lower to upper chest, drive up without flaring elbows.",mp:"Upper chest (clavicular pec)",ms:"Front delts, triceps",sr:"4 sets x 5-8 reps - rest 2-3 min"},
    {n:"Pec Deck Fly",eq:"Machine",kcal:6,g:U+"2021/02/Pec-Deck-Fly.gif",d:"Sit with back flat against pad. Bring arms together in a hugging arc, squeeze chest, control the return.",mp:"Chest (pectoralis major)",ms:"Front delts",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Incline Chest Fly Machine",eq:"Machine",kcal:6,g:U+"2023/06/Incline-Chest-Fly-Machine.gif",d:"Set seat so handles align with upper chest. Press handles together, squeeze, slow eccentric.",mp:"Upper chest",ms:"Front delts",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Low Cable Crossover",eq:"Cable",kcal:7,g:U+"2021/02/Low-Cable-Crossover.gif",d:"Pulleys low, sweep handles up and in toward chest. Great for lower/inner chest definition.",mp:"Lower / inner chest",ms:"Front delts",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"High Cable Crossover",eq:"Cable",kcal:7,g:U+"2021/02/High-Cable-Crossover.gif",d:"Pulleys high, pull down and across body. Hits lower chest. Slight forward lean.",mp:"Lower chest",ms:"Front delts",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Cable Upper Chest Crossover",eq:"Cable",kcal:7,g:U+"2021/10/Cable-Upper-Chest-Crossovers.gif",d:"Pulleys low, drive handles upward and together. Emphasises the upper chest fibres.",mp:"Upper chest",ms:"Front delts",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Dumbbell Fly",eq:"Dumbbells, Bench",kcal:6,g:U+"2021/02/Dumbbell-Fly.gif",d:"Flat bench, slight elbow bend. Open arms wide in arc, feel chest stretch, bring back up.",mp:"Chest (pectoralis major)",ms:"Front delts",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Dumbbell Pullover",eq:"Dumbbells, Bench",kcal:7,g:U+"2021/02/Dumbbell-Pullover.gif",d:"Hold one DB over chest, lower behind head in arc, pull back over. Chest + lat stretch.",mp:"Chest (pectoralis major)",ms:"Lats, triceps (long head), serratus",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Overhead Barbell Press",eq:"Barbell",kcal:8,g:U+"2021/02/Barbell-Shoulder-Press.gif",d:"Standing, bar at shoulders. Press overhead, lock out, lower under control. Brace core hard.",mp:"Shoulders (front & side delts)",ms:"Triceps, upper chest, traps",sr:"3-4 sets x 6-10 reps - rest 2-3 min"},
    {n:"Dumbbell Shoulder Press",eq:"Dumbbells",kcal:7,g:U+"2021/02/Dumbbell-Shoulder-Press.gif",d:"Seated or standing. Press DBs from shoulder height to overhead, palms forward, no arching.",mp:"Shoulders (front & side delts)",ms:"Triceps, upper chest",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Dumbbell Lateral Raise",eq:"Dumbbells",kcal:5,g:U+"2021/02/Dumbbell-Lateral-Raise.gif",d:"Slight bend in elbows, raise DBs out to sides to shoulder height. Lead with elbows, control down.",mp:"Side delts (medial deltoid)",ms:"Front delts, traps",sr:"3-4 sets x 12-20 reps - rest 45-75s"},
    {n:"Cable Lateral Raise",eq:"Cable",kcal:5,g:U+"2021/02/Cable-Lateral-Raise.gif",d:"Cable behind back, raise arm out to side. Constant tension on the side delt throughout.",mp:"Side delts (medial deltoid)",ms:"Traps",sr:"3-4 sets x 12-20 reps - rest 45-75s"},
    {n:"Front Dumbbell Raise",eq:"Dumbbells",kcal:5,g:U+"2021/02/Dumbbell-Front-Raise.gif",d:"Raise DBs straight in front to shoulder height. Targets front delts. No swinging.",mp:"Front delts (anterior deltoid)",ms:"Side delts, upper chest",sr:"3-4 sets x 12-15 reps - rest 45-75s"},
    {n:"Arnold Press",eq:"Dumbbells",kcal:7,g:U+"2021/08/Arnold-Press.gif",d:"Start palms facing you, rotate out as you press overhead. Hits all three delt heads.",mp:"Shoulders (all three delt heads)",ms:"Triceps, upper chest",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Machine Shoulder Press",eq:"Machine",kcal:6,g:U+"2021/08/Lever-Shoulder-Press.gif",d:"Seated, back flat. Press handles overhead. Stable path, good for progressive overload.",mp:"Shoulders (front & side delts)",ms:"Triceps",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Triceps Pushdown",eq:"Cable",kcal:5,g:U+"2021/02/Pushdown.gif",d:"Elbows pinned at sides, push bar down to full extension, squeeze triceps, control up.",mp:"Triceps (lateral & medial head)",ms:"-",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"One-Arm Triceps Pushdown",eq:"Cable",kcal:5,g:U+"2022/11/One-arm-triceps-pushdown.gif",d:"Single arm, elbow pinned, push handle down to full lockout. Squeeze triceps, control up. Great for fixing side-to-side imbalances.",mp:"Triceps (lateral & medial head)",ms:"-",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Overhead Cable Extension",eq:"Cable",kcal:5,g:U+"2021/04/Cable-Rope-Overhead-Triceps-Extension.gif",d:"Face away from cable, extend arms overhead. Stretches and works the long triceps head.",mp:"Triceps (long head)",ms:"-",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Triceps Dips",eq:"Bodyweight",kcal:8,g:U+"2021/02/Triceps-Dips.gif",d:"Lower body until elbows ~90°, press back up. Lean slightly forward for chest, upright for triceps.",mp:"Triceps",ms:"Lower chest, front delts",sr:"3-4 sets x 8-12 reps - rest 90s-2 min"},
    {n:"Close-Grip Bench Press",eq:"Barbell, Bench",kcal:8,g:U+"2021/04/Close-Grip-Bench-Press.gif",d:"Grip shoulder-width, elbows tucked. Press from lower chest. Triceps-dominant compound.",mp:"Triceps",ms:"Chest, front delts",sr:"3-4 sets x 6-10 reps - rest 2-3 min"},
    {n:"Dumbbell Triceps Kickback",eq:"Dumbbells",kcal:5,g:U+"2021/02/Dumbbell-Kickback.gif",d:"Hinge forward, upper arm parallel to floor. Extend forearm back until straight, squeeze triceps, control return.",mp:"Triceps",ms:"Rear delt",sr:"3-4 sets x 10-15 reps - rest 60-90s"}
  ],
  pull:[
    {n:"Lat Pulldown",eq:"Cable, Machine",kcal:7,g:U+"2021/02/Lat-Pulldown.gif",d:"Wide grip, pull bar to upper chest, drive elbows down and back. Squeeze lats, control up.",mp:"Lats (latissimus dorsi)",ms:"Biceps, rear delts, mid-back",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Front Lat Pulldown (Lever)",eq:"Machine",kcal:7,g:U+"2021/05/Front-Pulldown.gif",d:"Pull handles down to chest level. Lean back slightly, focus on lat contraction.",mp:"Lats",ms:"Biceps, mid-back",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Cable Rear Pulldown",eq:"Cable",kcal:7,g:U+"2021/08/Cable-Rear-Pulldown.gif",d:"Pull bar behind neck OR to chest with control. Engages lats and rear delts.",mp:"Lats",ms:"Rear delts, biceps",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Pull-Up",eq:"Bodyweight",kcal:9,g:U+"2021/02/Pull-up.gif",d:"Dead hang, pull chin over bar by driving elbows down. Full stretch at bottom, no kipping.",mp:"Lats",ms:"Biceps, mid-back, forearms",sr:"3-4 sets x 5-10 reps - rest 2-3 min"},
    {n:"Seated Cable Row",eq:"Cable",kcal:7,g:U+"2021/02/Seated-Cable-Row.gif",d:"Pull handle to lower stomach, squeeze shoulder blades, keep torso upright. Slow return.",mp:"Mid-back (rhomboids, traps) & lats",ms:"Biceps, rear delts",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Bent Over Barbell Row",eq:"Barbell",kcal:8,g:U+"2021/02/Barbell-Bent-Over-Row.gif",d:"Hinge at hips, flat back. Pull bar to lower ribs, squeeze back, lower under control.",mp:"Mid-back (lats, rhomboids)",ms:"Biceps, rear delts, spinal erectors",sr:"3-4 sets x 6-10 reps - rest 2-3 min"},
    {n:"Dumbbell Row",eq:"Dumbbells, Bench",kcal:7,g:U+"2021/02/Dumbbell-Row.gif",d:"One knee on bench, pull DB to hip, elbow tight. Squeeze lat at top, full stretch at bottom.",mp:"Lats & mid-back",ms:"Biceps, rear delts",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"T-Bar Row",eq:"Barbell, Machine",kcal:8,g:U+"2021/04/t-bar-rows.gif",d:"Straddle bar, hinge forward, row weight to chest. Thick back builder, keep back flat.",mp:"Mid-back (lats, rhomboids)",ms:"Biceps, rear delts, erectors",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Face Pull",eq:"Cable",kcal:5,g:U+"2021/02/Face-Pull.gif",d:"Rope at face height, pull toward forehead, elbows high. Rear delts + upper back health.",mp:"Rear delts & mid-traps/rhomboids",ms:"Rotator cuff",sr:"3-4 sets x 15-20 reps - rest 45-75s"},
    {n:"Straight-Arm Pulldown",eq:"Cable",kcal:6,g:U+"2021/05/Cable-Straight-Arm-Pulldown.gif",d:"Arms straight, push bar down in arc to thighs. Isolates the lats. No elbow bend.",mp:"Lats",ms:"Triceps (long head), teres major",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Barbell Deadlift",eq:"Barbell",kcal:11,g:U+"2021/02/Barbell-Deadlift.gif",d:"Hinge, flat back, bar over mid-foot. Drive through floor, lock out hips. King of pulls.",mp:"Posterior chain (glutes, hamstrings, erectors)",ms:"Lats, traps, forearms, quads",sr:"3-4 sets x 4-6 reps - rest ~3 min"},
    {n:"Barbell Shrug",eq:"Barbell",kcal:5,g:U+"2021/02/Barbell-Shrug.gif",d:"Hold bar, shrug shoulders straight up toward ears, squeeze traps, lower slow. No rolling.",mp:"Traps (upper)",ms:"Forearms, levator scapulae",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Dumbbell Shrug",eq:"Dumbbells",kcal:5,g:U+"2021/02/Dumbbell-Shrug.gif",d:"DBs at sides, elevate shoulders straight up, hold, lower. Pure trap work.",mp:"Traps (upper)",ms:"Forearms",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Barbell Biceps Curl",eq:"Barbell",kcal:5,g:U+"2021/02/Barbell-Curl.gif",d:"Elbows pinned, curl bar up, squeeze biceps, lower slowly. Don't swing the back.",mp:"Biceps brachii",ms:"Brachialis, forearms",sr:"3-4 sets x 8-12 reps - rest 60-90s"},
    {n:"Dumbbell Biceps Curl",eq:"Dumbbells",kcal:5,g:U+"2021/01/Dumbbell-Curl.gif",d:"Curl DBs, supinate wrist as you lift. Control the negative. Alternate or together.",mp:"Biceps brachii",ms:"Brachialis, forearms",sr:"3-4 sets x 8-12 reps - rest 60-90s"},
    {n:"Hammer Curl",eq:"Dumbbells",kcal:5,g:U+"2021/02/Hammer-Curl.gif",d:"Neutral grip (palms facing in), curl up. Targets brachialis and forearm for thicker arms.",mp:"Brachialis & brachioradialis",ms:"Biceps, forearms",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Cable Biceps Curl",eq:"Cable",kcal:5,g:U+"2021/02/Cable-Curl.gif",d:"Constant tension curl. Elbows fixed, curl handle up, squeeze, slow release.",mp:"Biceps brachii",ms:"Brachialis",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Preacher Curl",eq:"Machine, Barbell",kcal:5,g:U+"2021/02/Dumbbell-Preacher-Curl.gif",d:"Arms on angled pad, curl up. Isolates biceps, eliminates cheating. Full stretch at bottom.",mp:"Biceps brachii (short head)",ms:"Brachialis",sr:"3-4 sets x 8-12 reps - rest 60-90s"},
    {n:"Concentration Curl",eq:"Dumbbells",kcal:4,g:U+"2021/02/Concentration-Curl.gif",d:"Seated, elbow on inner thigh, curl DB. Peak biceps contraction, zero momentum.",mp:"Biceps brachii (peak)",ms:"Brachialis",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Reverse Pec Deck (Rear Delt)",eq:"Machine",kcal:5,g:U+"2021/08/Lever-Reverse-Fly.gif",d:"Face the pad, pull handles back in arc. Isolates rear delts and upper back.",mp:"Rear delts (posterior deltoid)",ms:"Rhomboids, mid-traps",sr:"3-4 sets x 12-20 reps - rest 45-75s"},
    {n:"Chin-Up",eq:"Bodyweight",kcal:9,g:U+"2021/04/Chin-Up.gif",d:"Underhand grip pull-up. More biceps involvement. Pull chin over bar, full hang at bottom.",mp:"Lats & biceps",ms:"Mid-back, forearms",sr:"3-4 sets x 5-10 reps - rest 2-3 min"},
    {n:"Wide Grip Lat Pulldown",eq:"Cable",kcal:7,g:U+"2021/04/Wide-Grip-Lat-Pulldown.gif",d:"Wider than shoulders, pull to chest. Emphasises lat width. Drive elbows down.",mp:"Lats (width)",ms:"Biceps, rear delts",sr:"3-4 sets x 8-12 reps - rest ~2 min"}
  ],
  legs:[
    {n:"Barbell Back Squat",eq:"Barbell",kcal:11,g:U+"2021/02/BARBELL-SQUAT.gif",d:"Bar on traps, brace, sit back and down to parallel, drive up through heels. The leg king.",mp:"Quads & glutes",ms:"Hamstrings, adductors, erectors, core",sr:"3-4 sets x 5-8 reps - rest 2-3 min"},
    {n:"Smith Machine Squat",eq:"Machine",kcal:9,g:U+"2024/10/smith-machine-squat.gif",d:"Fixed bar path, safer for going heavy solo. Feet slightly forward, descend to parallel.",mp:"Quads & glutes",ms:"Hamstrings, core",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Leg Press",eq:"Machine",kcal:9,g:U+"2015/11/Leg-Press.gif",d:"Feet shoulder-width on platform, lower to ~90°, press without locking knees hard. Quad mass.",mp:"Quads & glutes",ms:"Hamstrings, adductors",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Dumbbell Squat",eq:"Dumbbells",kcal:8,g:U+"2023/09/Dumbbell-Squat.gif",d:"Hold DBs at sides or one at chest, squat deep keeping torso upright, drive through heels. Quad + glute builder.",mp:"Quads & glutes",ms:"Hamstrings, core",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Romanian Deadlift",eq:"Barbell",kcal:10,g:U+"2021/02/Barbell-Romanian-Deadlift.gif",d:"Soft knees, hinge hips back, lower bar along legs, feel hamstring stretch, drive hips forward.",mp:"Hamstrings & glutes",ms:"Spinal erectors, lats, forearms",sr:"3-4 sets x 6-10 reps - rest 2-3 min"},
    {n:"Leg Extension",eq:"Machine",kcal:6,g:U+"2021/02/LEG-EXTENSION.gif",d:"Extend legs to straight, squeeze quads at top, lower slow. Pure quad isolation.",mp:"Quads (rectus femoris, vasti)",ms:"-",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Lying Leg Curl",eq:"Machine",kcal:6,g:U+"2021/02/Leg-Curl.gif",d:"Curl pad toward glutes, squeeze hamstrings, control back. Don't let hips lift.",mp:"Hamstrings",ms:"Calves (gastrocnemius)",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Seated Leg Curl",eq:"Machine",kcal:6,g:U+"2021/08/Seated-Leg-Curl.gif",d:"Curl legs under seated, squeeze hams. Good stretch position for hamstring growth.",mp:"Hamstrings",ms:"Calves (gastrocnemius)",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Walking Lunge",eq:"Dumbbells",kcal:9,g:U+"2021/02/Dumbbell-Walking-Lunge.gif",d:"Step forward, drop back knee toward floor, push off front heel. Alternate legs, controlled.",mp:"Quads & glutes",ms:"Hamstrings, adductors, core",sr:"3 sets x 10-12 reps per leg - rest ~2 min"},
    {n:"Bulgarian Split Squat",eq:"Dumbbells",kcal:9,g:U+"2021/05/Dumbbell-Bulgarian-Split-Squat.gif",d:"Rear foot elevated, drop straight down, drive up through front heel. Brutal single-leg builder.",mp:"Quads & glutes",ms:"Hamstrings, adductors, core",sr:"3 sets x 8-12 reps per leg - rest ~2 min"},
    {n:"Hack Squat",eq:"Machine",kcal:9,g:U+"2021/02/Sled-Hack-Squat.gif",d:"Shoulders under pads, descend deep, press up through heels. Heavy quad loading, back supported.",mp:"Quads",ms:"Glutes, hamstrings",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Barbell Good Morning",eq:"Barbell",kcal:8,g:U+"2021/02/Barbell-Good-Morning.gif",d:"Bar on traps, soft knees, hinge at hips lowering torso toward parallel, drive hips back to stand. Hamstrings + lower back.",mp:"Hamstrings & glutes",ms:"Spinal erectors",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Plie Dumbbell Squat",eq:"Dumbbells",kcal:7,g:U+"2023/01/Sumo-Plie-Dumbbell-Squat.gif",d:"Hold one DB between legs, wide stance toes out, squat down and up. Targets inner thighs and glutes.",mp:"Inner thighs (adductors) & glutes",ms:"Quads",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
    {n:"Standing Calf Raise",eq:"Machine",kcal:5,g:U+"2021/06/Standing-Calf-Raise.gif",d:"Rise onto toes as high as possible, squeeze calves, lower for a full stretch. Slow tempo.",mp:"Calves (gastrocnemius)",ms:"Soleus",sr:"3-4 sets x 10-15 reps - slow, full stretch - rest 60-90s"},
    {n:"Seated Calf Raise",eq:"Machine",kcal:4,g:U+"2021/06/Lever-Seated-Calf-Raise.gif",d:"Pad on knees, raise heels, squeeze, lower deep. Targets the soleus muscle.",mp:"Calves (soleus)",ms:"Gastrocnemius",sr:"3-4 sets x 10-15 reps - slow, full stretch - rest 60-90s"},
    {n:"Leg Press Calf Raise",eq:"Machine",kcal:5,g:U+"2021/05/Leg-Press-Calf-Raise.gif",d:"Balls of feet on platform edge, push through toes, full stretch and contraction.",mp:"Calves (gastrocnemius)",ms:"Soleus",sr:"3-4 sets x 10-15 reps - slow, full stretch - rest 60-90s"},
    {n:"Barbell Sumo Squat",eq:"Barbell",kcal:10,g:U+"2021/02/Barbell-sumo-squat.gif",d:"Wide stance, toes out, bar on traps. Squat down keeping chest up. Hits quads, glutes, inner thigh.",mp:"Quads, glutes & adductors",ms:"Hamstrings",sr:"3-4 sets x 6-10 reps - rest 2-3 min"},
    {n:"Barbell Lunge",eq:"Barbell",kcal:9,g:U+"2021/05/Barbell-Lunge.gif",d:"Bar on traps, step forward into a lunge, drop back knee, drive up through front heel. Alternate legs.",mp:"Quads & glutes",ms:"Hamstrings, core",sr:"3 sets x 8-12 reps per leg - rest ~2 min"},
    {n:"Dumbbell Straight Leg Deadlift",eq:"Dumbbells",kcal:8,g:U+"2021/04/Dumbbell-Straight-Leg-Deadlift.gif",d:"DBs in front, legs near-straight, hinge at hips lowering weights, feel hamstring stretch, drive hips forward to stand. Targets glutes + hamstrings.",mp:"Hamstrings & glutes",ms:"Spinal erectors",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Sumo Deadlift",eq:"Barbell",kcal:11,g:U+"2021/04/Barbell-Sumo-Deadlift.gif",d:"Wide stance, hands inside knees, drive up through heels. Hits glutes, hams, inner thigh.",mp:"Glutes, quads, adductors & hamstrings",ms:"Traps, erectors, forearms",sr:"3-4 sets x 4-6 reps - rest ~3 min"},
    {n:"Dumbbell Romanian Deadlift",eq:"Dumbbells",kcal:8,g:U+"2021/04/Dumbbell-Romanian-Deadlift.gif",d:"DBs in front, hinge hips back, lower along legs, feel hamstring stretch, stand tall.",mp:"Hamstrings & glutes",ms:"Spinal erectors, forearms",sr:"3-4 sets x 8-12 reps - rest ~2 min"},
    {n:"Hip Adduction Machine",eq:"Machine",kcal:5,g:U+"2021/05/Lever-Side-Hip-Adduction.gif",d:"Squeeze legs together against the pads, control the return. Isolates the inner thigh adductors.",mp:"Inner thighs (adductors)",ms:"-",sr:"3-4 sets x 12-15 reps - rest 60-90s"}
  ]
};

// Upper = push + pull merged; Lower = legs (reuse verified arrays, no duplication)
LIB.upper = LIB.push.concat(LIB.pull);
LIB.lower = LIB.legs;

// Core / Abs library (verified GIF URLs, original form cues)
LIB.core = [
  {n:"Plank",eq:"Bodyweight",kcal:5,g:U+"2023/07/High-Plank.gif",d:"Forearms or hands down, body in a straight line head to heels. Brace abs and glutes, don't let hips sag. Hold for time.",mp:"Deep core (transverse abdominis) & rectus abdominis",ms:"Obliques, glutes",sr:"3 sets x 30-45s hold - rest 45-60s"},
  {n:"Crunch",eq:"Bodyweight",kcal:4,g:U+"2015/11/Crunch.gif",d:"Lie back, knees bent. Curl shoulders off the floor by contracting abs, don't yank your neck. Lower slow.",mp:"Rectus abdominis (upper)",ms:"Obliques",sr:"3 sets x 15-20 reps - rest 45-60s"},
  {n:"Bicycle Crunch",eq:"Bodyweight",kcal:6,g:U+"2021/02/Bicycle-Crunch.gif",d:"Opposite elbow to knee, alternating in a pedalling motion. Hits the obliques. Controlled, not rushed.",mp:"Obliques & rectus abdominis",ms:"Hip flexors",sr:"3 sets x 15-20 reps per side - rest 45-60s"},
  {n:"Cross Crunch",eq:"Bodyweight",kcal:5,g:U+"2022/07/Cross-Crunch.gif",d:"Reach across the body, twisting shoulder toward the opposite hip. Targets obliques and upper abs.",mp:"Obliques & upper abs",ms:"-",sr:"3 sets x 12-20 reps - rest 45-60s"},
  {n:"Lying Leg Raise",eq:"Bodyweight",kcal:5,g:U+"2022/08/Alternate-Leg-Raises.gif",d:"Flat on back, raise legs toward ceiling keeping them straight, lower without touching the floor. Lower abs.",mp:"Lower rectus abdominis",ms:"Hip flexors, obliques",sr:"3 sets x 12-15 reps - rest 45-60s"},
  {n:"Lying Scissor Kick",eq:"Bodyweight",kcal:6,g:U+"2021/05/Lying-Scissor-Kick.gif",d:"Legs straight, alternate small up-down kicks just off the floor. Keep lower back pressed down. Lower abs.",mp:"Lower abs",ms:"Hip flexors",sr:"3 sets x 15-20 reps - rest 45-60s"},
  {n:"Seated Leg Pull-in",eq:"Bench",kcal:5,g:U+"2021/02/Seated-Bench-Leg-Pull-in.gif",d:"Sit on bench edge, lean back slightly, pull knees toward chest then extend out. Full ab contraction.",mp:"Lower abs",ms:"Hip flexors",sr:"3 sets x 12-15 reps - rest 45-60s"},
  {n:"Mountain Climber",eq:"Bodyweight",kcal:8,g:U+"2021/02/Mountain-climber.gif",d:"High plank, drive knees toward chest one at a time, quick pace. Core + cardio. Keep hips low.",mp:"Core (rectus abdominis)",ms:"Hip flexors, shoulders (+ cardio)",sr:"3 sets x 30-45s - rest 45-60s"},
  {n:"Cross-Body Mountain Climber",eq:"Bodyweight",kcal:8,g:U+"2022/07/Cross-Body-Mountain-Climber.gif",d:"Like a mountain climber but drive each knee toward the opposite elbow. Extra oblique work.",mp:"Obliques & core",ms:"Hip flexors, shoulders",sr:"3 sets x 30-45s - rest 45-60s"},
  {n:"Standing Cable Crunch",eq:"Cable",kcal:6,g:U+"2021/09/Standing-Cable-Crunch.gif",d:"Rope behind head, crunch down by contracting abs, hips stay fixed. Loadable ab work for progressive overload.",mp:"Rectus abdominis",ms:"Obliques",sr:"3-4 sets x 10-15 reps - rest 60-90s"},
  {n:"Ab Coaster Machine",eq:"Machine",kcal:6,g:U+"2022/07/Ab-Coaster-Machine.gif",d:"Knees on pad, curl them up toward chest along the track. Machine-guided lower-ab work.",mp:"Lower abs",ms:"Hip flexors",sr:"3 sets x 12-15 reps - rest 45-60s"},
  {n:"Bear Crawl",eq:"Bodyweight",kcal:9,g:U+"2021/02/Bear-Crawl.gif",d:"On hands and toes, knees hovering, crawl forward keeping core tight and hips level. Full-body brace.",mp:"Core (anti-rotation)",ms:"Shoulders, quads",sr:"3 sets x 30-40s - rest 45-60s"},
  {n:"Body Saw Plank",eq:"Bodyweight",kcal:6,g:U+"2025/07/body-saw-plank.gif",d:"From a forearm plank, rock body forward and back using your toes. Intense anti-extension core work.",mp:"Deep core (anti-extension)",ms:"Obliques, shoulders",sr:"3 sets x 8-12 reps - rest 45-60s"},
  {n:"Side Plank Hip Adduction",eq:"Bodyweight",kcal:6,g:U+"2025/03/Side-Plank-Hip-Adduction-Copenhagen-adduction.gif",d:"Side plank position, hold the body in a straight line. Strengthens obliques and inner thigh.",mp:"Obliques",ms:"Inner thigh (adductors), glute medius",sr:"3 sets x 20-40s per side - rest 45s"},
  {n:"Dragon Flag",eq:"Bench",kcal:8,g:U+"2022/07/Leg-Raise-Dragon-Flag.gif",d:"Grip a bench overhead, raise the whole body to vertical then lower as one rigid line. Advanced ab strength.",mp:"Rectus abdominis (full) & deep core",ms:"Hip flexors, lats",sr:"3 sets x 5-8 reps - rest 60-90s"},
  {n:"Standing Stomach Vacuum",eq:"Bodyweight",kcal:3,g:U+"2025/05/Standing-Stomach-Vacuum.gif",d:"Exhale fully, pull belly button in toward spine and hold. Trains the deep transverse abdominis. Great for waistline.",mp:"Transverse abdominis (deep core)",ms:"-",sr:"3-4 sets x 15-20s hold - rest 30-45s"}
];

// Body-part libraries — derived from the verified push/pull/legs arrays (no new data)
LIB.chest     = LIB.push.slice(0,9);     // bench, incline, flyes, crossovers, pullover
LIB.shoulders = LIB.push.slice(9,16);    // presses, lateral/front raises, Arnold
LIB.triceps   = LIB.push.slice(16,22);   // pushdowns, extensions, dips, close-grip, kickback
LIB.back      = LIB.pull.slice(0,13);    // pulldowns, rows, deadlift, shrugs, face pull
LIB.biceps    = LIB.pull.slice(13,19).concat([LIB.pull[20]]); // curls + chin-up
LIB.arms      = LIB.biceps.concat(LIB.triceps); // full arm day
LIB.legsbp    = LIB.legs;                // full leg library reused

/* Three selectable plans. PPL & Upper/Lower unchanged; Body-Part added. */
const PLANS = {
  ppl: {
    label: "Push / Pull / Legs",
    note: "6-day split · each muscle 2× a week · ideal when you can train 5–6 days.",
    explainer: {
      why: "Muscles that work together train together. On push day your chest, shoulders, and triceps all fire on pressing movements, so instead of fatiguing your triceps on a separate arm day and again on chest day, you hit them once, hard, and let them fully recover. Same with pull (back + biceps) and legs. This avoids the hidden overlap that plagues body-part splits where you train chest one day and shoulders the next, but the front delts and triceps never get a real rest.",
      good: [
        "Frequency: running it twice a week (A/B) hits each muscle group 2× weekly. Research consistently shows 2× beats 1× for muscle retention and growth at equal volume — which matters most in a calorie deficit.",
        "Flexibility: if life gets in the way and you only train 3–4 days, it still works — you just rotate through the cycle. A rigid body-part week breaks if you miss a day.",
        "Recovery-friendly: legs get their own day, fully separated from upper body, so heavy leg work never compromises your pressing or pulling."
      ],
      tradeoffs: [
        "Demanding on schedule: the real benefit comes from 5–6 days a week. With a desk job, recovery and sleep become the limiter, not the workouts.",
        "Shoulders get hit a lot — front delts work on every push and assist on chest. Watch for nagging shoulder fatigue.",
        "Total beginners often build faster on full-body 3× a week first."
      ],
      bottom: "For someone who can commit to 5–6 sessions, PPL is close to ideal — arguably the best balance of frequency, recovery, and muscle retention. The biggest predictor of success isn't the split, it's recovery: sleep, protein, and not skipping legs."
    },
    days: [
      {id:"push-a",name:"Push A",type:"push",sub:"Chest · Shoulders · Triceps"},
      {id:"pull-a",name:"Pull A",type:"pull",sub:"Back · Biceps · Rear Delts"},
      {id:"legs-a",name:"Legs A",type:"legs",sub:"Quads · Hams · Glutes · Calves"},
      {id:"push-b",name:"Push B",type:"push",sub:"Chest · Shoulders · Triceps"},
      {id:"pull-b",name:"Pull B",type:"pull",sub:"Back · Biceps · Rear Delts"},
      {id:"legs-b",name:"Legs B",type:"legs",sub:"Quads · Hams · Glutes · Calves"},
      {id:"core-ppl",name:"Core / Abs",type:"core",sub:"Abs · Obliques · Deep core"},
      {id:"rest",name:"Rest Day",type:"rest",sub:"Recovery · walk · stretch"}
    ]
  },
  ul: {
    label: "Upper / Lower",
    note: "4-day split · whole body 2× a week · the fallback for busy weeks.",
    explainer: {
      why: "Everything above the waist trains on Upper days; everything below on Lower days. You cover the whole body twice a week in just four sessions by combining muscle groups into fewer, slightly longer workouts. It's the same 2×-a-week frequency that makes PPL effective, compressed into less time.",
      good: [
        "Time-efficient: four sessions instead of six, while still training each muscle 2× weekly — the frequency that drives muscle retention.",
        "The realistic fallback: when work, travel, or bad sleep makes 5–6 days impossible, you switch here and keep progressing instead of skipping days.",
        "Easier to recover from: three rest days a week means fatigue rarely piles up, which suits a busy or sleep-short schedule."
      ],
      tradeoffs: [
        "Each session is longer and more fatiguing since you're cramming more muscle groups into one workout.",
        "Slightly less focused volume per muscle than a dedicated push or pull day — fine for retention, a touch less for maximal growth.",
        "Requires honest effort: with only four days, a skipped session costs more than in a six-day plan."
      ],
      bottom: "For muscle retention during a busy stretch, upper/lower is more than enough — and for many people who can only train four days, it's genuinely the smarter pick than forcing a six-day plan. No ego in choosing it."
    },
    days: [
      {id:"upper-a",name:"Upper A",type:"upper",sub:"Chest · Back · Shoulders · Arms"},
      {id:"lower-a",name:"Lower A",type:"lower",sub:"Quads · Hams · Glutes · Calves"},
      {id:"upper-b",name:"Upper B",type:"upper",sub:"Chest · Back · Shoulders · Arms"},
      {id:"lower-b",name:"Lower B",type:"lower",sub:"Quads · Hams · Glutes · Calves"},
      {id:"core-ul",name:"Core / Abs",type:"core",sub:"Abs · Obliques · Deep core"},
      {id:"rest-ul",name:"Rest Day",type:"rest",sub:"Recovery · walk · stretch"}
    ]
  },
  bp: {
    label: "Body Part Split",
    note: "6-day split · one body part each day · the classic bodybuilder routine.",
    explainer: {
      why: "Each day targets a single muscle group — chest, back, shoulders, arms, legs, core — with high volume. Because you only train one area per session, you can pile on a lot of sets and really exhaust that muscle, then give it a full week to recover before hitting it again. It's the traditional bodybuilding approach built around maximum focus and pump per muscle.",
      good: [
        "Maximum focus: dedicating a whole session to one muscle lets you hit it from many angles with high volume in a single workout.",
        "Simple to follow: one body part per day is easy to plan and remember, which is why it's the most familiar split in any gym.",
        "Great pump and mind-muscle connection: concentrating all your energy on one area can be motivating and effective for hypertrophy when volume is high."
      ],
      tradeoffs: [
        "Low frequency: each muscle is trained only 1× a week. Research favours 2× weekly for growth and retention at equal volume, so this is less optimal on that front.",
        "Unforgiving: miss one day and that muscle goes nearly two weeks without work. A six-day commitment with no easy make-up.",
        "Not ideal in a deficit or for beginners: once-weekly stimulus is harder to hold muscle on when calories are low, and novices progress faster with more frequent full-body work."
      ],
      bottom: "The body-part split shines for intermediate-to-advanced lifters who can train six days, recover well, and want to specialise. For fat loss or limited schedules, PPL or upper/lower usually edge it out on frequency — but as a focused mass-building routine, it's a proven classic."
    },
    days: [
      {id:"bp-chest",name:"Chest Day",type:"chest",sub:"Pecs · upper & lower chest"},
      {id:"bp-back",name:"Back Day",type:"back",sub:"Lats · traps · rhomboids"},
      {id:"bp-shoulders",name:"Shoulder Day",type:"shoulders",sub:"Front · side · rear delts"},
      {id:"bp-arms",name:"Arms Day",type:"arms",sub:"Biceps · triceps"},
      {id:"bp-legs",name:"Leg Day",type:"legsbp",sub:"Quads · hams · glutes · calves"},
      {id:"bp-core",name:"Core / Abs",type:"core",sub:"Abs · obliques · deep core"},
      {id:"rest-bp",name:"Rest Day",type:"rest",sub:"Recovery · walk · stretch"}
    ]
  }
};
let currentPlan = "ppl";
function DAYS(){ return PLANS[currentPlan].days; }

/* ---- persistent state (localStorage) ---- */
const STORAGE_KEY = "jfit-state-v1";
let state = {
  selected: {},        // dayId -> array of exercise indices
  done: {},            // dayId -> true
  exStatus: {},        // dayId -> { exIdx: 'pending'|'active'|'done' }
  kcalBurned: 0,
  doneCount: 0
};
let currentDay = null;
let session = null;
let timerInt = null;

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, currentPlan }));
  }catch(e){}
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const data = JSON.parse(raw);
    if(data && data.state){
      state = Object.assign(state, data.state);
      if(data.currentPlan && PLANS[data.currentPlan]) currentPlan = data.currentPlan;
    }
  }catch(e){}
}
// Persist on backgrounding / closing (reliable on mobile + desktop) and periodically.
document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState==="hidden") saveState(); });
window.addEventListener("pagehide", saveState);
window.addEventListener("beforeunload", saveState);
setInterval(saveState, 2000);

/* ---- render home ---- */
function renderHome(){
  // plan toggle state
  document.getElementById("plan-note").textContent = PLANS[currentPlan].note;
  renderExplainer();
  document.getElementById("tab-ppl").classList.toggle("on", currentPlan==="ppl");
  document.getElementById("tab-ul").classList.toggle("on", currentPlan==="ul");
  document.getElementById("tab-bp").classList.toggle("on", currentPlan==="bp");

  const list = document.getElementById("day-list");
  list.innerHTML = "";
  const days = DAYS();
  const trainDays = days.filter(d=>d.type!=="rest").length;
  days.forEach(d=>{
    const card = document.createElement("div");
    card.className="day-card";
    const color = d.type==="push"?"var(--push)":d.type==="pull"?"var(--pull)":
                  d.type==="legs"?"var(--legs)":d.type==="upper"?"var(--acc)":
                  d.type==="lower"?"var(--legs)":d.type==="core"?"var(--gold)":
                  d.type==="chest"?"var(--push)":d.type==="back"?"var(--pull)":
                  d.type==="shoulders"?"var(--gold)":d.type==="arms"?"var(--acc)":
                  d.type==="legsbp"?"var(--legs)":"#555";
    const isDone = state.done[d.id];
    const selCount = (state.selected[d.id]||[]).length;
    let status = "";
    if(d.type==="rest"){ status=`<span class="pill rest">Recovery</span>`; }
    else if(isDone){ status=`<span class="pill done">✓ Completed</span>`; }
    else if(selCount){ status=`<span class="pill ${d.type}">${selCount} exercises ready</span>`; }
    else { status=`<span class="pill ${d.type}">Tap to build</span>`; }
    card.innerHTML=`
      <div class="tag" style="background:${color}"></div>
      <div class="info">
        <h3>${d.name}</h3>
        <p>${d.sub}</p>
        ${status}
      </div>
      <div class="chev">›</div>`;
    if(d.type!=="rest") card.onclick=()=>openBuilder(d);
    else card.onclick=()=>toast("Rest day — get your 7–8h sleep & a walk 🚶");
    list.appendChild(card);
  });
  // progress counts only days completed in the CURRENT plan
  const doneInPlan = days.filter(d=>state.done[d.id]).length;
  document.getElementById("stat-week").textContent = state.doneCount;
  document.getElementById("stat-kcal").textContent = state.kcalBurned;

  const heroProg = document.getElementById("hero-prog");
  if(typeof JStore!=="undefined" && JStore.hasProfile()){
    const p = JStore.getProfile();
    const cur = JStore.currentWeight();
    const goalEl = document.getElementById("hero-goal");
    if(goalEl && cur!=null && p.goalWeightKg!=null) goalEl.textContent = `${cur} → ${p.goalWeightKg}`;
    const bmr = Health.bmr({sex:p.sex,age:p.age,heightCm:p.heightCm,weightKg:cur});
    const tgt = Health.dailyTarget(Health.tdee(bmr,p.activity), p.goalType, p.targetRateKgPerWk, p.sex);
    const tEl = document.getElementById("stat-target"); if(tEl && tgt) tEl.textContent = tgt.target;
    const badge = document.getElementById("hero-badge");
    if(badge) badge.textContent = p.goalType==="lose"?"Fat loss":p.goalType==="gain"?"Muscle gain":"Maintain";
    if(heroProg && p.goalWeightKg!=null && p.startWeightKg!=null){
      const denom = p.startWeightKg - p.goalWeightKg;
      const pct = denom!==0 ? ((p.startWeightKg - cur)/denom)*100 : 0;
      heroProg.style.width = Math.max(0,Math.min(100,pct)).toFixed(0)+"%";
    } else if(heroProg){
      heroProg.style.width = Math.min(100,(doneInPlan/trainDays*100))+"%";
    }
  } else if(heroProg){
    heroProg.style.width = Math.min(100,(doneInPlan/trainDays*100))+"%";
  }
}

function switchPlan(p){
  if(currentPlan===p) return;
  currentPlan = p;
  // collapse explainer when switching so each split starts tidy
  document.getElementById("explainer").classList.remove("open");
  renderHome();
  toast("Switched to " + PLANS[p].label);
}

/* ---- Split explainer ---- */
function renderExplainer(){
  const e = PLANS[currentPlan].explainer;
  if(!e){ document.getElementById("exp-body").innerHTML=""; return; }
  const good = e.good.map(x=>`<li class="g">${x}</li>`).join("");
  const bad  = e.tradeoffs.map(x=>`<li class="b">${x}</li>`).join("");
  document.getElementById("exp-body").innerHTML = `
    <div class="exp-inner">
      <h4 class="why">The idea</h4>
      <p>${e.why}</p>
      <h4 class="good">Why it works</h4>
      <ul>${good}</ul>
      <h4 class="bad">Honest trade-offs</h4>
      <ul>${bad}</ul>
      <div class="exp-bottom"><p>${e.bottom}</p></div>
    </div>`;
}
function toggleExplainer(){
  document.getElementById("explainer").classList.toggle("open");
}

/* ---- builder ---- */
function openBuilder(day){
  currentDay = day;
  if(!state.selected[day.id]) state.selected[day.id]=[];
  document.getElementById("b-title").textContent = day.name;
  showScreen("builder");
  const list = document.getElementById("ex-list");
  list.innerHTML="";
  LIB[day.type].forEach((ex,i)=>{
    const sel = state.selected[day.id].includes(i);
    const card = document.createElement("div");
    card.className="ex-card"+(sel?" sel":"");
    card.id="ex-"+i;
    card.innerHTML=`
      <div class="ex-main" onclick="toggleEx(${i})">
        <div style="position:relative;flex-shrink:0" onclick="event.stopPropagation();openLightbox('${ex.g}','${ex.n.replace(/'/g,"")}')"><img class="ex-gif" loading="lazy" src="${ex.g}" alt="${ex.n}" data-file="${ex.g}" onerror="gifFallback(this)"><div class="gifph" style="display:none;position:absolute;inset:0;border-radius:12px;background:#21262d;place-items:center;font-size:24px">🏋️</div><div class="zoom-hint">⤢</div></div>
        <div class="ex-meta">
          <h4>${ex.n}</h4>
          <div class="ex-muscle">🎯 ${ex.mp}</div>
          <div class="ex-tags">
            <span class="mtag eq">${ex.eq}</span>
            <span class="mtag sr">${ex.sr}</span>
            <span class="mtag kcal">~${ex.kcal} kcal/set</span>
          </div>
        </div>
        <div class="checkbox">${sel?"✓":""}</div>
      </div>
      <span class="expand-toggle" onclick="toggleInfo(${i})">Details ⌄</span>
      <div class="ex-expand hidden" id="info-${i}">
        <div class="ex-detrow"><b>Targets</b> ${ex.mp}</div>
        <div class="ex-detrow"><b>Also works</b> ${ex.ms}</div>
        <div class="ex-detrow"><b>Sets &times; reps</b> ${ex.sr}</div>
        <div class="ex-detrow"><b>Form</b> ${ex.d}</div>
      </div>`;
    list.appendChild(card);
  });
  updateSelBar();
}

function toggleInfo(i){
  const el=document.getElementById("info-"+i);
  el.classList.toggle("hidden");
}

function toggleEx(i){
  const arr = state.selected[currentDay.id];
  const idx = arr.indexOf(i);
  if(idx>-1){ arr.splice(idx,1); }
  else {
    if(arr.length>=6){ toast("Max 6 exercises per day"); return; }
    arr.push(i);
  }
  const card=document.getElementById("ex-"+i);
  const sel=arr.includes(i);
  card.classList.toggle("sel",sel);
  card.querySelector(".checkbox").textContent = sel?"✓":"";
  updateSelBar();
}

function updateSelBar(){
  const arr = state.selected[currentDay.id]||[];
  document.getElementById("sel-n").textContent=arr.length;
  let kc=0; arr.forEach(i=>kc+=LIB[currentDay.type][i].kcal*4); // ~4 sets each
  document.getElementById("sel-kcal").textContent=kc;
  const btn=document.getElementById("start-btn");
  btn.disabled = arr.length<1;
  btn.textContent = arr.length<5 ? `Start (${arr.length} — pick 5–6 ideal)` : `Start Workout (${arr.length})`;
  renderTodaysPlan();
}

/* ---- Today's Plan group (per section) ---- */
function renderTodaysPlan(){
  const arr = state.selected[currentDay.id]||[];
  if(!state.exStatus[currentDay.id]) state.exStatus[currentDay.id]={};
  const st = state.exStatus[currentDay.id];
  const wrap = document.getElementById("tp-items");
  const empty = document.getElementById("tp-empty");
  const reset = document.getElementById("tp-reset");
  document.getElementById("tp-count").textContent = arr.length;
  wrap.innerHTML="";
  if(!arr.length){ empty.style.display="block"; reset.style.display="none"; return; }
  empty.style.display="none"; reset.style.display="inline-block";
  arr.forEach((exIdx,pos)=>{
    const ex = LIB[currentDay.type][exIdx];
    const status = st[exIdx]||"pending";
    const row = document.createElement("div");
    row.className="tp-item status-"+status;
    let btn;
    if(status==="done"){
      btn = `<button class="tp-btn done" onclick="cycleStatus(${exIdx})">✓ Done</button>`;
    } else if(status==="active"){
      btn = `<button class="tp-btn active" onclick="cycleStatus(${exIdx})">● Mark Done</button>`;
    } else {
      btn = `<button class="tp-btn start" onclick="cycleStatus(${exIdx})">▶ Start</button>`;
    }
    row.innerHTML=`
      <div class="tpi-num">${pos+1}</div>
      <img loading="lazy" src="${ex.g}" data-file="${ex.g}" alt="${ex.n}"
        onclick="openLightbox('${ex.g}','${ex.n.replace(/'/g,"")}')" onerror="gifFallback(this)">
      <div class="tpi-info"><h5>${ex.n}</h5><span>🎯 ${ex.mp}</span><span>${ex.sr}</span></div>
      <div class="tpi-actions">
        ${btn}
        <button class="tp-del" onclick="removeFromToday(${exIdx})" title="Remove">✕</button>
      </div>`;
    wrap.appendChild(row);
  });
  // progress summary
  const doneN = arr.filter(i=>st[i]==="done").length;
  document.getElementById("tp-count").textContent = doneN+"/"+arr.length;
}

/* pending -> active (start) -> done -> pending */
function cycleStatus(exIdx){
  if(!state.exStatus[currentDay.id]) state.exStatus[currentDay.id]={};
  const st = state.exStatus[currentDay.id];
  const cur = st[exIdx]||"pending";
  st[exIdx] = cur==="pending" ? "active" : cur==="active" ? "done" : "pending";
  if(st[exIdx]==="active") toast("▶ Started — "+LIB[currentDay.type][exIdx].n);
  if(st[exIdx]==="done")   toast("✓ Done — "+LIB[currentDay.type][exIdx].n);
  renderTodaysPlan();
  // if all done, mark the day complete + tally calories once
  const arr = state.selected[currentDay.id]||[];
  if(arr.length && arr.every(i=>st[i]==="done") && !state.done[currentDay.id]){
    state.done[currentDay.id]=true; state.doneCount++;
    let kc=0; arr.forEach(i=>kc+=LIB[currentDay.type][i].kcal*4);
    state.kcalBurned+=kc;
    if(typeof JStore!=="undefined") JStore.addCaloriesToday(kc);
    toast("💪 "+currentDay.name+" complete · "+kc+" kcal!");
  }
}

/* ---- Lightbox (enlarge GIF) ---- */
function openLightbox(src,name){
  const img = document.getElementById("lb-img");
  const ph = document.getElementById("lb-ph");
  img.style.display="block"; ph.style.display="none";
  img.dataset.file = src; img.dataset.try = 0;
  img.src = src;
  document.getElementById("lb-cap").textContent = name||"";
  document.getElementById("lightbox").classList.add("show");
}
// retry alternate folders in the lightbox; show placeholder if all fail
function lbFallback(img){
  try{
    const file=(img.dataset.file||"").split("/").pop();
    let n=parseInt(img.dataset.try||"0",10);
    if(file && n<ALT_FOLDERS.length){ img.dataset.try=n+1; img.src=U+ALT_FOLDERS[n]+file; return; }
  }catch(e){}
  img.style.display="none";
  document.getElementById("lb-ph").style.display="flex";
}
function closeLightbox(e){
  if(e && e.target && e.target.id==="lb-img") return;
  document.getElementById("lightbox").classList.remove("show");
  document.getElementById("lb-img").src="";
}

function removeFromToday(exIdx){
  const arr = state.selected[currentDay.id];
  const i = arr.indexOf(exIdx);
  if(i>-1) arr.splice(i,1);
  if(state.exStatus[currentDay.id]) delete state.exStatus[currentDay.id][exIdx];
  // un-highlight in library
  const card=document.getElementById("ex-"+exIdx);
  if(card){ card.classList.remove("sel"); const cb=card.querySelector(".checkbox"); if(cb) cb.textContent=""; }
  updateSelBar();
  toast("Removed from today's plan");
}

function resetToday(){
  if(!(state.selected[currentDay.id]||[]).length) return;
  if(confirm("Reset today's "+currentDay.name+" plan? This clears all selected exercises.")){
    state.selected[currentDay.id]=[];
    state.exStatus[currentDay.id]={};
    // clear all library highlights
    document.querySelectorAll(".ex-card.sel").forEach(c=>{
      c.classList.remove("sel"); const cb=c.querySelector(".checkbox"); if(cb) cb.textContent="";
    });
    updateSelBar();
    toast("Today's plan reset");
  }
}

/* ---- session ---- */
function startSession(){
  const arr = state.selected[currentDay.id];
  if(!arr.length) return;
  session = {
    day: currentDay,
    ex: arr.map(i=>LIB[currentDay.type][i]),
    cur: 0,
    sets: arr.map(()=>[false,false,false,false]),
    start: Date.now()
  };
  document.getElementById("s-title").textContent = currentDay.name;
  showScreen("session");
  renderSessionEx();
  timerInt = setInterval(updateTimer,1000);
  updateTimer();
}

function updateTimer(){
  const s = Math.floor((Date.now()-session.start)/1000);
  const m = String(Math.floor(s/60)).padStart(2,"0");
  const ss = String(s%60).padStart(2,"0");
  document.getElementById("s-timer").textContent=`${m}:${ss}`;
}

function renderSessionEx(){
  const ex = session.ex[session.cur];
  document.getElementById("s-prog").textContent=`Exercise ${session.cur+1} of ${session.ex.length}`;
  const sets = session.sets[session.cur];
  let setHtml="";
  sets.forEach((done,si)=>{
    setHtml+=`<div class="setrow ${done?'done':''}" onclick="toggleSet(${si})">
      <div class="sn">${si+1}</div>
      <div class="si">Set ${si+1} · 8–12 reps</div>
      <div class="sc">${done?'✓':''}</div></div>`;
  });
  document.getElementById("s-card").innerHTML=`
    <div style="position:relative;display:inline-block;width:100%;max-width:240px;margin:0 auto 12px" onclick="openLightbox('${ex.g}','${ex.n.replace(/'/g,"")}')"><img src="${ex.g}" data-file="${ex.g}" alt="${ex.n}" style="width:100%;border-radius:14px;background:#fff;display:block" onerror="gifFallback(this)"><div class="gifph" style="display:none;position:absolute;inset:0;border-radius:14px;background:#21262d;place-items:center;font-size:40px">🏋️</div><div class="zoom-hint">⤢</div></div>
    <h2>${ex.n}</h2>
    <div class="ex-tags" style="justify-content:center;margin-top:8px">
      <span class="mtag eq">${ex.eq}</span>
      <span class="mtag sr">${ex.sr}</span>
      <span class="mtag kcal">~${ex.kcal} kcal/set</span>
    </div>
    <div class="s-muscle">🎯 <b>${ex.mp}</b>${ex.ms&&ex.ms!=="-"?` · also ${ex.ms}`:""}</div>
    <div class="setlist">${setHtml}</div>
    <div style="font-size:12px;color:var(--mut);margin-top:12px;line-height:1.5;text-align:left">
      <b style="color:var(--txt)">Recommended:</b> ${ex.sr}<br>
      <b style="color:var(--txt)">Form:</b> ${ex.d}</div>`;
  const isLast = session.cur===session.ex.length-1;
  document.getElementById("s-next").textContent = isLast?"Finish ✓":"Next ›";
  document.getElementById("s-next").className = "btn "+(isLast?"btn-grn":"btn-primary");
}

function toggleSet(si){
  session.sets[session.cur][si]=!session.sets[session.cur][si];
  renderSessionEx();
}
function prevEx(){ if(session.cur>0){session.cur--;renderSessionEx();} }
function nextEx(){
  if(session.cur<session.ex.length-1){ session.cur++; renderSessionEx(); }
  else finishSession();
}

function finishSession(){
  clearInterval(timerInt);
  // tally kcal from completed sets
  let kc=0;
  session.ex.forEach((ex,ei)=>{
    session.sets[ei].forEach(d=>{ if(d) kc+=ex.kcal; });
  });
  if(kc===0) kc = session.ex.reduce((a,e)=>a+e.kcal*4,0); // assume done
  state.kcalBurned += kc;
  if(typeof JStore!=="undefined") JStore.addCaloriesToday(kc);
  if(!state.done[session.day.id]){ state.done[session.day.id]=true; state.doneCount++; }
  toast(`💪 ${session.day.name} done · ${kc} kcal burned!`);
  session=null;
  goHome();
}

function quitSession(){
  if(confirm("Quit this workout? Progress won't be saved.")){
    clearInterval(timerInt); session=null; goHome();
  }
}

/* ---- nav helpers ---- */
function showScreen(s){
  ["home","builder","session","plan","dash","profile"].forEach(x=>
    document.getElementById("screen-"+x).classList.toggle("hidden",x!==s));
  window.scrollTo(0,0);
}
function goHome(){ renderHome(); showScreen("home"); setNav("home"); }
function nav(s){
  if(s==="home"){ renderHome(); showScreen("home"); }
  if(s==="plan"){ showScreen("plan"); }
  if(s==="dash"){ if(typeof renderDashboard==="function") renderDashboard(); showScreen("dash"); }
  if(s==="profile"){ if(typeof renderProfile==="function") renderProfile(); showScreen("profile"); }
  setNav(s);
}
function setNav(s){
  ["home","dash","plan","profile"].forEach(k=>{
    const el=document.getElementById("nav-"+k);
    if(el) el.classList.toggle("on",s===k);
  });
}

let toastT;
function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg; t.classList.add("show");
  clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove("show"),2600);
}

loadState();
renderHome();

/* ---- PWA: logo, install prompt, offline service worker ---- */
(function(){
  const ico = document.querySelector('link[rel="apple-touch-icon"]');
  if(ico) document.getElementById('brand-logo').src = ico.href;
})();

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  const b = document.getElementById('install-btn');
  if(b) b.style.display = 'inline-block';
});
async function installApp(){
  if(!deferredPrompt){
    toast("On iPhone: tap Share ⤴ then 'Add to Home Screen'");
    return;
  }
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('install-btn').style.display = 'none';
  if(outcome === 'accepted') toast("Installing JFit…");
}
window.addEventListener('appinstalled', ()=>{
  document.getElementById('install-btn').style.display = 'none';
  toast("JFit installed! 💪");
});

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  });
}
