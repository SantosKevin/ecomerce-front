<template>
  <BLayout>
    <h2>login</h2>

    <div class="login">
    
      <form class="ui form" @submit.prevent="login"> 
        <div class="field">
          <label>Username</label>
          <input type="text" 
          v-model="formData.identifier"
          :class="{error: formError.identifier}"
          name="username" placeholder="Your username" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" 
          :class="{error: formError.password}"
          v-model="formData.password"
          name="password" placeholder="Password" />
        </div>

        <button type="submit" 
        :class="{loading}"
        class="ui button fluid positive">
          Sign in
        </button>
      </form>
    </div>

    <router-link to="/register">Create new user</router-link>
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
  name: "Login",
  components: {
    BLayout,
  },

  setup(){
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() =>{
      if(token) router.push("/");
    });

    const schemaForm = Yup.object().shape({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });

    const login = async ()=>{
      formError.value = {};
      loading.value = true;
      try {
        await schemaForm.validate(formData.value, {abortEarly: false});
        try {
          const response = await loginApi(formData.value);
          if(!response?.jwt) throw "user or password arent valid";

          console.log("login ok");
          setTokenApi(response.jwt);
          router.push("/");

        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        error.inner.forEach(err => {
          formError.value[err.path] = err.message;
        });
      }

      loading.value = false;
    };

    return {
      formData, formError, loading, login
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  form {
    padding: 30px;
    width: 400px;
    border-radius: 15px;
    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }

    .field label {
      text-align: left;
    }
  }

  p {
    text-align: center;
    margin-top: 20px;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
</style>
