<template>
    <v-dialog
        v-model="dialog"
        max-width="800px"
        scrollable
    >
        <v-card class="rounded-lg">
            <v-toolbar flat dense dark style="background: linear-gradient(to bottom right, #cee5f3 10%, #fff2e2 90%);">
                <v-spacer></v-spacer>
                <v-toolbar-title style="font-size: 1.9em !important;" class="font-weight-medium grey--text">
                    Settings
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <template v-slot:extension>
                    <v-tabs
                        v-model="tabs"
                        fixed-tabs
                        align-with-title 
                        show-arrows
                    >
                        <v-tabs-slider color="grey"></v-tabs-slider>
                        <v-tab href="#generalsettings">
                            <h4 class="grey--text">General</h4>
                        </v-tab>
                        <v-tab href="#locationsettings">
                            <h4 class="grey--text">Locations</h4>
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs" touchless>
                <v-tab-item value="generalsettings">
                    <general-tab :is-active-tab="tabs === 'generalsettings'"></general-tab>
                </v-tab-item>
                <v-tab-item value="locationsettings">
                    <locations-tab :is-active-tab="tabs === 'locationsettings'"></locations-tab>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-dialog>
</template>

<script>
import GeneralTab from './Tabs/GeneralTab.vue';
import LocationsTab from './Tabs/LocationsTab.vue';

export default {
  components: { GeneralTab, LocationsTab },
    name: 'SettingsModal',
    props: {
        value: Boolean
    },
    computed: {
        dialog: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('close-settings', value);
            }
        }
    },
    data() {
        return {
            tab: null,
            tabs: null
        }
    }
}
</script>