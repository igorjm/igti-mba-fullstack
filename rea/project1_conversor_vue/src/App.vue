<template>
  <div id="app">
    <h1>Coin Converter</h1>
    <div class="row">
      <Converter coin-a="USD" coinB="BRL" sign="$" />
      <Converter coin-a="BRL" coinB="USD" sign="R$" />
    </div>
    <div class="row">
      <Converter coin-a="EUR" coinB="BRL" sign="€" />
      <Converter coin-a="BRL" coinB="EUR" sign="R$" />
    </div>
  </div>
</template>

<script>
import Converter from "./components/Converter.vue";

export default {
  name: "App",
  components: {
    Converter,
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
  max-width: 900px;
  margin: auto;
}
.row {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
}
</style>
