import { createApp } from 'vue';
import './styles/reset.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';

const app = createApp(App);

// vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

// vuetify
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);

// importing custom css
import './styles/main.css';

app.use(vuetify);
app.use(Toast);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
