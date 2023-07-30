<template>
    <div>
        <h1>Bienvenido al alquiler de autos</h1>
        <p v-if="!isLoggedIn">Por favor inicia sesion para continuar</p>
    </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>
