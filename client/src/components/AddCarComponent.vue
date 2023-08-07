<template>
  <div class="addcar-container">
    <div class="addcar-form">
      <!-- <router-link to="/cars">Atras</router-link> -->
      <span>
        <h1>Agregar auto</h1>
      </span>
      <div>
        <form class="form" @submit.prevent="addCar">
          <label for="marca">
            Marca:
          </label>
            <input type="text" id="marca" v-model="marca" placeholder="Agregar marca" />
          <label for="tipo">
            Tipo:
          </label>
            <select id="tipo-select" v-model="tipo">
              <option disabled value="">Seleccionar tipo de vehículo...</option>
              <option value="Sedan">Sedan</option>
              <option value="Camioneta">Camioneta</option>
              <option value="PickUp">PickUp</option>
              <option value="Microbus">Microbus</option>
              <!-- {{ tipo }} -->
            </select>
          <label for="color">
            Color:
          </label>
            <input type="text" id="color" v-model="color" placeholder="Agregar color">
          <label for="extras">
            Full Extras:
          </label>
            <input type="checkbox" id="extras" v-model="fullExtras">
          <label for="available">
            Disponible:
          </label>
            <input type="checkbox" id="available" v-model="available">
          <button type="submit" class='carbtn'>Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCar',
  data: () => ({
    marca: '',
    tipo: '',
    color: '',
    fullExtras: false,
    available: true
  }),

  methods: {
    addCar () {
      this.$http
        .post('/cars/newcar', {
          marca: this.marca,
          tipo: this.tipo,
          color: this.color,
          fullExtras: this.fullExtras,
          disponible: this.available
        })
        .then(response => {
          console.log('Success')
          this.$router.push('/addcar')
          alert('Se ha agregado correctamente')
        })
        .catch(error => {
          console.log(error)
          alert('Hubo un error al guardar la informacion!')
        })
    }
  }
}
</script>

<style>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border-radius: 4px;
  border-color: 1px solid #f2f2f2;
  cursor: pointer;
}

button[type=submit]:hover {
  background-color: #45a049;
  border-color: 1px solid #f2f2f2;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
.addcar-container {
  display: flex;
  justify-content: center;
  width: auto;
  margin:auto ;
  padding :20px  15%;
  background:#ffaa;
}
.addcar-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width:48rem;
  min-height:67vh;
  border: solid #ccc 3px;
}
.form {
  display: flex;
  padding: 20px;
  min-width: 40vw;
  min-height: 60vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  background-color: cadetblue;
}
</style>
