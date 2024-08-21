<template>
    <div id="contain">
        Total Items: {{ currentItemCount }}
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    itemCountAtCurrent: Number
})

const currentItemCount = ref<number>()

watch(() => props.itemCountAtCurrent,
    (receivedValue) => {
        currentItemCount.value = receivedValue
    })

</script>

<style scoped>
#contain {
    border: 1px solid #512B81;
    width: 100%;
    color: var(--color-heading);
}
</style>