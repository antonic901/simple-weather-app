<template>
  <v-app>
    <v-main>
        <v-container class="background" fluid>
            <router-view></router-view>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style scoped>
    .background {
        background-color: #0096FF;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>