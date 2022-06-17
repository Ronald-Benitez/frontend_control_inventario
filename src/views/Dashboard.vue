<template>
  <div class="main">
    <HeaderView />
    <div class="container mt-4">
      <div class="btn-group btn-group-lg m-2" role="group" aria-label="...">
        <button class="btb btn-dark my-2" v-on:click="menor()">
          Stock menor o igual Min
        </button>
        <button class="btb btn-dark my-2" v-on:click="general()">
          Vista general
        </button>
        <button class="btb btn-dark my-2" v-on:click="mayor()">
          Stock mayor o igual Max
        </button>
      </div>
      <table class="table table-dark table-responsive overflow-scroll">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col" class="hide">Tipo</th>
            <th scope="col">Stock</th>
            <th scope="col" class="hide">Precio</th>
            <th scope="col" class="hide">Min</th>
            <th scope="col" class="hide">Max</th>
            <th scope="col">-/+</th>
            <th scope="col" v-if="tipo">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in list" :key="product.id">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td class="hide">{{ product.type }}</td>
            <td>{{ product.stock }}</td>
            <td class="hide">${{ product.price }}</td>
            <td class="hide">{{ product.min }}</td>
            <td class="hide">{{ product.max }}</td>
            <td>
              <button
                class="btn btn-dark text-info"
                v-on:click="disminuir(product.id)"
              >
                -
              </button>
              <button
                class="btn btn-dark text-info"
                v-on:click="aumentar(product.id)"
              >
                +
              </button>
            </td>
            <td v-if="tipo">
              <button
                class="btn btn-dark text-warning"
                v-on:click="edit(product.id)"
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
                v-on:click="delet(product.id)"
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
    let url = "https://backend-control-inv.herokuapp.com/api/products";
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
          if (localStorage.type == "admin") {
            this.tipo = true;
          }
        }
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/edit/" + id);
    },
    delet(id) {
      if (confirm("¿Seguro que deseas eliminar?")) {
        axios
          .delete(
            "https://backend-control-inv.herokuapp.com/api/products/" + id,
            {
              headers: {
                "user-token": localStorage.token,
              },
            }
          )
          .then((data) => {
            if (data.data.message) {
              alert("¡Error! " + data.data.message);
            } else {
              alert("Producto eliminado con éxito");
              this.list = data.data;
            }
          });
      }
    },
    aumentar(id) {
      const value = prompt("Ingrese el número a aumentar");
      const value2 = parseInt(value);
      if (value2 != "" && value2 > 0) {
        try {
          axios
            .put(
              "https://backend-control-inv.herokuapp.com/api/products/increase/" +
                id +
                "&" +
                value2,
              {},
              {
                headers: {
                  "user-token": localStorage.token,
                },
              }
            )
            .then((data) => {
              if (data.data.message) {
                alert("¡Error! " + data.data.message);
              } else if (data.data.error) {
                alert("¡Error! " + data.data.error);
              } else {
                alert("Stock aumentado con éxito");
                this.list = data.data;
                console.log(data.data);
              }
            });
        } catch (err) {
          alert("Debe ingresar un número");
        }
      } else {
        alert("Debe ingresar un valor");
      }
    },
    disminuir(id) {
      const value = prompt("Ingrese el número a aumentar");
      const value2 = parseInt(value);
      if (value2 != "" && value2 > 0) {
        try {
          axios
            .put(
              "https://backend-control-inv.herokuapp.com/api/products/decrease/" +
                id +
                "&" +
                value2,
              {},
              {
                headers: {
                  "user-token": localStorage.token,
                },
              }
            )
            .then((data) => {
              if (data.data.message) {
                alert("¡Error! " + data.data.message);
              } else if (data.data.error) {
                alert("¡Error! " + data.data.error);
              } else {
                alert("Stock disminuido con éxito");
                this.list = data.data;
              }
            });
        } catch (err) {
          alert("Debe ingresar un número");
        }
      } else {
        alert("Debe ingresar un valor");
      }
    },
    menor() {
      this.$router.push("/menor");
    },
    mayor() {
      this.$router.push("/mayor");
    },
    general() {
      this.$router.push("/dashboard");
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
