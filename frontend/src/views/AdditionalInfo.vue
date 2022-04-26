<template>
    <div>
        Here comes additional information about particural location and weather.
    </div>
</template>

<script>
export default {
    name: 'AdditionalInfo',
    props: {
        location: Object,
        weather: Object
    }
}
</script>