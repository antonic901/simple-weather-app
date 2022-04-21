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

export default {
    name: 'LocationsTab',
    components: { Country, Location, LocationList},
    setup() {
        const store = useLocations();
        return {locStore: store}
    },
    data() {
        return {
            country: null,
            location: null,
            show: false,
            locations: []
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
            this.axios.post("/location/add", body)
                .then(r => {
                    this.locations = r.data;
                    this.locStore.updateLocations(r.data);
                })
                .catch(e => {
                    console.log(e);
                })
        },
        removeLocation(location) {
            this.axios.delete("/location/remove",{params: {id: location.id}})
                .then(r => {
                    this.locations = _.remove(this.locations, function (n) {return n.lat != location.lat || n.lon != location.lon });
                    this.locations = r.data;
                    this.locStore.updateLocations(r.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    },
    mounted () {
        this.axios.get('/location/all')
            .then(r => {
                this.locations = r.data;
            })
            .catch(e => {
                console.log(e)
            })
    }
}
</script>