import { defineConfig } from "vitepress";
import { resolve } from 'node:path';

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
      rollupOptions: {
        // Ensure the image handling is improved
        onwarn(warning, warn) {
          // Ignore specific warnings related to image imports if they occur
          if (warning.code === 'UNRESOLVED_IMPORT' && warning.message.includes('/images/')) {
            return
          }
          warn(warning)
        }
      }
    },
    // Add assets handling plugin
    plugins: [
      {
        name: 'vitepress-images-resolver',
        enforce: 'pre',
        resolveId(id) {
          if (id.startsWith('/images/')) {
            return {
              id: resolve(__dirname, '../public', id),
              external: true
            }
          }
          return null
        }
      }
    ]
  },
  
  themeConfig: {
    logo: "/logo.png",
    siteTitle: "rayvah",

    notFound: {
      code: '404',
      title: 'Oops. Ich habe letztes Jahr den Beer-Pong-Wettbewerb in Texas gewonnen.',
      quote: 'The last time I was here, I won a riffle contest in Zermatt!',
      linkLabel: 'Lets go back home',
      linkText: 'Return home frendo!',
    },

    nav: [
      { text: "Notes", link: "/posts" },
      { text: "OSS Contributions", link: "/oss" },
      { text: "Buddy.me", link: "/buddy" },
      { text: "Projects", link: "/projects" },
      { text: "Contact Me", link: "/contact" },
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
