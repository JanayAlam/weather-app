import { createApp } from 'vue';
import './styles/reset.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// store
import store from './store';

// flag icon
import FlagIcon from 'vue-flag-icon';

// vuetify
import vuetify from './vuetify';

// importing custom css
import './styles/main.css';

// importing routes
import router from './router';

// importing app component
import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(FlagIcon);
app.use(vuetify);
app.use(Toast);

// import fetchAstro from './api/fetch-astro';
// console.log(fetchAstro({ q: 'Dhaka' }));

// import getWeatherInfo from './api/fetch-weather';

// console.log(getWeatherInfo('Dhaka'));

app.mount('#app');
