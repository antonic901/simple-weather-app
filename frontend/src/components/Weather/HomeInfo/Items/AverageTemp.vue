<template>
    <div v-if="averageTemp != null">
        <div class="blue-grey--text text--darken-3 mt-9 d-flex justify-center" style="font-family: Zelda-Regular;max-width:600px;">
            <p style="font-size:1rem">
                {{avTempDate.startMonth}} {{avTempDate.startDay}} - {{avTempDate.startMonth === avTempDate.endMonth ? '' :  avTempDate.endMonth}} {{avTempDate.endDay}} {{avTempDate.endYear}}
            </p>
        </div>
        <div class="d-flex justify-center white--text font-weight-black" style="max-width:600px;">
            <p class="my-0 py-0 white--text font-weight-black" style="font-family: Zelda-Bold;font-size:8rem;">{{ averageTemp }}</p>
            <div>
                <v-icon x-large class="mt-6 ml-1" dense color="white">mdi-temperature-celsius</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { useWeather } from '../../../../store/weather';

export default {
    name: 'AverageTemp',
    setup() {
        const store = useWeather();
        return { 
            weather: store
        };
    },
    computed: {
        averageTemp () {
            return this.weather.averageTemp;
        },
        avTempDate () {
            if(this.averageTemp != null) {
                var start = new Date(this.weather.daily[1].dt * 1000)
                var end = new Date(this.weather.daily[5].dt * 1000)
                return {
                    startMonth: this.getMonthName(start.getMonth()),
                    endMonth: this.getMonthName(end.getMonth()),
                    startDay: start.getDate(),
                    endDay: end.getDate(),
                    startYear: start.getFullYear(),
                    endYear: end.getFullYear()
                };
            } else {
                return null;
            }
        }
    },
    methods: {
        getMonthName(month) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            return months[month];
        },
        getDayName (day) {
            var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return days[day - 1];
        }
    }
}
</script>