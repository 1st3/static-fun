export type Tale = {
  slug: string;
  title: string;
  teller: string;
  tellerRole: string;
  place: string;
  trail?: string;
  era: string;
  excerpt: string;
  body: string[];
};

export const tales: Tale[] = [
  {
    slug: "the-bay-that-rings",
    title: "The Bay That Rings Like a Bell",
    teller: "Park interpretation",
    tellerRole: "Headquarters visitor centre",
    place: "Everywhere below the high-water line",
    era: "Roughly the last five thousand years",
    excerpt:
      "The ocean tide arriving at the mouth of this bay is about a metre. By the time it reaches Alma it is twelve. Nobody adds water. The bay does it for free.",
    body: [
      "Carry a shallow pan of water across a room and you will discover something within about four steps: the water starts sloshing end to end, and if your steps happen to match the sloshing, it gets worse fast. Match it badly and nothing much happens. Match it well and you wear the water.",
      "The Bay of Fundy is the pan. It is a long, narrowing, shallowing funnel, and like any body of water in a basin it has a natural rhythm — a period at which water sloshed from one end will return. For this bay, together with the Gulf of Maine it opens into, that period is a little over twelve hours.",
      "The Atlantic tide arriving at the mouth has a period of twelve hours and twenty-five minutes.",
      "Those two numbers are close enough to matter enormously. Every push from the ocean arrives at almost exactly the moment the bay is ready to be pushed, and the energy accumulates instead of cancelling. A tide that is roughly a metre out in the open Atlantic becomes, by the time the funnel has narrowed and shallowed and the resonance has done its work, a vertical range of twelve metres at Alma and sixteen at the head of the Minas Basin. It is the largest tidal range on Earth and it is not because there is more water here. It is because the shape of the basin happens to be in tune with the Moon.",
      "A hundred billion tonnes of water move in and out of this bay on every tide — more than the combined flow of every river on the planet. It arrives twice a day. It has been doing so, in roughly the present configuration, since the basin took its current shape after the last glaciation.",
      "This is why the park is built the way it is. Why the rivers fall so steeply over such a short distance. Why the cliffs on the Coastal Trail are undercut. Why the boats in Alma sit on the harbour bottom at breakfast and float level with the wharf at lunch. Why there is a band of bare rock between the barnacles and the rockweed, and why that band is a chart of how long a thing can survive being underwater.",
      "And it is why the first question anyone asks here is not about the weather. It is: what is the tide doing?",
    ],
  },
  {
    slug: "molly-kool",
    title: "Captain Kool",
    teller: "Alma village history",
    tellerRole: "Collected from the wharf",
    place: "Alma",
    era: "1916–2009",
    excerpt:
      "In 1939 a woman from this village walked into a marine school, took the examinations, and became the first registered female sea captain in North America. She was twenty-three.",
    body: [
      "Myrtle Kool — everyone called her Molly — was born in Alma in 1916 and grew up on her father's scow hauling lumber and freight around the upper bay. That is an ordinary Alma childhood. The rest of it is not.",
      "She wanted her master's ticket. The marine school in Yarmouth had no particular objection to teaching her and the regulations had no particular provision for her either, since the rules were written throughout in the masculine and nobody had thought to ask. There is a version of the story where the legislation had to be amended before she could be registered. There is another where they simply got on with it. Both versions end the same way: in 1939 Molly Kool was certified, making her the first registered female sea captain in North America and, by most accounts, the second in the world.",
      "She captained the Jean K, her father's scow, through the war years — hauling freight in a bay where the tide runs hard enough to put you on the bottom twice a day and the fog comes in like a lid. She was reportedly not interested in being a symbol and was reportedly very interested in being paid on time.",
      "In 1944 the Jean K burned. She married, moved to Maine, and stopped going to sea. She died in 2009, aged 93.",
      "Alma is a village of about two hundred and fifty people at the gate of a national park, and it is not shy about this. Ask at the wharf. Somebody will point you at the plaque, and somebody older will have an opinion about which version of the legislation story is the true one.",
      "Stand there at low water, when the whole fleet is sitting on the harbour bottom twelve metres below the top of the wharf, and think about learning to handle a working vessel in that. The tide does not care who is holding the wheel. It is possible that was the point.",
    ],
  },
  {
    slug: "the-bridge-that-came-back",
    title: "The Bridge That Came Back",
    teller: "Park records",
    tellerRole: "Point Wolfe",
    place: "Point Wolfe covered bridge",
    trail: "goose-river",
    era: "1909–1990, and 1992 onward",
    excerpt:
      "The most photographed object in the park was destroyed by the people who were trying to look after it, and that is the honest version.",
    body: [
      "There has been a covered bridge across the Point Wolfe River since 1909. Red, single span, the classic New Brunswick type — the roof is not decoration, it is there to keep rain off the timber trusses, which is why a covered bridge lasts a century and an open one does not.",
      "By the late 1980s the old dam just upstream, left over from the lumber days, was derelict and unsafe and had to come out. Removing a dam of that age means explosives. In January 1990 the charge went off and the bridge did not survive it — accounts differ on exactly how, whether by blast pressure or by debris, and the distinction did not help anybody at the time.",
      "So the park lost, in an afternoon, the structure on the front of half its postcards, through work that was being done to make the place safer.",
      "It was rebuilt. Not replaced with something modern that looked similar — rebuilt, to the original form, in timber, and reopened in 1992. The bridge you photograph today is younger than a lot of the people photographing it, and it is the correct bridge in every way that matters.",
      "There is a temptation in park interpretation to tell only the tidy stories. This one gets told because the untidy version is more useful: the people responsible for a place are entirely capable of damaging it while acting in good faith, and the response that counts is what gets built afterward.",
      "Walk down to the beach beneath it at low water. The estuary flats open out, the old millpond ground is visible for what it is, and the bridge sits above the whole thing looking like it has always been there. Which, in the only sense anyone cares about, it has.",
    ],
  },
  {
    slug: "what-the-port-was",
    title: "What the Port Was",
    teller: "Park interpretation",
    tellerRole: "Point Wolfe",
    place: "Point Wolfe river mouth",
    trail: "coppermine",
    era: "1820s–1920s",
    excerpt:
      "There is a quiet beach here with a bridge over it. There was a dam, a sawmill, a village, and ships loading timber for Britain.",
    body: [
      "Stand on the Point Wolfe beach at low water and it reads as wilderness: cobble, estuary, spruce coming down to the shore, a red bridge. That reading is about a hundred years out of date.",
      "Through the nineteenth century this river mouth was industrial. There was a dam upstream holding a pond to drive a sawmill. Logs came down the Point Wolfe River off the plateau. The mill cut them into deals — squared planks — and ships came into this exposed, tide-wracked little harbour to load them for Britain. There were houses, a school, the whole apparatus of a company village, on ground where you are now looking at trees.",
      "Loading a sailing vessel at a place with a twelve-metre tide and no shelter is not a normal job. The vessel sits on the bottom at low water and floats at high, and every piece of the operation — when you load, how you moor, when you leave — is dictated by a clock nobody controls.",
      "The timber ran out, the trade changed, and steel and steam ended the age of loading wooden ships in awkward harbours. By the time the park was established in 1948 the industry was long finished, and the remaining residents of the area were bought out and moved — which is a sentence that covers a great deal of difficulty for the families involved, and is worth saying plainly rather than skipping.",
      "The forest has done the rest. Second growth has closed over the village ground, and the dam is gone. What is left is the shape of the place: a river mouth that is exactly as convenient for shipping as it ever was, which is to say barely, and a lot of very quiet trees.",
      "On the Coppermine loop nearby you can visit the other half of the same story — a mine that was opened because somebody found copper in the bedrock, and closed because it did not pay. This coast has been tried, repeatedly, by people hoping it would make them money. It mostly declined.",
    ],
  },
  {
    slug: "the-salmon-that-stayed",
    title: "The Salmon That Stayed",
    teller: "Park conservation team",
    tellerRole: "With Fort Folly First Nation",
    place: "Upper Salmon and Point Wolfe rivers",
    trail: "goose-river",
    era: "Ongoing",
    excerpt:
      "Most Atlantic salmon cross an ocean to feed. These ones never leave the bay, and it very nearly finished them.",
    body: [
      "Atlantic salmon from most rivers do something extraordinary and well known: they go to sea, cross to the feeding grounds off Greenland, and come back years later to the exact gravel they hatched in.",
      "The salmon of the inner Bay of Fundy do not. They stay in the bay and the near shore, a distinct population with its own life history, found in a few dozen rivers at the head of this bay and nowhere else on Earth.",
      "In the 1980s there were tens of thousands of them. By the early 2000s there were a few hundred. Nobody has a single clean explanation — marine survival collapsed for reasons still argued over, and dams, habitat change and aquaculture interactions all appear in the list. The population was listed as endangered under the Species at Risk Act in 2003, and it was, in the plainest terms, going.",
      "What has happened since is one of the more stubborn pieces of conservation work in the country. Wild juveniles are collected from these rivers and raised in a live gene bank so that the genetic distinctiveness of each river's fish is not lost. Fish are released back as smolts and adults. Habitat is restored. Fundy National Park works on this with Fort Folly First Nation, whose habitat recovery programme has been central to it for years, alongside the Department of Fisheries and Oceans and a number of others.",
      "The Point Wolfe and Upper Salmon rivers, both inside this park, are two of the rivers this work runs on. Adults return to them. Not many, by the standards of the 1980s. More than there would have been.",
      "In late autumn, in low clear water, you can sometimes see them from the bank. If you do: stay out of the river. The redds — the gravel nests — are invisible until you are standing on one, and a population this small cannot spare the eggs.",
      "It is not a triumphant story yet and it may never be. It is a story about people declining to let something finish while there is still something to work with, which is a different and slower kind of thing.",
    ],
  },
  {
    slug: "the-fog-you-were-warned-about",
    title: "The Fog You Were Warned About",
    teller: "Coastal staff",
    tellerRole: "Herring Cove and Matthews Head",
    place: "The coast, most of the summer",
    trail: "matthews-head",
    era: "Every June, July and August",
    excerpt:
      "People arrive in July, find the coast socked in, and apologise to each other for the weather. They have in fact arrived on the right day.",
    body: [
      "Here is the mechanism, because it makes the experience better. The tides in this bay are so violent that they do not merely move water horizontally — they churn it vertically, dragging cold water up from depth and keeping the whole column mixed. The sea surface here stays cold all summer, in the single digits.",
      "Warm, humid summer air moves over that cold surface, cools to its dew point on contact, and the moisture in it condenses. That is the fog. It is not weather arriving from somewhere; it is being manufactured continuously, right there, by the temperature difference between the air and the water.",
      "Which means it is not a bad day. It is the same upwelling that makes these waters productive enough to feed the shorebirds staging on the mud and the fish and the whales further out in the bay. The fog, the food and the tide are one system. You cannot have the bay without the fog.",
      "Practically: the fog usually hugs the coast and burns back from the interior valleys by late morning. A socked-in morning at Herring Cove is often a perfectly clear afternoon at Third Vault Falls, fifteen minutes' drive inland and three hundred metres up. Locals plan around this without thinking about it — coast early only if it is clear, otherwise inland first and coast later.",
      "But do go out onto Matthews Head in it at least once. Open meadow, a headland, sound carrying oddly, the sea somewhere below and entirely invisible, and the far end of the trail simply not there. Every photographer who comes here for a week gets their best frame on the day they were disappointed by the forecast.",
    ],
  },
];

export const taleBySlug = (slug: string) => tales.find((t) => t.slug === slug);
