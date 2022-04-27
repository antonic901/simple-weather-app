<template>
    <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="">
            <div class="blue-grey--text text--darken-3" style="font-family:Zelda-Bold;font-size:2.2rem;text-align:center;">{{location.city}}, {{location.country}}</div>
            <div class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;text-align:center;">{{getDate(weather.current.dt).date}} - {{getDate(weather.current.dt).time}}</div>
            <div class="d-flex justify-center align-center mr-9">
                <img width="128" height="128" :src="'https://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '@2x.png'">
                <span class="blue-grey--text text--darken-3 text-h4 pb-2">{{weather.current.temp.toFixed()}}°C</span>
            </div>
        </v-col>
        <v-col cols="12" sm="4" class="mr-7">
            <div class="d-flex justify-center">
                <span class="blue-grey--text text--darken-2" style="font-family:Zelda-Bold;font-size:1.5rem;">{{text}}</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
                <span class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;">Current condition:</span>
                <span class="blue-grey--text text--lighten-1" style="font-family:Zelda-Regular;font-size:1.2rem;">{{weather.current.weather[0].main}}</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
                <span class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;">Feels like:</span>
                <span class="blue-grey--text text--lighten-1" style="font-family:Zelda-Regular;font-size:1.2rem;">{{weather.current.feels_like.toFixed()}}°C</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
                <span class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;">UV Index:</span>
                <span class="blue-grey--text text--lighten-1" style="font-family:Zelda-Regular;font-size:1.2rem;">{{weather.current.uvi}} of 10</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
                <span class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;">Wind:</span>
                <span class="blue-grey--text text--lighten-1" style="font-family:Zelda-Regular;font-size:1.2rem;">{{weather.current.wind_speed}} kmh</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
                <span class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;">Humidity:</span>
                <span class="blue-grey--text text--lighten-1" style="font-family:Zelda-Regular;font-size:1.2rem;">{{weather.current.humidity}}%</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
                <span class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;">Dew point:</span>
                <span class="blue-grey--text text--lighten-1" style="font-family:Zelda-Regular;font-size:1.2rem;">{{weather.current.dew_point.toFixed()}}°C</span>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
                <span class="blue-grey--text text--darken-1" style="font-family:Zelda-Bold;font-size:1.2rem;">Pressure:</span>
                <span class="blue-grey--text text--lighten-1" style="font-family:Zelda-Regular;font-size:1.2rem;">{{weather.current.pressure}} mbar</span>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'CurrentInfo',
    props: {
        location: Object,
        weather: Object
    },
    computed: {
        text () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 'CURRENT WEATHER'
                case 'sm': return 'CURRENT WEATHER'
                case 'md': return 'CURRENT WEATHER'
            }
            return 'CURRENT WEATHER CONDITIONS';
        }
    },
    methods: {
        getDate(milliseconds) {
            var date = new Date(milliseconds * 1000);
            return {date: date.toDateString('dd:MM:YYYY'), time: date.toLocaleTimeString('en-US', {hour12: false,hourCycle: 'h23',hour: '2-digit',minute: '2-digit'})};
        }
    }
}
</script>