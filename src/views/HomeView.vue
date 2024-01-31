<script setup>
import {useUserStore} from "../stores/user.js"
import {useDataBaseStore} from "../stores/database.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const useUser = useUserStore()
const useDataBase = useDataBaseStore();
const router = useRouter();

useDataBase.getUrls();

const url = ref('');

const handleSubmit = () =>{
  useDataBase.addUrl(url.value);
}

</script>
<template>
  <h1>Home</h1>
  <p>{{useUser.userData?.email}}</p>

  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Ingrese URL" v-model="url">
    <button type="submit">Agregar</button>
  </form>

  <p v-if="useDataBase.loadingDoc">Loading Doc...</p>
  <ul v-else>
    <li v-for="item in useDataBase.documents" :key="item.id">
      {{item.id}}
      <br/>
      {{item.name}}
      <br/>
      {{item.short}}
      <br/>
      <button @click="useDataBase.deleteUrl(item.id)">Eliminar</button>
      <button @click="router.push(`/editar/${item.id}`)">Editar</button>
    </li>
  </ul>

</template>