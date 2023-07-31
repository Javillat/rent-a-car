<template>
    <div>
        <h2>Detalles del auto</h2>
        <p>Marca: {{ car.marca }}</p>
        <p>Modelo: {{ car.tipo }}</p>
        <p>Año: {{ car.año }}</p>
        <button @click="rentCar">Rentar auto</button>
    </div>
</template>

<script>
export default {
  name: 'CarDetail',
  data: () => ({
    car: {}
  }),
  methods: {
    rentCar () {
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
    fetchCarDertails () {
      const idToken = localStorage.getItem('token')

      this.$http
        .get(`/cars/getcar/${this.$route.params.id}`, {
          headers: {'Authorization': `Bearer ${idToken}`}
        })
        .then((response) => {
          this.car = response.data
        })
        .catch((error) => {
          console.log(error)
          alert('Ha ocurrido un error al obtener el auto')
        })
    }
  },
  mounted () {
    this.fetchCarDertails()
  }
}
</script>
