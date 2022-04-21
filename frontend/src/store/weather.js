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
                return parseInt(_.sumBy(_.slice(state.weather.daily, 1, 6), function (daily) { return daily.temp.day }) / 5);
            } else {
                return null;
            }
        },
        avgTempMin: (state) => {
            if (state.weather) {
                return parseInt(_.sumBy(_.slice(state.weather.daily, 1, 6), function (daily) { return daily.temp.min }) / 5);    
            } else {
                return null;
            }
        },
        avgTempMax: (state) => {
            if (state.weather) {
                return parseInt(_.sumBy(_.slice(state.weather.daily, 1, 6), function (daily) { return daily.temp.max }) / 5);     
            } else {
                return null;
            }
        }
    },
    actions: {
        update (weather) {
            this.weather = weather;
        }
    }
});