import { createApp } from 'vue';
import App from './App.vue';
import { router } from './route';
import { StateKey, store } from './store';

createApp(App).use(router).use(store, StateKey).mount('#app');
