<template>
    <div>
        <h2>Confirmar devolucion</h2>
        <p>{{ rental.car.marca }}</p>
        <p>{{ rental.car.tipo }}</p>
        <p>(Año {{ rental.car.año }})</p>
        <button @click="confirmReturn">Confirmar devolución</button>
    </div>
</template>

<script>
export default {
  name: 'Return',
  data: () => ({
    rental: {},
    cars: []
  }),
  methods: {
    confirmReturn () {
      // Obtener el idToken para incluirlo en la solicitud
      const idToken = localStorage.getItem('idToken')
      this.$http
        .post(`/rental/return/${this.$route.params.rentalId}`, null, {
          headers: {'Authorization': `Bearer ${idToken}`}
        })
        .then(() => {
          alert('Devolución registrada correctamente')
          this.$router.push('/cars/')
        })
        .catch((error) => {
          console.log(error)
          alert('Error al confirmar la devolucion.')
        })
    },
    fetchRental () {
      this.$http
        .get(`/rental/return/${this.$route.params.rentalId}`)
        .then((response) => {
          this.rental = response.data
        })
        .catch((error) => {
          console.error(error)
          alert('Error al obtener informacion del alquiler!.')
        })
    }
  },
  fetchRentedCars () {
    const idToken = localStorage.getItem('idToken')

    this.$http
      .get('rental/allrental', {
        headers: {'Authorization': `Bearer ${idToken}`}
      })
      .then((response) => {
        this.cars = response.data
        alert('Listado de autos rentados!')
      })
      .catch((error) => {
        console.log('Error consultando los autos rentados:', error)
      })
  },
  mounted () {
    this.fetchRentedCars()
  }
}
</script>
