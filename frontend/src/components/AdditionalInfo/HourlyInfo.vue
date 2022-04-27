<template>
    <v-row no-gutters justify="center">
        <v-col :class="column" v-for="weather in weather.hourly.slice(0,pagination)" :key="weather.id">
            <v-hover>
                <template v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 15 : 5" class="ma-2">
                        <v-card-title class="justify-center">{{getTime(weather.dt)}}</v-card-title>
                        <v-card-text class="text-center">
                            <v-row no-gutters justify="center">
                                <div>
                                    <v-img width="128" height="128" :src="'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'"></v-img>
                                </div>
                            </v-row>
                            <div class="mb-6 text-body-1">{{weather.weather[0].main}}</div>
                            <div class="d-flex justify-space-between">
                                <span>Temperature</span>
                                <span>{{weather.temp.toFixed()}}°C</span>
                            </div>
                            <div class="d-flex justify-space-between">
                                <span>Feels like</span>
                                <span>{{weather.feels_like.toFixed()}}°C</span>
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
    name: 'HourlyInfo',
    props: {
        weather: Object,
        pagination: Number
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
        getTime(milliseconds) {
            var time = new Date(milliseconds * 1000);
            return time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
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