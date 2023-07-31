<template>
    <div>
        <h1>Bienvenido al alquiler de autos</h1>
        <p v-if="!isLoggedIn">Por favor, <router-link to="/login">inicia sesión</router-link> o <router-link to="/register">regístrate</router-link> para continuar</p>
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
