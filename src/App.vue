<template>
<!--this doesnt work like that-->
  <Suspense>
    <template #default>
       <router-view />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
 
</template>

<script>
import Loader from "../src/components/Loader.vue";
import { defineAsyncComponent } from "vue";
export default {
   components: {
    Loader,
    Category: defineAsyncComponent(() => import("../src/views/Category.vue")),
  },
};
</script>
<style lang="scss"></style>
