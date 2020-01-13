// Vue
import { createComponent } from "@vue/composition-api";
// Typescript
import { Item } from "@/types";
// Hooks
import { useStore } from "@/hooks";
// CSS
import styles from "@/views/item-list/styles.module.scss";
// Components
import Spinner from "vue-simple-spinner";
import { ItemPreview } from "@/components";

interface ItemListProps {
  hook: Function;
}

const useItemList = () =>
  createComponent<ItemListProps, {}>({
    props: {
      hook: {
        required: true
      }
    },
    setup(props: Readonly<ItemListProps>) {
      const { hook } = props;

      const store = useStore();
      const { ids, items, loadMore } = hook(store);

      return () => {
        let renderNextItem = true;
        let renderedItems = 0;

        const shouldRenderMoreButton = (numOfItems: number): boolean => {
          return renderedItems !== 0 && renderedItems < numOfItems;
        };

        if (ids.value.length > 0 && items.value[ids.value[0]] === undefined) {
          return (
            <div id="item-list" class={styles["item-list-empty"]}>
              <Spinner line-bg-color="#2c3e50" line-fg-color="#42b983" />
            </div>
          );
        }

        return (
          <div id="item-list" class={styles["item-list"]}>
            {ids.value.map((id: number, index: number) => {
              if (!renderNextItem) {
                return null;
              }

              if (items.value[id] === undefined) {
                renderNextItem = false;
                return null;
              }

              renderedItems += 1;

              const item: Item = items.value[id];
              return (
                <ItemPreview key={item.id} position={index + 1} item={item} />
              );
            })}

            {shouldRenderMoreButton(ids.value.length) && (
              <div class="load-more">
                <button class="btn" onClick={() => loadMore(renderedItems)}>
                  Load More
                </button>
              </div>
            )}
          </div>
        );
      };
    }
  });

const ItemList = useItemList();

export { ItemList, useItemList };
