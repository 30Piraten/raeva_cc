import { defineConfig } from "vitepress";
import { resolve } from 'path';
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

  try {
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
  } catch (err) {
    console.log(err.message, "Error generating posts sidebar")
  } 
  return []; // Ensure a return value in case of an error
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
  title: "rev",
  description: "systems-minded product and infrastructure engineer",

  lastUpdated: true,
  outDir: "../dist",

  ignoreDeadLinks: true,

  // ✅ Favicon + Fonts must go here, not in themeConfig - I forgot the last time
  head: [
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

  // Add Vite-specific configuration
  vite: {
    resolve: {
      alias: {
        '/images': resolve(__dirname, '../public/images')
      }
    },
    // Improve asset handling
    build: {
      assetsInlineLimit: 0, // Disable inlining assets as base64
    },

    // Add assets handling plugin
    plugins: [
    ]
  },
  
  themeConfig: {
    logo: "/logo.png",
    siteTitle: "Victor Ehikioya Raeva",

    notFound: {
      code: '404',
      title: 'Oops. Ich habe letztes Jahr den Beer-Pong-Wettbewerb in Texas gewonnen.',
      quote: 'The last time I was here, I won a riffle contest in Zermatt!',
      linkLabel: 'Lets go back home',
      linkText: 'Return home frendo!',
    },

    nav: [
      // { text: "Design", link: "/design" },
      { text: "Notes", link: "/posts" },
      { text: "OSS", link: "/oss" },
      { text: "Projects", link: "/projects" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/30Piraten/" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/evictor3/" },
      { icon: "twitter", link: "https://x.com/raeva33" },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
            </svg>`
        },
        link: "mailto:raeva303@gmail.com"
      }
    ],

    // ✅ Footer config
    footer: {
      message: "mit liebe gebaut",
      copyright: "Copyright ©️ 2025–present | Victor Raeva",
    },

    sidebar: {
      "/posts/": getPostsSidebar(),
    },

    search: {
      provider: "local",
    },
  },

})
