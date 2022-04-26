<template>
    <v-navigation-drawer v-model="show" app height="100%" :width="width" color="rgba(61, 61, 61, 0.2)" v-on:open-navdrawer="show = true">
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
            <WeatherWidget v-for="item in array" :key="item.id" v-bind:location="item.location" v-bind:weather="item.weather"></WeatherWidget>
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
        return {global: global, setNotification: global.setNotification, locStore: locations }
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
        },
        settings () {
            return this.global.settings;
        }
    },
    watch: {
        async weathers () {
            this.update();
        },
        async settings () {
            this.update();
        }
    },
    data () {
        return {
            array: []
        }
    },
    methods: {
        async update () {
            this.array = [];
            try {
                var data = {
                    locations: this.locStore.locations,
                    weathers: this.locStore.weathers
                }
                if (this.settings.general.sidebar.sorting.enabled)  {
                    var response = await this.axios.post('/location/average-temperature/sort', data, {params: {id: 1}});
                    this.array = response.data;
                } else {
                    for (var i = 0; i < this.weathers.length; i++) {
                        this.array.push({location: this.locations[i], weather: this.weathers[i]});
                    }
                }
            } catch (err) {
                this.setNotification(true, "Can't fetch new data after changing settings.")
            }
        }
    }
}
</script>