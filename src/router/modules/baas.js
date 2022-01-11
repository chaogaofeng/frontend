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
                name: "organList",
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
            path: "fabric",
            name: "fabric",
            redirect: "/baas/fabric/organizationList",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/baas/fabricPages/fabric"),
            children: [
              {
                path: "organizationList",
                name: "fabricOrganizationList",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/fabricPages/organization"),
              },
              {
                path: "consortiumList",
                name: "fabricConsortiumList",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/fabricPages/league"),
              },
              {
                path: "consortiumMg/:leagueId",
                name: "fabricConsortiumMg",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/fabricPages/league/alianceManagement"),
              },
              {
                path: "memberMg/:leagueId",
                name: "fabricConsortiumMemberMg",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/fabricPages/league/alianceMemberManagement"),
              },
              {
                path: "nodeMg/:leagueId",
                name: "fabricNodeMg",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/fabricPages/league/nodeManagement"),
              },
              {
                path: "channelMg/:leagueId",
                name: "fabricChannelMg",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/fabricPages/league/channelManagement"),
              },
              {
                path: "eventList",
                name: "fabricEventToConsortiumList",
                meta: {
                  requireAuth: true,
                },
                component: () =>
                  import("@/views/baas/fabricPages/eventHubs"),
                children: [
                  {
                    path: "consortium",
                    name: "fabricConsortiumEventList",
                    meta: {
                      requireAuth: true,
                    },
                    component: () => import("@/views/baas/fabricPages/eventHubs/eventConsortiumList")
                  },
                  {
                    path: "channel",
                    name: "fabricChannelEventList",
                    meta: {
                      requireAuth: true,
                    },
                    component: () => import("@/views/baas/fabricPages/eventHubs/eventChannelList")
                  }          
                ]
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
      // Fabric 路由
      {
        path: "/fabric/organDetail/:orgId",
        name: "organDetail",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/baas/fabricPages/organization/organDetail")
      },
      {
        path: "/fabric/createConsortium",
        name: "fabricAddConsortium",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/baas/fabricPages/league/createLeague")
      },
      /* {
        path: "baas/fabric/eventList",
        name: "fabricEventToConsortiumList",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/baas/fabricPages/eventHubs"),
        children: [
          {
            path: "consortium",
            name: "fabricConsortiumEventList",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/baas/fabricPages/eventHubs/eventConsortiumList")
          },
          {
            path: "channel",
            name: "fabricChannelEventList",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/baas/fabricPages/eventHubs/eventChannelList")
          }          
        ]
      }, */
    ],
  },
];

export default baas;
