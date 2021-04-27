<template>
  <div class="card2">
    <div class="ui card ">
      <div class="ui slide masked reveal image">
        <img
          :src="API_URL + product.image.url"
          :alt="product.name"
          class="visible content"
        />
        <img
          :src="API_URL + product.image.url"
          :alt="product.name"
          class="hidden content"
        />
      </div>
      <div class="content">
        <h4 class="header">{{ product.name }}</h4>
        <div class="meta">
          <span class="date"> {{ product.created_at }} </span>
        </div>
      </div>
      <div class="extra content">
        <i class="dollar sign icon"></i>
        {{ product.price }}
      </div>
      <div class="ui animated fade button green" tabindex="0" @click="addProductCart(product.id)">
        <div class="visible content">Buy now</div>
        <div class="hidden content">
          <i class="cart arrow down icon"></i>
        </div>
      </div>
      <div class="ui animated fade button green" tabindex="0" @click="handleAdd()">
        <div class="visible content">Track this</div>
        <div class="hidden content">
          <i class="cart arrow down icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../utils/constants";
import {addProductCartApi } from '../api/cart';
import { useTracking } from "../hooks/tracking";

export default {
  name: "Product",
  props: {
    product: Object,
  },
  setup(props) {
    const { trackEvent } = useTracking("product-view");
    let color = "red";

    const addProductCart = (idP) =>{
      console.log("ererer")
      addProductCartApi(idP);
    };

    function handleAdd() {
      trackEvent("product-add");
    }

    return {
      API_URL,
      addProductCart,
      handleAdd,
      color
    };
  },
};
</script>

<style lang="scss" scoped>
  .card2{
    //padding: 20px;
    //background: var(--color)
       
  }
</style>
