<!-- eslint-disable indent -->
<template>
    <div>
        <div class="nave-menu">
            <i class="fas fa-bars" @click="showMenu()"></i>
            <div class="nav-content" :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'">
                <div class="logo">Logo</div>
                <div class="nav-items">
                    <div class="nav-link"><router-link to="/addcar">Agregar auto</router-link></div>
                    <div class="nav-link"><router-link to="/car">Autos disponibles</router-link></div>
                    <div class="nav-link"><router-link to="/rent">Rentados x usuario</router-link></div>
                    <div class="nav-link"><router-link to="/rentall">Ver rentados global</router-link></div>
                </div>
                <div class="login-button">Login</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      showMobileMenu: false
    }
  },
  methods: {
    showMenu () {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>

<style>
.nav-menu {
    background-color: white;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    align-items: center;
}

.nav-items {
    display: flex;
    justify-content:center;
    align-items: center;
    list-style: none;
    min-width: 60vw;
    margin: 5px;
    padding: 3px;
}

.nav-link {
    margin: 3px;
    padding: 5px;
    text-decoration: none;
    }

i {
    display: none;
}

/* Mobile version - hidden hamburger menu */
@media screen and (max-width: 768px) {
    .nav-menu {
        padding-top: 10px;
        position: absolute;
        width: 100%;
    }

    .open-menu {
        opacity: 1;
        height: 150px;
    }

    .closed-menu {
        opacity: 0;
        height: 0;
        padding: 0;
    }

    .nav-content {
        flex-direction: column;
        z-index: 100;
        position: relative;
        transition: all 0.2s ease-out;
    }

    .nav-items {
        flex-direction: column;
        justify-content: space-around;
        align-self: center;
    }

    i {
        display: block;
        text-align: right;
        padding: 0 10px 10px 0;
    }
}
</style>
