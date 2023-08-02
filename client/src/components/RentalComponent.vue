<!-- eslint-disable vue/valid-template-root -->
<template>
  <div>
    <h2>Autos rentados</h2>
    <ul>
      <li v-for="rent in rents" :key="rent.idRent">
        <p>{{ rent.marca }} </p>
        <p>{{ rent.tipo }}</p>
        <p>Año {{ rent.año }}</p>
        <p>Devuelto: {{ rent.completed ? `Si` : `No`}}</p>
        <button v-bind:class="rent.completed ? 'completed' : 'nocompleted'" @click="returnCar(rent.idRent)">Devolver
          auto</button>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Rental',
  data: () => ({
    rents: []
  }),
  methods: {
    returnCar (rentId) {
      console.log('Rent Id', rentId)
      // Obtener el idToken almacenado para incluirlo en la solicitud.
      const idToken = localStorage.getItem('token')
      console.log(idToken)
      this.$http
        .post(`/rental/return/${rentId}`, null, {
          headers: { 'Authorization': `Bearer ${idToken}` }
        })
        .then(() => {
          alert('Devolución confirmada!')
          this.$router.push('/car')
        })
        .catch((error) => {
          console.error(error)
          alert('Error al confirmar la devolución.')
        })
    },
    fetchRental () {
      const idToken = localStorage.getItem('token')
      const idUser = localStorage.getItem('uid')
      console.log(idUser)
      this.$http
        .get(`/rental/auth/${idUser}`, {
          headers: { 'Authorization': `Bearer ${idToken}` }
        })
        .then(response => {
          console.log('Response ', response.data)
          this.rents = response.data
        })
        .catch((error) => {
          console.error(error)
          alert('Ha ocurrido un error al obtener informacion de las rentas del usuario!.')
        })
    }
  },
  mounted () {
    this.fetchRental()
  }
}
</script>

<style>
ul {
  list-style: none;
}

.completed {
  pointer-events: none;
  background-color: gray;
  opacity: .65;
}

.nocompleted {
  pointer-events: fill;
  background-color: rgb(108, 227, 108);
}
</style>
