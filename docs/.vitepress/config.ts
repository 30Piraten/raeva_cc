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
