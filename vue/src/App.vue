<template>
  <div id="app">
    <h1>{{ state }}</h1>
  </div>
</template>

<script>
import { overlayCollection } from "./firebase";
import Vue from "vue";
import VueConfetti from "vue-confetti";

Vue.use(VueConfetti);
export default {
  name: "App",
  data() {
    return {
      state: undefined,
    };
  },
  mounted() {
    this.connectToDB();
  },
  watch: {
    state(val) {
      if (val === undefined) return;
      if (val.active) this.startConfetti();
      if (!val.active) this.stopConfetti();
    },
  },
  methods: {
    connectToDB() {
      overlayCollection
        .doc("state")
        .onSnapshot((doc) => (this.state = doc.data()));
    },
    startConfetti() {
      this.$confetti.start();
    },
    stopConfetti() {
      this.$confetti.stop();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  color: blue;
}
</style>
