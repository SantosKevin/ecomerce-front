<template>
  <div class="cart-footer">
      <h4>Total: {{total}}</h4>

      <router-link to="/cart">
        <button @click="closeCart" class="ui button primary fluid btn-buy">Buy all</button>
      </router-link>
  </div>
</template>

<script>
import { computed, watchEffect , ref} from "vue";

export default {
    name: "CartFooter",
    props: {
        products: Array,
        closeCart: Function,
    },
    setup(props){
        let total = ref(0);

        watchEffect(()=>{
            props.products;

            let totalTemp = 0;
            props.products.forEach(p => {
                totalTemp += p.price * p.quantity;
            });
            total.value = totalTemp.toFixed(2);

        });

        return {
            total,
        }
    }
}
</script>

<style lang="scss" scoped>
.cart-footer{
    padding: 10px;
    color: white;
}

</style>