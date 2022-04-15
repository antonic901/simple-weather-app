<template>
    <div class="d-flex justify-center align-center" style="height:100%;">
        <v-card
            class="d-flex flex-row align-center rounded-lg"
            max-width="600"
        >
        <v-img class="ml-4"  width="36" height="36" src="../assets/icons/weather.jpg"></v-img>
        <v-container fluid>
            <v-row no-gutters align="center">
                <v-col cols="12"  lg="3">
                    <v-select
                        class="my-1 mr-lg-2 centered-input"
                        outlined
                        hide-details
                        dense
                        prepend-inner-icon="mdi-vhs"
                        :items="countries"
                    >
                    </v-select>
                </v-col>
                <v-col cols="12" lg="9">
                    <v-text-field
                        class="my-1"
                        label="Please enter your location..."
                        placeholder="Enter name of city"
                        append-icon="mdi-magnify"
                        hide-details
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            countries: [
                'SRB',
                'BG',
                'BIH',
                'RUS'
            ]
        }
    }

}
</script>

<style scoped>
    .centered-input input {
        text-align: center;
    }
</style>