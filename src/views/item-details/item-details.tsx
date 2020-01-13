// Vue
import { createComponent } from "@vue/composition-api";
// Hooks
import { useStore, useHackernewsItemDetails } from "@/hooks";
// Types
import { UseHackernewsItemDetailsReturn } from "@/types";

// CSS
import styles from "@/views/item-details/styles.module.scss";
// Components
import Spinner from "vue-simple-spinner";
import { Comment } from "@/components";

interface ItemDetailsProps {
  id: number;
}

const ItemDetails = createComponent<ItemDetailsProps, {}>({
  props: {
    id: {
      required: true
    }
  },
  setup(props, context) {
    const { id } = props;

    const store = useStore();

    const {
      current,
      urlHost,
      date,
      hasChildren
    }: UseHackernewsItemDetailsReturn = useHackernewsItemDetails(store, id);

    return () => {
      if (current.value === null || current.value.id !== id) {
        return (
          <div id="details" class={styles["item-details"]} item-id={id}>
            <Spinner line-bg-color="#2c3e50" line-fg-color="#42b983" />
          </div>
        );
      }

      const { title, by, url, score, descendants, text } = current.value;

      const titleHtml =
        urlHost.value !== null ? (
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
        <div id="details" class={styles["item-details"]} item-id={id}>
          {titleHtml}

          <p class="meta-data">{`${score} points by ${by} | ${date.value} | ${descendants} comments`}</p>

          {text.length > 0 && (
            <div class="content" domPropsInnerHTML={text}></div>
          )}

          <div class="divider" />

          {(hasChildren.value && (
            <Comment level={0} parentItem={current.value} />
          )) ||
            (descendants > 0 && (
              <Spinner line-bg-color="#2c3e50" line-fg-color="#42b983" />
            ))}
        </div>
      );
    };
  }
});

export default ItemDetails;

export { ItemDetails };
