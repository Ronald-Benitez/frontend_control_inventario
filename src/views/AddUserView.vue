<template>
  <div class="main">
    <HeaderView />
    <div class="container px-4">
      <form v-on:submit.prevent="addPro()" class="form-horizontal mt-5 px-4">
        <div class="form-group mt-2">
          <label for="" class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            placeholder="Nombre"
            v-model="form.name"
          />
        </div>
        <div class="form-group mt-3">
          <label for="" class="form-label">Tipo</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="form.type"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div class="form-group mt-3">
          <label for="" class="form-label">Contraseña</label>
          <input
            type="password"
            class="form-control"
            placeholder="Contraseña"
            v-model="form.password"
          />
        </div>

        <button type="submit" class="btn btn-dark mt-3 px-4">
          Registrar Usuario
        </button>
        <button class="btn btn-dark mt-3 mx-2 px-4" v-on:click="back()">
          Regresar
        </button>
      </form>
    </div>

    <FooterView />
  </div>
</template>

<script>
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import axios from "axios";
export default {
  name: "AddView",
  data() {
    return {
      form: {
        name: "",
        type: "",
        password: "",
      },
    };
  },
  components: {
    HeaderView,
    FooterView,
  },
  methods: {
    back() {
      this.$router.push("/usuarios");
    },
    addPro() {
      axios
        .post(
          "https://backend-control-inv.herokuapp.com/api/users/register",
          this.form,
          {
            headers: {
              "user-token": localStorage.token,
            },
          }
        )
        .then((data) => {
          if (data.data.error) {
            alert("¡Error! " + data.data.error);
          } else {
            this.form.name = "";
            this.form.type = "";
            this.form.password = "";
            alert("¡Usuario registrado!");
          }
        });
    },
  },
};
</script>

<style scoped>
.form-group {
  text-align: left;
}
.main {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>
