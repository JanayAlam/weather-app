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

// importing app component
import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(FlagIcon);
app.use(vuetify);
app.use(Toast);

app.mount('#app');
