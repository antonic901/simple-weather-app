<template>
    <v-list>
        <v-card 
            v-for="location in locations" 
            :key="location.id" 
            flat
            class="mx-4 my-2 rounded-lg"
            style="background: linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);"
        >
            <v-row no-gutters align="center">
                <v-col cols="12" sm="1" align="center">
                    <v-img 
                        :src="location.icon"
                        height="24"
                        width="32"
                        class="my-1"
                    ></v-img>
                </v-col>
                <v-col cols="12" sm="5" class="grey--text font-weight-black" align="center">
                    {{location.country}}
                </v-col>
                <v-col cols="12" sm="5" class="grey--text font-weight-black" align="center">
                    {{location.city}}, {{location.state}}
                </v-col>
                <v-col cols="12" sm="1" align="center">
                    <v-btn class="my-1" v-on:click="$emit('remove-location', location)" fab width="24" height="24" color="error">
                        <v-icon color="white" small>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-list>
</template>

<script>
export default {
    name: 'LocationList',
    props: {
        locations: Array
    }
}
</script>