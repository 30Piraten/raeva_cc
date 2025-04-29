export default {
    lang: "en-US",
    title: "rayvah.cc",
    description: "systems-minded product and infrastructure engineer",

    lastUpdated: {
    outline: true, 
        text: "Updated at",
        formatOptions: {
            dateStyle: "full",
            timeStyle: "medium"
        },
    },

    // srcDir: "src",
    outDir: "dist",

    // Theme related configurations
    themeConfig: {
        logo: "/logo.png",
        siteTitle: "rayvah",


        head: [
            // favicon
            // ["link", { rel: "icon", href:"/logo32.ico" }],
            ["link", { rel: "icon", type: "image/png", sizes: "192x192", href: "/icons8.png" }],
            // Fonts
            ["link", {rel: "preconnect", href:"https://fonts.googleapis.com" }],
            ["link", {rel:"preconnect", href:"https://fonts.gstatic.com", crossorigin: ""}],
            ["link", {href:"https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap", rel:"stylesheet"}],
        ],

        nav: [
            // { text: "Home", link: "/" },
            { text: "Notes", link: "/posts" },
            { text: "OSS Contributions", link: "/oss" },
            { text: "Buddy.me", link: "/buddy" },
            { text: "Projects", link: "/projects" },
        ],

        ignoreDeadLinks: true,

        socialLinks: [
            { icon: "github", link: "https://github.com/30Piraten/", ariaLabel: "icon for github" },
            { icon: "linkedin", link: "https://www.linkedin.com/in/evictor3/", ariaLabel: "icon for linkedin" },
        ],

        // footer config
        footer: {
            message: "mit liebe gebaut",
            copyright: "Copyright ©️ © 2025-present | raeva"
        },

        search: {
            provider: "local"
        },
        
    },


    ignoreDeadLinks: true,
}