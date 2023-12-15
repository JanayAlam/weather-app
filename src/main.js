import { createApp } from 'vue';
import './styles/reset.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// vuetify
import vuetify from './vuetify';

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

// importing custom css
import './styles/main.css';

// importing app component
import App from './App.vue';

const app = createApp(App);

app.use(vuetify);
app.use(Toast);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
