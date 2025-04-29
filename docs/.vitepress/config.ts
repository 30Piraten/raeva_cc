import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "rayvah.cc",
  description: "systems-minded product and infrastructure engineer",

  lastUpdated: true,
  outDir: "dist",


//   <link rel="icon" type="image/png" href="/rayvah/favicon-96x96.png" sizes="96x96" />
//   <link rel="icon" type="image/svg+xml" href="/rayvah/favicon.svg" />
//   <link rel="shortcut icon" href="/rayvah/favicon.ico" />
//   <link rel="apple-touch-icon" sizes="180x180" href="/rayvah/apple-touch-icon.png" />
//   <meta name="apple-mobile-web-app-title" content="rayvah" />
//   <link rel="manifest" href="/rayvah/site.webmanifest" />


  // ✅ Favicon + Fonts go here, not in themeConfig
  head: [
    // ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel:"icon", type:"image/svg+xml", href: "/favicon.svg?v=1" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
        rel: "stylesheet",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.png",
    siteTitle: "rayvah",

    nav: [
      { text: "Notes", link: "/posts" },
      { text: "OSS Contributions", link: "/oss" },
      { text: "Buddy.me", link: "/buddy" },
      { text: "Projects", link: "/projects" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/30Piraten/" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/evictor3/" },
    ],

    // ✅ Footer config
    footer: {
      message: "mit liebe gebaut",
      copyright: "Copyright ©️ 2025–present | raeva",
    },

    search: {
      provider: "local",
    },
  },

  ignoreDeadLinks: true,
});
