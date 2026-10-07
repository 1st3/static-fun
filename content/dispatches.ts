export type Dispatch = {
  slug: string;
  title: string;
  date: string;
  author: string;
  role: string;
  tag: string;
  readingMinutes: number;
  excerpt: string;
  body: string[];
};

export const dispatches: Dispatch[] = [
  {
    slug: "reading-a-tide-table",
    title: "How to Actually Read a Tide Table",
    date: "2026-06-04",
    author: "Denise Arsenault",
    role: "Coastal Interpretation Coordinator",
    tag: "The tide",
    readingMinutes: 5,
    excerpt:
      "Most visitors look up the time of low tide and stop there. That single number is the least useful thing on the page.",
    body: [
      "Everyone who comes to this coast eventually looks up a tide table, finds the time of low water, and writes it on their hand. Then they turn up at Herring Cove at exactly that minute, having missed most of the window they were trying to hit.",
      "A tide table gives you four numbers a day at this latitude: two high waters and two low waters, each with a time and a height. The heights are metres above chart datum, which is roughly the level of the lowest tides — so a low water of 0.8 m and a low water of 3.1 m are both 'low tide' and are very different afternoons.",
      "What you actually want is the window, not the instant. As a working rule the flats are usable for something like two hours either side of low water, which is where the often-repeated guidance comes from. But that window is wider on a big spring tide, when the water drops further and takes longer coming back, and meaningfully narrower on a small neap tide. Two low waters in the same week can differ by more than two metres of depth. Look at the height column, not just the time column.",
      "The other half of the table is the half that hurts people: the rate. A Fundy tide does not come in evenly. It moves slowly for the first hour after the turn, then accelerates hard through the middle of the cycle — the old rule of twelfths puts roughly half the total range through in the two middle hours — then eases again near high water. So the water that looked lazy when you walked out is not the water that comes back for you. If you are on a cobble beach against a cliff at the wrong point in the cycle, the gap behind you closes considerably faster than you would guess by watching it.",
      "So: check the height as well as the time. Start on a falling tide rather than a rising one. Pick your way back up before you walk out, and keep looking at it. And use the official Canadian Hydrographic Service predictions for the day you are actually going — the tide clock on this site is a teaching tool that shows you the shape of the cycle, and it is not a navigational product.",
      "One last thing worth knowing. Weather moves tides. A hard onshore wind and a low barometer can put the water meaningfully higher than predicted and hold it there. The table tells you what the Moon and Sun are doing. It does not know about the storm.",
    ],
  },
  {
    slug: "the-salmon-count",
    title: "This Year's Salmon Count",
    date: "2026-01-20",
    author: "Dr. Yolande Pitre",
    role: "Aquatic Ecologist",
    tag: "Conservation",
    readingMinutes: 4,
    excerpt:
      "Two rivers, one endangered population that lives nowhere else on Earth, and a number that is going in the right direction slowly enough to test anyone's patience.",
    body: [
      "The autumn returns are in for the Point Wolfe and Upper Salmon rivers, and the short version is: better than the bottom, nowhere near recovered, and continuing.",
      "For anyone new to this: the Atlantic salmon of the inner Bay of Fundy are a distinct population that does not make the usual migration to Greenland. They stay in the bay. That makes them genetically and behaviourally their own thing, found in a few dozen rivers at the head of this bay and nowhere else in the world. In the 1980s there were tens of thousands. By the early 2000s the whole population was down to a few hundred adults and it was listed as endangered under the Species at Risk Act.",
      "The reason there is anything left to count is the live gene bank. Juveniles are collected from each river and raised in captivity so that the distinct genetics of each river's fish are preserved rather than blended or lost, and fish are returned as smolts and adults. It is unglamorous, expensive, and has to be done every single year without a gap, because a population this small does not get to have an off year.",
      "Fundy National Park does this work in partnership with Fort Folly First Nation, whose Fort Folly Habitat Recovery programme has been central to it for a long time, along with Fisheries and Oceans Canada and a number of academic and community partners. The two rivers inside this park are among the small handful the programme runs on.",
      "What visitors can do is genuinely limited, and it is mostly about not making it worse. In late autumn, in low clear water, salmon are sometimes visible from the banks and bridges. Stay out of the rivers. The redds are gravel nests, they are effectively invisible until you are standing on one, and a population at this level cannot spare the eggs that a single pair of boots destroys.",
      "The honest framing is not that we are winning. It is that the population still exists, which was not guaranteed twenty years ago, and that every year it continues to exist is a year in which conditions in the bay might improve enough for it to do the rest itself.",
    ],
  },
  {
    slug: "winter-in-the-ravines",
    title: "Winter in the Ravines",
    date: "2026-02-11",
    author: "Peter Cormier",
    role: "Trail Supervisor",
    tag: "Trails",
    readingMinutes: 3,
    excerpt:
      "Dickson Falls is a blue-white column right now and the boardwalk is a luge run. Both of those facts are worth planning around.",
    body: [
      "The falls freeze from the outside in. What starts as spray building on the rock at the edges becomes, by February, a shell of ice around a core of water still running behind it — so a frozen waterfall is not a stopped waterfall, it is a waterfall with a lid. You can often hear it working away inside.",
      "Dickson and Third Vault are both worth the trip in this state, and they are completely different objects in February than in May. The gorges are north-facing, deeply shaded and hold cold air, so they ice up early and let go late — there is often still ice down in Third Vault when the road up top is bare and dry.",
      "Which is the problem. People check the parking lot, see bare gravel, and walk down into a gorge in ordinary boots. The Dickson boardwalk is not maintained in winter, the stairs collect ice, and the whole structure tilts toward a stream. We pull somebody out of there with a twisted knee most winters and it is always the same story.",
      "So: cleats. Not hiking boots with aggressive tread — actual traction devices over the boot. They cost about the same as lunch in Alma and they turn the hardest walking condition in the park into a pleasant afternoon.",
      "Elsewhere on the network: the plateau trails are excellent on snowshoes and Caribou Plain in particular is transformed — the bog is frozen, the sightlines open up, and tracks in fresh snow tell you far more about what lives out there than you will ever see in summer. Moose, snowshoe hare, coyote, and the small stuff tunnelling underneath.",
      "The Coastal Trail in winter is for experienced parties only. Cold water, ice on the cobble, short daylight, and the same unforgiving tide as always with much less margin if something goes wrong.",
    ],
  },
  {
    slug: "the-register-is-working",
    title: "The Register Is Doing Something We Did Not Plan",
    date: "2026-08-30",
    author: "Ronan Gaudet",
    role: "Visitor Experience, Headquarters",
    tag: "Park life",
    readingMinutes: 3,
    excerpt:
      "We built a visitor logbook. It has quietly turned into the fastest trail-conditions network we have ever had.",
    body: [
      "The trail register started as a nice idea: somewhere for people to note what they saw, the way a paper logbook sits in a box at a backcountry trailhead. We expected sentiment and we got plenty of it, which is fine.",
      "What we did not anticipate is how fast it turned into an operational tool. A blowdown across the Coppermine loop was reported on the register four days before it reached us through any official channel, because a visitor walked around it, went home, and posted about it. Same with a washed-out section of the Laverty approach in June, and a wasp nest near the Matthews Head farmstead that we were able to sign within a day.",
      "The tide posts are the other surprise. People are posting what the water actually did — where the beach was walkable, how long the window really lasted, where a section pinched out sooner than expected. That is exactly the local, specific, conditional knowledge that no tide table can give you and that our staff can only cover a fraction of.",
      "A request, then. When you post a conditions note, include three things: the trail, the date, and the time. 'Muddy' is not useful. 'Laverty approach, Tuesday morning, ankle-deep for about 200 m past the first bridge' is something the next person can plan around and something the trail crew can act on.",
      "And if it is a hazard — a washout, a dangerous tree, an animal behaving oddly, anyone in difficulty — post it, but tell us directly as well. The register is read by staff daily, not hourly. It is a complement to calling the visitor centre, never a replacement for it.",
    ],
  },
  {
    slug: "shoulder-season",
    title: "The Case for Coming in October",
    date: "2026-09-08",
    author: "Marie-Claude Doucet",
    role: "Park Warden",
    tag: "Trails",
    readingMinutes: 3,
    excerpt:
      "Everyone comes in July, when the coast is in fog and the parking lots are full. The best month here is the one after the crowds have gone.",
    body: [
      "July and August are our busy season for the obvious reasons — school holidays, warm water in the pool at Laverty, the salt water pool open, everything running. They are also, on this particular coast, the foggiest months of the year and the ones where you will queue for a parking space at Dickson Falls.",
      "October has almost the opposite profile. The Acadian hardwoods turn through the first two weeks, and because this is a mixing forest rather than a pure hardwood one you get a patchwork — sugar maple and yellow birch flaring against red spruce and fir — instead of a single uniform blaze. The valley trails, Laverty and Third Vault in particular, run through the best of it.",
      "The fog largely lifts. Cold air over cold water does not produce the same effect as warm air over cold water, so the coast clears and the sea views that were theoretical in July are simply there. The Coastal Trail in October with the light low and the air clear is the best walk in this park and hardly anybody is on it.",
      "Moose are moving through the rut and are far more visible on the plateau. The salmon are returning to the rivers later in the month. Nights are properly dark by a reasonable hour, which makes the plateau stargazing accessible to people who cannot stay up until eleven in midsummer.",
      "What you give up: the swimming is finished, the salt water pool closes, some services in Alma reduce their hours, and the weather is a genuine coin-toss rather than a reliable warm day. Bring layers and a rain shell and accept that one day of your three may be spent indoors.",
      "The tides do not care what month it is. They are the same twelve metres in October as in July, and there are fewer people standing on the sea floor with you.",
    ],
  },
];

export const dispatchBySlug = (slug: string) =>
  dispatches.find((d) => d.slug === slug);
