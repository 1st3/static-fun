import type { AreaSlug } from "./park";

export type HighlightKind =
  | "wildlife"
  | "water"
  | "sky"
  | "forest"
  | "sea"
  | "village";

export type Highlight = {
  slug: string;
  name: string;
  kind: HighlightKind;
  /** Months it is worth planning around, 1 = January. */
  months: number[];
  /** The best of those months. */
  peak: number[];
  areas: AreaSlug[];
  trails: string[];
  where: string;
  /** How to actually see it. */
  how: string;
  /** Why it happens here and not elsewhere. */
  why: string;
};

export const KIND_LABEL: Record<HighlightKind, string> = {
  wildlife: "Wildlife",
  water: "Waterfalls & rivers",
  sky: "Sky",
  forest: "Forest",
  sea: "Sea & shore",
  village: "Alma",
};

export const highlights: Highlight[] = [
  {
    slug: "sea-floor-walk",
    name: "Walking the ocean floor",
    kind: "sea",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [6, 7, 8, 9],
    areas: ["coast", "point-wolfe", "headquarters"],
    trails: ["coastal-trail", "matthews-head"],
    where: "Herring Cove Beach, Point Wolfe Beach, and the flats at Alma",
    how: "Arrive about two hours before low water and plan to be back above the wrack line well before the turn. Wear something you do not mind soaking; the cobble is slick and the mud at Alma is genuinely deep in places.",
    why: "The Bay of Fundy is a funnel whose natural sloshing period happens to be almost exactly the period of the Atlantic tide pushing into it. That resonance amplifies a two-metre ocean tide into twelve metres of vertical range here — the largest on Earth — and it is why a mile of sea floor is a place you can stand.",
  },
  {
    slug: "spring-freshet",
    name: "Waterfalls at full flow",
    kind: "water",
    months: [4, 5, 6],
    peak: [4, 5],
    areas: ["river-valleys"],
    trails: ["dickson-falls", "laverty-falls", "third-vault-falls"],
    where: "Dickson, Laverty and Third Vault falls",
    how: "Go within a week of snowmelt or after a heavy rain. The trails will be muddy and the boardwalk at Dickson will be slick — that is the price of seeing these falls doing what they are shaped for.",
    why: "The plateau sits three to four hundred metres above a coast only a few kilometres away, so every river in the park falls steeply over a short distance. In spring the whole upland drains at once through those short, steep channels. The twenty-five waterfalls in this park are all the same fact expressed twenty-five times.",
  },
  {
    slug: "laverty-swim",
    name: "The pool below Laverty Falls",
    kind: "water",
    months: [6, 7, 8, 9],
    peak: [7, 8],
    areas: ["river-valleys"],
    trails: ["laverty-falls"],
    where: "Base of Laverty Falls, 2.5 km in on the Laverty Falls Trail",
    how: "Walk in, swim, walk out — it is a 5 km round trip and there is no shortcut. The water stays cold all summer. Bring a towel and something dry for the walk back up.",
    why: "The plunge pool is scoured out of bedrock by the falls themselves, deep enough to swim in and shaded most of the day by the valley walls. It is the reason this trail has a queue in August.",
  },
  {
    slug: "moose",
    name: "Moose on the plateau",
    kind: "wildlife",
    months: [5, 6, 7, 8, 9, 10],
    peak: [5, 6, 9, 10],
    areas: ["plateau"],
    trails: ["caribou-plain"],
    where: "Caribou Plain, the beaver flowages, and the roadside bogs along Route 114",
    how: "First light or the last hour before dark. Stay on the boardwalk, stay quiet, and keep a very generous distance — a cow with a calf in spring and a bull in the September rut are both genuinely dangerous.",
    why: "Moose need aquatic plants for the sodium they cannot get from browse, so they spend the warm months standing in exactly the shallow, boggy, plant-choked water the plateau is full of. The bog is not where they hide. It is where they eat.",
  },
  {
    slug: "beaver",
    name: "Beaver at the flowage",
    kind: "wildlife",
    months: [5, 6, 7, 8, 9, 10],
    peak: [6, 9],
    areas: ["plateau"],
    trails: ["caribou-plain"],
    where: "The pond on the Caribou Plain loop",
    how: "The last hour of light, standing still on the boardwalk. If you hear a tail slap you have been seen, and you will wait ten minutes for anything else to happen.",
    why: "The bog and the beaver make each other. The dam raises the water table, which drowns the spruce, which opens the canopy, which creates the sedge and shrub habitat the moose then use. Half the plateau's best wildlife ground was built by rodents.",
  },
  {
    slug: "salmon",
    name: "Inner Bay of Fundy Atlantic salmon",
    kind: "wildlife",
    months: [10, 11],
    peak: [11],
    areas: ["river-valleys", "point-wolfe"],
    trails: ["point-wolfe", "goose-river"],
    where: "Upper Salmon River and Point Wolfe River",
    how: "Late autumn, from the bridges and the bank, in low clear water. Do not wade the redds — the gravel nests are easy to destroy and impossible to see until you are standing on one.",
    why: "This population is its own thing: inner Bay of Fundy salmon stay in the bay instead of running to Greenland, and they collapsed to near extinction. Parks Canada, Fort Folly First Nation and partners run a live gene bank and release programme, and the fish returning to these two rivers are one of the few reasons for optimism about the population at all.",
  },
  {
    slug: "peregrine",
    name: "Peregrine falcons",
    kind: "wildlife",
    months: [4, 5, 6, 7, 8],
    peak: [6, 7],
    areas: ["coast"],
    trails: ["matthews-head", "coastal-trail"],
    where: "Coastal cliffs and headlands",
    how: "Watch the airspace off a headland rather than the rock face. A hunting peregrine is a silhouette that changes speed unlike anything else in the sky.",
    why: "Peregrines were wiped out of eastern North America by DDT and reintroduced here through the 1980s and 90s. The sea cliffs give them the ledges they nest on and the updraft they hunt from, and the shorebirds staging on the Fundy mud give them something to hunt.",
  },
  {
    slug: "shorebirds",
    name: "Shorebird migration",
    kind: "wildlife",
    months: [7, 8, 9],
    peak: [8],
    areas: ["coast", "headquarters"],
    trails: ["coastal-trail"],
    where: "Mud flats at Alma and along the upper bay",
    how: "Time it to a rising tide, which pushes the flocks off the flats and concentrates them. Watch from well back — flushing a flock costs birds the fuel they crossed a continent to store.",
    why: "Semipalmated sandpipers stop on Fundy mud to roughly double their body weight on mud shrimp before flying non-stop to South America. The same tides that expose the flats are what make them productive enough to fuel that flight.",
  },
  {
    slug: "fall-colour",
    name: "Acadian forest colour",
    kind: "forest",
    months: [9, 10],
    peak: [10],
    areas: ["river-valleys", "plateau"],
    trails: ["third-vault-falls", "laverty-falls", "dickson-falls"],
    where: "The hardwood slopes above the river valleys",
    how: "The first two weeks of October, and better on an overcast day than a bright one — flat light saturates the colour instead of blowing it out.",
    why: "The Acadian forest is a mixing zone where northern boreal conifers and southern hardwoods overlap. Sugar maple and yellow birch turning against red spruce and balsam fir gives a patchwork rather than the uniform blaze of a pure hardwood forest.",
  },
  {
    slug: "fog",
    name: "Fundy fog",
    kind: "sea",
    months: [6, 7, 8],
    peak: [7],
    areas: ["coast", "point-wolfe"],
    trails: ["matthews-head", "coppermine", "coastal-trail"],
    where: "The coast, most mornings, most of the summer",
    how: "Do not write the day off. The headlands in fog are the best photographs anyone takes here, and the fog usually burns back from the interior valleys by midday even when the coast stays in.",
    why: "Cold water welling up from the depths of the bay meets warm summer air, and the air hits its dew point on contact. It is the same upwelling that makes these waters rich, so the fog and the whales and the shorebird food are all the same phenomenon.",
  },
  {
    slug: "ice-falls",
    name: "Frozen waterfalls",
    kind: "water",
    months: [1, 2, 3],
    peak: [2],
    areas: ["river-valleys"],
    trails: ["dickson-falls", "third-vault-falls"],
    where: "Dickson Falls and Third Vault Falls",
    how: "Ice cleats, not boots. The Dickson boardwalk is not maintained in winter and the ravine holds ice long after the road is bare.",
    why: "The ravines are deep, north-facing and permanently shaded, so they hold cold air long after the surrounding forest has thawed. A falls that is a curtain of water in May is a blue-white column in February.",
  },
  {
    slug: "dark-sky",
    name: "Dark skies and the Milky Way",
    kind: "sky",
    months: [8, 9, 10, 11],
    peak: [8, 9],
    areas: ["plateau", "coast"],
    trails: ["caribou-plain"],
    where: "Bennett Lake, Point Wolfe, and the open bogs on the plateau",
    how: "Give your eyes a full twenty minutes with no white light — red light only, phone away. The Perseids peak in mid-August and the park runs occasional evening programmes.",
    why: "There is no city on this coast. Looking south from the headlands there is nothing between you and open water for a very long way, and the plateau bogs give you an open horizon in a park that is otherwise entirely under trees.",
  },
  {
    slug: "kinnie-brook",
    name: "The brook that disappears",
    kind: "water",
    months: [5, 6, 7, 8, 9, 10],
    peak: [7, 8],
    areas: ["plateau"],
    trails: ["kinnie-brook"],
    where: "Kinnie Brook Trail",
    how: "Go in a dry spell. In high water the brook runs over the top and the trick does not work — the drier the summer, the better the show.",
    why: "There is gypsum and soluble rock under this valley. The brook finds the fractures, goes underground, and leaves a dry stone bed you can walk down while you listen to water running somewhere beneath your feet. It comes back further along, as if nothing happened.",
  },
  {
    slug: "alma-lobster",
    name: "The Alma fishing fleet",
    kind: "village",
    months: [1, 2, 3, 4, 5, 6, 11, 12],
    peak: [5, 6],
    areas: ["headquarters"],
    trails: [],
    where: "Alma wharf, at the park's eastern gate",
    how: "Go at low water to see the boats sitting on the harbour bottom, and again near high water to see them afloat at the top of the wharf. Same boats, same afternoon, twelve metres apart.",
    why: "It is the clearest demonstration of the tide anyone has ever built, and nobody built it. A working fleet has to be designed around a twelve-metre range, and everything about the wharf, the ladders and the mooring tells you so.",
  },
];

export const highlightBySlug = (slug: string) =>
  highlights.find((h) => h.slug === slug);

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
