<template>
  <BLayout>
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
</template>

<script>
import BLayout from "../layouts/BasicLayout.vue";
import { ref , onMounted} from "vue";
import { getPorductsCategory, getProductsApi } from '../api/product';
import {useRoute} from'vue-router';
import Product from '../components/Product';


export default {
    name: "Category",
    components: {
        BLayout, Product
    },
    watch:{
        $route(to, from){
            this.getProducts(to.params.category);
        }
    },

    setup(){
        let products = ref(null);

        const { params } = useRoute();

        onMounted( async ()=>{
            getProducts(params.category);
        });

        const getProducts = async (cat)=>{
            const response = await getPorductsCategory(cat);
            products.value = response;
        };


        return {
            getProducts,
            products,
        }
    }
}
</script>

<style></style>
