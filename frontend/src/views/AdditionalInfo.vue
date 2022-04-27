<template>
    <v-container class="px-5" fluid v-if="location && weather">
        <CurrentInfo v-bind:location="location" v-bind:weather="weather"></CurrentInfo>
        <v-row no-gutters class="blue-grey--text text--darken-1 mt-3" style="font-family:Zelda-Bold;font-size:1.4rem;">Daily weather:</v-row>
        <v-row no-gutters><v-divider></v-divider></v-row>
        <DailyInfo v-bind:weather="weather"></DailyInfo>
        <v-row no-gutters class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.4rem;">
            <span>Hourly weather:</span>
            <v-spacer></v-spacer>
            <div>
                <span>Hours: {{pagination}}</span>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="grey" class="pb-1" dark v-bind="attrs" v-on="on" icon>
                            <v-icon color="grey" medium>mdi-arrow-down-bold</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="pag in [8,16,24,32,40,48]" :key="pag.id" link v-on:click="pagination = pag">
                            <v-list-item-title class="ml-2">{{pag}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-row>
        <v-row no-gutters><v-divider></v-divider></v-row>
        <HourlyInfo v-bind:weather="weather" v-bind:pagination="pagination"></HourlyInfo>
    </v-container>
</template>

<script>
import CurrentInfo from '../components/AdditionalInfo/CurrentInfo.vue';
import DailyInfo from '../components/AdditionalInfo/DailyInfo.vue';
import HourlyInfo from '../components/AdditionalInfo/HourlyInfo.vue';

import { useLocations } from '../store/locations';

export default {
    components: { CurrentInfo, DailyInfo, HourlyInfo },
    name: 'AdditionalInfo',
    setup() {
        const locStore = useLocations();
        return {locStore: locStore}
    },
    computed: {
        id () {
            return this.$route.params.id;
        },
        location() {
            let item = this.locStore.getById(this.id);
            if(item) {
                return item.location;
            } else return null;
        },
        weather() {
            let item = this.locStore.getById(this.id);
            if(item) {
                return item.weather;
            } else return null;
        }
    },
    data() {
        return {
            // id: this.$route.params.id,
            pagination: 8
        }
    }
}
</script>