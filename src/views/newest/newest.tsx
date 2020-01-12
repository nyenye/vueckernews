// Vue
import { createComponent } from "@vue/composition-api";
// Typescript
import { Item } from "@/types";
// Hooks
import { useStore, useHackernewsNewestItems } from "@/hooks";
// CSS
import styles from "@/views/newest/styles.module.scss";
// Components
import { ItemPreview } from "@/components";

const Newest = createComponent({
  setup() {
    const store = useStore();
    const { newestIds, newestItems, loadMore } = useHackernewsNewestItems(
      store
    );

    return () => {
      let renderNextItem = true;
      let renderedItems = 0;

      const shouldRenderMoreButton = (numOfItems: number): boolean => {
        return renderedItems !== 0 && renderedItems < numOfItems;
      };

      return (
        <div id="newest" class={styles["newest-items"]}>
          {newestIds.value.map((id: number, index: number) => {
            if (!renderNextItem) {
              return null;
            }

            if (newestItems.value[id] === undefined) {
              renderNextItem = false;
              return null;
            }

            renderedItems += 1;

            const item: Item = newestItems.value[id];
            return (
              <ItemPreview key={item.id} position={index + 1} item={item} />
            );
          })}

          {shouldRenderMoreButton(newestIds.value.length) && (
            <div class="load-more">
              <button onClick={() => loadMore(renderedItems)}>Load More</button>
            </div>
          )}
        </div>
      );
    };
  }
});

export default Newest;
