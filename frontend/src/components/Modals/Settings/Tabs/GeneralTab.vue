<template>
    <v-card flat>
        <!-- <v-suheader class=" mx-6 mt-5 grey--text text-h6 font-weight-dark"></v-suheader> -->
        <v-card-text>
            <div class="ml-1 grey--text font-weight-bold">Update interval</div>
            <v-slider
                v-model="updateInterval"
                color="grey"
                prepend-icon="mdi-refresh"
                track-color="linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);"
                thumb-label
                min="1"
                max="60"
            >
            </v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'GeneralTab',
    data() {
        return {
            updateInterval: 0
        }
    }
}
</script>

<style>

</style>