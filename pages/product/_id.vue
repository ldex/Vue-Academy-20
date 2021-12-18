<template>
  <div>
    <section v-if="error">
      {{ error.message }}
    </section>
    <section v-else>
        <h2>{{ product.name }}</h2>
        <img
          :src="
            product.imageUrl
              ? product.imageUrl
              : 'https://placeimg.com/200/200/tech'
          "
          width="200"
          style="float: right"
        />
        <h3>{{ product.description }}</h3>
        <p>Price: {{ product.price }}</p>
        <p>Fixed price? {{ product.fixedPrice }}</p>
        <p>Discontinued? {{ product.discontinued }}</p>
        <p>Modified date: {{ product.modifiedDate }}</p>
    </section>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: this.product.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Détails pour: ' + this.product.name }
      ]
    }
  },
computed: {
    product() {
      return this.$store.state.products.product
    },
},
  async fetch({ store, params, error }) {
    const id = params.id
    try {
      await store.dispatch('products/fetchProduct', id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch product #' + id,
      })
    }
  },
  // asyncData(context) {
  //   const id = context.params.id;
  //   return context.$repositories.products.getById(id)
  //     .then((response) => {
  //       return {
  //         product: response.data,
  //       };
  //     })
  //     .catch((error) => {
  //       context.error = error;
  //     })
  // },
  data() {
    return {
      error: null
    };
  },
};
</script>

<style lang="css" scoped></style>
