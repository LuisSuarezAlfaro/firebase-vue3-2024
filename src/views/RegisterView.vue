<script setup>
import {ref} from "vue";
import {useUserStore} from "../stores/user.js";

const useUser = useUserStore();

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  if (!email.value || password.value.length < 6) {
    return alert("Ingrese los campos");
  }
  useUser.registerUser(email.value, password.value);
}

</script>
<template>
  <h1>Register</h1>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Ingrese email" v-model.trim="email">
    <input type="password" placeholder="Ingrese contraseña" autocomplete="off" v-model.trim="password">
    <button type="submit" :disabled="useUser.loadingUser">Crear usuario</button>
  </form>
</template>