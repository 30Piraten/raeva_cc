import DefaultTheme from 'vitepress/theme'
import './custom.css' 
import NotFound from './NotFound.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
  },
  NotFound
}