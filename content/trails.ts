import type { AreaSlug } from "./park";

export type Difficulty = "easy" | "moderate" | "difficult";

export type Waypoint = {
  km: number;
  name: string;
  note: string;
};

export type Trail = {
  slug: string;
  name: string;
  area: AreaSlug;
  difficulty: Difficulty;
  /** Kilometres, round trip or full loop. */
  distanceKm: number;
  /** Metres of elevation change. */
  gainM: number;
  /** Hours, moving. */
  hours: number;
  shape: "loop" | "out-and-back" | "one-way";
  trailhead: string;
  parking: string;
  summary: string;
  /** Why this ground looks and behaves the way it does. */
  ground: string;
  footing: string;
  bestTime: string;
  /** Whether the tide governs this walk. */
  tide: "critical" | "relevant" | "none";
  tideNote?: string;
  accessibility: string;
  waypoints: Waypoint[];
  highlights: string[];
  /** Stroke colour on the park map. */
  color: string;
  /** SVG path in the 0 0 900 620 park-map viewBox. */
  path: string;
  label: { x: number; y: number };
  closed?: boolean;
};

export const trails: Trail[] = [
  {
    slug: "dickson-falls",
    name: "Dickson Falls",
    area: "river-valleys",
    difficulty: "easy",
    distanceKm: 1.5,
    gainM: 60,
    hours: 0.75,
    shape: "loop",
    trailhead: "Dickson Falls parking area, off Point Wolfe Road near Headquarters",
    parking: "Roughly 40 spaces, full most July and August afternoons",
    summary:
      "The most-walked trail in the park, and deservedly. A short boardwalk loop that drops into a cool, dripping ravine and comes back out again.",
    ground:
      "A narrow, steep-sided ravine that faces north and almost never sees direct sun. The air in the bottom runs several degrees cooler than the parking lot, the humidity stays high all summer, and the rock walls are furred with moss and liverworts that would not survive fifty metres away. It is the smallest, easiest example of the thing the whole park is made of: water falling fast off a plateau toward a sea that is very close.",
    footing:
      "Boardwalk and stairs the whole way, with steps both down and back up. Slick in rain and not maintained in winter.",
    bestTime:
      "Early morning for the light down in the ravine, or right after heavy rain when the falls are loud.",
    tide: "none",
    accessibility:
      "The upper viewing platform is reachable on a short, firm path from the parking area. The full loop has many stairs and is not wheelchair accessible.",
    waypoints: [
      {
        km: 0.2,
        name: "Upper platform",
        note: "Accessible viewpoint. Good place to send people who cannot do the stairs while the rest of the group does the loop.",
      },
      {
        km: 0.5,
        name: "The ravine floor",
        note: "Stop and notice the temperature drop — usually four or five degrees from the lot. This is the coolest air in the park on an August afternoon.",
      },
      {
        km: 0.8,
        name: "Lower falls view",
        note: "A cascade rather than a single drop. In February this whole face is a blue-white column of ice.",
      },
    ],
    highlights: ["spring-freshet", "ice-falls", "fall-colour"],
    color: "#4fa3c7",
    path: "M 756 394 C 734 398 724 416 736 432 C 748 448 776 446 786 430 C 796 414 782 392 756 394 Z",
    label: { x: 806, y: 400 },
  },
  {
    slug: "caribou-plain",
    name: "Caribou Plain",
    area: "plateau",
    difficulty: "easy",
    distanceKm: 3.4,
    gainM: 30,
    hours: 1.25,
    shape: "loop",
    trailhead: "Caribou Plain parking area on Route 114, plateau section",
    parking: "About 25 spaces",
    summary:
      "A flat loop across a raised bog and around a beaver pond, on boardwalk for much of its length. The best chance of a moose in the park and the easiest walking.",
    ground:
      "A raised bog sitting on the flat top of the plateau, fed only by rain — no stream runs into it. That makes it acidic, nutrient-poor and cold, which is why it grows black spruce, larch, sphagnum and pitcher plants and almost nothing else. Beaver dams at the outflow hold the water table up, drowning the spruce at the margins and opening exactly the shrubby wet ground moose want. Nothing here is accidental and most of it was built by rodents.",
    footing:
      "Boardwalk over the bog, packed gravel elsewhere. Wet and buggy in June.",
    bestTime:
      "First light or the last hour before dark, for moose and beaver. Midday is pleasant and quiet and you will see neither.",
    tide: "none",
    accessibility:
      "The boardwalk section is flat, wide and among the most accessible walking in the park, though the full loop includes unsurfaced sections.",
    waypoints: [
      {
        km: 0.6,
        name: "Bog boardwalk",
        note: "Look down, not out. Pitcher plants and sundew grow within a metre of the boards — carnivorous because there is no nitrogen to be had from the peat.",
      },
      {
        km: 1.4,
        name: "The flowage",
        note: "Beaver pond with drowned spruce standing in it. Stand still for ten minutes at dusk. A tail slap means you have been counted.",
      },
      {
        km: 2.2,
        name: "Moose meadow",
        note: "Wet sedge and shrub at the pond margin. The most reliable moose sighting in the park, and the reason to keep your voice down from the parking lot onward.",
      },
    ],
    highlights: ["moose", "beaver", "dark-sky"],
    color: "#7fae5d",
    path: "M 686 292 C 654 296 640 320 658 342 C 676 364 714 362 728 342 C 742 322 722 290 686 292 Z",
    label: { x: 622, y: 288 },
  },
  {
    slug: "laverty-falls",
    name: "Laverty Falls",
    area: "river-valleys",
    difficulty: "moderate",
    distanceKm: 5.0,
    gainM: 150,
    hours: 2,
    shape: "out-and-back",
    trailhead: "Laverty Road, off Route 114",
    parking: "About 20 spaces, overflows badly on hot August weekends",
    summary:
      "A steady descent through hardwood to a twelve-metre falls with a plunge pool at the bottom that people swim in all summer.",
    ground:
      "Laverty Brook cuts down off the plateau through a bed of hard rock, and where it meets a resistant ledge it drops all at once. The pool at the base is scoured out by the falls themselves — the water arrives with enough force to excavate its own swimming hole and then keeps it clear of gravel. The valley walls shade it for most of the day, which is why the water stays cold in August and why the walk back up feels longer than the walk down.",
    footing:
      "Rooty and rocky, steady grade down on the way in and up on the way out. Muddy in spring.",
    bestTime:
      "July and August if you intend to swim. May if you want to see the falls at full freshet and have the trail to yourself.",
    tide: "none",
    accessibility:
      "Not accessible. Sustained grade, roots, rock and stream crossings.",
    waypoints: [
      {
        km: 1.2,
        name: "Hardwood bench",
        note: "Sugar maple and yellow birch — the southern half of the Acadian mix. The first two weeks of October this stretch is the best colour on any trail in the park.",
      },
      {
        km: 2.5,
        name: "The falls and pool",
        note: "Twelve metres. The pool is deep enough to swim and cold enough that most people do it once, loudly. No lifeguard, no rescue, nobody but whoever else walked in.",
      },
    ],
    highlights: ["laverty-swim", "spring-freshet", "fall-colour"],
    color: "#3f8fb5",
    path: "M 520 258 C 508 278 494 296 482 312 C 476 320 472 318 468 324",
    label: { x: 442, y: 336 },
  },
  {
    slug: "third-vault-falls",
    name: "Third Vault Falls",
    area: "river-valleys",
    difficulty: "difficult",
    distanceKm: 7.4,
    gainM: 250,
    hours: 3,
    shape: "out-and-back",
    trailhead: "Laverty Road, 3 km past the Laverty Falls trailhead",
    parking: "About 15 spaces",
    summary:
      "The tallest waterfall in the park at sixteen metres, reached by an easy walk followed by a steep, punishing descent into the gorge — which you then have to climb back out of.",
    ground:
      "This is the deepest cut in the park. The stream has worked its way down through the plateau edge into a narrow gorge with walls that hold cold air and shade year-round, and the falls drop into a dark amphitheatre that feels like a different climate from the flat forest you crossed to get there. The last kilometre loses almost all of the elevation, which is the whole reason the walk is rated hard.",
    footing:
      "Flat and easy for 2.5 km, then a steep, rooty, relentless drop into the gorge. Slippery when wet.",
    bestTime:
      "May for maximum flow, October for colour on the approach, February for the frozen column if you have cleats and know what you are doing.",
    tide: "none",
    accessibility: "Not accessible. Steep sustained descent, uneven rock and roots.",
    waypoints: [
      {
        km: 2.6,
        name: "The rim",
        note: "Where the easy part ends. Everything after this is down, and everything on the way back is up. Turn around here if the group is tired — it is a pleasant walk to this point and a hard one beyond it.",
      },
      {
        km: 3.7,
        name: "The amphitheatre",
        note: "Sixteen metres into a shaded bowl. Cold, loud and worth it. Do not scramble the wet rock at the base for a better angle.",
      },
    ],
    highlights: ["spring-freshet", "ice-falls", "fall-colour"],
    color: "#2f7d9e",
    path: "M 650 320 C 638 302 622 284 604 270 C 600 266 598 264 596 262",
    label: { x: 566, y: 250 },
  },
  {
    slug: "matthews-head",
    name: "Matthews Head",
    area: "coast",
    difficulty: "moderate",
    distanceKm: 4.5,
    gainM: 120,
    hours: 2,
    shape: "loop",
    trailhead: "Matthews Head parking area on Point Wolfe Road",
    parking: "About 20 spaces",
    summary:
      "Open meadows and an old farmstead on a coastal headland, with the best sea views in the park and a set of cliffs the peregrines hunt from.",
    ground:
      "This headland was cleared and farmed before it was a park, and the forest has not fully taken it back — which is why you get open meadow and long sightlines on a coast that is otherwise solid spruce. The seaward edge is exposed sandstone and conglomerate, undercut by twelve metres of tide arriving twice a day, and the cliff line is retreating measurably within a human lifetime.",
    footing:
      "Grassy meadow, forest path and some rocky headland. Exposed to wind.",
    bestTime:
      "Late afternoon for the light. Or go in fog, which is what this headland is actually famous for.",
    tide: "relevant",
    tideNote:
      "The loop itself stays above the high-water line and is safe at any tide. The beach access below the head is not — if you drop down to the shore, treat it as a tidal route and know when the water turns.",
    accessibility:
      "Not accessible. Uneven meadow, roots, and steps on the headland section.",
    waypoints: [
      {
        km: 1.1,
        name: "The old farmstead",
        note: "Foundation stones and a lilac that outlived the house. Lilacs are the reliable tell for a former dooryard anywhere in the Maritimes.",
      },
      {
        km: 2.0,
        name: "The head",
        note: "Full sea view. Watch the airspace, not the rock, for peregrines — a hunting falcon reads as a silhouette that changes speed wrongly.",
      },
      {
        km: 3.0,
        name: "Meadow descent",
        note: "Open ground, good for warblers in June and the best place in the park to watch fog come in off the water like a lid closing.",
      },
    ],
    highlights: ["peregrine", "fog", "sea-floor-walk"],
    color: "#c4703f",
    path: "M 570 458 C 542 464 530 486 548 502 C 566 518 598 512 606 492 C 614 472 596 454 570 458 Z",
    label: { x: 634, y: 460 },
  },
  {
    slug: "coppermine",
    name: "Coppermine Trail",
    area: "coast",
    difficulty: "moderate",
    distanceKm: 4.4,
    gainM: 130,
    hours: 2,
    shape: "loop",
    trailhead: "Point Wolfe Road, near the Point Wolfe campground turn",
    parking: "About 15 spaces",
    summary:
      "A forest loop to the site of a nineteenth-century copper mine, with coastal views and the quiet particular to a place that was once busy and is now not.",
    ground:
      "Someone looked at this coast in the 1800s, found copper in the bedrock, and put men and money into getting it out. It did not pay. What is left is a shaft, some tailings, and a forest that has spent a century and a half closing over the evidence. The rock that made it worth trying is still visible where the trail crosses outcrop.",
    footing: "Forest path, roots and rock, one steeper section near the shore.",
    bestTime: "Any time. It is one of the few trails here that is never crowded.",
    tide: "relevant",
    tideNote:
      "Viewpoints are above the tide. Any descent to the shoreline below is tidal ground — check the turn before you go down.",
    accessibility: "Not accessible. Roots, rock and grade throughout.",
    waypoints: [
      {
        km: 1.5,
        name: "The mine site",
        note: "Interpretive panel and the remains of the workings. Stay out of and well back from any opening — old shafts are not stable and are not maintained.",
      },
      {
        km: 2.6,
        name: "Shore overlook",
        note: "Down onto the cobble and the bay. At low water the shelf below runs out a surprising distance.",
      },
    ],
    highlights: ["fog", "sea-floor-walk"],
    color: "#a8603c",
    path: "M 456 466 C 430 472 418 494 436 510 C 454 526 484 518 490 498 C 496 478 482 462 456 466 Z",
    label: { x: 398, y: 468 },
  },
  {
    slug: "coastal-trail",
    name: "Coastal Trail",
    area: "coast",
    difficulty: "moderate",
    distanceKm: 5.4,
    gainM: 180,
    hours: 2.5,
    shape: "one-way",
    trailhead: "Herring Cove Beach to the Point Wolfe Road, or the reverse",
    parking: "Herring Cove day-use area, about 30 spaces",
    summary:
      "The park's shoreline walk — headland, cobble beach, spruce and sea. The trail that makes the tide feel like a fact rather than a statistic.",
    ground:
      "Everything on this walk is shaped by twelve metres of water arriving and leaving twice a day. The cobble is rounded by it, the cliffs are undercut by it, the spruce on the exposed edges is pruned by the salt wind that comes with it, and the band of bare rock between the high and low marks is a vertical map of what can survive being submerged for how long. Nowhere else in the park is the geometry this legible.",
    footing:
      "Forest path, stairs, and cobble beach sections. The cobble is hard walking and slick with weed near the low-water mark.",
    bestTime:
      "Plan the walk around low water so the beach sections are open and generous rather than pinched against the cliff.",
    tide: "critical",
    tideNote:
      "Sections of this route use the beach. A rising Fundy tide comes in faster than people expect and can cut off a cobble section against a cliff with no way up. Check the official tide tables, start on a falling tide, and never let the water get between you and your exit.",
    accessibility:
      "Not accessible. Stairs, uneven cobble and tidal sections.",
    waypoints: [
      {
        km: 0.0,
        name: "Herring Cove Beach",
        note: "At low water the sea floor here is a wide cobble and sandstone shelf you can walk out onto. At high water it is gone. Same place, six hours apart.",
      },
      {
        km: 1.8,
        name: "The tide line",
        note: "Look at the cliff face and read the bands: barnacle, then rockweed, then bare rock. That is a chart of submersion time drawn by the organisms themselves.",
      },
      {
        km: 3.5,
        name: "Squaws Cap view",
        note: "Sea stack offshore, isolated by the same undercutting that is slowly taking the headland you are standing on.",
      },
    ],
    highlights: ["sea-floor-walk", "fog", "shorebirds", "peregrine"],
    color: "#d98b45",
    path: "M 694 478 C 668 486 640 490 612 492 C 592 494 576 496 560 500",
    label: { x: 648, y: 516 },
  },
  {
    slug: "goose-river",
    name: "Goose River Trail",
    area: "backcountry",
    difficulty: "difficult",
    distanceKm: 15.9,
    gainM: 400,
    hours: 6,
    shape: "out-and-back",
    trailhead: "End of Point Wolfe Road, past the campground",
    parking: "About 12 spaces",
    summary:
      "A long walk west on an old cart road to a wilderness beach at the mouth of the Goose River, and the start of the Fundy Footpath beyond it.",
    ground:
      "This was a hauling road before it was a trail, which is why sixteen kilometres of backcountry is graded gently enough to be merely long rather than technical. The reward at the far end is a river mouth that almost nobody reaches: a cobble beach, a wilderness campsite, and a coast that continues west for another fifty kilometres with no road touching it.",
    footing:
      "Wide, even old road surface most of the way, with wet sections and a descent to the river at the end.",
    bestTime:
      "Long summer days. This is a full day out and there is no shortcut back.",
    tide: "critical",
    tideNote:
      "The beach and river mouth at the far end are tidal. Anyone continuing onto the Fundy Footpath is committing to a route with several tide-dependent crossings — that is a serious multi-day undertaking requiring registration, tide tables and experience, not an extension of a day hike.",
    accessibility: "Not accessible. Remote, long, with a steep final descent.",
    waypoints: [
      {
        km: 4.0,
        name: "The long grade",
        note: "Nothing happens here for a while. That is the trail's actual character and the reason most people turn back.",
      },
      {
        km: 7.9,
        name: "Goose River mouth",
        note: "Wilderness campsite, cobble beach, and the Fundy Footpath heading west. Check the tide before you walk out onto the shore.",
      },
    ],
    highlights: ["sea-floor-walk", "salmon", "dark-sky"],
    color: "#8c6f4a",
    path: "M 428 510 C 360 520 280 532 200 540 C 148 546 100 549 62 551",
    label: { x: 214, y: 526 },
  },
  {
    slug: "kinnie-brook",
    name: "Kinnie Brook",
    area: "plateau",
    difficulty: "moderate",
    distanceKm: 2.8,
    gainM: 90,
    hours: 1.25,
    shape: "out-and-back",
    trailhead: "Route 114, plateau section west of Wolfe Lake",
    parking: "About 10 spaces",
    summary:
      "A short walk to the strangest thing in the park: a brook that runs into a dry stone bed and vanishes underground while you listen to it from above.",
    ground:
      "Soluble rock underlies this valley, and water has been quietly dissolving it for a very long time. The brook finds the fractures and takes them, leaving a dry bed of stones on the surface with the sound of running water coming up from underneath. Further down the valley it reappears as though nothing had happened. It is karst — the same process that makes caves — caught in the act at a scale you can walk along.",
    footing:
      "Forest path with a stream crossing and a descent into the valley. The dry bed itself is loose cobble.",
    bestTime:
      "A dry spell in July or August. In high water the brook runs over the top and the whole trick is hidden.",
    tide: "none",
    accessibility: "Not accessible. Stream crossing, grade and loose footing.",
    waypoints: [
      {
        km: 0.9,
        name: "The sink",
        note: "Where the water goes. In a dry August you can stand on dry stones and hear the brook running under your boots.",
      },
      {
        km: 1.4,
        name: "The resurgence",
        note: "Where it comes back. Between here and the sink is a length of brook that exists but cannot be seen.",
      },
    ],
    highlights: ["kinnie-brook"],
    color: "#6f8f9e",
    path: "M 352 158 C 344 172 336 186 328 200 C 324 207 322 210 320 214",
    label: { x: 292, y: 222 },
  },
];

