<template>
  <div class="target-container">
    <div><h1>Lista de autos disponibles</h1></div>
    <div>
      <ul>
        <li v-for="car in cars" :key="car.id">
          <div class="car-target">
            <p>{{ car.id }}</p>
            <h2>{{ car.marca }}</h2>
            <h3>{{ car.tipo }}</h3>
            <h3>( Año {{ car.año }} )</h3>
            <button @click="fetchCarDertails(car.id)">Ver auto</button>
            <button @click="rentCar(car.id)">Alquilar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cars',
  data: () => ({
    // Lista con los datos del auto.
    cars: []
  }),
  methods: {
    fetchCarDertails (carId) {
      const idToken = localStorage.getItem('token')

      this.$http
        .get(`/cars/getcar/${carId}`, {
          headers: {'Authorization': `Bearer ${idToken}`}
        })
        .then((response) => {
          alert('Mostrando detalle de auto!')
          this.$router.push('/car/detail')
        })
        .catch((error) => {
          console.log(error)
          alert('Ha ocurrido un error al obtener el auto')
        })
    },
    rentCar (carId) { // Función para alquilar el vehículo seleccionado.
      // Obtener el iDToken almacenado para incluirlo en la solicitud
      console.log('CarId ', carId)
      const idToken = localStorage.getItem('token')
      console.log(idToken)

      this.$http
        .post(`/rental/${carId}`, null, {
          headers: { Authorization: `Bearer ${idToken}` }
        })
        .then(() => {
          alert(`Auto #${carId}, reservado exitósamente!`)
          this.fetchCars()
        })
        .catch(error => {
          console.error(error)
          alert('Error al alquilar el auto')
        })
    },
    fetchCars () {
      const idToken = localStorage.getItem('token')
      // const uid = localStorage.getItem('uid')
      console.log('Token storage ', idToken)
      this.$http
        .get('/cars/getcars', {
          headers: { Authorization: `Bearer ${idToken}` }

        })
        .then(response => {
          this.cars = response.data
        })
        .catch((error) => {
          console.error(error)
          alert('Error al obtener la lista de autos disponibles.')
        })
    }
  },
  mounted () {
    this.fetchCars()
  }
}
</script>

<style>
ul {
    list-style: none;
}
.target-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:20px;
  padding:15px;
  background:#f9f9f9;
  border-radius:.3rem;
  box-shadow: rgba(68, 74, 81,.1),
  rgb(0 0 0 / 2%) 0px -2px 4
}
.car-target{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
