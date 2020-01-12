export const HACKERNEWS_URL: string = "https://hacker-news.firebaseio.com/v0";

export const ALGOLIA_URL: string = "http://hn.algolia.com/api/v1/";

export const TOP_STORIES_ENDPOINT: string = "topstories.json";

export const NEWEST_STORIES_ENDPOINT: string = "newstories.json";

export const ALGOLIA_ITEM_ENDPOINT = (id: number): string => `items/${id}`;

export const ALGOLIA_SEARCH_ENDPOINT = (queryString: string): string =>
  `search?${queryString}`;

export const getAlgoliaItemsByIdQueryString = (
  ids: Array<number>,
  hitsPerPage: number
): string => {
  const tags: string = getAlgoliaTagsIdIn(ids);

  const pagination: string = getAlgoliaPagination(hitsPerPage);

  const attributes: string = algoliaAttributesFilter;

  return `${tags}&${pagination}&${attributes}`;
};

const getAlgoliaTagsIdIn = (ids: Array<number>): string => {
  let tags: string = "tags=(story,job,poll,show_hn,ask_hn),(";
  {
    for (let id of ids) tags = `${tags}story_${id},`;
  }
  tags = `${tags})`;

  return tags;
};

const getAlgoliaPagination = (hitsPerPage: number): string =>
  `page=0&hitsPerPage=${hitsPerPage}`;

const algoliaAttributesFilter =
  "attributesToRetrieve=title,url,author,points,num_comments,objectID,_tags,created_at_i&attributesToHighlight";
