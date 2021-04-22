<template>
  <BLayout>
      <h2>category</h2>
  </BLayout>
</template>

<script>
import BLayout from "../layouts/BasicLayout.vue";
import { ref , onMounted} from "vue";
import * as Yup from "yup";
import { loginApi } from '../api/user.js'
import { useRouter } from 'vue-router';
import { setTokenApi, getTokenApi } from '../api/token.js';

export default {
    name: "Category",
    components: {
        BLayout
    },
    watch:{
        $route(to, from){
            console.log(to);
        }
    },
    setup(){
        return {

        }
    }
}
</script>

<style>

</style>