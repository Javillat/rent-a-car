<template>
    <div>
        <h2>Lista de autos disponibles</h2>
        <ul>
            <li v-for="car in cars" :key="car.id">
               {{ car.id }} - {{ car.marca }} - {{ car.tipo }} ( Año {{ car.año }} )
                <button @click="rentCar(car.id)">Alquilar</button>
            </li>
        </ul>
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
