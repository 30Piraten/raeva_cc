import DefaultTheme from 'vitepress/theme'
import './custom.css' 
import NotFound from './NotFound.vue'
import Cursor from './components/Cursor.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
  },
  NotFound,
  themeConfig: {
    Cursor
  },
}