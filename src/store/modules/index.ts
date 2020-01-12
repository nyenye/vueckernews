import { ModuleTree } from "vuex";

import { RootState } from "@/types";
import { NS_HACKERNEWS } from "@/store/namespaces";
import HackernewsModule from "@/store/modules/hackernews";

const rootModules: ModuleTree<RootState> = {
  [NS_HACKERNEWS]: HackernewsModule
};

export default rootModules;
