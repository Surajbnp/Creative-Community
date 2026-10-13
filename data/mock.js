// Dummy data. Swap these for API calls later (keep the shapes the same).
export const av = (n) => `https://i.pravatar.cc/240?img=${n}`;
export const pic = (seed, w = 900, h = 520) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const CURRENT_USER = {
  id: "me",
  name: "Nend",
  handle: "nend",
  role: "Creator · Designer",
  avatar: av(12),
  verified: true,
  bio: "Designer & storyteller building calm, warm interfaces. Always up for a good collab.",
  followers: 1280,
  following: 342,
};

export const CREATORS = [
  { id: "c1", name: "Aria Beats", handle: "ariabeats", role: "Music Producer", verified: true, avatar: av(47), followers: "12.4K" },
  { id: "c2", name: "PixelNoir", handle: "pixelnoir", role: "Digital Artist", verified: true, avatar: av(33), followers: "8.9K" },
  { id: "c3", name: "CodeFerret", handle: "codeferret", role: "Full Stack Dev", verified: false, avatar: av(15), followers: "5.2K" },
  { id: "c4", name: "Ink & Frame", handle: "inkandframe", role: "Illustrator", verified: false, avatar: av(44), followers: "3.7K" },
  { id: "c5", name: "Meera Writes", handle: "meerawrites", role: "Author", verified: true, avatar: av(5), followers: "6.1K" },
  { id: "c6", name: "Lumen Lab", handle: "lumenlab", role: "Motion Designer", verified: false, avatar: av(52), followers: "4.4K" },
  { id: "c7", name: "Rohan Sketches", handle: "rohansketches", role: "Concept Artist", verified: false, avatar: av(60), followers: "2.9K" },
  { id: "c8", name: "Sana Sound", handle: "sanasound", role: "Sound Designer", verified: true, avatar: av(25), followers: "7.8K" },
];

export const FEATURED_CREATORS = CREATORS.slice(0, 4);
export const creatorById = (id) => CREATORS.find((c) => c.id === id);

export const GIGS = [
  {
    id: "g1", title: "React Developer", company: "Northwind Labs", mode: "Remote", type: "Freelance",
    pay: "$500 - $1,000", tags: ["React", "Next.js"], logo: { letter: "R", bg: "#10202B", fg: "#61DAFB" },
    location: "Worldwide", posted: "2d ago",
    description: "Help us ship a creator dashboard built with Next.js and Chakra UI. You will own components, performance and accessibility across a handful of key screens.",
  },
  {
    id: "g2", title: "Brand Designer", company: "Moonrise Studio", mode: "Remote", type: "Part-time",
    pay: "$300 - $800", tags: ["Branding", "Figma"], logo: { letter: "A", bg: "#F6B8A8", fg: "#3A1F14" },
    location: "Worldwide", posted: "3d ago",
    description: "Craft identity systems for early-stage consumer brands. Logo, typography, colour and a lightweight brand guide per engagement.",
  },
  {
    id: "g3", title: "UI/UX Designer", company: "Fable Apps", mode: "Remote", type: "Contract",
    pay: "$400 - $700", tags: ["Figma", "Prototyping"], logo: { letter: "R", bg: "#11222E", fg: "#61DAFB" },
    location: "Worldwide", posted: "4d ago",
    description: "Design onboarding and engagement flows for a storytelling app. Comfortable with research, wireframes and polished hand-off.",
  },
  {
    id: "g4", title: "Motion Designer", company: "Lumen Collective", mode: "On-site", type: "Full-time",
    pay: "$900 - $1,600", tags: ["After Effects", "Lottie"], logo: { letter: "M", bg: "#2B1A3A", fg: "#E1B8FF" },
    location: "Bengaluru, IN", posted: "1w ago",
    description: "Create short brand films and UI micro-interactions. You will work next to illustrators and sound designers in our studio.",
  },
  {
    id: "g5", title: "Content Writer", company: "Inkwell Media", mode: "Remote", type: "Freelance",
    pay: "$150 - $400", tags: ["Writing", "SEO"], logo: { letter: "I", bg: "#F3E1B8", fg: "#4A3210" },
    location: "Worldwide", posted: "1w ago",
    description: "Long-form pieces on creative careers, tools and culture. Voice-forward writing with sharp research.",
  },
  {
    id: "g6", title: "Backend Engineer", company: "Nimbus Works", mode: "On-site", type: "Full-time",
    pay: "$1,200 - $2,000", tags: ["Node.js", "PostgreSQL"], logo: { letter: "N", bg: "#12301F", fg: "#7BE0A4" },
    location: "Hyderabad, IN", posted: "2w ago",
    description: "Build APIs for a growing creator marketplace. Focus on reliability, queues and clean data modelling.",
  },
];

