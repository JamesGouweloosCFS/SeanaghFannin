/** Wealthy Her podcast — Garden Route (audio via iono.fm embeds where listed). */

/** iono.fm mini player query strings (teal / accent / navy layouts). */
const ionoTeal = (episodeId: string) =>
  `https://iframe.iono.fm/e/${episodeId}?layout=mini&artwork=0&accent=ffffff&text=ffffff&background=019d90&border=019d90` as const;

const ionoAccentMini = (episodeId: string) =>
  `https://iframe.iono.fm/e/${episodeId}?layout=mini&artwork=0&accent=00a7a0` as const;

const ionoNavyMini = (episodeId: string) =>
  `https://iframe.iono.fm/e/${episodeId}?layout=mini&artwork=0&accent=00a7a0&text=ffffff&background=102540&border=00a7a0` as const;

/** Welcome / “Why we created” intro — iono mini player for the intro episode. */
export const WELCOME_IONO_SRC = ionoTeal("1574833");

export const podcastHero = {
  title: "Navigating life's pivotal moments together",
  tagline: "How to get divorced before you get married",
} as const;

export const podcastWelcome = {
  title: "Welcome to Wealthy Her Podcast",
  subtitle: "Why we created Garden Route",
  paragraphs: [
    "Pivotal life moments and their financial repercussions.",
    "Managing money during life's pivotal moments and giving you the pen to write your own story.",
    "These podcasts are aimed at showing women that they are the wealth they have been waiting for.",
    "Yes… let's talk about finance, but make it personal. Yes… let's talk about finance, but make it powerful.",
    "Managing money during life's major shifts may not seem intuitive so we are stepping in to reframe, and make your financial empowerment a source of pride, not pressure.",
  ],
  host: "Seanagh Fannin",
} as const;

export type PodcastEpisode = {
  id: string;
  label?: string;
  title: string;
  description?: string;
  related?: readonly string[];
  /** Inline iono.fm mini player. */
  audioEmbedSrc?: string;
  /** Full episode on Spotify (opens in a new tab). */
  spotifyListenUrl?: string;
};

export type PodcastSeries = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  episodes: readonly PodcastEpisode[];
};

export const featuredSpotlights: readonly PodcastEpisode[] = [
  {
    id: "hannah-wilson",
    label: "Divorce series",
    title: "Introducing our divorce expert – Hannah Wilson",
    description:
      "Why we asked Hannah Wilson to join us as our divorce expert. Hannah explains the way she breaks down this huge subject of divorce into “bite-sized chunks”, so that instead of feeling blindsided, you understand how to consider a divorce settlement which will form the foundation for the future. If you are getting married and want to understand more about the contract of marriage this is also a great place to start.",
    audioEmbedSrc: ionoTeal("1575569"),
  },
  {
    id: "why-divorce-podcasts",
    label: "Divorce series",
    title: "Why are we doing podcasts on divorce",
    description:
      "How we have split up this huge subject and how to navigate your way through the various podcasts. We have seen how divorce can completely blindside our clients, and how women looking to get married don't understand the full impact of the marital regime that they marry into—so we created these podcasts to better prepare all parties for marriage and, should it occur, divorce. It is a huge topic, so we break it down into small snippets so you can access the information you want.",
    audioEmbedSrc: ionoTeal("1573354"),
  },
] as const;

