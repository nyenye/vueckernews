// Vue
import Vue from "vue";
// VueRouter
import VueRouter, { Route, RouterOptions, RouteConfig } from "vue-router";
// Hooks
import { useStore } from "@/hooks";
// Store
import { NS_HACKERNEWS } from "@/store/namespaces";
import { M_SET_CURRENT_DETAILS } from "@/store/mutations";
// Hooks
import { useHackernewsTopItemList, useHackernewsNewestItemList } from "@/hooks";
// Routes
import { ROUTE_TOP, ROUTE_NEWEST, ROUTE_ITEM_DETAILS } from "@/router/routes";
// Components
import { useItemList } from "@/views";

Vue.use(VueRouter);

const routes = [
  {
    ...ROUTE_TOP,
    component: useItemList(),
    props: {
      hook: useHackernewsTopItemList
    }
  },
  {
    ...ROUTE_NEWEST,
    component: useItemList(),
    props: {
      hook: useHackernewsNewestItemList
    }
  },
  {
    ...ROUTE_ITEM_DETAILS,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return import(
        /* webpackChunkName: "newest" */ "../views/item-details/item-details"
      );
    },
    props: (route: Route) => {
      return { id: parseInt(route.params.id) };
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes as Array<RouteConfig>,
  scrollBehavior: () => ({ x: 0, y: 0 })
});

router.beforeEach((to: Route, from: Route, next: Function) => {
  // Route "item-details"
  if (to.name === ROUTE_ITEM_DETAILS.name) {
    const id = parseInt(to.params.id);

    const store = useStore();

    if (
      store.state.hackernews.currentDetails !== null &&
      store.state.hackernews.currentDetails.id === id
    )
      return next();

    if (store.state.hackernews.items[id] !== undefined) {
      store.commit(
        `${NS_HACKERNEWS}/${M_SET_CURRENT_DETAILS}`,
        store.state.hackernews.items[id]
      );
    }
  } else if (from.name === ROUTE_ITEM_DETAILS.name) {
    const store = useStore();
    store.commit(`${NS_HACKERNEWS}/${M_SET_CURRENT_DETAILS}`, null);
  }

  next();
});

export default router;
