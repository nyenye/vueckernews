import { Module, MutationTree, Mutation } from "vuex";
import { Item, HackernewsState, RootState } from "@/types";

import {
  M_SET_TOP_ITEM_IDS,
  M_SET_NEWEST_ITEM_IDS,
  M_SET_ITEM,
  M_SET_ITEMS,
  M_SET_CURRENT_DETAILS
} from "@/store/mutations";

const setTopItemIds: Mutation<HackernewsState> = (
  state: HackernewsState,
  idsToSet: Array<number>
): void => {
  state.topIds = idsToSet;
};

const setNewestItemIds: Mutation<HackernewsState> = (
  state: HackernewsState,
  idsToSet: Array<number>
): void => {
  state.newestIds = idsToSet;
};
const setItem: Mutation<HackernewsState> = (
  state: HackernewsState,
  itemToSet: Item
): void => {
  const descendants: number =
    state.items[itemToSet.id] !== undefined
      ? state.items[itemToSet.id]!.descendants
      : itemToSet.children.length;

  state.items = {
    ...state.items,
    [itemToSet.id]: { ...itemToSet, descendants }
  };
};

const setCurrentDetails: Mutation<HackernewsState> = (
  state: HackernewsState,
  itemDetails: Item | null
): void => {
  state.currentDetails = itemDetails;
};

const setItems: Mutation<HackernewsState> = (
  state: HackernewsState,
  itemsToSet: Array<Item>
): void => {
  const newItems: { [key: number]: Item } = {};
  itemsToSet.forEach((item: Item) => (newItems[item.id] = item));

  state.items = { ...state.items, ...newItems };
};

const mutations: MutationTree<HackernewsState> = {
  [M_SET_TOP_ITEM_IDS]: setTopItemIds,
  [M_SET_NEWEST_ITEM_IDS]: setNewestItemIds,
  [M_SET_ITEM]: setItem,
  [M_SET_ITEMS]: setItems,
  [M_SET_CURRENT_DETAILS]: setCurrentDetails
};

export default mutations;
