export const DefaultTheme = "emerald";
export const LightTheme = "emerald";
export const DarkTheme = "night";
// Removed due to errors
export const BaseStyle = "bg-base-100 h-full w-full min-h-screen";

export const NavPages = [
  { name: "Explore", href: "/explore" },
  {
    name: "About",
    href: "/about",
    children: [
      { name: "sample", href: "/href" },
      { name: "sample2", href: "/href2" },
    ],
  },
];

export const filterValues = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" },
];