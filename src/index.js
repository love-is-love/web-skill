import { createApp } from "vue";
import store from "./store/index.js";
import router from "./router/index.js"
import App from "./App.vue";
import element from "element-plus";
import "element-plus/theme-chalk/index.css"
import "./util/css/element.css"
import "./util/css/base.css"
const app = createApp(App);
app.use(store).use(router);
app.use(element)

app.mount("#app");