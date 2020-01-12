import { Item } from "@/types";

export interface HackernewsState {
  topIds: Array<number>;
  newestIds: Array<number>;
  items: { [key: number]: Item | undefined };
  currentDetails: Item | null;
}

export interface RootState {
  hackernews: HackernewsState;
}
