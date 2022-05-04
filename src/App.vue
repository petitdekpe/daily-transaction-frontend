<template>
  <NavBar />
  <router-view />
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  beforeMount() {
    this.$store.commit("persistUserData");
  },
  components: {
    NavBar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
