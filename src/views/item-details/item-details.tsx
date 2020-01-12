// Vue
import { createComponent } from "@vue/composition-api";
// Dates
import dayjs from "dayjs";
// Typescript
import { Item } from "@/types";
// Hooks
import { useStore, useHackernewsGetCurrentDetails } from "@/hooks";
// CSS
import styles from "@/views/item-details/styles.module.scss";
// Components
import { Comment } from "@/components";

const ItemDetails = createComponent({
  setup(props, context) {
    const {
      params: { id }
    } = context.root.$route;

    const itemId: number = parseInt(id);

    const store = useStore();

    const {
      current,
      urlHost,
      date,
      hasChildren
    } = useHackernewsGetCurrentDetails(store, itemId);

    return () => {
      if (current.value === null || current.value.id !== itemId) {
        return (
          <div id="details" class={styles["item-details"]} item-id={itemId}>
            <p>Loading...</p>
          </div>
        );
      }

      const { title, by, url, score, descendants, text } = current.value;

      const titleHtml =
        urlHost !== null ? (
          <a href={url} class="title">
            <h1>
              {title}
              <span> ({urlHost.value})</span>
            </h1>
          </a>
        ) : (
          <h1>{title}</h1>
        );

      return (
        <div id="details" class={styles["item-details"]} item-id={itemId}>
          {titleHtml}

          <p class="meta-data">{`${score} points by ${by} | ${date.value} | ${descendants} comments`}</p>

          {text.length > 0 && (
            <div class="content">
              <p>{text}</p>
            </div>
          )}

          <div class="divider" />

          {hasChildren.value && (
            <Comment level={0} parentItem={current.value} />
          )}
        </div>
      );
    };
  }
});

export default ItemDetails;
