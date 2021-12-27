import Vue from "vue";
import VueRouter from "vue-router";
import Baas from "./modules/baas";
import User from "./modules/user";

Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/register.vue"),
  },
  {
    path: "/password",
    name: "password",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/password.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      requireAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/logout.vue"),
  },
  ...Baas,
  ...User,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.token) {
      if (Object.keys(from.query).length === 0) {
        next();
      } else {
        let redirect = from.query.redirect;
        if (to.path === redirect) {
          next();
        } else {
          next({ path: redirect });
        }
      }
    } else {
      if (to.path === "/login") {
        next();
      } else {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      }
    }
  } else {
    next();
  }
});

export default router;
