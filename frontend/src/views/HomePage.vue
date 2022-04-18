<template>
    <v-container class="d-flex flex-column justify-center align-center" v-bind:style="background" fluid>
        <SearchBar></SearchBar>
        <HomeInfo></HomeInfo>
    </v-container>
</template>

<script>
import SearchBar from '../components/SearchBar/SearchBar.vue';
import HomeInfo from '../components/Weather/HomeInfo/HomeInfo.vue';

import colorBetween from 'color-between';
import { useWeather } from '../store/weather';

export default {
    name: 'HomePage',
    components: { SearchBar, HomeInfo },
    setup() {
        const store = useWeather();
        return {
            weather: store
        }
    },
    computed: {
        daily() {
            return this.weather.daily;
        },
        background () {
            const minColor =  this.daily ? this.getTempColor(this.daily[0].temp.min) : '#cee5f3'; 
            const maxColor = this.daily ? this.getTempColor(this.daily[0].temp.max): '#fff2e2';
            var s = `linear-gradient(to bottom right, ${minColor} 50%, ${maxColor} 90%)`;
            return {
            'background': s,
            'height': '100%'
            }
        }
    },
    data() {
        return {
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
    }
}
</script>