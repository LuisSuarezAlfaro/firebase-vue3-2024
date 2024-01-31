<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {useDataBaseStore} from "../stores/database.js"

const route = useRoute();
const useDataBase = useDataBaseStore();

const url = ref('');

onMounted(async () => {
  url.value = await useDataBase.getUrl(route.params.id);
})

const handleSubmit = () =>{
  useDataBase.updateUrl(route.params.id, url.value);
}

</script>

<template>
<h1>Editar id: {{route.params.id}}</h1>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Ingrese URL" v-model="url">
    <button type="submit">Editar</button>
  </form>
</template>