import Baas from "../../views/baas/baas.vue";

const baas = [
  {
    path: "/",
    component: Baas,
    name: "home",
    meta: {
      requireAuth: true,
    },
    redirect: "/baas",
    children: [
      {
        path: "baas",
        name: "baas",
        redirect: "/baas/baashome",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/baas/classa/classa"),
        children: [
          {
            path: "baashome",
            name: "baashome",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/baas/classa/baasHome/baasHome"),
          },
          {
            path: "quorum",
            name: "quorum",
            redirect: "/baas/quorum/organ",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/baas/classa/quorum/quorum"),
            children: [
              {
                path: "organ",
                name: "organ",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/classa/quorum/organ/organ"),
              },
              {
                path: "consortium",
                name: "consortium",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/classa/quorum/consortium/consortium"),
              },
              {
                path: "event",
                name: "event",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/classa/quorum/event/event"),
              },
            ],
          },
          {
            path: "ethereum",
            name: "ethereum",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/baas/classa/ethereum/ethereum"),
          },
        ],
      },
      {
        path: "/quorum",
        name: "quorumall",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/baas/classb/quorum"),
        children: [
          {
            path: "/quorum/organdetaile",
            name: "organdetaile",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/baas/classb/organdetaile/detaile"),
          },
          {
            path: "/quorum/creatconsortium",
            name: "creatconsortium",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import("@/views/baas/classb/creatconsortium/creatconsortium"),
          },
          {
            path: "/quorum/consortorder",
            name: "consortorder",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import("@/views/baas/classb/creatconsortium/consortorder"),
          },
          {
            path: "/quorum/consortsuccess",
            name: "consortsuccess",
            meta: {
              requireAuth: true,
            },
            component: () =>
              import("@/views/baas/classb/creatconsortium/success"),
          },
          {
            path: "/quorum/consortium",
            name: "consortiumall",
            meta: {
              requireAuth: true,
            },
            children: [
              {
                path: "/quorum/consortium/detaile",
                name: "consortdetaile",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/classb/consortium/detaile/detaile"),
              },
              {
                path: "/quorum/consortium/node",
                name: "consortnode",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/classb/consortium/node/node"),
              },
              {
                path: "/quorum/consortium/contract",
                name: "consortcontract",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/classb/consortium/contract/contract"),
              },
              {
                path: "/quorum/consortium/jsonrpc",
                name: "consortjsonrpc",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/classb/consortium/jsonrpc/jsonrpc"),
              },
            ],
            component: () =>
              import("@/views/baas/classb/consortium/consortium"),
          },
        ],
      },
    ],
  },
];

export default baas;
