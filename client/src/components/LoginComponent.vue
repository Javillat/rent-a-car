<!-- eslint-disable no-tabs -->
<!-- eslint-disable indent -->

<template>
	<div class="login-container">
    <div class="login-title">
      <span>
        <h1>Iniciar Sesión</h1>
      </span>
      <div class="form-login">
        <form @submit.prevent="login">
          <label for="email">
            Email:
          </label>
          <input type="email" v-model="email" required>
          <label for="password">
            Contraseña:
          </label>
          <input type="password" v-model="password" required>
          <button type="submit">Iniciar sesion</button>
        </form>
      </div>
    </div>
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
          console.log('Response ', response)
          const idToken = response.data.tokenUser
          console.log('Token ', idToken)

          // Guardo el idToken en el localStorage
          localStorage.setItem('token', idToken)
          localStorage.setItem('uid', response.data.uid)

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

<style>
input[type=email],[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border-radius: 4px;
  border-color: 1px solid #f2f2f2;
  cursor: pointer;
}

button[type=submit]:hover {
  background-color: #45a049;
  border-color: 1px solid #f2f2f2;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
.login-container {
  display: flex;
  justify-content: center;
  width: auto;
  margin:auto ;
  min-height: 70vh;
  padding :20px  15%;
  background:rgba(222, 222, 218, 0.667);
}
.login-title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width:48rem;
  min-height:40vh;
  border: solid #ccc 3px;
}
.form-login {
  display: flex;
  padding: 20px;
  min-width: 40vw;
  min-height: 40vh;
  border-radius: 4px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  background-color: cadetblue;
}
</style>
