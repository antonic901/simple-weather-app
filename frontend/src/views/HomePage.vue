<template>
    <v-container class="d-flex flex-column justify-center align-center" style="height:100%;" fluid>
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