import DefaultTheme from 'vitepress/theme'
import './custom.css' 
import ContactMe from '../components/ContactMe.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ContactMe', ContactMe)
  },
}