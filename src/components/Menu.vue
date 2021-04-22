<template>
  <div class="ui secondary menu">
      <div class="ui container">
          <div class="left menu">
              <router-link to="/" class="item">
                <img src="../assets/logo.png" alt="the logo"
                class="ui smaill image">
                 
                <div v-for="cat in categories" :key="cat.id">
                    <router-link class="item" :to="cat.slug">
                        {{ cat.Title }}
                    </router-link>
                </div>

              </router-link>
               
          </div>

          <div class="right menu" >
              <router-link to="/login" v-if="!token"  class="item">
                Login
              </router-link>
              <template v-if="token">
                <router-link to="/orders"  class="item">
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
import {getTokenApi, deleteTokenApi} from '../api/token.js';
import { useRouter } from 'vue-router';
import {ref, onMounted } from 'vue';
import {getCategoriesApi} from '../api/category';
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
    name: "Menu",
    
    setup(){
        const token = getTokenApi();
        let categories = ref(null);
        const store = useStore();

 
        onMounted( async ()=>{
            const response = await getCategoriesApi();
            categories.value = response;
        });
        const openCart = ()=>{
            store.commit("setShowCart",true);
        };

        const logout = ()=>{
            deleteTokenApi();
            location.replace("/");
        };

        return{
            token, logout, categories, openCart
        }
    }
}
</script>

<style lang="scss" scoped>
    .ui.menu.secondary{
        background: #16202b;

        .item{
            color:#fff;
            &:hover{
                color: #1fa1f1;
            }
        }

        .menu.left{
            width: 50%;
            .ui.image{
                width: 40px;
            }
        }

        .menu.right{
            width: 50%;
            justify-content: flex-end;

            .logout, .cart{
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
</style>