export const COMMUNITIES = [
  { id: "cm1", name: "Visual Storytellers", members: "1.5K", tags: ["Art", "Film"], cover: pic("visual-story", 600, 360), description: "Photographers, illustrators and filmmakers sharing narrative work." },
  { id: "cm2", name: "Indie Game Devs", members: "2.4K", tags: ["Gaming"], cover: pic("indie-games", 600, 360), description: "Build, playtest and ship small games together." },
  { id: "cm3", name: "Web3 Builders", members: "1.1K", tags: ["Tech"], cover: pic("web3-builders", 600, 360), description: "Developers and designers exploring decentralised products." },
  { id: "cm4", name: "Music Makers", members: "3.2K", tags: ["Music"], cover: pic("music-makers", 600, 360), description: "Producers and songwriters trading stems, feedback and gigs." },
  { id: "cm5", name: "Writers' Room", members: "980", tags: ["Writing"], cover: pic("writers-room", 600, 360), description: "Weekly prompts, critique circles and publishing tips." },
  { id: "cm6", name: "Motion Lab", members: "1.8K", tags: ["Motion", "Design"], cover: pic("motion-lab", 600, 360), description: "Animation breakdowns, plugins and freelance leads." },
];

export const INITIAL_POSTS = [
  {
    id: "post1", authorId: "c5", time: "2h ago",
    text: "Just finished the first draft of my new story! Looking for creatives to collaborate on the illustrations. ✨",
    images: [pic("notebook-desk", 700, 520), pic("coffee-pen", 700, 520)],
    tags: ["Writing", "Illustration"], likes: 28, commentBase: 6, comments: [],
  },
  {
    id: "post2", authorId: "c1", time: "5h ago",
    text: "Teaser of the new lo-fi EP is up. Looking for a visual artist to build a looping cover animation.",
    images: [pic("studio-night", 1000, 520)],
    tags: ["Music", "Collab"], likes: 64, commentBase: 12, comments: [],
  },
  {
    id: "post3", authorId: "c2", time: "1d ago",
    text: "Neon alleys study, part 3. Which palette feels more like late autumn to you?",
    images: [pic("neon-alley", 1000, 520)],
    tags: ["DigitalArt"], likes: 112, commentBase: 21, comments: [],
  },
  {
    id: "post4", authorId: "c3", time: "1d ago",
    text: "Open-sourced a tiny Next.js starter with Chakra tokens, dark mode and a11y checks baked in. Feedback welcome!",
    images: [],
    tags: ["Nextjs", "OpenSource"], likes: 47, commentBase: 9, comments: [],
  },
];

export const PROJECTS = [
  { id: "p1", title: "Autumn Zine Vol. 2", ownerId: "c4", status: "Open", progress: 35, tags: ["Illustration", "Print"], cover: pic("zine", 700, 380), description: "A community zine about slow seasons. Seeking 6 illustrators and a layout designer.", members: [av(44), av(33), av(5)] },
  { id: "p2", title: "Pixel Rain Short Film", ownerId: "c2", status: "In progress", progress: 62, tags: ["Animation", "Sound"], cover: pic("pixel-rain", 700, 380), description: "Two-minute animated short. Looking for a sound designer and colourist.", members: [av(33), av(25), av(52)] },
  { id: "p3", title: "Creator Dashboard Kit", ownerId: "c3", status: "Open", progress: 18, tags: ["React", "Design System"], cover: pic("dashboard-kit", 700, 380), description: "Open-source UI kit for creator tools. Needs frontend devs and a docs writer.", members: [av(15), av(60)] },
  { id: "p4", title: "Lo-fi Collab Album", ownerId: "c1", status: "In progress", progress: 48, tags: ["Music", "Mixing"], cover: pic("lofi-album", 700, 380), description: "12 tracks, 12 producers. Final slots open for vocalists.", members: [av(47), av(25), av(12), av(8)] },
];

