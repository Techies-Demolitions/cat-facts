<template>
    <div id="contain">
        Total Items: {{ currentCount }}
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    countAtCurrent: Number
})

const currentCount = ref<number | any>()

watch(() => props.countAtCurrent,
    (receivedValue) => {
        currentCount.value = receivedValue
    })

</script>

<style scoped>
#contain {
    border: 1px solid #512B81;
    width: 100%;
    color: var(--color-heading);
}
</style>