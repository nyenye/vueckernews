import { Store } from "vuex";
import { RootState } from "@/types/store/states";
export * from "@/types/store/states";

export type MyStore = Store<RootState>;
