import { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/posts/': [
    {
      text: 'Posts',
      items: [
        { text: 'Intro', link: '/posts/intro' },
        { text: 'Systems Thinking', link: '/posts/systems' },
        { text: 'Infra Design', link: '/posts/infra' },
        { text: 'Advanced Stuff', link: '/posts/advanced' },
      ]
    }
  ]
}

export default sidebar
