import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login"
import Record from '@/pages/record'
import Email from '@/pages/email'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/record",
      name: "Record",
      component: Record
    },
    {
      path: "/email",
      name: "email",
      component: Email
    }
  ]
});
