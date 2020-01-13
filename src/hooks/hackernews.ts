import { reactive, computed, onMounted, Ref } from "@vue/composition-api";
// TypeScript
import { MyStore, Item } from "@/types";
// Vuex
import { NS_HACKERNEWS } from "@/store/namespaces";
import { G_GET_TOP_ITEMS, G_GET_NEWEST_ITEMS } from "@/store/getters";
import {
  A_FETCH_TOP_ITEM_IDS,
  A_FETCH_NEWEST_ITEM_IDS,
  A_FETCH_ITEM_BY_ID,
  A_FETCH_ITEMS_BY_IDS
} from "@/store/actions";
import dayjs from "dayjs";

export const useHackernewsTopItems = (store: MyStore) => {
  const ids = computed(() => store.state.hackernews.topIds);

  const items = computed(() => {
    return store.getters[`${NS_HACKERNEWS}/${G_GET_TOP_ITEMS}`] as {
      [key: number]: Item;
    };
  });

  const loadMore = (lastRenderedItem: number) => {
    const itemsToLoad = 50;

    const idsToFetch = ids.value.filter(
      (_, index: number) =>
        index >= lastRenderedItem && index < lastRenderedItem + itemsToLoad
    );

    store.dispatch(`${NS_HACKERNEWS}/${A_FETCH_ITEMS_BY_IDS}`, idsToFetch);
  };

  onMounted(() => {
    store.dispatch(`${NS_HACKERNEWS}/${A_FETCH_TOP_ITEM_IDS}`);
  });

  return { ids, items, loadMore };
};

export const useHackernewsNewestItems = (store: MyStore) => {
  const ids = computed(() => store.state.hackernews.newestIds);

  const items = computed(() => {
    return store.getters[`${NS_HACKERNEWS}/${G_GET_NEWEST_ITEMS}`] as {
      [key: number]: Item;
    };
  });

  const loadMore = (lastRenderedItem: number) => {
    const itemsToLoad = 50;

    const idsToFetch = ids.value.filter(
      (_, index: number) =>
        index >= lastRenderedItem && index < lastRenderedItem + itemsToLoad
    );

    store.dispatch(`${NS_HACKERNEWS}/${A_FETCH_ITEMS_BY_IDS}`, idsToFetch);
  };

  onMounted(() => {
    store.dispatch(`${NS_HACKERNEWS}/${A_FETCH_NEWEST_ITEM_IDS}`);
  });

  return { ids, items, loadMore };
};

export const useHackernewsGetCurrentDetails = (
  store: MyStore,
  itemId: number
) => {
  const current = computed(() => {
    return store.state.hackernews.currentDetails;
  });

  const urlHost = computed(() => {
    if (current.value === null || current.value.url.length === 0) return null;

    return new URL(current.value.url as string).host as string;
  });

  const date = computed(() => {
    if (current.value === null) return null;

    return dayjs(current.value.time * 1000).format("YYYY/MM/DD HH:mm:ss");
  });

  const hasChildren = computed(() => {
    if (current.value === null) return false;

    return current.value.children.length > 0;
  });

  onMounted(() => {
    store.dispatch(`${NS_HACKERNEWS}/${A_FETCH_ITEM_BY_ID}`, {
      idToFetch: itemId,
      forceFetch: false
    });
  });

  return { current, urlHost, date, hasChildren };
};
