<template>
  <div v-if="localStorage.getItem('token') == null">
    <Login />
  </div>
  <div v-else>
    <Homepage />
  </div>
</template>

<script setup>
let localStorage = window.localStorage;
</script>
