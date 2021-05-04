<template>
  <div class="home">
    <BLayout>
      <h1>Latest Products</h1>

      <div class="ui grid">
        <div
          v-for="p in products"
          :key="p.id"
          class="sixteen wide mobile eight wide tablet four wide computer column"
        >
          <Product :product="p" />
        </div>
      </div>
    </BLayout>

    <hr />

    <Suspense>
      <template #default>
        <Chat />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { defineComponent, ref, onMounted } from "vue";
import BLayout from "../layouts/BasicLayout.vue";
import { getProductsApi } from "../api/product.js";
import Product from "../components/Product.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Home",
  components: {
    BLayout,
    Product,
    Loader,
    Chat: defineAsyncComponent(() => import("../components/Chat.vue" /* webpackChunkName: "chatttt" */)),
  },

  setup() {
    let products = ref(null);

    onMounted(async () => {
      const result = await getProductsApi(3);
      products.value = result;

      console.log(process.env.API);
    });

    return {
      products,
    };
  },
};
</script>
