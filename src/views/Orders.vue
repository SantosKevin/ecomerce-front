<template>
  <b-layout>
    <h2>Your Orders</h2>
    <h3 v-if="!orders">U havent any orders yet...</h3>
    <template v-if="orders">
      <div class="order" v-for="o in orders" :key="o.id">
        <div class="header">
          <span class="date">
            {{ formatDate(o.created_at) }}
          </span>
          <p>ID: {{ o.id }}</p>
          <p>Total: {{ o.totalPayment }} $</p>
        </div>

        <div class="products">
          <div class="prod" v-for="prod in o.products" :key="prod.id">
            <img
              :src="API_URL + prod.image.url"
              :alt="prod.name"
              class="ui image small"
            />
            <p>{{ prod.name }}</p>
            <div>{{ prod.quantity }} x {{ prod.price }}</div>
          </div>
        </div>
      </div>
    </template>
  </b-layout>
</template>

<script>
import BLayout from "../layouts/BasicLayout.vue";
import { ref, onMounted } from "vue";
import { getOrders } from "../api/order";
import { getTokenApi } from "../api/token";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { API_URL } from "../utils/constants";

export default {
  name: "Orders",
  components: {
    BLayout,
  },
  setup() {
    let orders = ref(null);

    onMounted(async () => {
      const token = getTokenApi();
      const { id } = jwtDecode(token);
      const response = await getOrders(id);

      console.log("response: ");
      console.log(response);
      orders.value = response;
    });

    const formatDate = (date) => {
      return moment(date).format("L [to the] LT");
    };
    return {
      orders,
      formatDate,
      API_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
.order {
  border: 1px solid #000;
  margin-bottom: 20px;
  margin-top: 40px;

  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    p {
      margin: 0;
    }
    span {
      position: absolute;
      top: -20px;
      left: 0;
      font-size: 12px;
    }
  }

  .products {
    border-top: 1px solid #000;

    .prod {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 30px;

      > div {
          display: flex;
          justify-content: left;
          align-items: center;
      }
    }
    .ui.image {
      width: 60px;
    }
  }
}
</style>
