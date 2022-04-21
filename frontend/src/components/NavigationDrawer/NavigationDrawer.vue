<template>
    <v-navigation-drawer 
        v-model="show" 
        app
        height="100%"
        :width="width"
        color="rgba(61, 61, 61, 0.2)"
        v-on:open-navdrawer="show = true"
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="white--text text--darken-3" style="font-family: Zelda-Bold;">
                    Simple Weather
                </v-list-item-title>
                <v-list-item-subtitle class="white--text text--lighten-2" style="font-family: Zelda-Regular;">
                    Powered by OpenWeather.com
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-btn icon v-on:click="show = false">
                <v-icon color="white">mdi-arrow-left-thick</v-icon>
            </v-btn>
        </v-list-item>
        <v-list>
            <WeatherWidget v-for="(location, index) in locations" :key="location.id" v-bind:location="location" v-bind:weather="weathers[index]"></WeatherWidget>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import WeatherWidget from './Widgets/WeatherWidget.vue';

import { useGlobal } from '../../store/global';
import { useLocations } from '../../store/locations';

export default {
    name: 'NavigationDrawer',
    components: { WeatherWidget },
    setup() {
        const global = useGlobal();
        const locations = useLocations();
        return {global: global, locStore: locations }
    },
    computed: {
        width () {
                switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '100%'
            }
            return ''
        },
        show : {
            get () {
                return this.global.showNavDrawer;
            },
            set (value) {
                this.global.setNavDrawer(value);
            }
        },
        locations () {
            return this.locStore.locations;
        },
        weathers () {
            return this.locStore.weathers;
        }
    }, 
    watch: {
        async locations () {
            for (var i = 0; i < this.locStore.locations.length; i++) {
                var response = await this.axios.get("/weather", {params: {lat: this.locStore.locations[i].lat, lon: this.locStore.locations[i].lon}});
                this.locStore.addWeather(response.data);
            }
        },
        weathers () {
            
        }
    },
    mounted () {
        var isEnabledSort = true;
        if (isEnabledSort) {
            this.axios.get('/location/average-temperature/sort', {data: {locations: null, interval: null}})
                .then(r => {
                    r.data.forEach(item => {
                        this.locStore.addLocation(item.location);
                        // this.locStore.addWeather(item.weather);
                    })
                })
                .catch(e => {
                    console.log(e);
                })
        } else {
            this.axios.get('/location/all')
                .then(r => {
                    this.locStore.updateLocations(r.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }

    }
}
</script>