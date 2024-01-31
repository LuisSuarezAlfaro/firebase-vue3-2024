<script setup>
import {useUserStore} from "./stores/user.js";

const useUser = useUserStore();

</script>
<template>
  <h1>App Base</h1>
  <nav v-if="!useUser.loadingSession">
    <span v-if="useUser.userData">
      <router-link to="/">Home</router-link> |
    </span>
    <span v-if="!useUser.userData">
      <router-link to="/login">Login</router-link> |
    </span>
    <span v-if="!useUser.userData">
      <router-link to="/register">Register</router-link> |
    </span>
    <span v-if="useUser.userData">
      <button @click="useUser.logoutUser()">Logout</button>
    </span>
  </nav>
  <div v-else>
      loading user...
  </div>
  <router-view></router-view>
</template>