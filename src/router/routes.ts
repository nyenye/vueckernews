import { RouteDefinition } from "@/types";

export const ROUTE_TOP: RouteDefinition = { path: "/", name: "top" };

export const ROUTE_NEWEST: RouteDefinition = {
  path: "/newest",
  name: "newest"
};

export const ROUTE_ITEM_DETAILS: RouteDefinition = {
  path: "/item/:id",
  name: "item-details"
};
