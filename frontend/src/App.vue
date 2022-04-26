<template>
  <v-app v-bind:style="background">
    <NavigationDrawer></NavigationDrawer>
    <div class="d-flex" style="height:50px;" app>
        <v-btn v-on:click="global.setNavDrawer(!global.showNavDrawer)" class="ml-5 mt-3"  icon>
            <v-icon large>mdi-menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-on:click="showSettings = true" class="mr-5 mt-3" icon>
            <v-icon large >mdi-cog</v-icon>
        </v-btn>
    </div>
    <v-main>
        <router-view></router-view>
    </v-main>
    <div style="height:50px;" app>

    </div>
    <SettingsModal v-bind:value="showSettings" v-on:close-settings="(value) => {showSettings = value}"></SettingsModal>
    <BasicNotification v-bind:showNotification="notification.show" v-bind:text="notification.message" v-on:close="global.setNotification(false, '')"></BasicNotification>
  </v-app>
</template>

<script>
import SocketioService from './services/socketio.service.js';

import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer.vue';
import SettingsModal from './components/Modals/Settings/SettingsModal.vue';
import BasicNotification from './components/Notifications/BasicNotification.vue';

import colorBetween from 'color-between';
import { useWeather } from './store/weather';
import { useGlobal } from './store/global';
import { useLocations } from './store/locations';

export default {
    components: { NavigationDrawer, SettingsModal, BasicNotification },
    name: 'App',
    setup() {
        const store = useWeather();
        const global = useGlobal();
        const locStore = useLocations();
        return {
            weather: store,
            global: global,
            locStore: locStore,
            notification: global.notification,
            setNotification: global.setNotification
        }
    },
    computed: {
        daily() {
            return this.weather.daily;
        },
        avgTempMin() {
            return this.weather.avgTempMin;
        },
        avgTempMax() {
            return this.weather.avgTempMax;
        },
        background () {
            const minColor =  this.avgTempMin ? this.getTempColor(this.avgTempMin) : '#cee5f3'; 
            const maxColor = this.avgTempMax ? this.getTempColor(this.avgTempMax): '#fff2e2';
            var s = `linear-gradient(to bottom right, ${minColor} 50%, ${maxColor} 90%)`;
            return {
            'background': s
            // 'height': '100%'
            }
        }
    },
    data() {
        return {
            showSettings: false,
            temps: [
                {
                    value: -40,
                    color: '#10428f'
                },
                {
                    value: -20,
                    color: '#21a5ef'
                },
                {
                    value: 0,
                    color: '#96daff'
                },
                {
                    value: 20,
                    color: '#f3d77c'
                },
                {
                    value: 40,
                    color: '#ff9557'
                }
            ]
        }
    },
    methods: {
        getTempColor(temp) {
            for (var i = 0; i < this.temps.length-1; i++) {
                if (temp >= this.temps[i].value && temp <= this.temps[i+1].value) {
                    return colorBetween(this.temps[i].color, this.temps[i+1].color, temp / 20);
                }
            }
            return '#10428f';
        }
    },
    created () {
        SocketioService.setupSocketConnection();

        SocketioService.socket.on('settings-updated', (settings) => {
            // console.log('Settings are updated...');
            this.global.setSettings(settings);
        })

        SocketioService.socket.on('location-added', (location) => {
            // console.log('Adding location with ID: ' + location.id + ' in store...')
            this.locStore.addLocation(location);
        })

        SocketioService.socket.on('location-removed', (id) => {
            // console.log('Removing location with ID: ' + id + ' in store...')
            this.locStore.removeLocation(id);
        })

        SocketioService.socket.on('refresh-data', () => {
            // console.log(isSortEnabled);
            // TODO
            console.log('I need to fetch fresh data from OpenWeather...');
        })

    },
    mounted () {
        this.axios.get('/settings', {params: {id: 1}})
            .then(r => {
                this.global.setSettings(r.data)
            })
            .catch(e => {
                console.log(e);
            })
        this.axios.get('/location/all', {params: {id: 1}})
            .then(r => {
                this.locStore.updateLocations(r.data)
            })
            .catch(e => {
                console.log(e);
            })
        this.axios.get('/location/weather/all', {params: {id: 1}})
            .then(r => {
                this.locStore.updateWeathers(r.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    beforeUnmount () {
        SocketioService.disconnect();
    }
}
</script>

<style scoped>
    @font-face {
        font-family: "Zelda-Bold";
        src: local("Zelda-Bold"),
            url(./fonts/Zelda-Normal-7OTF/Zelda-Bold.otf) format("truetype");
    }

    @font-face {
        font-family: "Zelda-Regular";
        src: local("Zelda-Regular"),
            url(./fonts/Zelda-Normal-7OTF/Zelda-DemiBold.otf) format("truetype");
    }
</style>