export const podcastSeries: readonly PodcastSeries[] = [
  {
    id: "getting-married",
    eyebrow: "GETTING MARRIED?",
    title: "Divorce proof your marriage",
    intro: "I am about to get married. What do I need to know? Seven things you should know before you get married—including how to have a seat at the financial decision-making table. 74% of women die single, so understanding how marriage influences this is essential.",
    episodes: [
      {
        id: "married-what-know",
        title: "I am getting married. What do I need to know?",
        description:
          "This podcast unpacks how to live within the parameters of your marriage and have a seat at the financial decision-making table.",
        audioEmbedSrc: ionoAccentMini("1575578"),
        related: [
          "Married in Community of Property",
          "Married out of community of property without accrual",
          "Married out of community of property with accrual",
          "Trust and how they work",
          "Michelles story",
          "How to ask my hubby about money",
        ],
      },
      {
        id: "conversations-money",
        label: "Conversations about money",
        title: "How to ask my hubby about money and why I should care",
        description:
          "74% of women die single—have a seat at the family financial decision-making table. How do you find out what is happening with the family finances so that you know where you stand? How do you make sure you as a couple (or you on your own) have sufficient savings? This episode covers the rule of 50% / 30% / 20% and an emergency fund.",
        audioEmbedSrc: ionoAccentMini("1575578"),
      },
    ],
  },
  {
    id: "marital-regimes",
    eyebrow: "MARITAL REGIMES",
    title: "Married in love but divorced financially?",
    intro: "This series walks you through hidden obstacles when a marriage unwinds—or when you need to understand how you are married.",
    episodes: [
      {
        id: "divorce-how-much",
        title: "I'm getting divorced! How much do I get?",
        description:
          "Where to start when unwinding the financial partnership of marriage: division of assets, possible child maintenance, and possible spousal maintenance.",
        audioEmbedSrc: ionoNavyMini("1575570"),
      },
      {
        id: "division-assets",
        title: "Division of assets",
        description:
          "Who gets what in divorce—and how assets in a marriage are divided on death or divorce. Which country's law applied on the day of marriage, which marital regime applies, and why you should not assume it is South Africa alone.",
        audioEmbedSrc: ionoNavyMini("1575571"),
      },
      {
        id: "community-property",
        title: "Married in Community of Property",
        description:
          "The default marital regime in South Africa and its implications for divorce and inheritance—how to opt out, handling inheritance whilst married under this regime, and why ring-fencing matters.",
        audioEmbedSrc: ionoNavyMini("1575572"),
        related: ["Michelles Story", "Trusts"],
      },
      {
        id: "accrual-part-one",
        title: "Married Out of Community of Property with Accrual – Part One",
        description:
          "What this regime means, how you select it, why you might choose it, and how it affects you in divorce. Part Two looks specifically at calculating the accrual claim.",
        audioEmbedSrc: ionoNavyMini("1575573"),
        related: ["Part Two"],
      },
      {
        id: "accrual-part-two",
        title: "Married Out of Community of Property with Accrual – Part Two",
        description:
          "The accrual claim and how to calculate it—including what may be excluded, such as inheritance and donations between spouses.",
        audioEmbedSrc: ionoNavyMini("1575585"),
        related: ["Part One"],
      },
      {
        id: "without-accrual",
        title: "Married Out of Community of Property without Accrual",
        description:
          "The simplest regime: parameters, considerations in divorce such as a jointly purchased property, loans to discretionary trusts, and effects on your personal estate.",
        audioEmbedSrc: ionoNavyMini("1575574"),
        related: ["Trust Podcast", "Rebeccas Story"],
      },
      {
        id: "child-maintenance",
        title: "Child maintenance",
        description:
          "How much children cost post-divorce and how each parent contributes proportionally, including reasonable maintenance requirements and how to calculate actual costs.",
        audioEmbedSrc: ionoNavyMini("1575576"),
      },
      {
        id: "spousal-maintenance",
        title: "Spousal maintenance",
        description:
          "Balancing established need against the ability to finance it—when courts grant maintenance, revisiting awards, lump sums, and why a wealth specialist can help model the long-term trade-offs.",
        audioEmbedSrc: ionoNavyMini("1575577"),
      },
      {
        id: "long-term-partner",
        title: "Not married but long-term partner",
        description:
          "What happens when a long relationship ends and you bought a house together—what rights exist and what agreements should be in place.",
        audioEmbedSrc: ionoNavyMini("1575575"),
      },
      {
        id: "trusts-divorce",
        title: "Trusts and how they work",
        description:
          "You're getting divorced—what about the family trust? How trusts work and how the loan account is considered. For complex trust questions, your Garden Route wealth manager can help you go deeper than a single episode allows.",
        audioEmbedSrc: ionoNavyMini("1575586"),
        related: ["Michelles Story", "Married out of community without Accrual", "Married in community of property"],
      },
    ],
  },
  {
    id: "widowhood",
    eyebrow: "WIDOWHOOD",
    title: "Your voice is powerful, and so is your story.",
    episodes: [
      {
        id: "wrap-estate",
        label: "The Wealthy-Her Podcast | Episode 3",
        title: "How to wrap up an estate",
        description:
          "Seanagh Fannin is joined by Leslie Swart, a fiduciary specialist, to look at how to wrap up an estate efficiently and effectively—covering the important aspects you need to consider. Listen on Spotify below for the full episode.",
        spotifyListenUrl: "https://open.spotify.com/episode/2Iy3hn3uzeI6gQ1dp1QeHR",
      },
    ],
  },
  {
    id: "real-life-stories",
    eyebrow: "REAL LIFE STORIES",
    title: "Your voice is powerful, and so is your story.",
    episodes: [
      {
        id: "amber-fillary",
        label: "The Wealthy-Her Podcast | Episode 2",
        title: "Longest underwater ice swim",
        description:
          "Amber Fillary, world record holder for the longest underwater ice swim on a single breath (male and female categories), on what it takes to achieve the extraordinary—110 metres under 34 cm of ice in sub-zero temperatures. Listen on Spotify below for the full episode.",
        spotifyListenUrl: "https://open.spotify.com/episode/7qlrWAnqyORLtvPLnqlI0r",
      },
      {
        id: "michelle-story",
        title: "I lost everything – Michelle's story",
        description:
          "Michelle was married to a multi-billionaire and lost everything—a powerful story on the cost of not knowing how you are married, not having a seat at the financial table, and why structures and wills matter.",
        audioEmbedSrc: ionoAccentMini("1575580"),
      },
      {
        id: "rebecca-trust",
        title: "Trust and how they work – a story about Rebecca",
        description:
          "Why trusts can be expensive to run, whether they still achieve what you set out to do, and when other structures may serve you better.",
        audioEmbedSrc: ionoAccentMini("1575581"),
      },
      {
        id: "children-abroad",
        title: "Trust and leaving wealth to children who live abroad",
        description:
          "How law changes (including from 2024) can tax distributions when children no longer live in South Africa—many clients are unaware how expensive this has become.",
        audioEmbedSrc: ionoAccentMini("1575582"),
      },
      {
        id: "will-listen",
        title: "Your Will – take a listen",
        description:
          "Until death do us part—why you must update your will, what happens when you don't, and the devastating effect of not knowing how you are married.",
        audioEmbedSrc: ionoAccentMini("1575584"),
      },
      {
        id: "peggy-savings",
        title: "My husband and I didn't save enough",
        description:
          "Peggy thought they had enough until it was too late—a story about assumptions, a lawyer spouse who misunderstood finance, and why checking the plan matters.",
        audioEmbedSrc: ionoAccentMini("1575583"),
      },
    ],
  },
  {
    id: "financial-freedom",
    eyebrow: "FINANCIAL FREEDOM",
    title: "Things you ought to know",
    episodes: [
      {
        id: "episode-4-invest",
        label: "The Wealthy-Her Podcast | Episode 4",
        title: "How to consider investments",
        description:
          "Start with what you are trying to achieve from an investment—logical on the surface, but there are important elements to weigh when assessing what is best for you. Listen on Spotify below for the full episode.",
        spotifyListenUrl: "https://open.spotify.com/episode/6AstZSzMIPtw4c0o2PSaIq",
      },
      {
        id: "financial-freedom-growth",
        title: "Financial freedom? Are your investments really generating growth… are you sure?",
        description:
          "Why offshore is no longer optional for many South Africans, how rand depreciation, tax, and inflation chip away at wealth, and why your adviser should tailor the plan to your circumstances.",
        audioEmbedSrc: ionoAccentMini("1575587"),
      },
      {
        id: "episode-1-men",
        label: "The Wealthy-Her Podcast | Episode 1",
        title: "Why we invest differently to men",
        description:
          "Are you truly planning, or tossing a coin in a wishing well? The Wealthy-Her Podcast is designed to ignite inspiration, empowerment, and community among women seeking financial and professional fulfilment. Listen on Spotify below for the full episode.",
        spotifyListenUrl: "https://open.spotify.com/episode/4ZO1ndWTzdG4d4mS39qX2T",
      },
    ],
  },
] as const;

export const podcastToc = [
  { href: "#welcome", label: "Why Wealthy Her" },
  { href: "#featured", label: "Divorce series" },
  { href: "#getting-married", label: "Getting married" },
  { href: "#marital-regimes", label: "Marital regimes" },
  { href: "#widowhood", label: "Widowhood" },
  { href: "#real-life-stories", label: "Real life stories" },
  { href: "#financial-freedom", label: "Financial freedom" },
] as const;
