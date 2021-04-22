<template>
  <div class="home">
    <BLayout>
      <h1>Latest Products</h1>

      <div class="ui grid">
        <div v-for="p in products" :key="p.id"
        class="sixteen wide mobile eight wide tablet four wide computer column">
          <Product :product="p"/>

        </div>
      </div>
    </BLayout>
  </div>
</template>

<script>
import { defineComponent, ref , onMounted} from 'vue';
import BLayout from '../layouts/BasicLayout.vue';
import { getProductsApi } from '../api/product.js';
import Product from '../components/Product.vue';

export default {
  name: 'Home',
  components: {
    BLayout,
    Product
  },

  setup(){
    let products = ref(null);

    onMounted(async()=>{
      const result = await getProductsApi(3);
      console.log(result);
      products.value = result;
    });

    return {
      products
    }
  }

};
</script>
