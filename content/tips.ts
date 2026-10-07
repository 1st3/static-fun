export type TipCategory =
  | "tide"
  | "timing"
  | "safety"
  | "wildlife"
  | "family"
  | "gear"
  | "village";

export type Tip = {
  id: string;
  text: string;
  author: string;
  role: string;
  seasons: number;
  category: TipCategory;
  trail?: string;
  /** Months this matters, 1 = January. Empty = always. */
  months: number[];
};

export const CATEGORY_LABEL: Record<TipCategory, string> = {
  tide: "The tide",
  timing: "Timing",
  safety: "Safety",
  wildlife: "Wildlife",
  family: "With kids",
  gear: "Gear",
  village: "Alma & food",
};

export const tips: Tip[] = [
  {
    id: "t1",
    text: "Plan the whole day backwards from low water, not from breakfast. Everything on this coast that is worth doing — the sea floor at Herring Cove, the beach sections of the Coastal Trail, the flats at Alma — is available for a window of three or four hours and then simply is not. Get the tide times first, then build the day around them.",
    author: "Denise Arsenault",
    role: "Coastal Interpretation Coordinator",
    seasons: 17,
    category: "tide",
    months: [],
  },
  {
    id: "t2",
    text: "The rule below the line is that the water must never get between you and your way up. On a cobble beach against a cliff, a rising Fundy tide will close a gap faster than you can walk back along it. Pick your exit before you go down and keep looking at it.",
    author: "Denise Arsenault",
    role: "Coastal Interpretation Coordinator",
    seasons: 17,
    category: "safety",
    trail: "coastal-trail",
    months: [],
  },
  {
    id: "t3",
    text: "Fog on the coast is not a lost day, it is a redirected one. Drive fifteen minutes inland and three hundred metres up and you will very often come out of it entirely. Do the falls in the morning, come back to the shore in the afternoon when it has burned back.",
    author: "Ronan Gaudet",
    role: "Visitor Experience, Headquarters",
    seasons: 11,
    category: "timing",
    months: [6, 7, 8],
  },
  {
    id: "t4",
    text: "Go to the Alma wharf twice on the same day — once near low water and once near high. Same boats, same rope, same ladder, twelve vertical metres apart. People read the number on a sign and nod. They do not actually believe it until they have seen the fleet sitting on the mud and then floating level with the top of the wharf four hours later.",
    author: "Ronan Gaudet",
    role: "Visitor Experience, Headquarters",
    seasons: 11,
    category: "tide",
    months: [],
  },
  {
    id: "t5",
    text: "Dickson Falls is the busiest trail in the park between eleven and four. It is also fifteen minutes long. Go at eight in the morning and you will have a boardwalk in a dripping ravine entirely to yourself, and the light down in the bottom is far better early anyway.",
    author: "Marie-Claude Doucet",
    role: "Park Warden",
    seasons: 22,
    category: "timing",
    trail: "dickson-falls",
    months: [6, 7, 8, 9],
  },
  {
    id: "t6",
    text: "For moose on Caribou Plain: be on the boardwalk for the last hour of light, and start being quiet in the parking lot rather than at the trailhead. Most people announce themselves for four hundred metres and then wonder where the wildlife is.",
    author: "Marie-Claude Doucet",
    role: "Park Warden",
    seasons: 22,
    category: "wildlife",
    trail: "caribou-plain",
    months: [5, 6, 9, 10],
  },
  {
    id: "t7",
    text: "Give moose a great deal more room than feels necessary, and more again for a cow with a calf in spring or a bull in the September rut. They are enormous, they are faster than you, and an agitated moose is more likely to cause you trouble here than a bear is.",
    author: "Marie-Claude Doucet",
    role: "Park Warden",
    seasons: 22,
    category: "safety",
    trail: "caribou-plain",
    months: [5, 6, 9, 10],
  },
  {
    id: "t8",
    text: "Third Vault Falls is easy for two and a half kilometres and then it is not. The last stretch loses all of the elevation at once and you have to climb every metre of it back out. If anyone in the group is flagging at the rim, turn around there — it is a lovely walk to that point and an unkind one beyond it.",
    author: "Peter Cormier",
    role: "Trail Supervisor",
    seasons: 26,
    category: "safety",
    trail: "third-vault-falls",
    months: [],
  },
  {
    id: "t9",
    text: "Laverty is a swim, not a hike, and people forget the second half. It is two and a half kilometres downhill to the pool with the anticipation carrying you, and two and a half back uphill, cold and wet, without it. Pack a dry layer and something with sugar in it for the return.",
    author: "Peter Cormier",
    role: "Trail Supervisor",
    seasons: 26,
    category: "gear",
    trail: "laverty-falls",
    months: [7, 8],
  },
  {
    id: "t10",
    text: "Take children to the tide line on the Coastal Trail and get them to read the bands on the rock: barnacles high, rockweed below, bare rock between. Then ask why. They work out that it is about how long each thing can stand being underwater, and once they have worked that out themselves they never look at a shoreline the same way.",
    author: "Aliya Haddad",
    role: "Interpretive Guide",
    seasons: 7,
    category: "family",
    trail: "coastal-trail",
    months: [],
  },
  {
    id: "t11",
    text: "Kinnie Brook only performs in a dry spell. Everyone goes in spring when the water is high, sees a perfectly ordinary brook, and leaves puzzled. Go in a dry August and you get to stand on dry stones with the sound of running water coming up from under your boots.",
    author: "Aliya Haddad",
    role: "Interpretive Guide",
    seasons: 7,
    category: "timing",
    trail: "kinnie-brook",
    months: [7, 8, 9],
  },
  {
    id: "t12",
    text: "Get the sticky buns in Alma early. This is not a joke and the bakery will tell you the same thing — they sell out, the queue by mid-morning in July is real, and being the person who arrived at noon is a known and avoidable condition.",
    author: "Ronan Gaudet",
    role: "Visitor Experience, Headquarters",
    seasons: 11,
    category: "village",
    months: [],
  },
  {
    id: "t13",
    text: "The heated salt water pool above the sea is the correct answer on a cold foggy afternoon and almost nobody who is not a repeat visitor knows it exists. Swimming in warm salt water while the bay does something miserable below you is a very specific pleasure.",
    author: "Denise Arsenault",
    role: "Coastal Interpretation Coordinator",
    seasons: 17,
    category: "village",
    months: [6, 7, 8],
  },
  {
    id: "t14",
    text: "Coppermine and Matthews Head are the same drive and the same grade as the busy trails and carry a fraction of the people. If the Dickson lot is overflowing, go to one of those and come back to Dickson at six in the evening.",
    author: "Peter Cormier",
    role: "Trail Supervisor",
    seasons: 26,
    category: "timing",
    trail: "coppermine",
    months: [7, 8],
  },
  {
    id: "t15",
    text: "For the falcons at Matthews Head, stop scanning the cliff face. Watch the open air off the headland instead. A hunting peregrine reads as a silhouette that changes speed in a way nothing else in the sky does, and you will pick it up in your peripheral vision before you consciously see it.",
    author: "Marie-Claude Doucet",
    role: "Park Warden",
    seasons: 22,
    category: "wildlife",
    trail: "matthews-head",
    months: [5, 6, 7, 8],
  },
  {
    id: "t16",
    text: "If you are watching shorebirds on the flats in August, stay well back and let the rising tide bring them to you. Flushing a flock costs those birds fuel they flew a very long way to store, and they need every gram of it for a non-stop flight to South America.",
    author: "Aliya Haddad",
    role: "Interpretive Guide",
    seasons: 7,
    category: "wildlife",
    months: [7, 8, 9],
  },
  {
    id: "t17",
    text: "Cleats, not boots, for the ravines in winter. Dickson's boardwalk is not maintained once the snow comes and the gorges hold ice weeks after the roads are clear. People who would never dream of walking a frozen sidewalk in runners somehow talk themselves into a frozen staircase in a gorge.",
    author: "Peter Cormier",
    role: "Trail Supervisor",
    seasons: 26,
    category: "gear",
    months: [12, 1, 2, 3],
  },
  {
    id: "t18",
    text: "Bennett Lake and the plateau bogs give you an open horizon in a park that is otherwise entirely under trees, which is why they are the stargazing ground. Twenty full minutes with no white light before you expect to see anything — one glance at a phone resets everyone's eyes, so put the phones in a bag at the trailhead.",
    author: "Aliya Haddad",
    role: "Interpretive Guide",
    seasons: 7,
    category: "family",
    months: [8, 9, 10],
  },
];
