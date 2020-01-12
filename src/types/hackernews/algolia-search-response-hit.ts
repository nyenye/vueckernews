export interface AlgoliaSearchResponseHit {
  id?: number;

  title?: string | null;

  type?: string;

  url?: string | null;

  author?: string;

  text?: string | null;

  points: number | null;

  parent_id?: number | null;

  story_id?: number | null;

  children?: Array<AlgoliaSearchResponseHit>;

  options?: Array<AlgoliaSearchResponseHit>;

  num_comments?: number;

  created_at: string;

  created_at_i: number;

  _tags?: Array<string>;

  objectID?: string;
}
