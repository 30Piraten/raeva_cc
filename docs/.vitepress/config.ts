import { defineConfig } from "vitepress";

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Create __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Type definitions for sidebar items
interface SidebarItem {
  text: string;
  link: string;
}

// Type for sidebar structure
interface Sidebar {
  [path: string]: SidebarGroup[];
}

interface SidebarGroup {
  text?: string;
  items: SidebarItem[];
}

// Generate sidebar data for posts
function getPostsSidebar(dir: string = 'posts'): SidebarGroup[] {
  const postsDir = path.resolve(__dirname, '..', dir)
  
  // Check if directory exists
  if (!fs.existsSync(postsDir)) {
    console.warn(`Posts directory not found: ${postsDir}`)
    return []
  }
  
  // Get all markdown files and convert to sidebar items
  const files = fs
    .readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      text: getTitleFromFile(path.resolve(postsDir, file)),
      link: `/${dir}/${file.replace('.md', '')}`,
    }))

  // Return in the correct format VitePress expects
  return [
    {
      text: 'Posts',
      items: files
    }
  ]
}

function getTitleFromFile(filepath: string): string {
  try {
    const content = fs.readFileSync(filepath, 'utf-8')
    const match = content.match(/^title:\s*(.+)$/m) || content.match(/^#\s+(.+)$/m)
    return match ? match[1].replace(/['"]/g, '') : path.basename(filepath, '.md')
  } catch (err) {
    console.warn(`Error reading file ${filepath}:`, err)
    return path.basename(filepath, '.md')
  }
}


const emailUrlSvg = "url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%23000' d='M16 3A12.92 12.92 0 0 0 3 16v1a13 13 0 0 0 13 13h7v-2h-7A11 11 0 0 1 5 17v-1A10.94 10.94 0 0 1 16 5a10.64 10.64 0 0 1 11 11c0 3.59-1.4 5-3.66 5c-1.58 0-2.34-1.29-2.34-3v-8h-2v1.94A3.84 3.84 0 0 0 15.5 10a5.48 5.48 0 0 0-5.5 5.44v2.12A5.48 5.48 0 0 0 15.5 23a4.28 4.28 0 0 0 4-2.46A4.35 4.35 0 0 0 23.41 23c3.07 0 5.59-2 5.59-7A12.72 12.72 0 0 0 16 3m3 14.56a3.5 3.5 0 0 1-7 0v-2.12a3.5 3.5 0 0 1 7 0Z'/%3E%3C/svg%3E")"




// CONFIG DEFINITIONS
export default defineConfig({
  lang: "en-US",
  title: "rayvah.cc",
  description: "systems-minded product and infrastructure engineer",

  lastUpdated: true,
  outDir: "../dist",

  ignoreDeadLinks: true,

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
      { icon: "twitter", link: "https://www.x.com/moonwalker" },
      { icon: "carbon:at", link: "mailto:raeva@gmail.com" },
      // { iconify-icon icon="carbon:at" width="32" height="32"></iconify-icon>
    ],

    // ✅ Footer config
    footer: {
      message: "mit liebe gebaut",
      copyright: "Copyright ©️ 2025–present | raeva",
    },

    sidebar: {
      "/posts/": getPostsSidebar(),
    },

    search: {
      provider: "local",
    },
  },

})
