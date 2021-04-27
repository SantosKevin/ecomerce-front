<template>
  <div class="ui secondary menu">
    <div class="ui container">
      <div class="left menu">
        <router-link to="/" class="item">
          <img
            src="../assets/profile.png"
            alt="the logo"
            class="ui smaill image"
          />
          <b> E-COMERCE JUJUY </b>
          <div v-for="cat in categories" :key="cat.id">
            <router-link class="item" :to="cat.slug">
              {{ cat.Title }}
            </router-link>
          </div>
        </router-link>
      </div>

      <div class="right menu">
        <router-link to="/login" v-if="!token" class="ui animated button primary item ">
          <div class="visible content ">Login</div>
          <div class="hidden content ">
            <i class="user icon"></i>
          </div>
        </router-link>

        <template v-if="token">
          <router-link to="/orders" class="item">
            Orders
          </router-link>
          <span class="ui item cart" @click="openCart">
            <i class="shopping cart icon"></i>
          </span>
          <span @click="logout" class="ui item logout">
            <i class="sign-out icon"></i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getTokenApi, deleteTokenApi } from "../api/token.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getCategoriesApi } from "../api/category";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Menu",

  setup() {
    const token = getTokenApi();
    let categories = ref(null);
    const store = useStore();

    onMounted(async () => {
      const response = await getCategoriesApi();
      categories.value = response;
    });
    const openCart = () => {
      store.commit("setShowCart", true);
    };

    const logout = () => {
      deleteTokenApi();
      location.replace("/");
    };

    return {
      token,
      logout,
      categories,
      openCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.menu.secondary {
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .item {
    color: #fff;
    &:hover {
      color: #1fa1f1;
    }
  }

  .item2{
    background: rgb(103, 145, 236);
  }

  .menu.left {
    width: 50%;
    .ui.image {
      width: 40px;
      margin-right: 5px;
    }
  }

  .menu.right {
    width: 50%;
    justify-content: flex-end;

    .logout,
    .cart {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
