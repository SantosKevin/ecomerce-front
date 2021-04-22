<template>
  <div class="cart-header">
      <p>Your Cart</p>
      <i class="window close icon" @click="closeCart"></i>
  </div>
</template>

<script>
export default {
    name: "CardHeader",
    props:{
        closeCart: Function
    }
}
</script>

<style lang="scss" scoped>
    .cart-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        color: white;
        border-bottom: 1px solid white;
        padding: 10px 20px;

        p, i{
            margin: 0;
            transition: font-size 0.5s ease;
        }

        i:hover{
            cursor: pointer;
            font-size: 21px;
        }
    }
</style>