// Vue
import { createComponent, computed, onMounted } from "@vue/composition-api";
// Dates
import dayjs, { Dayjs } from "dayjs";
// TypeScript
import { Item } from "@/types";
// CSS
import styles from "@/components/comment/styles.module.scss";

interface CommentProps {
  level: number;
  parentItem: Item;
}

export const Comment = createComponent<CommentProps, {}>({
  props: {
    level: {
      required: true
    },
    parentItem: {
      required: true
    }
  },
  setup(props: Readonly<CommentProps>) {
    const {
      level,
      parentItem: { id, children }
    } = props;

    const hasChildren = children !== undefined && children.length > 0;

    return () => (
      <div item-id={id} class={styles["comments"]}>
        {hasChildren &&
          children!.map((child: Item, index: number) => {
            const { text, by, time } = child;
            const grandChildren = child.children;

            const hasGrandChildren =
              grandChildren !== undefined && grandChildren.length > 0;

            const date = dayjs(time * 1000).format("YYYY/MM/DD HH:mm:ss");
            return (
              <div class="comment">
                <p class="meta-data">{`${by} | ${date} | ${
                  grandChildren !== undefined ? grandChildren.length : 0
                } replies`}</p>

                <div domPropsInnerHTML={text} />

                {/* <div class="divider" /> */}

                {hasGrandChildren && (
                  <Comment level={level + 1} parentItem={child}></Comment>
                )}
              </div>
            );
          })}
      </div>
    );
  }
});
