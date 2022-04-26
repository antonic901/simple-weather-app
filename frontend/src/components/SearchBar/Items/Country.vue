<template>
    <v-autocomplete
        class="my-1 mr-lg-2"
        :items="countries"
        :loading="isLoading"
        :search-input.sync="searchCountry"
        v-on:change="$emit('update-country', country)"
        v-model="country"
        outlined
        hide-details
        hide-no-data
        hide-selected
        dense
        placeholder="Enter name of country"
        return-object
        label="Country"
        item-text="name.common"
        item-value="car.cca2"
    >
        <template v-slot:prepend-inner>
            <v-icon v-if="!country">mdi-earth</v-icon>
            <img v-else class="mr-2 mt-1" width="24" height="16" :src="country.flags.svg">
        </template>
        <!-- <template v-slot:selection="data">
            <div>{{data.item.name.common}}</div>
        </template> -->
        <template v-slot:item="data">
            <img class="mr-4" width="24" height="16" :src="data.item.flags.svg">
            <div> {{data.item.name.common}} </div>
        </template>
    </v-autocomplete>
</template>

<script>
import { useGlobal } from '../../../store/global';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Country',
    setup() {
        const global = useGlobal();
        return {setNotification: global.setNotification}
    },
    data() {
        return {
            isLoading: false,
            timeout: null,
            countries: [],
            country: null,
            searchCountry: null
        }
    },
    watch: {
        searchCountry (val) {
            if (this.country != null) return;
            if (val == '' || !val) return;

            clearTimeout (this.timeout);
                this.countries = [];
                this.isLoading = true;

                let self = this;
                this.timeout = setTimeout(function () {
                    var params = {
                        query: val
                    };
                    self.axios.get("/search/country",{params: params})
                        .then(r => {
                            self.countries = r.data;
                        })
                        .catch(e => {
                            self.setNotification(true, 'No results found for input: ' + val);
                        })
                        .finally(() => {
                            self.isLoading = false;
                        })
            }, 2000)
        }
    }
}
</script>