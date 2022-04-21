import { defineStore } from "pinia";
import _ from "lodash"

export const useLocations = defineStore('locations', {
    state: () => ({
        locations: [],
        weathers: []
    }),
    getters: {
        getLocation: (state) => {
            return (id) => _.find(state.locations, function(loc) { return id == loc.id })
        },
        getWeather: (state) => {
            return (location) => _.find(state.weathers, function(w) { return location.lat == w.lat && location.lon == w.lon })
        }
    },
    actions: {
        updateLocations (locations) {
            this.locations = locations;
        },
        addLocation (location) {
            this.locations.push(location);
        },
        updateWeathers (weathers) {
            this.weathers = weathers;
        },
        addWeather (weather) {
            this.weathers.push(weather);
        }
    }
});