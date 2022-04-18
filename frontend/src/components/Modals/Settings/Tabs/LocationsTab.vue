<template>
    <v-card flat>
        <v-card 
            v-for="location in locations" 
            :key="location.country" 
            flat
            class="mx-4 my-2 rounded-lg"
            style="background: linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);"
        >
            <v-row no-gutters align="center">
                <v-col cols="1" class="my-1 mx-2">
                    <v-img 
                        :src="location.icon"
                        height="24"
                        width="32"
                    ></v-img>
                </v-col>
                <v-col class="grey--text font-weight-black" align="center">
                    {{location.country}}
                </v-col>
                <v-col class="grey--text font-weight-black" align="center">
                    {{location.city}}, {{location.state}}
                </v-col>
                <v-col cols="1" class="mx-2" align="end">
                    <v-btn v-on:click="removeLocation(location)" fab width="24" height="24" color="error">
                        <v-icon color="white" small>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <div class="d-flex justify-center">
            <v-btn fab class="my-2" width="24" height="24" v-on:click="show = !show" color="#cee5f3">
                <v-icon :color="show ? 'red' : 'white'">{{show ? 'mdi-close' : 'mdi-plus-thick'}}</v-icon>
            </v-btn>
        </div>
        <v-card
            v-if="show"
            class="mx-4 mb-4 rounded-lg"
            style="background: linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);"
        >
            <v-container fluid>
                <v-row no-gutters align="center">
                    <v-col cols="12"  lg="5">
                        <Country v-on:update-country="value => {country = value, location = null}"></Country>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <Location v-bind:country="country" v-on:update-location="value => location = value"></Location>
                    </v-col>
                    <v-col cols="12" lg="1" align="center">
                        <v-btn :disabled="!location || !country" icon outlined color="blue-grey" v-on:click="addLocation()">
                            <v-icon color="blue-grey">mdi-plus-thick</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-card>
</template>

<script>
import Country from '../../../SearchBar/Items/Country.vue';
import Location from '../../../SearchBar/Items/Location.vue';

import _ from 'lodash'

export default {
    name: 'LocationsTab',
    components: { Country, Location},
    data() {
        return {
            country: null,
            location: null,
            show: false,
            locations: [
                {
                    icon: 'https://flagcdn.com/rs.svg',
                    country: 'Serbia',
                    city: 'Novi Sad',
                    state: 'Vojvodina',
                    lat: 45,
                    lon: 38
                },
                {
                    icon: 'https://flagcdn.com/rs.svg',
                    country: 'Bosnia and Herzegovina',
                    city: 'Sanski Most',
                    state: 'Vojvodina',
                    lat: 40,
                    lon: 38
                }
            ]
        }
    },
    methods: {
        addLocation() {
            console.log('Adding location.')
        },
        removeLocation(location) {
            this.locations = _.remove(this.locations, function (n) {return n.lat != location.lat || n.lon != location.lon })
            console.log('Removing location.')
        }
    }
}
</script>