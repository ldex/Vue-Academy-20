<template>
  <div>
    <h2>Produits</h2>
    <fieldset class="filters">
      Trier par:
      <button @click="sort('name')">Nom</button>
      <button @click="sort('price')">Prix</button>
      <button @click="sort('modifiedDate')">Date</button>
      <span> Filtrer par nom: <input v-model="filterName" /></span>
    </fieldset>
    <ul class="products">
      <nuxt-link
        v-for="product in sortedFilteredPaginatedProducts"
        :key="product.id"
        :to="{ name: 'product-id', params: { id: product.id } }"
        tag="li"
      >
        <span class="name">{{ product.name }}</span>
        <span class="description">{{ product.description }}</span>
        <span class="price">{{ product.price }}</span>
      </nuxt-link>
    </ul>
    <button :disabled="pageNumber === 1" @click="prevPage">
      &lt; Previous
    </button>
    Page {{ pageNumber }}
    <button :disabled="pageNumber >= pageCount" @click="nextPage">
      Next &gt;
    </button>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Mes produits',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Voici la liste de nos produits.' }
      ]
    }
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  async fetch({ store }) {
    await store.dispatch('products/fetchProducts')
  },
  // asyncData(context) {
  //   return context.$repositories.products.get().then((result) => {
  //     return { products: result.data }
  //   })
  // },
  data() {
    return {
      filterName: '',
      sortName: 'modifiedDate',
      sortDir: 'desc',
      pageNumber: 1,
    }
  },
  computed: {
    products() {
      return this.$store.state.products.list
    },
    filteredProducts() {
      const filter = new RegExp(this.filterName, 'i')
      return this.products.filter((el) => el.name.match(filter))
    },
    sortedFilteredProducts() {
      return [...this.filteredProducts].sort((a, b) => {
        let modifier = 1
        if (this.sortDir === 'desc') modifier = -1
        if (a[this.sortName] < b[this.sortName]) return -1 * modifier
        if (a[this.sortName] > b[this.sortName]) return 1 * modifier
        return 0
      })
    },
    sortedFilteredPaginatedProducts() {
      const start = (this.pageNumber - 1) * this.pageSize
      const end = start + this.pageSize

      return this.sortedFilteredProducts.slice(start, end)
    },
    pageCount() {
      const l = this.filteredProducts.length
      const s = this.pageSize
      return Math.ceil(l / s)
    },
  },
  methods: {
    sort(s) {
      // if s == current sort, reverse order
      if (s === this.sortName) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
      }
      this.sortName = s
    },
    nextPage() {
      this.pageNumber++;
      throw new Error('test erreur');
    },
    prevPage() {
      this.pageNumber--
    },
  },
}
</script>

<style scoped>
.filters {
  padding: 10px;
}
.products {
  margin: 0;
  list-style-type: none;
  padding: 0;
}
.products li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #eee;
  margin: 0.5em;
  padding: 0.3em 0em;
  height: 1.8em;
  border-radius: 4px;
}
.products li:hover {
  color: #607d8b;
  background-color: yellow;
  left: 0.1em;
}
.products li:hover .name,
.products li:hover .price {
  color: #607d8b;
  background-color: #ffd800;
  left: 0.1em;
}
.products li.selected {
  background-color: #0094ff;
  color: white;
}
.products li.selected:hover {
  color: white;
}
.products li.selected .name,
.products li.selected .price {
  background-color: #0026ff;
  color: white;
}
.products .text {
  position: relative;
  top: -3px;
}
.products .name {
  display: inline-block;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: 0.8em;
  border-radius: 4px 0px 0px 4px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.products .price {
  float: right;
  width: 15%;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-left: 0.8em;
  border-radius: 0px 4px 4px 0px;
}
.products .description {
  height: 1.8em;
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.products .discontinued,
.products .discontinued * {
  color: red !important;
}
</style>