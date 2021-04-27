<template>
  <b-layout>
    <h2>your purchase summary</h2>
    <table class="ui striped table">
      <thead>
        <tr>
          <th>Product name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.quantity }}</td>
          <td>{{ p.price }}</td>
          <td style="text-align: center;" ><i class="delete icon" @click="deleteAllProductCart(p.id)"></i></td>
        </tr>
        <tr>
            <td></td>
            <td>Total: </td>
            <td colspan="2"> {{ total }} $</td>
        </tr>

      </tbody>

      
    </table>
    <button @click="createOrder" class="ui button primary fluid" v-if="products">Generate order</button>

  </b-layout>
</template>

<script>
import BLayout from "../layouts/BasicLayout.vue";
import { ref, onMounted, watchEffect } from "vue";
import { getProductsCartApi , deleteAllProductCartApi} from "../api/cart";
import {createOrderApi} from '../api/order';
import {getTokenApi} from '../api/token';
import jwtDecode from 'jwt-decode';
import {deleteCartApi} from '../api/cart';
import {useRouter} from 'vue-router';

export default {
  name: "Cart",
  components: {
    BLayout,
  },
  setup() {
    const router = useRouter();
    let products = ref(null);
    let total = ref(0);
    let reloadCart = ref(false);

    watchEffect(async () => {
      const response = await getProductsCartApi();
      products.value = response;
      reloadCart.value;
      getTotal();
    });
    
    const getTotal = ()=>{
        
        let totalTemp = 0;
        products.value.forEach(p => {
            totalTemp += p.price * p.quantity;
        });

        total.value = totalTemp.toFixed(2);
    };

    const createOrder= async() =>{
      const token = getTokenApi();
      const {id} = jwtDecode(token);

      const data = {
        totalPayment: total.value,
        products: products.value,
        user: id,
      };

      try {
        const response = await createOrderApi(data);
        console.log("order created");
        deleteCartApi();
        router.push("/orders");
      } catch (error) {
        console.log(error);
      }
    }

    const deleteAllProductCart = (idP)=>{
      deleteAllProductCartApi(idP);
      reloadCart.value = !reloadCart.value
    }

    return {
      products, getTotal, 
      createOrder, total, deleteAllProductCart
    };
  },
};
</script>

<style></style>
