import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Swipe,
  SwipeItem,
  DropdownMenu,
  DropdownItem,
  List,
  Sticky,
  Cell,
  CellGroup,
  Dialog,
  Form,
  Field,
  Icon,
  Switch,
  Tag,
  Toast,
} from "vant";

import "vant/lib/index.css";

// import Vconsole from "vconsole";
// new Vconsole();

const app = createApp(App);
app.use(store).use(router).mount("#app");


// ui
app
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(List)
  .use(Sticky)
  .use(Cell)
  .use(CellGroup)
  .use(Form)
  .use(Field)
  .use(Icon)
  .use(Switch)
  .use(Tag)
  .use(Toast)
  .use(Dialog);
