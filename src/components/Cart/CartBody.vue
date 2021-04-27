<template>
  <div class="cart-body" v-if="products">
    <div class="product" v-for="p in products" :key="p.id">
      <img class="ui image fluid" :src="API_URL + p.image.url" :alt="p.name" />
      <div class="info">
        <p style="margin: 0 10px;">{{ p.name }}</p>
        <div class="price">
          <p>{{ p.price }}</p>

          <div class="quantity">
            <button @click="increaseProductCart(p.id)"
            class="ui button green">+</button>
            <p>{{ p.quantity }}</p>
            <button @click="decreaseProductCart(p.id)"
            class="ui button red">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../../utils/constants";
import { addProductCartApi, deleteProductCartApi } from '../../api/cart';

export default {
  name: "CartBody",
  props: {
    products: Object,
    reloadCartFn: Function,
  },
  setup(props) {
    const increaseProductCart = (idP) => {
        addProductCartApi(idP);
        props.reloadCartFn();
    };

    const decreaseProductCart =(idP)=>{
        deleteProductCartApi(idP)
        props.reloadCartFn();
    };

    return {
      API_URL,
      increaseProductCart, decreaseProductCart
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-body {
  padding: 20px 10px;
  overflow-y: scroll;
  height: calc(100vh - 40px - 90px);

  .product {
    display: flex;
    color: white;
    margin: 20px 0;

    .ui.image.fluid {
      width: 120px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      .price {
        display: flex;
        justify-content: space-between;
        p {
          margin: 0 10px;
        }
      }

      .quantity {
        display: flex;
        align-items: center;

        p {
          margin: 0 10px;
        }
        button {
          padding: 4px 10px;
        }
      }
    }
  }
}
</style>
