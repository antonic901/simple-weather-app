<template>
    <div>
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
                <v-btn v-on:click="showSettings = true, navDrawerStatus = show, show = false" icon>
                    <v-icon color="white">mdi-cog</v-icon>
                </v-btn>
            </v-list-item>
            <v-list>
                <WeatherWidget v-for="(location, index) in locations" :key="location.id" v-bind:location="location" v-bind:weather="weathers[index]"></WeatherWidget>
            </v-list>
        </v-navigation-drawer>
        <SettingsModal v-bind:value="showSettings" v-on:close-settings="(value) => {showSettings = value, show = navDrawerStatus}"></SettingsModal>
    </div>
</template>

<script>
import WeatherWidget from './Widgets/WeatherWidget.vue';
import SettingsModal from '../Modals/Settings/SettingsModal.vue';

import { useGlobal } from '../../store/global';
import { useLocations } from '../../store/locations';

export default {
    name: 'NavigationDrawer',
    components: { WeatherWidget, SettingsModal },
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
    data() {
        return {
            showSettings: false,
            navDrawerStatus: false
        }
    },
    watch: {
        locations () {
            this.locStore.locations.forEach(element => {
                this.axios.get("/weather", {params: {lat: element.lat, lon: element.lon}})
                    .then(r => {
                        this.locStore.addWeather(r.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            });
        }
    },
    mounted () {
        this.axios.get('/location/all')
            .then(r => {
                this.locStore.updateLocations(r.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
}
</script>