<template>
  <h3>Loaded succesfull</h3>
</template>

<script>
export default {
  name: "Chat",

  async setup() {
    function connect() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }
    await connect();
    return {};
  },
};
</script>

<style></style>
