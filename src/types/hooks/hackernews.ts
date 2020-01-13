import { Ref } from "@vue/composition-api";
import { Item } from "@/types/hackernews/item";
import { Dictionary } from "@/types";

export interface UseHackernewsItemListReturn {
  ids: Readonly<Ref<readonly number[]>>;
  items: Readonly<Ref<Dictionary<Item>>>;
  loadMore: Function;
}

export interface UseHackernewsItemDetailsReturn {
  current: Readonly<Ref<Item | null>>;
  urlHost: Readonly<Ref<string | null>>;
  date: Readonly<Ref<string | null>>;
  hasChildren: Readonly<Ref<boolean>>;
}
