<template>
  <div class="main">
    <HeaderView />
    <div class="container mt-4">
      <div class="container">
        <button class="btn btn-dark mb-2" v-on:click="newUsuer()">
          Agregar usuario
        </button>
      </div>
      <table class="table table-dark table-responsive overflow-scroll">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col" class="hide">Tipo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in list" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td class="hide">{{ user.type }}</td>
            <td>
              <button
                class="btn btn-dark text-success"
                v-on:click="cambiarContraseña(user.id, user.name, user.type)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-key"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
                  />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </button>
              <button
                class="btn btn-dark text-warning"
                v-on:click="edit(user.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                  />
                </svg>
              </button>
              <button
                class="btn btn-dark text-danger"
                v-on:click="delet(user.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FooterView />
  </div>
</template>

<script>
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import axios from "axios";
export default {
  name: "DashboardView",
  data() {
    return {
      list: null,
      tipo: false,
    };
  },
  components: {
    HeaderView,
    FooterView,
  },
  mounted: function () {
    if (localStorage.type == "admin") {
      let url = "https://backend-control-inv.herokuapp.com/api/users";
      axios
        .get(url, {
          headers: {
            "user-token": localStorage.token,
          },
        })
        .then((data) => {
          if (data.data.error) {
            alert("¡Error! " + data.data.error);
          } else {
            this.list = data.data;
          }
        });
    } else {
      alert("¡Error! No tienes permisos para acceder a esta página");
      this.$router.push("/");
    }
  },
  methods: {
    delet(id) {
      if (localStorage.type && localStorage.type == "admin") {
        if (confirm("¿Seguro que deseas eliminar?")) {
          axios
            .delete(
              "https://backend-control-inv.herokuapp.com/api/users/" + id,
              {
                headers: {
                  "user-token": localStorage.token,
                },
              }
            )
            .then((data) => {
              if (data.data.errors) {
                alert("¡Error! " + data.data.message);
              } else {
                alert("Producto eliminado con éxito");
                this.list = data.data;
              }
            });
        }
      } else {
        alert("¡Error! No tienes permisos para acceder a esta página");
        this.$router.push("/");
      }
    },
    cambiarContraseña(id, name, type) {
      if (localStorage.type && localStorage.type == "admin") {
        const pass = prompt("Ingresa la nueva contraseña");
        if (pass != "") {
          axios
            .put("https://backend-control-inv.herokuapp.com/api/users/" + id, {
              password: pass,
              name: name,
              type: type,
            })
            .then((data) => {
              if (data.data.errors) {
                alert("¡Error! " + data.data.errors);
              } else {
                alert("Contraseña cambiada con éxito");
                this.list = data.data;
              }
            });
        }
      } else {
        alert("¡Error! No tienes permisos para acceder a esta página");
        this.$router.push("/");
      }
    },
    newUsuer() {
      if (localStorage.type && localStorage.type == "admin") {
        this.$router.push("/adduser");
      } else {
        alert("¡Error! No tienes permisos para acceder a esta página");
        this.$router.push("/");
      }
    },
    edit(id) {
      if (localStorage.type && localStorage.type == "admin") {
        this.$router.push("/edituser/" + id);
      } else {
        alert("¡Error! No tienes permisos para acceder a esta página");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .hide {
    display: none;
  }
}
.main {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>
