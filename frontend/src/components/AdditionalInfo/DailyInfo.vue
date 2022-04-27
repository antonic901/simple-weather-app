<template>
    <v-row no-gutters justify="center">
        <v-col :class="column" v-for="weather in weather.daily" :key="weather.id">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card  :elevation="hover ? 15 : 5"  class="ma-2">
                        <v-card-title class="justify-center text-lg-subtitle-1 text-xl-h6 font-weight-bold">{{getDayName(weather.dt)}}</v-card-title>
                        <v-card-text class="text-center">
                            <v-row no-gutters justify="center">
                                <div>
                                    <v-img width="128" height="128" :src="'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'"></v-img>
                                </div>
                            </v-row>
                            <div class="mb-6 text-body-1">{{weather.weather[0].main}}</div>
                            <div class="d-flex justify-space-between">
                                <span>High</span>
                                <span>{{weather.temp.max.toFixed()}}°C</span>
                            </div>
                            <div class="d-flex justify-space-between">
                                <span>Low</span>
                                <span>{{weather.temp.min.toFixed()}}°C</span>
                            </div>
                        </v-card-text>
                    </v-card>
                </template>
            </v-hover>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'DailyInfo',
    props: {
        weather: Object
    },
    computed: {
        column () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 'custom2cols'
                case 'sm': return 'custom4cols'
                case 'md': return 'custom4cols'
            }
            return 'custom8cols';
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

<style scoped>
.custom2cols {
  width: 50%;
  max-width: 50%;
  flex-basis: 50%;
}
.custom4cols {
  width: 25%;
  max-width: 25%;
  flex-basis: 25%;
}
.custom8cols {
  width: 12.5%;
  max-width: 12.5%;
  flex-basis: 12.5%;
}
</style>