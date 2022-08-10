import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import i18n from "./locales/i18n";

let app = createApp(App);

app.use(router).use(i18n).use(store).mount("#app");
