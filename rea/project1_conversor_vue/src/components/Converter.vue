<template>
  <div class="converter">
    <h2>{{ coinA }} to {{ coinB }}</h2>
    <input type="text" v-model="coinA_value" v-bind:placeholder="coinA" />
    <input type="button" value="Convert" v-on:click="convert" />
    <h2>{{ sign }}{{ coinB_value }}</h2>
  </div>
</template>

<script>
export default {
  name: "Converter",
  props: ["coinA", "coinB", "sign"],
  data() {
    return {
      coinA_value: "",
      coinB_value: 0,
    };
  },
  methods: {
    convert() {
      let from_to = this.coinA + "_" + this.coinB;
      let url =
        "https://free.currconv.com/api/v7/convert?q=" +
        from_to +
        "&compact=ultra&apiKey=2e2282f1c1fd83c440ff";

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          let price = json[from_to];
          this.coinB_value = (price * parseFloat(this.coinA_value)).toFixed(2);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.converter {
  padding: 20px;
  max-width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
