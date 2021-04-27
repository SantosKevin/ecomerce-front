<template>
  <BLayout style="overflow-x: hidden;">
    <img class="wave" src="../assets/wave.png" />
    <div class="container">
      <div class="img">
        <img src="../assets/bg.svg" />
      </div>
      <div class="login-content">
        <form class="ui form" @submit.prevent="login">
          <img src="../assets/profile.png">
				  <h2 class="title">Welcome</h2>
          <div class="field">
            <label>Username</label>
            <input
              type="text"
              v-model="formData.identifier"
              :class="{ error: formError.identifier }"
              name="username"
              placeholder="Your username"
            />
          </div>
          <div class="field">
            <label>Password</label>
            <input
              type="password"
              :class="{ error: formError.password }"
              v-model="formData.password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            :class="{ loading }"
            class="btn"
          >
            Sign in
          </button>

          <router-link to="/register">Create new user</router-link>
        </form>
      </div>
    </div>
    
  </BLayout>
</template>

<script>
import BLayout from "../layouts/BasicLayout.vue";
import { ref, onMounted } from "vue";
import * as Yup from "yup";
import { loginApi } from "../api/user.js";
import { useRouter } from "vue-router";
import { setTokenApi, getTokenApi } from "../api/token.js";

export default {
  name: "Login",
  components: {
    BLayout,
  },

  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (token) router.push("/");
    });

    const schemaForm = Yup.object().shape({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });

    const login = async () => {
      formError.value = {};
      loading.value = true;
      try {
        await schemaForm.validate(formData.value, { abortEarly: false });
        try {
          const response = await loginApi(formData.value);
          if (!response?.jwt) throw "user or password arent valid";

          console.log("login ok");
          setTokenApi(response.jwt);
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }

      loading.value = false;
    };

    return {
      formData,
      formError,
      loading,
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

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



.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}


.img img {
  width: 450px;
}

.login-content img {
  height: 100px;
}


.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #243b55, #222c38, #4c6a8b);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  form {
    width: 290px;
  }

  .login-content h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}
</style>
