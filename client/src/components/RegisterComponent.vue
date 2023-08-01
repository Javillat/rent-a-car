<!-- eslint-disable no-tabs -->
<!-- eslint-disable indent -->

<template>
    <div class="container">
        <!-- FORMULARIO DE REGISTRO-->
        <h1>Registrar usuario</h1>
        <form @submit.prevent='register'>
            <label for="nombre">
                Nombre:
                <input type="text" id="name" v-model="name" placeholder="Introduce tu nombre" required />
            </label>
            <br><br>
            <label for="email">
                Email:
                <input type="email" name="email" v-model="email" placeholder="<EMAIL>">
            </label>
            <br><br>
            <label for="password">
                Password:
                <input type="password" id="password" v-model="password" placeholder="Introduce password">
            </label>
            <br><br>
            <label for="phone">
                Teléfono (opcional):
                <input type="tel" id="phoneNumber" v-model="phone" placeholder="Número de teléfono" pattern="+[0-9]">
            </label>
            <br><br>
            <button type="submit">Registrarse</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    phone: null,
    name: ''
  }),
  methods: {
    async register () {
      this.$http
        .post('/users/signup', {
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber || undefined,
          firstName: this.name
        })
        .then((response) => {
          console.log(response)
          alert('Usuario registrado correctamente')
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          alert('Error al realizar el registro')
        })
    }
  }
}
</script>

<style></style>
