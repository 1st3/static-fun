export const park = {
  name: "Fundy National Park",
  short: "Fundy",
  province: "New Brunswick, Canada",
  established: 1948,
  areaKm2: 207,
  trailsKm: 120,
  waterfalls: 25,
  tagline: "The sea leaves, and gives you the floor.",
  blurb:
    "Twice a day the Bay of Fundy moves a hundred billion tonnes of water — more than every river on Earth combined — and twice a day it hands back a mile of ocean floor you can walk on. The park is the forested highland above that shoreline: 207 square kilometres of Acadian forest cut by steep river valleys, twenty-five waterfalls, and a coast that rebuilds itself every six hours and thirteen minutes.",
  ethos: "Know the tide before you walk below the line.",
  landAcknowledgement:
    "Fundy National Park lies within Mi'kma'ki, the unceded traditional territory of the Mi'kmaq People, and is governed by the Peace and Friendship Treaties. Parks Canada works with Fort Folly First Nation on the recovery of the inner Bay of Fundy Atlantic salmon.",
  gateway:
    "Alma, New Brunswick, at the park's eastern entrance — a working fishing village of about 250 people where the boats sit on the mud at low tide.",
  hours:
    "The park is open year-round. The visitor centre at Headquarters runs full hours mid-May through mid-October and reduced hours in the off season.",
  tideNote:
    "Tidal range at Alma runs about 8 m on a neap tide and close to 12 m on a spring tide. That is a four-storey building of water, arriving and leaving, every day, forever.",
} as const;

export type AreaSlug =
  | "coast"
  | "point-wolfe"
  | "headquarters"
  | "plateau"
  | "river-valleys"
  | "backcountry";

export type Area = {
  slug: AreaSlug;
  name: string;
  elevation: string;
  terrain: string;
  forest: string;
  character: string;
};

export const areas: Area[] = [
  {
    slug: "coast",
    name: "The Coast",
    elevation: "Sea level to 60 m",
    terrain: "Cobble beaches, sandstone shelves, sea stacks, mud flats",
    forest: "Wind-stunted spruce and fir on the headlands",
    character:
      "The only part of the park that is a different place in the morning than it was at lunch. At low water you walk out onto ribbed red sandstone and cobble that was under ten metres of sea; six hours later it is gone. Everything here is scheduled by something other than us.",
  },
  {
    slug: "point-wolfe",
    name: "Point Wolfe",
    elevation: "Sea level to 120 m",
    terrain: "River mouth, tidal estuary, covered bridge, old millpond",
    forest: "Mixed Acadian — red spruce, hemlock, yellow birch",
    character:
      "A busy lumber port in the 1800s with a dam, a sawmill and ships loading deals for Britain. The industry is gone and the forest has closed over it, but the shape of the place is still industrial if you know what you are looking at.",
  },
  {
    slug: "headquarters",
    name: "Headquarters & Alma",
    elevation: "20–180 m",
    terrain: "Village, visitor centre, salt water pool, golf course, campgrounds",
    forest: "Second-growth mixed wood",
    character:
      "Where the park meets a working village. Lobster boats, a heated salt water pool above the sea, sticky buns, and the trailheads for the two most-walked paths in the park within a five-minute drive.",
  },
  {
    slug: "plateau",
    name: "The Plateau",
    elevation: "300–400 m",
    terrain: "Rolling upland, raised bogs, beaver flowages, lakes",
    forest: "Spruce-fir with black spruce and larch in the bogs",
    character:
      "Flat, high, wet, and quiet. The plateau collects the weather and holds it — this is where the fog sits and where the bogs are. It is also the best moose ground in the park and the easiest walking.",
  },
  {
    slug: "river-valleys",
    name: "River Valleys",
    elevation: "40–300 m",
    terrain: "Steep-sided gorges, waterfalls, gravel-bed salmon rivers",
    forest: "Old hemlock and yellow birch on the shaded slopes",
    character:
      "The rivers cut hard and fast off the plateau toward the sea, which is why a park this size has twenty-five waterfalls. Cool, shaded, loud with water, and ten degrees cooler than the road on an August afternoon.",
  },
  {
    slug: "backcountry",
    name: "Backcountry",
    elevation: "Sea level to 380 m",
    terrain: "Long cart roads, remote coast, wilderness campsites",
    forest: "Unbroken Acadian forest",
    character:
      "Beyond the day-use ring. The Goose River road and the Fundy Circuit lead into country where you will see nobody, and where the coast at the far end is reachable only on foot and only with the tide in mind.",
  },
];

export const areaBySlug = (slug: AreaSlug) => areas.find((a) => a.slug === slug)!;
