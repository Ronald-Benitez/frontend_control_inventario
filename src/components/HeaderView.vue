<template>
  <div class="header">
    <nav class="navbar navbar-dark bg-dark justify-content-between">
      <a class="navbar-brand"
      v-on:click="home()"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-truck"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
          /></svg
      ></a>
      <div
        class="btn btn-dark d-flex align-items-cente"
        v-on:click="newProduct()"
      >
        <p class="text-light align-self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <small>Agregar producto</small>
        </p>
      </div>
      <form class="d-flex flex-row" v-on:submit.prevent="buscar()">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="busqueda"
        />
        <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderView",
  data(){
    return{
      busqueda:""
    }
  },
  methods: {
    newProduct() {
      this.$router.push("/add");
    },
    home(){
      this.$router.push("/dashboard");
    },
    buscar(){
      this.$router.push("/busqueda/" + this.busqueda);
    }
  },
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .form-control {
    height: 40px;
    width: 125px;
    align-self: center;
    margin-right: 6px;
  }
  small{
    display:none
  }
}
.header{
  position:fixed;
  top: 0;
  width:100%;
}
</style>
