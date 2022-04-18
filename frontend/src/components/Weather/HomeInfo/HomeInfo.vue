<template>
    <div>
        <AverageTemp></AverageTemp>
        <DailyTemps></DailyTemps>
    </div>
</template>

<script>
import AverageTemp from './Items/AverageTemp.vue'
import DailyTemps from './Items/DailyTemps.vue'

export default {
  components: { AverageTemp, DailyTemps },
    name: 'HomeInfo'   
}
</script>