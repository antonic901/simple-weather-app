<template>
    <v-card flat>
        <v-card-text v-if="settings">
            <div class="ml-1 grey--text font-weight-bold">Update interval</div>
            <v-slider
                v-model="settings.general.updateInterval"
                color="grey"
                prepend-icon="mdi-refresh"
                track-color="linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);"
                thumb-label
                min="10"
                max="60"
            >
            </v-slider>
            <div class="ml-1 grey--text font-weight-bold">Sidebar</div>
            <div class="d-flex flex-row justify-space-between">
                <div class="ml-1 grey--text font-weight-medium">Enable sorting</div>
                <v-switch
                    hide-details
                    dense
                    v-model="settings.general.sidebar.sorting.enabled"
                    class="ma-0 pa-0 mr-1"
                    style="width:35px;"
                >
                </v-switch>
            </div>
            <v-divider></v-divider>
            <v-row no-gutters align="center" class="ml-2 grey--text font-weight-medium">
                <v-col>
                    <span>Sorting order</span>
                </v-col>
                <v-col cols="7" align="end">
                    <div>
                        <span>{{settings.general.sidebar.sorting.sortingOrder}}</span>
                        <v-menu
                            offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="grey"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    icon
                                >
                                    <v-icon color="grey" medium>mdi-arrow-down-bold</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="order in ['Ascending', 'Descending']" :key="order.id" link v-on:click="settings.general.sidebar.sorting.sortingOrder = order">
                                    <v-icon>{{`mdi-sort-bool-${order.toLowerCase()}`}}</v-icon>
                                    <v-list-item-title class="ml-2">{{order}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </v-col>
            </v-row>
            <v-row no-gutters align="center" class="ml-2 grey--text font-weight-medium">
                <v-col>
                    <span>Interval units</span>
                </v-col>
                <v-col cols="6" align="end">
                    <div>
                        <span>{{settings.general.sidebar.sorting.intervalUnits}}</span>
                        <v-menu
                            offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="grey" dark v-bind="attrs" v-on="on" icon>
                                    <v-icon color="grey" medium>mdi-arrow-down-bold</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="unit in units" :key="unit.id" v-on:click="settings.general.sidebar.sorting.intervalUnits = unit" link>
                                    <v-list-item-title>{{unit}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </v-col>
            </v-row>
            <div class="ml-2 mt-2">
                <span class="grey--text font-weight-medium">Interval:</span>
            </div>      
            <v-range-slider
                v-model="settings.general.sidebar.sorting.interval"
                class="px-2"
                color="grey"
                prepend-icon="mdi-ray-start-arrow"
                append-icon="mdi-ray-end-arrow"
                track-color="linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);"
                thumb-label
                :min="interval.min"
                :max="interval.max"
                hide-details="auto"
                :rules="rules"
            >
            </v-range-slider>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-on:click="save" class="white--text" color="grey">Save</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script>
import { useGlobal } from '../../../../store/global'

export default {
    name: 'GeneralTab',
    setup() {
        const global = useGlobal();
        return { setNotification: global.setNotification }
    },
    computed: {
        interval () {
            switch(this.settings.general.sidebar.sorting.intervalUnits) {
                case 'Minutes':
                    return {min: 1, max: 60}
                case 'Hours':
                    return {min: 1, max: 48}
                case 'Days':
                    return {min: 1, max: 7}
            }
            return {min: 0, max: 0}
        }
    },
    data() {
        return {
            units: ['Hours', 'Days'],
            rules: [
                v => {
                    if (this.settings.general.sidebar.sorting.interval[0] > v[1] ) {
                        return 'Please update interval';
                    }
                    if (this.settings.general.sidebar.sorting.interval[1] > v[1]) {
                        return 'Please update interval';
                    }
                    return true;
                }
            ],
            settings: null
        }
    },
    methods: {
        save() {
            this.axios.put('/settings', {settings: this.settings}, {params: {id: 1}})
                .then(r => {
                    this.setNotification(true, 'Settings are successfully updated.')
                })
                .catch(e => {
                    this.setNotification(true, "Settings can't be updated.")
                })
        }
    },
    watch: {
        'settings.general.sidebar.sorting.intervalUnits': function () {
            if (this.settings.general.sidebar.sorting.interval[0] > this.interval.max) {
                this.settings.general.sidebar.sorting.interval[0] = this.interval.max
            }
            if (this.settings.general.sidebar.sorting.interval[1] > this.interval.max) {
                this.settings.general.sidebar.sorting.interval[1] = this.interval.max
            }
        }
    },
    mounted () {
        this.axios.get('/settings', {params: {id: 1}})
            .then(r => {
                this.settings = r.data;
            })
            .catch(e => {
                this.setNotification(true, "Can't fetch settings.")
            })
    }
}
</script>