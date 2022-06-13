<template>
  <div>
    <HeaderView />
    <div class="container px-4">
      <form v-on:submit.prevent="editar()" class="form-horizontal mt-5 px-4">
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
            <option value="grano">Grano</option>
            <option value="insumo">Insumo</option>
          </select>
        </div>
        <div class="form-group mt-3">
          <label for="" class="form-label">Precio</label>
          <input
            type="number"
            step="0.01"
            min="0"
            class="form-control"
            placeholder="Precio"
            v-model="form.price"
          />
        </div>
        <div class="form-group mt-3">
          <label for="" class="form-label">Stock</label>
          <input
            type="number"
            step="1"
            min="0"
            class="form-control"
            placeholder="Stock"
            v-model="form.stock"
          />
        </div>
        <div class="form-group mt-3">
          <label for="" class="form-label">Min</label>
          <input
            type="number"
            step="1"
            min="0"
            class="form-control"
            placeholder="Min"
            v-model="form.min"
          />
        </div>
        <div class="form-group mt-3">
          <label for="" class="form-label">Max</label>
          <input
            type="number"
            class="form-control"
            placeholder="Max"
            step="1"
            min="0"
            v-model="form.max"
          />
        </div>
        <button type="submit" class="btn btn-dark mt-3 px-4">Actualizar producto</button>
        <button class="btn btn-dark mt-3 mx-2 px-4" v-on:click="back()">Regresar</button>
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
  name: "EditView",
  data() {
    return {
      id: "",
      form: {
        max: "",
        min: "",
        name: "",
        price: "",
        stock: "",
        type: "",
      },
    };
  },
  components: {
    HeaderView,
    FooterView,
  },
  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(
        "https://backend-control-inv.herokuapp.com/api/products/id/" + this.id,
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
          this.form.max = data.data.max;
          this.form.min = data.data.min;
          this.form.stock = data.data.stock;
          this.form.price = data.data.price;
          this.form.name = data.data.name;
          this.form.type = data.data.type;
        }
      });
  },
  methods:{
    editar(){
        axios.put("https://backend-control-inv.herokuapp.com/api/products/"+this.id,this.form,
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
          this.form.max = data.data.max;
          this.form.min = data.data.min;
          this.form.stock = data.data.stock;
          this.form.price = data.data.price;
          this.form.name = data.data.name;
          this.form.type = data.data.type;
          alert("¡Producto actualizado!")
        }
      });

    },
    back(){
        this.$router.push('/dashboard')
    }
  }
};
</script>

<style scoped>
.form-group {
  text-align: left;
}
</style>
