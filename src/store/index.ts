import Vue from "vue";
import Vuex, { Store, Payload, Mutation } from "vuex";
import VuexPersistence from "vuex-persist";
import createLogger from "vuex/dist/logger";

import { RootState } from "@/types";
import { NS_HACKERNEWS } from "@/store/namespaces";
import { M_SET_ITEMS, M_SET_ITEM } from "@/store/mutations";
import modules from "@/store/modules";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: [NS_HACKERNEWS],
  filter: (mutation: Payload) =>
    mutation.type === `${NS_HACKERNEWS}/${M_SET_ITEMS}` ||
    mutation.type === `${NS_HACKERNEWS}/${M_SET_ITEM}`,
  reducer: (state: RootState) => {
    return { [NS_HACKERNEWS]: { items: state.hackernews.items } };
  }
});

const store = new Store<RootState>({
  strict: process.env.NODE_ENV !== "production",
  modules,
  plugins: [createLogger(), vuexLocalStorage.plugin]
});

export default store;
