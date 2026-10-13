import {
  FiHome,
  FiCompass,
  FiUsers,
  FiBriefcase,
  FiClipboard,
  FiMessageCircle,
  FiBookmark,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";

export const NAV = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Discover", href: "/discover", icon: FiCompass },
  { label: "Communities", href: "/communities", icon: FiUsers },
  { label: "Gigs", href: "/gigs", icon: FiBriefcase },
  { label: "Projects", href: "/projects", icon: FiClipboard },
  { label: "Messages", href: "/messages", icon: FiMessageCircle },
  { label: "Bookmarks", href: "/bookmarks", icon: FiBookmark },
  { label: "Events", href: "/events", icon: FiCalendar },
  { label: "Analytics", href: "/analytics", icon: FiBarChart2 },
];

export const TOP_LINKS = ["Home", "Discover", "Communities", "Gigs", "Messages"].map(
  (l) => NAV.find((n) => n.label === l)
);

export const PAGE_TITLES = {
  "/": "Home",
  "/profile": "Profile",
  ...Object.fromEntries(NAV.map((n) => [n.href, n.label])),
};

export const isActive = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
