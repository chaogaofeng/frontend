import User from "../../views/user/user.vue";

const user = [
  {
    path: "/user",
    component: User,
    name: "user",
    meta: {
      requireAuth: true,
    },
    redirect: "/user/info",
    children: [
      {
        path: "info",
        name: "info",
        meta: {
          requireAuth: true,
        },
        redirect: "/user/info/baseinfo",
        children: [
          {
            path: "baseinfo",
            name: "baseinfo",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userInfo"*/ "@/views/user/info/baseinfo/baseinfo"
              ),
          },
          {
            path: "infoauth",
            name: "infoauth",
            meta: {
              requireAuth: true,
              apiActiveMenu: "/user/info/baseinfo",
            },
            component: () =>
              import(
                /* webpackChunkName: "userInfo"*/ "@/views/user/info/baseinfo/auth"
              ),
          },
          {
            path: "organ",
            name: "organ",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userInfo"*/ "@/views/user/info/organ/organ"
              ),
          },
          {
            path: "organauth",
            name: "organauth",
            meta: {
              requireAuth: true,
              apiActiveMenu: "/user/info/organ",
            },
            component: () =>
              import(
                /* webpackChunkName: "userInfo"*/ "@/views/user/info/organ/auth"
              ),
          },
          {
            path: "secret",
            name: "secret",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userInfo"*/ "@/views/user/info/baseinfo/secret"
              ),
          },
        ],
        component: () =>
          import(/* webpackChunkName: "userInfo" */ "@/views/user/info/info"),
      },
      {
        path: "safe",
        name: "safe",
        meta: {
          requireAuth: true,
        },
        redirect: "/user/safe/accesslist",
        children: [
          {
            path: "accesslist",
            name: "accesslist",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userSafe"*/ "@/views/user/safe/accesslist/accesslist"
              ),
          },
        ],
        component: () =>
          import(/* webpackChunkName: "userSafe"*/ "@/views/user/safe/safe"),
      },
      {
        path: "control",
        name: "control",
        meta: {
          requireAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "userControl"*/ "@/views/user/control/control"
          ),
        redirect: "/user/control/overview",
        children: [
          {
            path: "overview",
            name: "overview",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userControl"*/ "@/views/user/control/overview/overview"
              ),
          },
          {
            path: "agementlist",
            name: "agementlist",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userControl"*/ "@/views/user/control/agement/list"
              ),
          },
          {
            path: "agementmsg",
            name: "agementmsg",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userControl"*/ "@/views/user/control/agement/msg"
              ),
          },
          {
            path: "policy",
            name: "policy",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userControl"*/ "@/views/user/control/policy/policy"
              ),
          },
          {
            path: "policy/create",
            name: "policyCreate",
            meta: {
              requireAuth: true,
              apiActiveMenu: "/user/control/policy",
            },
            component: () =>
              import(
                /* webpackChunkName: "userControl"*/ "@/views/user/control/policy/create"
              ),
          },
          {
            path: "role",
            name: "role",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "userControl"*/ "@/views/user/control/role/role"
              ),
          },
          {
            path: "role/create",
            name: "roleCreate",
            meta: {
              requireAuth: true,
              apiActiveMenu: "/user/control/role",
            },
            component: () =>
              import(
                /* webpackChunkName: "userControl"*/ "@/views/user/control/role/create"
              ),
          },
        ],
      },
      {
        path: "switch",
        name: "switch",
        meta: {
          requireAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "userSwitch"*/ "@/views/user/switch/switch"
          ),
      },
    ],
  },

  // {
  //   path: "/",
  //   name: "vDemo",
  //   component: vDemo,
  //   redirect: "/tab1", // 设置默认打开的页面
  //   children: [
  //     {
  //       path: "/tab1",
  //       name: "tab1",
  //       component: tab1,
  //     },
  //     {
  //       path: "/tab2",
  //       name: "tab2",
  //       component: tab2,
  //     },
  //   ],
  // },
];

export default user;
