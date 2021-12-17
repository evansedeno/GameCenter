<template>
  <div>
    <div class="div">
      <div class="image">
        <img src="../assets/logo.png" class="logo" /><br />
        <img src="../assets/loading.gif" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  mounted() {
    this.callFunction();
  },
  components: {},
  methods: {
    callFunction: function () {
      var v = this;
      setTimeout(function () {
        v.$router.push("/home");
      }, 2500);
    },
  },
};
</script>

<style lang="scss">

* {
  margin: 0;
  box-sizing: border-box;
}

.div {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3e3e3e;
  background-size: 100%;
}

.image {
  text-align: center;
  & img:first-of-type {
    width: 50%;
  }

  & img:last-of-type {
    width: 17%;
    margin-top: -5%;
  }
}
</style>
