<template>
  <div>
    <div><h1>Agregar auto</h1></div>
    <form @submit.prevent="addCar">
    <label for="marca">
      Marca:
      <input type="text" id="marca" v-model="marca" placeholder="Agregar marca"/>
    </label>
    <label for="tipo">
      Tipo:
      <select id="tipo" v-model="tipo">
        <option value="">Seleccionar tipo de vehículo...</option>
        <option :value="Sedan">Sedan</option>
        <option :value="Camioneta">Camioneta</option>
        <option :value="PickUp">PickUp</option>
        <option :value="Microbus">Microbus</option>
      </select>
    </label>
      <label for="color">
        Color:
        <input type="text" id="color" v-model="color" placeholder="Agregar color">
      </label>
      <label for="extras">
        Full Extras:
        <input type="checkbox" id="extras" v-model="fullExtras">
      </label>
      <label for="available">
        Disponible:
        <input type="checkbox" id="available" v-model="available">
      </label>
      <button type="submit" class='carbtn'>Guardar</button>
    </form>
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

</style>
