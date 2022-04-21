import { defineStore } from "pinia";

export const useGlobal = defineStore ('global', {
    state: () => ({
        showNavDrawer: false
    }),
    actions: {
        setNavDrawer (input) {
            this.showNavDrawer = input;
        }
    }
});