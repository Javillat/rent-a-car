<!-- eslint-disable vue/valid-template-root -->
<template>
    <div>
        <h2>Confirmar alquiler</h2>
        <p>{{ car.marca }} </p> <p>{{ car.tipo }}</p> <p>(Año {{ car.año }})</p>
        <button @click="confirmRental">Confirmar alquiler</button>
    </div>
</template>

<script>
export default {
  name: 'Rental',
  data: () => ({
    car: {}
  }),
  methods: {
    confirmRental () {
      // Obtener el idToken almacenado para incluirlo en la solicitud.
      const idToken = localStorage.getItem('idToken')

      this.$http
        .post(`/rental/${this.$route.params.carId}`, {
          headers: {'Authorization': `Bearer ${idToken}`}
        })
        .then(() => {
          alert('Alquiler confirmado!')
          this.$router.push('/cars')
        })
        .catch((error) => {
          console.error(error)
          alert('Error al confirmar el alquiler.')
        })
    },
    fetchCar () {
      this.$http.get(`/cars/${this.$route.params.carId}`)
        .then(response => {
          this.car = response.data
        })
        .catch((error) => {
          console.error(error)
          alert('Ha ocurrido un error al obtener informacion del auto.')
        })
    }
  },
  mounted () {
    this.fetchCar()
  }
}
</script>
