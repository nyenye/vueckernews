import { Module, GetterTree, Getter } from "vuex";
import { Item, HackernewsState, RootState } from "@/types";

import { G_GET_TOP_ITEMS, G_GET_NEWEST_ITEMS } from "@/store/getters";

const getTopItems: Getter<HackernewsState, RootState> = (
  state: HackernewsState
): { [key: number]: Item } => {
  const { topIds, items } = state;

  const topItems: { [key: number]: Item } = {};

  topIds.forEach((id: number) => {
    if (items[id] != undefined) topItems[id] = items[id] as Item;
  });

  return topItems;
};

const getNewestItems: Getter<HackernewsState, RootState> = (
  state: HackernewsState
): { [key: number]: Item } => {
  const { newestIds, items } = state;

  const newests: { [key: number]: Item } = {};

  newestIds.forEach((id: number) => {
    if (!items[id] !== undefined) newests[id] = items[id] as Item;
  });

  return newests;
};

const getters: GetterTree<HackernewsState, RootState> = {
  [G_GET_TOP_ITEMS]: getTopItems,
  [G_GET_NEWEST_ITEMS]: getNewestItems
};

export default getters;
