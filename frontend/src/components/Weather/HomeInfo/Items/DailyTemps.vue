<template>
    <div v-if="daily">
        <div class="d-flex flex-wrap justify-center">
            <div v-for="day in daily" :key="day.id" class="mr-2">
                <div class="d-flex justify-center blue-grey--text text--darken-3" style="font-family: Zelda-Regular;">{{getDayName(day.dt)}}</div>
                    <div class="d-flex justify-center white--text font-weight-black" style="max-width:600px;">
                        <p class="my-0 py-0 white--text font-weight-black" style="font-family: Zelda-Bold;font-size:1.2rem;">{{parseInt(day.temp.day)}}</p>
                        <div>
                            <v-icon class="mb-2" small dense color="white">mdi-temperature-celsius</v-icon>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useWeather } from '../../../../store/weather';
import _ from 'lodash';

export default {
    name: 'DailyTemps',
    setup() {
        const store = useWeather();
        return { 
            weather: store
        };
    },
    computed: {
        daily() {
            if (this.weather.daily) return _.slice(this.weather.daily, 0, this.weather.daily.length - 1);
            else return [];
        }
    },
    methods: {
        getDayName(milliseconds) {
            var date = new Date(milliseconds * 1000);
            var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return days[date.getDay()]
        }
    }
}
</script>