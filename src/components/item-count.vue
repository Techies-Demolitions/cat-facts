<template>
    <div id="contain" class="nes-container is-dark with-title">
        Total Items: <span class="nes-text is-error">{{ currentItemCount }}</span>
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
    width: 100%;
    color: var(--color-heading);
}
</style>