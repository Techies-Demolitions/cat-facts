<template>
    <div id="contain">
        <button @click="toggleShowText()" id="showAllButton">{{ showText }}</button>
        <div v-if="!toggle">
            <table>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
                <tr v-for="items in displayItems " :key="items.id">
                    <td>{{ items.id }}</td>
                    <td>{{ items.name }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItem } from '@/composables/use-item';
import type { Item } from '@/types/Item';
import { onMounted, ref } from 'vue';

const { getItem } = useItem()

onMounted(async () => {
    await fetchItems()
})

async function fetchItems() {
    const fetchedItems = await getItem()
    displayItems.value = fetchedItems as Item[]
}

const displayItems = ref<Item[]>([])

const showText = ref<string>("Show All")
const toggle = ref<boolean>(true)

function toggleShowText() {
    toggle.value = !toggle.value
    if (toggle.value) {
        showText.value = "Show All"
    } else {
        showText.value = "Hide All"
    }
}
</script>

<style scoped>
#contain {
    border: 1px solid red;
    margin-top: 1vw;
    height: fit-content;
}

#showAllButton {
    margin: 0.5vw;
}

table {
    border: 1px solid yellow;
    width: 100%;
}

td {
    border: 1px solid yellow
}

tr {
    border: 1px solid yellow
}

th {
    border: 1px solid yellow
}
</style>