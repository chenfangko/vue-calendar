import Vue from "vue";
import Router from "vue-router";
import Calendar from "@/views/Calendar.vue"
import Months from "@/views/Months.vue"

Vue.use(Router);

const router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Calendar",
      component: Calendar
    },
    {
      path: "/pickdate",
      name: "Months",
      component: Months
    }
  ]
});

export default router;
