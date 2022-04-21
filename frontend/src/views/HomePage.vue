<template>
    <v-container class="d-flex flex-column justify-center align-center" style="height:100%;" fluid>
        <SearchBar></SearchBar>
        <HomeInfo></HomeInfo>
    </v-container>
</template>

<script>
import SearchBar from '../components/SearchBar/SearchBar.vue';
import HomeInfo from '../components/Weather/HomeInfo/HomeInfo.vue';

export default {
    name: 'HomePage',
    components: { SearchBar, HomeInfo }
}
</script>