<template>
  <div>
    <div class="ui card">
      <div class="ui slide masked reveal image">
        <img :src="API_URL + product.image.url" :alt="product.name" class="visible content" />
        <img :src="API_URL + product.image.url" :alt="product.name" class="hidden content" />
      </div>
      <div class="content">
        <h4 class="header"> {{product.name}} </h4>
        <div class="meta">
          <span class="date"> {{product.created_at}} </span>
        </div>
      </div>
      <div class="extra content">
          <i class="users icon"></i>
            {{ product.price }}
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../utils/constants';

export default {
  name: "Product",
  props: {
    product: Object,
  },
  setup(props) {
      return {
          API_URL
      }
  },
};
</script>

<style></style>
