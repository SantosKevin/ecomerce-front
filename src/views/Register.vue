<template>
  <BLayout>
    <h1>register</h1>
    <div class="register">
      <form class="ui form" @submit.prevent="register">
        <div class="field">
          <label>Username name</label>
          <input
            type="text"
            v-model="formData.username"
            :class="{ error: formError.username }"
            name="username"
            placeholder="First Name"
          />
        </div>
        <div class="field">
          <label>Email</label>
          <input
            type="email"
            v-model="formData.email"
            :class="{ error: formError.email }"
            name="email-name"
            placeholder="email@gmail.com"
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input
            type="password"
            v-model="formData.password"
            :class="{ error: formError.password }"
            name="pass-name"
            placeholder="password"
          />
        </div>
        <div class="field">
          <label>Repeat Password</label>
          <input type="password" name="last-name" placeholder="Last Name" />
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" class="hidden" />
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>

        <button type="submit" 
          :class="{loading}"
          class="ui button fluid positive">
          Create
        </button>
      </form>
    </div>
    <router-link to="/login">Login</router-link>
  </BLayout>
</template>

<script>
import BLayout from "../layouts/BasicLayout.vue";
import { ref, onMounted } from "vue";
import * as Yup from "yup";
import { registerApi } from '../api/user.js'
import { useRouter } from 'vue-router';
import { getTokenApi } from '../api/token.js';


export default {
  name: "Register",
  components: {
    BLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();


    onMounted(() =>{
      if(token) router.push("/");
    });

    const schemaForm = Yup.object().shape({
      username: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    });

    const register = async () => {
      loading.value = true;
      console.log(formData.value);

      try {
        await schemaForm.validate(formData.value, { abortEarly: false });
        try{
          const response = await registerApi(formData.value);
          console.log(response);
          router.push("/login");
          
        }catch(error){
          console.log(error);
        }
      } catch (error) {
        error.inner.forEach((e) => {
          formError.value[e.path] = e.message;
        });
      }
      loading.value = false;
    };

    return {
      formData,
      register,
      formError,
      loading
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

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
