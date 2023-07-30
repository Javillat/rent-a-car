<template>
    <div>
        <h2>Lista de autos disponibles</h2>
        <ul>
            <li v-for="car in cars" :key="car.carId">
                {{ car.marca }} {{ car.modelo }} ( Año {{ car.anyo }} ) (Precio por día {{ car.precio }})
                <button @click="rentCar(car.Id)">Alquilar</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Autos',
  data: () => ({
    // Lista con los datos del auto.
    cars: []
  }),
  methods: {
    rentCar (carId) { // Función para alquilar el vehículo seleccionado.
      // Obtener el iDToken almacenado para incluirlo en la solicitud
      const idToken = localStorage.getItem('idToken')

      this.$http
        .post(`/rents/${carId}`, null, {
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
      this.$http
        .get('/cars/')
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
