<!-- eslint-disable no-tabs -->
<!-- eslint-disable indent -->

<template>
	<div>
		<h2>Iniciar Sesión</h2>
		<form @submit.prevent="login">
			<label for="email">
				Email:
				<input type="email" v-model="email" required>
			</label>
			<label for="password">
				Contraseña:
				<input type="password" v-model="password" required>
			</label>
			<button type="submit">Iniciar sesion</button>
		</form>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async login () {
      this.$http
        .post('/users/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          // console.log('Response ', response)
          const idToken = response.data.tokenUser
          // console.log('Token ', idToken)

          // Guardo el idToken en el localStorage
          localStorage.setItem('token', idToken)

          // Actualizar el estado de autenticacion
          this.$store.commit('SET_AUTH', { isloggedIn: true, idToken })

          // Redirigir al componente cars
          this.$router.push('/car')
        })
        .catch(error => {
          console.log('Error:', error)
          alert('Credenciales invalidas')
        })
    }
  }
}
</script>
