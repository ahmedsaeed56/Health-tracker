/* Sehat Log · Gym tab
   Exercise library, equipment guide, automatic beginner-friendly plan, editable final plan,
   workout logging with calories (MET × kg × hours), and history. Data stays on this device. */
(function(){
"use strict";
const GKEY = "cutlog.gym";
const EX = window.GYM_EX || [];
const EXI = {}; EX.forEach(e => EXI[e.id] = e);
const S = window.SEHAT || {};

/* ---------------- equipment ---------------- */
// k: key used by exercises · local: what people call it in Pakistani gyms
const EQUIP = [
 // cardio
 {k:"treadmill", g:"Cardio machines", n:"Treadmill", local:"Running machine / treadmill", ex:"Walking_Treadmill",
  what:"A moving belt for walking, incline walking, jogging or running. The safest cardio machine for beginners and heavier bodies when used for incline walking.",
  how:["Clip the safety key to your clothes before starting.","Start at 3–4 km/h, then raise speed to a brisk walk (5–6 km/h).","Add incline (3–8%) instead of running: it burns much more without the joint impact.","To stop, lower the speed gradually and step off only when the belt has stopped."],
  tip:"Incline walking at 5–6 km/h and 5–8% incline is the best fat-loss cardio for most beginners.", bad:"Holding the handrails tightly while walking on a high incline. It cuts the work (and calories) roughly in half and hurts your posture. Lower the incline instead."},
 {k:"bike", g:"Cardio machines", n:"Stationary bike (upright)", local:"Cycle / exercise cycle", ex:"Bicycling_Stationary",
  what:"Seated pedalling with adjustable resistance. Very low impact on knees and back, so it's ideal at a high body weight.",
  how:["Set seat height so your knee is slightly bent (about 25°) when the pedal is at the bottom.","Start at a low level for 5 minutes, then raise resistance until breathing is fast but you can still talk.","Keep 70–90 pedal turns per minute."],
  tip:"20–40 minutes at moderate resistance is a great cardio day.", bad:"A seat that is too low, which strains the knees."},
 {k:"recumbent", g:"Cardio machines", n:"Recumbent bike", local:"Back-support cycle", ex:"Recumbent_Bike",
  what:"A bike with a reclined seat and back support. The easiest on the back and knees of any cardio machine.",
  how:["Sit back fully against the seat.","Adjust the seat so the knee is slightly bent at the furthest pedal point.","Pedal at a steady pace and raise the level slowly."],
  tip:"Best choice on days when your back or knees feel sore.", bad:"Going so light that you can sing. It needs real effort to count."},
 {k:"elliptical", g:"Cardio machines", n:"Elliptical / cross trainer", local:"Cross trainer", ex:"Elliptical_Trainer",
  what:"Standing pedals that move in an oval, plus moving handles. Full-body and low impact.",
  how:["Step on while holding the fixed handles, then switch to the moving handles.","Stand tall and push through your whole foot.","Use resistance, not just speed."],
  tip:"Good when the treadmill is busy. Use the moving handles to involve the arms.", bad:"Leaning on the handles and spinning fast on zero resistance."},
 {k:"rower", g:"Cardio machines", n:"Rowing machine", local:"Rowing machine", ex:"Rowing_Stationary",
  what:"Pull a handle while sliding back on a seat. Works legs, back and arms together.",
  how:["Order on the way back: legs push → lean back slightly → arms pull to the lower ribs.","Return in reverse: arms → body → knees bend.","Most of the power comes from the legs."],
  tip:"Damper (fan setting) around 3–5. Higher is not better.", bad:"Pulling mostly with the arms and rounding the back."},
 {k:"stair", g:"Cardio machines", n:"Stair climber / step mill", local:"Stair machine", ex:"Stairmaster",
  what:"Endless stairs. Very hard and very effective, but tough on knees at a high body weight.",
  how:["Start slow, stand upright, use the rails only for balance.","Step with your whole foot on each stair."],
  tip:"Add it later, once 30 minutes of incline walking feels easy.", bad:"Leaning over the rails with locked arms, which removes most of the work."},
 {k:"jumprope", g:"Cardio machines", n:"Skipping rope", local:"Rassi / skipping rope", ex:"Rope_Jumping",
  what:"Cheap, portable, very high calorie burn, but it is high impact.",
  how:["Jump only 2–3 cm off the floor, landing softly on the balls of your feet.","Turn the rope with your wrists, not your whole arms."],
  tip:"Not for the first months at a high body weight. Use incline walking instead.", bad:"Jumping high and landing heavily."},
 {k:"ropes", g:"Cardio machines", n:"Battle ropes", local:"Battle rope", ex:"Battling_Ropes",
  what:"Heavy ropes you wave in waves or slams. Short, intense conditioning with no impact on the joints.",
  how:["Stand in a half-squat, back straight.","Make waves with fast alternating arms for 20–30 seconds, then rest 30–60 seconds."],
  tip:"A great 5-minute finisher after weights.", bad:"Standing straight and using only the arms; the legs should stay bent and braced."},
 // free weights
 {k:"dumbbell", g:"Free weights", n:"Dumbbells", local:"Dumbbell", ex:"Dumbbell_Bench_Press",
  what:"Hand weights. The most useful tool in any gym: every muscle can be trained with them, and each side works on its own.",
  how:["Pick a weight you can lift 12–15 times with good form, with 2–3 reps left in you.","Lift from the floor with your legs, not your back.","Put them back on the rack after use."],
  tip:"Start with dumbbells instead of the barbell for presses and rows; they are safer to learn with.", bad:"Choosing weights to impress others and swinging them with bad form."},
 {k:"barbell", g:"Free weights", n:"Barbell (Olympic bar) and plates", local:"Rod and plates", ex:"Barbell_Squat",
  what:"A long bar (usually 20 kg) loaded with plates. Best for heavy squats, deadlifts and presses once your form is good.",
  how:["Always use collars (clips) to lock the plates.","Load both sides equally.","Learn each lift with the empty bar or a light bar first."],
  tip:"Leave barbell squats and deadlifts for after 4–8 weeks of machines and dumbbells.", bad:"Lifting without collars, and ego-loading before learning the movement."},
 {k:"ezbar", g:"Free weights", n:"EZ curl bar", local:"Zig-zag rod", ex:"EZ-Bar_Curl",
  what:"A short bar with angled handles, easier on wrists and elbows for curls and triceps work.",
  how:["Hold the angled parts so your wrists sit at a natural angle.","Use it for curls, skull crushers and upright rows."], tip:"Kinder to the elbows than a straight bar.", bad:"Swinging the body to lift it."},
 {k:"kettlebell", g:"Free weights", n:"Kettlebell", local:"Kettlebell", ex:"One-Arm_Kettlebell_Swings",
  what:"A ball-shaped weight with a handle. Great for goblet squats and swings.",
  how:["For swings, the power comes from snapping the hips forward, not from lifting with the arms.","Keep your back flat all the time."], tip:"Goblet squats with a kettlebell teach good squat form.", bad:"Turning a swing into a squat or an arm raise."},
 {k:"plates", g:"Free weights", n:"Weight plates", local:"Plates", ex:"Plate_Twist",
  what:"Loose plates can also be held for twists, raises or carries.", how:["Grip firmly with both hands at the edges."], tip:"Handy when dumbbells are busy.", bad:"Holding them by a fingertip grip."},
 {k:"medball", g:"Free weights", n:"Medicine ball", local:"Medicine ball", ex:"Medicine_Ball_Chest_Pass",
  what:"A weighted ball for throws, slams and core work.", how:["Throw against a solid wall or to a partner."], tip:"Fun way to add power work.", bad:"Throwing it near other people's heads."},
 // benches & racks
 {k:"bench", g:"Benches and racks", n:"Flat / adjustable bench", local:"Bench", ex:"Incline_Dumbbell_Press",
  what:"Needed for presses, rows and many dumbbell exercises. Adjustable benches tilt for incline work.",
  how:["Check the pin is fully locked before sitting.","Flat for bench press, 30–45° for incline press."], tip:"Wipe it after use.", bad:"Using a wobbly bench or an unlocked angle."},
 {k:"rack", g:"Benches and racks", n:"Squat rack / power rack", local:"Squat rack", ex:"Barbell_Squat",
  what:"A frame that holds the barbell at shoulder height and has safety bars to catch it.",
  how:["Set the J-hooks at mid-chest height.","Set safety bars just below your lowest squat position."], tip:"Always squat inside the rack with safeties set.", bad:"Squatting heavy without safety bars."},
 {k:"smith", g:"Benches and racks", n:"Smith machine", local:"Smith machine", ex:"Smith_Machine_Squat",
  what:"A barbell fixed on rails, so it can only move up and down. Safer for beginners pressing or squatting alone.",
  how:["Twist the bar to unhook and re-hook it.","Set the safety stops before you start."], tip:"Useful for incline press and squats when you train without a spotter.", bad:"Placing the feet directly under the bar for squats; put them slightly forward."},
 {k:"preacher", g:"Benches and racks", n:"Preacher curl bench", local:"Preacher bench", ex:"Preacher_Curl",
  what:"An angled pad that stops you swinging during curls.", how:["The armpit sits at the top of the pad.","Lower slowly until the arm is almost straight."], tip:"Go lighter than normal curls.", bad:"Dropping the weight fast at the bottom, which strains the elbow."},
 {k:"abbench", g:"Benches and racks", n:"Ab / sit-up bench", local:"Abs bench", ex:"Decline_Crunch",
  what:"An angled bench with foot rollers for crunches and leg raises.", how:["Hook your feet, cross your arms, curl up by squeezing the stomach."], tip:"Planks and dead bugs first; the decline bench comes later.", bad:"Pulling the neck with the hands."},
 {k:"hyper", g:"Benches and racks", n:"Back extension (Roman chair)", local:"Hyper / back extension", ex:"Hyperextensions_Back_Extensions",
  what:"Strengthens the lower back, glutes and hamstrings.", how:["Pad at your hip bones, body straight.","Lower until you feel a stretch, then rise to a straight line, not further."], tip:"Good for back health when done slowly.", bad:"Over-arching at the top or jerking up fast."},
 {k:"pullbar", g:"Benches and racks", n:"Pull-up bar", local:"Chin-up bar", ex:"Pullups",
  what:"For pull-ups, chin-ups and hanging leg raises.", how:["Start with lat pulldowns or band-assisted pull-ups.","Pull your chest towards the bar, shoulders down."], tip:"Even a 20-second hang builds grip and shoulder health.", bad:"Kipping or swinging to get the chin over."},
 {k:"dip", g:"Benches and racks", n:"Dip station / parallel bars", local:"Dips stand", ex:"Dips_-_Chest_Version",
  what:"For dips (chest and triceps) and knee raises.", how:["Lower only until upper arms are parallel to the floor."], tip:"Use bench dips or the triceps machine first if you're heavy.", bad:"Going too deep, which strains the shoulders."},
 {k:"box", g:"Benches and racks", n:"Step / plyo box", local:"Step box", ex:"Dumbbell_Step_Ups",
  what:"For step-ups and (later) box jumps.", how:["Start with a low step (20–30 cm)."], tip:"Step-ups are great knee-friendly leg work.", bad:"Pushing off the bottom foot instead of the top one."},
 // machines
 {k:"legpress", g:"Machines", n:"Leg press", local:"Leg press", ex:"Leg_Press",
  what:"Pushes a weighted sled with your legs while your back is supported. The safest heavy leg exercise for beginners.",
  how:["Feet shoulder-width in the middle of the platform.","Lower until knees are about 90°, keeping your lower back on the pad.","Press up without locking the knees."], tip:"Your first main leg exercise.", bad:"Going so deep that your hips lift off the seat, or locking the knees straight."},
 {k:"hack", g:"Machines", n:"Hack squat machine", local:"Hack squat", ex:"Hack_Squat",
  what:"A guided squat on an angled sled. Heavy quad work with back support.", how:["Shoulders under the pads, feet mid-platform.","Lower under control."], tip:"After a few weeks of leg press.", bad:"Heels lifting off the platform."},
 {k:"legext", g:"Machines", n:"Leg extension", local:"Leg extension", ex:"Leg_Extensions",
  what:"Isolates the front thigh (quads).", how:["Knee in line with the machine's pivot.","Lift to straight, lower slowly in 2–3 seconds."], tip:"Use moderate weights; heavy jerky reps irritate knees.", bad:"Kicking the weight up fast."},
 {k:"legcurl", g:"Machines", n:"Leg curl (lying or seated)", local:"Leg curl", ex:"Lying_Leg_Curls",
  what:"Isolates the back of the thigh (hamstrings).", how:["Pad just above the heels.","Curl, squeeze, lower slowly."], tip:"Balances leg-press and leg-extension work.", bad:"Lifting the hips off the pad."},
 {k:"calf", g:"Machines", n:"Calf raise machine", local:"Calf machine", ex:"Standing_Calf_Raises",
  what:"Trains the calves (standing or seated).", how:["Full stretch at the bottom, pause, rise high on the toes."], tip:"Slow reps work far better than bouncing.", bad:"Bouncing through short reps."},
 {k:"abductor", g:"Machines", n:"Hip abductor / adductor", local:"Inner/outer thigh machine", ex:"Thigh_Abductor",
  what:"Outer-thigh (abductor) and inner-thigh (adductor) machine.", how:["Move slowly and control the return."], tip:"Strengthens hips and helps knee stability. It does not burn thigh fat specifically.", bad:"Believing it removes fat from the thighs (spot reduction is a myth)."},
 {k:"chestpress", g:"Machines", n:"Chest press machine", local:"Chest press", ex:"Machine_Bench_Press",
  what:"A guided pressing movement for the chest, shoulders and triceps. Easy and safe to learn.", how:["Handles level with mid-chest.","Push forward, don't lock the elbows hard, return slowly."], tip:"Perfect first chest exercise.", bad:"Seat set so the handles are at neck height."},
 {k:"pecdeck", g:"Machines", n:"Pec deck / butterfly (and reverse)", local:"Butterfly machine", ex:"Butterfly",
  what:"Chest fly (facing out) or rear shoulders (facing the pad).", how:["Elbows slightly bent and fixed; bring the hands together in an arc."], tip:"Use the reverse setting for posture (rear delts).", bad:"Letting the arms go too far back, which strains the shoulder."},
 {k:"shoulderpress", g:"Machines", n:"Shoulder press machine", local:"Shoulder press", ex:"Machine_Shoulder_Military_Press",
  what:"A guided overhead press.", how:["Handles at shoulder height, press up, lower to ear level."], tip:"Safer than barbell overhead pressing to start.", bad:"Arching the lower back to push."},
 {k:"latpull", g:"Machines", n:"Lat pulldown", local:"Lat machine / lat pull", ex:"Wide-Grip_Lat_Pulldown",
  what:"Pulls a bar down to the chest. Builds the back and prepares you for pull-ups.", how:["Thighs under the pads.","Pull the bar to your upper chest, leaning back slightly.","Let it rise slowly until the arms are straight."], tip:"Think of pulling the elbows down to your pockets.", bad:"Pulling behind the neck or leaning far back and yanking."},
 {k:"cablerow", g:"Machines", n:"Seated cable row", local:"Seated row", ex:"Seated_Cable_Rows",
  what:"Pulls a handle to your stomach while seated. Builds the middle back.", how:["Sit tall, knees slightly bent.","Pull to the stomach, squeeze shoulder blades, return slowly."], tip:"Pair it with every pressing day for good posture.", bad:"Rocking the whole body back and forth."},
 {k:"rowmachine", g:"Machines", n:"Chest-supported row machine", local:"Row machine", ex:"Leverage_High_Row",
  what:"A row with chest support, so the lower back is protected.", how:["Chest against the pad, pull the handles back, squeeze."], tip:"Great if bent-over rows hurt your back.", bad:"Lifting the chest off the pad."},
 {k:"tbar", g:"Machines", n:"T-bar row", local:"T-bar", ex:"T-Bar_Row_with_Handle",
  what:"A heavy row with the bar fixed at one end.", how:["Hinge forward with a flat back, pull to the stomach."], tip:"An intermediate exercise; learn dumbbell rows first.", bad:"Rounding the lower back."},
 {k:"cable", g:"Machines", n:"Cable crossover station", local:"Cable machine / crossover", ex:"Triceps_Pushdown",
  what:"Adjustable pulleys for dozens of exercises: pushdowns, face pulls, flies, crunches, curls.", how:["Set the pulley height for the exercise.","Choose the attachment: rope, straight bar or single handle."], tip:"Cables keep tension through the whole movement, which is easy on joints.", bad:"Standing too close, so the weight stack bangs."},
 {k:"armmachine", g:"Machines", n:"Bicep / triceps machine", local:"Biceps machine", ex:"Machine_Bicep_Curl",
  what:"Guided arm curls or extensions.", how:["Elbows on the pad in line with the pivot; move slowly."], tip:"Easy to learn.", bad:"Rushing the reps."},
 // accessories
 {k:"bands", g:"Accessories", n:"Resistance bands", local:"Band / tube", ex:"Band_Pull_Apart",
  what:"Elastic bands for warm-ups, assisted pull-ups, rows and glute work, at home or in the gym.", how:["Anchor securely; check the band for cracks before use."], tip:"Cheap and perfect for home and travel.", bad:"Letting the band snap back."},
 {k:"abwheel", g:"Accessories", n:"Ab wheel", local:"Ab roller", ex:"Ab_Roller",
  what:"Rolls forward from the knees; very hard core exercise.", how:["Start on the knees, roll only as far as you can keep your back flat."], tip:"An advanced move; master planks first.", bad:"Letting the lower back sag."},
 {k:"mat", g:"Accessories", n:"Exercise mat", local:"Mat", ex:"Childs_Pose", what:"For floor exercises, core work and stretching.", how:["Use a clean mat with good grip."], tip:"Bring your own if the gym's are dirty.", bad:"—"},
 {k:"ball", g:"Accessories", n:"Stability (Swiss) ball", local:"Gym ball", ex:"Chest_Stretch_on_Stability_Ball", what:"A large inflatable ball for stretches and core work.", how:["Check it's properly inflated."], tip:"Good for gentle stretching.", bad:"Standing on it."},
 {k:"cycle", g:"Outdoor", n:"Bicycle", local:"Cycle", ex:"Bicycling", what:"Outdoor cycling for cardio.", how:["Wear a helmet; avoid busy roads."], tip:"Morning rides avoid the heat and traffic.", bad:"—"},
];
const EQ = {}; EQUIP.forEach(e => EQ[e.k] = e);
const ALWAYS = new Set(["body","none","mat"]);
const MYTHS = [
 ["Vibration belt machine (the shaking belt)", "Common in Pakistani gyms. It does not burn belly fat or 'melt' anything; it only shakes the skin and fat. Use the time for a walk on the treadmill instead."],
 ["Sauna suit / plastic sweat belt", "You lose water, not fat, and gain it back when you drink. It also raises the risk of heat illness, especially in Pakistan's summer."],
 ["Hundreds of crunches for a flat stomach", "You can't choose where fat comes off (no spot reduction). Belly fat goes with an overall calorie deficit: food, steps and the whole workout."],
 ["Light weights 'tone', heavy weights make you bulky", "Muscle grows slowly, especially in a calorie deficit. Lift weights that feel hard by the last 2–3 reps; that keeps muscle while fat goes."],
 ["No pain, no gain", "Soreness 1–2 days after is normal. Sharp pain in a joint is a stop sign: change the exercise and tell a trainer or doctor if it continues."],
];

/* ---------------- calories (MET) ---------------- */
// Sources: 2024 Adult Compendium of Physical Activities; ACSM metabolic equations for walking/running.
// Calories ≈ MET × body weight (kg) × hours. Estimates only: real burn varies by fitness and effort.
const CARDIO = {
 treadmill:{n:"Treadmill", modes:"walk"},
 bike:{n:"Stationary bike", lv:[["Light (about 50 W)",4.0],["Moderate (90–100 W)",6.0],["Hard (125–150 W)",8.0]]},
 recumbent:{n:"Recumbent bike", lv:[["Light (about 50 W)",4.0],["Moderate (90–100 W)",6.0],["Hard (125–150 W)",8.0]]},
 elliptical:{n:"Elliptical", lv:[["Moderate",5.0],["Vigorous",9.0]]},
 rower:{n:"Rowing machine", lv:[["Moderate (under 100 W)",5.0],["Vigorous",7.3]]},
 stair:{n:"Stair climber", lv:[["Steady",9.3]]},
 jumprope:{n:"Skipping rope", lv:[["About 120 skips/min",9.0],["Fast",11.0]]},
 ropes:{n:"Battle ropes / HIIT", lv:[["Moderate intervals",7.0],["All-out intervals",11.0]]},
 none:{n:"Outdoor walk", lv:[["Normal (4.5–5.5 km/h)",3.8],["Brisk (5.6–6.3 km/h)",4.8],["Very brisk (6.4–7 km/h)",5.5]]},
 cycle:{n:"Outdoor cycling (leisure)", lv:[["Easy",4.0],["Moderate",6.0]]},
};
const ACTIVITIES = [
 ["Weight training, 8–15 reps (normal gym session)",3.5],["Weight training, vigorous (heavy, short rest)",6.0],["Squats / deadlifts session",5.0],
 ["Circuit training, bodyweight, moderate",5.0],["Calisthenics (push-ups, squats), moderate",3.8],["HIIT, moderate",7.0],["HIIT, vigorous (burpees, Tabata)",11.0],
 ["Walking, normal pace (4.5–5.5 km/h)",3.8],["Walking, brisk (5.6–6.3 km/h)",4.8],["Jogging, own pace",7.5],["Running, 9.7 km/h (6 min/km)",9.3],
 ["Stationary bike, moderate",6.0],["Elliptical, moderate",5.0],["Rowing machine, moderate",5.0],["Stair climber",9.3],["Skipping rope, 120/min",9.0],
 ["Swimming, leisurely",6.0],["Cricket (batting, bowling, fielding)",4.8],["Badminton, social",5.5],["Football, competitive",8.0],
 ["Yoga (hatha)",2.3],["Stretching, mild",2.3]];
function kcal(met, kg, min){ return Math.round(met * kg * min / 60); }
// ACSM walking (<~6.5 km/h) and running equations, speed in km/h, grade in %
function treadmillMET(kmh, grade){ const v = kmh * 1000 / 60, g = (grade||0) / 100;
  const vo2 = kmh <= 6.5 ? 0.1*v + 1.8*v*g + 3.5 : 0.2*v + 0.9*v*g + 3.5; return Math.round(vo2 / 3.5 * 10) / 10; }

/* ---------------- coaching notes for key exercises ---------------- */
const TIPS = {
 Leg_Press:["Lower back stays on the pad the whole time.","Knees follow the toes, never cave inwards.","Don't lock the knees at the top."],
 Goblet_Squat:["Hold the weight at your chest, elbows inside the knees at the bottom.","Sit between your heels, chest up.","Go as deep as you can with a flat back; a box behind you helps at first."],
 Barbell_Squat:["Bar on the upper back, not the neck.","Brace your stomach before each rep.","Knees track over toes; heels stay down."],
 Bodyweight_Squat:["Arms forward for balance.","Push the hips back as if sitting on a chair.","Use a chair behind you if balance is hard."],
 Romanian_Deadlift:["It's a hip hinge, not a squat: hips go back, knees stay soft.","Bar slides down the thighs, close to the legs.","Stop when the back would start to round."],
 Barbell_Deadlift:["Bar over mid-foot, back flat, chest up.","Push the floor away; don't jerk.","Learn it with a coach; at first a light Romanian deadlift is enough."],
 Dumbbell_Bench_Press:["Shoulder blades squeezed together and down.","Elbows at about 45° from the body, not flared to 90°.","Lower to chest level under control."],
 "Barbell_Bench_Press_-_Medium_Grip":["Feet flat, slight arch, shoulder blades tight.","Bar touches the lower chest.","Always have a spotter or use the safety arms."],
 Machine_Bench_Press:["Set the seat so handles are at mid-chest.","Push smoothly; 2–3 seconds to return."],
 Pushups:["Body in one straight line, stomach tight.","Too hard? Hands on a bench (incline push-up) or the wall.","Chest goes down, not just the head."],
 "Wide-Grip_Lat_Pulldown":["Pull to the upper chest, not behind the neck.","Shoulders down and back before you pull.","Slow on the way up."],
 Seated_Cable_Rows:["Sit tall, don't rock.","Pull to the belly button and squeeze the shoulder blades.","Let the arms stretch forward at the end, back stays straight."],
 "One-Arm_Dumbbell_Row":["One hand and knee on the bench, back flat like a table.","Pull the dumbbell to your hip, not your chest.","No twisting of the body."],
 Dumbbell_Shoulder_Press:["Sit with back support.","Press up and slightly in; don't arch the lower back.","Lower to ear level."],
 Side_Lateral_Raise:["Light weight; lead with the elbows.","Lift only to shoulder height.","Slight forward lean helps target the side of the shoulder."],
 Face_Pull:["Rope at face height, pull towards the eyes with elbows high.","Squeeze the shoulder blades, pause.","Great for posture after desk work."],
 Plank:["Elbows under shoulders, body straight.","Squeeze glutes and stomach; don't let hips sag or pike.","Start with 20–30 s holds."],
 Dead_Bug:["Lower back pressed into the floor the whole time.","Move opposite arm and leg slowly.","Breathe out as the limbs extend."],
 Bird_Dog:["Keep the hips level as if a cup of tea sits on your back.","Slow and controlled."],
 Butt_Lift_Bridge:["Push through the heels, squeeze the glutes at the top.","Ribs down; don't over-arch the lower back."],
 Dumbbell_Step_Ups:["Whole foot on the box; push through the top leg.","Low box first (20–30 cm)."],
 Dumbbell_Lunges:["Long enough step so the front knee stays over the ankle.","Back knee goes towards the floor; torso upright.","Hold a support if balance is an issue."],
 Leg_Extensions:["Knee lines up with the machine's pivot point.","Slow lowering; avoid heavy jerky reps."],
 Lying_Leg_Curls:["Hips stay down on the pad.","Squeeze at the top, lower slowly."],
 Triceps_Pushdown:["Elbows pinned to your sides.","Only the forearms move."],
 Dumbbell_Bicep_Curl:["Elbows stay by your sides.","No swinging the body; lower slowly."],
 Walking_Treadmill:["Let go of the handrails.","Incline 3–8% beats running for beginners.","Talk-but-not-sing pace."],
 Bicycling_Stationary:["Seat height: slight knee bend at the bottom.","Resistance high enough that it's work."],
 Farmers_Walk:["Stand tall, shoulders back, short quick steps.","Heavy enough that 30–40 m is hard."],
 "One-Arm_Kettlebell_Swings":["The hips snap forward; the arms just hold on.","Back flat, bell swings to chest height only."],
 Chair_Sit_to_Stand:["Use a sturdy chair against a wall.","Slow down (3 s), drive up."],
 Wall_Push_Up:["Body straight; step further back to progress."],
};
const PATTERN = {squat:"Squat (legs)",lunge:"Lunge / step-up",hinge:"Hip hinge (back of legs)",glutes:"Glutes / hips",legiso:"Leg isolation",calves:"Calves",
 pushh:"Chest press",chestiso:"Chest fly",pushv:"Shoulder press",shoiso:"Shoulder raise",rear:"Rear shoulders / posture",traps:"Traps",
 pullv:"Back: pulldown / pull-up",pullh:"Back: row",bi:"Biceps",tri:"Triceps",core:"Core / abs",carry:"Carry",plyo:"Jumps (high impact)",
 cond:"Conditioning",power:"Power",cardio:"Cardio",stretch:"Stretch / mobility"};
const GENERIC = {
 squat:["Feet about shoulder-width, knees follow the toes.","Chest up, back flat, heels down.","Lower under control (2–3 s)."],
 lunge:["Front knee over the ankle, not far past the toes.","Torso tall; hold support if needed."],
 hinge:["Push the hips back, keep the back flat.","Weight close to the legs.","Stop before the back rounds."],
 pushh:["Shoulder blades back and down.","Elbows about 45° from the body.","Control the lowering."], pushv:["Don't arch the lower back.","Press in a straight line over the shoulders."],
 pullv:["Shoulders down first, then pull the elbows down.","Slow on the way up."], pullh:["Back flat, pull with the elbows.","Squeeze the shoulder blades."],
 bi:["Elbows still, no swinging."], tri:["Elbows still; only the forearm moves."], core:["Breathe; keep the lower back neutral.","Quality over number of reps."],
 cardio:["Start easy for 5 minutes, finish with 3–5 minutes easy.","Talk test: you can talk but not sing."], stretch:["Ease into it; no bouncing.","Hold 20–30 seconds, breathe slowly."],
 plyo:["Land softly with bent knees.","Only once you're comfortable with squats and lunges, and not at a very high body weight."]};

/* ---------------- state ---------------- */
let G = load();
function load(){ try{ return JSON.parse(localStorage.getItem(GKEY)||"null") || {}; }catch(e){ return {}; } }
function save(){ try{ localStorage.setItem(GKEY, JSON.stringify(G)); }catch(e){} }
window.GYM_STATE = () => G; window.GYM_RESTORE = o => { G = o || {}; save(); };
function kg(){ return (S.weight && S.weight()) || 70; }
function bmi(){ return (S.bmi && S.bmi()) || null; }
function prof(){ if(!G.prof){ const b = bmi()||25;
  G.prof = {goal: b>=25 ? "lose" : "fit", level:"new", days:5, mins:60, preset:"small", eq:presetEq("small"),
            knee:false, back:false, shoulder:false, low: b>=35, wdays:[1,2,4,5,6]}; save(); }
  return G.prof; }
function presetEq(p){
  if(p==="full") return EQUIP.map(e=>e.k);
  if(p==="small") return ["dumbbell","barbell","ezbar","plates","bench","rack","legpress","legext","legcurl","latpull","cablerow","cable","pecdeck","chestpress","pullbar","dip","abbench","treadmill","bike","mat","box","bands","calf"];
  if(p==="home") return ["dumbbell","bands","mat","box","jumprope","cycle"];
  return ["mat","box"]; }
const DAYNAMES=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/* ---------------- plan generator ---------------- */
const SLOTS = {
 fullA:["squat","pushh","pullh","lunge","shoiso","core"], fullB:["hinge","pushv","pullv","glutes","tri","core"], fullC:["squat","pushh","pullv","hinge","bi","core"],
 upperA:["pushh","pullv","pushv","pullh","bi","tri","rear"], upperB:["pullh","pushv","pullv","pushh","shoiso","tri","bi"],
 lowerA:["squat","hinge","lunge","legiso","calves","core"], lowerB:["hinge","squat","glutes","legiso","calves","core"],
 push:["pushh","pushv","chestiso","shoiso","tri","core"], pull:["pullv","pullh","rear","bi","traps","core"], legs:["squat","hinge","lunge","legiso","calves","core"],
 cardio:["cardio","core","core","stretch"] };
const DAYLABEL = {fullA:"Full body A",fullB:"Full body B",fullC:"Full body C",upperA:"Upper body A",upperB:"Upper body B",lowerA:"Lower body A",lowerB:"Lower body B",
 push:"Push (chest, shoulders, triceps)",pull:"Pull (back, biceps)",legs:"Legs",cardio:"Cardio + core"};
function split(p){
  const d = p.days, newb = p.level==="new";
  if(d<=2) return ["fullA","fullB"];
  if(d===3) return ["fullA","fullB","fullC"];
  if(d===4) return newb ? ["fullA","cardio","fullB","cardio"] : ["upperA","lowerA","upperB","lowerB"];
  if(d===5) return newb ? ["fullA","cardio","fullB","cardio","fullC"] : ["upperA","lowerA","cardio","upperB","lowerB"];
  return newb ? ["fullA","cardio","fullB","cardio","fullC","cardio"] : ["push","pull","legs","push","pull","legs"]; }
function eligible(e, p){
  const have = new Set(p.eq); if(!e.eq.every(k => ALWAYS.has(k) || have.has(k))) return false;
  if(p.level==="new" && e.lv!=="b") return false;
  if(p.level==="some" && e.lv==="e") return false;
  if((p.low || p.knee) && e.f.includes("H")) return false;
  if(p.knee && e.f.includes("K")) return false;
  if(p.back && e.f.includes("B")) return false;
  if(p.shoulder && e.f.includes("S")) return false;
  return true; }
function score(e, p){ let s = 0;
  if(p.level==="new"){ if(e.eq.some(k=>["legpress","chestpress","latpull","cablerow","shoulderpress","pecdeck","legext","legcurl","rowmachine","cable"].includes(k))) s+=3;
    if(e.eq.includes("dumbbell")) s+=2; if(e.eq.includes("barbell")) s-=2; }
  if(p.low && e.p==="cardio" && ["bike","recumbent","elliptical","treadmill"].some(k=>e.eq.includes(k))) s+=4;
  if(e.p==="cardio" && e.id==="Walking_Treadmill") s+=3;
  if(p.level==="new" || p.low){ if(e.f.includes("B")) s-=3; if(e.f.includes("K")) s-=2; if(e.f.includes("S")) s-=1; }
  if(["Plank","Dead_Bug","Bird_Dog","Side_Bridge","Pallof_Press"].includes(e.id) && p.level==="new") s+=2;
  if(e.img && e.img.length) s+=1; return s; }
function pick(pattern, p, used, variant){
  let c = EX.filter(e => e.p===pattern && eligible(e,p) && !used.has(e.id));
  if(!c.length && pattern==="legiso") c = EX.filter(e => e.p==="glutes" && eligible(e,p) && !used.has(e.id));
  if(!c.length && pattern==="chestiso") c = EX.filter(e => e.p==="pushh" && eligible(e,p) && !used.has(e.id));
  if(!c.length) return null;
  c.sort((a,b)=>score(b,p)-score(a,p) || a.n.localeCompare(b.n));
  return c[Math.min(variant, c.length-1)]; }
function dose(p, e){
  if(e.p==="cardio") return {sets:1, reps:"", min: p.goal==="lose" ? 30 : 20, lvl:1};
  if(e.p==="stretch") return {sets:1, reps:"30 s each side", rest:0};
  if(e.p==="core") return {sets: p.level==="new"?2:3, reps: ["Plank","Side_Bridge","Wall_Sit"].includes(e.id) ? "20–40 s" : "10–15", rest:45};
  const big = ["squat","hinge","pushh","pullv","pullh","pushv","lunge"].includes(e.p);
  let sets=3, reps="10–12", rest=75;
  if(p.goal==="lose"){ reps = big ? "10–12" : "12–15"; rest = 60; }
  if(p.goal==="muscle"){ sets = big?4:3; reps = big ? "8–12" : "10–15"; rest = big?90:60; }
  if(p.goal==="strength" && big){ sets=4; reps="5–6"; rest=150; }
  if(p.level==="new") sets = Math.max(2, sets-1);
  return {sets, reps, rest}; }
function generate(){
  const p = prof(), types = split(p), used = new Set(), counts = {};
  const nEx = p.mins<=30 ? 4 : p.mins<=45 ? 5 : p.mins<=60 ? 6 : 7;
  const days = types.map((t,i) => {
    counts[t] = (counts[t]||0) + 1; const variant = counts[t]-1;
    const items = []; const dayUsed = new Set();
    if(t==="cardio"){
      const cardio = pick("cardio", p, new Set(), 0); if(cardio) items.push({id:cardio.id, ...dose(p,cardio), min: p.mins>=60?35:25});
      const c2 = pick("cardio", p, new Set([cardio&&cardio.id]), 0); if(c2 && p.mins>=60) items.push({id:c2.id, ...dose(p,c2), min:15});
      ["core","core"].forEach((sl,j)=>{ const e = pick(sl, p, dayUsed, i+j) || pick(sl, p, dayUsed, 0); if(e){ dayUsed.add(e.id); items.push({id:e.id, ...dose(p,e)}); } });
      ["stretch","stretch"].forEach(sl=>{ const e = pick(sl, p, dayUsed, 0); if(e){ dayUsed.add(e.id); items.push({id:e.id, ...dose(p,e)}); } });
    } else {
      SLOTS[t].slice(0, nEx).forEach(sl => { const v = sl==="core" ? i : variant; const e = pick(sl, p, dayUsed, v) || pick(sl, p, dayUsed, 0) || pick(sl, p, new Set(), 0);
        if(e){ dayUsed.add(e.id); items.push({id:e.id, ...dose(p,e)}); } });
      if(p.goal==="lose" || p.mins>=60){ const c = pick("cardio", p, new Set(), variant%2); if(c) items.push({id:c.id, ...dose(p,c), min: p.goal==="lose"?15:10}); }
    }
    return {name: DAYLABEL[t], type: t, wd: p.wdays[i] != null ? p.wdays[i] : null, items}; });
  G.plan = {days, made: new Date().toISOString(), final:false}; save(); }

/* ---------------- tiny DOM helpers ---------------- */
function h(tag, cls, text){ const e = document.createElement(tag); if(cls) e.className = cls; if(text!=null) e.textContent = text; return e; }
function sbtn(text, fn){ const b = h("button", "", text); b.type="button"; b.onclick = fn; return b; }
function btn(text, cls, fn){ const b = h("button", "btn "+(cls||""), text); b.type="button"; b.onclick = fn; return b; }
function img(e, size){ const w = h("div","gx-img"); if(size) w.style.width = w.style.height = size+"px";
  if(e && e.img && e.img.length){ const im = h("img"); im.alt = e.n; im.loading="lazy"; im.src = "data:image/webp;base64,"+e.img[0]; w.appendChild(im);
    if(e.img[1]){ let f=0; w.dataset.anim="1"; w._t = () => { f=1-f; im.src = "data:image/webp;base64,"+e.img[f]; }; } }
  else { w.classList.add("noimg"); w.textContent = "🏋️"; }
  return w; }
setInterval(()=>{ document.querySelectorAll('#tab-gym .gx-img[data-anim="1"]').forEach(w=>{ if(w.offsetParent && w._t) w._t(); }); }, 1100);
function today(){ return S.current ? S.current() : new Date().toISOString().slice(0,10); }
function dateObj(k){ const [y,m,d] = k.split("-").map(Number); return new Date(y, m-1, d); }

/* ---------------- render shell ---------------- */
let SUB = "today", libFilter = {q:"", pat:"", eq:"", lv:""}, pickFor = null;
const SUBS = [["today","🏋️ Today's workout"],["plan","🗓️ My plan"],["lib","📚 Exercises"],["equip","🏟️ Equipment"],["cal","🔥 Calories"],["guide","🧭 Beginner guide"],["hist","📈 History"]];
function render(){
  const root = document.getElementById("tab-gym"); if(!root) return; root.innerHTML = "";
  const hero = h("div","gx-hero"); const ht = h("div"); ht.append(h("h1","","Gym"), h("p","hint",`Your plan, exercises with photos, equipment and calories, set up for ${Math.round(kg())} kg${bmi()?` (BMI ${bmi().toFixed(1)})`:""}. Everything stays on this device.`)); hero.appendChild(ht); root.appendChild(hero);
  const nav = h("div","seg gx-nav"); SUBS.forEach(([k,t]) => { const b = sbtn(t, ()=>{ SUB=k; pickFor=null; render(); window.scrollTo(0,0); }); b.setAttribute("aria-pressed", String(SUB===k)); nav.appendChild(b); }); root.appendChild(nav);
  const body = h("div","gx-body"); root.appendChild(body);
  ({today:rToday, plan:rPlan, lib:rLib, equip:rEquip, cal:rCal, guide:rGuide, hist:rHist})[SUB](body); }
window.renderGym = render;

/* ---------------- TODAY ---------------- */
function planDayFor(k){ if(!G.plan) return null; const wd = dateObj(k).getDay(); const i = G.plan.days.findIndex(d => d.wd===wd); return i>=0 ? i : null; }
function lastSets(id, beforeKey){ const ks = Object.keys(G.logs||{}).filter(k=>k<beforeKey).sort().reverse();
  for(const k of ks){ const L = G.logs[k]; const it = (L.items||[]).find(x=>x.id===id); if(it && it.sets && it.sets.some(s=>s.done)) return {k, sets: it.sets.filter(s=>s.done)}; } return null; }
function rToday(box){
  const k = today(); G.logs = G.logs || {};
  if(!G.plan){ const v = h("div","verdict"); v.append(h("h3","","No plan yet"), h("p","","Go to My plan: answer 6 quick questions and the app builds a full weekly plan for your weight, goal and the equipment in your gym. You can change anything after."), btn("Build my plan","",()=>{ SUB="plan"; render(); })); box.appendChild(v); return; }
  let L = G.logs[k]; let di = L ? L.day : planDayFor(k);
  const head = h("div","gx-row");
  const sel = h("select"); sel.setAttribute("aria-label","Workout for this day");
  const o0 = h("option","", "Rest day / no workout"); o0.value = ""; sel.appendChild(o0);
  G.plan.days.forEach((d,i)=>{ const o = h("option","", `${d.wd!=null?DAYNAMES[d.wd]+" · ":""}${d.name}`); o.value = i; if(i===di) o.selected = true; sel.appendChild(o); });
  sel.onchange = () => { const v = sel.value===""?null:+sel.value; if(v==null){ delete G.logs[k]; } else { G.logs[k] = newLog(v); } save(); render(); };
  head.append(h("b","", `Workout for ${dateObj(k).toLocaleDateString("en-GB",{weekday:"long", day:"numeric", month:"short"})}: `), sel); box.appendChild(head);
  if(di==null){ const v = h("div","verdict"); v.append(h("h3","","Rest day"), h("p","","Rest is when muscles recover and grow. A 20–30 minute easy walk and 10 minutes of stretching are still great today. Pick a workout above if you want to train anyway.")); box.appendChild(v); return; }
  if(!L){ L = G.logs[k] = newLog(di); save(); }
  const pd = G.plan.days[L.day];
  // summary card
  const est = sessionKcal(L); const sum = h("div","kpis");
  [[`${est.min} min`,"planned time"],[`~${est.kcal} kcal`,"estimated burn"],[`${L.items.filter(x=>x.done || (x.sets && x.sets.length && x.sets.every(s=>s.done))).length}/${L.items.length}`,"exercises done"],[pd.name,"today's session"]].forEach(([v,l])=>{ const c=h("div","kpi"); c.append(h("b","",v), h("span","",l)); sum.appendChild(c); });
  box.appendChild(sum);
  const wu = h("details","gx-card"); wu.append(h("summary","","🔥 Warm-up first (5–8 min) — tap to see"));
  const wl = h("ol"); ["3–5 min easy treadmill walk or bike","10 arm circles each way + 10 shoulder rolls","10 bodyweight or chair squats, 10 glute bridges","1 light set (50% weight, 10 reps) of the first exercise"].forEach(t=>wl.appendChild(h("li","",t))); wu.appendChild(wl); box.appendChild(wu);
  L.items.forEach((it, idx) => box.appendChild(todayItem(L, it, idx, k)));
  const add = btn("➕ Add an exercise to today","ghost small",()=>{ pickFor = {log:k}; SUB="lib"; render(); }); box.appendChild(add);
  // rest timer
  const rt = h("div","gx-card gx-timer"); const tl = h("b","","Rest timer"); const tv = h("span","gx-tv","0:00"); rt.append(tl, tv);
  [60,90,120].forEach(s=>rt.appendChild(btn(`${s}s`,"ghost small",()=>startTimer(s, tv)))); box.appendChild(rt);
  const fin = h("div","gx-row"); fin.style.margin = "14px 0";
  fin.append(btn(L.finished ? "Update today's log" : "✅ Finish workout and save to Today","",()=>finish(k)), h("span","hint", L.finished?`Saved: ${L.min} min, ~${L.kcal} kcal added to Today.`:"Adds the minutes and calories to your Today page."));
  box.appendChild(fin);
  box.appendChild(h("p","hint","Calories are estimates from MET values (2024 Compendium of Physical Activities; ACSM walking equations): MET × your weight × time. Real burn varies with effort and fitness."));
}
function newLog(di){ const d = G.plan.days[di];
  return {day:di, start:Date.now(), items: d.items.map(it => { const e = EXI[it.id]||{};
    if(e.p==="cardio") return {id:it.id, min:it.min||20, lvl:it.lvl||1, speed:5.5, grade:5, done:false};
    if(e.p==="stretch") return {id:it.id, done:false, reps:it.reps};
    return {id:it.id, reps:it.reps, rest:it.rest, sets: Array.from({length: it.sets||3}, ()=>({kg:"", r:"", done:false}))}; })}; }
function cardioMET(it){ const e = EXI[it.id]; const key = e.eq[0];
  if(key==="treadmill") return treadmillMET(+it.speed||5, +it.grade||0);
  const c = CARDIO[key]; if(c && c.lv){ const l = c.lv[Math.min(it.lvl||0, c.lv.length-1)]; return l[1]; } return e.met; }
function sessionKcal(L){ let min=0, kc=0;
  L.items.forEach(it => { const e = EXI[it.id]; if(!e) return;
    if(e.p==="cardio"){ const m = +it.min||0; min += m; kc += kcal(cardioMET(it), kg(), m); }
    else if(e.p==="stretch"){ min += 1.5; kc += kcal(2.3, kg(), 1.5); }
    else { const n = (it.sets||[]).length; const m = n * ((it.rest||60)/60 + 0.75); min += m; kc += kcal(e.met, kg(), m); } });
  return {min: Math.round(min + 6), kcal: Math.round(kc + kcal(3.5, kg(), 6))}; }
function todayItem(L, it, idx, k){
  const e = EXI[it.id]; const c = h("div","gx-card gx-ex"); if(!e) return c;
  const top = h("div","gx-top"); top.appendChild(img(e, 76));
  const tt = h("div","gx-tt"); const nm = h("b","",e.n); nm.style.cursor="pointer"; nm.onclick=()=>openEx(e); tt.appendChild(nm);
  tt.appendChild(h("div","hint", `${PATTERN[e.p]||""} · ${e.pm.join(", ")}`));
  if(e.p!=="cardio" && e.p!=="stretch"){ tt.appendChild(h("div","gx-target", `Target: ${it.sets.length} × ${it.reps} · rest ${it.rest||60}s`));
    const last = lastSets(it.id, k); if(last){ tt.appendChild(h("div","hint", `Last time (${last.k}): ` + last.sets.map(s=>`${s.kg||"–"}kg×${s.r||"?"}`).join(", ")));
      const top = (it.reps||"").split(/[–-]/).map(Number).pop(); if(top && last.sets.every(s=>+s.r>=top)) tt.appendChild(h("div","gx-up", "⬆️ You hit the top of the range last time: add a little weight today (+1–2.5 kg upper body, +2.5–5 kg legs).")); } }
  top.appendChild(tt);
  const tools = h("div","gx-tools");
  tools.append(btn("ℹ️","ghost small",()=>openEx(e)), btn("⇄","ghost small",()=>{ pickFor = {log:k, idx, pattern:e.p}; libFilter.pat = e.p; SUB="lib"; render(); }), btn("✕","ghost small",()=>{ L.items.splice(idx,1); save(); render(); }));
  tools.children[1].title = "Swap for a similar exercise"; tools.children[2].title="Remove from today";
  tt.appendChild(tools); c.appendChild(top);
  if(e.p==="cardio"){ const row = h("div","gx-sets");
    const mi = numIn(it.min, v=>{ it.min=v; save(); upd(); }, "min"); row.append(h("span","","Minutes"), mi);
    if(e.eq[0]==="treadmill"){ row.append(h("span","","Speed km/h"), numIn(it.speed, v=>{ it.speed=v; save(); upd(); }, "km/h", 0.1), h("span","","Incline %"), numIn(it.grade, v=>{ it.grade=v; save(); upd(); }, "%", 0.5)); }
    else { const c2 = CARDIO[e.eq[0]]; if(c2 && c2.lv){ const s = h("select"); c2.lv.forEach((l,i)=>{ const o=h("option","",l[0]); o.value=i; if(i===(it.lvl||0)) o.selected=true; s.appendChild(o); }); s.onchange=()=>{ it.lvl=+s.value; save(); upd(); }; row.append(h("span","","Effort"), s); } }
    const kc = h("b","gx-kc",""); row.appendChild(kc); const dn = check(it.done, v=>{ it.done=v; save(); }); row.append(dn, h("span","","done"));
    function upd(){ kc.textContent = `≈ ${kcal(cardioMET(it), kg(), +it.min||0)} kcal (MET ${cardioMET(it)})`; } upd(); c.appendChild(row); return c; }
  if(e.p==="stretch"){ const row = h("div","gx-sets"); row.append(h("span","",it.reps||"30 s each side"), check(it.done, v=>{ it.done=v; save(); }), h("span","","done")); c.appendChild(row); return c; }
  const tbl = h("div","gx-setlist");
  it.sets.forEach((s,si) => { const r = h("div","gx-set"); r.append(h("span","gx-sn", `Set ${si+1}`), numIn(s.kg, v=>{ s.kg=v; save(); }, "kg", 0.5), h("span","","kg ×"), numIn(s.r, v=>{ s.r=v; save(); }, "reps", 1), h("span","","reps"), check(s.done, v=>{ s.done=v; save(); if(v) startTimer(it.rest||60, document.querySelector("#tab-gym .gx-tv")); }));
    tbl.appendChild(r); });
  const sr = h("div","gx-row"); sr.append(btn("+ set","ghost small",()=>{ it.sets.push({kg:"",r:"",done:false}); save(); render(); }), btn("− set","ghost small",()=>{ if(it.sets.length>1){ it.sets.pop(); save(); render(); } }));
  c.append(tbl, sr); return c; }
function numIn(v, on, ph, step){ const i = h("input"); i.type="number"; i.inputMode="decimal"; i.min="0"; i.step=step||1; i.placeholder=ph||""; i.value = v===""||v==null?"":v; i.className="gx-num"; i.oninput=()=>on(i.value===""?"":+i.value); return i; }
function check(v, on){ const c = h("input"); c.type="checkbox"; c.className="check"; c.checked=!!v; c.onchange=()=>on(c.checked); return c; }
let timerH = null;
function startTimer(sec, el){ if(!el) return; clearInterval(timerH); let left = sec; const f=()=>{ el.textContent = `${Math.floor(left/60)}:${String(left%60).padStart(2,"0")}`; if(left<=0){ clearInterval(timerH); el.textContent="Go! 💪"; try{ navigator.vibrate && navigator.vibrate([200,100,200]); }catch(e){} } left--; }; f(); timerH = setInterval(f, 1000); }
function finish(k){ const L = G.logs[k]; const est = sessionKcal(L);
  const elapsed = L.start ? Math.round((Date.now()-L.start)/60000) : 0;
  const min = elapsed>=10 && elapsed<=180 ? elapsed : est.min;
  const anyStrength = L.items.some(it=>{ const e=EXI[it.id]; return e && e.p!=="cardio" && e.p!=="stretch"; });
  const kc = Math.round(est.kcal * (min/est.min));
  L.finished = true; L.min = min; L.kcal = kc; save();
  if(S.setGym) S.setGym(k, min, anyStrength ? "strength" : "cardio", kc);
  render(); }

/* ---------------- PLAN ---------------- */
function rPlan(box){
  const p = prof();
  const f = h("div","gx-card"); f.appendChild(h("h3","","1 · About you and your gym"));
  f.appendChild(h("p","hint",`Weight ${Math.round(kg())} kg${bmi()?`, BMI ${bmi().toFixed(1)}`:""} (from your Sehat Log). Change your answers, then press Build.`));
  f.appendChild(segQ("Goal", "goal", [["lose","Lose fat"],["fit","Get fit and healthy"],["muscle","Build muscle"],["strength","Get stronger"]]));
  f.appendChild(segQ("Experience", "level", [["new","New (under 3 months)"],["some","Some (3–12 months)"],["exp","Experienced (1 year+)"]]));
  f.appendChild(segQ("Days per week", "days", [[2,"2"],[3,"3"],[4,"4"],[5,"5"],[6,"6"]]));
  f.appendChild(segQ("Minutes per session", "mins", [[30,"30"],[45,"45"],[60,"60"],[75,"75"]]));
  const wd = h("div","field"); wd.appendChild(h("label","",`Training days (pick ${p.days})`)); const ws = h("div","seg");
  [1,2,3,4,5,6,0].forEach(d=>{ const b = sbtn(DAYNAMES[d],()=>{ const i=p.wdays.indexOf(d); if(i>=0) p.wdays.splice(i,1); else p.wdays.push(d); p.wdays.sort((a,b)=>((a+6)%7)-((b+6)%7)); save(); render(); }); b.setAttribute("aria-pressed", String(p.wdays.includes(d))); ws.appendChild(b); });
  wd.appendChild(ws); f.appendChild(wd);
  f.appendChild(segQ("Where do you train?", "preset", [["full","Big gym (everything)"],["small","Normal local gym"],["home","Home with dumbbells"],["none","No equipment"]], v=>{ p.eq = presetEq(v); }));
  const lim = h("div","field"); lim.appendChild(h("label","","Anything to protect? (the plan avoids risky exercises)")); const ls = h("div","seg");
  [["low","Low impact only (no jumping/running)"],["knee","Knee pain"],["back","Lower-back pain"],["shoulder","Shoulder pain"]].forEach(([k2,t])=>{ const b=sbtn(t,()=>{ p[k2]=!p[k2]; save(); render(); }); b.setAttribute("aria-pressed",String(!!p[k2])); ls.appendChild(b); });
  lim.appendChild(ls); f.appendChild(lim);
  if((bmi()||0)>=35) f.appendChild(h("p","hint","At a BMI of 35 or more, low impact is switched on for you: no running or jumping until your weight comes down, to protect knees and back."));
  const eqd = h("details"); eqd.appendChild(h("summary","",`Equipment you have (${p.eq.length}) — tap to fine-tune`)); const eqs = h("div","chips");
  EQUIP.forEach(e=>{ const c = h("button","chip", e.n); c.type="button"; c.setAttribute("aria-pressed", String(p.eq.includes(e.k))); c.onclick=()=>{ const i=p.eq.indexOf(e.k); if(i>=0) p.eq.splice(i,1); else p.eq.push(e.k); save(); render(); }; eqs.appendChild(c); });
  eqd.appendChild(eqs); f.appendChild(eqd);
  f.appendChild(btn(G.plan ? "🔄 Rebuild my plan with these answers" : "⚡ Build my plan","",()=>{ if(G.plan && G.plan.final && !confirm("This replaces your current plan (your workout history is kept). Continue?")) return; if(p.wdays.length!==p.days){ alert(`Please pick exactly ${p.days} training days (you picked ${p.wdays.length}).`); return; } generate(); render(); }));
  box.appendChild(f);
  if(!G.plan) return;
  const pc = h("div","gx-card"); pc.appendChild(h("h3","", "2 · Your weekly plan " + (G.plan.final ? "✅ (final)" : "(draft — edit, then make it final)")));
  const tot = G.plan.days.reduce((a,d)=>{ const L = {items: d.items.map(it=>{ const e=EXI[it.id]||{}; return e.p==="cardio"?{id:it.id,min:it.min,lvl:1,speed:5.5,grade:5}:e.p==="stretch"?{id:it.id}:{id:it.id,rest:it.rest,sets:Array(it.sets||3).fill({})}; })}; const s=sessionKcal(L); return {min:a.min+s.min, kcal:a.kcal+s.kcal}; }, {min:0,kcal:0});
  pc.appendChild(h("p","hint",`About ${tot.min} minutes and ~${tot.kcal.toLocaleString()} kcal of exercise a week at your weight. ${p.goal==="lose"?"With your food plan, that adds roughly "+ (tot.kcal/7700).toFixed(2) +" kg of extra fat loss a week.":""}`));
  G.plan.days.forEach((d,di) => pc.appendChild(planDay(d, di)));
  const row = h("div","gx-row");
  row.append(btn(G.plan.final ? "Saved as final ✓ (edit any time)" : "✅ Make this my final plan","",()=>{ G.plan.final = true; G.plan.finalAt = new Date().toISOString(); save(); render(); }));
  pc.appendChild(row); box.appendChild(pc);
  box.appendChild(h("p","hint","How the plan is built: beginners get full-body days (each muscle 2–3 times a week) with machines and dumbbells first; 3 sets of 10–15 reps for fat loss, rest 60–90 s; cardio for fat loss; risky moves are removed for the pains you ticked. Swap anything you don't like with ⇄."));
}
function segQ(label, key, opts, after){ const p = prof(); const f = h("div","field"); f.appendChild(h("label","",label)); const s = h("div","seg");
  opts.forEach(([v,t])=>{ const b = sbtn(t,()=>{ p[key]=v; if(after) after(v); if(key==="days"){ p.wdays = ({2:[1,4],3:[1,3,5],4:[1,2,4,5],5:[1,2,4,5,6],6:[1,2,3,4,5,6]})[v]; } save(); render(); }); b.setAttribute("aria-pressed", String(p[key]===v)); s.appendChild(b); });
  f.appendChild(s); return f; }
function planDay(d, di){
  const c = h("div","gx-day"); const hd = h("div","gx-dayhead");
  const nm = h("input"); nm.value = d.name; nm.className="gx-dname"; nm.setAttribute("aria-label","Day name"); nm.oninput=()=>{ d.name = nm.value; save(); };
  const wd = h("select"); [["","No fixed day"]].concat([1,2,3,4,5,6,0].map(x=>[x,DAYNAMES[x]])).forEach(([v,t])=>{ const o=h("option","",t); o.value=v; if((d.wd==null?"":d.wd)===v) o.selected=true; wd.appendChild(o); });
  wd.onchange=()=>{ d.wd = wd.value===""?null:+wd.value; save(); };
  hd.append(wd, nm, btn("✕ day","ghost small",()=>{ if(confirm(`Remove “${d.name}”?`)){ G.plan.days.splice(di,1); save(); render(); } })); c.appendChild(hd);
  d.items.forEach((it, ii) => { const e = EXI[it.id]; if(!e) return; const r = h("div","gx-pitem");
    r.appendChild(img(e, 54)); const tt = h("div","gx-tt"); const b = h("b","",e.n); b.style.cursor="pointer"; b.onclick=()=>openEx(e); tt.appendChild(b);
    const ctl = h("div","gx-row");
    if(e.p==="cardio"){ ctl.append(numIn(it.min, v=>{ it.min=v; save(); }, "min"), h("span","hint","minutes")); }
    else if(e.p==="stretch"){ ctl.append(h("span","hint",it.reps||"30 s each side")); }
    else { ctl.append(numIn(it.sets, v=>{ it.sets=v||1; save(); }, "sets"), h("span","hint","sets ×")); const ri=h("input"); ri.value=it.reps; ri.className="gx-num gx-reps"; ri.oninput=()=>{ it.reps=ri.value; save(); }; ctl.append(ri, h("span","hint","reps · rest"), numIn(it.rest, v=>{ it.rest=v; save(); }, "s"), h("span","hint","s")); }
    tt.appendChild(ctl); r.appendChild(tt);
    const tools = h("div","gx-tools");
    tools.append(btn("↑","ghost small",()=>{ if(ii>0){ [d.items[ii-1],d.items[ii]]=[d.items[ii],d.items[ii-1]]; save(); render(); } }),
                 btn("↓","ghost small",()=>{ if(ii<d.items.length-1){ [d.items[ii+1],d.items[ii]]=[d.items[ii],d.items[ii+1]]; save(); render(); } }),
                 btn("⇄","ghost small",()=>{ pickFor={plan:di, idx:ii, pattern:e.p}; libFilter.pat=e.p; SUB="lib"; render(); }),
                 btn("✕","ghost small",()=>{ d.items.splice(ii,1); save(); render(); }));
    r.appendChild(tools); c.appendChild(r); });
  c.appendChild(btn("➕ Add exercise","ghost small",()=>{ pickFor={plan:di}; SUB="lib"; render(); }));
  return c; }

/* ---------------- LIBRARY ---------------- */
function rLib(box){
  if(pickFor){ const v = h("div","verdict"); v.append(h("b","", pickFor.idx!=null ? "Pick a replacement" : "Pick an exercise to add"), h("span","hint"," — tap ➕ on any exercise. "), btn("Cancel","ghost small",()=>{ const back = pickFor.log?"today":"plan"; pickFor=null; SUB=back; render(); })); box.appendChild(v); }
  const f = h("div","gx-filters");
  const q = h("input"); q.placeholder="Search: squat, chest, treadmill…"; q.value=libFilter.q; q.oninput=()=>{ libFilter.q=q.value; list(); }; f.appendChild(q);
  f.appendChild(sel("All movements", Object.entries(PATTERN), "pat"));
  f.appendChild(sel("All equipment", EQUIP.map(e=>[e.k,e.n]).concat([["body","Bodyweight / no equipment"]]), "eq"));
  f.appendChild(sel("All levels", [["b","Beginner"],["i","Intermediate"]], "lv"));
  box.appendChild(f);
  const out = h("div","gx-grid"); box.appendChild(out); const cnt = h("p","hint"); box.insertBefore(cnt, out);
  function sel(lbl, opts, key){ const s = h("select"); s.appendChild(Object.assign(h("option","",lbl),{value:""})); opts.forEach(([v,t])=>{ const o=h("option","",t); o.value=v; if(libFilter[key]===v) o.selected=true; s.appendChild(o); }); s.onchange=()=>{ libFilter[key]=s.value; list(); }; return s; }
  function list(){ out.innerHTML=""; const qq = libFilter.q.toLowerCase().trim();
    const r = EX.filter(e => (!libFilter.pat || e.p===libFilter.pat) && (!libFilter.eq || e.eq.includes(libFilter.eq)) && (!libFilter.lv || e.lv===libFilter.lv) &&
      (!qq || (e.n+" "+e.pm.join(" ")+" "+e.sm.join(" ")+" "+(PATTERN[e.p]||"")+" "+e.eq.map(k=>(EQ[k]||{}).n||k).join(" ")).toLowerCase().includes(qq)));
    cnt.textContent = `${r.length} exercises`;
    r.forEach(e => { const c = h("div","gx-tile"); c.appendChild(img(e)); const b = h("b","",e.n); c.appendChild(b);
      c.appendChild(h("span","hint", `${PATTERN[e.p]||""} · ${e.lv==="b"?"Beginner":"Intermediate"}`));
      c.onclick = ev => { if(ev.target.closest("button")) return; openEx(e); };
      if(pickFor) c.appendChild(btn("➕ Choose","small",()=>choose(e)));
      out.appendChild(c); }); }
  list(); }
function choose(e){ const pf = pickFor; pickFor = null; const p = prof();
  if(pf.plan!=null){ const d = G.plan.days[pf.plan]; const it = {id:e.id, ...dose(p,e)}; if(e.p==="cardio") it.min = 20; if(pf.idx!=null) d.items[pf.idx] = it; else d.items.push(it); SUB="plan"; }
  else if(pf.log){ const L = G.logs[pf.log]; const it = e.p==="cardio" ? {id:e.id,min:20,lvl:1,speed:5.5,grade:5,done:false} : e.p==="stretch" ? {id:e.id,done:false} : {id:e.id, reps:dose(p,e).reps, rest:dose(p,e).rest, sets:Array.from({length:dose(p,e).sets},()=>({kg:"",r:"",done:false}))};
    if(pf.idx!=null) L.items[pf.idx] = it; else L.items.push(it); SUB="today"; }
  libFilter.pat=""; save(); render(); }
function openEx(e){
  const dlg = h("div","gx-modal"); const card = h("div","gx-sheet"); dlg.appendChild(card);
  dlg.onclick = ev => { if(ev.target===dlg) dlg.remove(); };
  card.appendChild(btn("✕ Close","ghost small gx-close",()=>dlg.remove()));
  card.appendChild(h("h2","",e.n));
  if(e.img.length){ const ph = h("div","gx-photos"); e.img.forEach((b,i)=>{ const f = h("figure"); const im = h("img"); im.src="data:image/webp;base64,"+b; im.alt = `${e.n} — ${i?"end":"start"} position`; f.append(im, h("figcaption","", i?"End position":"Start position")); ph.appendChild(f); }); card.appendChild(ph); }
  const meta = h("div","chips"); [PATTERN[e.p], e.lv==="b"?"Beginner":"Intermediate", ...e.eq.filter(k=>k!=="none").map(k=>(EQ[k]||{}).n||(k==="body"?"Bodyweight":k))].forEach(t=>t&&meta.appendChild(h("span","chip",t))); card.appendChild(meta);
  card.appendChild(h("p","", `Works: ${e.pm.join(", ")}${e.sm.length?` · also ${e.sm.join(", ")}`:""}`));
  card.appendChild(h("h3","","How to do it"));
  const ol = h("ol"); e.ins.forEach(t=>ol.appendChild(h("li","",t))); card.appendChild(ol);
  const tips = TIPS[e.id] || GENERIC[e.p];
  if(tips){ card.appendChild(h("h3","","Key points and common mistakes")); const ul = h("ul"); tips.forEach(t=>ul.appendChild(h("li","",t))); card.appendChild(ul); }
  const warn = []; if(e.f.includes("H")) warn.push("High impact (jumping or running): skip it at a high body weight or with knee pain.");
  if(e.f.includes("K")) warn.push("Can stress the knees: go lighter, reduce depth, or swap it if your knees hurt.");
  if(e.f.includes("B")) warn.push("Loads the lower back: keep the back flat; skip it if you have back pain.");
  if(e.f.includes("S")) warn.push("Can stress the shoulders: control the bottom position; skip it with shoulder pain.");
  if(warn.length){ const v = h("div","verdict mid"); v.appendChild(h("b","","Safety")); const ul=h("ul"); warn.forEach(t=>ul.appendChild(h("li","",t))); v.appendChild(ul); card.appendChild(v); }
  const met = e.p==="cardio" ? cardioMET({id:e.id, lvl:1, speed:5.5, grade:5}) : e.met;
  card.appendChild(h("p","hint", `Calories at your weight (${Math.round(kg())} kg): about ${kcal(met, kg(), 10)} kcal per 10 minutes${e.p!=="cardio"?" of training including rest between sets":""} (MET ${met}).`));
  const add = h("div","gx-row"); if(G.plan){ const s = h("select"); G.plan.days.forEach((d,i)=>{ const o=h("option","",d.name); o.value=i; s.appendChild(o); });
    add.append(h("span","","Add to: "), s, btn("Add","small",()=>{ const d = G.plan.days[+s.value]; const it = {id:e.id, ...dose(prof(),e)}; if(e.p==="cardio") it.min=20; d.items.push(it); save(); dlg.remove(); render(); })); card.appendChild(add); }
  document.body.appendChild(dlg); }

/* ---------------- EQUIPMENT ---------------- */
function rEquip(box){
  box.appendChild(h("p","hint","What each machine is called, what it trains, how to use it safely, and the exercises it's used for. Tap a photo or an exercise to see the full how-to."));
  const groups = [...new Set(EQUIP.map(e=>e.g))];
  groups.forEach(g => { box.appendChild(h("h3","gx-gh",g));
    EQUIP.filter(e=>e.g===g).forEach(q => { const c = h("details","gx-card gx-eq");
      const sm = h("summary"); const ex = EXI[q.ex]; sm.appendChild(img(ex, 64)); const st = h("div"); st.append(h("b","",q.n), h("div","hint",`Also called: ${q.local}`)); sm.appendChild(st); c.appendChild(sm);
      c.appendChild(h("p","",q.what));
      c.appendChild(h("b","","How to use it")); const ol=h("ol"); q.how.forEach(t=>ol.appendChild(h("li","",t))); c.appendChild(ol);
      c.appendChild(h("p","",`💡 ${q.tip}`)); if(q.bad && q.bad!=="—") c.appendChild(h("p","",`⚠️ Common mistake: ${q.bad}`));
      const uses = EX.filter(e=>e.eq.includes(q.k));
      if(uses.length){ c.appendChild(h("b","",`Exercises on it (${uses.length})`)); const gr = h("div","gx-mini"); uses.slice(0,12).forEach(e=>{ const t=h("button","gx-mt"); t.type="button"; t.appendChild(img(e,56)); t.appendChild(h("span","",e.n)); t.onclick=()=>openEx(e); gr.appendChild(t); }); c.appendChild(gr); }
      box.appendChild(c); }); });
  box.appendChild(h("h3","gx-gh","Things in gyms that don't work"));
  MYTHS.forEach(([t,d])=>{ const c = h("div","gx-card"); c.append(h("b","","❌ "+t), h("p","",d)); box.appendChild(c); }); }

/* ---------------- CALORIES ---------------- */
function rCal(box){
  const w = kg();
  const c1 = h("div","gx-card"); c1.appendChild(h("h3","","How calories from exercise are worked out"));
  c1.appendChild(h("p","",`Every activity has a MET value: how many times harder than sitting still it is. Calories ≈ MET × body weight (kg) × hours. At ${Math.round(w)} kg, one hour of a MET 5 activity burns about ${kcal(5,w,60)} kcal. Heavier bodies burn more for the same activity, so your numbers are higher than a lighter person's.`));
  c1.appendChild(h("p","hint","These are averages from research (2024 Compendium of Physical Activities). Watches and machines often overestimate. About 1 MET of this is what you'd burn resting anyway. Use them to compare activities, and judge real progress by your weight and waist trend."));
  box.appendChild(c1);
  const c2 = h("div","gx-card"); c2.appendChild(h("h3","","Treadmill calculator (ACSM equations)"));
  const st = {kmh:5.5, grade:6, min:30}; const out = h("div","kpis");
  const row = h("div","gx-row"); row.append(h("span","","Speed km/h"), numIn(st.kmh, v=>{ st.kmh=+v||0; u(); }, "", 0.1), h("span","","Incline %"), numIn(st.grade, v=>{ st.grade=+v||0; u(); }, "", 0.5), h("span","","Minutes"), numIn(st.min, v=>{ st.min=+v||0; u(); }));
  c2.append(row, out);
  function u(){ const m = treadmillMET(st.kmh, st.grade); out.innerHTML="";
    [[`${kcal(m,w,st.min)} kcal`,`in ${st.min} min`],[`MET ${m}`, st.kmh<=6.5?"walking":"running"],[`${kcal(treadmillMET(st.kmh,0),w,st.min)} kcal`,"same speed, flat"],[`+${kcal(m,w,st.min)-kcal(treadmillMET(st.kmh,0),w,st.min)} kcal`,"extra from the incline"]].forEach(([v,l])=>{ const k=h("div","kpi"); k.append(h("b","",v),h("span","",l)); out.appendChild(k); }); }
  u(); c2.appendChild(h("p","hint","Incline is the secret: walking at 5.5 km/h on 6% burns far more than flat, with no running impact.")); box.appendChild(c2);
  const c3 = h("div","gx-card"); c3.appendChild(h("h3","",`Calories at ${Math.round(w)} kg`));
  const t = h("table","gx-table"); const th = h("tr"); ["Activity","MET","30 min","60 min"].forEach(x=>th.appendChild(h("th","",x))); t.appendChild(th);
  ACTIVITIES.forEach(([n,m])=>{ const tr=h("tr"); [n, m, `${kcal(m,w,30)} kcal`, `${kcal(m,w,60)} kcal`].forEach(x=>tr.appendChild(h("td","",String(x)))); t.appendChild(tr); });
  c3.appendChild(t); box.appendChild(c3);
  const c4 = h("div","gx-card"); c4.appendChild(h("h3","","What it adds up to"));
  c4.appendChild(h("p","",`About 7,700 kcal of burned energy ≈ 1 kg of body fat (a common approximation). 5 workouts a week of ~${kcal(4.5,w,60)} kcal = about ${(kcal(4.5,w,60)*5/7700).toFixed(2)} kg of fat a week from exercise alone. Food sets most of your fat loss; exercise speeds it up and keeps your muscle.`));
  box.appendChild(c4); }

/* ---------------- GUIDE ---------------- */
function rGuide(box){
  const sec = (t, items, intro) => { const c = h("details","gx-card"); c.appendChild(h("summary","",t)); if(intro) c.appendChild(h("p","",intro)); const ul=h("ul"); items.forEach(x=>ul.appendChild(h("li","",x))); c.appendChild(ul); box.appendChild(c); };
  sec("🧭 Your first 4 weeks", ["Week 1: learn the movements with light weights. Finish each set feeling you could do 4–5 more.","Week 2: same exercises, a little heavier. 2–3 reps left in the tank.","Week 3: add a set to the main exercises, or a bit more weight.","Week 4: you should know your weights now. Keep adding small amounts when you hit the top of the rep range.","Soreness for 1–2 days in the first weeks is normal. It fades as your body adapts."], "Starting slowly is how you avoid injury and keep coming back.");
  sec("📈 Progressive overload — the one rule of getting results", ["Do a little more than last time: one more rep, or a little more weight.","Use rep ranges: e.g. 10–12. When you get 12 on every set, add weight next time and start again at 10.","The app shows last time's numbers on Today, and a ⬆️ when it's time to add weight.","Never add weight if your form breaks down."]);
  sec("💪 How hard should a set feel?", ["Stop each set with about 1–3 reps still in you (RIR 1–3). That's hard enough to change your body and safe for beginners.","If you could have done 6 more, the weight is too light.","Breathing: breathe out as you push or pull, in as you lower."]);
  sec("❤️ Cardio and heart rate", ["Talk test: moderate = you can talk but not sing. Vigorous = only a few words.","Rough maximum heart rate ≈ 220 − age. Moderate cardio is about 60–75% of that.","Aim for 150–300 minutes of moderate cardio a week (WHO guideline). Your daily steps count too.","At a high body weight, choose incline walking, bike, recumbent bike or elliptical over running."]);
  sec("⏱️ Rest, sets and weekly volume", ["Rest 60–90 s on most exercises; 2–3 min on heavy squats, deadlifts and presses.","Beginners grow on about 10 hard sets per muscle per week. More is not better at first.","Train each muscle 2 times a week; give it 48 hours before training it hard again."]);
  sec("🍽️ Food, water and sleep around the gym", ["Protein at every meal (your daily target is on My plan in Sehat Log).","Before the gym: a light meal 1–2 hours earlier (e.g. oats, banana, eggs). Training on a completely empty stomach can make you dizzy.","Water: sip during the session, more in hot weather; Pakistan's summer heat makes dehydration easy.","Sleep 7–8 hours. Muscle repairs and fat loss both suffer with short sleep."]);
  sec("🛡️ Safety", ["Warm up every time (5–8 minutes) and cool down with 5 minutes of stretching.","Stop for chest pain, dizziness, unusual breathlessness or sharp joint pain. See a doctor before continuing.","See a doctor before starting if you have heart problems, high blood pressure, diabetes, or a BMI of 35 or more.","Ask a trainer to check your form on squats, deadlifts and bench press.","Use collars on bars, safety pins on racks, and a spotter for heavy bench press."]);
  sec("🤝 Gym etiquette", ["Re-rack your weights and wipe benches after use.","Don't sit on a machine scrolling your phone between sets when the gym is busy; let others work in.","Many Pakistani gyms have separate ladies' timings; check the schedule.","Bring a small towel, a water bottle and clean shoes."]);
  const m = h("details","gx-card"); m.appendChild(h("summary","","❌ Myths")); MYTHS.forEach(([t,d])=>{ m.append(h("b","",t), h("p","",d)); }); box.appendChild(m);
  box.appendChild(h("p","hint","Sources: WHO physical activity guidelines; ACSM exercise guidelines; 2024 Adult Compendium of Physical Activities. This is general guidance, not medical advice.")); }

/* ---------------- HISTORY ---------------- */
function rHist(box){
  const ks = Object.keys(G.logs||{}).sort().reverse();
  if(!ks.length){ box.appendChild(h("p","hint","No workouts yet. Log one on Today's workout and it appears here.")); return; }
  const wk = {}; ks.forEach(k=>{ const d = dateObj(k); const mon = new Date(d); mon.setDate(d.getDate()-((d.getDay()+6)%7)); const key = mon.toISOString().slice(0,10); const L = G.logs[k]; const s = wk[key] || (wk[key]={n:0,min:0,kc:0,vol:0});
    s.n++; s.min += L.min || sessionKcal(L).min; s.kc += L.kcal || sessionKcal(L).kcal; (L.items||[]).forEach(it=>(it.sets||[]).forEach(x=>{ if(x.done) s.vol += (+x.kg||0)*(+x.r||0); })); });
  const t = h("table","gx-table"); const th=h("tr"); ["Week of","Workouts","Minutes","kcal","Volume (kg×reps)"].forEach(x=>th.appendChild(h("th","",x))); t.appendChild(th);
  Object.keys(wk).sort().reverse().slice(0,8).forEach(k=>{ const s=wk[k]; const tr=h("tr"); [k,s.n,Math.round(s.min),Math.round(s.kc).toLocaleString(),Math.round(s.vol).toLocaleString()].forEach(x=>tr.appendChild(h("td","",String(x)))); t.appendChild(tr); });
  const c = h("div","gx-card"); c.append(h("h3","","Weekly totals"), t); box.appendChild(c);
  const best = {}; ks.forEach(k=>(G.logs[k].items||[]).forEach(it=>(it.sets||[]).forEach(x=>{ if(x.done && +x.kg && +x.r){ const one = +x.kg*(1 + +x.r/30); if(!best[it.id] || one>best[it.id].one) best[it.id]={one, kg:+x.kg, r:+x.r, k}; } })));
  const pr = h("div","gx-card"); pr.appendChild(h("h3","","Personal bests (estimated 1-rep max, Epley formula)"));
  const t2 = h("table","gx-table"); const th2=h("tr"); ["Exercise","Best set","Est. 1RM","Date"].forEach(x=>th2.appendChild(h("th","",x))); t2.appendChild(th2);
  Object.entries(best).sort((a,b)=>b[1].one-a[1].one).forEach(([id,b])=>{ const tr=h("tr"); [(EXI[id]||{}).n||id, `${b.kg} kg × ${b.r}`, `${Math.round(b.one)} kg`, b.k].forEach(x=>tr.appendChild(h("td","",String(x)))); t2.appendChild(tr); });
  pr.appendChild(t2); box.appendChild(pr);
  const lc = h("div","gx-card"); lc.appendChild(h("h3","","Recent workouts"));
  ks.slice(0,14).forEach(k=>{ const L=G.logs[k]; const d=(G.plan&&G.plan.days[L.day])||{}; lc.appendChild(h("p","",`${k} · ${d.name||"Workout"} · ${L.min||"–"} min · ~${L.kcal||sessionKcal(L).kcal} kcal ${L.finished?"✅":"(not finished)"}`)); });
  box.appendChild(lc); }

/* ---------------- styles ---------------- */
const css = `
#tab-gym .gx-hero{margin-top:18px}#tab-gym .gx-hero h1{margin:0 0 4px}#tab-gym .gx-nav{margin:10px 0 14px}
#tab-gym .gx-nav button{font-size:.86rem;padding:7px 10px}
.gx-card{border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:12px 14px;margin:10px 0}
.gx-card summary{cursor:pointer;font-weight:600}
.gx-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0}
.gx-img{width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;background:#fff;flex:0 0 auto;display:flex;align-items:center;justify-content:center}
.gx-img img{width:100%;height:100%;object-fit:cover}.gx-img.noimg{font-size:1.6rem;background:var(--line)}
.gx-top{display:flex;gap:10px;align-items:flex-start}.gx-tt{flex:1;min-width:0}.gx-tools{display:flex;gap:4px;flex-wrap:wrap;margin-top:6px}.gx-tools .btn{padding:4px 9px}
.gx-target{font-weight:600;margin-top:2px}.gx-up{color:var(--good,#2F8A5B);font-size:.86rem;margin-top:3px}
.gx-sets{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px}
.gx-setlist{margin-top:8px}.gx-set{display:flex;gap:6px;align-items:center;padding:4px 0;border-top:1px solid var(--line)}.gx-sn{width:46px;font-size:.85rem;color:var(--muted)}
.gx-num{width:70px}.gx-reps{width:80px}.gx-kc{color:var(--gym)}
.gx-timer{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.gx-tv{font-size:1.4rem;font-weight:700;min-width:70px}
.gx-filters{display:grid;grid-template-columns:1fr 1fr;gap:8px}.gx-filters input{grid-column:1/-1}
.gx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.gx-tile{border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:8px;display:flex;flex-direction:column;gap:4px;cursor:pointer}
.gx-tile b{font-size:.9rem;line-height:1.25}
.gx-modal{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:100;display:flex;align-items:flex-end;justify-content:center}
.gx-sheet{background:var(--bg);color:var(--ink);width:min(720px,100%);max-height:92vh;overflow:auto;border-radius:18px 18px 0 0;padding:16px 16px 28px}
.gx-close{float:right}.gx-photos{display:grid;grid-template-columns:1fr 1fr;gap:8px}.gx-photos img{width:100%;border-radius:12px;background:#fff}
.gx-photos figure{margin:0}.gx-photos figcaption{font-size:.8rem;color:var(--muted);text-align:center}
.gx-day{border-top:1px solid var(--line);padding:10px 0}.gx-dayhead{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:6px}.gx-dname{flex:1;min-width:140px;font-weight:600}
.gx-pitem{display:flex;gap:8px;align-items:center;padding:6px 0;border-top:1px dashed var(--line)}
.gx-eq summary{display:flex;gap:10px;align-items:center;list-style:none}.gx-gh{margin-top:18px}
.gx-mini{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;margin-top:6px}
.gx-mt{border:1px solid var(--line);background:var(--surface);border-radius:10px;padding:5px;display:flex;flex-direction:column;gap:3px;font-size:.75rem;cursor:pointer;color:var(--ink);text-align:left}
.gx-table{width:100%;border-collapse:collapse;font-size:.86rem}.gx-table td,.gx-table th{border-bottom:1px solid var(--line);padding:5px 4px;text-align:left}
#tab-gym .chip[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
@media (max-width:520px){.gx-filters{grid-template-columns:1fr}.gx-num{width:62px}}`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
})();
