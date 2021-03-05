import Vue from "vue";
import VueRouter from "vue-router";
import Calendar from "@/views/Calendar.vue"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Calendar",
      component: Calendar
    }
  ]
});

export default router;
