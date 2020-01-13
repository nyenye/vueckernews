//Axios
import axios, { AxiosResponse } from "axios";
//Vuex
import { ActionTree, ActionHandler, ActionContext } from "vuex";
//Api
import {
  HACKERNEWS_URL,
  TOP_STORIES_ENDPOINT,
  NEWEST_STORIES_ENDPOINT,
  ALGOLIA_URL,
  ALGOLIA_SEARCH_ENDPOINT,
  getAlgoliaItemsByIdQueryString,
  ALGOLIA_ITEM_ENDPOINT
} from "@/api";
//Vuex
import {
  A_FETCH_TOP_ITEM_IDS,
  A_FETCH_ITEMS_BY_IDS,
  A_FETCH_NEWEST_ITEM_IDS,
  A_FETCH_ITEM_BY_ID
} from "@/store/actions";
import {
  M_SET_TOP_ITEM_IDS,
  M_SET_NEWEST_ITEM_IDS,
  M_SET_ITEMS,
  M_SET_ITEM,
  M_SET_CURRENT_DETAILS
} from "@/store/mutations";
// Types
import {
  Item,
  HackernewsState,
  RootState,
  AlgoliaSearchResponseHit
} from "@/types";
// Factories
import { ItemFromAlgoliaSearchResult } from "@/factories";

const fetchTopItemIds: ActionHandler<HackernewsState, RootState> = (
  context: ActionContext<HackernewsState, RootState>,
  _: any
): void => {
  const { commit, dispatch } = context;

  axios
    .get(`${HACKERNEWS_URL}/${TOP_STORIES_ENDPOINT}`)
    .then((response: AxiosResponse) => {
      const ids = response.data as Array<number>;
      commit(M_SET_TOP_ITEM_IDS, ids, { root: false });

      const idsToFetch = ids.slice(0, 50);
      dispatch(A_FETCH_ITEMS_BY_IDS, idsToFetch, { root: false });
    })
    .catch(err => {})
    .finally();
};

const fetchNewestItemIds: ActionHandler<HackernewsState, RootState> = (
  context: ActionContext<HackernewsState, RootState>,
  _: any
): void => {
  const { commit, dispatch } = context;

  axios
    .get(`${HACKERNEWS_URL}/${NEWEST_STORIES_ENDPOINT}`)
    .then((response: AxiosResponse) => {
      const ids = response.data as Array<number>;
      commit(M_SET_NEWEST_ITEM_IDS, ids, { root: false });

      const idsToFetch = ids.slice(0, 50);
      dispatch(A_FETCH_ITEMS_BY_IDS, idsToFetch, { root: false });
    })
    .catch(err => {})
    .finally();
};

const fetchItemById: ActionHandler<HackernewsState, RootState> = (
  context: ActionContext<HackernewsState, RootState>,
  payload: { idToFetch: number; forceFetch: boolean }
): void => {
  const { commit, state } = context;

  const { idToFetch, forceFetch = false } = payload;

  if (
    !forceFetch &&
    state.items[idToFetch] !== undefined &&
    state.items[idToFetch]!.children !== undefined &&
    state.items[idToFetch]!.children!.length > 0
  ) {
    commit(M_SET_CURRENT_DETAILS, state.items[idToFetch], { root: false });
    return;
  }

  axios
    .get(`${ALGOLIA_URL}/${ALGOLIA_ITEM_ENDPOINT(idToFetch)}`)
    .then((response: AxiosResponse) => {
      const item: Item = ItemFromAlgoliaSearchResult(
        response.data as AlgoliaSearchResponseHit
      );
      commit(M_SET_ITEM, item, { root: false });
      commit(M_SET_CURRENT_DETAILS, state.items[idToFetch], { root: false });
    })
    .catch(err => {})
    .finally();
};

const fetchItemsByIds: ActionHandler<HackernewsState, RootState> = (
  context: ActionContext<HackernewsState, RootState>,
  idsToFetch: Array<number>
): void => {
  const { commit, state } = context;

  const uncachedIds = idsToFetch.filter(
    (id: number) => state.items[id] === undefined
  );

  if (uncachedIds.length == 0) {
    return;
  }

  const queryString = getAlgoliaItemsByIdQueryString(
    uncachedIds,
    uncachedIds.length
  );

  axios
    .get(`${ALGOLIA_URL}/${ALGOLIA_SEARCH_ENDPOINT(queryString)}`)
    .then((response: AxiosResponse) => {
      const items: Array<Item> = (response.data.hits as Array<
        AlgoliaSearchResponseHit
      >).map((algoliaHit: AlgoliaSearchResponseHit) => {
        return ItemFromAlgoliaSearchResult(algoliaHit);
      });

      commit(M_SET_ITEMS, items, { root: false });
    })
    .catch(err => {})
    .finally();
};

const actions: ActionTree<HackernewsState, RootState> = {
  [A_FETCH_TOP_ITEM_IDS]: fetchTopItemIds,
  [A_FETCH_NEWEST_ITEM_IDS]: fetchNewestItemIds,
  [A_FETCH_ITEMS_BY_IDS]: fetchItemsByIds,
  [A_FETCH_ITEM_BY_ID]: fetchItemById
};

export default actions;
