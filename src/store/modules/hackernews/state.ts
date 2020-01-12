import { Module, GetterTree, Getter } from "vuex";
import { Item, HackernewsState, RootState } from "@/types";

const state: HackernewsState = {
  topIds: new Array<number>(),
  newestIds: new Array<number>(),
  items: {} as { [key: number]: Item },
  currentDetails: null
} as HackernewsState;

export default state;
