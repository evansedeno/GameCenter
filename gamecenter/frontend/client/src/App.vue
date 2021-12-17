<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  mounted() {
    console.log("L'app est demarrée");
    if (this.$store.state.user == null || !this.$store.state.user) {
      this.$router.push("/");
    }

    let token = this.$store.state.membre.token;
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
    } else {
      api.defaults.headers.common["Authorization"] = null;
    }
  },
  methods: {},
};
</script>

<style lang="scss">
*{
    outline:none;
} 
</style>
