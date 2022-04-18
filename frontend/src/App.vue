<template>
  <v-app>
    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import colorBetween from 'color-between';

export default {
  name: 'App',
  computed: {
      background () {
          const minColor = this.getTempColor(-5);
          const maxColor = this.getTempColor(20);
          var s = `linear-gradient(106.32deg, ${minColor} 0%, ${maxColor} 100%)`;
          return {
              'background': s,
              'height': '100%'
          }
      }
  },
  data() {
      return {
        temps: [
            {
                value: -40,
                color: '#10428f'
            },
            {
                value: -20,
                color: '#21a5ef'
            },
            {
                value: 0,
                color: '#96daff'
            },
            {
                value: 20,
                color: '#f3d77c'
            },
            {
                value: 40,
                color: '#ff9557'
            }
        ]
      }
  },
  methods: {
      getTempColor(temp) {
        for (var i = 0; i < this.temps.length-1; i++) {
            if (temp >= this.temps[i].value && temp <= this.temps[i+1].value) {
                return colorBetween(this.temps[i].color, this.temps[i+1].color, 0.5);
            }
        }
        return '#10428f';
      }
  }
};
</script>

<style scoped>
    .background {
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    @font-face {
        font-family: "Zelda-Bold";
        src: local("Zelda-Bold"),
            url(./fonts/Zelda-Normal-7OTF/Zelda-Bold.otf) format("truetype");
    }

    @font-face {
        font-family: "Zelda-Regular";
        src: local("Zelda-Regular"),
            url(./fonts/Zelda-Normal-7OTF/Zelda-DemiBold.otf) format("truetype");
    }
</style>