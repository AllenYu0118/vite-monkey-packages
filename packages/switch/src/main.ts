import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'virtual:uno.css'

createApp(App)
  .use(router)
  .mount(
    (() => {
      const app = document.createElement('div');
      document.body.append(app);
      return app;
    })(),
);
