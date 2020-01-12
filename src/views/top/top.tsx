// Vue
import { createComponent } from "@vue/composition-api";
// Typescript
import { Item } from "@/types";
// Hooks
import { useStore, useHackernewsTopItems } from "@/hooks";
// CSS
import styles from "@/views/top/styles.module.scss";
// Components
import { ItemPreview } from "@/components";

const Top = createComponent({
  setup() {
    const store = useStore();
    const { topIds, topItems, loadMore } = useHackernewsTopItems(store);

    return () => {
      let renderNextItem = true;
      let renderedItems = 0;

      const shouldRenderMoreButton = (numOfItems: number): boolean => {
        return renderedItems !== 0 && renderedItems < numOfItems;
      };
      return (
        <div id="top" class={styles["top-items"]}>
          {topIds.value.map((id: number, index: number) => {
            if (!renderNextItem) {
              return null;
            }

            if (topItems.value[id] === undefined) {
              renderNextItem = false;
              return null;
            }

            renderedItems += 1;

            const item: Item = topItems.value[id];
            return (
              <ItemPreview key={item.id} position={index + 1} item={item} />
            );
          })}

          {shouldRenderMoreButton(topIds.value.length) && (
            <div class="load-more">
              <button onClick={() => loadMore(renderedItems)}>Load More</button>
            </div>
          )}
        </div>
      );
    };
  }
});

export default Top;
