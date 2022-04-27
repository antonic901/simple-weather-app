import { defineStore } from "pinia";
import _ from "lodash";
import axios from "axios";

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
        },
        getById: (state) => {
            return (id) => {
                for (let i = 0; i < state.locations.length; i++) {
                    if (state.locations[i].id == id) {
                        return {location: state.locations[i], weather: state.weathers[i]}
                    }
                }
                return null;
            }
        }
    },
    actions: {
        updateLocations (locations) {
            this.locations = locations;
        },
        addLocation (location) {
            this.locations.push(location);
            this.fetchWeather(location.lat, location.lon)
        },
        removeLocation(id) {
            var location = _.find(this.locations, function (loc) { return loc.id == id });
            this.removeWeather(location.lat, location.lon);
            var payload =JSON.parse(JSON.stringify(this.locations));
             _.remove(payload, function(loc) {return loc.id == id});
            this.locations = payload;
        },
        updateWeathers (weathers) {
            this.weathers = weathers;
        },
        addWeather (weather) {
            this.weathers.push(weather);
        },
        removeWeather (lat, lon) {
            var payload = JSON.parse(JSON.stringify(this.weathers));
            _.remove(payload, function(w) {return w.lat == lat && w.lon == lon});
            this.weathers = payload;
        },
        async fetchWeather(lat, lon) {
            try {
                const response = await axios.get('/location/weather', {params: {lat: lat, lon: lon}});
                this.addWeather(response.data)
            } catch (err) {
                console.log(err);
            }
        },
        async sort() {
            try {
                const response = await axios.get('/location/average-temperature/sort', {locations: this.locations, weathers: this.weathers, interval: []}, {params: {id: 1}})
                this.locations = this.weathers = [];
                response.data.forEach(element => {
                    this.locations.push(element.location);
                    this.weathers.push(element.weather);
                })

            } catch (err) {
                console.log(err);
            }
        }
    }
});