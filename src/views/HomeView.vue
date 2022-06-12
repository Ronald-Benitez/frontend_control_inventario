<template>
  <div class="home">
    <HelloWorld msg="Bienvenido a tu aplicación de inventario" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  
};
</script>
