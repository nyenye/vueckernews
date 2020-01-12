import { Module } from "vuex";
import { HackernewsState, RootState } from "@/types";

import state from "@/store/modules/hackernews/state";
import getters from "@/store/modules/hackernews/getters";
import actions from "@/store/modules/hackernews/actions";
import mutations from "@/store/modules/hackernews/mutations";

const module: Module<HackernewsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
