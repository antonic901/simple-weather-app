import { _ } from "core-js";
import { defineStore } from "pinia";

export const useGlobal = defineStore ('global', {
    state: () => ({
        showNavDrawer: false,
        notification: {show: false, message: ''},
        settings: null
    }),
    actions: {
        setNavDrawer (input) {
            this.showNavDrawer = input;
        },
        setNotification(show, message) {
            this.notification.show = show;
            this.notification.message = message;
        },
        setSettings (input) {
            this.settings = input;
        }
    }
});