export const trailBySlug = (slug: string) => trails.find((t) => t.slug === slug);

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Easy",
  moderate: "Moderate",
  difficult: "Difficult",
};

export const TIDE_LABEL: Record<Trail["tide"], string> = {
  critical: "Tide-critical",
  relevant: "Tide matters",
  none: "Tide-independent",
};

/** Stylised base map geography, same 0 0 900 620 viewBox. */
export const mapBase = {
  coast:
    "M 40 552 C 170 540 300 524 430 512 C 550 501 660 490 762 468 C 812 457 852 448 880 438",
  sea:
    "M 40 552 C 170 540 300 524 430 512 C 550 501 660 490 762 468 C 812 457 852 448 880 438 L 900 620 L 20 620 Z",
  roads: [
    "M 862 446 C 812 428 760 404 706 372 C 636 330 556 286 486 244 C 416 202 344 166 282 142",
    "M 706 372 C 656 402 580 440 516 470 C 482 486 452 500 428 510",
    "M 748 392 C 736 414 718 448 696 478",
  ],
  lakes: [
    { cx: 650, cy: 336, rx: 26, ry: 15, name: "Bennett Lake" },
    { cx: 296, cy: 206, rx: 30, ry: 16, name: "Wolfe Lake" },
    { cx: 486, cy: 250, rx: 20, ry: 11, name: "Chambers Lake" },
  ],
  places: [
    { x: 846, y: 452, name: "Alma", kind: "village" as const },
    { x: 792, y: 434, name: "Headquarters", kind: "centre" as const },
    { x: 696, y: 478, name: "Herring Cove", kind: "beach" as const },
    { x: 428, y: 510, name: "Point Wolfe", kind: "beach" as const },
    { x: 62, y: 551, name: "Goose River", kind: "wild" as const },
  ],
};