export const EVENTS = [
  { id: "e1", title: "Creators Meetup: Autumn Edition", day: "17", month: "Oct", time: "6:00 PM IST", mode: "Online", host: "Zura Team", attendees: 214, cover: pic("meetup", 700, 380) },
  { id: "e2", title: "Portfolio Review Night", day: "22", month: "Oct", time: "7:30 PM IST", mode: "Online", host: "Visual Storytellers", attendees: 96, cover: pic("portfolio-review", 700, 380) },
  { id: "e3", title: "Game Jam: 48 Hours", day: "29", month: "Oct", time: "10:00 AM IST", mode: "Hybrid", host: "Indie Game Devs", attendees: 318, cover: pic("game-jam", 700, 380) },
  { id: "e4", title: "Freelancing 101 Workshop", day: "05", month: "Nov", time: "5:00 PM IST", mode: "Online", host: "Writers' Room", attendees: 142, cover: pic("workshop", 700, 380) },
];

export const CONVERSATIONS = [
  {
    id: "m1", withId: "c1", unread: 2,
    messages: [
      { id: "m1-1", from: "them", text: "Loved your last piece! Want to work on a cover for my EP?", time: "10:12" },
      { id: "m1-2", from: "them", text: "Budget is flexible, deadline is end of the month.", time: "10:13" },
    ],
  },
  {
    id: "m2", withId: "c5", unread: 0,
    messages: [
      { id: "m2-1", from: "me", text: "The draft reads beautifully. I can start sketches this week.", time: "Yesterday" },
      { id: "m2-2", from: "them", text: "Amazing, thank you! Sending notes tonight.", time: "Yesterday" },
    ],
  },
  {
    id: "m3", withId: "c3", unread: 0,
    messages: [{ id: "m3-1", from: "them", text: "Pushed the new tokens to the repo. Take a look?", time: "Mon" }],
  },
  {
    id: "m4", withId: "c8", unread: 1,
    messages: [{ id: "m4-1", from: "them", text: "Do you have a minute to talk about the short film's sound?", time: "Mon" }],
  },
];

export const NOTIFICATIONS = [
  { id: "n1", text: "Aria Beats started following you", time: "2m", read: false },
  { id: "n2", text: "PixelNoir liked your post", time: "1h", read: false },
  { id: "n3", text: "New gig matches your skills: Brand Designer", time: "3h", read: false },
  { id: "n4", text: "Visual Storytellers has a new event", time: "1d", read: true },
];

export const ANALYTICS = {
  stats: [
    { label: "Profile views", value: "4,820", delta: "+12%" },
    { label: "New followers", value: "326", delta: "+8%" },
    { label: "Engagement", value: "7.4%", delta: "+1.2%" },
    { label: "Gig applications", value: "18", delta: "+3" },
  ],
  weekly: [
    { d: "Mon", v: 42 }, { d: "Tue", v: 58 }, { d: "Wed", v: 36 }, { d: "Thu", v: 74 },
    { d: "Fri", v: 66 }, { d: "Sat", v: 90 }, { d: "Sun", v: 52 },
  ],
  topPosts: [
    { id: "t1", title: "Neon alleys study, part 3", views: "9.2K", likes: 412 },
    { id: "t2", title: "First draft of my new story", views: "6.8K", likes: 287 },
    { id: "t3", title: "Behind the scenes: studio setup", views: "4.1K", likes: 198 },
  ],
};

export const QUOTE = "Creativity thrives in a connected community.";
