import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

createApp(App)
  .mount(
    (() => {
      const app = document.createElement('div')
      // app.attachShadow({ mode: 'open' })
      document.body.append(app)
      return app
    })(),
  )
