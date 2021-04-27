<template>
  <div>
    <div class="dimmer" :class="{ open: showCart }"  @click="closeCart"/>
    <div class="cart" :class="{ open: showCart }">
      <CartHeader :closeCart="closeCart"/>
      <CartBody :products="products" :reloadCartFn="reloadCartFn"/>
      <cart-footer  v-if="products" :products="products" @click="closeCart"/>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect , ref} from "vue";
import { useStore } from "vuex";
import CartHeader from '../Cart/CartHeader.vue';
import {getProductsCartApi} from '../../api/cart';
import CartBody from '../Cart/CartBody.vue';
import CartFooter from '../Cart/CartFooter.vue';

export default {
  name: "Cart",
  components:{
      CartHeader, CartBody, CartFooter
  },
  setup() {
    const store = useStore();
    const showCart = computed(() => store.state.showCart);
    let products = ref(null);
    let reloadCart = ref(false);

    const reloadCartFn = ()=>{ reloadCart.value = !reloadCart.value};
    const closeCart = () => {
      store.commit("setShowCart", false);
    };

    const getProductsCart = async ()=>{
      const response = await getProductsCartApi();
      products.value = response;
      console.log(products.value);
    };

    watchEffect(()=>{
      showCart.value;
      reloadCart.value;
      getProductsCart();
    });

    return {
      showCart,
      closeCart,
      products, reloadCartFn
    };
  },
};
</script>

<style lang="scss" scoped>
.dimmer{
    opacity: 0;
    transition: opacity 0.8s ease;
      z-index: 9;

    &.open{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.7;

    }
}
.cart {
  position: fixed;
  top: 0;
  z-index: 9;
  right: 0;
  width: 400px;
  height: 100vh;
  display: flex;
  
  flex-direction: column;
  box-shadow: 0px 0px 26px 5px rgba(0, 0, 0, 0.75);
  transform: translateX(150%);
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  transition: transform 0.8s ease;

  &.open {
    transform: translateX(0);
  }
}
</style>
