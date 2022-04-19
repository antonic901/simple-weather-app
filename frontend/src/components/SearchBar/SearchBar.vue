<template>
    <v-card class="d-flex flex-row align-center rounded-lg" max-width="600">
        <v-img class="ml-4"  width="36" height="36" src="../../assets/icons/weather.jpg"></v-img>
        <v-container fluid>
            <v-row no-gutters align="center">
                <v-col cols="12"  lg="5">
                    <Country v-on:update-country="value => {country = value, location = null}"></Country>
                </v-col>
                <v-col cols="12" lg="7">
                    <Location v-bind:country="country" v-on:update-location="value => location = value"></Location>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Country from './Items/Country.vue';
import Location from './Items/Location.vue';
import { useWeather } from '../../store/weather';

export default {
    name: 'SearchBar',
    components: { Country, Location},
    setup() {
        const weather = useWeather();
        return { update: weather.update }
    },
    data() {
        return {
            country: null,
            location: null
        }
    },
    watch: {
        location () {
            if (this.country && this.location) {
                this.axios.get("/weather", {params: {lat: this.location.lat, lon: this.location.lon}})
                    .then(r => {
                        this.update(r.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        }
    }
}
</script>