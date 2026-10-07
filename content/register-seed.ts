import type { Post } from "@/lib/board";

/**
 * Seeds the trail register on first run. Timestamps are relative so the board
 * always reads as "this week" rather than a frozen archive.
 */
const day = 86_400_000;
const ago = (d: number) => new Date(Date.now() - d * day).toISOString();

export const registerSeed: Post[] = [
  {
    id: "p1",
    author: "Hannah Broderick",
    trail: "coastal-trail",
    kind: "tide",
    title: "Walked out onto the floor at Herring Cove this morning — window was shorter than I planned for",
    body: "Beautiful, completely worth it, but a note for anyone going this week: it was a small tide and the water did not drop nearly as far as it did when we were here in June. We had maybe two and a half usable hours rather than four. The height column in the table is not decoration, which I now understand.",
    createdAt: ago(1),
    comments: [
      {
        id: "c1",
        author: "Denise Arsenault",
        body: "This is exactly the right lesson and thank you for posting it. Neap tides this week — you lose a couple of metres of drop compared to a spring, and the window narrows at both ends. Back to bigger ranges around the 24th.",
        createdAt: ago(1),
      },
      {
        id: "c2",
        author: "Ty Okonkwo",
        body: "Same experience Sunday. Went out expecting the June version and got about half of it.",
        createdAt: ago(1),
      },
    ],
  },
  {
    id: "p2",
    author: "Ty Okonkwo",
    trail: "coppermine",
    kind: "conditions",
    title: "Large blowdown across the Coppermine loop, roughly 1.8 km in from the trailhead",
    body: "Spruce down across the trail, about chest height, walked around it on the uphill side without much trouble but it is awkward with a child and would be a real problem with a stroller or a bad knee. Saturday afternoon, dry conditions otherwise, rest of the loop in good shape.",
    createdAt: ago(3),
    comments: [
      {
        id: "c3",
        author: "Peter Cormier",
        body: "Thank you — that is the first we have heard of it. Crew will look at it Thursday. This is the fourth time this season the register has told us about something before any other channel did.",
        createdAt: ago(3),
      },
      {
        id: "c4",
        author: "Ty Okonkwo",
        body: "Glad it was useful. Happy to post anything else I trip over.",
        createdAt: ago(2),
      },
    ],
  },
  {
    id: "p3",
    author: "Josefien Klaassen",
    trail: "caribou-plain",
    kind: "sighting",
    title: "Cow and calf at the flowage, about twenty minutes before dark",
    body: "Stood still on the boardwalk for maybe fifteen minutes and they came out at the far end of the pond and fed for a long time without ever looking at us. Kept our distance and left by the way we came so as not to walk toward them. Hands down the best thing that has happened to my family this year.",
    createdAt: ago(4),
    comments: [
      {
        id: "c5",
        author: "Marie-Claude Doucet",
        body: "Perfect handling — staying put, keeping the distance, and backing out the way you came rather than continuing past them. A cow with a calf is the one I worry about most. Glad you got it.",
        createdAt: ago(4),
      },
      {
        id: "c6",
        author: "Gwen Farquharson",
        body: "Tried the same spot last night after reading this, nothing at all. Will try again at first light instead.",
        createdAt: ago(2),
      },
    ],
  },
  {
    id: "p4",
    author: "Rafael Nogueira",
    trail: "matthews-head",
    kind: "sighting",
    title: "Peregrine off the head, and the tip about watching the airspace is completely right",
    body: "Spent twenty minutes scanning the cliff face like an idiot and saw nothing. Then read the tip on this site about watching the open air instead, tried it, and picked one up inside about ninety seconds — it really is a shape that moves wrongly compared to everything else out there. Two passes then gone.",
    createdAt: ago(6),
    comments: [
      {
        id: "c7",
        author: "Marie-Claude Doucet",
        body: "Twenty-two seasons and I still find them peripherally before I find them properly. Your eye catches the speed change before your brain catches the bird.",
        createdAt: ago(5),
      },
    ],
  },
  {
    id: "p5",
    author: "Gwen Farquharson",
    trail: "park",
    kind: "question",
    title: "First visit in October with two kids, 6 and 9 — what would you actually do with three days?",
    body: "We have three days and a car and no fixed plans. Not looking for a full itinerary, just what people who know the place would prioritise with children that age in October. Happy to walk a reasonable distance but nothing epic.",
    createdAt: ago(7),
    comments: [
      {
        id: "c8",
        author: "Aliya Haddad",
        body: "Day one: Alma wharf at low water and again near high, so they see the twelve metres for themselves — that single thing does more than anything else I can tell them. Day two: Dickson Falls early, then Caribou Plain boardwalk at dusk for moose. Day three: Herring Cove at low water and walk out onto the floor. Colour should be good on the valley trails the whole time.",
        createdAt: ago(7),
      },
      {
        id: "c9",
        author: "Hannah Broderick",
        body: "Adding one: get them to read the bands on the rock at the tide line and work out why. Mine are 7 and 10 and they figured it out on their own and have not stopped talking about it.",
        createdAt: ago(6),
      },
      {
        id: "c10",
        author: "Gwen Farquharson",
        body: "This is better than anything I found anywhere else, thank you both. Wharf twice in one day it is.",
        createdAt: ago(6),
      },
    ],
  },
  {
    id: "p6",
    author: "Imran Chaudhry",
    trail: "third-vault-falls",
    kind: "conditions",
    title: "Did the full thing Saturday — the rim warning on the trail page is not an exaggeration",
    body: "Easy and pleasant for two and a half kilometres, then the last stretch drops everything at once. Coming back up took us nearly twice as long as going down. We were fine but we passed a couple at the bottom who were clearly not going to enjoy the next hour. Falls were lower than I expected for September, still worth it.",
    createdAt: ago(8),
    comments: [
      {
        id: "c11",
        author: "Peter Cormier",
        body: "September is the low-flow month — the plateau has been draining all summer. Come back in May and it is a different waterfall entirely. And yes: the rim is the decision point, not the trailhead.",
        createdAt: ago(8),
      },
    ],
  },
  {
    id: "p7",
    author: "Solenne Mercier",
    trail: "kinnie-brook",
    kind: "sighting",
    title: "The brook actually disappeared and I am unreasonably delighted",
    body: "Came last September in high water and saw an ordinary brook and wondered what the fuss was. Came back last week after this dry spell and the bed is dry stones with water clearly audible underneath. Stood there for ten minutes listening to a river I could not see. Genuinely the strangest thing in the park.",
    createdAt: ago(10),
    comments: [
      {
        id: "c12",
        author: "Aliya Haddad",
        body: "This is why I nag people about going in a dry spell. Two visits, same trail, completely different phenomenon. Glad you came back for it.",
        createdAt: ago(10),
      },
    ],
  },
  {
    id: "p8",
    author: "Beatrix Almeida",
    trail: "laverty-falls",
    kind: "note",
    title: "Swam it in September. Cold. Would do again. Bring the dry layer.",
    body: "Water was properly cold and the walk back up while damp was a lesson. The advice on the trail page about packing a dry layer and something sugary for the return is correct and I ignored it and I paid for it. Pool was empty though, which in August it absolutely would not have been.",
    createdAt: ago(12),
    comments: [
      {
        id: "c13",
        author: "Peter Cormier",
        body: "The September trade: cold water, no queue. Most regulars think it is the better deal.",
        createdAt: ago(11),
      },
    ],
  },
  {
    id: "p9",
    author: "Declan Moriarty",
    trail: "goose-river",
    kind: "conditions",
    title: "Out to Goose River and back in a day — long, easy underfoot, bring more water than you think",
    body: "The old cart road grade means it is never technical, which lulls you. It is still sixteen kilometres and the descent at the end is real. Nobody else on the trail all day. Checked the tide before going down to the beach, which I would not have thought to do before reading the trail page here.",
    createdAt: ago(15),
    comments: [
      {
        id: "c14",
        author: "Denise Arsenault",
        body: "Good. The far end is properly remote and the shore there is tidal ground like anywhere else on this coast. Anyone thinking of continuing onto the Footpath from there: that is a different undertaking entirely, please come and talk to us first.",
        createdAt: ago(14),
      },
    ],
  },
  {
    id: "p10",
    author: "Nkechi Adeyemi",
    trail: "park",
    kind: "note",
    title: "The fog thing — I was annoyed for a day and then it became the best part of the trip",
    body: "Arrived to three days forecast socked in and was ready to write the whole thing off. Read the piece on this site about why the fog happens, went out to Matthews Head in it anyway, and got the photographs of my life. Open meadow, headland, sea completely invisible below, and the far end of the trail just not there. Then drove inland to the falls in the afternoon and came out into sunshine exactly as described.",
    createdAt: ago(5),
    comments: [
      {
        id: "c15",
        author: "Ronan Gaudet",
        body: "Inland in the morning, coast in the afternoon. It is the single most useful local habit and it takes visitors about four days to work it out on their own. Glad you got there in one.",
        createdAt: ago(5),
      },
      {
        id: "c16",
        author: "Rafael Nogueira",
        body: "Can confirm. The headland in fog is worth planning for rather than around.",
        createdAt: ago(4),
      },
    ],
  },
];
