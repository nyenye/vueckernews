import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";

import store from "@/store";

Vue.use(VueCompositionApi);

export const useStore = () => store;

export * from "@/hooks/hackernews";
