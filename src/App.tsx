// Vue
import { createComponent, computed, onMounted } from "@vue/composition-api";
// Components
import { Navbar } from "@/components";
//CSS
import styles from "@/App.module.scss";

const App = createComponent({
  setup() {
    return () => (
      <div id="app" class={styles.app}>
        <div class="wrapper">
          <Navbar />
          <router-view />
        </div>
      </div>
    );
  }
});

export default App;

/*
<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
    }
  }
}
-</style>

*/
