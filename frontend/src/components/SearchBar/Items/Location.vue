<template>
    <v-autocomplete
        class="my-1"
        :items="locations"
        :loading="isLoading"
        :search-input.sync="searchLocation"
        v-on:change="$emit('update-location', location)"
        v-model="location"
        outlined
        hide-details
        hide-no-data
        hide-selected
        dense
        placeholder="Enter name of city"
        append-icon="mdi-magnify"
        return-object
        label="Please enter your location"
        item-text="name"
        item-value="country"
    >
        <template v-slot:prepend-inner>
            <v-icon v-if="location" color="red">mdi-map-marker</v-icon>
            <v-icon v-else>mdi-map-marker</v-icon>
        </template>
        <!-- <template v-slot:selection="data">
            <div> {{data.item.name}}, {{data.item.state}}, {{data.item.country}} </div>
        </template> -->
        <template v-slot:item="data">
            <div> {{data.item.name}}, {{data.item.state}}, {{data.item.country}} </div>
        </template>
    </v-autocomplete>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Location',
    props: {
        country: Object
    },
    data() {
        return {
            isLoading: false,
            timeout: null,
            locations: [],
            location: null,
            searchLocation: null
        }
    },
    watch: {
        searchLocation (val) {
            if (this.location != null) return;
            if (val == '' || !val || !this.country) return;

            clearTimeout (this.timeout);
            this.locations = [];
            this.isLoading = true;

            let self = this;
            this.timeout = setTimeout(function () {
                var params = {
                    query: val,
                    country: self.country.cca2
                };
                self.axios.get("/search/location",{params: params})
                    .then(r => {
                        self.locations = r.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
                    .finally(() => {
                        self.isLoading = false;
                    })
            }, 2000)
        },
        country () {
            this.location = null, this.locations = [];
        }
    }
}
</script>