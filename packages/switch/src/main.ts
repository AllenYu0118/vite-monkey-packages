import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

createApp(App)
  .mount(
    (() => {
      const app = document.createElement('div');
      // app.attachShadow({ mode: 'open' });
      // app.style.width = '100vw';
      // app.style.height = '100vh';
      // app.style.position = 'absolute';
      // app.style.left = '0';
      // app.style.top = '0';

      document.body.append(app);
      return app;
    })(),
);
