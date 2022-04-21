<template>
    <v-card v-if="weather" class="rounded-lg mx-2 mb-4" style="background: linear-gradient(to bottom right, hsl(201.70000000000005, 82.5%, 45.5%) 50%, hsl(193.39999999999998, 99.2%, 79%) 90%);">
        <v-container class="d-flex" fluid>
            <div class="d-flex flex-column align-start">
                <div class="blue-grey--text text--darken-3 font-weight-medium" style="font-family: Zelda-Bold;">{{location.city}}</div>
                <div class="d-flex justify-center white--text font-weight-black" style="max-width:600px;">
                    <p class="my-0 py-0 white--text font-weight-black" style="font-family: Zelda-Bold;font-size:1.2rem;">{{parseInt(weather.current.temp)}}</p>
                    <div>
                        <v-icon class="mb-2" small dense color="white">mdi-temperature-celsius</v-icon>
                    </div>
                </div>
                <v-img width="64" height="64" :src="'https://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '@2x.png'"></v-img>
                <div class="blue-grey--text text--darken-3 font-weight-medium" style="font-family: Zelda-Bold;">{{weather.current.weather[0].main}}</div>
                <div class="d-flex">
                    <div class="d-flex justify-center white--text font-weight-black mr-2" style="max-width:600px;">
                        <p class="my-0 py-0 white--text font-weight-black text-body-2" style="font-family: Zelda-Bold;">H : 10</p>
                        <div>
                            <v-icon class="mb-2" small dense color="white">mdi-temperature-celsius</v-icon>
                        </div>
                    </div>
                    <div class="d-flex justify-center white--text font-weight-black" style="max-width:600px;">
                        <p class="my-0 py-0 white--text font-weight-black text-body-2" style="font-family: Zelda-Bold;">L : 10</p>
                        <div>
                            <v-icon class="mb-2" small dense color="white">mdi-temperature-celsius</v-icon>
                        </div>
                    </div>
                </div>
            </div>
            <v-divider class="mx-2" vertical></v-divider>
            <div class="d-flex flex-column justify-space-between  blue-grey--text text--darken-3" style="font-family: Zelda-Regular;width:200px;">
                <div class="d-flex justify-space-between">
                    <div>UV Index</div>
                    <div class="white--text">{{weather.current.uvi}} of 10</div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between">
                    <div>Wind</div>
                    <div class="white--text">{{weather.current.wind_speed}} kmh</div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between">
                    <div>Humidity</div>
                    <div class="white--text">{{weather.current.humidity}}%</div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between">
                    <div>Dew point</div>
                    <div class="d-flex justify-center white--text mr-2" style="max-width:600px;">
                        <p class="my-0 py-0">{{weather.current.dew_point}}</p>
                        <div>
                            <v-icon class="mb-2" small dense color="white">mdi-temperature-celsius</v-icon>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between">
                    <div>Pressure</div>
                    <div class="white--text">{{weather.current.pressure}} mbar</div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between">
                    <div>Visibility</div>
                    <div class="white--text">{{weather.current.visibility / 1000}} km</div>
                </div>
            </div>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'WeatherWidget',
    props: {
        location: Object,
        weather: Object
    }
}
</script>