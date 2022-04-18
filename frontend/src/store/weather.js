import { defineStore } from "pinia";
import _ from "lodash";

export const useWeather = defineStore('weather', {
    state: () => ({
        weather: null
    }),
    getters: {
        current: (state) => {
            if (state.weather) {
                return state.weather.current;
            } else {
                return null;
            }
        },
        daily: (state) => {
            if (state.weather) {
                return state.weather.daily;
            } else {
                return null;
            }
        },
        averageTemp: (state) => {
            if (state.weather) {
                var daily = state.weather.daily;
                var fiveDays = _.slice(daily, 1, 6);
                var average = parseInt(_.sumBy(fiveDays, function (daily) { return daily.temp.day }) / 5);
                return average;
            } else {
                return 0
            }
        }
    },
    actions: {
        update (weather) {
            this.weather = weather;
        }
    }
});