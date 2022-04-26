<template>
    <v-card flat max-height="400" style="overflow-y: auto">
        <LocationList v-bind:locations="locations" v-on:remove-location="(location) => removeLocation(location)"></LocationList>
        <div class="d-flex justify-center">
            <v-btn fab class="mb-3" width="24" height="24" v-on:click="show = !show" color="#cee5f3">
                <v-icon :color="show ? 'red' : 'white'">{{show ? 'mdi-close' : 'mdi-plus-thick'}}</v-icon>
            </v-btn>
        </div>
        <v-card v-if="show" class="mx-4 mb-4 rounded-lg" style="background: linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);">
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
import LocationList from './LocationsItems/LocationList.vue';

import _ from 'lodash'
import { useLocations } from '../../../../store/locations';
import { useGlobal } from '../../../../store/global';

export default {
    name: 'LocationsTab',
    components: { Country, Location, LocationList },
    setup() {
        const store = useLocations();
        const global = useGlobal();
        return {locStore: store, setNotification: global.setNotification}
    },
    computed: {
        locations () {
            return this.locStore.locations;
        }
    },
    data() {
        return {
            country: null,
            location: null,
            show: false
        }
    },
    methods: {
        addLocation() {
            var body = {
                icon: this.country.flags.svg,
                country: this.country.name.common,
                city: this.location.name,
                state: this.location.state,
                lat: this.location.lat,
                lon: this.location.lon
            }
            this.axios.post("/location/add", body, {params: {id: 1}})
                .then(r => {
                    this.setNotification(true, 'Location successfully added.')
                })
                .catch(e => {
                    this.setNotification(true, "Location can't be added.")
                })
        },
        removeLocation(location) {
            this.axios.delete("/location/remove",{params: {id: 1, locationid: location.id}})
                .then(r => {
                    this.setNotification(true, 'Location successfully removed.')
                })
                .catch(e => {
                    this.setNotification(true, "Location can't be removed.")
                })
        }
    }
}
</script>