// Vue
import { createComponent, computed, onMounted } from "@vue/composition-api";
// Dates
import dayjs, { Dayjs } from "dayjs";
// TypeScript
import { Item } from "@/types";
// CSS
import styles from "@/components/item-preview/styles.module.scss";

interface ItemPreviewProps {
  position: number;
  item: Item;
}

export const ItemPreview = createComponent<ItemPreviewProps, {}>({
  props: {
    position: {
      required: true
    },
    item: {
      required: true
    }
  },
  setup(props: Readonly<ItemPreviewProps>) {
    const {
      position,
      item: { id, title, time, by, score, descendants, url }
    } = props;

    let urlHost: string | null =
      url.length > 0 ? new URL(url as string).host : null;

    const date = dayjs(time * 1000).format("YYYY/MM/DD HH:mm:ss");

    return () => (
      <div item-id={id} class={styles["item-preview"]}>
        <div class="position">
          <span>{position}.</span>
        </div>
        <div class="content">
          <div class="headline">
            <h3>
              <router-link to={`/item/${id}`}>{title}</router-link>
              {urlHost !== null && (
                <span>
                  {" "}
                  <a href={url}>({urlHost})</a>
                </span>
              )}
            </h3>
          </div>

          <div class="meta-data">
            <p>{`${score} points by ${by} | ${date} | ${descendants} comments`}</p>
          </div>
        </div>
      </div>
    );
  }
});
