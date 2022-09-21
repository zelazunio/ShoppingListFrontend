<template>
  <div class="navbarContainer">
    <b-navbar type="dark" variant="dark" v-if="$store.state.menuBarVisible">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Lang" right dropup>
          <b-dropdown-item href="#" @click="setLang('en')">EN</b-dropdown-item>
          <b-dropdown-item href="#" @click="setLang('pl')">PL</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item>
          <b-icon-x @click="$store.commit('changeMenuBarVisibility')" />
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  data() {
    return {};
  },mounted() {
    try {
      let langMemory = localStorage.getItem("shoppingListJzLocale");
      if (langMemory) this.setLang(langMemory);
    } catch {
      console.debug("Couldn't find and set your language");
    }
  },
  methods: {
    setLang(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("shoppingListJzLocale", lang);
    },
  },
};
</script>

<style lang="sass">
.navbarContainer
    position: absolute
    z-index: 100
    left: 0
    bottom: 0
    right: 0
</style>