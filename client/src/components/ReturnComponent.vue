<template>
    <div>
        <h2>Confirmar devolucion</h2>
        <p>{{ rental.car.marca }} - {{ rental.car.modelo }} (Año {{ rental.car.anyo }})</p>
        <button @click="confirmReturn">Confirmar devolucion</button>
    </div>
</template>
