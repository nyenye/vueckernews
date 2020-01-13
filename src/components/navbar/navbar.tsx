//Vue
import { createComponent, computed, onMounted } from "@vue/composition-api";
// CSS
import styles from "@/components/navbar/styles.module.scss";

export const Navbar = createComponent({
  setup() {
    return () => (
      <div id="nav" class={styles.navbar}>
        <div class="logo">
          <h1>Vuecker News</h1>
        </div>
        <div class="links">
          <router-link to="/">Top</router-link>
          {" | "}
          <router-link to="/newest">Newest</router-link>
        </div>
        {/* <div class="login">
          <a href="#login">Login</a>
        </div> */}
      </div>
    );
  }
});
