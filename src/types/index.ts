export * from "@/types/hackernews";

export * from "@/types/store";

export * from "@/types/routes";

export * from "@/types/hooks";

export type Dictionary<T> = {
  [key in string | number]: T;
};
