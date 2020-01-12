import { Item, AlgoliaSearchResponseHit } from "@/types";

export const ItemFromAlgoliaSearchResult = (
  algoliaItem: AlgoliaSearchResponseHit
): Item => {
  const id: number =
    algoliaItem.id !== undefined
      ? algoliaItem.id
      : algoliaItem.objectID !== undefined
      ? parseInt(algoliaItem.objectID)
      : -1;

  const type: string =
    algoliaItem.type !== undefined
      ? algoliaItem.type
      : algoliaItem["_tags"] !== undefined
      ? algoliaItem["_tags"][0]
      : "unknown";

  const children: Array<Item> =
    algoliaItem.children !== undefined
      ? (algoliaItem.children.map((child: AlgoliaSearchResponseHit) =>
          ItemFromAlgoliaSearchResult(child)
        ) as Array<Item>)
      : ([] as Array<Item>);

  const options: Array<Item> =
    algoliaItem.options !== undefined
      ? (algoliaItem.options.map((child: AlgoliaSearchResponseHit) =>
          ItemFromAlgoliaSearchResult(child)
        ) as Array<Item>)
      : ([] as Array<Item>);

  return {
    id,
    title: algoliaItem.title || "",
    type,
    time: algoliaItem.created_at_i as number,
    text: (algoliaItem.text as string) || "",
    by: (algoliaItem.author as string) || "unknown",
    dead: false,
    deleted: false,
    parent: algoliaItem.parent_id || -1,
    poll: -1,
    children,
    options,
    url: (algoliaItem.url as string) || "",
    score: (algoliaItem.points as number) || 0,
    descendants: (algoliaItem.num_comments as number) || 0
  };
};
